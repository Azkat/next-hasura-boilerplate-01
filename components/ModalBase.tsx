import React, { useRef, useState, useEffect, useContext } from 'react'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import { AuthContext } from '../lib/authProvider'
import ModalPost from '../components/ModalPost'
import ModalPostMobile from '../components/ModalPostMobile'
import { useWindowSize } from '../hooks/useWindowSize'

const modalStyles = {
  content: {
    backgroundColor: 'rgba(30, 30, 30, 1)',
    border: 'none',
    inset: '110px 80px',
    padding: '0px',
  },
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
}

const modalStylesMobile = {
  content: {
    backgroundColor: 'rgba(30, 30, 30, 1)',
    border: 'none',
    inset: '0px 0px',
    padding: '0px',
  },
  overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
}

const ModalBase = (props) => {
  const router = useRouter()
  const { windowWidth, windowHeight } = useWindowSize()
  const { currentUser } = useContext(AuthContext)
  const [asPath, setAsPath] = useState('/')

  return (
    <>
      <Modal
        isOpen={!!router.query.postId}
        onRequestClose={() =>
          router.push('/', undefined, {
            scroll: false,
          })
        }
        contentLabel="Post modal"
        style={windowWidth > 640 ? modalStyles : modalStylesMobile}
      >
        {windowWidth > 640 ? (
          <ModalPost
            id={router.query.postId}
            aspath={props.aspath}
            currentUser={currentUser}
          />
        ) : (
          <ModalPostMobile
            id={router.query.postId}
            aspath={props.aspath}
            currentUser={currentUser}
          />
        )}
      </Modal>
    </>
  )
}

export default ModalBase
