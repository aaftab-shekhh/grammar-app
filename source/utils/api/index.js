import instance from '../axios/interceptors';
import store from '../../redux/store';

export const get_token = async () => {
  try {
    const main_response = await fetch(
      'https://cl.englivia.com/generate_token.php',
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_data = async data => {
  const storeData = store.getState();

  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  if (!storeData?.auth?.user?.access_token) return;

  try {
    const response = await fetch('https://cl.englivia.com/api-v2.php', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        Authorization: `Bearer ${storeData?.auth?.user?.access_token}`,
      },
      body: formData, // Use FormData as the body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const main_response = await response.json(); // Parse JSON response
    return main_response;
  } catch (error) {
    console.error('Fetch error:', error); // Log detailed error message
    throw error; // Re-throw error to be handled by the caller
  }
};
