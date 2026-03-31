import { createContext, useState, useContext  } from "react";
import { getProductById } from "../data/product";

const CartContext = createContext(null);


export default function CartProvider({ children }) {
   const [cartItems, setCartItems] = useState([]);

   function addToCart(productId){
    const existing = cartItems.find((item) => item.id === productId);
    if(existing){
        //const updateItems = cartItems.map((item) => item.id === productId ? { id : item.id , quantity: item.quantity + 1} : item);
        const currentQuantity = existing.quantity;
        const updateItems = cartItems.map((item) => item.id === productId ? { id : productId, quantity: currentQuantity + 1 } : item);

        setCartItems(updateItems);
    }else{
        setCartItems([...cartItems,{ id: productId, quantity: 1}]);
    }
   }

    function getCartItemsWithProducts(){
        return cartItems.map((item) => ({
            ...item,
            product : getProductById(item.id)
        })).filter(item => item.product);
    }

    function removeFromCart(productId){
        const updateItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updateItems);
    }

    function updateQuantity(productId, quantity){
        if(quantity <= 0){
            removeFromCart(productId);
            return;
        }
        const updateItem = cartItems.map((item) => item.id === productId ? {id: productId, quantity} : item);
        setCartItems(updateItem);
    }

    function getTotalPrice(){
        const total = cartItems.reduce((total,item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        },0)
        return total;
    }

    function clearCart(){
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, getCartItemsWithProducts, updateQuantity, removeFromCart, getTotalPrice, clearCart
         }}>{children}</CartContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(){
    const context = useContext(CartContext);
    return context;
}