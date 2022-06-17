import style from './PayPalButton.styl';
import payPalIcon from './paypal.png'
import payPalRetinaIcon from './paypal@2x.png'

function PayPalButton(props) {
  return (
    <button className={style.payPalButton} onClick={props.onClick}>
      <img className={style.icon} src={payPalIcon} srcSet={`${payPalRetinaIcon} 2x`} width={40} height={40} alt=""/>
      <div className={style.title}>PayPall</div>
    </button>
  );
}

export default PayPalButton;
