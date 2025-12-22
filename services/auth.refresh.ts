import axios from 'axios';

const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_MANAGEMENT_URL + '/auth',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export async function requestNewToken() {
  await refreshClient.post('/refresh', {});
}
