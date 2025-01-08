// @TODO use this later for default values of the report
export const reportDefaultTemplate = {
  financeOverview: {
    sales: {
      current: 0,
      last: 0,
    },
    profit: {
      current: 0,
      last: 0,
    },
    cost: {
      current: 0,
      last: 0,
    },
  },
  repurposing: {
    sales: {
      label: "SALES",
      current: 0,
      last: 0,
    },
    products: {
      label: "PRODUCTS CREATED",
      data: 0,
    },
    co2: {
      label: "KILO GRAM CO2 SAVED IN TOTAL",
      data: 0,
    },
    rescured: {
      label: "RESCUED MATERIALS + INGREDIENTS",
      data: 0,
    },
    materials: {
      label: "MATERIALS + INGREDIENTS ON AVERAGE PER PRODUCT",
      data: 0,
    },
  },
  financeSalesRevenue: [
    {
      name: "Monthly Revenue",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  ],
  channelBreakdown: [
    {
      color: "#92BA43",
      data: 0,
      label: "Shopify",
    },
    {
      color: "#FFC0CB",
      data: 0,
      label: "Bol.com",
    },
    {
      color: "#FF9900",
      data: 0,
      label: "Amazon",
    },
    {
      color: "#4285F4",
      data: 0,
      label: "Google",
    },
  ],
}