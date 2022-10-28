import { inserirPkm } from "./modulos/inserirPkm.js";


const formularioPkm = document.querySelector('[data-formPkm]')
const barraPesquisa = formularioPkm.querySelector('[data-campo]')
const btnType = formularioPkm.querySelectorAll('[data-btnType]')
const checkType = formularioPkm.querySelectorAll('[data-checkType]')

//Evitando com que o formulario seja enviado
export function pesquisarPkm(pokeArray) {
    formularioPkm.addEventListener('submit', e => e.preventDefault())
    formularioPkm.addEventListener('input', () => {

        const novoPokeArray = verificaTipoSelecionado(pokeArray)

        //passando todo o valor da barra de pesquisa, já tirando todos espaços desnecessarios
        const barraPesquisaValor = barraPesquisa.value.trim()

        //caso vazia a searchbar, ela retorna os 151 pokemons e reseta pkmEncontradosArray
        if (barraPesquisaValor == '') return inserirPkm(novoPokeArray, true)

        //caso consiga converter o valor em numero, o usuario está buscando por ID
        if (parseInt(barraPesquisaValor) >= 0) return procurarPkmNId(parseInt(barraPesquisaValor), novoPokeArray)

        //caso nao seja nenhuma das anteriores, o valor inserido é um TEXTO
        return procurarPkmNome(barraPesquisaValor.toLowerCase(), novoPokeArray)


    })
}

/* ----------------------------- */


function verificaTipoSelecionado(pokeArray) {
    const typeSelecionado = []
    for (let i = 0; i < checkType.length; i++) {
        //Procura por todas as checkbox ativas
        if (checkType[i].checked) {
            //caso a condição for true, o texto da devida label é obtida, sabendo assim o tipo selecionado
            typeSelecionado.push(btnType[i].textContent.toLowerCase())
        }
    }

    //caso o usuario nao selecionou nenhum elemento, a lista de pokemons volta inalterada, caso contrario ela passa por um filtro
    return typeSelecionado.length == 0 ? pokeArray : filtarPokemons(typeSelecionado, pokeArray)
}

function filtarPokemons(tipoSelecionado, pokeArray) {

    //A procura vai ser por type indivualmente,fazendo assim nós repetirmos esse laço até o fim de nossos tipoSelecionado
    for (const typeIndividual of tipoSelecionado) {
        /*todo inicio do laço os pokemons encontrados serão resetados, 
        sem ele o programa iria printar todos os pokemons com os tipos INDIVIDUAIS informados
        --Exemplo--
        Tipos selecionados foram: FIRE e FLYING
        Charizard e Moltres possuem FIRE e FLYING
        sem esse reset, o programa irá printar TODOS os PKMs que possuem FIRE e todos
        os PKMs que possuem FLYING
        */
        let pkmEncontrados = []

        pokeArray.filter(pkm => {
            pkm.types.filter(typePkm => {
                if (typePkm.type.name.includes(typeIndividual)) pkmEncontrados.push(pkm) //caso possua o type, adiciona no array
            })
        })

        //Aqui é alterado o array com os 151 pkms, para que agora a busca seja feita SOMENTE no primeiro type já filtrado.
        pokeArray = pkmEncontrados
    }

    //ao sair do laço teremos todos os pkms que atendem aos types que o usuario selecionou

    return pokeArray
}

/* ----------------------------- */

function procurarPkmNome(name, pokeArray) {
    const pkmEncontrados = []

    pokeArray.filter(pkm => {
        if (pkm.name.includes(name)) pkmEncontrados.push(pkm)
    })
    inserirPkm(pkmEncontrados, true)
}

function procurarPkmNId(idPkm, pokeArray) {
    const pkmEncontrados = []
    //transformar o valor buscado e o Id do Pokemon em STRING para que o INCLUDES possa funcionar.
    idPkm = idPkm.toString()

    pokeArray.filter(pkm => {
        const pokemonId = pkm.id.toString()
        if (pokemonId.includes(idPkm)) pkmEncontrados.push(pkm)
    })
    inserirPkm(pkmEncontrados, true)
}

