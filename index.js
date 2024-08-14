import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
  //hitting the pokemon api url.
  const response = await axios.get(API_URL);
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  //taking the user input name.
  const pokemonName = req.body.pokemon;
  try {
    //hitting the api server with the user entered pokemon name endpoint. 
    const response = await axios.get(API_URL + pokemonName);
    //getting these data from the api to show to the front-end.
    const data = {
      name: response.data.name,
      weight: response.data.weight,
      abilities: response.data.abilities,
      image: response.data.sprites.other.dream_world.front_default,
    };
    //console.log(data);
    //passing the data to the ejs view.
    res.render("index.ejs", { data: data });
  } catch (error) {
    console.error("Failed to make request:", error.code);
  }
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
