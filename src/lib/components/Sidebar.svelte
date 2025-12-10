<script>
  import Icon from '@iconify/svelte';
  import { navData, selectedPath } from '$lib/stores.js';
  import { locale, m } from '$lib/i18n.js';
  import SidebarItem from './SidebarItem.svelte';

  function handleSelectAllSites() {
    selectedPath.set(['allSites']);
  }

  $: isAllSitesSelected = $selectedPath[0] === 'allSites';
  $: allSitesLabel = ($locale, m.allSites());
</script>

<div class="p-4">
  <ul class="menu w-full">
    <!-- All Sites -->
    <li>
      <button
        class="flex items-center gap-2 {isAllSitesSelected ? 'active' : ''}"
        on:click={handleSelectAllSites}
      >
        <Icon icon="mdi:view-grid" class="text-lg" />
        <span>{allSitesLabel}</span>
      </button>
    </li>

    <!-- Divider -->
    <div class="divider m-1"></div>

    <!-- Navigation Items -->
    {#each navData.filter(item => !item.isAllSites) as item}
      <SidebarItem {item} path={[item.title]} />
    {/each}
  </ul>
</div>
