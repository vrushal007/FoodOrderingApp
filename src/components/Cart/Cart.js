import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import {Fragment, useContext, useState} from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems = cartCtx.items.length > 0
    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [didSubmit,setDidSubmit] = useState(false)

    const cartItemAddHandler = item => {
        cartCtx.addItem(item)
    };
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id)
    };
    const orderHandler = () => {
      setIsCheckout(true);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true)
        await fetch("https://food-app-react-c2eb2-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",{
            method:"POST",
            body:JSON.stringify({
                user:userData,
                orderedItems:cartCtx.items
            })
        })
        cartCtx.clearCart();
        setIsSubmitting(false)
        setDidSubmit(true)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
               <CartItem
                   key={item.id}
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

    const ModalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>
            Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onCancel={props.onHideCart} onConfirm={submitOrderHandler}/>}
        {!isCheckout && ModalActions}
    </Fragment>

    const isSubmittingModalContent = <p>Sending order...</p>
    const didSubmitModalContent =<Fragment>
        <p>Order has sent successfully...</p>
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>
                Close
            </button>
        </div>
    </Fragment>

    return (
        <Modal onHide={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && isSubmittingModalContent}
            {didSubmit && !isSubmitting && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;
