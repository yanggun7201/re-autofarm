import React, { memo } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { Link } from "react-router-dom";

type Props = {
    children: React.ReactNode,
    href: string,
    className?: string,
};

const CommonLink: React.FC<Props> = ({ children = "", href = "/", className = "" }) => {
    if (href.startsWith("http")) {
        return <a href={href} target="_blank" rel="noreferrer" css={style} className={className}>{children}</a>
    }

    return (
        <Link to={href} css={style} className={className}>{children}</Link>
    );
}

const style = (theme: Theme) => css`
    font-size: 14px;
    color: ${theme.colours.link};
    cursor: pointer;

    :active,
    :visited {
        color: ${theme.colours.link};
    }
`;

export default memo(CommonLink);

