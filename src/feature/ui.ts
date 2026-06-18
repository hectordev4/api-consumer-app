import type { Post } from '../types/Post';
import { createPostCard } from '../components/PostCard';
import { fetchData, setCurrentPage, getCurrentPage, itemsPerPage } from '../api/api';

// DOM References
const resultsContainer = document.getElementById('resultsContainer') as HTMLDivElement;
const paginationContainer = document.getElementById('paginationContainer') as HTMLDivElement;
const loadingElement = document.getElementById('loadingElement') as HTMLDivElement;
const errorElement = document.getElementById('errorElement') as HTMLDivElement;

// UI State Management Helpers
export function showLoading(): void {
    loadingElement.classList.remove('hidden');
}

export function hideLoading(): void {
    loadingElement.classList.add('hidden');
}

export function showError(message: string): void {
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

export function hideError(): void {
    errorElement.classList.add('hidden');
}

// Display Logic
export function displayResults(items: any[], totalItems: number): void {
    resultsContainer.innerHTML = '';

    if (!items || items.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        paginationContainer.innerHTML = ''; // Clear pagination on empty results
        return;
    }

    items.forEach((item: any) => {
        // Data Adapter: Bridge between API structure and Post interface
        const post: Post = {
            id: item.id,
            title: item.title || item.name || 'Untitled',
            body: item.body || item.email || item.username || 'No content'
        };

        const cardElement = createPostCard(post);
        resultsContainer.appendChild(cardElement);
    });
    
    // Pass the total items received from API headers to refresh pagination
    setupPagination(totalItems);
}

// Pagination Logic
export function setupPagination(totalItems: number): void {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Only render buttons if there's more than one page
    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i.toString();
        
        // Highlight active page using getter to ensure sync
        btn.className = (i === getCurrentPage()) ? 'active' : 'page-btn';
        
        btn.addEventListener('click', () => {
            // Update shared state and trigger new fetch
            setCurrentPage(i);
            fetchData(i);
        });
        
        paginationContainer.appendChild(btn);
    }
}