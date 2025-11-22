import React from 'react'
import { useSelector } from "react-redux";

function HomePage() {
  const {isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className='my-5 py-5'>
      <div className="container py-5">
        
        {!isLoggedIn ? (
          <>
            <div className='h1 text-center'>
              Welcome
            </div>
            <div className='h1 text-center text-danger mt-5'  >
              <p>login in to view the projects</p>
                <p>or</p>
              <p> add a new one.</p>
            </div>
          </>
        ) : <>
            <div className='h1 text-center'>
              Welcome
            </div>
            <div className='h1 text-center text-success mt-5'  >
              <p>now you can view the projects</p>
                <p>or</p>
              <p> add a <u>new</u> one.</p>
            </div>
          </>}
      </div>
    </div>
  )
}

export default HomePage
