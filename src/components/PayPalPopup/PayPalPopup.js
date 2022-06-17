import Button from '../Button/Button';
import style from './PayPalPopup.styl';
import closeIcon from './close.svg';
import payPalIcon from './paypal.png';
import payPalRetinaIcon from './paypal@2x.png'

function PayPalPopup(props) {
  return (
    <div className={style.payPalPopup}>
      <div className={style.payPalPopupInner}>
        <div className={style.button}>
          <Button theme="clean" color="transparent" onClick={props.handleCloseButton}>
            <img src={closeIcon} alt="" />
          </Button>
        </div>
        <p className={style.pay}>Оплата на <a href="https://www.paypal.com" target="_blank">dmitriy.tomisonets@gmail.com</a></p>
        <p>После оплаты пришлите скриншот и почту для оформления подписки по адресу <a href="mailto:hello@chevostik.ru">hello@chevostik.ru</a></p>
        <p className={style.activate}>Активация в течении 1-2 часов</p>
        <img className={style.icon} src={payPalIcon} srcSet={`${payPalRetinaIcon} 2x`} alt="" />
      </div>
    </div>
  );
}

export default PayPalPopup;
