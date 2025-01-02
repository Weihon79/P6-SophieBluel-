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
  
      deleteButton.addEventListener("click", () => {
        galleryItem.remove();
      });
  
      galleryItem.appendChild(img);
      galleryItem.appendChild(deleteButton);
      modalGallery.appendChild(galleryItem);
    });
  }
  