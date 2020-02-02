import UserService from '@mc/modules/auth/services/UserService';

export function getDateInHalfYear(): Date {
  const today = new Date();
  today.setMonth(today.getMonth() + 6);
  today.setSeconds(0, 0);
  today.setMinutes(0, 0);
  return today;
}

export async function getAccessToken(userId = 1): Promise<string> {
  const userService = new UserService();
  const token = await userService.generateAccessToken(userId);
  return token;
}

export async function getRefreshToken(userId = 1): Promise<string> {
  const userService = new UserService();
  const token = await userService.generateRefreshToken(userId);
  return token;
}

export async function getTokenByUsername(username: string): Promise<string> {
  const userService = new UserService();
  await userService.setUser(username);
  const token = await userService.generateAccessToken();
  return token;
}

export async function getAuthBearerHeader(userId = 1): Promise<string> {
  const token = await getAccessToken(userId);
  return `Bearer ${token}`;
}
