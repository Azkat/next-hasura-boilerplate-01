import React, { useEffect, useState, useContext, useRef } from 'react'
import { Store } from '../../reducer/reducer'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import firebase, { auth } from '../../firebaseConfig'
import { AuthContext } from '../../lib/authProvider'

export default function VerifyEmail(props) {
  const router = useRouter()
  const [isUser, setIsUser] = useState(false)
  const [isAudioFile, setIsAudioFile] = useState(false)
  const [isVideoFile, setIsVideoFile] = useState(false)
  const [selected, setSelected] = useState('')
  const [sendEmail, setSendEmail] = useState(false)
  const { state, dispatch } = useContext(Store)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {}, [])

  const send = () => {
    firebase.auth().currentUser.sendEmailVerification()
    setSendEmail(true)
  }

  currentUser.emailVerified && router.replace('/account')

  return (
    <Layout title="Create new post">
      <div className="px-4 mb-32">
        <h2 className="header-h2">Verify Email</h2>
        <div className="card w-full bg-backgroundGray shadow-xl mt-8">
          {sendEmail ? (
            <div className="card-body">
              <p className="mb-8">
                Sent Email to {firebase.auth().currentUser.email}
              </p>
            </div>
          ) : (
            <div className="card-body">
              <p className="mb-8">
                Your Email, {firebase.auth().currentUser.email} has not been
                verified yet.
              </p>

              <button className="btn btn-block btn-primary" onClick={send}>
                Send authentication Email
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
