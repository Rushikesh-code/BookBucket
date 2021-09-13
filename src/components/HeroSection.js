import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <h1>BOOKS ARE WAITING FOR YOU</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Use Books
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Sell Books
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Create Channels
        </Button>
        <button
            style={{height:"52px", minWidth:"250px", fontSize:"17px"}}
        >
          <a href="https://youtu.be/9VoxXwUOROw">WATCH Videos</a> <i className='far fa-play-circle' />
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
