import React from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { Link, NavLink } from "react-router-dom";

type Props = {
    children: React.ReactNode,
    title: string,
    path: string,
    onClick: () => void,
}

const MenuItem: React.FC<Props> = ({ children, title, path = "/", onClick }) => (
    <NavLink to={path} onClick={onClick} exact css={style} activeClassName={"active"}>
        {children}
        <div css={titleStyle}>{title}</div>
    </NavLink>

);

const style = (theme: Theme) => css`
    display: flex;
    align-items: center;
    width: 102px;
    height: 24px;
    padding: 8px;
    border-radius: 8px;
    color: black;
    text-decoration: none;
    font-family: '"system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"';
    font-weight: bold;
    transition: background-color ${theme.transitions.transition};

    :hover {
        background-color: #edeef9;
    }

    &.active {
        background-color: #dadff4;
    }
`;

const titleStyle = css`
    margin-left: 7px;
`;

export default MenuItem;

