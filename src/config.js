const config = {
  host: window.location.host.includes('chevostik.ru') ? 'https://pay.chevostik.ru' : '',
  apiHost: window.location.host.includes('chevostik.ru') ? 'https://stage.chevostik.ru' : '',
  demoTariffId: 52,
  superTariffId: 48
};

export default config;
