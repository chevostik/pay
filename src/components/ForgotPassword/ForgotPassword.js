import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../../api/api';
import Field from '../Field/Field';
import Title from '../Title/Title';
import Button from '../Button/Button';
import Message from '../Message/Message';
import style from './ForgotPassword.styl';
import closeIcon from '../Title/close.svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isResetLinkSend, setIsResetLinkSend] = useState(false);

  const navigate = useNavigate();

  async function forgotPasswordHandle() {
    if (email.length === 0) {
      setErrorMessage('Не указана почта');
      return false;
    }

    await api.passwordReset(email);
    setIsResetLinkSend(true);
    setTimeout(() => navigate('/'), 3000);
  }

  if (isResetLinkSend) {
    return (
      <Message>
        ссылка для сброса пароля<br />
        отправлена на почту
      </Message>
    );
  }

  return (
    <div className={style.forgotPassword}>
      <Title title="Восстановление пароля" button={(buttonWrapClass) => (
        <Link className={buttonWrapClass} to="/">
          <Button isRound={true}>
            <img src={closeIcon} alt="" />
          </Button>
        </Link>
      )} />
      <div className="field">
        <Field type="email"
               placeholder='Почта для восстановления пароля'
               onChange={(value) => setEmail(value)}
               errorMessage={errorMessage} />
      </div>
      <Button onClick={forgotPasswordHandle}>Отправить</Button>
    </div>
  );
}

export default ForgotPassword;
