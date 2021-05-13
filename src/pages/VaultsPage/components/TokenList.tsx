import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { times } from "lodash";
import { ReactComponent as SortArrowAllIcon } from "../../../../images/sort-arrow-all.svg";
import Input from "../../../../components/input/Input";
import { ReactComponent as SearchIcon } from "../../../../images/search-icon.svg";
import Dropdown from "../../../../components/dropdown/Dropdown";
import DropdownItem from "../../../../components/dropdown/DropdownItem";
import TokenDataHeader from "./TokenDataHeader";
import StickyContainer from "../../../../components/layouts/StickyContainer";
import useSetState from "../../../../core/hooks/useSetState";
import { DropdownContextValueType } from "../../../../components/dropdown/DropdownContext";
import TableHeaderContainer from "./TableHeaderContainer";
import Container from "../../../../components/layouts/Container";
import TokenDataRow from "./TokenDataRow";
import { Theme } from "../../../../theme";

type Props = {
    searchToken?: string,
    selectedFarm?: string,
    className?: string,
};

type DEFAULT_STATE = {
    selectedFarm: DropdownContextValueType,
    searchToken?: string,
};

const DEFAULT_APP_STATE = {
    selectedFarm: "All",
    searchToken: "",
};

const tokens = [
    {}
]

const TokenList: React.FC<Props> = ({ className, searchToken, selectedFarm }) => {
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);

    const onSearchChanged = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ searchToken: e.currentTarget.value });
    }, [setState]);

    const onFarmChanged = useCallback((selectedFarm: DropdownContextValueType) => {
        setState({ selectedFarm });
    }, [setState]);

    return (
        <Container css={style}>
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
                </div>


                <div css={tableHeaderWrapperStyle}>
                    <TableHeaderContainer>
                        <TokenDataHeader>
                            <div css={titleStyle}>Token</div>
                            <div css={sortContainerStyle}>
                                <SortArrowAllIcon css={iconColorStyle} />
                                <div css={descStyle}>TVL</div>
                            </div>
                        </TokenDataHeader>

                        <TokenDataHeader align={"right"}>
                            <div css={sortContainerStyle}>
                                <SortArrowAllIcon css={iconColorStyle} />
                                <div css={descStyle}>APY</div>
                            </div>
                            <div css={titleStyle}>Daily APR</div>
                            <div css={titleStyle}>AUTOx</div>
                        </TokenDataHeader>

                        <TokenDataHeader align={"right"}>
                            <div css={titleStyle}>Balance</div>
                            <div css={titleStyle}>Deposit</div>
                            <div css={titleStyle}>Rewards</div>
                        </TokenDataHeader>

                        <TokenDataHeader>
                            <div css={titleStyle}>&nbsp;</div>
                        </TokenDataHeader>
                    </TableHeaderContainer>
                </div>
            </StickyContainer>

            {times(50).map((index: number) => (
                <TokenDataRow key={index}/>
            ))}
        </Container>
    );
}

const style = css`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const stickyContainerStyle = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const filtersContainerStyle = css`
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const inputContainerStyle = css`
    width: 100%;
`;

const dropdownContainerStyle = css`
    margin-left: 10px;
`;


const titleStyle = (theme: Theme) => css`
    color: ${theme.colours.defaultText};
    font-size: 14px;
    font-weight: bold;
`;

const descStyle = (theme: Theme) => css`
    color: ${theme.colours.defaultText};
    font-size: 14px;
    margin-left: 4px;
`;

const sortContainerStyle = css`
    display: flex;
    align-items: center;
`;

const tableHeaderWrapperStyle = (theme: Theme) => css`
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid ${theme.colours.border};
`;

const tokenIconContainerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    position: absolute;
    height: 60px;
    padding: 0;
`;

const tokenIconStyle = (align: "left" | "right") => css`
    width: 32px;
    height: 32px;

    ${align === "right" && css`
        margin-left: -16px;
    `};
`;

const tokenDataGridStyle = css`
    grid-template-columns: 2.5fr 1fr 1fr 1.5rem;
    gap: .5rem;
    display: grid;
    width: 100%;
    padding-left: 80px;
`;

const takenCellStyle = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const tokenCellFarmContainerStyle = css`
    display: flex;
    flex-direction: column;
`;

const tokenDataRowStyle = css`
    position: relative;
`;

const iconColorStyle = (theme: Theme) => css`
    fill: ${theme.colours.defaultText};
`;

export default TokenList;