"use client";
import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
        totalQuantity:0,
        totalAmount:0,
    },
    reducers:{
        addToCart(state,action){
            const newitem = action.payload;
            if(state.cartItems.length>0){
                const IsRestroIdSameOrNot = state.cartItems[0].resto_id==newitem.resto_id;
                if(!IsRestroIdSameOrNot){
                    state.cartItems=[];
                    state.totalQuantity=0;
                    state.totalAmount=0;
                }
            }
            const existingItem = state.cartItems.find(item=>item._id==newitem._id);
            if(existingItem){ 
                existingItem.quantity += 1;
                existingItem.totalPrice += newitem.price;
            }else{
                state.cartItems.push({
                    ...newitem,quantity:1,totalPrice:newitem.price
                })
            }
            state.totalQuantity += 1;
            state.totalAmount += newitem.price;
        },
        removeFromCart(state,action){
            const id = action.payload;
            const existingItem = state.cartItems.find((item)=>item._id==id);
            if(existingItem){
                if(existingItem.quantity==1){
                    state.cartItems = state.cartItems.filter((item)=>item._id!=id);
                }else{
                    existingItem.quantity -= 1;
                    existingItem.totalPrice -= existingItem.price;
                }
                state.totalQuantity -= 1;
                state.totalAmount -= existingItem.price;
            }
        },
        clearCart(state){
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        }
    }
})

export const {addToCart,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice.reducer;