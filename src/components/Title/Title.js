import style from './Title.styl'

function Title({ title, ...props }) {
  return (
    <div className={style.title}>
      <div className={style.bar}>{title}</div>
      {props.button(style.button)}
    </div>
  );
}

export default Title;
