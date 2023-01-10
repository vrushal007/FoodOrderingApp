import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import Card from "../UI/Card";

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const cartItems = cartCtx.items
            .map(item => <Card />)
    return <Modal className={classes['cart-items']} onHide={props.onHideCart}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount:</span>
            <span>20.25</span>
        </div>
        <div className={classes.actions}>
            <button className={classes['btn--alt']} onClick={props.onHideCart}>Close</button>
            <button className={classes.button}>Order</button>
        </div>
    </Modal>
}
export default Cart;