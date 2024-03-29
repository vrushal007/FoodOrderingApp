import {useContext, useEffect, useState} from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    useEffect(()=>{
        setBtnIsHighlighted(true)

        let timer = setTimeout(()=>{
            setBtnIsHighlighted(false)
        },300)

        return () => {
            clearTimeout(timer)
        }
    },[cartCtx.items])
    const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}` ;

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;