const url = `https://pokeapi.co/api/v2/pokemon/`;

const getPokeList = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

const renderPokeList = (pokeArr) => {
  const main = document.querySelector(`main`);
  main.innerHTML = ``;

  const h1 = document.createElement(`h1`);
  h1.innerHTML = `Pok&egrave;dex`;
  main.appendChild(h1);

  const ul = document.createElement(`ul`);
  const pokeNames = pokeArr
    .map((singlePoke) => {
      return `<li><a href="" data-pokeurl="${url}${singlePoke.name}">${singlePoke.name}</a></li>`;
    })
    .join(``);
  ul.innerHTML = pokeNames;
  main.appendChild(ul);
};

const init = async () => {
  const pokeData = await getPokeList();
  renderPokeList(pokeData);
  pokeAddListeners();
};

const pokeAddListeners = () => {
  const allAs = document.querySelectorAll(`a`);
  allAs.forEach((pokeEl) => {
    pokeEl.addEventListener(`click`, async (e) => {
      e.preventDefault();
      const pokeName = e.target.dataset.pokeurl;
      const pokeData = await getSinglePoke(pokeName);
      renderSinglePoke(pokeData);
    });
  });
};

init();

//
const getSinglePoke = async (pokeURL) => {
  const res = await fetch(pokeURL);
  const data = await res.json();
  return data;
};

const renderSinglePoke = (pokeData) => {
  const main = document.querySelector(`main`);
  main.innerHTML = ``;

  const h1 = document.createElement(`h1`);
  h1.innerText = pokeData.name;
  main.appendChild(h1);

  const img = document.createElement(`img`);
  img.setAttribute(`src`, pokeData.sprites.front_default);
  img.setAttribute(`alt`, `Poke Image not Found`);
  main.appendChild(img);

  const button = document.createElement(`button`);
  button.addEventListener(`click`, init);
  button.innerText = `Back to Pokedex`;
  main.appendChild(button);

  const pre = document.createElement(`pre`);
  pre.innerText = JSON.stringify(pokeData, null, 2);
  main.appendChild(pre);
};
