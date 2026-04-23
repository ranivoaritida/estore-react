import { createContext, useEffect, useContext  } from "react";
import { createCart } from "../api/cartApi";
import { useCart as useCartItem, useAddToCart, useUpdateCartItem, useRemoveFromCart, useClearCart } from "../hooks/useCarts";


const CartContext = createContext(null);


export default function CartProvider({ children }) {

    const cartId = localStorage.getItem("cartId");

    const { data: cart, isLoading } = useCartItem(cartId);

    const { mutate: addItem } = useAddToCart();
    const { mutate: updateItem } = useUpdateCartItem();
    const { mutate: removeItem} = useRemoveFromCart();
    const { mutate: clearCartItem } = useClearCart();

    useEffect(() => {
    const initCart = async () => {
        let cartId = localStorage.getItem("cartId");

        if(!cartId){
        const cart = await createCart();
        localStorage.setItem("cartId",cart.id);
        }
    };
    
    initCart();
    }, []);

    const cartItems = cart?.items || []; 
    //console.log("cartItems", cartItems);

    function addToCart(productId){
        addItem({cartId, productId});
    }

    function removeFromCart(productId){
        removeItem({cartId,productId});
    }

    function updateQuantity(productId, quantity){
        if(quantity <= 0){
            removeItem({cartId,productId});
            return;
        }
        updateItem({cartId, productId, quantity});
    }

    function getTotalPrice(){
        const total = cartItems.reduce((total,item) => {
            return total + (item?.product ? item?.product.price * item.quantity : 0);
        },0)
        return total;
    }

    function clearCart(){
        clearCartItem(cartId);
    }

    return (
        <CartContext.Provider value={{
            cartItems, isLoading, addToCart, updateQuantity, removeFromCart, getTotalPrice, clearCart
         }}>{children}</CartContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(){
    const context = useContext(CartContext);
    return context;
}