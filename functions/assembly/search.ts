import { models } from "@hypermode/functions-as";
import { EmbeddingsModel } from "@hypermode/models-as/models/experimental/embeddings";
import { collections } from "@hypermode/functions-as";
import { JSON } from "json-as";
import { getProduct } from "./crud";
import {
  searchResult,
  llmObject,
  llmSearchResult,
  searchObject,
  consts,
} from "./types";

import {
  OpenAIChatModel,
  ResponseFormat,
  SystemMessage,
  UserMessage,
} from "@hypermode/models-as/models/openai/chat";

export function searchProductWithLLM(
  query: string,
  maxItems: i32,
  thresholdStars: f32 = 0.0,
): llmSearchResult {
  // this function uses llms to generate a list of good items to search for
  // think of it like a google search for e-commerce

  const llmObj = generateSearchObjectFromLLM(query);

  const searchRes = searchProducts(
    llmObj.searchQuery,
    maxItems,
    thresholdStars,
  );

  return new llmSearchResult(llmObj, searchRes);
}

export function searchProducts(
  query: string,
  maxItems: i32,
  thresholdStars: f32 = 0.0,
): searchResult {
  const searchRes = new searchResult(
    consts.productNameCollection,
    consts.searchMethod,
    "success",
    "",
  );

  const nameRes = collections.search(
    consts.productNameCollection,
    consts.searchMethod,
    query,
    maxItems,
    true,
  );

  if (!nameRes.isSuccessful) {
    searchRes.status = nameRes.status;
    searchRes.error = nameRes.error;

    return searchRes;
  }

  const rankedResults = reRankAndFilterSearchResultObjects(
    nameRes.objects,
    thresholdStars,
  );

  for (let i = 0; i < rankedResults.length; i++) {
    const searchObj = getSearchObject(
      rankedResults[i].key,
      rankedResults[i].score,
      rankedResults[i].distance,
    );
    searchRes.searchObjs.unshift(searchObj);
  }

  return searchRes;
}

function getSearchObject(key: string, score: f64, distance: f64): searchObject {
  return new searchObject(getProduct(key), score, distance);
}

function reRankAndFilterSearchResultObjects(
  objs: collections.CollectionSearchResultObject[],
  thresholdStars: f32,
): collections.CollectionSearchResultObject[] {
  for (let i = 0; i < objs.length; i++) {
    const starRes = collections.getText(
      consts.productStarCollection,
      objs[i].key,
    );
    const stars = parseFloat(starRes);

    const inStockRes = collections.getText(
      consts.isProductStockedCollection,
      objs[i].key,
    );
    const inStock = inStockRes === "true";

    if (!inStock) {
      objs[i].score *= 0.5;
    }
    objs[i].score *= stars * 0.1;
  }

  objs.sort((a, b) => {
    if (a.score < b.score) {
      return -1;
    } else if (a.score > b.score) {
      return 1;
    } else {
      return 0;
    }
  });

  const filteredResults: collections.CollectionSearchResultObject[] = [];
  for (let i = 0; i < objs.length; i++) {
    const starRes = collections.getText(
      consts.productStarCollection,
      objs[i].key,
    );
    const stars = parseFloat(starRes);
    if (stars >= thresholdStars) {
      filteredResults.push(objs[i]);
    }
  }

  return filteredResults;
}

export function generateSearchObjectFromLLM(text: string): llmObject {
  const instruction = `You are an e-commerce assistant. A user will provide you with something they're trying to look for.
  Only respond with valid JSON object containing two objects named "userResponse" and "searchQuery". It must be in this format:
  {"userResponse":"I see you're looking for a new pair of women's shoes! We have a couple options for that, I'll generate a list of good items for you.","searchQuery":"women's shoes, women's sneakers, boots, heels, sandals"}.
  For user response, within 2 sentences, give them a response of what could be good items to match what they could be looking for. 
  They must all be e-commerce related. Be cordial and helpful.
  For search query, provide a string of comma separated of items that could be good to semantic search for. They must all be e-commerce related.`;

  const model = models.getModel<OpenAIChatModel>(consts.generationModel);
  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(text),
  ]);

  input.responseFormat = ResponseFormat.Json;

  const output = model.invoke(input);

  // The output should contain the JSON string we asked for.
  const json = output.choices[0].message.content.trim();

  const results = JSON.parse<Map<string, string>>(json);

  return new llmObject(results.get("userResponse"), results.get("searchQuery"));
}

export function miniLMEmbed(texts: string[]): f32[][] {
  const model = models.getModel<EmbeddingsModel>(consts.embeddingModel);
  const input = model.createInput(texts);
  const output = model.invoke(input);

  return output.predictions;
}
