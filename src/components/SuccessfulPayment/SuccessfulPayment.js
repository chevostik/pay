import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../Message/Message';

function SuccessfulPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/cabinet/');
    }, 3000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Message>
      Оплата прошла успешно, сейчас вы будете перемещены в личный кабинет.
    </Message>
  )
}

export default SuccessfulPayment;
