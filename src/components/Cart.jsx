import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import { ModalContext } from "../store/ModalContext";
import CartItem from "./CartItem";

export default function Cart(){
    const cartCtx = useContext(CartContext);
    const modalCtx = useContext(ModalContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item)=> totalPrice + item.quantity * item.price,0)

    function handleCloseCart(){
        modalCtx.hideCart();
    }
        function handleShowCheckout(){
        modalCtx.showCheckout()
            
    }
    return(
    <Modal className="cart" open={modalCtx.progress==='cart'} onClose={modalCtx.progress==='cart' ? handleCloseCart: undefined} >
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item=>(
                <CartItem key={item.id}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                onDecrease={()=>cartCtx.removeItem(item.id)}
                onIncrease={()=>cartCtx.addItem(item)}>
                </CartItem>))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button onClick={handleCloseCart}>
                close
            </Button>
                {cartCtx.items.length > 0 &&
                    (<Button onClick={handleShowCheckout}>Go to Checkout</Button>)
                }
        </p>
    </Modal>
);
}