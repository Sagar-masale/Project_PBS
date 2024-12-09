import React, {useState ,useEffect, useContext } from "react";
import ProfileContext from "./ProfileContext";
import CartContext from "./CartContext";

const CartContextProvider = ({children}) => {
  const {userData} = useContext(ProfileContext)
    const [cartItems, setCartItems] = useState([]); // State to manage the cart

    const [cart, setCart] = useState([]);


          // Load cart from localStorage on component mount
          useEffect(() => {
            if (userData?._id) {
              const storedCart = JSON.parse(localStorage.getItem(`cart_${userData._id}`));
              setCart(storedCart || []); // Load the cart for the logged-in user or an empty cart
            } else {
              setCart([]); // Clear the cart UI if no user is logged in
            }
          }, [userData._id]);

          // Save cart to localStorage whenever it changes
          useEffect(() => {
            if (cart.length > 0) {
              //localStorage.setItem('cart', JSON.stringify(cart));
              localStorage.setItem(`cart_${userData._id}`, JSON.stringify(cart));
            }
          }, [cart]);

          const addToCart = (product) => {
            if (!userData?._id) {
              alert("Please log in to add items to the cart.");
              return; // Prevent further execution
            }
          
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
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
      
      // Update localStorage after removing item
      localStorage.setItem(`cart_${userData._id}`, JSON.stringify(updatedCart));
    };
    
    const clearCart = () => {
      setCart([]);
      
      // Clear the cart from localStorage
      localStorage.removeItem(`cart_${userData._id}`);
    };
    

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, cart, addToCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart }}>
          {children}
        </CartContext.Provider>
      );
}

export default CartContextProvider