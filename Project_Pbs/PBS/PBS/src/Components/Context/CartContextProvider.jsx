import React, {useState} from "react";
import CartContext from "./CartContext";

const CartContextProvider = ({children}) => {

    const [cartItems, setCartItems] = useState([]); // State to manage the cart

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
      // Check if the product is already in the cart
      const existingProductIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex >= 0) {
        // Update quantity if product already exists in the cart
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        // Add new product to cart
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    };
    const incrementQuantity = (id) => {
      const updatedCart = cart.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    };
  
    const decrementQuantity = (id) => {
      const updatedCart = cart.map(item => 
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
      setCart(updatedCart);
    };
    const removeFromCart = (id) => {
      // Remove product from cart
      setCart(cart.filter(item => item.id !== id));
    };
  
    const clearCart = () => {
      // Clear all items from the cart
      setCart([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cart, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart }}>
          {children}
        </CartContext.Provider>
      );
}

export default CartContextProvider