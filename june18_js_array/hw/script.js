document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const cardsContainer = document.getElementById("cards-container");

  searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    fetchData(query);
  });
    
  function fetchData(query = "") {
    const apiUrl = query
      ? `https://dummyjson.com/products/search?q=${query}`
      : "https://dummyjson.com/products";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        clearCards();
        displayCards(data.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function clearCards() {
    cardsContainer.innerHTML = "";
  }

  function displayCards(products) {
    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const cardTitle = document.createElement("h2");
      cardTitle.textContent = product.title;

      const cardImage = document.createElement("img");
      cardImage.src = product.thumbnail;

      const cardDescription = document.createElement("p");
      cardDescription.textContent = product.description;

      const cardPrice = document.createElement("p");
      cardPrice.textContent = `Price: $${product.price}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        cardsContainer.removeChild(card);
      });

      card.appendChild(cardTitle);
      card.appendChild(cardImage);
      card.appendChild(cardDescription);
      card.appendChild(cardPrice);
      card.appendChild(removeButton);

      cardsContainer.appendChild(card);
    });
  }
  fetchData();
});
