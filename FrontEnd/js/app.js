/**RECUPERATION DES TRAVAUX WORKS VIA L API
 * CREATION DE "worksData" ET "categoriesData" CORRESPONDANT AU DONNEES RETURN PAR L API
 */
async function getWorks() {
  const url = "http://localhost:5678/api/works";
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
      }

      const worksData = await response.json();
      console.log("Works Data:", worksData);


      const categoriesData = await getCategories();


      displayGallery(worksData);


      displayFilters(categoriesData, worksData);

  } catch (error) {
      console.error(error.message);
  }
}


async function getCategories() {
  const url = "http://localhost:5678/api/categories";
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
      }

      const categoriesData = await response.json();
      console.log("Categories Data:", categoriesData);
      return categoriesData;
  } catch (error) {
      console.error(error.message);
  }
}
/*--------------------------------------------------------------------------------*/

/**CREATION DE LA FONCTION "displayGallery" PRENNANT COMME OBJET "data"
 * RECUPERATION DE LA CLASSE ".gallery" SOUS LA CONSTANTE "gallery"
 * VIDAGE DU CONTENU HTML DE "gallery" PERMET UN NETTOYAGE, MEILLEUR PERF ET SECURITE
 * POUR CHAQUE ELEMENT INDIVIDUEL DE DATA (item)
 * ON CREERA UNE BALISE "figure", "img", et "figcaption"
 * CONTENANT EUX MEME LEURS ATRIBUTS ET TEXT CORRESPONDANTS AUX VALEURS DES ELEMENTS
 * PUIS AJOUTONS LES ENFANTS "img" "figcaption" et "figure" A LEURS PARENTS RESPECTIFS
 */
function displayGallery(data) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";

  data.forEach(item => {
      const figure = document.createElement("figure");

      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title;

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = item.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
  });
}
/*-------------------------------------------------------------------------------*/

/**CREATION DE LA FONCTION "displayFilters" PRENNANT COMME PARAMETRES "categories, worksData"
 * RECUPERATION DE LA CLASSE ".filters" SOUS VARIABLE DECLAREE "filtersContainer"
 * VIDAGE DU HTML ""
 * CREATION D ELEMENTS "button" AVEC EVENTLISTENER APPELANT LA FONCTION "displayGallery",
 * ET "setActiveButton" POUR AJOUTER LA CLASSE ACTIVE AU BOUTON CLIQUE
 * AJOUT DE L ENFANT "allButton" DANS LE DOM
 * BOUTON "Tous" PASSE EN FOCUS AUTOMATIQUEMENT AU CHARGEMENT DE LA PAGE
 */
 /*DANS LES DONNEES "categories" POUR CHAQUE OBJETS IL Y AURA :
 * CREATION D UN ELEMENT BUTTON, AVEC UN TEXTE CORRESPONDANT AU NAME DE LA DATA,
 * EVENEMENT DE "button" AU CLIQUE QUI UTILISE LA FONCTION ".filter",
 * AYANT POUR CONDITION D AVOIR LE MEME "category.name" POUR CHAQUE OBJET DANS LE TABLEAU WORK
 * ENSUITE ON APPEL LA FONCTION "displayGallery" AVEC EN PARAMETRE (filteredData),
 * ET ON APPEL LA FONCTION "setActiveButton" AVEC EN PARAMETRE (button)
 * PUIS ON AJOUTE L ENFANT A SONT PARENT RESPECTIF
 */
function displayFilters(categories, worksData) {
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
/*-----------------------------------------------------------------------------------------*/

/**CREATION DE LA FONCTION CHANGER LA CLASSE ACTIVE SUR CHAQUE BOUTONS
 */

function setActiveButton(selectedButton) {
  const filtersContainer = document.querySelector(".filters");
  const allButtons = filtersContainer.querySelectorAll("button");
  allButtons.forEach(button => {
      button.classList.remove("active");
  });
  selectedButton.classList.add("active");
}
/*-----------------------------------------------------------------------------------------*/

/**CREATION DE LA FONCTION "editMode"
 * CONDITION "if", SI LE JETON TOKEN SE SITUE DANS LE SESSIONSTORAGE PASSAGE EN MODE EDITION
 * DONC CREATION D UN ELEMENT "div" AYANT COMME CONSTANTE "editBanner"
 * "editBanner" AURA COMME NOM DE CLASSE ".edit" PUIS AURA DU CONTENU HTML GRACE A ".innerHTML"
 * GRACE A LA FONCTION ".prepend" LA BALISE APPARAITRA TOUT EN HAUT DU BODY EN MODE EDITION
 */
function editMode() {
  if (sessionStorage.authToken) {
      console.log("Mode édition activé");

      const editBanner = document.createElement("div");
      editBanner.className = "edit";
      editBanner.innerHTML = '<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p>';
      document.body.prepend(editBanner);
  }
}
/*---------------------------------------------------------------------------------------------*/

/**AJOUT D EVENEMENT AU CHARGEMENT DE LA PAGE APPELANT LES FONCTIONS DES TRAVAUX ET DU MODE EDITION
 */
window.addEventListener('load', () => {
  getWorks();
  editMode();
});

/*---------------------------------------------------------------------------------------------*/