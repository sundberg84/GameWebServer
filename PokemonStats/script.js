'use strict';

const pokeName = document.querySelector('.pokemon__name');
const pokeHP = document.querySelector('.pokemon__hp');
const pokeImg = document.querySelector('.pokemon_img');
const pokeInfo = document.querySelector('.pokemon__stats');
const attr1 = document.querySelector('#attr1');
const attr2 = document.querySelector('#attr2');
const attPP1 = document.querySelector('#attPP1');
const attPP2 = document.querySelector('#attPP2');
const attr1dmg = document.querySelector('#attr1dmg');
const attr2dmg = document.querySelector('#attr2dmg');
const pokeWeakness = document.querySelector('.pokemon__weak');
const searchTxt = document.querySelector('.searchTxt');
const searchGo = document.querySelector('.go');
const searchRandom = document.querySelector('.rnd');
const mainContainer = document.querySelector('.main');
const searchContainer = document.querySelector('.search');

const types = {
  fire: '🔥',
  water: '💧',
  normal: '😐',
  grass: '🌿',
  electric: '⚡',
  ice: '🧊',
  fighting: '⚔️',
  poison: '☠️',
  ground: '⛰️',
  flying: '✈️',
  psychic: '🔮',
  bug: '🐛',
  rock: '🤘',
  ghost: '👻',
  dark: '🕶️',
  dragon: '🐉',
  steel: '🔩',
  fairy: '🧚',
};
const weakness = {
  fire: '💧',
  water: '🔥',
  normal: '🔮',
  grass: '⚡',
  electric: '🕶️',
  ice: '🌿',
  fighting: '🐉',
  poison: '🕶️',
  ground: '✈️',
  flying: '🕶️',
  psychic: '✈️',
  bug: '☠️',
  rock: '🔩',
  ghost: '🔮',
  dark: '👻',
  dragon: '⚔️',
  steel: '🤘',
  fairy: '⚔️',
};
const energy = '⚙️';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getPokemonMove = async function (move1, move2) {
  try {
    let fetchURL = `https://pokeapi.co/api/v2/move/${move1}`;
    let fetchURL2 = `https://pokeapi.co/api/v2/move/${move2}`;

    const data = await Promise.all([fetch(fetchURL), fetch(fetchURL2)]);
    const moveData = await data[0].json();
    const moveData2 = await data[1].json();

    const moveObj = [];
    const moveObjData = {
      name: moveData.name,
      text: moveData.effect_entries[0].effect,
      textshort: moveData.effect_entries[0].short_effect,
      powerpoint: moveData.pp,
      damage: moveData.power,
    };
    moveObj.push(moveObjData);

    const moveObjData2 = {
      name: moveData2.name,
      text: moveData2.effect_entries[0].effect,
      textshort: moveData2.effect_entries[0].short_effect,
      powerpoint: moveData2.pp,
      damage: moveData2.power,
    };
    moveObj.push(moveObjData2);

    return moveObj;

    //Catch
  } catch (err) {
    console.log(`Error in getPokemonAbility:: ${err}`);
  }
};

const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max + 1 - min) + min);

const createPokemonAbilityHtml = async function (moveObj) {
  //Ability HTML
  const ability1Html = `<b>${capitalizeFirstLetter(moveObj.name)}</b> ${
    moveObj.textshort
  }`;
  return ability1Html;
};

const calcMovePPIcons = function (pp) {
  //Divide so it is 1 - 4 ⚙️

  let ppsIcon = '';
  let pps = Math.floor(pp / 10);
  if (pps === 0) pps = 1;
  if (pps > 4) pps = 4;
  for (let i = 0; i < pps; i++) {
    ppsIcon = ppsIcon + '⚙️ ';
  }
  return ppsIcon;
};

const renderPokemon = async function (stats) {
  //Name
  pokeName.textContent = capitalizeFirstLetter(stats.name);

  //HP and Type
  const type = capitalizeFirstLetter(stats.types[0].type.name);
  const typeIcon = type.toLowerCase();
  pokeHP.textContent = `${stats.stats[0].base_stat}HP ${types[typeIcon]}`;

  //image
  const imgSrc = stats.sprites.front_default;
  pokeImg.src = imgSrc;

  //Pokemon Info
  const height = stats.height * 10;
  const weight = stats.weight / 10;
  pokeInfo.textContent = `${type} Pokemon. Height: ${height}cm, Weight: ${weight}kg.`;

  //Abilities
  const moves = stats.moves;
  let randomMove = randomInt(0, moves.length - 1);
  let randomMove2 = randomInt(0, moves.length - 1);
  let moveObj = await getPokemonMove(randomMove, randomMove2);

  //Ability 1
  attr1.textContent = '';
  let ability1Html = await createPokemonAbilityHtml(moveObj[0]);
  attr1.insertAdjacentHTML('afterbegin', ability1Html);
  attPP1.insertAdjacentHTML(
    'afterbegin',
    calcMovePPIcons(moveObj[0].powerpoint)
  );
  attr1dmg.textContent = moveObj[0].damage;

  //Ability 2
  attr2.textContent = '';
  ability1Html = await createPokemonAbilityHtml(moveObj[1]);
  attr2.insertAdjacentHTML('afterbegin', ability1Html);
  attPP2.insertAdjacentHTML(
    'afterbegin',
    calcMovePPIcons(moveObj[1].powerpoint)
  );
  attr2dmg.textContent = moveObj[1].damage;

  //console.log(stats);

  ///////////////////////////////////////////////////////////////////////////////////////////
  //attr2.insertAdjacentHTML('afterbegin', calcMovePP(moves.powerpoint));

  //Weakness
  pokeWeakness.textContent = '';
  pokeWeakness.insertAdjacentHTML(
    'afterbegin',
    `<h6>weakness</h6> ${weakness[typeIcon]}`
  );
};

const getPokemonStat = async function (idOrName) {
  try {
    const respons = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${idOrName}`
    );
    const stats = await respons.json();
    searchContainer.style.display = 'none';
    mainContainer.classList.remove('hidden');
    renderPokemon(stats);

    //Catch
  } catch (err) {
    console.log(`Error in getPokemonStat:: ${err}`);
  }
};

searchRandom.addEventListener('click', function () {
  getPokemonStat(randomInt(0, 1150));
});

searchGo.addEventListener('click', function () {
  const text = searchTxt.value.toLowerCase();
  if (!text) return;
  getPokemonStat(text);
});

// const getPokemonStat2 = async function (idOrName) {
//   try {
//     const respons = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
//     const stats = await respons.json();
//     // console.log(stats);
//     return stats;
//     //Catch
//   } catch (err) {
//     console.log(`Error in getPokemonStat:: ${err}`);
//   }
// };

// (async function () {
//   try {
//     const returnInfo = await getPokemonStat2(2);
//     console.log(returnInfo);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// getPokemonStat2();
