import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";
import pf from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});



class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pets:[]
    };
  }
  handleTitleClick() {
    alert("You clicked the title");
  }
  componentDidMount() {
    petfinder.pet.find({ output: "full", location:"Las vegas,NV" })
    .then(data =>{
      let pets;

      if(data.petfinder.pets && data.petfinder.pets.pet){
        if(Array.isArray(data.petfinder.pets.pet)){
          pets=data.petfinder.pets.pet;
        }
        else{
          pets=[data.petfinder.pets.pet];
        }
      }
      else{
        pets=[];
      }
      this.setState({
        pets:pets
      });
    })
  }
  
  render() {
    return (<div>
      <h1 onClick={this.handleTitleClick} >Adopt Me!</h1>

      {this.state.pets.map(pet => {
        let breed;
        if (Array.isArray(pet.breeds.breed)) {
          breed = pet.breeds.breed.join(", ");
        } else {
          breed = pet.breeds.breed;
        }
        return (
          <Pet
            animal={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={breed}
            media={pet.media}
            location={`${pet.contact.city}, ${pet.contact.state}`}
          />
        );
      })}
    </div>);

    
  }
}

ReactDOM.render(React.createElement(App), document.getElementById("root"));
