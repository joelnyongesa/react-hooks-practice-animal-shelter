import React from "react";

function Pet({ pet, onAdoptPet }) {
  return (
    <div className="card" data-testid="pet">
      <div className="content">
        <span className="header">
          {/*'♀' OR '♂' */
            pet.gender === "female" ? '♀' : '♂'
          }
          {pet.name}
        </span>
        <div className="meta">
          <span className="date">{pet.type}</span>
        </div>
        <div className="description">
          <p>Age: {pet.age}</p>
          <p>Weight: {pet.weight}</p>
        </div>
      </div>
      <div className="extra content">
        <button className="ui disabled button">Already adopted</button>
        <button 
        className="ui primary button"
        onClick={()=>{onAdoptPet(pet)}}
        >Adopt pet</button>
      </div>
    </div>
  );
}

export default Pet;