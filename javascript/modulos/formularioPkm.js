
const mostrarMaisBtn = document.querySelector('[data-mostrarMais]')
const setaBtn = document.querySelector('[data-setaBtn]')
const containerTypes = document.querySelector('[data-containerTypes]')
const btnType = containerTypes.querySelectorAll('[data-btnType]')

export function formularioPkm() {
    mostrarTypes()
    alteraBtnCor()
}

function mostrarTypes() {

    mostrarMaisBtn.addEventListener('click', () => {
        //adicionando animação da seta inverter a direção
        setaBtn.classList.toggle('girarSeta')
        //alternando entre ativado / desativado
        containerTypes.classList.toggle('desativado')
        containerTypes.classList.toggle('ativado')
    })

}

function alteraBtnCor() {

    btnType.forEach(btnIndividual => {
        btnIndividual.addEventListener('click', () => {
            //Recebendo o valor de texto do Label
            const nomeType = btnIndividual.innerText.toLowerCase()

            //Alternando efeito de botao ativo
            btnIndividual.classList.toggle(nomeType)
        })
    })

}

