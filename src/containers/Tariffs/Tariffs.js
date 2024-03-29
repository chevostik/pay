/**
 * TODO: После вывода ошибки о неверном промокоде не активна кнопка покупки
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import * as api from '../../api/api';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Tariff from '../../components/Tariff/Tariff';
import Payment from '../../components/Payment/Payment';
import style from './Tariffs.styl'
import closeIcon from '../../components/Title/close.svg';

function Tariffs(props) {
  const [tariffs, setTariffs] = useState([]);
  const [isShowPayment, setIsShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [promoCodeError, setPromoCodeError] = useState({});

  useEffect(() => {
    async function fetchData() {
      await props.onLoadingData(true);
      const tariffs = await api.getTariffs();
      const filteredTariffs = tariffs.filter(item => item.apple_pay_id.length === 0)
      setTariffs(filteredTariffs);
      await props.onLoadingData(false);
    }

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();

  async function handlePayment(tariff) {
    await props.onLoadingData(true);
    const utm = window.sessionStorage.getItem('utmString') || '';
    let promo_code = null;

    if (tariff.promoCode) {
      promo_code = { promo_code: tariff.promoCode.toLowerCase() };
    }

    try {
      let paymentData = await api.getTokenForPaymentSubscription({
        tariff_id: tariff.id,
        is_recurrent: tariff.isProlongation ? '1' : '0',
        utm,
        ...(promo_code ? promo_code : {})
      }, navigate);

      setIsShowPayment(true);
      setPaymentData({ ...paymentData, backUrl: 'https://pay.chevostik.ru/successful-payment/' });
    } catch(err) {
      setPromoCodeError({
        tariffId: tariff.id,
        message: err.message
      });
    }

    await props.onLoadingData(false);
  }

  function handlePromoCodeError() {
    setPromoCodeError({});
  }

  if (isShowPayment) {
    return <Payment paymentData={paymentData} handleCloseButton={() => setIsShowPayment(false)} />
  }

  return (
    <div className={style.tariffs}>
      <Title title="Выбор тарифа" button={(buttonWrapClass) => (
        <Link className={buttonWrapClass} to="/cabinet/">
          <Button isRound={true}>
            <img src={closeIcon} alt="" />
          </Button>
        </Link>
      )} />
      <div className={style.scroll}>
        <div className={cn(style.inner, {[style.isOne]: (tariffs.length === 1)})}>
          {
            tariffs.map((tariff) => (
              <div key={tariff.id} className={style.tariff}>
                {tariff.id === promoCodeError.tariffId}
                <Tariff tariff={tariff}
                        onPayment={handlePayment}
                        onPromoCodeError={handlePromoCodeError}
                        promoCodeError={(tariff.id === promoCodeError.tariffId) ? promoCodeError.message : ''} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Tariffs;
