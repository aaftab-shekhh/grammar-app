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
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON');
    }

    const main_response = await response.json();
    return main_response;
  } catch (error) {
    throw error;
  }
};

export const get_mock = async () => {
  try {
    const main_response = await fetch(
      'https://cl.englivia.com/api/category.php',
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_mcq = async () => {
  try {
    const main_response = await fetch(
      'https://cl.englivia.com/api/category.php?type=2',
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_mcq_test = async category => {
  try {
    const main_response = await fetch(
      `https://cl.englivia.com/api/subcategory.php?type=2&category=${category}`,
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_mcq_test_question = async category => {
  try {
    const main_response = await fetch(
      `https://cl.englivia.com/api/question.php?type=2&category=${category}`,
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_pdf = async () => {
  const storeData = store.getState();

  console.log('storeData.auth?.language');
  try {
    const main_response = await fetch(
      `https://cl.englivia.com/api/pdf.php?type=2&language=${storeData.auth?.user?.language}`,
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_mock_question = async id => {
  try {
    const main_response = await fetch(
      `https://cl.englivia.com/api/question.php?category=${id}`,
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_sentence_structure = async () => {
  const storeData = store.getState();
  try {
    const main_response = await fetch(
      `https://cl.englivia.com/api/pdf.php?type=3&language=${storeData.auth?.user?.language}`,
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_paragraph_translation = async () => {
  try {
    const main_response = await fetch(
      `https://cl.englivia.com/api/translation/paragraph.php`,
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};

export const get_translation_one_liner = async () => {
  try {
    const main_response = await fetch(
      `https://cl.englivia.com/api/translation/one-liner.php`,
    );
    const response = await main_response.json();
    return response;
  } catch (error) {
    throw error;
  }
};
