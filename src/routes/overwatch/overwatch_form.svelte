<script lang="ts">
  import { onMount } from 'svelte';
  import { getCookie } from '../../utils/cookies';

  let authToken: string;
  let xCoordinate: number;
  let zCoordinate: number;
  let startTime: string;
  let responseData: Array<{ ID: number; Name: string; Date: string; X: number; Y: number }> = [];

  onMount(() => {
    const token = getCookie('Token'); // get the value of the "Token" cookie
    if (token) {
      authToken = token; // set authtoken variable if "Token" cookie is set
    }
  });

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    document.cookie = `Token=${authToken}`; // set the "Token" cookie to the value of the authToken variable

    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        xCoordinate,
        zCoordinate,
        startTime,
        authToken, 
      }),
    });

    if (response.ok) {
      responseData = await response.json();
      console.log('Data submitted successfully');
    } else {
      console.error('Error submitting data', response);
    }
  };
</script>

<form on:submit={handleSubmit}>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="x-coordinate">X-Coordinate:</label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="x-coordinate" bind:value={xCoordinate} required />
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="z-coordinate">z-Coordinate:</label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="z-coordinate" bind:value={zCoordinate} required />
  </div>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="start-time">Start Time:</label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="datetime-local" id="start-time" bind:value={startTime} required />
  <div/>
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="auth-token">Authentication Token:</label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="string" id="authToken" bind:value={authToken} required />
  <div/>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
</form>

{#if responseData.length > 0}
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Date</th>
        <th>X</th>
        <th>Z</th>
      </tr>
    </thead>
    <tbody>
      {#each responseData as { ID, Name, Date, X, Z }}
        <tr>
          <td>{ID}</td>
          <td>{Name}</td>
          <td>{Date}</td>
          <td>{X}</td>
          <td>{Z}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <p>No data to display.</p>
{/if}
