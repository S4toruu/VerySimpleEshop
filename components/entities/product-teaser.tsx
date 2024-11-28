import { Product } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { Button } from 'components/atoms/button'
import {
  mdiCartPlus, mdiHeart, mdiStar, mdiStarHalfFull
} from '@mdi/js'
import Icon from '@mdi/react'
import styles from './product-teaser.module.css'

interface ProductTeaserProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export function ProductTeaser({ product, onAddToCart }: ProductTeaserProps) {
  return (
    <div className={styles.productTeaser}>
      <figure>
        <Image
          src={product.image}
          alt={product.name}
          width={324}
          height={324}
          loading="lazy"
        />
      </figure>
      <h2>{product.name}</h2>
      <h3>{product.description}</h3>
      <span>
        {product.price}
        {' '}
        <span className={styles.currency}>€</span>
      </span>
      <ul className={styles.rank}>
        <li><Icon path={mdiStar} size={1} /></li>
        <li><Icon path={mdiStar} size={1} /></li>
        <li><Icon path={mdiStar} size={1} /></li>
        <li><Icon path={mdiStarHalfFull} size={1} /></li>
      </ul>
      <div className={styles.actions}>
        <Button
          color="orange"
          target="_self"
          href={null}
          modifier={['circle']}
          fill
          onButtonClick={() => onAddToCart(product)}
        >
          <Icon path={mdiCartPlus} size={1} />
        </Button>
        <Button
          color="orange"
          target="_self"
          href={null}
          modifier={['circle']}
        >
          <Icon path={mdiHeart} size={1} />
        </Button>
      </div>
    </div>
  )
}
