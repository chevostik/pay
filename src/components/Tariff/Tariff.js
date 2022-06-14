import { useState } from 'react';
import cn from 'classnames';
import config from '../../config';
import { declOfNum } from '../../helpers';
import Field from '../Field/Field';
import Checkbox from '../Checkbox/Checkbox';
import Button from '../Button/Button';
import style from './Tariff.styl';

function Tariff({ tariff, ...props }) {
  const [promoCode, setPromoCode] = useState('');
  const [isProlongation, setIsProlongation] = useState(tariff.is_recurrent);

  function handleClick() {
    props.onPayment({ ...tariff, promoCode, isProlongation });
  }

  return (
    <div className={cn(style.tariff, { [style.superTariff]: (config.superTariffId === tariff.id) })}>
      <div className={style.title}>{tariff.title}</div>
      <div className={style.month}>
        {tariff.months_number} {declOfNum(tariff.months_number, ['месяц', 'месяца', 'месяцев'])}
      </div>
      <div className={style.description}>{tariff.description}</div>
      <div className={style.price}>{tariff.price} ₽</div>
      <Field isTransparent={true} placeholder='Промокод' onValueChange={(value) => setPromoCode(value)} />
      <Checkbox label="Автопродление"
                defaultChecked={tariff.is_recurrent}
                onChange={() => setIsProlongation(!isProlongation)}
                isDisabled={!tariff.is_recurrent} />
      <Button color="secondary" onClick={() => handleClick()}>Выбрать подписку</Button>
    </div>
  );
}

export default Tariff;