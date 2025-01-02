// gallery.js
export function displayGallery(data) {
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
  
export function displayGalleryInModal(data) {
    const modalGallery = document.querySelector(".gallery-modal");
    modalGallery.innerHTML = "";
  
    data.forEach(item => {
      const galleryItem = document.createElement("div");
      galleryItem.classList.add("gallery-item");
  
      const img = document.createElement("img");
      img.src = item.imageUrl;
      img.alt = item.title;
  
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-btn");
      deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  
      deleteButton.addEventListener("click", async () => {
        const workId = item.id;

        try {
          //ON APPEL L API POUR SUPPRIMER LE TRAVAIL
          const sucess = await deleteWork(workId);
          if (sucess) {
            //SUPPRIMER DU DOM APRES CONFIRMATION DE L API
            galleryItem.remove();
            console.log(`Travail ${workId} supprimé avec succès`);
          }
        } catch (error) {
          console.error(`Erreur lors de la suppression du travail : ${error.message}`);
        }
      });
  
      galleryItem.appendChild(img);
      galleryItem.appendChild(deleteButton);
      modalGallery.appendChild(galleryItem);
    });
}

  //FONCTION POUR SUPPRIMER UN TRAVAIL VIA L API
  async function deleteWork(workId) {
    const token = sessionStorage.getItem('authToken');
    console.log('Token:', token);
    
    if (!token) {
      alert('Vous devez être connecté pour supprimer un travail.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du travail');
      }
  
      alert('Le travail a été supprimé');
      document.querySelector(`#work-${workId}`).remove();
    } catch (error) {
      console.error(error.message);
    }
  }
  