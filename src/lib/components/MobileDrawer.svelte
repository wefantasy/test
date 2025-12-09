<script>
  import Icon from '@iconify/svelte';
  import { mobileMenuOpen } from '$lib/stores.js';
  import { t } from '$lib/i18n.js';
  import Sidebar from './Sidebar.svelte';

  function handleClose() {
    mobileMenuOpen.set(false);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="fixed inset-0 z-50 lg:hidden">
  <!-- Backdrop - Click to close -->
  <div
    class="absolute inset-0 bg-black/50"
    on:click={handleClose}
  ></div>

  <!-- Drawer -->
  <div class="absolute left-0 top-0 h-full w-64 bg-base-100 shadow-xl">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-base-200">
      <span class="text-lg font-bold text-primary">Collector</span>
      <button
        class="btn btn-ghost btn-square btn-sm"
        on:click={handleClose}
        aria-label={$t('closeMenu')}
      >
        <Icon icon="mdi:close" class="text-lg" />
      </button>
    </div>

    <!-- Sidebar Content -->
    <div class="overflow-y-auto h-[calc(100%-4rem)]">
      <Sidebar />
    </div>
  </div>
</div>
