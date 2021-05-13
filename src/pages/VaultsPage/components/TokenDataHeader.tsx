import React from "react";
import { css } from "@emotion/react";
import { AlignType } from "./constants";

type Props = {
    children?: React.ReactNode,
    title?: string,
    desc?: string,
    align?: AlignType,
    className?: string,
    onClick?: (e: React.MouseEvent) => void,
};

const TokenDataHeader: React.FC<Props> = ({ children, className, onClick, title = "", desc = "", align = "left" }) => (
    <div className={className} css={style(align)} onClick={onClick}>
        <div css={childrenStyle}>{children}</div>
    </div>
);

const style = (align: AlignType) => css`
    display: flex;
    flex-direction: row;

    ${align === "left" && css`
        justify-content: flex-start;
    `};

    ${align === "right" && css`
        justify-content: flex-end;
    `};
`;

const childrenStyle = css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;


export default TokenDataHeader;