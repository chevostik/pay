import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as api from '../../api/api';
import { isEmail } from '../../helpers';
import Field from '../../components/Field/Field';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Message from '../../components/Message/Message';
import style from './ForgotPassword.styl';
import closeIcon from '../../components/Title/close.svg';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isResetLinkSend, setIsResetLinkSend] = useState(false);

  const navigate = useNavigate();

  async function forgotPasswordHandle() {
    if (!isEmail(email)) {
      setErrorMessage('Не корректная почта');
      setEmail('');
    }

    if (email.length === 0) {
      setErrorMessage('Не указана почта');
    }

    if (email.length > 0 && isEmail(email)) {
      const response = await api.passwordReset(email);

      if (response) {
        setIsResetLinkSend(true);
        setTimeout(() => navigate('/'), 3000);
      } else {
        setErrorMessage('Почта не найдена');
        setEmail('');
      }
    }
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
               placeholder="Почта для восстановления пароля"
               value={email}
               onChange={(value) => setEmail(value)}
               errorMessage={errorMessage} />
      </div>
      <Button onClick={forgotPasswordHandle}>Отправить</Button>
    </div>
  );
}

export default ForgotPassword;
