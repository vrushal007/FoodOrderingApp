import { useEffect, useState} from 'react';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import { useSelector } from 'react-redux';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted,setBtnIsHighlighted] = useState(false);
    // const cartCtx = useContext(CartContext);
    const items = useSelector(state => state.cart.items)
    // console.log(items)
    const numberOfCartItems = items.reduce((curNumber, item) => {
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
    },[items])
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