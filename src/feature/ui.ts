import type {Post} from '../types/Post';
import { createPostCard } from '../components/PostCard';

let currentPage = 1;
const itemsPerPage = 10; // Quants ítems per pàgina vols mostrar

// Referències als elements del DOM:
// apiSelector, searchInput, fetchButton, loadingElement, errorElement, resultsContainer, paginationContainer
// ... (Obtén les referències amb document.getElementById)
const resultsContainer = document.getElementById('resultsContainer') as HTMLDivElement;
const paginationContainer = document.getElementById('paginationContainer') as HTMLDivElement;
const loadingElement = document.getElementById('loadingElement') as HTMLDivElement;
const errorElement = document.getElementById('errorElement') as HTMLDivElement;

// Funció per mostrar l'indicador de càrrega
export function showLoading(): void {
    loadingElement.classList.remove('hidden');
}

// Funció per amagar l'indicador de càrrega
export function hideLoading(): void {
    loadingElement.classList.add('hidden');
}

// Funció per mostrar missatges d'error
export function showError(message: string): void {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

// Funció per amagar missatges d'error
export function hideError(): void {
    errorElement.classList.add('hidden');
}

export function displayResults(items: Post[], totalItems: number): void {
    resultsContainer.innerHTML = '';

    if (items.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Injecting the component into the lifecycle
    items.forEach(post => {
        const cardElement = createPostCard(post);
        resultsContainer.appendChild(cardElement);
    });

    setupPagination(totalItems);
}

export function setupPagination(totalItems: number): void {
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