import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { getTimeZone, isEmail } from '../../helpers';
import * as api from '../../api/api';
import Title from '../Title/Title';
import Field from '../Field/Field';
import Button from '../Button/Button';
import Message from '../Message/Message';
import style from './Register.styl';
import closeIcon from '../Title/close.svg';
import plusIcon from './plus.svg';
import minusIcon from './minus.svg';

function Register() {
  const [step, setStep] = useState('stepOne');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessages, setErrorMessages] = useState({});
  const [isRegister, setIsRegister] = useState(false);

  // Обработка данных первого шага
  function stepOneHandle() {
    if (!isEmail(email)) {
      setErrorMessages((prevState) => ({...prevState, email: 'Не корректная почта'}));
      setEmail('');
    }

    if (email.length === 0) {
      setErrorMessages((prevState) => ({...prevState, email: 'Не указана почта'}));
    }

    if (password.length < 6) {
      setErrorMessages((prevState) => ({...prevState, password: 'Пароль не может быть меньше 6 символов'}));
      setPassword('');
      setPasswordConfirm('');
    }

    if (password.length === 0) {
      setErrorMessages((prevState) => ({...prevState, password: 'Не введен пароль'}));
    }

    if (password !== passwordConfirm) {
      setErrorMessages((prevState) => ({...prevState, passwordConfirm: 'Пароли не совпадают'}));
      setPasswordConfirm('');
    }

    if (email.length > 0 && isEmail(email) && password.length >= 6 && password === passwordConfirm) {
      setStep('stepTwo');
    }
  }

  // Обработка данных второго шага
  const [childKey, setChildKey] = useState(0);
  const [children, setChildren] = useState([{ id: childKey }]);

  const navigate = useNavigate();

  async function stepTwoHandle() {
    const childrenErrors = [];
    const childrenCopy = [...children];

    children.forEach((child, index) => {
      const name = (!child.name || child.name.length === 0) ? 'Укажите имя ребенка' : '';

      let birthday = '';

      if (!/^\d{2}\.\d{2}\.\d{2}$/.test(child.birthday)) {
        birthday = 'дд.мм.гг';
        childrenCopy[index].birthday = '';
      }

      if (name.length > 0 || birthday.length > 0) {
        childrenErrors[child.id] = {name, birthday};
      }
    });

    setErrorMessages((prevState) => ({...prevState, childrenErrors}));
    setChildren(childrenCopy);

    if (childrenErrors.length === 0) {
      const user = {
        email,
        password,
        password_confirmation: passwordConfirm,
        children_attributes: children.map((child) => {
          const value = new Date(child.birthday);
          const birthday = `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
          return { ...child, birthday };
        }),
        time_zone: getTimeZone(new Date())
      };

      const response = await api.registerUser(user, navigate);

      if (response) {
        setIsRegister(true);
        setTimeout(() => navigate('/cabinet/'), 3000);
      } else {
        setStep('stepOne');
        setErrorMessages((prevState) => ({ ...prevState, email: 'Такой Email уже зарегистрирован' }));
        setEmail('');
      }
    }
  }

  // Добавляем детей
  function addChild() {
    setChildren((prevState) => ([{ id: childKey + 1 }, ...prevState]));
  }

  function editChild(index, fieldName, value) {
    setChildren((prevState) => {
      const state = [...prevState];
      state[index][fieldName] = value;
      return state;
    });
  }

  function removeChild(index) {
    setChildren((prevState) => {
      const state = [...prevState];
      state.splice(index, 1);
      return state;
    });
  }

  // Генерируем уникальный id ребёнка
  useEffect(() => {
    setChildKey(childKey + 1);
  }, [children]); // eslint-disable-line react-hooks/exhaustive-deps

  // Переход на следующий шаг
  function nextStepButtonHandle() {
    if (step === 'stepOne') {
      stepOneHandle();
    } else if (step === 'stepTwo') {
      stepTwoHandle();
    }
  }

  if (isRegister) {
    return (
      <Message>
        Регистрация<br />
        прошла успешно!
      </Message>
    );
  }

  let content = null;

  if (step === 'stepOne') {
    content = (
      <>
        <div className={style.field}>
          <Field type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(value) => setEmail(value)}
                 errorMessage={errorMessages.email}/>
        </div>
        <div className={style.field}>
          <Field type="password"
                 placeholder="Пароль"
                 value={password}
                 onChange={(value) => setPassword(value)}
                 errorMessage={errorMessages.password}/>
        </div>
        <div className={style.field}>
          <Field type="password"
                 placeholder="Повторите пароль"
                 value={passwordConfirm}
                 onChange={(value) => setPasswordConfirm(value)}
                 errorMessage={errorMessages.passwordConfirm}/>
        </div>
      </>
    );
  }

  if (step === 'stepTwo') {
    content = children.map((child, index) => {
      let nameErrorMessage = '';

      if (errorMessages.childrenErrors && errorMessages.childrenErrors[child.id]) {
        nameErrorMessage = errorMessages.childrenErrors[child.id].name;
      }

      let birthdayErrorMessage = '';

      if (errorMessages.childrenErrors && errorMessages.childrenErrors[child.id]) {
        birthdayErrorMessage = errorMessages.childrenErrors[child.id].birthday;
      }

      return (
        <div key={child.id} className={cn(style.childFields)}>
          <Field value={child.name}
                 placeholder="Имя вашего ребёнка"
                 onChange={(value) => editChild(index,'name', value)}
                 errorMessage={nameErrorMessage} />
          <Field value={child.birthday}
                 placeholder="дд.мм.гг"
                 textAlign="center"
                 isWide={true}
                 onChange={(value) => editChild(index,'birthday', value)}
                 errorMessage={birthdayErrorMessage} />
          <Button theme="clean"
                  color="transparent"
                  title={(index === 0) ? "Добавить ещё ребёнка" : "Удалить ребёнка"}
                  onClick={() => (index === 0) ? addChild() : removeChild(index)}>
            <img src={(index === 0) ? plusIcon : minusIcon} alt="" />
          </Button>
        </div>
      )
    });
  }

  return (
    <div className={style.register}>
      <Title title="Регистрация" button={(buttonWrapClass) => (
        <Link className={buttonWrapClass} to="/">
          <Button isRound={true}>
            <img src={closeIcon} alt="" />
          </Button>
        </Link>
      )} />
      <div>
        {content}
      </div>
      <Button onClick={nextStepButtonHandle}>Далее</Button>
    </div>
  );
}

export default Register;
