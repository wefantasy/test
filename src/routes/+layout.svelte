<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { initTheme } from '$lib/stores.js';

  onMount(() => {
    initTheme();
  });
</script>

<slot />
