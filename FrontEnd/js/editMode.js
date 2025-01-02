/**
 * Mode édition
 */
export function editMode() {
    if (sessionStorage.authToken) {
      console.log("Mode édition activé");
  
      // Ajout du bandeau "Mode édition"
      const editBanner = document.createElement("div");
      editBanner.className = "edit";
      editBanner.innerHTML = '<i class="fa-solid fa-pen-to-square"></i><p>Mode édition</p>';
      document.body.prepend(editBanner);
  
      // Ajout du lien "modifier" dans le header
      const sectionHeader = document.querySelector(".section-header");
      const editLink = document.createElement("a");
      editLink.href = "#modal1";
      editLink.className = "edit-link";
      editLink.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> modifier';
      sectionHeader.appendChild(editLink);
    }
  }