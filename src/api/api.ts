import axios from 'axios';
import type { PaginatedResponse } from '../types/PaginatedResponse';
import { showLoading, hideLoading, showError, hideError, displayResults } from '../feature/ui';

export let currentPage: number = 1;
export const itemsPerPage: number = 10;

// Add this setter function
export function setCurrentPage(newPage: number): void {
    currentPage = newPage;
}
export function getCurrentPage(): number {
    return currentPage;
}

const API_URL: string = import.meta.env.VITE_API_URL;

// Add page parameter with a default value of 1
export async function fetchData(page: number = 1): Promise<void> {
    currentPage = page;
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement).value;
    const apiSelector = document.getElementById('apiSelector') as HTMLSelectElement;
    const customApiInput = document.getElementById('customApiUrl') as HTMLInputElement;

    const useAxios = apiSelector.value === 'axios';
    
    const targetUrl = (apiSelector.value === 'fetch' && customApiInput.value) 
        ? customApiInput.value 
        : API_URL;

    showLoading();
    hideError();

    try {
        const responseData = useAxios 
            ? await fetchDataWithAxios(searchTerm, targetUrl, currentPage) 
            : await fetchDataWithFetch(searchTerm, targetUrl, currentPage);

        displayResults(responseData.items, responseData.totalItems);
    } catch (error) {
        showError("Failed to fetch data. Please check your URL and try again.");
        console.error(error);
    } finally {
        hideLoading();
    }
}

async function fetchDataWithFetch(searchTerm: string, url: string, page: number): Promise<PaginatedResponse> {
    const fetchUrl = new URL(url);
    fetchUrl.searchParams.append('q', searchTerm);
    fetchUrl.searchParams.append('_page', page.toString());
    fetchUrl.searchParams.append('_limit', itemsPerPage.toString());

    const response = await fetch(fetchUrl.toString());
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const rawData = await response.json();
    
    // Extract total count from headers
    const totalCountHeader = response.headers.get('x-total-count');
    const totalItems = totalCountHeader ? parseInt(totalCountHeader, 10) : rawData.length;

    const items = Array.isArray(rawData) ? rawData : (rawData.results || rawData.items || [rawData]);
    
    return {
        items: items,
        totalItems: totalItems
    };
}
                                                                                    
async function fetchDataWithAxios(searchTerm: string, url: string, page: number): Promise<PaginatedResponse> {
    const response = await axios.get(url, { 
        params: { 
            q: searchTerm,
            _page: page,
            _limit: itemsPerPage
        } 
    });
    
    const rawData = response.data;
    
    // Extract total count from axios headers
    // Note: Axios headers are lowercase by default
    const totalCountHeader = response.headers['x-total-count'];
    const totalItems = totalCountHeader ? parseInt(totalCountHeader, 10) : rawData.length;
    
    const items = Array.isArray(rawData) ? rawData : (rawData.results || rawData.items || [rawData]);
    
    return {
        items: items,
        totalItems: totalItems
    };
}