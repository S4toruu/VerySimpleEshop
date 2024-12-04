import React, {
  createContext, useContext, useState, ReactNode, FC, useMemo, useEffect
} from 'react'
import { Product, Order } from '@prisma/client'

interface CartItem extends Product {
  quantity: number
}

interface CartContextProps {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  step: number
  setStep: (step: number) => void
  shippingAddress: Address | null
  setShippingAddress: (address: Address) => void
  isShippingAddressNew: boolean | null
  setIsShippingAddressNew: (isShippingAddressNew: boolean) => void
  order: Order | null
  setOrder: (order: Order) => void
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [step, setStep] = useState<number>(0)
  const [order, setOrder] = useState<Order | null>(null)
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null)
  const [isShippingAddressNew, setIsShippingAddressNew] = useState<boolean | null>(null)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id)
      if (existingProduct) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId)
      if (existingProduct && existingProduct.quantity > 1) {
        return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      }
      return prevCart.filter((product) => product.id !== productId)
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    step,
    setStep,
    shippingAddress,
    setShippingAddress,
    setIsShippingAddressNew,
    isShippingAddressNew,
    order,
    setOrder
  }), [cart, step, shippingAddress, isShippingAddressNew, order, setOrder])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
