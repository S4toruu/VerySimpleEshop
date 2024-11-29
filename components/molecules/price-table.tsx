import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { useCart } from 'utils/cart-context'
import { useRouter } from 'next/router'
import { Button } from 'components/atoms/button'

import styles from './price-table.module.css'

export function PriceTable() {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const {
    cart, step, shippingAddress, isShippingAddressNew, clearCart, order
  } = useCart()

  useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession()
      setSession(sess)
    }
    if (!session) {
      fetchSession()
    }
  }, [session, setSession])

  const proceedCheckout = async (): Promise<any> => {
    if (isShippingAddressNew) {
      const resAddr = await fetch('/api/address', {
        method: 'POST',
        body: JSON.stringify({ userId: session.id, ...shippingAddress }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (resAddr.status !== 201) {
        return
      }
    }
    const resOrder = await fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({ items: cart }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (resOrder.status === 201) {
      const data = await resOrder.json()
      clearCart()
      router.push(`/order/summary/${data.result.id}`)
    }
  }
  return (
    <div className={styles.priceTable}>
      <h2>Order summary</h2>
      <div className={styles.details}>
        <span>Products prices</span>
        {!order ? (
          <span>
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €
          </span>
        ) : (
          <span>
            {order.order.total.toFixed(2)}
            {' '}
            €
          </span>
        )}
      </div>
      <div className={styles.details}>
        <span>Total with VAT</span>
        {!order ? (
          <span>
            {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} €
          </span>
        ) : (
          <span>
            {order.order.total.toFixed(2)}
            {' '}
            €
          </span>
        )}
      </div>
      {step === 2 && (
        <Button
          color="orange"
          target="_self"
          href={null}
          onButtonClick={() => proceedCheckout()}
          fill
          disabled={!shippingAddress.city && !shippingAddress.street && !shippingAddress.zipCode && !shippingAddress.country && !shippingAddress.state}
        >
          Proceed to checkout
        </Button>
      )}
      {step === 1 && (
        <Button
          color="orange"
          target="_self"
          href="/order/checkout"
          fill
          disabled={cart.length === 0}
        >
          Order now!
        </Button>
      )}
    </div>
  )
}
