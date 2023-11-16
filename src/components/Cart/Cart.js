import { useSelector } from 'react-redux';

import Card from '../UI/Card';
import styles from './Cart.module.css';
import CartItem from './CartItem';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  return (
    <Card className={styles.cart}>
      <h2>Your Shopping Cart</h2>
      {cartItems.map(({ name, itemId, quantity, price, totalPrice }) => (
        <CartItem
          title={name}
          id={itemId}
          key={itemId}
          quantity={quantity}
          total={totalPrice}
          price={price}
        />
      ))}
    </Card>
  );
};

export default Cart;

// title, quantity, total, price
