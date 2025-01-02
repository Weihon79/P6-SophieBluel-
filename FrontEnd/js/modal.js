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

/*-------------------------------------------------------------------------------*/

const imageInput = document.getElementById("imageInput");
const dropZone = document.getElementById("dropZone");
const imagePreview = document.createElement("img"); // Prévisualisation de l'image

// Événements pour la zone de dépôt
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault(); // Empêcher le comportement par défaut du navigateur
  dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("drag-over");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    imageInput.files = e.dataTransfer.files;
    displayImagePreview(file); // Afficher la prévisualisation de l'image
  }
});

// Ouvrir l'explorateur de fichiers quand on clique sur le bouton
document.getElementById("addPhotoButton").addEventListener("click", () => {
  imageInput.click();
});

// Afficher la prévisualisation de l'image après sélection
imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    displayImagePreview(file);
  }
});

// Fonction pour afficher la prévisualisation de l'image
function displayImagePreview(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.src = e.target.result;
    imagePreview.alt = "Prévisualisation de l'image";
    imagePreview.style.maxWidth = "100%"; // Limiter la taille de l'image pour la prévisualisation
    imagePreview.style.marginTop = "10px";

    dropZone.innerHTML = ""; // Réinitialiser la zone de dépôt
    dropZone.appendChild(imagePreview); // Ajouter l'image prévisualisée
  };
  reader.readAsDataURL(file);
}

/*----------------------------------------------------------------------------*/

const form = document.getElementById("projectForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Empêcher l'envoi du formulaire par défaut

  const title = document.getElementById("title").value;
  const category = document.getElementById("categorySelect").value;
  const image = imageInput.files[0]; // Vérifier si une image a été ajoutée

  // Vérification des champs
  if (!title || !category || !image) {
    alert("Tous les champs doivent être remplis, y compris l'image.");
    return;
  }

  // Créer un objet pour envoyer à l'API
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);

  // Envoi des données au backend
  try {
    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`, // Ajouter le token pour l'authentification
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Échec de l'envoi du projet");
    }

    const result = await response.json();
    console.log("Projet ajouté avec succès :", result);

    // Fermer la modale et réinitialiser le formulaire
    form.reset();
    dropZone.innerHTML = ''; // Supprimer la prévisualisation de l'image

    // Optionnel : Rafraîchir la galerie des projets ou les récupérer pour l'afficher
    // Vous pouvez aussi ici mettre à jour le DOM avec le nouveau projet ajouté si nécessaire
  } catch (error) {
    alert("Erreur lors de l'ajout du projet : " + error.message);
  }
});
