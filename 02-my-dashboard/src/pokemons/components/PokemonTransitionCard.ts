//Archivo no implementado

//Fuentes: https://codepen.io/hernan066/pen/gOGEjYv
//Fuentes: https://fc-rest.netlify.app/


function TransitionCard(){
    const cards = document.querySelectorAll('.cardPokemon')

    cards.forEach( card =>{
        const cardTop = card.getBoundingClientRect().top
        const cardHeigth = window.innerHeight
       // const scrollPosition = window.scrollY + window.innerHeight

        //if(cardTop < scrollPosition){
        if(cardTop <  cardHeigth){
            card.classList.add('active')
        }else {
            card.classList.remove('active')
        }

    })
}


export function ScrollTransition(){
    window.addEventListener('scroll', TransitionCard)
}


