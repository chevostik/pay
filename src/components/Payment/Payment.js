import { useState } from 'react';
import Title from '../Title/Title';
import Button from '../Button/Button';
import Youkassa from '../Youkassa/Youkassa';
import PayPalButton from '../PayPalButton/PayPalButton';
import style from './Payment.styl';
import closeIcon from '../Title/close.svg';
import PayPalPopup from '../PayPalPopup/PayPalPopup';

function Payment({ paymentData, ...props }) {
  const [isPayPalPopup, setIsPayPalPopup] = useState(false);

  function openPayPalPopup() {
    setIsPayPalPopup(true);
  }

  function closePayPalClose() {
    setIsPayPalPopup(false);
  }

  if (isPayPalPopup) {
    return <PayPalPopup handleCloseButton={closePayPalClose} />
  }

  return (
    <div className={style.payment}>
      <Title title="Выбор платежной системы" button={(buttonWrapClass) => (
        <div className={buttonWrapClass}>
          <Button isRound={true} onClick={props.handleCloseButton}>
            <img src={closeIcon} alt="" />
          </Button>
        </div>
      )} />
      <div className={style.paypal}>
        <PayPalButton onClick={openPayPalPopup} />
      </div>
      <div id="widget-youkassa" className={style.youkassa}>
        <Youkassa token={paymentData.token} backUrl={paymentData.backUrl} parentId="widget-youkassa" />
      </div>
    </div>
  );
}

export default Payment;
