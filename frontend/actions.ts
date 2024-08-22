"use server";
import { cookies } from "next/headers";

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

export async function addToCart(productId: string) {
  const cookieStore = cookies();
  let cartId = cookieStore.get("cartId")?.value;
  if (!cartId) {
    const cartId = Math.random().toString(36).substring(2, 15);
    cookies().set("cartId", cartId);
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
  console.log(cartId, productId);
  console.log("addToCart", error, data);
  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    return { data };
  }
}

export async function getCart(cartId: string) {
  const graphqlQuery = `
    query getCart($cartId: String!) {
      getCart(cartId: $cartId) {
        cartId
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
  const cookieStore = cookies();
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
    return { data };
  }
}

export async function decreaseItemQuantity(productId: string) {
  const cookieStore = cookies();
  let cartId = cookieStore.get("cartId")?.value;
  console.log("test", cartId, productId);
  const graphqlQuery = `
    query decreaseQuantity($cartId: String!, $productId: String!) {
      decreaseQuantity(cartId: $cartId, productId: $productId)
    }
  `;

  const { error, data } = await fetchQuery({
    query: graphqlQuery,
    variables: { cartId, productId },
  });
  console.log(data);

  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    return { data };
  }
}
