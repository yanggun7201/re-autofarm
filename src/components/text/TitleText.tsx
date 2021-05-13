import React, { memo } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../../../theme";

type Props = {
    children?: React.ReactNode,
    className?: string,
};

const TitleText: React.FC<Props> = ({ children, className }) => (
    <div className={className} css={style}>
        {children}
    </div>
);

const style = (theme: Theme) => css`
    color: ${theme.colours.text};
    font-size: 16px;
    font-weight: bold;
    height: 24px;
`;

export default memo(TitleText);