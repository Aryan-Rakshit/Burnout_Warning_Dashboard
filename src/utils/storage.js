/**
 * LocalStorage Utilities
 */

const STORAGE_KEY = 'burnout_dashboard_data';

export const saveData = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error("Error saving to localStorage", error);
    }
};

export const loadData = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error("Error loading from localStorage", error);
        return null;
    }
};

export const clearData = () => {
    localStorage.removeItem(STORAGE_KEY);
};
