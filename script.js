const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')

const form = document.querySelector('.form')
const input = document.querySelector('.buscar')
const btnNext = document.querySelector('.btn-next')
const btnPrev = document.querySelector('.btn-prev')

let pokemoAtual = 25

async function fetchPokemon(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    const response = await fetch(url)
    if (response.status === 200){
        const data = await response.json()
        return data
    }
}

async function renderPokemon(data){
    pokemonName.innerText = 'Carregando...'
    pokemonNumber.innerText = ''

    const pokemon = await fetchPokemon(data)
    if (pokemon){
        pokemonImage.style.display = 'block'
        pokemonName.innerText = pokemon.name
        pokemonNumber.innerText = pokemon.id
        pokemonImage.src = pokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        pokemoAtual = pokemon.id
    }

    else {
        pokemonImage.style.display = 'nome'
        pokemonName.innerText = 'Não encontrado :c'
        pokemonNumber.innerText = ''
    }


}
form.addEventListener('submit', (e) =>{
    e.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

btnNext.addEventListener('click', () =>{
    pokemoAtual++
    renderPokemon(pokemoAtual)
})

btnPrev.addEventListener('click', () =>{
    if (pokemoAtual > 1){
        pokemoAtual --
        renderPokemon(pokemoAtual)
    }
})



renderPokemon(pokemoAtual)