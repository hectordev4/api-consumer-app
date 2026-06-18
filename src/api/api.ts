import axios from 'axios';
import type { PaginatedResponse } from '../types/PaginatedResponse';
import { showLoading, hideLoading, showError, hideError, displayResults } from '../feature/ui';

const API_URL: string = import.meta.env.VITE_API_URL;

export async function fetchData(): Promise<void> {
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement).value;
    const apiSelector = document.getElementById('apiSelector') as HTMLSelectElement;
    const customApiInput = document.getElementById('customApiUrl') as HTMLInputElement;

    const useAxios = apiSelector.value === 'axios';
    
    // Logic: If 'fetch' is selected AND the input has a value, use that value.
    // Otherwise, fall back to the VITE_API_URL.
    const targetUrl = (apiSelector.value === 'fetch' && customApiInput.value) 
        ? customApiInput.value 
        : API_URL;

    showLoading();
    hideError();

    try {
        const responseData = useAxios 
            ? await fetchDataWithAxios(searchTerm, targetUrl) 
            : await fetchDataWithFetch(searchTerm, targetUrl);

        displayResults(responseData.items, responseData.totalItems);
    } catch (error) {
        showError("Failed to fetch data. Please check your URL and try again.");
        console.error(error);
    } finally {
        hideLoading();
    }
}

async function fetchDataWithFetch(searchTerm: string, url: string): Promise<PaginatedResponse> {
    const fetchUrl = new URL(url);
    fetchUrl.searchParams.append('/', searchTerm);

    const response = await fetch(fetchUrl.toString());
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();
    
    // Simplest version: Just return the data and let the UI handle the mapping.
    // We ensure 'items' is an array.
    return {
        items: Array.isArray(data) ? data : (data.items || [data]),
        totalItems: data.length || 1
    };
}
                                                                                    
async function fetchDataWithAxios(searchTerm: string, url: string): Promise<PaginatedResponse> {
    const response = await axios.get(url, { params: { q: searchTerm } });
    const data = response.data;
    
    // Standardize: Same logic as above
    const items = Array.isArray(data) ? data : (data.items || data.results || []);

    console.log("Normalized Items:", items);
    
    return {
        items: items,
        totalItems: data.totalItems || items.length
    };
}