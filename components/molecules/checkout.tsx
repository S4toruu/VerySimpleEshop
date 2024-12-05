import React, { useEffect, useState, useCallback } from 'react'
import { getSession, Session } from 'next-auth/react'
import debounce from 'lodash/debounce'
import { useCart } from 'utils/cart-context'

import { CardLogin } from 'components/molecules/card-login'
import styles from './checkout.module.css'

interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export function Checkout() {
  const { setStep, setShippingAddress, setIsShippingAddressNew } = useCart()
  const [session, setSession] = useState<Session | null>(null)
  const [address, setAddress] = useState<Address | null>(null)
  const [name, setName] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [country, setCountry] = useState<string>('')

  useEffect(() => {
    const fetchSession = async () => {
      const sess = await getSession()
      setSession(sess)
    }

    const fetchAddress = async () => {
      if (!session) return
      if (!address) {
        const res = await fetch(`/api/address/${session.id}`)
        const data = await res.json()
        setAddress(data.result)
        if (data.result.length > 0) {
          setIsShippingAddressNew(false)
          setShippingAddress(data.result[0])
        } else {
          setIsShippingAddressNew(true)
        }
      }
    }

    setStep(2)
    if (!session) {
      fetchSession()
    } else {
      fetchAddress()
    }
  }, [session, address, setStep, setIsShippingAddressNew, setShippingAddress])

  useEffect(() => {
    setShippingAddress({
      street,
      city,
      state,
      zipCode,
      country
    })
  }, [street, city, state, zipCode, country, setShippingAddress])

  const fetchGoogleAddress = async (value: string) => {
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
    const data = await res.json()
    if (data.results.length > 0) {
      const addressComponents = data.results[0].address_components
      addressComponents.forEach((component) => {
        if (component.types.includes('street_number')) {
          setStreet(component.long_name)
        }
        if (component.types.includes('route')) {
          setStreet((prev) => `${prev} ${component.long_name}`)
        }
        if (component.types.includes('locality')) {
          setCity(component.long_name)
        }
        if (component.types.includes('administrative_area_level_1')) {
          setState(component.long_name)
        }
        if (component.types.includes('postal_code')) {
          setZipCode(component.long_name)
        }
        if (component.types.includes('country')) {
          setCountry(component.long_name)
        }
      })
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchGoogleAddress = useCallback(debounce((value: string) => {
    fetchGoogleAddress(value)
  }, 300), [])

  const handleSearchAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearch(value)
    debouncedFetchGoogleAddress(value)
  }

  return (
    <div className={styles.checkout}>
      {session ? (
        <h1>
          Welcome back
          {' '}
          {session.user.name ? (<span>{session.user.name}</span>) : (<span>{session.user.email}</span>)}
          {' '}
          !
        </h1>
      ) : (
        <>
          <h1>Welcome to the checkout page!</h1>
          <h2>Sign in</h2>
          <CardLogin type="checkout" callback="/order/checkout" />
        </>
      )}
      {!address ? (
        <>
          {session && !session.user.name && (
            <div className="formElement">
              <div className="fieldDefault">
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  name="name"
                  className={`inputDefault ${search.length > 0 ? 'hasText' : ''}`}
                  placeholder=" "
                  value={name}
                />
                <label
                  htmlFor="search"
                  className="labelDefault"
                >
                  Name
                </label>
              </div>
            </div>
          )}
          <div className="formElement">
            <div className="fieldDefault">
              <input
                onChange={handleSearchAddress}
                type="text"
                id="search"
                name="search"
                className={`inputDefault ${search.length > 0 ? 'hasText' : ''}`}
                placeholder=" "
                value={search}
              />
              <label
                htmlFor="search"
                className="labelDefault"
              >
                Search
              </label>
            </div>
          </div>
          <div className="formElement">
            <div className="fieldDefault">
              <input
                onChange={(e) => setStreet(e.target.value)}
                type="text"
                id="street"
                name="street"
                className={`inputDefault disabled ${street.length > 0 ? 'hasText' : ''}`}
                placeholder=" "
                value={street}
                disabled
              />
              <label
                htmlFor="street"
                className="labelDefault"
              >
                Street
              </label>
            </div>
          </div>
          <div className="formElement">
            <div className="fieldDefault">
              <input
                onChange={(e) => setCity(e.target.value)}
                type="text"
                id="city"
                name="city"
                className={`inputDefault disabled ${city.length > 0 ? 'hasText' : ''}`}
                placeholder=" "
                value={city}
                disabled
              />
              <label
                htmlFor="city"
                className="labelDefault"
              >
                City
              </label>
            </div>
          </div>
          <div className="formElement">
            <div className="fieldDefault">
              <input
                onChange={(e) => setState(e.target.value)}
                type="text"
                id="state"
                name="state"
                className={`inputDefault disabled ${state.length > 0 ? 'hasText' : ''}`}
                placeholder=" "
                value={state}
                disabled
              />
              <label
                htmlFor="state"
                className="labelDefault"
              >
                State
              </label>
            </div>
          </div>
          <div className="formElement">
            <div className="fieldDefault">
              <input
                onChange={(e) => setZipCode(e.target.value)}
                type="text"
                id="zipCode"
                name="zipCode"
                className={`inputDefault disabled ${zipCode.length > 0 ? 'hasText' : ''}`}
                placeholder=" "
                value={zipCode}
                disabled
              />
              <label
                htmlFor="state"
                className="labelDefault"
              >
                zipCode
              </label>
            </div>
          </div>
          <div className="formElement">
            <div className="fieldDefault">
              <input
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                id="country"
                name="country"
                className={`inputDefault disabled ${country.length > 0 ? 'hasText' : ''}`}
                placeholder=" "
                value={country}
                disabled
              />
              <label
                htmlFor="country"
                className="labelDefault"
              >
                Country
              </label>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>Your address is:</h2>
          <div>
            <p>{address.street}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.zipCode}</p>
            <p>{address.country}</p>
          </div>
        </>
      )}
    </div>
  )
}
