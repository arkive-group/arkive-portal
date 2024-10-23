"use server";

import { SHOPIFY_API } from "@/config-global";
import { query } from "firebase/firestore";

const getOrders = async (uploader, skuList) => {

  const queryString = skuList.map((sku) => `sku:${sku}`).join(" OR ");
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
        query: `query {
          orders(first: 50, reverse: true, query: "${queryString}") {
              edges {
                  node {
                      id
                      name
                      email
                      createdAt
                      displayFulfillmentStatus
                      fulfillments (first: 10) {
                        id
                        status
                        createdAt
                        trackingInfo {
                          company
                          number
                          url
                        }
                      }
                      totalPriceSet {
                          shopMoney {
                              amount
                              currencyCode
                          }
                      }
                      lineItems(first: 100) {
                        nodes {
                          product {
                            id
                            tags
                          }
                        }
                      }
                  }
              }
            }
          }`,
      }),
    });
    const data = await response.json();
    console.log(data.data?.orders?.edges);
    let orders = [];
    data.data?.orders?.edges.forEach((edge) => {
      let order = {
        id: edge.node.id,
        name: edge.node.name,
        email: edge.node.email,
        createdAt: edge.node.createdAt,
        displayFulfillmentStatus: edge.node.displayFulfillmentStatus,
        fulfillments: edge.node.fulfillments,
        currencyCode: edge.node.totalPriceSet?.shopMoney?.currencyCode,
        totalPrice: edge.node.totalPriceSet?.shopMoney?.amount,
        seoDescription: edge.node.seo?.description,
        lineItems: edge.node.lineItems.nodes,
      };
      console.log(order);
      orders.push(order);
    });
    return orders;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Fetch Orders] Bad request ${error}` };
  }
};

const createProduct = async (productObj) => {
  try {
    const params = {
      apiKey: SHOPIFY_API.apiKey,
      apiSecretKey: SHOPIFY_API.apiSecretKey,
      accessToken: SHOPIFY_API.accessToken,
      shop: SHOPIFY_API.shop,
    };
    const url = `https://${params.shop}/admin/api/2024-10/graphql.json`;
    const variables = {
      input: {
        category: productObj.category,
        handle: productObj.handle,
        productType: productObj.type,
        seo: {
          title: productObj.seoTitle,
          description: productObj.seoDescription,
        },
        title: productObj.title,
        vendor: productObj.vendor,
        status: "DRAFT", // 2 is for draft
        tags: ["portal-uploaded", "portal-uploader:"+productObj.uploader],
      },
      media: [...productObj.media],
      // productOptions: [...productObj.options],
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": params.accessToken,
      },
      body: JSON.stringify({
        query: `mutation productCreate($input: ProductCreateInput!, $media: [CreateMediaInput!]) {
          productCreate(product: $input, media: $media) {
            product {
              id
            }
            userErrors {
              field
              message
            }
          }
        }`,
        variables: variables,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Create Products] Bad request ${error}` };
  }

};

const createProductOptions = async (productId, productObj) => {
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
        query: `mutation createOptions($productId: ID!, $options: [OptionCreateInput!]!) {
          productOptionsCreate(productId: $productId, options: $options) {
            userErrors {
              field
              message
              code
            }
            product {
              options {
                name
                linkedMetafield {
                  namespace
                  key
                }
                optionValues {
                  name
                  linkedMetafieldValue
                }
              }
            }
          }
        }`,
        variables: {
          productId: productId,
          options: [...productObj.options]
        },
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Create Product Options] Bad request ${error}` };
  }
};

const createProductVariants = async (productId, productObj) => {
  try {
    const params = {
      apiKey: SHOPIFY_API.apiKey,
      apiSecretKey: SHOPIFY_API.apiSecretKey,
      accessToken: SHOPIFY_API.accessToken,
      shop: SHOPIFY_API.shop,
    };
    const url = `https://${params.shop}/admin/api/2024-10/graphql.json`;
    const variables = {
      productId: productId,
      variants: [...productObj.variants]
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": params.accessToken,
      },
      body: JSON.stringify({
        query: `mutation productVariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
          productVariantsBulkCreate(productId: $productId, variants: $variants, strategy: REMOVE_STANDALONE_VARIANT) {
            userErrors {
              field
              message
            }
            product {
              id
              options {
                id
                name
                values
                position
                optionValues {
                  id
                  name
                  hasVariants
                }
              }
            }
            productVariants {
              id
              title
              selectedOptions {
                name
                value
              }
            }
          }
        }`,
        variables: variables,
      }),
    });
    console.log(variables);
    const data = await response.json();
    // console.log(data.data?.productVariantsBulkCreate?.userErrors);
    return data;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Create Product Variants] Bad request ${error}` };
  }
};

const getProducts = async ({uploader, company}) => {
  try {
    const params = {
      apiKey: SHOPIFY_API.apiKey,
      apiSecretKey: SHOPIFY_API.apiSecretKey,
      accessToken: SHOPIFY_API.accessToken,
      shop: SHOPIFY_API.shop,
    };
    const url = `https://${params.shop}/admin/api/2024-10/graphql.json`;
    var query = "";
    if (uploader !== undefined && uploader !== null && uploader !== "") {
      query = `tag:portal-uploaded AND tag:'portal-uploader:${uploader}'`;
    } else if (company !== undefined && company !== null && company !== "") {
      query = `vendor:'${company}'`;
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": params.accessToken,
      },
      body: JSON.stringify({
        query: `query {
          products(first: 250, query: "${query}") {
            edges {
              node {
                id
                title
                handle
                status
                seo {
                  title
                  description
                }
                variants(first: 100) {
                  nodes {
                    id
                    sku
                  }
                }
              }
              cursor
            }
            pageInfo {
              hasNextPage
            }
          }
        }`,
      }),
    });
    const data = await response.json();

    let products = [];
    data.data?.products?.edges.forEach((edge) => {
      let productRaw = edge.node;
      const product = {
        id: productRaw.id,
        title: productRaw.title,
        handle: productRaw.handle,
        status: productRaw.status,
        seoTitle: productRaw.seo?.title,
        seoDescription: productRaw.seo?.description,
        variants: productRaw.variants?.nodes,
      };
      products.push(product);
    });
    return products;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Fetch Products] Bad request ${error}` };
  }
};


const getMonthlyReport = async () => {
  try {
    const params = {
      apiKey: SHOPIFY_API.apiKey,
      apiSecretKey: SHOPIFY_API.apiSecretKey,
      accessToken: SHOPIFY_API.accessToken,
      shop: SHOPIFY_API.shop,
    };
    const url = `https://${params.shop}/admin/api/unstable/graphql.json`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": params.accessToken,
      },
      body: JSON.stringify({
        query: `query {
          shopifyqlQuery(
            query: "FROM orders SHOW sum(net_sales) AS monthly_net_sales GROUP BY month SINCE -3m ORDER BY month"
          ) {
            __typename
            ... on TableResponse {
              tableData {
                unformattedData
                rowData
                columns {
                  name
                  dataType
                  displayName
                }
              }
            }
            parseErrors {
              code
              message
              range {
                start {
                  line
                  character
                }
                end {
                  line
                  character
                }
              }
            }
          }
        }`,
      }),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Fetch Monthly Report] Bad request ${error}` };
  }
};

export { getOrders, createProduct, getProducts, createProductOptions, createProductVariants, getMonthlyReport };
