import React from 'react'

function Greeting(props) {
  console.log(props)
  return (
    <div className='greeting'>
        <h1>Welcome, {props.name}</h1>
        <p>{props.message}</p>
    </div>
  )
}

export default Greeting