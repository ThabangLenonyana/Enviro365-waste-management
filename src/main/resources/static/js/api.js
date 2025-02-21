// API configuration
const API = {
    baseUrl: '/api',
    endpoints: {
        categories: '/categories',
        guidelines: '/guidelines',
        tips: '/tips'
    }
};

/**
 * Handles API response and throws appropriate errors
 * @param {Response} response - Fetch API response
 * @param {string} errorMessage - Custom error message
 * @returns {Promise<any>} Parsed response data
 * @throws {Error} Custom error with status and message
 */
async function handleResponse(response, errorMessage) {
    if (!response.ok) {
        const error = new Error(errorMessage);
        error.status = response.status;
        try {
            error.details = await response.json();
        } catch {
            error.details = await response.text();
        }
        throw error;
    }
    return response.json();
}

// API service for handling requests
const ApiService = {
    // Get all categories
    async getCategories() {
        try {
            const response = await fetch(`${API.baseUrl}${API.endpoints.categories}`);
            return handleResponse(response, 'Failed to fetch categories');
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    // Get category by ID
    async getCategoryById(id) {
        if (!id) throw new Error('Category ID is required');
        try {
            const response = await fetch(`${API.baseUrl}${API.endpoints.categories}/${id}`);
            return handleResponse(response, 'Failed to fetch category');
        } catch (error) {
            console.error('Error fetching category:', error);
            throw error;
        }
    },

    // Create new category
    async createCategory(categoryData) {
        if (!categoryData) throw new Error('Category data is required');
        try {
            const response = await fetch(`${API.baseUrl}${API.endpoints.categories}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData)
            });
            return handleResponse(response, 'Failed to create category');
        } catch (error) {
            console.error('Error creating category:', error);
            throw error;
        }
    },

    // Update category
    async updateCategory(id, categoryData) {
        if (!id) throw new Error('Category ID is required');
        if (!categoryData) throw new Error('Category data is required');
        try {
            const response = await fetch(`${API.baseUrl}${API.endpoints.categories}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(categoryData)
            });
            return handleResponse(response, 'Failed to update category');
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    },

    // Delete category
    async deleteCategory(id) {
        if (!id) throw new Error('Category ID is required');
        try {
            const response = await fetch(`${API.baseUrl}${API.endpoints.categories}/${id}`, {
                method: 'DELETE'
            });

            if (response.status === 204) {
                return true;
            }
            return handleResponse(response, 'Failed to delete category');
        } catch (error) {
            console.error('Error deleting category:', error);
            throw error;
        }
    }
};


