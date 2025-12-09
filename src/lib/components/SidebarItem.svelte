<script>
  import Icon from '@iconify/svelte';
  import { selectedPath } from '../stores.js';

  export let item;
  export let path = [];
  export let expandedFolders = {};

  $: pathKey = path.join('/');
  $: isExpanded = expandedFolders[pathKey] || false;
  $: isSelected = JSON.stringify($selectedPath) === JSON.stringify(path);

  function handleToggle(e) {
    e.stopPropagation();
    if (item.type === 'folder') {
      expandedFolders[pathKey] = !isExpanded;
      expandedFolders = expandedFolders;
    }
  }

  function handleSelect() {
    selectedPath.set(path);
    if (item.type === 'folder') {
      expandedFolders[pathKey] = true;
      expandedFolders = expandedFolders;
    }
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
      {#if item.children && item.children.length > 0}
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
            <svelte:self item={child} path={[...path, child.title]} bind:expandedFolders />
          {/if}
        {/each}
      </ul>
    {/if}
  {/if}
</li>
