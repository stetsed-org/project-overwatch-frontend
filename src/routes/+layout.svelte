<script>
  import Nav from '../lib/nav.svelte';
  import Footer from '../lib/footer.svelte';
  import "../lib/global.css";
</script>
<div>
  <Nav />
</div>

<slot />

<div>
  <Footer />
</div>

