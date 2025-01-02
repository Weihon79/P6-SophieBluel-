// filters.js
import { displayGallery } from './gallery.js';

export function displayFilters(categories, worksData) {
    const filtersContainer = document.querySelector(".filters");
    filtersContainer.innerHTML = "";
  
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    allButton.addEventListener("click", () => {
      displayGallery(worksData);
      setActiveButton(allButton);
    });
    filtersContainer.appendChild(allButton);
    
    setActiveButton(allButton);
  
    categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.addEventListener("click", () => {
        console.log(`Filtrage pour la catégorie: ${category.name}`);
        const filteredData = worksData.filter(item => item.category.name === category.name);
        displayGallery(filteredData);
        setActiveButton(button);
      });
      filtersContainer.appendChild(button);
    });
}
  
export function setActiveButton(selectedButton) {
    const filtersContainer = document.querySelector(".filters");
    const allButtons = filtersContainer.querySelectorAll("button");
    allButtons.forEach(button => {
        button.classList.remove("active");
    });
    selectedButton.classList.add("active");
}
  