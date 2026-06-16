import axios from 'axios';
import type { PaginatedResponse } from '../types/PaginatedResponse';
import { showLoading, hideLoading, showError, hideError, displayResults } from '../feature/ui';

const API_URL = import.meta.env.VITE_API_URL;


export async function fetchData(): Promise<void> {
    const searchTerm = (document.getElementById('searchInput') as HTMLInputElement).value;
    const apiSelector = document.getElementById('apiSelector') as HTMLSelectElement;
    const useAxios = apiSelector.value === 'axios';

    showLoading();
    hideError();

    try {
        // Use a variable to store the result of whichever function you call
        const responseData = useAxios 
            ? await fetchDataWithAxios(searchTerm) 
            : await fetchDataWithFetch(searchTerm);

        // Pass the destructured properties once
        displayResults(responseData.items, responseData.totalItems);
    } catch (error) {
        showError("Failed to fetch data. Please try again.");
        console.error(error);
    } finally {
        hideLoading();
    }
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