import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { css } from "@emotion/react";
import { trim } from "lodash";
import { Theme } from "../../../theme";
import { AlignType, TokenDataType } from "../../../includes/constants";
import useSetState from "../../../core/hooks/useSetState";
import useThrottle from "../../../core/hooks/useThrottle";
import Input from "../../../components/input/Input";
import Dropdown from "../../../components/dropdown/Dropdown";
import DropdownItem from "../../../components/dropdown/DropdownItem";
import StickyContainer from "../../../components/layouts/StickyContainer";
import { DropdownContextValueType } from "../../../components/dropdown/DropdownContext";
import Container from "../../../components/layouts/Container";
import TertiaryButton from "../../../components/buttons/TertiaryButton";
import TableHeaderContainer from "./TableHeaderContainer";
import TokenDataRow from "./TokenDataRow";
import TokenDataHeader from "./TokenDataHeader";
import { ReactComponent as SearchIcon } from "../../../images/search-icon.svg";
import { ReactComponent as SortArrowAllIcon } from "../../../images/sort-arrow-all.svg";
import { ReactComponent as SortArrowUpIcon } from "../../../images/sort-arrow-up.svg";
import { ReactComponent as SortArrowDownIcon } from "../../../images/sort-arrow-down.svg";

const LAZY_LOADING_INITIAL_COUNT = 30;

const TVL_INDEX = 4;
const APY_INDEX = 5;

const sortTypes = ["DEFAULT", "DESC", "ASC"];

type SortType = string | "ASC" | "DESC" | "DEFAULT";

type Props = {
    className?: string,
    tokens?: any[],
    tokenPools?: any,
};

type DEFAULT_STATE = {
    selectedFarm: DropdownContextValueType,
    selectedStakingOnly: boolean,
    searchToken?: string,
    searchTokenThrottle?: string,
    displayCount: number,
    sortTVL: SortType,
    sortAPY: SortType,
};

const DEFAULT_APP_STATE = {
    selectedFarm: "All",
    selectedStakingOnly: false,
    searchToken: "",
    searchTokenThrottle: "",
    displayCount: LAZY_LOADING_INITIAL_COUNT,
    sortTVL: "DEFAULT",
    sortAPY: "DEFAULT",
};

const TokenList: React.FC<Props> = ({
    className,
    tokens = [],
    tokenPools = {}
}) => {
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);

    const containerRef = useRef<HTMLElement>();

    const onSearchChangedThrottle = useThrottle((searchToken: string) => {
        setState({ searchTokenThrottle: searchToken });
        if (searchToken) {
            containerRef.current?.scrollIntoView();
        }
    }, 1000, [setState]);

    const onSearchChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const searchToken = trim(e.currentTarget.value).toLowerCase();
        setState({ searchToken });
        onSearchChangedThrottle(searchToken);
    }, [setState, onSearchChangedThrottle]);

    const onFarmChanged = useCallback((selectedFarm: DropdownContextValueType) => {
        setState({ selectedFarm });
    }, [setState]);

    const sortTVLClicked = useCallback(() => {
        setState((oldState: DEFAULT_STATE) => {
            return {
                sortAPY: "DEFAULT",
                sortTVL: sortTypes[(sortTypes.findIndex(s => s === oldState.sortTVL) + 1) % sortTypes.length]
            }
        });
    }, [setState]);

    const sortAPYClicked = useCallback(() => {
        setState((oldState: DEFAULT_STATE) => {
            return {
                sortTVL: "DEFAULT",
                sortAPY: sortTypes[(sortTypes.findIndex(s => s === oldState.sortAPY) + 1) % sortTypes.length]
            }
        });
    }, [setState]);

    const toggleStakingOnly = useCallback(() => {
        setState((oldState: DEFAULT_STATE) => {
            return {
                selectedStakingOnly: !oldState.selectedStakingOnly
            }
        });
    }, [setState]);

    const filteredTokenList = useMemo(() => {
        let filtered = tokens.slice();
        if (state.searchTokenThrottle) {
            filtered = filtered
                .filter((tokenDataArray: any[]) => {
                    return tokenDataArray[2].toLowerCase().search(state.searchTokenThrottle) > -1
                });
        }

        if (state.selectedFarm !== "All") {
            filtered = filtered
                .filter((tokenDataArray: any[]) => {
                    return tokenDataArray[2].search(state.selectedFarm) > -1
                });
        }

        if (state.selectedStakingOnly) {
            filtered = filtered
                .filter((tokenDataArray: any[]) => {
                    const index = tokenDataArray[0];
                    const poolData = tokenPools[index];
                    return poolData.stratType === "staking"
                });
        }

        filtered = sortList(filtered, state.sortTVL, TVL_INDEX);
        filtered = sortList(filtered, state.sortAPY, APY_INDEX);

        setState({ displayCount: LAZY_LOADING_INITIAL_COUNT });

        return filtered.map((tokenDataArray: any[]) => {
            const index = tokenDataArray[0];
            const poolData = tokenPools[index];

            return {
                index: index,
                autoX: tokenDataArray[1],
                name: tokenDataArray[2],
                farm: tokenDataArray[3],
                total: tokenDataArray[4],
                apy: tokenDataArray[5],
                ...poolData,
            }
        });
    }, [
        tokens,
        tokenPools,
        state.searchTokenThrottle,
        state.selectedFarm,
        state.selectedStakingOnly,
        state.sortTVL,
        state.sortAPY,
        setState
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setState((oldState: DEFAULT_STATE) => {
                if (oldState.displayCount < filteredTokenList.length) {
                    return {
                        displayCount: oldState.displayCount + LAZY_LOADING_INITIAL_COUNT
                    }
                }

                clearInterval(timer);
                return oldState;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [filteredTokenList, setState]);

    return (
        <Container css={style} className={className} containerRef={containerRef}>
            <StickyContainer direction={"top"} css={stickyContainerStyle}>
                <div css={filtersContainerStyle}>
                    <div css={inputContainerStyle}>
                        <Input value={state.searchToken} onChange={onSearchChanged} placeholder={"Search tokens"}>
                            <SearchIcon />
                        </Input>
                    </div>

                    <div css={dropdownContainerStyle}>
                        <Dropdown value={state.selectedFarm} onChange={onFarmChanged} prefix={"Farm:"}>
                            <DropdownItem value={"All"}>All</DropdownItem>
                            <DropdownItem value={"AUTO"}>AUTO</DropdownItem>
                            <DropdownItem value={"ApeSwap"}>ApeSwap</DropdownItem>
                            <DropdownItem value={"BZX"}>BZX</DropdownItem>
                            <DropdownItem value={"Bakery"}>Bakery</DropdownItem>
                            <DropdownItem value={"Belt"}>Belt</DropdownItem>
                            <DropdownItem value={"Goose"}>Goose</DropdownItem>
                            <DropdownItem value={"Kebab"}>Kebab</DropdownItem>
                            <DropdownItem value={"MDEX"}>MDEX</DropdownItem>
                            <DropdownItem value={"PCS"}>PCS</DropdownItem>
                            <DropdownItem value={"PCSv2"}>PCSv2</DropdownItem>
                            <DropdownItem value={"Venus"}>Venus</DropdownItem>
                            <DropdownItem value={"bDollar"}>bDollar</DropdownItem>
                        </Dropdown>
                    </div>

                    <TertiaryButton
                        css={stakedOnlyButtonStyle(state.selectedStakingOnly)}
                        onClick={toggleStakingOnly}
                    >
                        Staked only
                    </TertiaryButton>
                </div>

                <div css={tableHeaderWrapperStyle}>
                    <TableHeaderContainer>
                        <TokenDataHeader onClick={sortTVLClicked}>
                            <div css={titleStyle("left")}>Token</div>
                            <div css={sortContainerStyle("left")}>
                                {state.sortTVL === "DEFAULT" && (<SortArrowAllIcon css={iconColorStyle} />)}
                                {state.sortTVL === "ASC" && (<SortArrowUpIcon css={iconColorStyle} />)}
                                {state.sortTVL === "DESC" && (<SortArrowDownIcon css={iconColorStyle} />)}
                                <div css={descStyle}>TVL</div>
                            </div>
                        </TokenDataHeader>

                        <TokenDataHeader align={"right"} onClick={sortAPYClicked}>
                            <div css={sortContainerStyle("right")}>
                                {state.sortAPY === "DEFAULT" && (<SortArrowAllIcon css={iconColorStyle} />)}
                                {state.sortAPY === "ASC" && (<SortArrowUpIcon css={iconColorStyle} />)}
                                {state.sortAPY === "DESC" && (<SortArrowDownIcon css={iconColorStyle} />)}
                                <div css={descStyle}>APY</div>
                            </div>
                            <div css={titleStyle("right")}>Daily APR</div>
                            <div css={titleStyle("right")}>AUTOx</div>
                        </TokenDataHeader>

                        <TokenDataHeader align={"right"}>
                            <div css={titleStyle("right")}>Balance</div>
                            <div css={titleStyle("right")}>Deposit</div>
                            <div css={titleStyle("right")}>Rewards</div>
                        </TokenDataHeader>

                        <TokenDataHeader>
                            <div css={titleStyle("right")}>&nbsp;</div>
                        </TokenDataHeader>
                    </TableHeaderContainer>
                </div>
            </StickyContainer>

            {filteredTokenList.slice(0, state.displayCount).map((tokenData: TokenDataType) => (
                <TokenDataRow key={tokenData.index} tokenData={tokenData} />
            ))}
        </Container>
    );
}

const sortList = (list: any[], sortField: SortType, colIndex: number) => {
    if (sortField === "DEFAULT") {
        return list;
    }

    const sortedList = list.slice();
    sortedList.sort((tokenDataArray1: any[], tokenDataArray2: any[]) => {
        const total1 = tokenDataArray1[colIndex];
        const total2 = tokenDataArray2[colIndex];

        let sortResult;
        switch (true) {
            case total1 > total2:
                sortResult = 1;
                break;
            case total1 < total2:
                sortResult = -1;
                break;
            default:
                sortResult = 0;
                break;
        }

        if (sortField === "DESC") {
            return sortResult * -1;
        }
        return sortResult;
    });

    return sortedList;
};

const style = css`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const stickyContainerStyle = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const filtersContainerStyle = (theme: Theme) => css`
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${theme.breakpoints.only("xs")} {
        padding-bottom: 0;
    }
`;

const inputContainerStyle = css`
    width: 100%;
`;

const dropdownContainerStyle = css`
    margin-left: 10px;
`;


const titleStyle = (align: AlignType = "left") => (theme: Theme) => css`
    color: ${theme.colours.defaultText};
    font-size: 14px;
    font-weight: bold;

    ${align === "right" && css`
        text-align: right;
    `};

    ${theme.breakpoints.down("xs")} {
        font-size: 12px;
    }
`;

const descStyle = (theme: Theme) => css`
    color: ${theme.colours.defaultText};
    font-size: 14px;
    margin-left: 4px;

    ${theme.breakpoints.only("xs")} {
        font-size: 12px;
    }
`;

const sortContainerStyle = (align: AlignType = "left") => css`
    display: flex;
    align-items: center;

    ${align === "right" && css`
        justify-content: flex-end;
    `};
`;

const tableHeaderWrapperStyle = (theme: Theme) => css`
    display: flex;
    width: 100%;
    height: 80px;
    padding-left: 80px;
    align-items: center;
    border-bottom: 1px solid ${theme.colours.border};

    ${theme.breakpoints.only("xs")} {
        height: 64px;
        font-size: 12px;
        padding-left: 40px;
    }
`;

const iconColorStyle = (theme: Theme) => css`
    fill: ${theme.colours.defaultText};

    ${theme.breakpoints.only("xs")} {
        width: 12px;
        height: 12px;
    }
`;

const stakedOnlyButtonStyle = (isActive: boolean) => (theme: Theme) => css`
    font-weight: 600;
    margin-left: 10px;
    height: calc(100% - 2px);

    ${isActive && css`
        ${theme.breakpoints.up("xxs")} {
            background-color: ${theme.colours.stakingButton.selected};
            color: ${theme.colours.white};

            :hover {
                background-color: ${theme.colours.stakingButton.selected};
                color: ${theme.colours.white};
            }
        }
    `}
`;

export default TokenList;