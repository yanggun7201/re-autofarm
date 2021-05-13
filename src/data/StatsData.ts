import data from "./stats.json";

export type StatsDataType = {
    "platformTVL": number,
    "priceAUTO": string,
    "AUTOMaxSupply": number,
    "AUTOBurnt": number,
    "AUTOMaxCirculating": number,
    "AUTOTotalSupply": number,
    "AUTOMarketCap": number,
    "AUTOMarketCapFullyDiluted": number
}

export default {
    ...data,
}