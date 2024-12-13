/**RECUPERATION DES DONNEES VIA L API */
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
/**------------------------------------ */

/**CREATION D UN TABLEAU CONTENANT LES DATAS IMAGES ALT CAPTION ET CATEGORY */
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
/**--------------------------------------- */  

/**CREATION D UNE CONSTANTE LIEE A LA CLASSE GALLERY */
const gallery = document.querySelector('.gallery');
/**---------------- */

/**SOURCE DE DONNEES:
 * DANS LE TABLEAU, POUR CHAQUE DATA ON CREER UNE BALISE FIGURE ET IMG
 * ON RECUPERE LE SRC ET ALT DE DATA
 * ON CREER UNE BALISE FIGCAPTION CONTENANT LE TEXTE DE CAPTION DATA
 * ON ATTACHE L ENFANT FIGURE AU PARENT GALLERY
 * DE MEME POUR IMG ET FIGCAPTION A FIGURE
 */
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
/**--------------------------------------------------------------------- */

/**CREATION D UNE LISTE UNIQUE DES CATEGORIES PRESENTES DANS LE TABLEAU
 * METHOD "MAP" POUR EXTRAIRE UNIQUEMENT LA PROPRIETE CATEGORY DE CHAQUE ITEM DU TABLEAU
 * ON UTILISE LA STRUCTURE SET QUI GARDE QUE DES VALEURS UNIQUES ET SUPPRIME LES DOUBLONS
 * OPERATEUR "SPREAD (...)" TRANSFORME LE SET EN UN TABLEAU STANDARD
 */
const categories = [...new Set(galleryData.map(item => item.category))];
/**-------------------------------------------------------------------------- */

const filtersContainer = document.querySelector(".filters")
const allButton = document.createElement("button");
allButton.textContent = "Tous";
allButton.addEventListener("click", () => displayGallery(galleryData));
filtersContainer.appendChild(allButton);

/**LE BOUTON "TOUS" SERA AUTOMATIQUEMENT EN FOCUS AU CHARGEMENT DE LA PAGE */
window.addEventListener('load', () => {
    const allButton = document.querySelector("button");
    allButton.focus();
  });

/**POUR CHAQUE PROPRIETE CATEGORY DE MON TABLEAU
 * ON CREER UN ELEMENT BUTTON QUI CONTIENDRA LE TEXTE APPARTENANT A LA VALEUR DE SA PROPRIETE
 * ON CREER UN EVENEMENT AU CLIQUE QUI FILTRERA LE TABLEAU SI LA CONDITION EST VRAI
 * POUR CHAQUE ELEMENT "ITEM" ON VERIFIE SI LA PROPRIETE CATEGORY CORRESPOND A LA VARIABLE CATEGORY
 * PUIS ON RATTACHE L ENFANT "button" A SON PARENT "filtersContainer"
 */
categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category
    button.addEventListener("click", () => {
        const filteredData = galleryData.filter(item => item.category === category);
        displayGallery(filteredData)
    });
    filtersContainer.appendChild(button);
});
/**---------------------------------------------------------------------------------------------- */

/**CREATION DE LA FONCTION "displayGallery" PRENNANT COMME OBJET DATA
 * LA CONSTANTE "gallery" DETERMINE LA CLASSE ".gallery"
 * INNERHTML = "" VIDE LE CONTENU ACTUEL DE GALLERY, UTILE SI MISE A JOUR DE NOUVELLES DONNEES
 * ON APPELLERA LA FONCTION AU MOMENT DU FILTRAGE DES CATEGORIES
 * ON APPEL LA FONCTION AVEC COMME OBJET LA SOURCE DE DONNEE "galleryData"
 * */
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
/**-------------------------------------------------------------------------------------------- */

/**ON VERIFIE SI LE JETON TOKEN EST PRESENT DANS LA SESSIONSTORAGE
 * SIMULE UNE VERIFICATION D UTILISATEUR CONNECTE, SI LE JETON EXISTE LE MODE EDITION EST ACTIVE
 * CREATION D UNE DIV CLASS ".edit" AVEC FA-SOLID ET PARAGRAPHE"MODE EDITION"
 * ON AJOUTE LA BANNIERE AU TOUT DEBUT DE LA PAGE AVEC "PREPEND"
 * PUIS LANCEMENT DE LA FONCTION "editMode()"
 */
function editMode() {
  if (sessionStorage.authToken) {
    console.log("ok");
    const editBanner = document.createElement("div");
    editBanner.className = "edit";
    editBanner.innerHTML = '<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p>';
    document.body.prepend(editBanner);
  }
}

editMode();
/**---------------------------------------------------------------------------------------------*/