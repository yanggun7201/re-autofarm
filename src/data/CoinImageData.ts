import coinImages from "./coinImages.json";

export type CoinImageType = {
    name: string,
    imagePath: string,
};

export type CoinImageMapType = {
    [key: string]: string;
};

export const coinImageMap: CoinImageMapType = (() => {
    const map: CoinImageMapType = {};

    coinImages.forEach(coin => {
        map[coin.name] = coin.imagePath;
    });

    return map;
})();

export default coinImages;
