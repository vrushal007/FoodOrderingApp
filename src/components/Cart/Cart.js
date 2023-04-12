import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import {Fragment, useState} from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

const Cart = (props) => {
    // const cartCtx = useContext(CartContext)
    // const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    // const hasItems = cartCtx.items.length > 0
    const [isCheckout,setIsCheckout] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false)
    const [didSubmit,setDidSubmit] = useState(false)

    const items = useSelector(state => state.cart.items)
    const totalAmount = useSelector(state=>state.cart.totalAmount)
    const hasItems = useSelector(state=>state.cart.items.length > 0)
    const dispatch = useDispatch()

    const cartItemAddHandler = item => {
        dispatch(cartActions.addItem(item));
    };
    const cartItemRemoveHandler = id => {
        dispatch(cartActions.removeItem(id))
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
                orderedItems:items
            })
        })
        dispatch(cartActions.replaceCart({
            items:[],
            totalAmount:0,
            totaQuantity:0
        }))
        setIsSubmitting(false)
        setDidSubmit(true)
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {items.map((item) => (
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
            <span>&#x20B9; {totalAmount}</span>
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
