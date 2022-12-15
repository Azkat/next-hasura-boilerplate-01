import React from 'react'

const UserInformation = (props) => {
  console.log(props)

  return (
    <>
      {props.status == 'success' ? (
        <div className="px-4 mb-4 sm:px-0 sm:mt-6">
          <div className="text-sm mb-1">
            <div>{props.data.bio}</div>
          </div>
          <div className="text-sm mb-2 text-secondary">
            <a>{props.data.website}</a>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default UserInformation
