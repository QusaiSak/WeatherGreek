import React from 'react';
import img from './Bg.jpg'; // Ensure the image path is correct

const Home = () => {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
    </div>
  );
};

export default Home;
