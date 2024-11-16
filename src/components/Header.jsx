// import logo from '../assets/logo1.png'
import logo from '../assets/logo.png'
import { useMediaQuery } from 'react-responsive';
import { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { ModalContext } from '../store/ModalContext';
import Button from './UI/Button';

export default function Header(){

    const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
    const isMiddle= useMediaQuery({ query: '(max-width: 1200px)' });
    const islarge= useMediaQuery({ query: '(min-width: 1200px)' });

    const cartctx = useContext(CartContext);
    const modalctx = useContext(ModalContext);

    const totalCartItems = cartctx.items.reduce((totalNumberOfItems,item)=>{
        return totalNumberOfItems + item.quantity;
    }, 0);



    function handleShowCart(){
            modalctx.showCart()
    }


if (isMobile || isMiddle){
    return(
                <header id='main-header-mobile'>
            <div id='title'>
                <img src={logo} alt="" />
                <h1>YUM ORDER</h1>
            </div>
            <nav>
                <Button onClick={handleShowCart}  >Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}




if(islarge){
    return (
        <header id='main-header'>
            <div id='title'>
                <h1>YUM ORDER</h1>
                <img src={logo} alt="" />
            </div>
            <nav>
                <Button onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}}