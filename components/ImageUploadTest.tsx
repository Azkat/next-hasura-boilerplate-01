import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const ImageUploadTest = () => {
  const uploadPhoto = async (e) => {
    const file = e.target.files[0]
    return axios
      .get('/api/upload-url', {
        params: {
          filename: file.name,
          filetype: file.type,
        },
      })
      .then((res) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          },
        }
        return axios.put(res.data.url, file, options)
      })
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <div>
      <p>Upload a .png or .jpg image (max 1MB).</p>
      <input
        placeholder="image"
        onChange={uploadPhoto}
        type="file"
        accept="image/png, image/jpeg"
      />
    </div>
  )
}
