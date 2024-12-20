import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'
import { Order } from '@prisma/client'
import { Address } from 'utils/cart-context'

import styles from './card-orders.module.scss'

export function CardOrders() {
  const [session, setSession] = useState<Session | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [address, setAddress] = useState<Address | null>(null)

  useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession()
      setSession(sess)
    }
    const fetchOrders = async () => {
      if (orders.length === 0) {
        const res = await fetch('/api/order')
        const data = await res.json()
        setOrders(data.orders)
      }
    }
    const fetchAddress = async () => {
      if (!address) {
        // @ts-ignore
        const res = await fetch(`/api/address/${session.id}`)
        const data = await res.json()
        setAddress(data.result)
      }
    }
    if (!session) {
      fetchSession()
    } else {
      fetchOrders()
      fetchAddress()
    }
  }, [session, orders, address])

  return (
    <div className={styles.tableOrders}>
      <h1>Account</h1>
      <h2>Your address</h2>
      {address ? (
        <div>
          <p>{address.street}</p>
          <p>{address.city}</p>
          <p>{address.state}</p>
          <p>{address.zipCode}</p>
          <p>{address.country}</p>
        </div>
      ) : (
        <div>
          <p>No address found</p>
        </div>
      )}
      <h2>Your orders</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.total}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
          {orders.length === 0 && (
          <tr>
            <td colSpan={3}>No orders found</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
