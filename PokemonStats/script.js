'use strict';

const pokeName = document.querySelector('.pokemon__name');
const pokeHP = document.querySelector('.pokemon__hp');
const pokeImg = document.querySelector('.pokemon_img');
const pokeInfo = document.querySelector('.pokemon__stats');

const types = {
  fire: '🔥',
  water: '💧',
  normal: '😐',
  grass: '🌿',
  electric: '⚡',
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getPokemonStat = async function (idOrName) {
  try {
    const respons = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${idOrName}`
    );
    const stats = await respons.json();
    console.log(stats);

    //Name
    pokeName.textContent = capitalizeFirstLetter(stats.name);

    //HP and Type
    const type = capitalizeFirstLetter(stats.types[0].type.name);
    pokeHP.textContent = `${stats.stats[0].base_stat}HP ${types.fire}`;

    //image
    const imgSrc = stats.sprites.front_default;
    pokeImg.src = imgSrc;

    //Pokemon Info
    const height = stats.height;
    const weight = stats.weight;
    pokeInfo.textContent = `${type} Pokemon. Length: ${height}", Weight: ${weight}lbs.`;

    //Catch
  } catch (err) {
    console.log(`Error in getPokemonStat:: ${err}`);
  }
};

getPokemonStat('charizard');

const getPokemonStat2 = async function (idOrName) {
  try {
    const respons = await fetch(`https://pokeapi.co/api/v2/stat/${idOrName}`);
    const stats = await respons.json();
    console.log(stats);
    //Catch
  } catch (err) {
    console.log(`Error in getPokemonStat:: ${err}`);
  }
};

// getPokemonStat2(6);
