<script lang="ts">
  import { onMount } from 'svelte';
  import { currentUser, pb} from "../../lib/pocketbase.ts";

  let xCoordinate: number;
  let zCoordinate: number;
  let startTime: string;
  let responseData: any[] = [];
  let formSubmitted: boolean = false;

  const handleSubmit = async (event: Event) => {
    const filter = `x > ${xCoordinate - 20} && x < ${xCoordinate + 20} && z > ${zCoordinate - 20} && z < ${zCoordinate + 20} && created > "${startTime}"`;
    const resultList = await pb.collection('global').getList(1, 1000,{
      filter: filter,
    });
    responseData = resultList.items;
    formSubmitted = true;
  };

  const handleChangeCoordinates = () => {
    formSubmitted = false;
  };
</script>

{#if !formSubmitted}
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
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
  </form>
{:else}
  <div class="container mx-auto p-4">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" on:click={handleChangeCoordinates}>Change Coordinates</button>
    {#if responseData.length > 0}
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">X</th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Z</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each responseData as { account, created, x, z }}
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{created}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{x}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{z}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="text-center text-gray-500">No data to display.</p>
    {/if}
  </div>
{/if}
