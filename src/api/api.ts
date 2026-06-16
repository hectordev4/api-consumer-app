import axios from 'axios';
import type {Post} from '../types/Post';
import type {ApiResponse} from '../types/ApiResponse';

const API_URL = import.meta.env.VITE_API_URL;



let currentPage = 1;
const itemsPerPage = 10; // Quants ítems per pàgina vols mostrar

// Referències als elements del DOM:
// apiSelector, searchInput, fetchButton, loadingElement, errorElement, resultsContainer, paginationContainer
// ... (Obtén les referències amb document.getElementById)

// Event Listener per al botó "Obtenir Dades"
// ... (Afegeix l'event listener al fetchButton per cridar fetchData)

// Funció per mostrar l'indicador de càrrega
function showLoading() {
    // ... (Elimina la classe 'hidden' de loadingElement)
}

// Funció per amagar l'indicador de càrrega
function hideLoading() {
    // ... (Afegeix la classe 'hidden' a loadingElement)
}

// Funció per mostrar missatges d'error
function showError(message) {
    // ... (Actualitza el text de errorElement i elimina la classe 'hidden')
}

// Funció per amagar missatges d'error
function hideError() {
    // ... (Afegeix la classe 'hidden' a errorElement)
}

// Funció principal per obtenir dades (a implementar)
async function fetchData() {
    const searchTerm = /* ... (Obtén el valor de searchInput) */;
    const useAxios = /* ... (Comprova si apiSelector.value és 'axios') */;

    const response = await axios.get(API_URL, {
        timeout: 5000, // 5 seconds
    });
    
    showLoading();
    hideError();
    // ... (Neteja resultats anteriors i paginació anterior)

    try {
        if (useAxios) {
            // ... (Crida la funció per obtenir dades amb Axios)
        } else {
            // ... (Crida la funció per obtenir dades amb Fetch)
        }
    } catch (error) {
        // ... (Gestiona errors inesperats si s'escapen de les funcions específiques de Fetch/Axios)
    } finally {
        hideLoading();
    }
}

// Funció per a la visualització dels resultats i la paginació (a implementar)
function displayResults(items, totalItems) {
    // ... (Implementa la lògica per mostrar cada "ítem" com una targeta i per cridar setupPagination)
}

function setupPagination(totalItems) {
    // ... (Implementa la lògica per crear els botons de paginació)
}

// Funció per obtenir dades amb Fetch (a implementar)
async function fetchDataWithFetch(searchTerm) {
    // ... (Implementa la petició amb Fetch API)
}


                                                                                    
export async function fetchDataWithAxios(searchTerm: string): Promise<ApiResponse> {
    const response = await axios.get<ApiResponse>(API_URL, {
        params: { q: searchTerm }
    });
    return response.data;
}