let cards = document.getElementById('cards');
let modal = document.querySelector('.modal');
let input = document.getElementById('searchInput');
let clear = document.querySelector('.clearButton');







// Getting the cards Array from the API 
const arrayOfCards = [];


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

            for (let i = 0; i < 51; i++) {

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

// Displaying the arrayofcards on the screen

const displayCards = (arrayOfCards) => {
    const cardString = arrayOfCards.map((card) =>

        `<li class='card' onclick='showModal(${card.id})'>
       <img class='card-image' src="${card.image}" onerror="this.style='visibility: hidden'"/>
    </li>
   `
    ).join('')

    cards.innerHTML = cardString

}

//Creating the moreInfo function for displaying more information in modal window onclick

const moreInfo = (id) => {
    if (id !== 0) {
        const cardStringInfo =

            `       
            <div class='modal-content'>
            <div class='button' onclick='deleted()'>✕</div>
           <img class='card-image-info' src="${arrayOfCards[id].image}" onerror="this.src='./images/onError.png'"/>
           <div class='right-side'>
               <h1>${arrayOfCards[id].name}</h1>
               <p class='desc'><span style='color:gold'>Описание:</span> ${arrayOfCards[id].description}</p>
               <p class='howto'><span style='color:gold'>Как получить:</span> ${arrayOfCards[id].howToGet}</p>
           </div>
           </div>
        
       `

        modal.innerHTML = cardStringInfo; // setting the modal window inner html to display more information

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

// Functions for showing and removing modal info 
const showModal = (id) => {
    moreInfo(id)
    modal.classList.add('show-modal')

}

const deleted = () => {
    modal.classList.remove('show-modal')
}

// SEARCH FUNCTIONS 

// clear the input onclick
function clearInput() {
    clear.classList.remove('clean')
    input.value = '';
    displayCards(arrayOfCards)
}


input.addEventListener('input', (event) => {


    let value = event.target.value


    if (value && value.trim().length > 0) {
        clear.classList.add('clean')
        value = value.trim().toUpperCase()


        displayCards(arrayOfCards.filter(card => {
            return card.name.toUpperCase().includes(value)
        }));
    } else if (value.trim().length === 0 && value === '') {

        displayCards(arrayOfCards)
    }
})

// Making registration form appears like modal window 
const registrationForm = () => {

    document.querySelector('.reg-modal').classList.add('reg-modal-visible')
}


// Making registration form be able to close

function regModalClose() {
    document.querySelector('.reg-modal').classList.remove('reg-modal-visible')
}


//  Getting form elements
let form = document.getElementById('form');
let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');
let submit = document.getElementById('submit')



form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
})

function checkInputs() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === '') {

        setErrorFor(username, 'Имя пользователя не может быть пустым')
    } else if (!isUserName(usernameValue)) {
        setErrorFor(username, 'Некорректное имя пользователя')
    } else {

        setSuccesFor(username);
    }

    if (emailValue === '') {
        setErrorFor(email, 'Email не может быть пустым')

    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'Укажите существующий email')
    } else {
        setSuccesFor(email);
    }

    if (passwordValue === '') {
        setErrorFor(password, 'Пороль не может быть пустым')
    } else if (passwordValue.length < 6) {
        setErrorFor(password, 'Пароль должен содержать не менее 6-ти символов')
    } else {
        setSuccesFor(password)
    }

    if (password2Value === '') {
        setErrorFor(password2, 'Пароли не совпадают')
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, 'Пароли не совпадают')
    } else {
        setSuccesFor(password2)
    }

}


function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // add error style
    formControl.className = 'form-control error'
    // add error message inside the small tag
    small.innerText = message;
}


function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success'
}



function isEmail(email) {
    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)
}

function isUserName(username) {
    return /^(?=.{4,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)
}

fetchCard()