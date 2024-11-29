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
    const fetchOrder = async () => {
      if (router.query.id && !order) {
        const res = await fetch(`/api/order/${router.query.id}`)
        const orderData = await res.json()
        setOrder(orderData)

        const addressRes = await fetch(`/api/address/${orderData.order.userId}`)
        const addressData = await addressRes.json()
        setAddress(addressData.result[0])

        const coordinatesRes = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressData.result[0].street},${addressData.result[0].city},${addressData.result[0].state},${addressData.result[0].zipCode},${addressData.result[0].country}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
        const coordinatesData = await coordinatesRes.json()
        if (coordinatesData.results.length > 0) {
          setCoordinates(coordinatesData.results[0].geometry.location)
        }
      }
    }
    console.log('--- useEffect ---')
    setStep(3)
    fetchOrder()
  }, [router.query.id, order, setStep])

  const pathCoordinates = [shopCoordinates, coordinates]

  return (
    <div className={styles.deliveryMap}>
      <h1>Your order is being prepared!</h1>
      {address && (
        <p>
          {address.street}
          ,
          {address.city}
          ,
          {address.state}
          ,
          {address.zipCode}
          ,
          {address.country}
        </p>
      )}
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
