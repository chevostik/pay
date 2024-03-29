import { useEffect } from 'react';

function Youkassa({ token, parentId, endLoad, backUrl }) {
  useEffect(()  => {
    const youkassa = new window.YooMoneyCheckoutWidget({
      confirmation_token: token,
      return_url: backUrl,
      error_callback(error) {
        window.devMode && console.log('Error yookassa', error)
      },
      customization: {
        colors: {
          controlPrimary: '#f77600',
          background: '#FFFEF0',
          border: '#FFFEF0',
          text: '#0F1839'
        }
      }
    });

    youkassa.render(parentId)
      .then(endLoad);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default Youkassa;
