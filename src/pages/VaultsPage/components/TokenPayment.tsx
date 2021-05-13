import React, { memo, useCallback } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../../theme";
import { TokenDataType } from "../../../includes/constants";
import TitleText from "../../../components/text/TitleText";
import SubText from "../../../components/text/SubText";
import Container from "../../../components/layouts/Container";
import InputNumber from "../../../components/input/InputNumber";
import useSetState from "../../../core/hooks/useSetState";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../components/buttons/SecondaryButton";
import CommonLink from "../../../components/links/CommonLink";
import LinkButton from "../../../components/buttons/LinkButton";
import NormalText from "../../../components/text/NormalText";
import { ReactComponent as MagicWandIcon } from "../../../images/magic-wand-icon.svg";
import { ReactComponent as LinkIcon } from "../../../images/link-icon.svg";

type Props = {
    className?: string,
    tokenData: TokenDataType,
};

type DEFAULT_STATE = {
    toDepositValue: number,
    toWithdrawValue: number,
};

const DEFAULT_APP_STATE = {
    toDepositValue: 0,
    toWithdrawValue: 0,
};

const TokenPayment: React.FC<Props> = ({ className, tokenData }) => {
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);

    const onToDepositValueChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ toDepositValue: Number(e.currentTarget.value || 0) });
    }, [setState]);

    const onToWithdrawValueChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ toWithdrawValue: Number(e.currentTarget.value || 0) });
    }, [setState]);

    const onMaxClicked = useCallback(() => {
        alert("Max 버튼이 클릭되었습니다.");
    }, []);

    return (
        <div css={style} className={className}>
            <div css={paymentBoxStyle}>
                <div css={paymentInnerBoxStyle}>

                    <div css={boxStyle}>
                        <Container css={titleBoxStyle}>
                            <TitleText>Balance</TitleText>
                            <NormalText align={"right"}>– ($–)</NormalText>
                        </Container>
                        <form>
                            <InputNumber
                                value={state.toDepositValue}
                                onChange={onToDepositValueChanged}
                                placeholder="0"
                                css={inputStyle}
                            >
                                <div css={maxButtonStyle} onClick={onMaxClicked}>MAX</div>
                            </InputNumber>
                            <PrimaryButton
                                fullWidth
                                {...state.toDepositValue === 0 && { disabled: true }}
                            >
                                Deposit
                            </PrimaryButton>
                        </form>
                    </div>

                    <div css={boxStyle}>
                        <Container css={titleBoxStyle}>
                            <TitleText>Deposit</TitleText>
                            <NormalText align={"right"} css={depositSubTextStyle}>
                                – ($–)
                                <SubText css={normalSubTextStyle}>% of vault</SubText>
                            </NormalText>
                        </Container>

                        <form>
                            <InputNumber
                                value={state.toWithdrawValue}
                                onChange={onToWithdrawValueChanged}
                                placeholder="0"
                                css={inputStyle}
                            >
                                <div css={maxButtonStyle} onClick={onMaxClicked}>MAX</div>
                            </InputNumber>
                            <PrimaryButton
                                fullWidth
                                {...state.toWithdrawValue === 0 && { disabled: true }}
                            >
                                Withdraw
                            </PrimaryButton>
                        </form>
                    </div>

                    <Container css={rewardsBoxStyle}>
                        <TitleText css={rewardsTitleStyle}>AUTO Rewards</TitleText>
                        <div css={rewardsSubBoxStyle}>
                            <TitleText css={rewardsFirstTextStyle}>–</TitleText>
                            <SubText css={rewardsSecondTextStyle}>$–</SubText>
                        </div>
                        <SecondaryButton css={harvestButtonStyle}>Harvest</SecondaryButton>
                    </Container>
                </div>
            </div>
            <div css={contractBoxStyle}>
                <div>
                    <Container css={contractLinksContainerStyle}>
                        <LinkButton
                            href={`https://exchange.pancakeswap.finance/#/add/${tokenData.wantToken0Address}/BNB`}
                            css={linkButtonStyle}
                        >
                            Create LP&nbsp;<MagicWandIcon />
                        </LinkButton>

                        <LinkButton
                            href={`https://bscscan.com/address/${tokenData.farmContractAddress}`}
                            css={linkButtonStyle}
                        >
                            Farm contract&nbsp;<LinkIcon />
                        </LinkButton>

                        <LinkButton
                            href={`https://bscscan.com/address/${tokenData.poolInfo[4]}`}
                            css={linkButtonStyle}
                        >
                            Vault contract&nbsp;<LinkIcon />
                        </LinkButton>
                    </Container>

                    <Container css={contractDetailContainerStyle}>
                        <div css={contractDetailBoxStyle}>
                            <div>
                                <div><b>Vault Details</b></div>
                                <div>
                                    Asset:
                                    <CommonLink
                                        href={`${tokenData.wantLink}`}
                                        css={assetLinkStyle}
                                    >
                                        {tokenData.name}
                                    </CommonLink>
                                    <span
                                        css={subTextStyle}> (${Number(Number(tokenData.wantPrice).toFixed(2)).toLocaleString()})</span>
                                </div>
                                <div>{tokenData.farm} multiplier: {tokenData.autoX}</div>
                                <div>Type: {tokenData.stratType}</div>
                                <div>Farm name: {tokenData.farm}</div>
                            </div>
                        </div>
                        <div css={contractDetailBoxStyle}>
                            <div>
                                <div><b>APY Calculations</b></div>
                                <div> Farm APR: {tokenData.APR.toFixed(1)}%<span
                                    css={subTextStyle}> (0.00%&nbsp;daily)</span>
                                </div>
                                <div> Optimal compounds per year: {tokenData.compoundsPerYear}</div>
                                <div> Farm APY: {tokenData.APY.toFixed(1)}%</div>
                                <div> AUTO APR: {(tokenData.APR_AUTO * 100).toFixed(1)}%<span
                                    css={subTextStyle}> (0.52%&nbsp;daily)</span>
                                </div>
                                <div> Total APY: {(tokenData.APY_total * 100).toFixed(1)}%</div>
                            </div>
                        </div>
                        <div css={contractDetailBoxStyle}>
                            <div>
                                <div><b>Fees</b></div>
                                <div> Controller fee: {tokenData.controllerFeeText}</div>
                                <div> Platform fee: none</div>
                                <div> AUTO buyback rate: {tokenData.buybackrateText}</div>
                                <div> Entrance fee: {tokenData.entranceFeeText}</div>
                                <div> Withdrawal fee: none</div>
                            </div>
                        </div>
                    </Container>
                </div>

            </div>
        </div>
    );
}

const style = css`
`;

const paymentBoxStyle = (theme: Theme) => css`
    width: calc(100% - 48px);
    height: 100%;
    padding: 12px;
    margin: 20px 12px;
    border: 1px solid ${theme.colours.border};
    background-color: ${theme.colours.box.background};
    border-radius: 8px;
    box-shadow: ${theme.borderAndShadow.boxShadow5};

    ${theme.breakpoints.only("sm")} {
        width: unset;
    }

    ${theme.breakpoints.down("xs")} {
        width: 320px;
        margin: 20px auto;
    }
`;

const contractBoxStyle = (theme: Theme) => css`
    width: calc(100% - ${12 * 4}px);
    height: 100%;
    margin: 20px 12px;
`;

const paymentInnerBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    align-items: stretch;

    > div:not(:nth-of-type(1)) {
        margin-left: 12px;
    }

    ${theme.breakpoints.down("sm")} {
        display: flex;
        flex-direction: column;

        > div:not(:nth-of-type(1)) {
            margin-left: 0;
            margin-top: 12px;
        }
    }
`;

const boxStyle = (theme: Theme) => css`
    flex: 1 1 auto;
    flex-direction: column;

    ${theme.breakpoints.down("sm")} {
        width: 100%;
    }
`;

const titleBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 40px;

    ${theme.breakpoints.down("sm")} {
        height: auto;
    }
`;

const depositSubTextStyle = (theme: Theme) => css`

    ${theme.breakpoints.down("sm")} {
        min-height: 40px;
    }
`;

const rewardsBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;

    ${theme.breakpoints.down("xs")} {
        flex-direction: row;
        flex-wrap: wrap;
    }
`;

const rewardsTitleStyle = (theme: Theme) => css`
    font-size: 14px;
    font-weight: bold;
`;

const rewardsSubBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 50px;
    margin: 4px 0 8px 0;

    ${theme.breakpoints.down("sm")} {
        height: auto;
    }

    ${theme.breakpoints.down("xs")} {
        height: 34px;
        margin-left: auto;
    }
`;

const maxButtonStyle = (theme: Theme) => css`
    cursor: pointer;
    font-size: 14px;
    width: 44px;
    padding: 8px;
    margin-left: 4px;
    color: ${theme.colours.link};
`;

const inputStyle = (theme: Theme) => css`
    margin-bottom: 8px;
`;

const rewardsFirstTextStyle = (theme: Theme) => css`
    font-size: 18px;
`;

const rewardsSecondTextStyle = (theme: Theme) => css`
    font-size: 16px;
`;

const harvestButtonStyle = (theme: Theme) => css`
    font-size: 16px;

    ${theme.breakpoints.down("sm")} {
        width: 100%;
    }
`;

const linkButtonStyle = (theme: Theme) => css`
    font-size: 16px;
    line-height: 15px;

    ${theme.breakpoints.up("sm")} {
        :not(:first-of-type) {
            margin-left: 16px;
        }
    }

    ${theme.breakpoints.only("xs")} {
        margin: 0;
    }

`;

const contractLinksContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 16px;

    ${theme.breakpoints.only("xs")} {
        display: grid;
        grid-gap: 8px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const contractDetailContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: 0 -8px;

    ${theme.breakpoints.only("xs")} {
        display: grid;
        grid-gap: 16px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
`;

const contractDetailBoxStyle = (theme: Theme) => css`
    width: 149px;
    margin: 0 8px;
    font-size: 12px;

    > b {
        font-size: 13px;
        font-weight: bold;
    }

    ${theme.breakpoints.only("xs")} {
        width: 100%;
    }
`;

const assetLinkStyle = (theme: Theme) => css`
    font-size: 12px;
    font-weight: bold;
    text-decoration: underline;

    color: ${theme.colours.text};

    :active,
    :visited {
        color: ${theme.colours.text};
    }
`;

const subTextStyle = (theme: Theme) => css`
    font-size: 12px;
    color: ${theme.colours.defaultText};
`;

const normalSubTextStyle = (theme: Theme) => css`
    ${theme.breakpoints.down("sm")} {
        font-size: 14px;
    }
`;

export default memo(TokenPayment);