import React from "react";

import { ReactComponent as LogoRoundSVG } from "../images/logo-round.svg";
import { ReactComponent as LogoTextSVG } from "../images/logo-text.svg";
import { css } from "@emotion/react";

const Logo: React.FC = () => (
    <div css={style} className="flex justify-center xl:justify-start items-center space-x-1 sm:space-x-2">
        <LogoRoundSVG css={logoStyle} />
        <LogoTextSVG css={logoTextStyle} />
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

const logoTextStyle = css`
    height: 30px;
    width: 6rem;
    display: block;
    color: #4959c4;
    fill: #4959c4;
    padding-left: 10px;
`;

export default Logo;

