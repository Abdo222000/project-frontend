import React from 'react'
import { useSelector } from "react-redux";

function HomePage() {
  const {isLoggedIn } = useSelector((state) => state.user);

  return (
    <div className='my-5'>
      <div className="container">
        <div className='h1 text-center'>
          this is the Home page
        </div>
        {!isLoggedIn ? (
          <>
            <div className='h1 text-center text-danger mt-5'  > Sign in to view the projects and add new one</div>
          </>
        ) : <></>}
      </div>
    </div>
  )
}

export default HomePage
