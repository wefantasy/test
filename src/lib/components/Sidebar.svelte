<script>
  import Icon from '@iconify/svelte';
  import { navData, selectedPath } from '$lib/stores.js';
  import { t } from '$lib/i18n.js';
  import SidebarItem from './SidebarItem.svelte';

  function handleSelectAllSites() {
    selectedPath.set(['allSites']);
  }

  $: isAllSitesSelected = $selectedPath[0] === 'allSites';
</script>

<div class="p-4">
  <ul class="menu menu-sm w-full">
    <!-- All Sites -->
    <li>
      <button
        class="flex items-center gap-2 {isAllSitesSelected ? 'active' : ''}"
        on:click={handleSelectAllSites}
      >
        <Icon icon="mdi:view-grid" class="text-lg" />
        <span>{$t('allSites')}</span>
      </button>
    </li>

    <!-- Divider -->
    <li class="my-2">
      <div class="h-px bg-base-200"></div>
    </li>

    <!-- Navigation Items -->
    {#each navData.filter(item => !item.isAllSites) as item}
      <SidebarItem {item} path={[item.title]} />
    {/each}
  </ul>
</div>
