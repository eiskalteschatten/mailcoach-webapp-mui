import { dispatch } from '../store';
import { renewAccessToken } from '../store/actions/userActions';

export default function(): void {
  // get access token expiration, then call use setimeout to call:
  // await dispatch(renewAccessToken());
}
