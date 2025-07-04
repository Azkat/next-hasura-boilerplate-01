import React, { useState, useEffect } from 'react'
import { LinkIcon } from '@heroicons/react/solid'

const UserInformation = (props) => {
  const [link, setLink] = useState(``)

  useEffect(() => {
    if (props.status == 'success') {
      if (props.data.website) {
        const urlText = new URL(props.data.website)
        const urlTextHost = urlText.host
        let urlTextPathname = urlText.pathname
        urlTextPathname == '/' ? (urlTextPathname = '') : ''
        setLink(urlTextHost + urlTextPathname)
      }
    }
  }, [props.status])

  return (
    <>
      {props.status == 'success' ? (
        <div className="px-4 mb-1 sm:px-0 sm:mt-1 items-center text-center">
          <div className="text-sm mb-1">
            <div className="whitespace-pre">{props.data.bio}</div>
          </div>
          {link != '' && (
            <div className="text-sm mb-2 text-secondary flex mt-3 items-center justify-center">
              <div className="h-4 w-4 mr-1">
                <LinkIcon className="h-full w-full  text-gray-100 opacity-80 cursor-pointer" />
              </div>
              <a href={props.data.website} target="_blank" rel="noreferrer">
                {link}
              </a>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default UserInformation
