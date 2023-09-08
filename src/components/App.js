import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState("all");
  const [url, setUrl] = useState(`http://localhost:3001/pets/`)
  const [adopted, setAdopted] = useState(true)

  function onChange(e){
    setFilters(e.target.value)
    setAdopted(!adopted)
  }

  function onFindPetsClick(){
    if (filters === 'all'){
      setUrl(`http://localhost:3001/pets/`)
    }
    else if (filters === "cat"){
      setUrl(`http://localhost:3001/pets?type=cat`)
    }
    else if (filters === "dog"){
      setUrl(`http://localhost:3001/pets?type=dog`)
    }
    else if(filters === "micropig"){
      setUrl(`http://localhost:3001/pets?type=micropig`)
    }
  }

  useEffect(()=>{
    fetch(url)
    .then(r => r.json())
    .then(data => setPets(data))
    .catch(e=> console.log(e))
  }, [url, adopted])

  // console.log(pets)

  function onAdoptPet(pet){
    fetch(url+pet.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: pet.id,
        type: pet.type,
        gender: pet.gender,
        age: pet.age,
        weight: pet.weight,
        name: pet.name,
        isAdopted: true
      })
    })
    console.log("adopted")
    setAdopted(()=> !adopted)
    // console.log(petId)
  }

  

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChange={onChange} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={ pets } onAdoptPet={onAdoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;