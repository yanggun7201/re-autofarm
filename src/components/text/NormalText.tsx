import React, { memo } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { AlignType } from "../../includes/constants";

type DisplayType = "inline" | "flex" | "inline-flex" | "block" | "";

type Props = {
    children?: React.ReactNode,
    className?: string,
    display?: DisplayType,
    align?: AlignType,
};

const NormalText: React.FC<Props> = ({
                                         display = "",
                                         children,
                                         className,
                                         align = "left"
                                     }) => (
    <div className={className} css={style(display, align)}>
        {children}
    </div>
);

const style = (display: DisplayType, align: AlignType) => (theme: Theme) => css`
    color: ${theme.colours.text};
    font-size: 16px;
    text-align: ${align};
    ${display && css`
        display: ${display};
    `};

    ${theme.breakpoints.only("xs")} {
        font-size: 14px;
    }
`;

export default memo(NormalText);