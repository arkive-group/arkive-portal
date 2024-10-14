"use server";

import { SHOPIFY_API } from "@/config-global";

const getOrders = async () => {
  try {
    const params = {
      apiKey: SHOPIFY_API.apiKey,
      apiSecretKey: SHOPIFY_API.apiSecretKey,
      accessToken: SHOPIFY_API.accessToken,
      shop: SHOPIFY_API.shop,
    };
    const url = `https://${params.shop}/admin/api/2024-10/graphql.json`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": params.accessToken,
      },
      body: JSON.stringify({
        query: `{
                    orders(first: 10) {
                        edges {
                            node {
                                id
                                name
                                email
                                createdAt
                                totalPriceSet {
                                    shopMoney {
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                }`,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Fetch Orders]Bad request ${error}` };
  }
};

const createProduct = async (product) => {
  try {
    const params = {
      apiKey: SHOPIFY_API.apiKey,
      apiSecretKey: SHOPIFY_API.apiSecretKey,
      accessToken: SHOPIFY_API.accessToken,
      shop: SHOPIFY_API.shop,
    };
    const url = `https://${params.shop}/admin/api/2024-10/graphql.json`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": params.accessToken,
      },
      body: JSON.stringify({
        query: `mutation productCreate($input: ProductInput!) {
                    productCreate(input: $input) {
                        product {
                            id
                        }
                        userErrors {
                            field
                            message
                        }
                    }
                }`,
        variables: {
          input: {
            category: product.category,
            handle: product.handle,
            type: product.type,
            seo: {
              title: product.seoTitle,
              description: product.seoDescription,
            },
            title: product.title,
            vendor: product.vendor,
            status: "DRAFT", // 2 is for draft
          },
        },
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Create Products]Bad request ${error}` };
  }

};

export { getOrders, createProduct };
