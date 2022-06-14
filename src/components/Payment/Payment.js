import Title from '../Title/Title';
import Button from '../Button/Button';
import Youkassa from '../Youkassa/Youkassa';
import style from './Payment.styl';
import closeIcon from '../Title/close.svg';

function Payment({ paymentData, ...props }) {
  return (
    <div className={style.payment}>
      <Title title="Выбор платежной системы" button={(buttonWrapClass) => (
        <div className={buttonWrapClass}>
          <Button isRound={true} onClick={props.handleCloseButton}>
            <img src={closeIcon} alt="" />
          </Button>
        </div>
      )} />
      <div id="widget-youkassa">
        <Youkassa token={paymentData.token} backUrl={paymentData.backUrl} parentId="widget-youkassa" />
      </div>
    </div>
  );
}

export default Payment;
