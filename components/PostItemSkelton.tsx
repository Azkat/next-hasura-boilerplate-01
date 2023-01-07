import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react'
import { Store } from '../reducer/reducer'
import Link from 'next/link'
import Cookies from 'universal-cookie'
import { LikeButton } from './LikeButton'
import { PlayIcon } from '@heroicons/react/solid'
import { useOnScreen } from '../hooks/useOnScreen'
import Image from 'next/image'
import DropdownPostmenu from './DropdownPostmenu'
import PlayButton from './PlayButton'
import WebAudio from './WebAudio'

const PostItemSkelton = (props) => {
  return (
    <div className="bg-backgroundGray mb-4 sm:rounded-lg animate-pulse ">
      <p className="font-bold my-3 ">
        <div className="flex items-center p-4 pt-3 ">
          <div className="w-8 h-8 mr-2  relative ">
            <div className="rounded-full bg-slate-700 h-8 w-8"></div>
          </div>
          <div className="w-40">
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
        <div className="bg-cover bg-center w-full relative cursor-pointer overflow-hidden h-80">
          <div className="w-full h-80 flex items-center h-full">
            <div className="w-full h-80 bg-slate-700 rounded"></div>
          </div>
        </div>
        <div className="p-4 pt-3">
          <div className="w-40">
            <div className="h-2 bg-slate-700 rounded"></div>
          </div>
        </div>
      </p>

      <style jsx>{`
        .nextImage {
          position: relative !important;
          width: 100% !important;
          height: unset !important;
        }
        .h-vw {
          height: 100vw;
        }
        .likebutton {
          bottom: 24px;
          right: 16px;
        }
        .playbutton {
          bottom: 22px;
          left: 16px;
        }
      `}</style>
    </div>
  )
}

export default PostItemSkelton
