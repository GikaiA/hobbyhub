import React from 'react';
import './Homepage.css'
import socialmedia from '../videos/social-media.mp4'

function Homepage() {
  return (
    <div className='homepage'>
      <video autoPlay muted controls={false} loop playsInline={true}>
          <source src={socialmedia} type="video/mp4"></source>
        </video>
        <div className='homepage-section'>
          <h1>HobbyHub</h1>
          <h2>For all the Hobbies</h2> 
        </div>
    </div>
  )
}

export default Homepage
