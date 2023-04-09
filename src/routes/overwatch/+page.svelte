<script>
  import Form from './overwatch_form.svelte';
</script>
<nav class="navbar flex items-center justify-between flex-wrap bg-gray-800 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <span class="font-semibold text-xl tracking-tight">TDEI Overwatch System
    </span>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-sm lg:flex-grow">
      <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
        Home
      </a>
      <a href="/overwatch" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
        Overwatch
      </a>
    </div>
  </div>
</nav>

<div>
  <Form />
</div>

