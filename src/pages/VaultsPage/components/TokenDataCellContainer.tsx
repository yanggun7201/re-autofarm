import React from "react";
import { css } from "@emotion/react";
import { ReactComponent as SortArrowAllIcon } from "../../../../images/sort-arrow-all.svg";

type AlignType = "left" | "right";

type Props = {
    children?: React.ReactNode,
    align?: AlignType,
    className?: string,
    onClick?: (e: React.MouseEvent) => void,
};

const TokenDataCellContainer: React.FC<Props> = ({
                                                     children,
                                                     className,
                                                     onClick,
                                                     align = "left"
                                                 }) => (
    <div className={className} css={style(align)} onClick={onClick}>
        {children}
    </div>
);

const style = (align: AlignType) => css`
    display: flex;
    flex-direction: column;

    ${align === "left" && css`
        align-items: flex-start;
    `};

    ${align === "right" && css`
        align-items: flex-end;
    `};
`;

export default TokenDataCellContainer;