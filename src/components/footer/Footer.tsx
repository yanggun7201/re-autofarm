import React, { memo } from "react";
import Container from "../layouts/Container";
import { css } from "@emotion/react";
import ContactUs from "./ContactUs";
import LearnMore from "./LearnMore";
import JoinCommunity from "./JoinCommunity";
import { Theme } from "../../theme";

const Footer: React.FC = () => (
    <Container css={style}>
        <div css={innerContainerStyle}>
            <ContactUs />
            <LearnMore />
            <JoinCommunity />
        </div>
    </Container>
);

const style = (theme: Theme) => css`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    border-top: 1px solid ${theme.colours.border};
    border-left: 1px solid ${theme.colours.border};
`;

const innerContainerStyle = (theme: Theme) => css`
    width: 896px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    padding: 48px 12px;

    ${theme.breakpoints.down("sm")} {
        flex-direction: column;
        padding: 32px 12px 80px;

        > div:not(:first-of-type) {
            margin-top: 24px;
        }
    }
`;

export default memo(Footer);