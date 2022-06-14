import style from '../Checkbox/Checkbox.styl';

function Checkbox({ label, defaultChecked, isDisabled, ...props }) {
  return (
    <label className={style.checkbox}>
      <input type="checkbox" defaultChecked={defaultChecked || false} onChange={props.onChange} disabled={isDisabled} />
      <span className={style.check}></span>
      {label}
    </label>
  );
}

export default Checkbox;
