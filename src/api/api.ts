import axios from 'axios';
import type {Post} from '../types/Post';
import type { PaginatedResponse } from '../types/PaginatedResponse';

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

export async function fetchData(): Promise<void> {
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement).value;
    const apiSelector = document.getElementById('apiSelector') as HTMLSelectElement;
    const useAxios = apiSelector.value === 'axios';

    showLoading();
    hideError();

    try {
        if (useAxios) {
            // We expect an object with { items: Post[], totalItems: number }
            const { items, totalItems } = await fetchDataWithAxios(searchTerm);
            displayResults(items, totalItems);
        } else {
            // Assuming your fetch logic returns the same structure
            const { items, totalItems } = await fetchDataWithFetch(searchTerm);
            displayResults(items, totalItems);
        }
    } catch (error) {
        showError("Failed to fetch data. Please try again.");
        console.error(error);
    } finally {
        hideLoading();
    }
}

// Funció per a la visualització dels resultats i la paginació (a implementar)
function displayResults(items: Post[], totalItems: number): void {
    // ... logic to render cards
}

function setupPagination(totalItems) {
    // ... (Implementa la lògica per crear els botons de paginació)
}

async function fetchDataWithFetch(searchTerm: string, url: string = API_URL): Promise<PaginatedResponse> {
    // Construct the URL with query parameters
    const fetchUrl = new URL(url);
    fetchUrl.searchParams.append('q', searchTerm);

    const response = await fetch(fetchUrl.toString());

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data: PaginatedResponse = await response.json();
    return data;
}


                                                                                    
async function fetchDataWithAxios(searchTerm: string): Promise<PaginatedResponse> {
    const response = await axios.get<PaginatedResponse>(API_URL, {
        params: { q: searchTerm }
    });
    return response.data;
}