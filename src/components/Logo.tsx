import React from "react";

import { ReactComponent as LogoRound } from "../images/logo-round.svg";
import { ReactComponent as LogoText } from "../images/logo-text.svg";
import { css } from "@emotion/react";
import { Theme } from "../theme";

type Props = {
    className?: string,
};

const Logo: React.FC<Props> = ({ className }) => (
    <div css={style} className={className}>
        <LogoRound css={logoStyle} />
        <LogoText css={logoTextStyle} />
    </div>
);

const style = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const logoStyle = css`
    height: 32px;
    width: 32px;
`;

const logoTextStyle = (theme: Theme) => css`
    height: 30px;
    width: 96px;
    display: block;
    color: ${theme.colours.logo};
    fill: ${theme.colours.logo};
    margin-left: 10px;

    ${theme.breakpoints.down("xs")} {
        display: none;
    }
`;

export default Logo;

