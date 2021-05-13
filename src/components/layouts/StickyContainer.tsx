import React from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";

type Direction = "top" | "bottom";
type Props = {
    children?: React.ReactNode,
    className?: string,
    direction?: Direction;
};

const StickyContainer: React.FC<Props> = ({ children, className, direction = "top" }) => (
    <div className={className} css={style(direction)}>
        {children}
    </div>
);

const style = (direction: Direction) => (theme: Theme) => css`
    display: flex;
    position: sticky;
    height: max-content;
    background-color: ${theme.colours.background};
    z-index: ${theme.zIndex.zIndexOne};

    ${direction === "top"
            ? css`top: 0;`
            : css`bottom: 0;`
    };
`;

export default StickyContainer;