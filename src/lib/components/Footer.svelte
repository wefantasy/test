<script>
  import { locale, m } from '$lib/i18n.js';

  $: copyrightLabel = ($locale, m.copyright());
</script>

<footer class="footer footer-center p-4 bg-base-100 text-base-content border-t border-base-200">
  <aside>
    <p class="text-sm text-base-content/50">{copyrightLabel}</p>
  </aside>
</footer>
