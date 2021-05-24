import React, { useCallback } from "react";
import { css } from "@emotion/react";
import { useHistory } from "react-router";
import { Theme } from "../theme";

import { ReactComponent as LogoRound } from "../images/logo-round.svg";
import { ReactComponent as LogoText } from "../images/logo-text.svg";

type Props = {
    className?: string,
};

const Logo: React.FC<Props> = ({ className }) => {
    const history = useHistory();
    
    const onLogoClicked = useCallback(() => {
        history.push("/");
    }, []);

    return (
        <div css={style} className={className} onClick={onLogoClicked}>
            <LogoRound css={logoStyle} />
            <LogoText css={logoTextStyle} />
        </div>
    );
}

const style = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
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

