import React, { memo } from "react";
import { css } from "@emotion/react";
import { AlignType } from "../../../includes/constants";

type Props = {
    children?: React.ReactNode,
    align?: AlignType,
    className?: string,
    onClick?: (e: React.MouseEvent) => void,
};

const TokenDataHeader: React.FC<Props> = ({
    children,
    className,
    onClick,
    align = "left"
}) => (
    <div className={className} css={style(align, !!onClick)} onClick={onClick}>
        <div css={childrenStyle}>{children}</div>
    </div>
);

const style = (align: AlignType, clickable: boolean) => css`
    display: flex;
    flex-direction: row;
    
    ${clickable && css`
        cursor: pointer;
    `}

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

export default memo(TokenDataHeader);