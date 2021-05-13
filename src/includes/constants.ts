export type AlignType = "left" | "right";

export type TokenDataType = {
    index: number,
    autoX: string,
    name: string,
    farm: string,
    total: number,
    apy: string,
    wantToken0Address: string,
    farmContractAddress: string,
    poolInfo: any,
    wantLink: string,
    wantPrice: string,
    stratType: string,
    compoundsPerYear: string,
    APR: number,
    APY: number,
    APR_AUTO: number,
    APY_total: number,
    controllerFeeText: string,
    buybackrateText: string,
    entranceFeeText: string,
};

export const DEFAULT_SAVE_TIME = 1000;