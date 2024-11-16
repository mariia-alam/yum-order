import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./store/CartContext";
import ModalContextProvider from "./store/ModalContext";
export default function App() {





  window.addEventListener('scroll', function() {
  const titleImage = document.querySelector('#main-header #title');
  const mainHeaderMiddle = document.querySelector('#main-header-middle #title');
  const mainHeaderMobile = document.querySelector('#main-header-mobile #title');

  const headerButton = document.querySelector('#main-header-middle #button');

    if (window.scrollY > 50) {
      if (titleImage) titleImage.classList.add('hidden');
      if (mainHeaderMiddle) mainHeaderMiddle.classList.add('hidden');

      if (mainHeaderMobile) mainHeaderMobile.classList.add('hidden');
      if(headerButton)  headerButton.classList.add('sticky-button');

    } else {
      if (titleImage) titleImage.classList.remove('hidden');
      if (mainHeaderMiddle) mainHeaderMiddle.classList.remove('hidden');

      if (mainHeaderMobile) mainHeaderMobile.classList.remove('hidden');
            if(headerButton)  headerButton.classList.remove('sticky-button');
    }
  });
  return (<CartContextProvider>
            <ModalContextProvider>
              <Header></Header>
              <Meals></Meals>
              <Cart></Cart>
              <Checkout></Checkout>
            </ModalContextProvider>
    </CartContextProvider>
  );
}