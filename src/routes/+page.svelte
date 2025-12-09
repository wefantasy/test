<script>
  import Navbar from '$lib/components/Navbar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import ContentArea from '$lib/components/ContentArea.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import MobileDrawer from '$lib/components/MobileDrawer.svelte';
  import BackToTop from '$lib/components/BackToTop.svelte';
  import { mobileMenuOpen } from '$lib/stores.js';
</script>

<svelte:head>
  <title>Collector - 网址导航</title>
  <meta name="description" content="一个现代化的网址导航页面" />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <!-- Navbar -->
  <Navbar />

  <!-- Main Content -->
  <div class="flex-1 flex relative">
    <!-- Desktop Sidebar - Fixed -->
    <aside class="hidden lg:block w-64 flex-shrink-0">
      <div class="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] border-r border-base-200 bg-base-100 overflow-y-auto">
        <Sidebar />
      </div>
    </aside>

    <!-- Content Area -->
    <main class="flex-1 min-h-[calc(100vh-4rem)]">
      <ContentArea />
    </main>
  </div>

  <!-- Footer -->
  <Footer />

  <!-- Mobile Drawer -->
  {#if $mobileMenuOpen}
    <MobileDrawer />
  {/if}

  <!-- Back to Top -->
  <BackToTop />
</div>
