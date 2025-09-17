<script lang="ts">
  import favicon from '$lib/assets/favicon.ico';
  import Navbar from '$lib/components/nav/navbar.svelte';
  import "../style.css";
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

<slot />
