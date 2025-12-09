<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let showButton = false;

  function handleScroll() {
    showButton = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

{#if showButton}
  <button
    class="fixed bottom-6 right-6 btn btn-circle btn-primary shadow-lg z-50 transition-all duration-300"
    on:click={scrollToTop}
    aria-label="回到顶部"
  >
    <Icon icon="mdi:chevron-up" class="text-2xl" />
  </button>
{/if}
