import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-BJL923D3MC'); 
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};