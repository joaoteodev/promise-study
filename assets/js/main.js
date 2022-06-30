const apiFetch = url => {
  return fetch(url).then(data => data.json());
};

const getPokemonList = obj => obj.then(pokemons => pokemons.results);

const urlBase = "https://pokeapi.co/api/v2/pokemon/";
const app = document.getElementById("app");
let currentPage = urlBase;

const h1 = document.createElement("h1");
h1.textContent = "Choose your Pokemon";
app.appendChild(h1);

const divList = document.createElement("div");
divList.classList.add("pokemon-list");
app.appendChild(divList);

const pokemonBase = pokemonName => `<div class="pokemon">${pokemonName}</div>`;

function updatePokemonList(pokemons) {
  let htmlBase = "";
  pokemons.forEach(pokemon => {
    htmlBase += pokemonBase(pokemon.name);
  });
  divList.innerHTML = htmlBase;
}

function updatePage(page) {
  currentPage = page;
  getPokemonList(apiFetch(page)).then(pokemons => {
    updatePokemonList(pokemons);
    const listPokemons = document.querySelectorAll(".pokemon");
    listPokemons.forEach(el => {
      el.addEventListener("click", () => {
        apiFetch(urlBase + el.textContent).then(updatePokemon);
      });
    });
  });
}

function nextPage() {
  apiFetch(currentPage).then(page => {
    if (page.next) {
      updatePage(page.next);
    }
  });
}

function previousPage() {
  apiFetch(currentPage).then(page => {
    if (page.previous) {
      updatePage(page.previous);
    }
  });
}

const buttonNext = document.createElement(`button`);
buttonNext.textContent = `Next Page`;
buttonNext.classList.add("button-next");
buttonNext.addEventListener(`click`, nextPage);
const buttonprevious = document.createElement(`button`);
buttonprevious.textContent = `previous Page`;
buttonprevious.classList.add("button-previous");
buttonprevious.addEventListener(`click`, previousPage);
app.appendChild(buttonprevious);
app.appendChild(buttonNext);

getPokemonList(apiFetch(currentPage)).then(pokemons => {
  updatePokemonList(pokemons);
  const listPokemons = document.querySelectorAll(".pokemon");
  listPokemons.forEach(el => {
    el.addEventListener("click", () => {
      apiFetch(urlBase + el.textContent).then(updatePokemon);
    });
  });
});

const pokeImg = document.createElement("img");
pokeImg.setAttribute("id", "poke-img");
const pokeName = document.createElement("h2");
pokeName.style.borderTop = "1px solid black";
const pokeID = document.createElement("h3");
app.appendChild(pokeName);
app.appendChild(pokeImg);
app.appendChild(pokeID);

function updatePokemon(pokemon) {
  pokeName.textContent = pokemon.name.toUpperCase();
  pokeImg.setAttribute("src", pokemon.sprites.other.home.front_default);
  pokeID.textContent = "ID: " + pokemon.id;
}
