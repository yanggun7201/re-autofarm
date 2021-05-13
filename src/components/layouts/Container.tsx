import React from "react";
import { css } from "@emotion/react";

type Props = {
    children?: React.ReactNode,
    className?: string,
    onClick?: (e:React.MouseEvent) => void,
    containerRef?: React.Ref<any>,
};

const Container: React.FC<Props> = ({
    children,
    className,
    onClick ,
    containerRef,
}) => (
    <div
        className={className}
        css={style}
        onClick={onClick}
        {...containerRef && { ref: containerRef }}
    >
        {children}
    </div>
);

const style = css`
    display: flex;
`;

export default Container;