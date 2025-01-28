// List to store coffee syrup flavors
let flavorList = [];

// Function to render the flavor list
function renderFlavorList() {
  const flavorListElement = document.getElementById("flavorList");
  flavorListElement.innerHTML = ""; // Clear the list before re-rendering

  flavorList.forEach(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    flavorListElement.appendChild(listItem);
  });
}

// Function to add a new flavor to the list
function addFlavor() {
  const flavorInput = document.getElementById("flavor").value;

  if (flavorInput) {
    flavorList.push(flavorInput);
    renderFlavorList();
  } else {
    alert("Please enter a flavor.");
  }

  // Clear the input field after adding
  document.getElementById("flavor").value = "";
}

// Event listener for the "Add Flavor" button
document.getElementById("addButton").addEventListener("click", addFlavor);