<script>
  import Icon from '@iconify/svelte';

  export let site;
  export let matches = null;

  let imgError = false;

  function getHostname(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return '';
    }
  }

  function getFaviconUrl(url, icon) {
    if (icon) return icon;
    const hostname = getHostname(url);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  }

  function highlightText(text, matchIndices) {
    if (!matchIndices || matchIndices.length === 0) return [{ text, highlight: false }];

    let result = [];
    let lastIndex = 0;

    const sortedIndices = [...matchIndices].sort((a, b) => a[0] - b[0]);

    for (const [start, end] of sortedIndices) {
      if (start > lastIndex) {
        result.push({ text: text.slice(lastIndex, start), highlight: false });
      }
      result.push({ text: text.slice(start, end + 1), highlight: true });
      lastIndex = end + 1;
    }

    if (lastIndex < text.length) {
      result.push({ text: text.slice(lastIndex), highlight: false });
    }

    return result;
  }

  function getMatchIndicesForKey(key) {
    if (!matches) return null;
    const match = matches.find(m => m.key === key);
    return match ? match.indices : null;
  }

  $: titleSegments = highlightText(site.title || '', getMatchIndicesForKey('title'));
  $: descSegments = highlightText(site.description || '', getMatchIndicesForKey('description'));

  function handleImgError() {
    imgError = true;
  }
</script>

<div class="card bg-base-100 border border-base-200 hover:border-primary/50 hover:shadow-lg transition-all duration-200">
  <div class="card-body p-4 ">
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      class="group"
    >
    <!-- Header: Icon + Title -->
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 w-8 h-8 rounded overflow-hidden flex items-center justify-center">
        {#if !imgError}
          <img
            src={getFaviconUrl(site.url, site.icon)}
            alt=""
            class="w-full h-full object-contain rounded-full transition-transform duration-500 group-hover:rotate-[360deg]"
            on:error={handleImgError}
          />
        {:else}
          <Icon icon="mdi:web" class="text-lg text-base-content/50 transition-transform duration-500 group-hover:rotate-[360deg]" />
        {/if}
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="line-clamp-1 ">
          {#each titleSegments as segment}
            {#if segment.highlight}
              <span class="text-error">{segment.text}</span>
            {:else}{segment.text}{/if}
          {/each}
        </h3>
        <p class="text-sm text-base-content/50 truncate">
          {getHostname(site.url)}
        </p>
      </div>
    </div>
  </a>

    <!-- Description -->
    <p class="text-sm text-secondary line-clamp-3 underline decoration-dotted underline-offset-2">
      {#each descSegments as segment}
        {#if segment.highlight}
          <span class="text-error">{segment.text}</span>
        {:else}{segment.text}{/if}
      {/each}
    </p>
  </div>
</div>
