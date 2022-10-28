const containerPkm = document.querySelector('[data-containerPkm]')
const pokeFoto = (idPkm) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPkm}.png`

export function inserirPkm(listaPkm , sobrescrever) {

    ordenarPorId(listaPkm)

    //criação de card para cada pkm
    const cardPkms = listaPkm.reduce((acc, pkm) => {
        //desconstruction de pkm
        const { name, id, types } = pkm

        //recebendo todos os tipos do pokemon
        const typesPkm = types.map(typeIndividual => {
            return `<li class="type_pkm ${typeIndividual.type.name} "> ${letraMaiscula(typeIndividual.type.name)} </li>`
        })


        acc += `
            <ul class="card">
                <img src="${pokeFoto(id)}" class="foto_pkm_img">
                <span class="circulo-pkm ${types[0].type.name}"></span>
                <div class="dados_pkm">
                    <li class="id_pkm fonteID ${(types[0].type.name + 'ID')}">#${id}</li>
                    <li class="nome_pkm">${formataNome(name)}</li>
                    ${typesPkm}
                </div>
            </ul>
        `
        return acc.replace(/,/g, '')
    }, '')

    //adicionando o card pokemon ao container.
    //sobrescrever ficará true quando tivermos que pesquisar algum pokemon, caso queiramos apenas adicionar, ele será false.
    sobrescrever ? containerPkm.innerHTML = cardPkms :containerPkm.innerHTML += cardPkms

}

/* ---------------------------- */

//Retirando as identificações MACHO e FEMEA dos Nidorans 
function formataNome(nome) {
    if (nome.includes('nidoran-f')) nome = 'nidoran &#9792;'
    if (nome.includes('nidoran-m')) nome = 'nidoran &#9794;'
    return letraMaiscula(nome.replace(/-/g, ' '))
}

function letraMaiscula(texto) {
    const novoTexto = texto[0].toUpperCase() + texto.substring(1)
    return novoTexto
}


/* ---------------------------- */

function ordenarPorId(lista) {
    lista.sort((a, b) => {
        if (a.id < b.id) return -1

    })
    return lista
}