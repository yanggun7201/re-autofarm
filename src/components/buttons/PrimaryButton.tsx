import React, { useCallback, useEffect, useRef } from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";
import { NOOP } from "../../constants";
import useSetState from "../../core/hooks/useSetState";
import { ReactComponent as LoadingIcon } from "../../images/loading-icon.svg";

type Props = {
    children?: React.ReactNode,
    onClick?: () => void | Promise<void>,
    className?: string,
    disabled?: boolean,
    fullWidth?: boolean,
};

type DEFAULT_STATE = {
    isLoading: boolean,
};

const DEFAULT_APP_STATE = {
    isLoading: false,
};

const PrimaryButton: React.FC<Props> = ({
    disabled = false,
    children,
    onClick = NOOP,
    className = "",
    fullWidth = false,
}) => {

    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);

    const unmounted = useRef(false);

    useEffect(() => {
        return () => {
            unmounted.current = true;
        }
    }, [])

    const handleClick = useCallback(() => {
        const clickResult: any = onClick();
        if (clickResult instanceof Promise) {
            setState({ isLoading: true });

            clickResult.finally(() => {
                if (!unmounted.current) {
                    setState({ isLoading: false });
                }
            });
        }
    }, [onClick, setState]);

    return (
        <button
            css={style(disabled, fullWidth)}
            className={className}
            onClick={handleClick}
            {...disabled && { disabled: true }}
        >
            {state.isLoading
                ? (
                    <div css={loadingContainerStyle}>
                        <LoadingIcon css={loadingIconStyle} />
                        <span className="ml-3">Loading...</span>
                    </div>
                )
                : (<>{children}</>)
            }

        </button>
    );
}

const style = (disabled: boolean, fullWidth: boolean) => (theme: Theme) => css`
    border: 1px solid ${theme.colours.button.primary};
    background-color: ${theme.colours.button.primary};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 8px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    transition: background-color ${theme.transitions.transition};

    ${fullWidth && css`
        width: 100%;
    `};

    ${disabled
            ? css`
                border: 1px solid ${theme.colours.button.disabled};
                background-color: ${theme.colours.button.disabled};
            `
            : css`
                cursor: pointer;

                :hover {
                    background-color: ${theme.colours.button.hover};
                }
            `
    };
`;

const loadingContainerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const loadingIconStyle = (theme: Theme) => css`
    animation: spin 1s linear infinite;

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    margin-right: 8px;

    ${theme.breakpoints.only("xs")} {
        margin-right: 4px;
    }
`;

export default PrimaryButton;

