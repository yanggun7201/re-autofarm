import React, { memo } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import CommonLink from "../links/CommonLink";

const LearnMore: React.FC = () => (
    <div css={style}>
        <div css={titleStyle}>Learn More</div>
        <div css={itemContainerStyle}>
            <CommonLink
                css={linkStyle}
                href="https://github.com/autofarm-network/autofarm_audits/raw/main/CertiK%20Audit%20Report%20280321.pdf"
            >
                Audit
            </CommonLink>
            <CommonLink
                css={linkStyle}
                href="https://github.com/autofarm-network/autofarmV2"
            >
                Github
            </CommonLink>
            <CommonLink
                css={linkStyle}
                href="https://bscscan.com/address/0x0895196562c7868c5be92459fae7f877ed450452"
            >
                Contract
            </CommonLink>
            <CommonLink
                css={linkStyle}
                href="https://autofarm.gitbook.io/autofarm-network/"
            >
                Wiki
            </CommonLink>
        </div>
    </div>
);

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
    flex-direction: row;
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

export default memo(LearnMore);