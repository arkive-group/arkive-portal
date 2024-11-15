"use server";

import { SHOPIFY_API } from "@/config-global";
import { query } from "firebase/firestore";

const getOrders = async ({ uploader, skuList, fulfilled, after }) => {
  if (!skuList || skuList.length === 0) {
    return [];
  }
  var queryString = `${skuList.map((sku) => `sku:${sku}`).join(" OR ")}`;
  if (fulfilled !== undefined) {
    queryString = `(${queryString}) AND (fulfillment_status:${fulfilled ? "shipped" : "unshipped"})`;
  }
  if (after !== undefined) {
    queryString = `(${queryString}) AND (created_at:>${after})`;
  }
  // console.log(queryString);
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
          orders(first: 250, reverse: true, query: "${queryString}") {
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
                      fulfillmentOrders(first: 10) {
                        nodes {
                          id
                        }
                      }
                      totalPriceSet {
                          shopMoney {
                              amount
                              currencyCode
                          }
                      }
                      shippingAddress {
                        address1
                        address2
                        city
                        country
                        zip
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
    // console.log(data);
    let orders = [];
    data.data?.orders?.edges.forEach((edge) => {
      let order = {
        id: edge.node.id,
        name: edge.node.name,
        email: edge.node.email,
        createdAt: edge.node.createdAt,
        displayFulfillmentStatus: edge.node.displayFulfillmentStatus,
        fulfillments: edge.node.fulfillments,
        fulfillmentOrders: edge.node.fulfillmentOrders?.nodes,
        currencyCode: edge.node.totalPriceSet?.shopMoney?.currencyCode,
        totalPrice: edge.node.totalPriceSet?.shopMoney?.amount,
        seoDescription: edge.node.seo?.description,
        lineItems: edge.node.lineItems.nodes,
        address1: edge.node.shippingAddress?.address1,
        address2: edge.node.shippingAddress?.address2,
        city: edge.node.shippingAddress?.city,
        country: edge.node.shippingAddress?.country,
        zip: edge.node.shippingAddress?.zip,
      };
      // console.log(order);
      orders.push(order);
    });
    return orders;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Fetch Orders] Bad request ${error}` };
  }
};

const fulfillOrder = async ({fulfillmentOrderId, notifyCustomer, trackingInfo}) => {
  try {
    const params = {
      apiKey: SHOPIFY_API.apiKey,
      apiSecretKey: SHOPIFY_API.apiSecretKey,
      accessToken: SHOPIFY_API.accessToken,
      shop: SHOPIFY_API.shop,
    };
    const url = `https://${params.shop}/admin/api/2024-10/graphql.json`;
    const variables = {
      fulfillment: {
        lineItemsByFulfillmentOrder: {
          fulfillmentOrderId: fulfillmentOrderId,
        },
        notifyCustomer: notifyCustomer,
        trackingInfo: {
          company: trackingInfo.company,
          number: trackingInfo.number,
          url: trackingInfo.url,
        }
      }
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": params.accessToken,
      },
      body: JSON.stringify({
        query: `mutation fulfillmentCreate($fulfillment: FulfillmentInput!) {
          fulfillmentCreate(fulfillment: $fulfillment) {
            userErrors {
              field
              message
            }
            fulfillment {
              id
            }
          }
        }`,
        variables: variables,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.errors) {
      return {
        userErrors: data.errors
      }
    }
    return data.data?.fulfillmentCreate;
  } catch (error) {
    console.error(`---> An error occured`, error);
    return { text: `[Shopify][Fulfill Order] Bad request ${error}` };
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

const getProducts = async ({uploader, company, active}) => {
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
    if (active === true) {
      query = `${query} AND status:active`;
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
                variants(first: 50) {
                  nodes {
                    id
                    sku
                  }
                }
                resourcePublications(first: 10) {
                  nodes {
                    isPublished
                    publication {
                      name
                      id
                    }
                  }
                }
                images(first:1) {
                  nodes {
                    url
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
    // console.log(data);

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
        salesChannels: productRaw.resourcePublications?.nodes.map((node) => node.publication?.name),
        imageUrl: productRaw.images?.nodes[0]?.url,
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

export { getOrders, fulfillOrder, createProduct, getProducts, createProductOptions, createProductVariants, getMonthlyReport };
