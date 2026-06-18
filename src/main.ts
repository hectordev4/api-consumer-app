import { fetchData } from './api/api'; // Adjust the path as needed
import './style.css';

// 1. Grab the DOM elements
const fetchButton = document.getElementById('fetchButton') as HTMLButtonElement;

// 2. Attach the click event
fetchButton.addEventListener('click', () => {
    fetchData();
});

// Optional: Allow "Enter" key in the search input to trigger the fetch
const searchInput = document.getElementById('searchInput') as HTMLInputElement;
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchData();
    }
});

const apiSelector = document.getElementById('apiSelector') as HTMLSelectElement;
const customInput = document.getElementById('customApiUrl') as HTMLDivElement;

apiSelector.addEventListener('change', () => {
    // Show input only if 'fetch' is selected
    if (apiSelector.value === 'fetch') {
        customInput.classList.remove('hidden');
    } else {
        customInput.classList.add('hidden');
    }
});