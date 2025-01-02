import { getCategories } from './api.js';

/**
 * Fonction pour remplir un <select> avec des catégories.
 * Cette fonction va récupérer les catégories via l'API et les ajouter dans le <select> correspondant.
 */
export async function populateCategories() {
  const categories = await getCategories();
  const categorySelect = document.querySelector("#categorySelect");
  
  categorySelect.innerHTML = '';
  
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}
