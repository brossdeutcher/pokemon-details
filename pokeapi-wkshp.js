const url = `https://pokeapi.co/api/v2/pokemon/`;

const getPokeList = async () => {
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
};

const renderPokeList = (pokeArr) => {
  const ul = document.querySelector(`ul`);
  const pokeNames = pokeArr
    .map((singlePoke) => {
      return `<li><a href="" data-pokeurl="${url}${singlePoke.name}">${singlePoke.name}</a></li>`;
    }).join(``);
  ul.innerHTML = pokeNames;
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
      const pokeName = e.target.innerText;
      const pokeData = await getSinglePoke(pokeName);
      renderSinglePoke(pokeData);
    });
  });
};

init();

//
const getSinglePoke = async (pokeName) => {
  const res = await fetch(url + pokeName);
  const data = await res.json();
  return data;
};

const renderSinglePoke = (pokeData) => {
  const pre = document.querySelector(`pre`);
  pre.innerText = JSON.stringify(pokeData, null, 2);
  document.querySelector(`h1`).innerText = pokeData.name;
};

getSinglePoke(`pikachu`);
