<script lang="ts">
  import { onMount } from 'svelte';
  import { currentUser, pb} from "../../lib/pocketbase.ts";
  let xCoordinate: number;
  let zCoordinate: number;
  let startTime: string;
  let responseData: any[] = [];
  let formSubmitted: boolean = false;
  let amount_of_records: number = 0;
  let responseDataa: any[] = [];

  onMount(async () => {
    const resultListt = await pb.collection('global_amount').getList(1, 1);
    responseDataa = resultListt.items;

    for (let i = 0; i < responseDataa.length; i++) {
      amount_of_records = responseDataa[i].amount;
    }
  });

  const handleSubmit = async (event: Event) => {
    const filter = `x > ${xCoordinate - 20} && x < ${xCoordinate + 20} && z > ${zCoordinate - 20} && z < ${zCoordinate + 20} && created > "${startTime}"`;
    responseData = await pb.collection('global').getFullList({
      filter: filter,
    });
    formSubmitted = true;
  };

  const handleChangeCoordinates = () => {
    formSubmitted = false;
  };
</script>

{#if !formSubmitted}
  <div class="stats shadow">  
    <div class="stat">
      <div class="stat-figure text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
      </div>
      <div class="stat-title">Amount of Entries</div>
      <div class="stat-value text-secondary">{amount_of_records}</div>
    </div>
  </div>
  <form on:submit={handleSubmit}>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="xCoordinate">
        <span class="label-text">X-Coordinate</span>
      </label>
      <input type="number" id="xCoordinate" placeholder="Enter X Coordinate" class="input input-bordered w-full max-w-xs" bind:value={xCoordinate} required />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="zCoordinate">
        <span class="label-text">Z-Coordinate</span>
      </label>
      <input type="number" id="zCoordinate" placeholder="Enter Z Coordinate" class="input input-bordered w-full max-w-xs" bind:value={zCoordinate} required />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="startTime">
        <span class="label-text">Start Time</span>
      </label>
      <input type="datetime-local" id="startTime" class="input input-bordered w-full max-w-xs" bind:value={startTime} required />
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
