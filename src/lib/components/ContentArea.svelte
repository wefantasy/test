<script>
  import Icon from '@iconify/svelte';
  import { currentContent, selectedPath, searchQuery, searchResults } from '../stores.js';
  import { t } from '../i18n.js';
  import SiteCard from './SiteCard.svelte';
  import FolderCard from './FolderCard.svelte';

  $: breadcrumb = $selectedPath[0] === 'allSites'
    ? [$t('allSites')]
    : ['Root', ...$selectedPath];

  function handleBreadcrumbClick(index) {
    if (index === 0 && $selectedPath[0] !== 'allSites') {
      selectedPath.set(['allSites']);
    } else if ($selectedPath[0] === 'allSites') {
      return;
    } else {
      selectedPath.set($selectedPath.slice(0, index));
    }
  }
</script>

<div class="p-4 lg:p-6">
  <!-- Breadcrumb -->
  <div class="text-sm breadcrumbs mb-4">
    <ul>
      {#each breadcrumb as crumb, index}
        <li>
          {#if index < breadcrumb.length - 1}
            <button
              class="link link-hover"
              on:click={() => handleBreadcrumbClick(index)}
            >
              {crumb}
            </button>
          {:else}
            <span>{crumb}</span>
          {/if}
        </li>
      {/each}
    </ul>
  </div>

  <!-- Search Results or Normal Content -->
  {#if $searchQuery && $searchResults}
    {#if $searchResults.length === 0}
      <div class="flex flex-col items-center justify-center py-16 text-base-content/50">
        <Icon icon="mdi:file-search-outline" class="text-6xl mb-4" />
        <p>{$t('noResults')}</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each $searchResults as result}
          <SiteCard site={result.item} matches={result.matches} />
        {/each}
      </div>
    {/if}
  {:else}
    <!-- Folders -->
    {#if $currentContent.folders.length > 0}
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-6">
        {#each $currentContent.folders as folder}
          <FolderCard {folder} />
        {/each}
      </div>
    {/if}

    <!-- Sites -->
    {#if $currentContent.sites.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each $currentContent.sites as site}
          <SiteCard {site} />
        {/each}
      </div>
    {:else if $currentContent.folders.length === 0}
      <div class="flex flex-col items-center justify-center py-16 text-base-content/50">
        <Icon icon="mdi:folder-open-outline" class="text-6xl mb-4" />
        <p>{$t('noResults')}</p>
      </div>
    {/if}
  {/if}
</div>
