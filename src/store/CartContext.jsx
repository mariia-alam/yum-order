import { act, createContext, useReducer, useState } from "react";
import { Context } from "react-responsive";
const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: ()=>{}
});

function cartReducer(state, action){
    if (action.type==='ADD-ITEM'){
        const existingCartItemIIndex = state.items.findIndex(
            (item)=> item.id === action.item.id
        );
        const updatedItems = [...state.items];
        if (existingCartItemIIndex > -1){
            const existingItem = state.items[existingCartItemIIndex]
            const updateddItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIIndex]= updateddItem
        }else {
            updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems}
    }

    if (action.type==='REMOVE-ITEM'){
        const existingCartItemIIndex = state.items.findIndex(
            (item)=> item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIIndex]
        const updatedItems = [...state.items];
        if(existingCartItem.quantity ===1){
            updatedItems.splice(existingCartItemIIndex, 1)
        }else {
            const updatedItem = {...existingCartItem,
                                quantity: existingCartItem.quantity-1};
            updatedItems[existingCartItemIIndex] = updatedItem;
        }
        return {...state, items: updatedItems}
    }
        if(action.type==='ClEAR_CART'){
            return {...state, items: [] };
    }
 return state;

}
export default function CartContextProvider({children}){
    const [cart,dispatchCartAction] = useReducer(cartReducer, {items: []});

    function  addItem(item) {
        dispatchCartAction({ type: 'ADD-ITEM', item });
    };

    function removeItem(id){
        dispatchCartAction({ type: 'REMOVE-ITEM', id });
    };
    function clearCart(){
        dispatchCartAction({type: 'ClEAR_CART'});
    }
        const CartContextValue = {
        items:cart.items,
        addItem: addItem,
        removeItem,
        clearCart
    };
    console.log(CartContextValue);
    return <CartContext.Provider value={CartContextValue}>{children}</CartContext.Provider>
}
export { CartContext};

