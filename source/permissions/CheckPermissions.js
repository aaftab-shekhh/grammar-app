import {checkMultiple, RESULTS} from 'react-native-permissions';

export const CheckPermissions = async permissionRequest => {
  const permissionStatus = await checkMultiple([...permissionRequest]);

  if (
    Object.keys(permissionStatus).every(
      key =>
        permissionStatus[key] === RESULTS.GRANTED ||
        permissionStatus[key] === RESULTS.LIMITED,
    )
  ) {
    return 1;
  } else if (
    Object.keys(permissionStatus).some(
      key => permissionStatus[key] === RESULTS.DENIED,
    )
  ) {
    return 0;
  } else if (
    Object.keys(permissionStatus).some(
      key =>
        permissionStatus[key] === RESULTS.BLOCKED ||
        permissionStatus[key] === RESULTS.UNAVAILABLE,
    )
  ) {
    return -1;
  } else {
    return -1;
  }
};
