<script>
  import Navbar from './lib/components/Navbar.svelte';
  import Sidebar from './lib/components/Sidebar.svelte';
  import ContentArea from './lib/components/ContentArea.svelte';
  import Footer from './lib/components/Footer.svelte';
  import MobileDrawer from './lib/components/MobileDrawer.svelte';
  import { mobileMenuOpen } from './lib/stores.js';
</script>

<div class="min-h-screen flex flex-col">
  <!-- Navbar -->
  <Navbar />

  <!-- Main Content -->
  <div class="flex-1 flex">
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:block w-64 border-r border-base-200 bg-base-100">
      <Sidebar />
    </aside>

    <!-- Content Area -->
    <main class="flex-1 overflow-auto">
      <ContentArea />
    </main>
  </div>

  <!-- Footer -->
  <Footer />

  <!-- Mobile Drawer -->
  {#if $mobileMenuOpen}
    <MobileDrawer />
  {/if}
</div>
