// Get references to DOM elements
const button = document.getElementById("test-button");
const div = document.getElementById("test-div");

// Handler function that logs which element was clicked
const handleThingClicked = (thing) => {
    console.log(thing)
}

// Add click event listeners to both elements
// When clicked, they will call handleThingClicked with a descriptive message
button.addEventListener("click", ()=>handleThingClicked('button clicked'));
div.addEventListener("click", ()=>handleThingClicked('div clicked'));



// test commit