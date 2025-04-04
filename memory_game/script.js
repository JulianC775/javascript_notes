const button = document.getElementById("test-button");
const div = document.getElementById("test-div");

const handleThingClicked = (thing) => {
    console.log(thing)
}

button.addEventListener("click", ()=>handleThingClicked('button clicked'));
div.addEventListener("click", ()=>handleThingClicked('div clicked'));



