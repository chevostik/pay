import style from './Message.styl';

function Message(props) {
  return (
    <div className={style.message}>
      {props.children}
    </div>
  );
}

export default Message;
