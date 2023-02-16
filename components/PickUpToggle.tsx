import React, { useEffect, useState, useContext, useRef } from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline'
import Cookies from 'universal-cookie'
import { useAppMutate } from '../hooks/useAppMutate'
import { useQueryUserLikes } from '../hooks/useQueryPosts'
import Lottie from 'react-lottie'
import animationData from '../public/99800-heart-fav.json'
import { setTimeout } from 'timers'
import { Store } from '../reducer/reducer'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { AuthContext } from '../lib/authProvider'

export const PickUpToggle = (props) => {
  const cookie = new Cookies()
  const [isOpen, setIsOpen] = useState(false)
  const [toggleDisabled, setToggleDisabled] = useState(false)
  const [toggleChecked, setToggleChecked] = useState(false)
  let completeButtonRef = useRef(null)
  const { currentUser } = useContext(AuthContext)
  const { updatePostPickedupMutaion } = useAppMutate()

  useEffect(() => {
    if (props.post.pickedup != undefined) {
      setToggleChecked(props.post.pickedup)
    }
  }, [props])

  const testfunc = async () => {
    const defaultPickedup = props.post.pickedup
    let payload
    toggleChecked ? (payload = false) : (payload = true)
    toggleChecked ? setToggleChecked(false) : setToggleChecked(true)
    const param = { id: props.post.id, pickedup: payload }
    setToggleDisabled(true)
    await updatePostPickedupMutaion.mutate(param, {
      onError: (res) => {
        console.log('error')
        setToggleDisabled(false)
        setToggleChecked(defaultPickedup)
      },
      onSuccess: (res) => {
        console.log(param)
        setToggleDisabled(false)
        setToggleChecked(payload)
      },
    })
  }

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        disabled={toggleDisabled}
        checked={toggleChecked}
        onChange={testfunc}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  )
}
