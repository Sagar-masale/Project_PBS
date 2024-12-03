import React, {useState} from "react";
import CartCotext from "./CartContext"

const CartContextProvider = ({children}) => {
    const [cartData, setCartData] = useState('')

    return(
        <CartCotext.Provider value = {
            {
                cartData, setCartData
            }
        }>
        </CartCotext.Provider>
    )
}

export default CartContextProvider