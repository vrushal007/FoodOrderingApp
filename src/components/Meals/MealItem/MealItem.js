import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../store/cart-slice';

const MealItem = (props) => {
    // const cartCtx = useContext(CartContext)
    const dispatch = useDispatch()
    const price = `${props.price.toFixed(2)}`
    const addToCartHandler = amount => {
        // cartCtx.addItem({
            // id:props.id,
            // amount:amount,
            // price:props.price,
            // name:props.name
        // });
        dispatch(cartActions.addItem({
            id:props.id,
            amount:amount,
            price:props.price,
            name:props.name
        }))
    }

    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}> &#x20B9; {price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler}/>
        </div>
    </li>
}
export default MealItem;