import React, { memo } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import CommonLink from "../links/CommonLink";
import { ReactComponent as TelegramIcon } from "../../images/telegram-icon.svg";
import { ReactComponent as MediumIcon } from "../../images/medium-icon.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
import { ReactComponent as DiscordIcon } from "../../images/discord-icon.svg";

const JoinCommunity: React.FC = () => {
    return (
        <div css={style}>
            <div css={titleStyle}>Join Community</div>
            <div css={itemContainerStyle}>
                <CommonLink css={linkStyle} href="https://t.me/autofarm_network">
                    <TelegramIcon css={iconStyle} />
                </CommonLink>
                <CommonLink css={linkStyle} href="https://medium.com/autofarm-network">
                    <MediumIcon css={iconStyle} />
                </CommonLink>
                <CommonLink css={linkStyle} href="https://twitter.com/autofarmnetwork">
                    <TwitterIcon css={iconStyle} />
                </CommonLink>
                <CommonLink css={linkStyle} href="https://discord.gg/bJ9ZsypQzv">
                    <DiscordIcon css={iconStyle} />
                </CommonLink>
            </div>
        </div>
    )
};

const style = css`
    display: flex;
    flex-direction: column;
    font-size: 16px;
`;

const itemContainerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;
`;

const titleStyle = (theme: Theme) => css`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.colours.text};
    margin-bottom: 14px;
`;

const linkStyle = (theme: Theme) => css`
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

const iconStyle = (theme: Theme) => css`
    width: 20px;
    height: 20px;
`;


export default memo(JoinCommunity);