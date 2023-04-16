<script>
  import Form from './overwatch_form.svelte';
  import Login from '../../lib/login.svelte';
  import { currentUser, pb} from "../../lib/pocketbase.ts";
</script>

{#if $currentUser}
  <Form />
{:else}
  <Login />
{/if}
