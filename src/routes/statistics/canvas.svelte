<script lang="ts">
  import { onMount } from 'svelte';
  import { currentUser, pb} from "../../lib/pocketbase.ts";

  let responseData: any[] = [];
  let formSubmitted: boolean = false;
  let username: string = "";
  let startTime: string = "";

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  const width = 1000;
  const height = 504;
  const maxXCoordinateValue = 12250;
  const maxZCoordinateValue = 6000;

  function normalizeX(value: number) {
    return (value + maxXCoordinateValue) / (2 * maxXCoordinateValue);
  }

  function normalizeZ(value: number) {
    return (value + maxZCoordinateValue) / (2 * maxZCoordinateValue);
  }

  function plotCoordinates() {
    context = canvas.getContext('2d');
    context.clearRect(0, 0, width, height);

    responseData.forEach(({ x, z, ..._ }) => {
      const xx = normalizeX(x) * width;
      const yy = normalizeZ(z) * height;

      context.beginPath();
      context.arc(xx, yy, 2, 0, 2 * Math.PI);
      context.fillStyle = 'black';
      context.fill();
      context.closePath();
    });
  }

  async function fetchData() {
    event.preventDefault();
    try {
      let filter = `account ~ '${username}'`;
      if (startTime) {
        filter += ` && created > '${startTime}'`;
      }
      const nestedData = await pb.collection('global').getFullList({
          filter: filter,
        });
      responseData = nestedData.flat();
      console.log(responseData);
      formSubmitted = true;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  $: if (formSubmitted && canvas) {
    context = canvas.getContext('2d');
    plotCoordinates();
  }

  const handleChangeName = () => {
      formSubmitted = false;
    };
</script>

{#if !formSubmitted}
  <form on:submit={fetchData}>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="username">
        <span class="label-text">Username</span>
      </label>
      <input type="text" id="username" class="input input-bordered w-full max-w-xs" placeholder="Username" bind:value={username} />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label" for="startTime">
        <span class="label-text">Start Time(Optional)</span>
      </label>
      <input type="datetime-local" id="startTime" class="input input-bordered w-full max-w-xs" bind:value={startTime}/>
    </div>
    <button type="submit" class="btn btn-md sm:btm-sm md:btm-md lg:btn-lg" >Submit</button>
  </form>
{:else}
<div class="container mx-auto p-4 justify-center">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" on:click={handleChangeName}>Change Information</button>
    {#if responseData.length > 0}
      {#if formSubmitted}
        <div class="bg-[url('map.png')] w-[1000px]">
          <canvas bind:this={canvas} width={width} height={height} style="border: 1px solid;"></canvas>
        </div>
      {/if} 
    {:else}
      <p class="text-center text-gray-500">No data found</p>
    {/if}
</div>
{/if}

