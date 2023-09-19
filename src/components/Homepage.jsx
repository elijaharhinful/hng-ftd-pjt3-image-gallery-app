import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Gallery from './Gallery'

function Homepage() {
  return (
    <div className='container'>
      <Nav />
      <Gallery />
      <Footer />
    </div>
  );
}

export default Homepage;
