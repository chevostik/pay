import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { logout } from '../../helpers';
import * as api from '../../api/api';
import Title from '../Title/Title';
import Switch from '../Swith/Switch';
import Subscription from '../Subscription/Subscription';
import Score from '../Score/Score';
import Button from '../Button/Button';
import style from './Cabinet.styl';
import logoutIcon from '../Title/logout.svg';

function Cabinet(props) {
  const [user, setUser] = useState({});
  const [tariff, setTariff] = useState({});
  const [switchStatus, setSwitchStatus] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await props.onLoadingData(true);
      const user = await api.getCurrentUserProfile();

      if (user.subscription.tariff.id !== config.demoTariffId) {
        const tariff = await api.getTariff(user.subscription.tariff.id);
        setTariff(tariff);
      }

      setUser(user);
      await props.onLoadingData(false);
    }

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();

  function handleLogoutButton() {
    logout();
    navigate('/');
  }

  let content = <Subscription subscription={user.subscription} tariff={tariff} />

  if (switchStatus) {
    content = <Score user={user} />;
  }

  return (
    <div className={style.cabinet}>
      <Title title={user.email} button={(buttonWrapClass) => (
        <div className={buttonWrapClass}>
          <Button isRound={true} onClick={handleLogoutButton}>
            <img src={logoutIcon} alt="" />
          </Button>
        </div>
      )} />
      {content}
      <Switch defaultChecked={switchStatus} onChange={() => setSwitchStatus(!switchStatus)} />
    </div>
  );
}

export default Cabinet;
