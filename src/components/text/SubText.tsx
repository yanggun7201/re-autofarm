import React, { memo } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { AlignType } from "../../includes/constants";

type Props = {
    children?: React.ReactNode,
    className?: string,
    align?: AlignType,
};

const SubText: React.FC<Props> = ({
    children,
    className,
    align = "left"
}) => (
    <div className={className} css={style(align)}>
        {children}
    </div>
);

const style = (align: AlignType) => (theme: Theme) => css`
    color: ${theme.colours.defaultText};
    font-size: 14px;
    font-weight: bold;
    text-align: ${align};

    ${theme.breakpoints.only("xs")} {
        height: 16px;
        font-size: 12px;
    }
`;

export default memo(SubText);