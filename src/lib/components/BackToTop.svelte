<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  import { locale, m } from '$lib/i18n.js';

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

  $: backToTopLabel = ($locale, m.backToTop());
</script>

{#if showButton}
  <button
    class="fixed bottom-6 right-6 btn btn-circle btn-soft btn-secondary shadow-lg z-50 transition-all duration-300"
    on:click={scrollToTop}
    aria-label={backToTopLabel}
  >
    <Icon icon="mdi:chevron-up" class="text-2xl" />
  </button>
{/if}
