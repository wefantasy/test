<script>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { fly, fade } from 'svelte/transition';
	import { theme, toggleTheme, searchQuery, mobileMenuOpen, mobileSearchOpen } from '$lib/stores.js';
	import { locale, m } from '$lib/i18n.js';

	let searchInputDesktop;
	let searchInputMobile;

	function handleToggleMenu() {
		mobileMenuOpen.update((v) => !v);
	}

	function handleToggleSearch() {
		mobileSearchOpen.update((v) => !v);
	}

	function handleToggleLocale() {
		locale.toggle();
	}

	function handleKeydown(e) {
		// Ignore if user is typing in an input/textarea
		if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
			return;
		}

		if (e.key === '/') {
			e.preventDefault();
			// Check if mobile or desktop
			if (window.innerWidth >= 1024) {
				searchInputDesktop?.focus();
			} else {
				mobileSearchOpen.set(true);
				// Wait for the mobile search bar to render
				setTimeout(() => {
					searchInputMobile?.focus();
				}, 100);
			}
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	// Reactive labels - re-compute when locale changes
	$: openMenuLabel = ($locale, m.openMenu());
	$: searchLabel = ($locale, m.search());
	$: toggleThemeLabel = ($locale, m.toggleTheme());
	$: toggleLanguageLabel = ($locale, m.toggleLanguage());
	$: searchPlaceholder = ($locale, m.searchPlaceholder());
	$: searchPlaceholderShortcut = ($locale, m.searchPlaceholderShortcut());
</script>

<nav class="navbar bg-base-100/95 border-b border-base-200 px-4 lg:px-6 sticky top-0 z-40 shadow">
	<!-- Left: Logo & Mobile Menu -->
	<div class="flex-none lg:hidden">
		<button class="btn btn-ghost btn-square" on:click={handleToggleMenu} aria-label={openMenuLabel}>
			<Icon icon="mdi:menu" class="text-2xl" />
		</button>
	</div>

	<div class="flex-1">
		<a href="/" class="text-xl text-primary">
			<img src="./favicon.svg" class="size-10 inline" alt="Collector Logo" />
			<span class="hidden lg:inline"> Collector </span>
		</a>
	</div>

	<!-- Center: Desktop Search -->
	<div class="hidden lg:flex flex-1 max-w-md mx-4">
		<div class="form-control w-full">
			<div class="relative w-full">
				<span class="absolute left-3 top-1/2 z-30 -translate-y-1/2 text-base-content/50">
					<Icon icon="mdi:magnify" class="text-lg" />
				</span>
				<input
					bind:this={searchInputDesktop}
					type="text"
					placeholder={searchPlaceholderShortcut}
					class="input input-bordered w-full pl-10"
					bind:value={$searchQuery}
				/>
			</div>
		</div>
	</div>

	<!-- Right: Actions -->
	<div class="flex-none flex items-center gap-2">
		<!-- Mobile Search Toggle -->
		<button class="btn btn-ghost btn-square lg:hidden" on:click={handleToggleSearch} aria-label={searchLabel}>
			<Icon icon="mdi:magnify" class="text-xl" />
		</button>

		<!-- Theme Toggle -->
		<button class="btn btn-ghost btn-square" on:click={toggleTheme} aria-label={toggleThemeLabel}>
			{#if $theme === 'corporate'}
				<Icon icon="mdi:weather-sunny" class="text-xl" />
			{:else}
				<Icon icon="mdi:weather-night" class="text-xl" />
			{/if}
		</button>

		<!-- Language Toggle -->
		<button class="btn btn-ghost btn-sm px-2" on:click={handleToggleLocale} aria-label={toggleLanguageLabel}>
			{#if $locale === 'zh'}
				<span class="text-sm font-medium">EN</span>
			{:else}
				<span class="text-sm font-medium">ZH</span>
			{/if}
		</button>

		<!-- GitHub Link -->
		<a href="https://github.com/wefantasy/collector" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-square">
			<Icon icon="mdi:github" class="text-xl" />
		</a>
	</div>
</nav>

<!-- Mobile Search Bar -->
{#if $mobileSearchOpen}
	<div class="lg:hidden px-4 py-2 bg-base-100 border-b border-base-200">
		<div class="form-control w-full">
			<div class="relative w-full">
				<span class="absolute left-3 top-1/2 z-30 -translate-y-1/2 text-base-content/50">
					<Icon icon="mdi:magnify" class="text-lg" />
				</span>
				<input bind:this={searchInputMobile} type="text" placeholder={searchPlaceholder} class="input input-bordered w-full pl-10" bind:value={$searchQuery} />
			</div>
		</div>
	</div>
{/if}
