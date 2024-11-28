import React, { useEffect } from 'react'
import Image from 'next/image'
import { useCart } from 'utils/cart-context'

import Icon from '@mdi/react'
import { mdiTrashCanOutline } from '@mdi/js'
import { Button } from 'components/atoms/button'
import styles from './cart.module.css'

export function Cart() {
  const { cart, removeFromCart, setStep } = useCart()
  useEffect(() => {
    setStep(1)
  })
  return (
    <div className={styles.cartDefault}>
      <h1>My Cart</h1>
      {cart.length === 0 && <p>Your cart is empty</p>}
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <figure>
              <Image
                src={item.image}
                alt={item.name}
                width={100}
                height={100}
                loading="lazy"
              />
            </figure>
            <div>
              <span>
                {item.name}
                {' '}
                - Quantity:
                {' '}
                {item.quantity}
                - Price:
                {' '}
                {item.price}
                {' '}
                €
              </span>
              <Button
                color="orange"
                target="_self"
                href={null}
                modifier={['circle']}
                fill
                onButtonClick={() => removeFromCart(item.id)}
              >
                <Icon path={mdiTrashCanOutline} size={1} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
