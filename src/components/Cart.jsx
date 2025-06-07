/* eslint-disable no-unused-vars */
import { useId } from 'react'
import './Cart.css'
import { CartIcon, ClearCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.jsx'
import { motion, AnimatePresence } from "motion/react"
import { useState } from 'react'
import { useCallback } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'


function CartItem({ image, price, title, quantity, addToCart }) {
  return (
    <li>
      <img
        src={image}
        alt={title}
      />
      <div>
        <strong className='product-title'> {title} </strong>
        <p className='product-price'>
          ${price}
        </p>
      </div>

      <footer>
        <small>
          Qty: {quantity}
        </small>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className='add-qty-button' onClick={addToCart}>+</motion.button>
      </footer>
    </li>
  )
}


export function Cart() {

  const cartCheckboxId = useId()
  const { cart, clearCart, addToCart } = useCart()
  const [isVisible, setIsVisible] = useState(() => {
    return JSON.parse(localStorage.getItem('visible')) ?? false
  })
  const hasCartItems = cart?.length > 0

  // const handleSetVisibleCart = () => {
  //   const newVisible = !isVisible
  //   localStorage.setItem('visible', JSON.stringify(newVisible))
  //   setIsVisible(newVisible)
  // }

  const visibleCart = useCallback(() => {
    setIsVisible(prev => {
      const newVisible = !prev
      localStorage.setItem('visible', JSON.stringify(newVisible))
      return newVisible
    })
  }, [])

  const [parent] = useAutoAnimate()

  return (
    <>
      <motion.button animate={{ rotate: 360 }} whileTap={{ y: 1 }} className='cart-button' htmlFor={cartCheckboxId} onClick={visibleCart} >
        <CartIcon />
      </motion.button>

      <AnimatePresence initial={false}>
        {
          isVisible ? (
            <motion.aside className='cart'
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >

              {
                hasCartItems && <h3>Carrito</h3>
              }

              <ul style={{ marginTop: '25px' }} ref={parent}>
                {
                  hasCartItems ?
                    (
                      cart.map(product => (
                        < CartItem
                          key={product.id}
                          addToCart={() => addToCart(product)}
                          {...product}
                        />
                      ))
                    )

                    : <div>Carrito vacio</div>
                }
              </ul>

              {
                hasCartItems &&
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    marginTop: '10px'
                  }} onClick={clearCart}>
                  <ClearCartIcon />
                </motion.button>
              }


            </motion.aside>
          ) : null
        }
      </AnimatePresence>

    </>
  )
}
