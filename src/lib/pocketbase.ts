import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';
import { env } from '$env/dynamic/public'

export const pb = new PocketBase(env.PUBLIC_POCKETBASE_URL); // remote

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log('authStore changed', auth);
  currentUser.set(pb.authStore.model);
});
