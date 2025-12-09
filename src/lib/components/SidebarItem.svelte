<script>
  import Icon from '@iconify/svelte';
  import { selectedPath } from '$lib/stores.js';

  export let item;
  export let path = [];

  $: pathKey = path.join('/');

  // Check if this folder is in the current selected path (should be expanded)
  $: isInSelectedPath = (() => {
    // If "allSites" is selected, nothing should be expanded
    if ($selectedPath[0] === 'allSites') return false;

    // Check if selectedPath starts with this folder's path
    if (path.length > $selectedPath.length) return false;

    for (let i = 0; i < path.length; i++) {
      if (path[i] !== $selectedPath[i]) return false;
    }
    return true;
  })();

  $: isExpanded = isInSelectedPath;
  $: isSelected = JSON.stringify($selectedPath) === JSON.stringify(path);

  function handleToggle(e) {
    e.stopPropagation();
    // Toggle: if currently expanded (selected), go to parent or allSites
    if (isExpanded && isSelected) {
      if (path.length > 1) {
        selectedPath.set(path.slice(0, -1));
      } else {
        selectedPath.set(['allSites']);
      }
    } else {
      selectedPath.set(path);
    }
  }

  function handleSelect() {
    selectedPath.set(path);
  }
</script>

<li>
  {#if item.type === 'folder'}
    <button
      class="flex items-center gap-2 justify-between {isSelected ? 'active' : ''}"
      on:click={handleSelect}
    >
      <span class="flex items-center gap-2">
        <Icon
          icon={isExpanded ? 'mdi:folder-open' : 'mdi:folder'}
          class="text-lg text-warning"
        />
        <span>{item.title}</span>
      </span>
      {#if item.children && item.children.some(c => c.type === 'folder')}
        <button class="p-1" on:click={handleToggle}>
          <Icon
            icon={isExpanded ? 'mdi:chevron-down' : 'mdi:chevron-right'}
            class="text-sm opacity-50"
          />
        </button>
      {/if}
    </button>

    {#if isExpanded && item.children}
      <ul class="ml-2">
        {#each item.children as child}
          {#if child.type === 'folder'}
            <svelte:self item={child} path={[...path, child.title]} />
          {/if}
        {/each}
      </ul>
    {/if}
  {/if}
</li>
