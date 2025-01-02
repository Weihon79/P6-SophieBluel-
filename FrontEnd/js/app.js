// app.js
import { getWorks, getCategories } from './api.js';
import { editMode } from './editMode.js';
import { initModalEvents } from './modal.js';
import { displayGallery, displayGalleryInModal } from './gallery.js';
import { displayFilters } from './filters.js';
import { toggleLoginLogout } from './auth.js';
import { populateCategories } from './categoriesSelect.js'; 
/*--------------------------------------------------------------------------------*/

// Initialisation de l'application
async function initializeApp() {
  try {
    const worksData = await getWorks();
    console.log("Works Data:", worksData);

    const categoriesData = await getCategories();
    console.log("Categories Data:", categoriesData);

    getWorks();
    displayGallery(worksData);
    displayGalleryInModal(worksData);
    displayFilters(categoriesData, worksData);
    populateCategories();
    editMode();
    initModalEvents();
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error.message);
  }
}

// Appel au chargement de la page
window.addEventListener("load", initializeApp);
window.addEventListener('load', toggleLoginLogout);
