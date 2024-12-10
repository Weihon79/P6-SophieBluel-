async function getWorks() {
    const url = "http://localhost:5678/api/works";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
  }
  
getWorks();


const galleryData = [
    { src: "assets/images/abajour-tahina.png", alt: "Abajour Tahina", caption: "Abajour Tahina", category: "Objets" },
    { src: "assets/images/appartement-paris-v.png", alt: "Appartement Paris V", caption: "Appartement Paris V", category: "Appartements" },
    { src: "assets/images/restaurant-sushisen-londres.png", alt: "Restaurant Sushisen - Londres", caption: "Restaurant Sushisen - Londres", category: "Hotel & Restaurants" },
    { src: "assets/images/la-balisiere.png", alt: "Villa “La Balisiere” - Port Louis", caption: "Villa “La Balisiere” - Port Louis", category: "Appartements" },
    { src: "assets/images/structures-thermopolis.png", alt: "Structures Thermopolis", caption: "Structures Thermopolis", category: "Objets" },
    { src: "assets/images/appartement-paris-x.png", alt: "Appartement Paris X", caption: "Appartement Paris X", category: "Appartements" },
    { src: "assets/images/le-coteau-cassis.png", alt: "Pavillon “Le coteau” - Cassis", caption: "Pavillon “Le coteau” - Cassis", category: "Appartements" },
    { src: "assets/images/villa-ferneze.png", alt: "Villa Ferneze - Isola d’Elba", caption: "Villa Ferneze - Isola d’Elba", category: "Appartements" },
    { src: "assets/images/appartement-paris-xviii.png", alt: "Appartement Paris XVIII", caption: "Appartement Paris XVIII", category: "Appartements" },
    { src: "assets/images/bar-lullaby-paris.png", alt: "Bar “Lullaby” - Paris", caption: "Bar “Lullaby” - Paris", category: "Hotel & Restaurants" },
    { src: "assets/images/hotel-first-arte-new-delhi.png", alt: "Hotel First Arte - New Delhi", caption: "Hotel First Arte - New Delhi", category: "Hotel & Restaurants" },
  ];
  
  const gallery = document.querySelector('.gallery');
  
  galleryData.forEach(data => {
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = data.src;
    img.alt = data.alt;

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = data.caption;
  
    gallery.appendChild(figure);
    figure.appendChild(img);
    figure.appendChild(figcaption);
  });
  
const categories = [...new Set(galleryData.map(item => item.category))];

const filtersContainer = document.querySelector(".filters")

const allButton = document.createElement("button");
allButton.textContent = "Tous";
allButton.addEventListener("click", () => displayGallery(galleryData));
filtersContainer.appendChild(allButton);

categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category
    button.addEventListener("click", () => {
        const filteredData = galleryData.filter(item => item.category === category);
        displayGallery(filteredData)
    });
    filtersContainer.appendChild(button);
});

function displayGallery(data) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    data.forEach(item => {
        const figure= document.createElement("figure");

        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = item.caption;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

displayGallery(galleryData);