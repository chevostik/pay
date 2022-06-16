import config from '../../config';
import Button from '../Button/Button';
import style from './Product.styl';

function Product({ product, ...props }) {
  return (
    <div className={style.product}>
      <div className={style.title}>{product.title}</div>
      <img className={style.image} src={`${config.apiHost}${product.image}`} srcSet={`${config.apiHost}${product.image} 2x`} alt="" />
      <Button color="secondary" onClick={() => props.onPayment(product)}>{product.price} ₽</Button>
    </div>
  )
}

export default Product;
