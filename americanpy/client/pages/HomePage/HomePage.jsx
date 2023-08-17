import React from 'react'
import './homepage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPassport, faRoute, faLeaf, faGift, faBook, faGlobeAmericas, } from '@fortawesome/free-solid-svg-icons';
import world from './world.png'
import peaks from './peaks.png'

export default function HomePage() {
  return (
    <>
    <div className="container" data-testid="title_container">
    <div className="background-home">
      <img className='peaks' src={peaks} alt="Waves" />
    </div>
      <div className="row intro-explain-container">
          <h1 className='intro' data-testid = "home_title">Travelling doesn't have to cost the earth!</h1>
          <div className="col-md-8 text-column">
            <p className='explain' data-testid = "home_description">Welcome to Travel-Wise, your compass to responsible and sustainable travel! <br></br> Our planet's well-being is paramount, this site sets out to empower
              travellers with the tools and knowledge to make eco-conscious choices that leave a positive impact on the environment.</p>
          </div>
        <div className="col-md-4 image-column">
          <img src={world} alt="globe" className="column-image" data-testid="globe_image"/>
        </div>
      </div>
    </div>
    <div className="container mt-5" data-testid="icons_container">
      <div className="row">
        <div className="col-md-4" data-testid="explore_container">
          <div className="feature-card text-center p-4">
            <FontAwesomeIcon icon={faPassport} size="3x" className="mb-3 pass" data-testid="explore_icon"/>
            <h4 className='iconTitle' data-testid="explore_title" >Explore the World</h4>
            <p data-testid="explore_description">Discover new destinations and experience cultures from around the globe.</p>
          </div>
        </div>
        <div className="col-md-4" data-testid="routes_container">
          <div className="feature-card text-center p-4">
            <FontAwesomeIcon icon={faRoute} size="3x" className="mb- route" data-testid="routes_icon" />
            <h4 className='iconTitle' data-testid="routes_title">Eco-Friendly Routes</h4>
            <p data-testid="routes_description">Find the most sustainable travel routes and reduce your carbon footprint.</p>
          </div>
        </div>
        <div className="col-md-4" data-testid="sustainable_container">
          <div className="feature-card text-center p-4">
            <FontAwesomeIcon icon={faLeaf} size="3x" className="mb-3 leaf" data-testid="sustainable_icon"/>
            <h4 className='iconTitle' data-testid="sustainable_title">Sustainable Practices</h4>
            <p data-testid="sustainable_description">Get tips on eco-friendly accommodations, transportation, and responsible tourism.</p>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4" data-testid="rewards_container">
          <div className="feature-card text-center p-4">
            <FontAwesomeIcon icon={faGift} size="3x" className="mb-3 gift" data-testid="rewards_icon"/>
            <h4 className='iconTitle' data-testid="rewards_title">Eco-Friendly Rewards</h4>
            <p data-testid="rewards_description">Earn rewards for making environmentally conscious choices during your travels.</p>
          </div>
        </div>
        <div className="col-md-4" data-testid="greener_container">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faGlobeAmericas} size="3x" className="mb-3 globe" data-testid="greener_icon"/>
            <h4 className='iconTitle' data-testid="greener_title">A Greener Tomorrow</h4>
            <p data-testid="greener_description">Join us in preserving the planet for future generations through responsible travel.</p>
          </div>
        </div>
        <div className="col-md-4" data-testid="diary_container">
          <div className="feature-card text-center p-4">
          <FontAwesomeIcon icon={faBook} size="3x" className="mb-3 book" data-testid="diary_icon"/>
            <h4 className='iconTitle' data-testid="diary_title">Personal Travel Diary</h4>
            <p data-testid="diary_description">Document your eco-friendly experiences and memories in your travel diary.</p>
          </div>
        </div>
      </div>
    </div>
 
    </>
      
    
  )
}
