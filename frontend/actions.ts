"use server";

type FetchQueryProps = {
  query: string;
  variables?: any;
};

const fetchQuery = async ({ query, variables }: FetchQueryProps) => {
  try {
    const res = await fetch(process.env.HYPERMODE_API_ENDPOINT as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HYPERMODE_API_TOKEN}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: "no-store",
    });

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.statusText);
    }

    const { data, error, errors } = await res.json();
    return { data, error: error || errors };
  } catch (err) {
    console.error("error in fetchQuery:", err);
    return { data: null, error: err };
  }
};

export async function searchProducts(
  query: string,
  maxItems: number,
  thresholdStars: number
) {
  console.log("Basic search", query, maxItems, thresholdStars);
  const graphqlQuery = `
query searchProducts($query: String!, $maxItems: Int!, $thresholdStars: Float!) {
  searchProducts(query: $query, maxItems: $maxItems, thresholdStars: $thresholdStars) {
  searchObjs {
    product {
      name
      id
      image
      description
      stars
      price
      isStocked
      category
    }
}
  }
}
  `;

  const { error, data } = await fetchQuery({
    query: graphqlQuery,
    variables: {
      query,
      maxItems,
      thresholdStars,
    },
  });

  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    return { data };
  }
}

export async function getProduct(id: string) {
  const graphqlQuery = `
    query getProduct($id: String!) {
      getProduct(id: $id) {
        name
        description
        stars
        price
        image
      }
    }
  `;

  const { error, data } = await fetchQuery({
    query: graphqlQuery,
    variables: { id },
  });

  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    return { data };
  }
}

export async function generateSearchObjectFromLLM(text: string) {
  const graphqlQuery = `
    query generateSearchObjectFromLLM($text: String!) {
      generateSearchObjectFromLLM(text: $text) {
        userResponse
      }
    }
  `;

  const { error, data } = await fetchQuery({
    query: graphqlQuery,
    variables: { text },
  });

  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    return { data };
  }
}
