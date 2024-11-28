import {
  GoogleMap, LoadScript, Marker, Polyline
} from '@react-google-maps/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from './delivery-map.module.css'
import { useCart } from '../../utils/cart-context'

const containerStyle = {
  width: '100%',
  height: '400px'
}

const shopCoordinates = {
  lat: 47.2382032,
  lng: -1.6427343
}

export function DeliveryMap() {
  const { setStep } = useCart()
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [address, setAddress] = useState(null)
  const [coordinates, setCoordinates] = useState({ lat: -3.745, lng: -38.523 })
  useEffect(() => {
    setStep(3)
    const fetchOrder = async () => {
      if (router.query.id && !order) {
        const res = await fetch(`/api/order/${router.query.id}`)
        setOrder(await res.json())
      }
    }
    fetchOrder()
  }, [router, order, setStep])
  useEffect(() => {
    if (order) {
      const fetchAddress = async () => {
        const res = await fetch(`/api/address/${order.order.userId}`)
        const data = await res.json()
        setAddress(data.result[0])
      }
      fetchAddress()
    }
  }, [order])
  useEffect(() => {
    if (address) {
      const fetchCoordinates = async () => {
        const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.street},${address.city},${address.state},${address.zipCode},${address.country}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
        const data = await res.json()
        if (data.results.length > 0) {
          setCoordinates(data.results[0].geometry.location)
        }
      }
      fetchCoordinates()
    }
  }, [address])

  const pathCoordinates = [shopCoordinates, coordinates]

  return (
    <div className={styles.deliveryMap}>
      <h1>Your order is being prepared!</h1>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={coordinates}
          zoom={5}
        >
          <Marker position={coordinates} />
          <Marker position={shopCoordinates} />
          <Polyline
            path={pathCoordinates}
            options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
          />
        </GoogleMap>
      </LoadScript>
    </div>
  )
}
