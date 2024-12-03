import React, {useState} from "react";
import CartContext from "./CartContext";

const CartContextProvider = ({children}) => {

    const [cartItems, setCartItems] = useState([]); // State to manage the cart

    return (
        <CartContext.Provider value={{ cartItems, setCartItems }}>
          {children}
        </CartContext.Provider>
      );
}

export default CartContextProvider