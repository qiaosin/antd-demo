import xFetch from './xFetch';

export async function getAll() {
  return xFetch('/users');
}
