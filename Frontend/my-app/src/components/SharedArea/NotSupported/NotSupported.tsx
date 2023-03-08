import React from 'react'
import './NotSupported.css'
const NotSupported = () => {
  return (
    <div className='NotSupported'>
        <header>
            <h1 className='fs-1 bold mt-2'> Quiker</h1>
        </header>
        <nav></nav>
        <main>
           <h1 className='m-4 p-4'>This site not supported on mobile devices yet. </h1>
            <p className='fs-4  m-0'>Please Switch to a bigger screen to use this site</p>

        </main>
    </div>
  )
}

export default NotSupported