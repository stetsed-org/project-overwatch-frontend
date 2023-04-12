<script>
  import Form from './overwatch_form.svelte';
  import Nav from '../../lib/nav.svelte';
  import Footer from '../../lib/footer.svelte';
  import Login from '../../lib/login.svelte';
  import { currentUser, pb} from "../../lib/pocketbase.ts";
</script>

<div>
  <Nav />
</div>

{#if $currentUser}
  <Form />
{:else}
  <Login />
{/if}

<div>
  <Footer />
</div>


