import React from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import CommonLink from "../links/CommonLink";

type Props = {
    children: React.ReactNode,
    href: string,
    className?: string,
};

const LinkButton: React.FC<Props> = ({
    children,
    href,
    className = ""
}) => (
    <CommonLink href={href} className={className} css={style}>
        {children}
    </CommonLink>
);

const style = (theme: Theme) => css`
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    padding: 8px;
    white-space: nowrap;
    transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    transition-duration: .15s;
    font-weight: bold;
    color: ${theme.colours.text};
    background-color: ${theme.colours.linkButton.link};
    transition: background-color ${theme.transitions.transition};

    :hover {
        background-color: ${theme.colours.linkButton.hover};
    }

    :active,
    :focus,
    :visited {
        color: ${theme.colours.text};
    }
`;

export default LinkButton;

