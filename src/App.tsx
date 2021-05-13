import React from 'react';
import { css, Global } from "@emotion/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/Header";
import VaultsPage from "./pages/VaultsPage";
import SwapPage from "./pages/SwapPage";
import DashboardPage from "./pages/DashboardPage";
import Container from "./components/layouts/Container";
import { Theme } from "./theme";
import BottomMenus from "./components/menu/BottomMenus";
import statsData from "./data/StatsData";
import { ConnectWalletContextProvider } from "./core/contexts/ConnectWalletContext";
import ConnectWalletModal from "./components/modals/ConnectWalletModal";

type Props = {
    toggleTheme: () => void,
};

const App: React.FC<Props> = ({ toggleTheme }) => {

    return (
        <ConnectWalletContextProvider>
            <div css={containerStyle}>
                <Global styles={style} />
                <BrowserRouter>
                    <Header toggleTheme={toggleTheme} priceAUTO={statsData.priceAUTO} />
                    <Container css={bodyContainerStyle}>
                        <Switch>
                            <Route path="/swap/:outToken?">
                                <SwapPage />
                            </Route>
                            <Route path="/dashboard">
                                <DashboardPage />
                            </Route>
                            <Route path="/">
                                <VaultsPage />
                            </Route>
                        </Switch>
                        <Footer />
                        <BottomMenus />
                        <ConnectWalletModal />
                    </Container>
                </BrowserRouter>
            </div>
        </ConnectWalletContextProvider>
    );
}

const containerStyle = (theme: Theme) => css`
    display: flex;
    flex-direction: row;

    ${theme.breakpoints.up("xl")} {
        max-width: 1536px;
        margin: 0 auto;
    }

    ${theme.breakpoints.down("lg")} {
        flex-direction: column;
    }

`;

const bodyContainerStyle = css`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const style = (theme: Theme) => css`
    body {
        padding: 0;
        margin: 0;
        background-color: ${theme.colours.background};
        color: ${theme.colours.text};
    }

    a {
        text-decoration: none;
    }

    * {
        font-family: '"ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"';
    }

    *,
    :after,
    :before {
        box-sizing: border-box;
    }

    .react-responsive-modal-modal {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export default App;
