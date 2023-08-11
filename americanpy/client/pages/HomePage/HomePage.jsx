import React from 'react'
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPassport, faRoute, faLeaf, faGift, faBook, faGlobeAmericas, } from '@fortawesome/free-solid-svg-icons';
import world from './world.png'

export default function HomePage() {
  return (
    <>
    <div className="container">
      <div className="row intro-explain-container">
          <h1 className='intro'>Travelling doesn't have to cost the earth!</h1>
          <div className="col-md-8 text-column">
          <p className='explain'>Welcome to Travel-Wise, your compass to responsible and sustainable travel! <br></br> Our planet's well-being is paramount, this site sets out to empower
            travellers with the tools and knowledge to make eco-conscious choices that leave a positive impact on the environment.</p>
        </div>
        <div className="col-md-4 image-column">
          <img src={world} alt="globe" className="column-image" />
        </div>
  </div>
</div>
       <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faPassport} size="3x" className="mb-3 pass" />
            <h4 className='iconTitle'>Explore the World</h4>
            <p>Discover new destinations and experience cultures from around the globe.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faRoute} size="3x" className="mb- route" />
            <h4 className='iconTitle'>Eco-Friendly Routes</h4>
            <p>Find the most sustainable travel routes and reduce your carbon footprint.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faLeaf} size="3x" className="mb-3 leaf" />
            <h4 className='iconTitle'>Sustainable Practices</h4>
            <p>Get tips on eco-friendly accommodations, transportation, and responsible tourism.</p>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faGift} size="3x" className="mb-3 gift" />
            <h4 className='iconTitle'>Eco-Friendly Rewards</h4>
            <p>Earn rewards for making environmentally conscious choices during your travels.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faGlobeAmericas} size="3x" className="mb-3 globe" />
            <h4 className='iconTitle'>A Greener Tomorrow</h4>
            <p>Join us in preserving the planet for future generations through responsible travel.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faBook} size="3x" className="mb-3 book" />
            <h4 className='iconTitle'>Personal Travel Diary</h4>
            <p>Document your eco-friendly experiences and memories in your travel diary.</p>
          </div>
        </div>
      </div>
    </div>
 
      </>
      
    
  )
}
