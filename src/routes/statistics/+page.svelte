<script>
  import Canvas from './canvas.svelte';
  import Login from '../../lib/login.svelte';
  import { currentUser, pb} from "../../lib/pocketbase.ts";
</script>

{#if $currentUser}
  <Canvas />
{:else}
  <Login />
{/if}
