<script>
  import Icon from '@iconify/svelte';
  import { selectedPath } from '$lib/stores.js';

  export let folder;

  function handleClick() {
    selectedPath.update(path => {
      if (path[0] === 'allSites') {
        return [folder.title];
      }
      return [...path, folder.title];
    });
  }
</script>

<button
  class="flex flex-col items-center justify-center p-4 rounded-lg bg-base-100 border border-base-200 hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
  on:click={handleClick}
>
  <Icon icon="mdi:folder" class="text-4xl text-warning mb-2" />
  <span class="text-sm font-medium text-center line-clamp-1">{folder.title}</span>
</button>
