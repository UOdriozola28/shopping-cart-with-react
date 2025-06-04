import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {

    const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext)

    if (cart === undefined) {
        throw new Error('useCart must be within a CartProvider')
    }

    return { cart, addToCart, removeFromCart, clearCart }
}