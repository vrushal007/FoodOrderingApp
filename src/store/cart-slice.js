const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        totalAmount:0,
        totalQuantity:0,
        changed:false
    },
    reducers:{
        addItem(state,action){
            state.totalAmount = state.totalAmount + (action.payload.price * action.payload.amount)
            const existingCartItem = state.items.find(item => item.id === action.payload.id )
            state.changed = true;
            state.totalQuantity += action.payload.amount;
            if(existingCartItem){
                existingCartItem.amount += action.payload.amount;
            }else{
                state.items.push(action.payload)
            }
        },
        removeItem(state,action){
            const id = action.payload
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if(existingItem.amount>1){
                existingItem.amount--;
                state.totalAmount -= existingItem.price;
            }else{
                state.items = state.items.filter(item => item.id !== id);
                state.totalAmount -= existingItem.price;
            }
        },
        replaceCart(state,action){
            state.items = action.payload.items
            state.totalAmount = action.payload.totalAmount
        }
    }
})

export const cartActions = cartSlice.actions

export default cartSlice;