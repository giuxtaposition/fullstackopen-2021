import React, { useEffect, useState } from 'react'

const Notification = ({ message, status }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
    var timer = setTimeout(() => setShow(false), 2500)

    return () => {
      clearTimeout(timer)
    }
  }, [message])

  return (
    <>
      {show && message !== '' && (
        <div className={`notification ${status}`}>{message}</div>
      )}
    </>
  )
}

export default Notification
