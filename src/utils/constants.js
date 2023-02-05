// export const BASE_URL = 'https://localhost:3000';
export const BASE_URL   = 'https://api.domainname.kmariasha.nomoredomains.sbs';
export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const PRE_LINK   = 'https://api.nomoreparties.co';
export const SHORT_DURATION_LIMIT = 40;

export const endpoints = {
    header: ['/movies', '/saved-movies', '/profile', '/about', '/'],
    footer: ['/movies', '/saved-movies', '/about', '/'],
};

export const completeMissingField = {
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80'
};

export const devicesWidth = {
    SCREEN_SM: 480,
    SCREEN_MD: 768, 
    SCREEN_LG: 1280  
}

export const drawCardsOnDevices = {
    mobile:     { total: 5,  more: 2 },
    tablet:     { total: 8,  more: 2 },
    desktop:    { total: 12, more: 3 },    
}