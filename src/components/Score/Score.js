import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import style from './Score.styl';
import coinIcon from './coin.png';
import coinIconRetina from './coin@2x.png';

function Score({ user }) {
  return (
    <div className={style.score}>
      <div className={style.title}>Текущий баланс:</div>
      <div className={style.balance}>
        <img src={coinIcon} srcSet={`${coinIconRetina} 2x`} alt=""/>
        {` x ${user.children ? user.children[0].balance : 0}`}
      </div>
      <Link className={style.button} to="/cabinet/products/">
        <Button color="secondary">Пополнить счет</Button>
      </Link>
    </div>
  );
}

export default Score;
