import {requestMultiple, RESULTS} from 'react-native-permissions';

export const RequestPermissions = async multipleRequests => {
  const permissionStatus = await requestMultiple([...multipleRequests]);

  if (
    Object.keys(permissionStatus).every(
      key => permissionStatus[key] === RESULTS.GRANTED,
    )
  ) {
    return 1;
  } else if (
    Object.keys(permissionStatus).every(
      key => permissionStatus[key] === RESULTS.LIMITED,
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
