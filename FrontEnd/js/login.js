/**UTILISE POUR GERER LES CONNEXIONS DES UTILISATEURS
 * URL POINTE VERS UN SERVEUR LOCAL ET ACCEDE AU POINT D ENTREE
 * ON RECUPERE L ID DE LA BALISE FORM ET ON EXECUTE LA FONCTION "handleSubmit" AU LISTENER
 */
const loginApi = "http://localhost:5678/api/users/login";
document
    .getElementById('loginform')
    .addEventListener('submit', handleSubmit);
/**------------------------------------------------------------------------------------ */

/**CREATION DE LA FONCTION "handleSubmit" QUI TRAITE LES ACTIONS LORS DE LA SOUMISSION DU FORM
 * A L EVENEMENT ON EMPECHE LE COMPORTEMENT PAR DEFAUT DU NAVIGATEUR,
 * PUIS ON RECUPERE ET STOCK LES VALEURS EMAIL ET PASSWORD DE L UTILISATEUR
 * ENVOIE DE LA REQUETE A L API AVEC LA METHOD DE TYPE "POST",
 * ON SPECIFIE QUE LES DONNEES ENVOYEES SERONT AU FORMAT JSON
 * BODY CONTIENT LES DONNEES USER EN CHAINE JSON
 * SI LA REPONSE STATUS EST AUTRE QUE 200 UNE DIV DYNAMIQUE AFFICHE UNE ERREUR
 * SINON ON STOCK LE JETON DANS LA SESSION POUR RESTER TEMPORAIREMENT CONNECTE
 * PUIS 'window.location.href = "index.html"' NOUS REDIRIGE VERS LA PAGE D ACCUEIL
 */
async function handleSubmit(event) {
    if (event) {
        event.preventDefault();
    }
    let user = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
        
    let response = await fetch(loginApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    });

    if (response.status != 200) {
        const errorBox = document.getElementById("errorBox-js");
        errorBox.classList.add("active");
    } else {
        let result = await response.json();
        const token = result.token;
        sessionStorage.setItem("authToken", token);
        window.location.href ="index.html";
        console.log(token);
    }

}
