const apiFetch = url => {
  return fetch(url).then(data => data.json());
};

const getPokemonList = obj => obj.then(pokemons => pokemons.results);

const urlBase = "https://pokeapi.co/api/v2/pokemon/";
const app = document.getElementById("app");
let currentPage = urlBase;
let numberPage = 1;

const h1 = document.createElement("h1");
h1.textContent = "Choose your Pokemon";
app.appendChild(h1);

const divList = document.createElement("div");
divList.classList.add("pokemon-list");
app.appendChild(divList);

const pokemonBase = pokemonName =>
  `<a class="pokemon" href="#poke-id">${pokemonName}</a>`;

function updatePokemonList(pokemons) {
  let htmlBase = "";
  pokemons.forEach(pokemon => {
    htmlBase += pokemonBase(pokemon.name);
  });
  divList.innerHTML = htmlBase;
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

const numberPageElement = document.createElement("h3");
numberPageElement.textContent = "Page: " + numberPage;
numberPageElement.style.marginBottom = "20px";
app.appendChild(numberPageElement);

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
pokeID.setAttribute("id", "poke-id");
app.appendChild(pokeName);
app.appendChild(pokeImg);
app.appendChild(pokeID);

function updatePokemon(pokemon) {
  pokeName.textContent = pokemon.name.toUpperCase();
  pokeImg.setAttribute("src", pokemon.sprites.other.home.front_default);
  pokeID.textContent = "ID: " + pokemon.id;
}

function updatePage(page) {
  currentPage = page;
  numberPageElement.textContent = `Page: ${numberPage}`;
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
      numberPage += 1;
      updatePage(page.next);
    }
  });
}

function previousPage() {
  apiFetch(currentPage).then(page => {
    if (page.previous) {
      numberPage -= 1;
      updatePage(page.previous);
    }
  });
}
