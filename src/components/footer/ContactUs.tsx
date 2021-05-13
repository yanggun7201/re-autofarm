import React, { memo } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";

const ContactUs: React.FC = () => {
    return (
        <div css={style}>
            <div css={titleStyle}>Contact Us</div>
            <div css={itemContainerStyle}>
                <div>
                    <span css={semiTitleStyle}>Business Enquiries</span>
                    <br />
                    <a href="mailto:hello@autofarm.network" css={mailStyle}>hello@autofarm.network</a>
                </div>
                <div>
                    <span css={semiTitleStyle}>Customer Support</span>
                    <br />
                    <a href="mailto:support@autofarm.network" css={mailStyle}>support@autofarm.network</a>
                </div>
            </div>
        </div>
    )
};

const style = css`
    display: flex;
    flex-direction: column;
    font-size: 16px;
`;

const titleStyle = (theme: Theme) => css`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.colours.text};
    margin-bottom: 14px;
`;

const itemContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;

    > div {
        margin-bottom: 6px;
    }
`;

const semiTitleStyle = (theme: Theme) => css`
    font-weight: bold;
    color: ${theme.colours.text};
`;

const mailStyle = (theme: Theme) => css`
    text-decoration: none;
    color: ${theme.colours.text};

    :active,
    :focus,
    :visited {
        color: ${theme.colours.text};
    }
`;

export default memo(ContactUs);