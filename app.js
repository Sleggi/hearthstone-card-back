let cards = document.getElementById('cards');
let modal = document.querySelector('.modal');
let input = document.getElementById('searchInput');

const arrayOfCards = [];
console.log(arrayOfCards)

const fetchCard = () => {
    fetch("https://omgvamp-hearthstone-v1.p.rapidapi.com/cardbacks?locale=ruRU", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
                "x-rapidapi-key": "27af78f9camshb077c199e031a25p106f22jsn17014931efa0"
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return cards.innerHTML = '404 Error'
            }
        })
        .then((data) => {

            for (let i = 0; i < 53; i++) {

                arrayOfCards.push(deckBack = {
                    name: data[i].name,
                    description: data[i].description,
                    howToGet: data[i].howToGet,
                    image: data[i].imgAnimated,
                    id: i


                })

            }
            displayCards(arrayOfCards)


        })

}



const displayCards = (arrayOfCards) => {
    const cardString = arrayOfCards.map((card) =>

        `<li class='card' onclick='showModal(${card.id})'>
       <img class='card-image' src="${card.image}" onError="this.src='./images/onError.png'"/>
    </li>
   `
    ).join('')

    cards.innerHTML = cardString

}


const moreInfo = (id) => {
    if (id !== 0) {
        const cardStringInfo =

            `       
            <div class='modal-content'>
            <div class='button' onclick='deleted()'>✕</div>
           <img class='card-image-info' src="${arrayOfCards[id].image}" onError="this.src='./images/onError.png'"/>
           <div class='right-side'>
               <h1>${arrayOfCards[id].name}</h1>
               <p class='desc'><span style='color:gold'>Описание:</span> ${arrayOfCards[id].description}</p>
               <p class='howto'><span style='color:gold'>Как получить:</span> ${arrayOfCards[id].howToGet}</p>
           </div>
           </div>
        
       `

        modal.innerHTML = cardStringInfo;

    } else {
        const cardString0 =
            `       
            <div class='modal-content'>
        <div class='button' onclick='deleted()'>✕</div>
        <img class='card-image-info' src="${arrayOfCards[id].image}" onError="this.src='./images/onError.png'"/>
        <div class='right-side'>
            <h1>${arrayOfCards[id].name}</h1>
            <p class='desc'><span style='color:gold'>Описание:</span> ${arrayOfCards[id].description}</p>
            <p class='howto'>Стандартная рубашка</p>
        </div>
        </div>
     
    `
        modal.innerHTML = cardString0
    }

}

const showModal = (id) => {
    moreInfo(id)
    modal.classList.add('show-modal')

}

const deleted = () => {
    modal.classList.remove('show-modal')
}

// SEARCH FUNCTIONS 


input.addEventListener('input', (event) => {
    let value = event.target.value

    if (value && value.trim().length > 0) {
        value = value.trim().toUpperCase()


        displayCards(arrayOfCards.filter(card => {
            return card.name.toUpperCase().includes(value)
        }));
    } else if (value.trim().length === 0) {
        displayCards(arrayOfCards)
    }
})








fetchCard()