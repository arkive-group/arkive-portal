"use server";

import { SHOPIFY_API } from "@/config-global";
import { query } from "firebase/firestore";


const getProductBySku = async ({skuList}) => {
    if (skuList === undefined || skuList.length === 0) {
        return [];
    }
    var queryString = `${skuList.map((sku) => `sku:${sku}`).join(" OR ")}`;

    try {
        const params = {
          apiKey: SHOPIFY_API.apiKey,
          apiSecretKey: SHOPIFY_API.apiSecretKey,
          accessToken: SHOPIFY_API.accessToken,
          shop: SHOPIFY_API.shop,
        };
        const url = `https://${params.shop}/admin/api/2024-10/graphql.json`;
        const query = `
          query {
            products(first: 10, reverse: true, query: "${queryString}") {
              edges {
                    node {
                        id
                        title
                        handle
                        status
                        vendor
                    }
                }
            }
          }
        `;
        const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Access-Token": params.accessToken,
            },
            body: JSON.stringify({
                query: query,
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
                vendor: productRaw.vendor,
            };
            products.push(product);
        });
        return products;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export { getProductBySku };