import React  from "react";
import { css } from "@emotion/react";
import { Theme } from "../../theme";

type Props = {
    children?: React.ReactNode,
    value?: number,
    defaultValue?: number,
    placeholder?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string,
    inputRef?: React.Ref<any>,
};

const InputNumber: React.FC<Props> = ({
    children,
    className = "",
    value = 0,
    defaultValue = 0,
    placeholder = "",
    onChange,
    inputRef,
}) => {
    return (
        <div css={containerStyle} className={className}>
            <input
                css={inputStyle(onChange ? value : defaultValue)}
                type="number"
                step="any"
                min={0}
                inputMode="decimal"
                placeholder={placeholder}
                {...onChange && { onChange, value }}
                {...inputRef && { ref: inputRef, defaultValue: defaultValue }}
            />
            {children}
        </div>
    );
}

const containerStyle = (theme: Theme) => css`
    border: 1px solid ${theme.colours.border};
    background-color: ${theme.colours.numberInput.background};
    margin: 4px 0;
    padding: 0 8px;
    display: flex;
    border-radius: 6px;
    height: 34px;
    align-items: center;
`;

const inputStyle = (value: number) => (theme: Theme) => css`
    padding: 0;
    border: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    background-color: inherit;

    :focus,
    :active {
        outline: none;
    }

    ${theme.mixins.placeholder()};

    ${value === 0 && css`
        color: ${theme.mixins.placeholderColor};
    `};
`;

export default InputNumber;

