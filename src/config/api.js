import { create } from 'apisauce';
import {CamelcaseSerializer, SnakecaseSerializer} from 'cerealizr';
import { SING_UP_URL, LOGIN_URL, TOKEN_KEY } from '../utils/constants';

const baseURL =  process.env.REACT_APP_API_BASE_URL;

if (baseURL === 'http://wolox.com') {
  console.warn('API baseURL has not been properly initialized'); // eslint-disable-line no-console
}

const STATUS_CODES = {
  unauthorized: 401
};

const api = create({
  /*
   * TODO Add this if you need it
   * baseURL: process.env.API_BASE_URL,
   */
  baseURL,
  timeout: 15000,
});

// eslint-disable-next-line no-unused-vars, prettier/prettier, @typescript-eslint/no-unused-vars
export const apiSetup = dispatch => {
  api.addMonitor(response => {
    if (response.status === STATUS_CODES.unauthorized) {
      /*
       * TODO: These callbacks should only be called if no other callback was asigned for the response.
       * - dispatch(alertActions.error(i18next.t('apiErrors:expired')));
       */
    }
  });

  api.addMonitor(response => {
    if (response.problem === 'NETWORK_ERROR') {
      // TODO: These callbacks should only be called if no other callback was asigned for the response.
    }
  });
};

api.addMonitor(response => {
  if(response.config.url === SING_UP_URL || response.config.url === LOGIN_URL){
    response.data = {
      ...response.data,
      accessToken: response.headers[TOKEN_KEY]
    }
  }
});

api.addMonitor(response => {
  if(response.data) {
    const camelCaseSerializer = new CamelcaseSerializer();
    response.data = camelCaseSerializer.serialize(response.data);
  }
});

api.addRequestTransform(request => {
  if(request.data) {
    const snakeCaseSerialize = new SnakecaseSerializer();
    request.data = snakeCaseSerialize.serialize(request.data);
  }
});

export default api;
