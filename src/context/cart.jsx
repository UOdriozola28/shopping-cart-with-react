/* eslint-disable react-refresh/only-export-components */
import { useReducer } from "react";
import { createContext } from "react";
import { cartReducer, initialState, CART_ACTION_TYPES } from "../reducers/cart";

export const CartContext = createContext()

function useCartReduce() {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product) => dispatch({
    type: CART_ACTION_TYPES.ADD_TO_CART,
    payload: product
  })

  const removeFromCart = (product) => dispatch({
    type: CART_ACTION_TYPES.REMOVE_TO_CART,
    payload: product
  })

  const clearCart = () => dispatch({
    type: CART_ACTION_TYPES.CLEAR_CART
  })

  return { state, addToCart, removeFromCart, clearCart }
}

export function CartProvider({ children }) {

  // * sin reducer
  // const [cart, setCart] = useState([])
  // const addToCart = product => {

  //   const productInCartIndex = cart.findIndex(item => item.id === product.id)

  //   if (productInCartIndex >= 0) {
  //     const newCart = structuredClone(cart)
  //     newCart[productInCartIndex].quantity += 1
  //     return setCart(newCart)
  //   }

  //   setCart(prevState => ([
  //     ...prevState,
  //     {
  //       ...product,
  //       quantity: 1
  //     }
  //   ]))

  // }

  // const removeFromCart = (product) => {
  //   setCart(prevState => prevState.filter(item => item.id !== product.id))
  // }

  // const clearCart = () => {
  //   setCart([])
  // }

  // * con reducer y custom hook

  const { state, addToCart, removeFromCart, clearCart } = useCartReduce()

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )

}

