import React from 'react'
import { useSelector } from "react-redux";
import Image1 from '../assets/image1.png'

function HomePage() {
  const {isLoggedIn,username } = useSelector((state) => state.user);

  return (
    <div className='my-5 py-5'>
      <div className="container py-5">
        
        {!isLoggedIn ? (
          <div className='row'>
            <div className="col-md-6 col-12">
              <div className='h1 text-center'>
                Welcome
              </div>
              <div className='h1 text-center text-danger mt-5'  >
                <p>login in to</p>
                <p> add a new Project.</p>
              </div>
            </div>
            <div className="col-md-6 col-12 align-content-center ">
              <div className="w-50 mx-auto">
                <img src={Image1} alt="" className=' w-100 img-fluid'/>
              </div>
            </div>
          </div>
        ) :
          <div className='row'>
            <div className="col-md-6 col-12">
                <div className='h1 text-center'>
                  Welcome { username }
                </div>
                <div className='h1 text-center text-success mt-5'  >
                  <p>you can view the projects</p>
                    <p>or</p>
                  <p> add a new one.</p>
                </div>
            </div>
            <div className="col-md-6 col-12 align-content-center ">
              <div className="w-50 mx-auto">
                <img src={Image1} alt="" className=' w-100 img-fluid'/>
              </div>
            </div>
          </div>}
      </div>
    </div>
  )
}

export default HomePage
