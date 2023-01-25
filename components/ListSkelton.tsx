import React from 'react'

const ListSkelton = () => {
  return (
    <div className="container px-4 py-2 mx-auto ">
      <div className="flex flex-wrap -m-1 md:-m-2 animate-pulse">
        {[...Array(6)].map((value, index) => (
          <div className="flex flex-wrap w-1/3" key={index}>
            <div className="w-full p-1 md:p-2  aspect-square cursor-pointer relative ">
              <div className="bg-slate-700 w-full h-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListSkelton
