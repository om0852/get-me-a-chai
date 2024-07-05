import React from 'react'

function page({params}) {
  return (
    <div>{params.username}</div>
  )
}

export default page