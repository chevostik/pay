import cn from 'classnames';
import style from './Field.styl';

function Field(props) {
  const { type, value, placeholder, isTransparent, textAlign, isWide, errorMessage } = props;

  function handleChange(e) {
    props.onChange(e.target.value);
  }

  return (
    <input className={
      cn(
        style.field,
        style[textAlign],
        {
          [style.error]: !!errorMessage,
          [style.isWide]: isWide,
          [style.isTransparent]: isTransparent
        }
      )}
           type={type || 'text'}
           value={value}
           placeholder={errorMessage ? errorMessage : placeholder}
           onChange={handleChange}/>
  );
}

export default Field;
