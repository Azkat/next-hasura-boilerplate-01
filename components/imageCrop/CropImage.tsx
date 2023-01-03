import React, { useEffect, useState, useRef, useContext } from 'react'
import { Store } from '../../reducer/reducer'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'

import 'react-image-crop/dist/ReactCrop.css'
import { setTimeout } from 'timers/promises'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

interface IFormInput {
  audioFile: any
}

export function CropImage() {
  const { state, dispatch } = useContext(Store)
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [croppedImageWidth, setCroppedImageWidth] = useState(0)
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(1)
  const ref = React.useRef(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>()

  const fileRules = {
    required: 'Select your file',
  }

  useEffect(() => {
    const canvas = previewCanvasRef.current

    if (canvas != null && completedCrop) {
      const croppedImage = document.getElementById('croppedImage')
      const croppedImageWidth = Number(croppedImage.getAttribute('width'))
      if (croppedImageWidth > 0) {
        const dataURL = canvas.toDataURL('image/jpeg')
        dispatch({ type: 'setImageFile', payload: dataURL })
        dispatch({
          type: 'setCanvasWidth',
          payload: croppedImageWidth,
        })
        console.log(croppedImage.getAttribute('width'))
      }
    }
  }, [completedCrop])

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || '')
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      dispatch({
        type: 'setCanvasWidth',
        payload: height,
      })
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  const uploadPhoto = async (e) => {
    const canvas = previewCanvasRef.current
    const dataURL = canvas.toDataURL('image/jpeg')
    fetch(dataURL)
      .then((res) => res.blob())
      .then((blob) => {
        return axios
          .get('/api/upload-url', {
            params: {
              filename: 'canvasImage.jpg',
              filetype: 'image/jpeg',
            },
          })
          .then((res) => {
            const options = {
              headers: {
                'Content-Type': 'image/jpeg',
              },
            }
            return axios.put(res.data.url, blob, options)
          })
          .then((res) => {
            console.log(res)
          })
      })
  }

  const setAdjust = () => {
    console.log(state.canvasAdjust)
    dispatch({
      type: 'setCanvasAdjust',
      payload: true,
    })
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        )
      }
    },
    100,
    [completedCrop, scale, rotate]
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else if (imgRef.current) {
      const { width, height } = imgRef.current
      setAspect(16 / 9)
      setCrop(centerAspectCrop(width, height, 16 / 9))
    }
  }

  return (
    <div className="App">
      <div className="Crop-Controls">
        <input
          title="imagefile"
          {...register('audioFile', fileRules)}
          className="text-sm text-grey-500 file:cursor-pointer
          file:mr-5 file:py-2 file:px-6
          file:rounded-full file:border-0
          file:text-sm file:font-medium
          file:bg-gray-300 file:text-secondary"
          type="file"
          accept="image/jpeg, image/png, image/gif"
          onChange={onSelectFile}
        />
        {/* <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div> */}
      </div>
      {Boolean(imgSrc) && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <div className="relative">
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
            <div className="text-red-500 absolute adjustImage">
              {!state.imageFile && 'Adjust image cropping'}
            </div>
          </div>
        </ReactCrop>
      )}
      <div>
        {Boolean(completedCrop) && (
          <canvas
            id="croppedImage"
            ref={previewCanvasRef}
            width={0}
            height={0}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: 300,
              height: 300,
            }}
          />
        )}
      </div>
      <style jsx>{`
        .adjustImage {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          font-size: 21px;
          font-weight: bold;
          text-shadow: 0 0 white;
        }
      `}</style>
    </div>
  )
}
