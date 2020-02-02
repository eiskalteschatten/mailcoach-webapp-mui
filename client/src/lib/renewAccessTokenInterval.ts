import { dispatch } from '../store';
import { renewAccessToken } from '../store/actions/userActions';

export default async function(): Promise<void> {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    setInterval(async (): Promise<void> => {
      await dispatch(renewAccessToken());
    }, 2700 * 1000); // 45 minutes
  }
}
