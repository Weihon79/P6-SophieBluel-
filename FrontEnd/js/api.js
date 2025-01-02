// Fonction pour récupérer les travaux
export async function getWorks() {
    const url = "http://localhost:5678/api/works";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des travaux :", error.message);
      return [];
    }
  }
  
  // Fonction pour récupérer les catégories
  export async function getCategories() {
    const url = "http://localhost:5678/api/categories";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error.message);
      return [];
    }
  }
  