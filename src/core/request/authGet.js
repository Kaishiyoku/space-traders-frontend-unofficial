import {partial} from 'ramda';
import authRequest from './authRequest';

const authGet = partial(authRequest, ['get']);

export default authGet;