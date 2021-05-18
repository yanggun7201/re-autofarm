const darkColours = {
    transparent: 'rgba(0,0,0,0)', // Useful for transitions between no fill and fill.,
    white: '#ffffff',
    red: '#f04444',
    text: '#ffffff',
    defaultText: '#ffffff',
    defaultText2: '#6B7280',
    blackGrayText: '#9ca3af',
    grayGrayText: '#989fab',
    link: '#3c81f6',
    background: '#121212',
    border: '#202a37',
    menu: {
        linearGradient: '#161d2d, #463a90',
        hover: 'inherit',
        active: '#18202e',
    },
    logo: '#ffffff',
    dropdown: {
        activeBackground: '#ffffff',
        activeColor: '#121212',
        hover: '#202a37',
    },
    inActiveMode: '#4b5563',
    button: {
        primary: '#1d4ed8',
        disabled: '#1f2a37',
        secondary: '#1a2d50',
        tertiary: '#1f2a37',
        border: '#3c81f6',
        hover: '#1e40af',
        red: '#f04444',
        grey: '#e4e7eb',
    },
    numberInput: {
        background: '#1f2a37',
    },
    box: {
        background: '#111927',
    },
    linkButton: {
        link: '#1f2a37',
        hover: '#374251',
    },
    stakingButton: {
        selected: '#4959c4',
    },
    connectWallet: {
        background: '#273237',
        hover: '#101b21',
        title: '#c7c7c7',
        description: '#888888',
    },
    swap: {
        subTitle: '#9ca3af',
        coinName: '#ffffff',
        coinInputBackground: '#1f2a37',
        toleranceBackground: '#1f2a37',
        blackGrayText: '#9ca3af',
    },
    selectToken: {
        background: '#111927',
        hover: '#1f2a37',
    },
    routing: {
        headerBackground: '#111927',
        bodyBackground: '#1f2a37',
    },
};

export default {
    ...darkColours,
};
