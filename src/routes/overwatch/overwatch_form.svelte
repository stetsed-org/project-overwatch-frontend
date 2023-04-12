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
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">X-Coordinate</span>
      </label>
      <input type="number" placeholder="Enter X Coordinate" class="input input-bordered w-full max-w-xs" bind:value={xCoordinate} required />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Z-Coordinate</span>
      </label>
      <input type="number" placeholder="Enter Z Coordinate" class="input input-bordered w-full max-w-xs" bind:value={zCoordinate} required />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Start Time</span>
      </label>
      <input type="datetime-local" class="input input-bordered w-full max-w-xs" bind:value={startTime} required />
    </div>
    <button class="btn btn-md sm:btn-sm md:btn-md lg:btn-lg rounded" type="submit">Submit</button>
  </form>
{:else}
  <div class="container mx-auto p-4">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" on:click={handleChangeCoordinates}>Change Coordinates</button>
    {#if responseData.length > 0}
      <table class="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>X</th>
            <th>Z</th>
          </tr>
        </thead>
        <tbody>
          {#each responseData as { account, created, x, z }}
            <tr class="hover">
              <td>{account}</td>
              <td>{created}</td>
              <td>{x}</td>
              <td>{z}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p class="text-center text-gray-500">No data to display.</p>
    {/if}
  </div>
{/if}
