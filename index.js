const dataTemplate = document.querySelector('[data-template]');
const dataUserCards = document.querySelector('[data-user-cards]');
const dataSearch = document.querySelector('[data-search]');



let users = [];

dataSearch.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    users.forEach((user) => {
       const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
       user.element.classList.toggle('hide', !isVisible)
    })
})


const url = 'https://jsonplaceholder.typicode.com/users'

async function loadData() {
    try {
        const response = await fetch(url)
        const data = await response.json()
      
        users = data.map(user => {
            const card = dataTemplate.content.firstElementChild.cloneNode(true);
            const name = card.querySelector('[data-name]');
            const body =  card.querySelector('[data-body]');
            name.textContent = user.name;
            body.textContent = user.email;
            dataUserCards.appendChild(card);
            return {
                name: user.name, email: user.email, element: card
            }
        });
    } catch(e) {
        console.log(`Somethin went wrong: ${e.message}`)
    }
};


loadData();
  

