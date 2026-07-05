/**
 * mockApi.js
 * * This file simulates backend API calls for the frontend.
 * Since we don't have a real backend connected yet, this helps test loading states,
 * success messages, and error handling in our UI without needing a live server.
 * Perfect for frontend university projects!
 */

/**
 * Simulates submitting the contact form data to a server.
 * * @param {Object} formData - The data submitted from the contact form (name, email, etc.)
 * @returns {Promise} - Resolves after a short delay to simulate network latency
 */
export const submitContactForm = async (formData) => {
  // Log the submitted data to the browser's console for debugging purposes
  console.log('API call simulation: Submitting form data...', formData);

  // Return a Promise that resolves after 1.5 seconds (1500ms)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      
      // Note: If you want to test the error state in the UI, 
      // you can comment out the resolve block and uncomment the reject line below:
      // reject(new Error('Failed to send message. Please try again.'));
      
      resolve({
        status: 200,
        message: 'Message sent successfully',
        // Returning the data just to mimic a typical API response
        data: formData 
      });
      
    }, 1500); // 1.5 seconds delay mimicking network request
  });
};