import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../../api/api';
import Title from '../Title/Title';
import Button from '../Button/Button';
import Tariff from '../Tariff/Tariff';
import Payment from '../Payment/Payment';
import style from './Tariffs.styl'
import closeIcon from '../Title/close.svg';

function Tariffs(props) {
  const [tariffs, setTariffs] = useState([]);
  const [isShowPayment, setIsShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    async function fetchData() {
      await props.onLoadingData(true);
      const tariffs = await api.getTariffs();
      setTariffs(tariffs);
      await props.onLoadingData(false);
    }

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();

  async function handlePayment(tariff) {
    await props.onLoadingData(true);
    const utm = window.sessionStorage.getItem('utmString') || '';
    let promo_code = null;

    if (tariff.promocode && tariff.promocode.word) {
      promo_code = { promo_code: tariff.promocode.word.toLowerCase() };
    }

    let paymentData = await api.getTokenForPaymentSubscription({
      tariff_id: tariff.id,
      is_recurrent: tariff.isProlongation ? '1' : '0',
      utm,
      ...(promo_code ? promo_code : {})
    }, navigate);

    setIsShowPayment(true);
    setPaymentData({ ...paymentData, backUrl: 'https://chevostik.ru/successful-payment/' });
    await props.onLoadingData(false);
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
        <div className={style.inner}>
          {
            tariffs.map((tariff) => (
              <div key={tariff.id} className={style.tariff}>
                <Tariff tariff={tariff} onPayment={handlePayment} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Tariffs;
