import React from 'react';
import { usePoints } from './PointsContext'; 

function ComponentUsingPoints() {
  const { points } = usePoints();

  return (
    <div>
      {/* <h2>Component Using Points</h2> */}
      {/* <p>Points: {points}</p> */}
    </div>
  );
}

export default ComponentUsingPoints;
