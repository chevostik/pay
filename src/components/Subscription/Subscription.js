import config from '../../config';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';
import style from './Subscription.styl';

function Subscription({ subscription, tariff }) {
  let title = 'Текущая подписка';
  let buttonText = 'Продлить подписку';
  let theme = 'activeSubscription';

  if (subscription?.status === 'off') { // Если подписка закончилась
    title = 'Подписка закончилась!';
    buttonText = 'Выбрать тариф';
    theme = 'notActiveSubscription';
  } else if (subscription?.tariff?.id === config.demoTariffId) { // Если подписка демо
    title = 'Пробная подписка';
    theme = 'demoSubscription';
  }

  const date = new Date(subscription?.due_date);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return (
    <div className={cn(style.subscription, style[theme])}>
      <div className={style.title}>{title}</div>
      <div className={style.description}>
        <div className={style.row}>Тариф: <strong>{tariff.title}</strong></div>
        <div className={style.row}>Активна до {day}.{month}.{year}</div>
      </div>
      <div className={style.prolongation}>
        <Checkbox label="Автопродление" defaultChecked={subscription?.is_recurrent} isDisabled={true} />
      </div>
      <Link className={style.button} to="/cabinet/tariffs/">
        <Button color="secondary">{buttonText}</Button>
      </Link>
    </div>
  );
}

export default Subscription;
