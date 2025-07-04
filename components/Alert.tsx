import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Store } from '../reducer/reducer'
import Link from 'next/link'

const Alert = (props) => {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const [text, setText] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [alertStyle, setAlertStyle] = useState('')
  const [translateY, setTranslateY] = useState('translate-y-0')

  const alertStyleList = {
    info: 'text-blue-700  bg-blue-50',
    danger: 'text-red-700 bg-red-50',
    success: 'text-green-700  bg-green-50',
    warning: 'text-yellow-700  bg-yellow-50',
    dark: 'text-gray-700 bg-gray-50',
  }

  useEffect(() => {
    if (state.alert.text !== '') {
      setShowAlert(true)

      state.alert.type == 'info' && setAlertStyle(alertStyleList.info)
      state.alert.type == 'danger' && setAlertStyle(alertStyleList.danger)
      state.alert.type == 'success' && setAlertStyle(alertStyleList.success)
      state.alert.type == 'warning' && setAlertStyle(alertStyleList.warning)
      state.alert.type == 'dark' && setAlertStyle(alertStyleList.dark)
      state.alert.type == '' && setAlertStyle(alertStyleList.info)

      setTimeout(() => {
        setShowAlert(false)
        dispatch({ type: 'setAlert', payload: { text: '', type: 'info' } })
      }, 4000)
    }
  }, [state.alert])

  useEffect(() => {
    showAlert ? setTranslateY('translate-y-24') : setTranslateY('translate-y-0')
  }, [showAlert])

  const hideAlert = () => {
    setShowAlert(false)
    dispatch({ type: 'setAlert', payload: { text: '', type: 'info' } })
  }

  return (
    <>
      <div
        className={`fixed -top-20 ${translateY} left-1/2 -translate-x-1/2 duration-300`}
      >
        <div
          id="alert-1"
          className={`flex  w-[300px] sm:w-[600px] opacity-90 p-4 mb-4 ${alertStyle} rounded-lg `}
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <div className="ml-3 text-sm font-medium">{state.alert.text}</div>
          <button
            type="button"
            className={`ml-auto -mx-1.5 -my-1.5 ${alertStyle} rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8`}
            data-dismiss-target="#alert-1"
            aria-label="Close"
            onClick={hideAlert}
          >
            <span className="sr-only">Close</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default Alert
