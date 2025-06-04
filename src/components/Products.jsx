/* eslint-disable no-unused-vars */
import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './Icons.jsx'
import { useCart } from '../hooks/useCart.jsx'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from 'lucide-react'
import { motion } from "motion/react"

function ListProducts({ products }) {

  const { addToCart, removeFromCart, cart } = useCart()

  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {
          products.map(product => {
            const isProductInCart = checkProductInCart(product)
            return (
              <li key={product.id}>
                <img
                  src={product.image}
                  alt={product.title}
                />
                <div>
                  <strong className='product-title'> {product.title} </strong>
                  <p className='product-price'>
                    ${product.price}
                  </p>
                </div>
                <div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded bg-teal-500 text-white"
                    style={{
                      backgroundColor: isProductInCart ? 'red' : '#09f'
                    }}
                    onClick={() => isProductInCart ? removeFromCart(product) : addToCart(product)}
                  >
                    {
                      isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />
                    }
                  </motion.button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </main>
  )

}


function NoProductsResults() {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>No se encontraron productos.</AlertTitle>
    </Alert>
  )
}

export function Products({ products }) {

  const hasProducts = products?.length > 0

  return (
    hasProducts
      ? <ListProducts products={products} />
      : <NoProductsResults />
  )

}