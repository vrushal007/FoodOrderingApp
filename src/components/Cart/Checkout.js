import classes from './Checkout.module.css'
import {useRef, useState} from "react";
const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalCodeInputRef = useRef();
  const [formInputValidity,setFormValidity] = useState({
    name:true,
    street:true,
    postal:true,
    city:true
  });

  const isEmpty = (val => val.trim().length === 0)

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = enteredPostalCode.trim().length === 6;
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormValidity({
      name:enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalCodeIsValid,
      city: enteredCityIsValid
    });

    const formIsValid = enteredNameIsValid && enteredPostalCodeIsValid && enteredStreetIsValid && enteredCityIsValid;
    if(!formIsValid){
      return
    }
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      postalCode:enteredPostalCode,
      city:enteredCity
    })
  }
  const nameControlClasses = `${classes.control} ${!formInputValidity.name ? classes.invalid : ''}`
  const streetControlClasses = `${classes.control} ${!formInputValidity.street ? classes.invalid : ''}`
  const postalControlClasses = `${classes.control} ${!formInputValidity.postal ? classes.invalid : ''}`
  const cityControlClasses = `${classes.control} ${!formInputValidity.city ? classes.invalid : ''}`
  return <form className={classes.form}>
    <div className={nameControlClasses}>
      <label htmlFor="name">Your name</label>
      <input type="text" id="name" ref={nameInputRef}/>
      {!formInputValidity.name && <p>Please enter valid name!</p>}
    </div>
    <div className={streetControlClasses}>
      <label htmlFor="street">Street</label>
      <input type="text" id="street" ref={streetInputRef}/>
      {!formInputValidity.street && <p>Please enter valid street!</p>}
    </div>
    <div className={postalControlClasses}>
      <label htmlFor="postal">Postal Code</label>
      <input type="text" id="postal" ref={postalCodeInputRef}/>
      {!formInputValidity.postal && <p>Please enter valid postal code!(contains 6 digits)</p>}
    </div>
    <div className={cityControlClasses}>
      <label htmlFor="city">City</label>
      <input type="text" id="city" ref={cityInputRef}/>
      {!formInputValidity.city && <p>Please enter valid city!</p>}
    </div>
    <div className={classes.actions}>
      <button type='button' onClick={props.onCancel}>Cancel</button>
      <button className={classes.submit} onClick={confirmHandler}>Confirm</button>
    </div>

  </form>
}
export default Checkout;