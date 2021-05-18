import React, { memo } from 'react';
import { css } from "@emotion/react";

type Props = {
    children?: React.ReactNode,
};

const RoutingItemContainer: React.FC<Props> = ({ children }) => (
    <div css={multiRoutingItemStyle}>
        {children}
    </div>
);

const multiRoutingItemStyle = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-left: 20px;

    > :not(:first-of-type) {
        margin-left: 20px;
    }
`;

export default memo(RoutingItemContainer);