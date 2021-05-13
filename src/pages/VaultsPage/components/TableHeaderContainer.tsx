import React, { memo } from "react";
import { css } from "@emotion/react";
import { ReactComponent as SortArrowAllIcon } from "../../../../images/sort-arrow-all.svg";

type Props = {
    children?: React.ReactNode,
    className?: string,
    onClick?: (e: React.MouseEvent) => void,
};

const TokenDataHeaderContainer: React.FC<Props> = ({ children, className, onClick }) => (
    <div className={className} css={style(onClick)} onClick={onClick}>
        {children}
    </div>
);

const style = (onClick?: (e: React.MouseEvent) => void) => css`
    grid-template-columns: 2.5fr 1fr 1fr 1.5rem;
    gap: .5rem;
    display: grid;
    width: 100%;
    height: 60px;
    padding: 8px;
    padding-left: 80px;

    ${onClick && css`
        cursor: pointer;
    `};
`;


export default memo(TokenDataHeaderContainer);