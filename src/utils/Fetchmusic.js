import { Axios } from "axios";

//Version détaillée de la fonction
export default function getDonnees() {
  // Création d'une promesse qui va contenir l'appel
  const promise = Axios.get("https://saavn.dev/api/search/songs");
  // Avec la méthode "then", on extrait les données
  const donnes = promise.then((reponse) => reponse.data);
  //  On retourne les données
  return donnes;
}
