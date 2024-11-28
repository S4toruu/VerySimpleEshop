import React, { useEffect, useState } from 'react'
import styles from './notification.module.scss'

interface NotificationProps {
  message?: string
  show: boolean
  duration?: number
}

export function Notification({ message, show, duration = 3000 }: NotificationProps) {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration])

  return (
    <div className={`${styles.notification} ${visible ? styles.show : ''}`}>
      {message}
    </div>
  )
}
