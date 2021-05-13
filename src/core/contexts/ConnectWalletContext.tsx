import React, { createContext, useContext, useMemo, Dispatch, useCallback } from "react";
import useSetState from "../hooks/useSetState";
import { NOOP } from "../../constants";

export type ConnectWalletContextType = {
    toggleConnectWalletModal: Dispatch<boolean>,
    disconnectWallet: () => void,
    connectWallet: () => void,
    isOpen: boolean,
    walletIsConnected: boolean,
}

const ConnectWalletContext = createContext<ConnectWalletContextType>({
    isOpen: false,
    walletIsConnected: false,
    disconnectWallet: NOOP,
    connectWallet: NOOP,
    toggleConnectWalletModal: (isOpen: boolean) => {
    },
});

type Props = {
    children?: React.ReactNode,
};

type DEFAULT_STATE = {
    isOpen: boolean,
    walletIsConnected: boolean,
};

const DEFAULT_APP_STATE = {
    isOpen: false,
    walletIsConnected: false,
};

export const ConnectWalletContextProvider = ({ children }: Props) => {
    const [state, setState] = useSetState<DEFAULT_STATE>(DEFAULT_APP_STATE);

    const connectWallet = useCallback(() => {
        setState({ walletIsConnected: true });
    }, [setState]);

    const disconnectWallet = useCallback(() => {
        setState({ walletIsConnected: false });
    }, [setState]);

    const toggleConnectWalletModal = useCallback((isOpen: boolean) => {
        setState({ isOpen });
    }, [setState]);

    const value: ConnectWalletContextType = useMemo(() => {
        return {
            ...state,
            connectWallet,
            disconnectWallet,
            toggleConnectWalletModal,
        }
    }, [state, toggleConnectWalletModal, disconnectWallet, connectWallet]);

    return (
        <ConnectWalletContext.Provider value={value}>
            {children}
        </ConnectWalletContext.Provider>
    );
};

export const useConnectWalletContext = () => {
    return useContext<ConnectWalletContextType>(ConnectWalletContext);
};