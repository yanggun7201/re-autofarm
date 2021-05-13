import React, { memo } from "react";
import Container from "./layouts/Container";
import { css } from "@emotion/react";
import { Theme } from "../theme";
import CommonLink from "./links/CommonLink";
import { ReactComponent as TelegramIcon } from "../images/telegram-icon.svg";
import { ReactComponent as MediumIcon } from "../images/medium-icon.svg";
import { ReactComponent as TwitterIcon } from "../images/twitter-icon.svg";
import { ReactComponent as DiscordIcon } from "../images/discord-icon.svg";

const Footer: React.FC = () => {
    return (
        <Container css={style}>
            <div css={innerContainerStyle}>
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
                <div css={itemContainerStyle}>
                    <div css={itemContainerTitleStyle}>Learn More</div>
                    <div css={learnMoreContainerStyle}>
                        <CommonLink
                            css={learnMoreLinkStyle}
                            href="https://github.com/autofarm-network/autofarm_audits/raw/main/CertiK%20Audit%20Report%20280321.pdf"
                        >
                            Audit
                        </CommonLink>
                        <CommonLink
                            css={learnMoreLinkStyle}
                            href="https://github.com/autofarm-network/autofarmV2"
                        >
                            Github
                        </CommonLink>
                        <CommonLink
                            css={learnMoreLinkStyle}
                            href="https://bscscan.com/address/0x0895196562c7868c5be92459fae7f877ed450452"
                        >
                            Contract
                        </CommonLink>
                        <CommonLink
                            css={learnMoreLinkStyle}
                            href="https://autofarm.gitbook.io/autofarm-network/"
                        >
                            Wiki
                        </CommonLink>
                    </div>
                </div>
                <div css={itemContainerStyle}>
                    <div css={itemContainerTitleStyle}>Join Community</div>
                    <div className="flex space-x-5">
                        <CommonLink
                            css={learnMoreLinkStyle}
                            href="https://t.me/autofarm_network"
                        >
                            <TelegramIcon css={communityIconStyle} />
                        </CommonLink>
                        <CommonLink
                            css={learnMoreLinkStyle}
                            href="https://medium.com/autofarm-network"
                        >
                            <MediumIcon css={communityIconStyle} />
                        </CommonLink>
                        <CommonLink
                            css={learnMoreLinkStyle}
                            href="https://twitter.com/autofarmnetwork"
                        >
                            <TwitterIcon css={communityIconStyle} />
                        </CommonLink>
                        <CommonLink
                            css={learnMoreLinkStyle}
                            href="https://discord.gg/bJ9ZsypQzv"
                        >
                            <DiscordIcon css={communityIconStyle} />
                        </CommonLink>
                    </div>
                </div>
            </div>
        </Container>
    )
};

const style = css`
    margin: 0 auto;
`;

const innerContainerStyle = css`
    width: 896px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

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

const learnMoreContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
`;

const learnMoreLinkStyle = (theme: Theme) => css`
    font-size: 16px;
    color: ${theme.colours.text};

    :not(:first-of-type) {
        margin-left: 20px;
    }

    :active,
    :focus,
    :visited {
        color: ${theme.colours.text};
    }
`;

const communityIconStyle = (theme: Theme) => css`
    width: 20px;
    height: 20px;
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

export default memo(Footer);