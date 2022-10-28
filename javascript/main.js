import { inserirPkm } from "./modulos/inserirPkm";
import { pesquisarPkm } from "./modulos/pesquisarPkm.js";
import { formularioPkm } from "./modulos/formularioPkm.js";

//configurando os links para requistar
const containerCarregar = document.querySelector('[data-carregamento]')
const pokeApi = (idPkm) => `https://pokeapi.co/api/v2/pokemon/${idPkm}`
const pokeArray = []

// Requisitando o pokemon e transfomando em json
async function fetchPkm(idPkm) {
    const pkmPromise = await fetch(pokeApi(idPkm))
    const pkm = await pkmPromise.json()
    return pkm
}

/* ----------------------------- */

//Requisitando todos os 151 pokemons e adicionando ao pokeArray
async function requisitaPkm() {
    for (let i = 1; i <= 151; i++) {
        const pkm = await fetchPkm(i)
        pokeArray.push(pkm)
    }
}

/* ----------------------------- */

//O programa irá aguardar todas as Promises serem resolvidas para que possa dar inicio do mesmo.
await requisitaPkm()
inserirPkm(pokeArray, true)
//Desativando a animação de Loading 
containerCarregar.classList.add('desativado')

/* ----------------------------- */

pesquisarPkm(pokeArray)

/* ----------------------------- */
//configurando todos os eventos do formulario
formularioPkm()
