let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyCollectionDiv = document.querySelector('#toy-collection');


  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then((data) => {
   const arrayOfToyObjects = data

    arrayOfToyObjects.map(
     (eachToyObj) => {
       const divForToyCard = document.createElement('div')
        divForToyCard.className = 'card'

       const h2ForToyCard = document.createElement('h2')
       h2ForToyCard.textContent = eachToyObj.name

       const imageForToyCard = document.createElement('img')
       imageForToyCard.src = eachToyObj.image
       imageForToyCard.className = 'toy-avatar'

       const pTagForCard = document.createElement('p')
       pTagForCard.textContent = `${eachToyObj.likes} likes`

       const buttonForToyCard = document.createElement('button')
       buttonForToyCard.innerText = 'Like ❤️'
       buttonForToyCard.className = 'like-btn' 
       buttonForToyCard.id = eachToyObj.id
       buttonForToyCard.addEventListener('click', (eventObj) => {
          pTagForCard.textContent = `${eachToyObj.likes++} likes`
        })

       divForToyCard.append(
          h2ForToyCard,
          imageForToyCard,
          pTagForCard,
          buttonForToyCard
       )

       toyCollectionDiv.append(divForToyCard)

     }
   )

    const formForNewToy = document.querySelector('.add-toy-form')
   
    formForNewToy.addEventListener('submit', (eventObj) => {
      eventObj.preventDefault()
      const defaultObjFormat = {
        'id': 0,
        'name': eventObj.target.name.value,
        'image': eventObj.target.image.value,
        'likes': 0
      }
     fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(defaultObjFormat)
     })
     .then(response => response.json())
     .then(obj => console.log(obj))


      console.log('eventObj.target.name.value', eventObj.target.name.value)
      console.log('eventObj.target.image.value', eventObj.target.image.value)
   })

  })
  
});
