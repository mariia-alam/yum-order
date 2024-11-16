import Modal from "./UI/Modal"
import { CartContext } from "../store/CartContext";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { ModalContext } from "../store/ModalContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig ={
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
            };
export default function Checkout(){
    const userProgress = useContext(ModalContext);
        const cartCtx = useContext(CartContext);

        const {
            data,
            isLoading: isSending,
            error,
            sendRequest,
            clearData} = useHttp('http://localhost:3000/orders',requestConfig)
        const cartTotal = cartCtx.items.reduce((totalPrice, item)=> totalPrice + item.quantity * item.price,0);

        function handleClose(){
            userProgress.hideCheckout();
        }

        function handleFinish(){
            userProgress.hideCheckout();
            cartCtx.clearCart();
            clearData();
        }

        async function handleSubmit(event){
            event.preventDefault();
            const fd = new FormData(event.target);
            const customerData =Object.fromEntries(fd.entries());

            sendRequest(JSON.stringify({
                    order: {
                        items: cartCtx.items,
                        customer: customerData,
                    }
                }))

        }
        let actions = (
            <>
                <Button onClick={handleClose} type='button'>Close</Button>
                <Button>Submit Order</Button>
            </>
        )

        if(isSending){
            actions= <span>Sending order data...</span>
        }
        if(data && !error){
            return <Modal open={userProgress.progress === 'checkout'} onClose={handleClose}>
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>Check your email within the next few minutes.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Ok</Button>
                </p>
            </Modal>
        }
    return(
    <Modal  onClose={handleClose} open={userProgress.progress === 'checkout'}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Tolal Amount: {currencyFormatter.format(cartTotal)} </p>
            <Input
                label='Full Name'
                id='name'
                type='text'
            ></Input>

            <Input
                label='E-mail Address'
                id='email'
                type='email'
            ></Input>

            <Input
                label='Street'
                id='street'
                type='text'
            ></Input>

            <div className="control-row">
                <Input
                    label='Postal Code'
                    id='postal-code'
                    type='text'
                ></Input>

                <Input
                    label='City'
                    id='city'
                    type='text'
                ></Input>
            </div>
            {error && <Error title='Failed to submit order' message={JSON.stringify(error)} ></Error>}
            <p className="modal-actions">
{actions}
            </p>
        </form>
    </Modal>
);
}