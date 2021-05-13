import React, { useCallback, useRef } from "react";
import { css } from "@emotion/react";
import { ReactComponent as MagicWandIcon } from "../../../../images/magic-wand-icon.svg";
import { ReactComponent as LinkIcon } from "../../../../images/link-icon.svg";
import { Theme } from "../../../../theme";
import borderAndShadow from "../../../../theme/borderAndShadow";
import TitleText from "../../../../components/text/TitleText";
import NormalText from "../../../../components/text/NormalText";
import Container from "../../../../components/layouts/Container";
import InputNumber from "../../../../components/input/InputNumber";
import { DropdownContextValueType } from "../../../../components/dropdown/DropdownContext";
import useSetState from "../../../../core/hooks/useSetState";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import SecondaryButton from "../../../../components/buttons/SecondaryButton";
import CommonLink from "../../../../components/links/CommonLink";
import LinkButton from "../../../../components/buttons/LinkButton";

type Props = {
    className?: string,
};

type DEFAULT_STATE = {
    toDepositValue: number,
    toWithdrawValue: number,
};

const DEFAULT_APP_STATE = {
    toDepositValue: 0,
    toWithdrawValue: 0,
};

const TokenPayment: React.FC<Props> = ({ className }) => {
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
        <div css={style}>
            <div className="MuiCollapse-wrapper">
                <div className="MuiCollapse-wrapperInner">
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
                                        {...state.toDepositValue === 0 && { disabled: true }}
                                    >
                                        Deposit
                                    </PrimaryButton>
                                </form>
                            </div>


                            <div css={boxStyle}>

                                <Container css={titleBoxStyle}>
                                    <TitleText>Deposit</TitleText>
                                    <NormalText align={"right"}>
                                        – ($–)
                                        <div className="text-gray-500">% of vault</div>
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
                                    <NormalText css={rewardsSecondTextStyle}>$–</NormalText>
                                </div>
                                <SecondaryButton>Harvest</SecondaryButton>
                            </Container>
                        </div>
                    </div>
                    <div css={contractBoxStyle}>
                        <div className="flex flex-col space-y-4">

                            <Container css={contractLinksContainerStyle}>
                                <LinkButton
                                    href={"https://exchange.pancakeswap.finance/#/add/0xa184088a740c695E156F91f5cC086a06bb78b827/BNB"}
                                    css={linkButtonStyle}
                                >
                                    Create LP&nbsp;<MagicWandIcon />
                                </LinkButton>

                                <LinkButton
                                    href={"https://bscscan.com/address/0x0000000000000000000000000000000000000000"}
                                    css={linkButtonStyle}
                                >
                                    Farm contract&nbsp;<LinkIcon />
                                </LinkButton>

                                <LinkButton
                                    href={"https://bscscan.com/address/0x65168C89a16FBEd4e2e418D5245FF626Bd66874b"}
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
                                                href={"https://pancakeswap.info/pair/0x4d0228ebeb39f6d2f29ba528e2d15fc9121ead56"}
                                                css={assetLinkStyle}
                                            >
                                                WBNB-AUTO LP
                                            </CommonLink>
                                            <span css={subTextStyle}> ($2,865.66)</span>
                                        </div>
                                        <div>AUTO multiplier: 15.00x</div>
                                        <div>Type: staking</div>
                                        <div>Farm name: AUTO</div>
                                    </div>
                                </div>
                                <div css={contractDetailBoxStyle}>
                                    <div>
                                        <div><b>APY Calculations</b></div>
                                        <div> Farm APR: 0.0%<span css={subTextStyle}> (0.00%&nbsp;daily)</span></div>
                                        <div> Optimal compounds per year: 0</div>
                                        <div> Farm APY: 0.0%</div>
                                        <div> AUTO APR: 187.7%<span css={subTextStyle}> (0.52%&nbsp;daily)</span>
                                        </div>
                                        <div> Total APY: 187.7%</div>
                                    </div>
                                </div>
                                <div css={contractDetailBoxStyle}>
                                    <div>
                                        <div><b>Fees</b></div>
                                        <div> Controller fee: none</div>
                                        <div> Platform fee: none</div>
                                        <div> AUTO buyback rate: none</div>
                                        <div> Entrance fee: none</div>
                                        <div> Withdrawal fee: none</div>
                                    </div>
                                </div>
                            </Container>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

const style = css`
`;

const paymentBoxStyle = (theme: Theme) => css`
    width: calc(100% - ${12 * 4}px);
    height: 100%;
    padding: 12px;
    margin: 20px 12px;
    border: 1px solid ${theme.colours.border};
    border-radius: 8px;
    box-shadow: ${theme.borderAndShadow.boxAndShadow};
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

    > div:not(:nth-child(1)) {
        margin-left: 12px;
    }
`;

const boxStyle = (theme: Theme) => css`
    flex: 1 1 auto;
    flex-direction: column;
`;

const titleBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 48px;
`;

const rewardsBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
`;

const rewardsTitleStyle = (theme: Theme) => css`
    font-size: 14px;
    font-weight: bold;
`;

const rewardsSubBoxStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 57px;
    margin: 4px 0 8px 0;
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

const linkButtonStyle = (theme: Theme) => css`
    font-size: 16px;
    line-height: 15px;

    :not(:first-of-type) {
        margin-left: 16px;
    }
`;

const contractLinksContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-bottom: 16px;
`;

const contractDetailContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin: 0 -8px;
`;

const contractDetailBoxStyle = (theme: Theme) => css`
    width: 149px;
    margin: 0 8px;
    font-size: 12px;
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

export default TokenPayment;