import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../../api/api';
import { Link } from 'react-router-dom';
import Field from '../../components/Field/Field';
import Button from '../../components/Button/Button';
import Logo from '../../components/Logo/Logo';
import Message from '../../components/Message/Message';
import style from './Login.styl';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  async function loginButtonHandle() {
    if (email.length === 0) {
      setErrorMessages((prevState) => ({ ...prevState, email: 'Не указана почта' }));
    }

    if (password.length === 0) {
      setErrorMessages((prevState) => ({ ...prevState, password: 'Не введен пароль' }));
    }

    if (email.length > 0 && password.length > 0) {
      const response = await api.authUser(email, password, navigate);

      if (response) {
        setIsLogin(true);
        setTimeout(() => navigate('/cabinet/'), 3000);
      } else {
        setErrorMessages((prevState) => ({ ...prevState, email: 'Почта не найдена' }));
        setErrorMessages((prevState) => ({ ...prevState, password: 'Не верный пароль' }));
        setEmail('');
        setPassword('');
      }
    }
  }

  if (isLogin) {
    return (
      <Message>
        Добро пожаловать,<br />
        {email}
      </Message>
    )
  }

  return (
    <div className={style.login}>
      <div className={style.logo}>
        <Logo />
      </div>
      <div className={style.title}>Личный аккаунт</div>
      <div className={style.content}>
        <div className={style.field}>
          <Field type="email"
                 value={email}
                 placeholder="Email"
                 onChange={(value) => setEmail(value)}
                 errorMessage={errorMessages.email} />
        </div>
        <div className={style.field}>
          <Field type="password"
                 value={password}
                 placeholder="Пароль"
                 onChange={(value) => setPassword(value)}
                 errorMessage={errorMessages.password} />
        </div>
      </div>
      <div className={style.loginButton}>
        <Button onClick={loginButtonHandle}>Войти</Button>
      </div>
      <div className={style.forgotPassword}>
        <Link to="/forgot-password/">Забыли пароль?</Link>
      </div>
      <div className={style.register}>
        <Link to="/register/">
          <Button>Зарегистрироваться</Button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
