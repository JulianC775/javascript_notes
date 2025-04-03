const deleteButton = document.getElementById('delete_button')


const handleDeleteBear = async () => {
   theBear = document.getElementById('bear')

   if(!theBear) {
    console.log('No bear to delete')
    return
   } 

   theBear.classList.add('bear-disappearing-animation')
   
   setTimeout(() => {
    theBear.classList.remove('bear-disappearing-animation')
   }, 2500)
   

   
    const image = await fetch('https://picsum.photos/200/300')
    theBear.innerHTML = `<img src="${image.url}" alt="Bear">`
}

deleteButton.addEventListener('click', handleDeleteBear)


