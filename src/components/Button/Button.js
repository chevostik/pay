import cn from 'classnames';
import style from './Button.styl'

function Button({ theme, color, size, isRound, ...props }) {
  return (
    <button className={
      cn(
        style.button,
        style[theme || 'default'],
        style[color || 'primary'],
        style[size || 'm'],
        { [style.round]: isRound }
      )}
            type="button"
            onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
