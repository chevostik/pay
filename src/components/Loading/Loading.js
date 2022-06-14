import style from './Loading.styl';
import Message from '../Message/Message';

function Loading({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className={style.loading}>
      <Message>
        Загрузка...
      </Message>
    </div>
  )
}

export default Loading;
