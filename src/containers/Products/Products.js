import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import cn from 'classnames';
import * as api from '../../api/api';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import Product from '../../components/Product/Product';
import Payment from '../../components/Payment/Payment';
import style from './Products.styl';
import closeIcon from '../../components/Title/close.svg';

function Products(props) {
  const [products, setProducts] = useState([]);
  const [isShowPayment, setIsShowPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    async function fetchData() {
      await props.onLoadingData(true);
      const products = await api.getProducts('coin');
      setProducts(products);
      await props.onLoadingData(false);
    }

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();

  async function handlePayment(product) {
    await props.onLoadingData(true);

    const userResult = await api.getCurrentUserProfile();

    let paymentData = await api.getTokenForPaymentProduct({
      product_id: product.id,
      child_id: userResult.children[0].id,
      quantity: 1
    }, navigate);

    setIsShowPayment(true);
    setPaymentData({ ...paymentData, backUrl: 'https://pay.chevostik.ru/successful-payment/' });
    await props.onLoadingData(false);
  }

  if (isShowPayment) {
    return <Payment paymentData={paymentData} handleCloseButton={() => setIsShowPayment(false)} />
  }

  return (
    <div className={style.products}>
      <Title title="Покупка монет" button={(buttonWrapClass) => (
        <Link className={buttonWrapClass} to="/cabinet/">
          <Button isRound={true}>
            <img src={closeIcon} alt="" />
          </Button>
        </Link>
      )} />
      <div className={style.scroll}>
        <div className={cn(style.inner, {[style.isOne]: (products.length === 1), [style.isTwo]: (products.length === 2)})}>
          {
            products.map((product) => (
              <div key={product.id} className={style.product}>
                <Product product={product} onPayment={handlePayment} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Products;
