cards = document.getElementById('cards');
const arrayOfCards = [];
const image2 = document.createElement('img');
image2.src = 'https://i.pinimg.com/originals/e6/14/70/e61470cdba3f919bbefcbb4fc9b96a57.png'

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

            for (let i = 0; i < data.length; i++) {

                arrayOfCards.push(deckBack = {
                    name: data[i].name,
                    description: data[i].description,
                    howToGet: data[i].howToGet,
                    image: data[i].imgAnimated,


                })

            }

            displayCards(arrayOfCards)
        })

}




const displayCards = (arrayOfCards) => {
    const cardString = arrayOfCards.map((card) =>

        `<li class='card'>
       <img class='card-image' src="${card.image}" onError="this.src='https://d15f34w2p8l1cc.cloudfront.net/hearthstone/d835067892840acd343eac4626e339e6555d38c71aee7ee6ee77a5ce588fd438.png'"/>
    </li>
   `
    ).join('')

    cards.innerHTML = cardString

}


fetchCard();