const url = "https://pokeapi.co/api/v2/pokemon/";
const pokemon = document.querySelector("#pokemon-name");
const pokemonsString = document.querySelector("#pokemons");
const pokeImg = document.querySelector("#poke-img");
const pokeID = document.querySelector("#poke-id");

let pokemons = "";

const getPokemon = pokemon => {
  return fetch(url + pokemon)
    .then(data => {
      if (data.ok) {
        return data.json();
      }
    })
    .catch(err => console.log(err));
};

const pokemonBase = pokemonName => `<div class="pokemon">${pokemonName}</div>`;
let pokemonsHTML = "";

fetch(url)
  .then(data => data.json())
  .then(pokes => {
    pokes.results.forEach(poke => {
      pokemonsHTML += pokemonBase(poke.name);
    });

    pokemonsString.innerHTML = pokemonsHTML;
    pokemons = document.querySelectorAll(".pokemon");
  })
  .then(() => {
    pokemons.forEach(el => {
      el.addEventListener("click", () => {
        const pokeName = el.textContent;
        pokemon.textContent = pokeName;
        getPokemon(pokeName.toLowerCase())
          .then(poke => {
            pokeImg.setAttribute("src", poke.sprites.other.home.front_default);
            pokeID.textContent = `ID: ${poke.id}`;
          })
          .catch(err => console.log(err));
      });
    });
  });
