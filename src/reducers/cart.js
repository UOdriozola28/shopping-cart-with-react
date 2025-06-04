export const initialState = JSON.parse(localStorage.getItem('cart')) ?? []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_TO_CART: 'REMOVE_TO_CART',
  CLEAR_CART: 'CLEAR_CART'
}

export const cartReducer = (state, action) => {

  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      // si encontro item

      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        localStorage.setItem('cart', JSON.stringify(newState))
        return newState
      }

      // si no encontro

      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1
        }
      ]
      localStorage.setItem('cart', JSON.stringify(newState))
      return newState

    }
    case CART_ACTION_TYPES.REMOVE_TO_CART: {
      const { id } = actionPayload
      const newState = state.filter(item => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(newState))
      return newState
    }
    case CART_ACTION_TYPES.CLEAR_CART: {
      localStorage.setItem('cart', JSON.stringify([]))
      return [] 
    }
  }

  return
}