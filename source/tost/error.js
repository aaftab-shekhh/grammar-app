import {tost} from './tost';
import store, {update_is_unauthenticated} from '../redux/store';

export const firebaseErrorCodes = {
  'auth/claims-too-large': 'Claims too large',
  'auth/email-already-exists': 'Email already exists',
  'auth/wrong-password': 'Incorrect password',
  'auth/email-already-in-use': 'Email address already in use',
  'auth/insufficient-permission': 'Insufficient Permission',
  'auth/internal-error': 'auth/internal-error',
  'auth/invalid-argument': 'Invalid  Argument',
  'auth/invalid-claims': 'Invalid Claims',
  'auth/invalid-continue-uri': 'Invalid Continue Uri',
  'auth/invalid-creation-time': 'Invalid Creation Time',
  'auth/invalid-credential': 'auth/Invalid Credential',
  'auth/invalid-disabled-field': 'Invalid Disabled Field',
  'auth/invalid-display-name': 'Invalid display Name',
  'auth/invalid-dynamic-link-domain': 'Invalid Dynamic Link Domain',
  'auth/invalid-email': 'Invalid email',
  'auth/invalid-email-verified': 'Invalid Email Verified',
  'auth/invalid-hash-algorithm': 'Invalid Hash Algorithm',
  'auth/invalid-hash-block-size': 'Invalid Hash Block Size',
  'auth/invalid-hash-derived-key-length': 'Invalid Hash Derived Key Length',
  'auth/invalid-hash-key': 'Invalid Hash Key',
  'auth/invalid-hash-memory-cost': 'Invalid Hash Memory Cost',
  'auth/invalid-hash-parallelization': 'Invalid Hash Parallelization',
  'auth/invalid-hash-rounds': 'Invalid Hash Rounds',
  'auth/invalid-hash-salt-separator': 'Invalid Hash Salt Separator',
  'auth/invalid-id-token': 'Invalid ID Token',
  'auth/invalid-last-sign-in-time': 'Invalid Las Sign In Time',
  'auth/invalid-page-token': 'Invalid Page Token',
  'auth/invalid-password': 'Invalid Password',
  'auth/invalid-password-has': 'Invalid Password Has',
  'auth/invalid-password-salt': 'Invalid Password Salt',
  'auth/invalid-phone-number': 'Invalid Phone Number',
  'auth/invalid-photo-url': 'Invalid Photo Url',
  'auth/invalid-provider-data': 'Invalid Provider Data',
  'auth/invalid-provider-id': 'Invalid Provider Id',
  'auth/invalid-oauth-responsetype': 'Invalid Oauth Responsetype',
  'auth/invalid-session-cookie-duration': 'invalid Session Cookie Duration',
  'auth/invalid-uid': 'Invalid Uid',
  'auth/invalid-user-import': 'Invalid User Import',
  'auth/maximum-user-count-exceeded': 'Maximum User Count Exceeded',
  'auth/missing-android-pkg-name': 'Missing Android Package Name',
  'auth/missing-continue-uri': 'Missing Continue Uri',
  'auth/missing-hash-algorithm': 'Missing Hash Algorithm',
  'auth/missing-ios-bundle-id': 'Missing iOS Bundle',
  'auth/missing-uid': 'Missing UID',
  'auth/missing-oauth-client-secret': 'Missing OAuth Client Secret',
  'auth/operation-not-allowed': 'Operation Not Allowed',
  'auth/phone-number-already-exists': 'Phone Number Already Exists',
  'auth/project-not-found': 'Project Not Found',
  'auth/reserved-claims': 'Reserved Claims',
  'auth/session-cookie-expired': 'Session Cookie Expired',
  'auth/session-cookie-revoked': 'Session Cookie Revoked',
  'auth/uid-already-exists': 'Uid Already Exists',
  'auth/unauthorized-continue-uri': 'Unauthorized Continue',
  'auth/user-not-found': 'User Not Found',
  'auth/too-many-requests':
    'We have blocked all requests from this device due to unusual activity. Try again later',
  'auth/invalid-login': 'invalid login credentials',
};

export const httpStatusCodes = {
  101: 'Switching Protocols',
  100: 'Continue',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Range Not Satisfiable',
  417: 'Expectation Failed',
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
};

export const error = rowError => {
  if (rowError?.code) {
    if (firebaseErrorCodes[rowError.code]) {
      tost(firebaseErrorCodes[rowError.code]);
    } else {
      tost('Something went wrong');
    }
  } else if (rowError?.data?.success?.message) {
    if (rowError?.data?.success?.message === 'Unauthenticated.') {
      store.dispatch(update_is_unauthenticated());
    }
    tost(rowError?.data?.success?.message);
  } else if (rowError?.data?.error?.message) {
    if (rowError?.data?.error?.message === 'Unauthenticated.') {
      store.dispatch(update_is_unauthenticated());
    }
    tost(rowError?.data?.error?.message);
  } else if (rowError?.data?.error) {
    if (rowError?.data?.error === 'Unauthenticated.') {
      store.dispatch(update_is_unauthenticated());
    }
    tost(rowError?.data?.error);
  } else if (rowError?.data?.message) {
    if (rowError?.data?.message === 'Unauthenticated.') {
      store.dispatch(update_is_unauthenticated());
    }
    tost(rowError?.data?.message);
  } else if (rowError?.message) {
    if (rowError?.message === 'Unauthenticated.') {
      store.dispatch(update_is_unauthenticated());
    }
    tost(rowError?.message);
  } else if (rowError?.status && httpStatusCodes[rowError.status]) {
    tost(httpStatusCodes[rowError.status]);
  } else {
    tost('Something went wrong');
  }
};
