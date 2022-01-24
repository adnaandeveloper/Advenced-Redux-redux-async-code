import { useDispatch, useSelector } from 'react-redux'
import { cartSliceActions } from '../../store/cart-slice'
import classes from './CartItem.module.css'

const CartItem = (props) => {
  const { title, quantity, total, price, id } = props.item

  const dispatch = useDispatch()
  const cartItem = useSelector((state) => state.cart.items)
  const incrementItem = () => {
    dispatch(cartSliceActions.addItemToCart({ id, title, price }))
  }
  const decrementItem = () => {
    dispatch(cartSliceActions.removeItemFromCart(id))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementItem}>-</button>
          <button onClick={incrementItem}>+</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
