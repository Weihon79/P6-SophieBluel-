// Gérer l'ouverture et la fermeture des modales
export let modal1 = null;
export let modal2 = null;

/**
 * Ouvrir une modale spécifique
 */
export const openSpecificModal = function (modal) {
  if (!modal) return;
  modal.style.display = "flex";  // Assurez-vous que la modale s'affiche en définissant 'block'
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);

  if (modal.id === "modal1") modal1 = modal;
  if (modal.id === "modal2") modal2 = modal;
};

/**
 * Fermer une modale
 */
export const closeModal = function (e) {
  e.preventDefault();
  
  const closeSpecificModal = (modal) => {
    if (!modal) return;
    modal.style.display = "none";  // Masquer la modale
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
  };

  closeSpecificModal(modal1);
  closeSpecificModal(modal2);

  modal1 = null;
  modal2 = null;
};

/**
 * Stopper la propagation
 */
export const stopPropagation = function (e) {
  e.stopPropagation();
};

/**
 * Ouvrir la première modale
 */
export const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute("href"));
  openSpecificModal(target);
};

/**
 * Ouvrir la deuxième modale
 */
export const openModal2 = function (e) {
  e.preventDefault();
  closeModal(e); // Ferme la modale précédente
  const target = document.querySelector("#modal2");
  openSpecificModal(target);
};

/**
 * Revenir à la première modale
 */
export const backToModal1 = function (e) {
  e.preventDefault();
  closeModal(e); // Ferme la modale précédente
  const target = document.querySelector("#modal1");
  openSpecificModal(target);
};

/**
 * Initialisation des événements pour les modales
 */
export function initModalEvents() {
  // Ajoutons des vérifications pour nous assurer que les éléments existent
  const editLink = document.querySelector(".edit-link");
  if (editLink) {
    editLink.addEventListener("click", openModal);
  } else {
    console.error("Élément .edit-link non trouvé !");
  }

  const addButton = document.getElementById("js-addButton");
  if (addButton) {
    addButton.addEventListener("click", openModal2);
  } else {
    console.error("Élément #js-addButton non trouvé !");
  }

  const backButton = document.querySelector(".js-modal-back");
  if (backButton) {
    backButton.addEventListener("click", backToModal1);
  } else {
    console.error("Élément .js-modal-back non trouvé !");
  }
}
