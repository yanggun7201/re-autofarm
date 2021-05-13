import React, { memo } from "react";
import Container from "../layouts/Container";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import CommonLink from "../links/CommonLink";
import { ReactComponent as TelegramIcon } from "../../images/telegram-icon.svg";
import { ReactComponent as MediumIcon } from "../../images/medium-icon.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
import { ReactComponent as DiscordIcon } from "../../images/discord-icon.svg";

const ContactUs: React.FC = () => {
    return (
        <div css={itemContainerStyle}>
            <div css={itemContainerTitleStyle}>Contact Us</div>
            <div css={contactUsContainerStyle}>
                <div>
                    <span css={itemSemiTitleStyle}>Business Enquiries</span>
                    <br />
                    <a href="mailto:hello@autofarm.network" css={mailLinkStyle}>hello@autofarm.network</a>
                </div>
                <div>
                    <span css={itemSemiTitleStyle}>Customer Support</span>
                    <br />
                    <a href="mailto:support@autofarm.network" css={mailLinkStyle}>support@autofarm.network</a>
                </div>
            </div>
        </div>
    )
};

const itemContainerStyle = css`
    display: flex;
    flex-direction: column;
    font-size: 16px;
`;

const itemContainerTitleStyle = (theme: Theme) => css`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.colours.text};
    margin-bottom: 14px;
`;

const contactUsContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: column;

    > div {
        margin-bottom: 6px;
    }
`;

const itemSemiTitleStyle = (theme: Theme) => css`
    font-weight: bold;
    color: ${theme.colours.text};
`;

const mailLinkStyle = (theme: Theme) => css`
    text-decoration: none;
    color: ${theme.colours.text};

    :active,
    :focus,
    :visited {
        color: ${theme.colours.text};
    }
`;

export default memo(ContactUs);