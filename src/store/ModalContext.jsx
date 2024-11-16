import { createContext, useState } from "react";
import CartContext from './CartContext';
const ModalContext = createContext({
    progress: '',
    showCart:()=>{},
    hideCart: ()=>{},
    showCheckout: ()=>{},
    hideCheckout: ()=>{},
});

export default function ModalContextProvider({children}){

    const[userProgress, setUserProgress]= useState('');
    function showCart(){
    setUserProgress('cart')
    }
    function hideCart(){
    setUserProgress('')
    }
    function showCheckout(){
    setUserProgress('checkout')
    }
    function hideCheckout(){
    setUserProgress('')
    }


    const userModalContext = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    };


    return (
        <ModalContext.Provider value={userModalContext}>{children}</ModalContext.Provider>
    );
}
export {ModalContext}
