import React from 'react'
import './HomePage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPassport, faRoute, faLeaf, faGift, faBook, faGlobeAmericas, } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  return (
    <>
      <h1 className='intro'>Travelling doesn't have to cost the earth!</h1>
      <p className='explain'> Embark on a journey of discovery and conscious exploration with Travel-Wise, 
      an innovative travel app designed to revolutionize the way we experience the world. 
      In a time when our planet's well-being is paramount, this site sets out to empower
       travelers with the tools and knowledge to make eco-conscious choices that leave a positive impact on the environment.</p>
       <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faPassport} size="3x" className="mb-3 pass" />
            <h4>Explore the World</h4>
            <p>Discover new destinations and experience cultures from around the globe.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faRoute} size="3x" className="mb- route" />
            <h4>Eco-Friendly Routes</h4>
            <p>Find the most sustainable travel routes and reduce your carbon footprint.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faLeaf} size="3x" className="mb-3 leaf" />
            <h4>Sustainable Practices</h4>
            <p>Get tips on eco-friendly accommodations, transportation, and responsible tourism.</p>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faGift} size="3x" className="mb-3 gift" />
            <h4>Eco-Friendly Rewards</h4>
            <p>Earn rewards for making environmentally conscious choices during your travels.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faGlobeAmericas} size="3x" className="mb-3 globe" />
            <h4>A Greener Tomorrow</h4>
            <p>Join us in preserving the planet for future generations through responsible travel.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faBook} size="3x" className="mb-3 book" />
            <h4>Personal Travel Diary</h4>
            <p>Document your eco-friendly experiences and memories in your travel diary.</p>
          </div>
        </div>
      </div>
    </div>
 
      </>
      
    
  )
}
