import pokemonArray from "./data/pokemon.js";

const nameFilter    = document.querySelector("input#nameFilter")
const typeFilter    = document.querySelector("select#typeFilter")
const idSTFilter    = document.querySelector("input#idFilterStart")
const idSPFilter    = document.querySelector("input#idFilterStop")

const resultFilterST= document.querySelector("input#card__id--resultStart")
const resultFilterSP= document.querySelector("input#card__id--resultStop")

const mainContainer = document.querySelector(".card-container");
const inputTrigger  = document.querySelector(".card__filtering");


/**
 * capitalises the first char of a string. Used to capitalsie pokemon names.
 * @param {string} noun 
 * @returns string
 */
const properNoun = (noun) => {
    return [noun.slice(0, 1).toUpperCase(), ...noun.slice(1)].join("");
}

/**
 * takes a pokeObject and adds it to the page as a card.
 * @param pokeObject 
 * @returns void
 */
const cardObject = (pokeObject) => {
    return `
<div class="card">
    <img class="card__image" src="${pokeObject["sprite"]}">
    <div class="card__content">
        <h1 class="card__heading">${properNoun(pokeObject["name"])}</h1>
        <p class="card__text">${properNoun(pokeObject["name"])}(#${pokeObject["id"]}) is a ${pokeObject["types"].join(" & ")} type pokemon.</p>
    </div>
</div>`
}

const pokemonFilter = () => {
    return pokemonArray.filter((pokemon) => {
        if ((((idSTFilter.value) / 1) <= pokemon["id"]) &
            (pokemon["id"] <= ((idSPFilter.value) / 1)) &
            (pokemon["name"].includes(nameFilter.value.toLowerCase())) &
            ((pokemon["types"].includes(typeFilter.value) | (typeFilter.value === "None")))
        ) {
                return true;
        } else {
            return false
        }
    })
}


const pokemonTypes = () => {
    let pokemonTypeList = [];
    pokemonArray.forEach((pokemon) => {
        pokemon["types"].forEach((type) => {
            if (! pokemonTypeList.includes(type)) {
                pokemonTypeList.push(type)
            }
        })
    })
    let result = `
    <option value="None" selected>None</option>`;
    pokemonTypeList.forEach((type) => {
        result += `
<option value="${type}">${properNoun(type)}</option>`
    })
    return result
}


const mainCallback = (event) => {
    event.preventDefault()

    mainContainer.innerHTML = ""
    pokemonFilter().slice(resultFilterST.value /1, (resultFilterSP.value /1)).forEach(pokemon => {
        mainContainer.insertAdjacentHTML("beforeend", cardObject(pokemon));
});

}

typeFilter.innerHTML = pokemonTypes();

inputTrigger.addEventListener("submit", mainCallback)