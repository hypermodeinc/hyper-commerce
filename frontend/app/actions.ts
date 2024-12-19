"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { TAGS } from "@/lib/constants";

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
  thresholdStars: number,
  inStockOnly: boolean = false
) {
  const graphqlQuery = `
query searchProducts($query: String!, $maxItems: Int!, $thresholdStars: Float!, $inStockOnly: Boolean!) {
  searchProducts(query: $query, maxItems: $maxItems, thresholdStars: $thresholdStars, inStockOnly: $inStockOnly) {
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
      inStockOnly,
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
      product(id: $id) {
        name
        description
        stars
        price
        image
        isStocked
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

export async function addToCart(productId: string) {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;
  if (!cartId) {
    cartId = Math.random().toString(36).substring(2, 15);
    (await cookies()).set("cartId", cartId);
  }
  const graphqlQuery = `
    query addToCart($cartId: String!, $productId: String!) {
      addToCart(cartId: $cartId, productId: $productId)
    }
  `;

  const { error, data } = await fetchQuery({
    query: graphqlQuery,
    variables: { cartId, productId },
  });

  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    revalidateTag(TAGS.cart);
    return { data };
  }
}

export async function getCart(cartId: string) {
  const graphqlQuery = `
    query getCart($cartId: String!) {
      getCart(cartId: $cartId) {
        cartId
        totalCartQuantity
        items {
          Product {
            name
            description
            stars
            price
            image
          }
          quantity
          cartItemID
        }
      }
    }
  `;

  const { error, data } = await fetchQuery({
    query: graphqlQuery,
    variables: { cartId },
  });

  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    return { data };
  }
}

export async function removeFromCart(productId: string) {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;

  const graphqlQuery = `
    query removeFromCart($cartId: String!, $productId: String!) {
      removeFromCart(cartId: $cartId, productId: $productId)
    }
  `;

  const { error, data } = await fetchQuery({
    query: graphqlQuery,
    variables: { cartId, productId },
  });

  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    revalidateTag(TAGS.cart);
    return { data };
  }
}

export async function decreaseItemQuantity(productId: string) {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;
  const graphqlQuery = `
    query decreaseQuantity($cartId: String!, $productId: String!) {
      decreaseQuantity(cartId: $cartId, productId: $productId)
    }
  `;

  const { error, data } = await fetchQuery({
    query: graphqlQuery,
    variables: { cartId, productId },
  });

  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    revalidateTag(TAGS.cart);
    return { data };
  }
}

export async function recommendProductByCart(cartId: string, maxItems: number) {
  const graphqlQuery = `
    query recommendProductByCart($cartId: String!, $maxItems: Int!) {
      recommendProductByCart(cartId: $cartId, maxItems: $maxItems) {
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
    variables: { cartId, maxItems },
  });
  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    return { data };
  }
}
