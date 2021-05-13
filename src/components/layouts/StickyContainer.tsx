import React from "react";
import { css } from "@emotion/react";

type Props = {
    children?: React.ReactNode,
    className?: string,
};

const Container: React.FC<Props> = ({ children, className }) => (
    <div className={className} css={style}>
        {children}
    </div>
);

const style = css`
    display: flex;
    //background-color: red;
`;

export default Container;