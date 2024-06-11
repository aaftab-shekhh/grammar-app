import instance from '../axios/interceptors';

export const login = async data => {
  try {
    const response = await instance.post(``, data);
    return response;
  } catch (error) {
    throw error;
  }
};
