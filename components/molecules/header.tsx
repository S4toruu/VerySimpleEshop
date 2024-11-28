import React, { useEffect } from 'react'
import { useCart } from 'utils/cart-context'

import Image from 'next/image'
import Icon from '@mdi/react'
import { mdiShopping, mdiAccount } from '@mdi/js'

import styles from './header.module.scss'

export function Header() {
  const { cart } = useCart()
  const classes = [styles.headerDefault]

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY >= 48) {
        classes.push(styles.sticky)
      } else {
        classes.pop()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return (): void => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className={classes.join(' ')}>
      <figure>
        <Image
          src="https://placehold.co/120x40.png"
          alt="Logo"
          width={120}
          height={40}
          loading="lazy"
        />
      </figure>
      <nav>
        <ul>
          <li><a href="/products">Smartphones</a></li>
          <li><a href="/products">Screens</a></li>
          <li><a href="/products">Laptops</a></li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li className="relative">
            { totalQuantity > 0 && (
              <span
                className="rounded-full bg-red text-white px-2 py-0.5 text-xs absolute right-[-3px] top-[-15px]"
              >
                {totalQuantity}
              </span>
            )}
            <a href="/order">
              <Icon path={mdiShopping} size={1} />
            </a>
          </li>
          <li><a href="/account"><Icon path={mdiAccount} size={1} /></a></li>
        </ul>
      </nav>
    </header>
  )
}
