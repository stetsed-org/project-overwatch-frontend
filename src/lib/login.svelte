<script lang="ts">
  import { currentUser, pb } from './pocketbase';
  let username: string;
  let password: string;
  async function login() {
    await pb.collection('users').authWithPassword(username, password);
  }
  function signOut() {
    pb.authStore.clear();
  }
</script>

{#if $currentUser}
  <p>
    Signed in as {$currentUser.username} 
    <button on:click={signOut}>Sign Out</button>
  </p>
{:else}
<div class="relative flex flex-col justify-center h-96 overflow-hidden">
  <form on:submit|preventDefault>
    <div class="form-control w-full max-w-xs m-auto">
      <label class="label-text" for="username">
        Username
      </label>
      <input class="input input-bordered w-full max-w-xs" id="username" type="text" placeholder="Username" bind:value={username} required>
    </div>
    <div class="form-control w-full max-w-xs m-auto">
      <label class="label-text" for="password">
        Password
      </label>
      <input class="input input-bordered w-full max-w-xs" id="password" type="password" placeholder="Password" bind:value={password} required>
    </div>
    <div class="form-control w-full max-w-xs m-auto">
      <button class="btn btn-md sm:btn-sm md:btn-md lg:btn-lg rounded" type="submit" on:click={login}>
        Login
      </button>
    </div>
  </form>
</div>
{/if}
