import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0

    const cartItemAddHandler = item => {

    };
    const cartItemRemoveHandler = id => {

    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
               <CartItem
                   id={item.id}
                   name={item.name}
                   amount={item.amount}
                   price={item.price}
                   onRemove={cartItemRemoveHandler.bind(null,item.id)}
                   onAdd={cartItemAddHandler.bind(null,item)}
               />
            ))}
        </ul>
    );

    return (
        <Modal onHide={props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>
                    Close
                </button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
