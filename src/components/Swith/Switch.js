import style from './Switch.styl';

function Switch({ defaultChecked, ...props }) {
  return (
    <label className={style.switch}>
      <input type="checkbox" defaultChecked={!!defaultChecked} onChange={props.onChange} />
      <span className={style.check}></span>
      <span className={style.label}>подписка</span>
      <span className={style.label}>монеты</span>
    </label>
  );
}

export default Switch;
