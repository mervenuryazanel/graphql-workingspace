import { useQuery, gql } from "@apollo/client";
import { useState } from "react";

function App() {

  const [selectedDog, setSelectedDog] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>"Dogs" query examples 🚀</h2>
      <Dog onDogSelected={(e) => {
        console.log(e.target.value);
        setSelectedDog(e.target.value);
      }} />
      <br />
      {selectedDog &&
        <DogPhoto breed={selectedDog} />
      }
    </div>
  );
}

export default App;

// "gql" is a tag function that parses the string into a GraphQL AST (GraphQL AST is kinda a graphql query document)
const GET_DOGS = gql`
query GetDogs{
  dogs{
    id
    breed
  }
}`;


const Dog = ({ onDogSelected }) => {

  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected} style={{ width: "40%" }}>
      {
        data?.dogs?.map((dog) => {
          return (
            <option key={dog.id} value={dog.bree}>
              {dog.breed}
            </option>
          )
        })
      }
    </select>
  )

}

//this query needs a variable called "breed" to be passed in
const GET_DOG_PHOTO = gql` 
query Dog($breed:String!){
  dog(breed:$breed){
    id
    displayImage
  }
}`;

function DogPhoto({ breed }) {
  const { loading, error, data } = useQuery(GET_DOG_PHOTO, {
    variables: { breed }, // "variables" is an object that contains all of the variables that our query needs
  });

  if (loading) return `The related photo of ${breed} is loading...`;
  if (error) return `Error ${error.message}`;

  return (
    <img
      src={data.dog.displayImage}
      style={{ height: 100, width: 100 }}

    />
  )
};

