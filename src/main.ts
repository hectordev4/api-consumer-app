import { fetchData } from './api/api';


// Event Listener per al botó "Obtenir Dades"
// ... (Afegeix l'event listener al fetchButton per cridar fetchData)
const fetchButton = document.getElementById('fetchButton') as HTMLButtonElement;

// Simply attach the event listener directly
fetchButton.addEventListener('click', () => {
    fetchData();
});