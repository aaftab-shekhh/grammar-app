import { tost } from './tost';

export const checkInput = (string, key) => {
  if (!string || string?.toString()?.trim().length === 0) {
    tost(`${key} is Required`);
    return true;
  }
  if (key === 'Number' && string.toString()?.trim().length < 10) {
    tost('Enter Valid Number');
    return true;
  }
  if (
    key === 'Email' &&
    !string
      ?.toLowerCase()
      ?.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  ) {
    tost('Enter Valid Email');
    return true;
  }
  return false;
};
