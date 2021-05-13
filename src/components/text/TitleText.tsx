import React, { memo } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { AlignType } from "../../includes/constants";

type Props = {
    children?: React.ReactNode,
    className?: string,
    align?: AlignType,
};

const TitleText: React.FC<Props> = ({ children, className, align = "left" }) => (
    <div className={className} css={style(align)}>
        {children}
    </div>
);

const style = (align: AlignType) => (theme: Theme) => css`
    color: ${theme.colours.text};
    font-size: 16px;
    font-weight: bold;
    height: 24px;
    text-align: ${align};

    ${theme.breakpoints.only("xs")} {
        height: 20px;
        font-size: 14px;
    }
`;

export default memo(TitleText);