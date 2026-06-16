import type {Post} from '../types/Post';

const resultsContainer = document.getElementById('resultsContainer') as HTMLDivElement;
const paginationContainer = document.getElementById('paginationContainer') as HTMLDivElement;
const loadingElement = document.getElementById('loadingElement') as HTMLDivElement;
const errorElement = document.getElementById('errorElement') as HTMLDivElement;

let currentPage = 1;
const itemsPerPage = 10; // Quants ítems per pàgina vols mostrar

// Referències als elements del DOM:
// apiSelector, searchInput, fetchButton, loadingElement, errorElement, resultsContainer, paginationContainer
// ... (Obtén les referències amb document.getElementById)

// Event Listener per al botó "Obtenir Dades"
// ... (Afegeix l'event listener al fetchButton per cridar fetchData)

// Funció per mostrar l'indicador de càrrega
export function showLoading() {
    // ... (Elimina la classe 'hidden' de loadingElement)
}

// Funció per amagar l'indicador de càrrega
export function hideLoading() {
    // ... (Afegeix la classe 'hidden' a loadingElement)
}

// Funció per mostrar missatges d'error
export function showError(message) {
    // ... (Actualitza el text de errorElement i elimina la classe 'hidden')
}

// Funció per amagar missatges d'error
export function hideError() {
    // ... (Afegeix la classe 'hidden' a errorElement)
}

export function displayResults(items: Post[], totalItems: number): void {
    // Clear previous results
    resultsContainer.innerHTML = '';

    if (items.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Create cards
    items.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-card'; // Add CSS class for styling
        card.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        resultsContainer.appendChild(card);
    });

    // Update pagination buttons
    setupPagination(totalItems);
}

export function setupPagination(totalItems: number) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i.toString();
        btn.className = i === currentPage ? 'active' : '';
        
        btn.addEventListener('click', () => {
            currentPage = i;
            // You will need to call your main fetchData() here
            // Note: You might need to make sure fetchData() accepts a page parameter
        });
        
        paginationContainer.appendChild(btn);
    }
}