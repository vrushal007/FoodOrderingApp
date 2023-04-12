import { cartActions } from "./cart-slice"
import { uiActions } from "./ui-slice"
export const fetchCartData = () => {
    return async (dispatch) => {
      const fetchData = async () => {
          const response = await fetch('https://food-app-react-c2eb2-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json')
          if(!response.ok){
              throw new Error('Failed to fetch cart data!!');
          }
          const responseData = await response.json();
  
          return responseData;
      }
      try{
          const cartData = await fetchData();
          dispatch(cartActions.replaceCart({
            items:cartData.items || [],
            totalQuantity:cartData.totalQuantity,
            totalAmount:cartData.totalAmount
          }));
      }catch(err){
          console.log(err);
          dispatch(uiActions.showNotification({
              status:'error',
              title:'Error!!',
              message:'Fetching cart data failed!!'
          }))
      }
    }
}
export const sendCartData = (cart) => {
  return async (dispatch) =>{
    dispatch(uiActions.showNotification({
      status:'pending',
      title:'Sending',
      message:'Sending cart data...'
    }))

    const sendRequest = async () => {
      const response = await fetch('https://food-app-react-c2eb2-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',{
        method:'PUT',
        body:JSON.stringify({
          items:cart.items,
          totalQuantity:cart.totalQuantity,
          totalAmount:cart.totalAmount,
        })
      });
      
      if(!response.ok){
        throw new Error("Sending cart data failed!!")
      }
    }
    try{
      await sendRequest();
      dispatch(uiActions.showNotification({
        status:'success',
        title:'Success...',
        message:'Sending cart data successfully...'
      }))
    }catch(err){
      console.log(err);
      dispatch(uiActions.showNotification({
        status:'error',
        title:'Error!!',
        message:'Sending cart data failed!!'
      }))
    }
  }
}
