import React, { useEffect, useState, useContext } from 'react'
import { Store } from '../../reducer/reducer'
import { Layout } from '../../components/Layout'
import { useRouter } from 'next/router'
import { useChangeProfileImage } from '../../hooks/useChangeProfileImage'
import { CropImage } from '../../components/imageCrop/CropImage'
import { useSelector, useDispatch } from 'react-redux'
import { AuthContext } from '../../lib/authProvider'
import Image from 'next/image'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

export default function Change_Profile_Image(props) {
  const router = useRouter()
  const { state, dispatch } = useContext(Store)
  const { uploadPhoto } = useChangeProfileImage()
  const [src, setSrc] = useState(
    `https://vmedia.droptune.net/user_icon/${cookie.get('user_id')}.jpg`
  )

  const { currentUser } = useContext(AuthContext)
  !currentUser ? router.push('/login') : ''

  return (
    <Layout title="Change Profile Image">
      <div className="px-4 mb-32">
        <h2 className="header-h2">Change Profile Image</h2>

        <div className="card w-full bg-backgroundGray shadow-xl mt-8">
          <div className="card-body">
            <div className="bg-cover bg-center w-full relative h-40 mb-20">
              <Image
                src={src}
                layout="fill"
                onError={() => {
                  setSrc(`/noImageYet.png`)
                }}
                objectFit="contain"
                alt="No Image Yet"
              />
            </div>

            <CropImage />

            <button
              className="btn btn-primary disabled:bg-gray-600 mt-10"
              type="submit"
              disabled={!state.imageFile}
              onClick={uploadPhoto}
            >
              Update Image
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
