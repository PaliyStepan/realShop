<template>
	<div id="app">
		<app-header/>
		<main class="main">
			<router-view/>
		</main>
	</div>
</template>

<script>
	import AppHeader from "./components/Header/Header";

	export default {
		components: {
			AppHeader
		},
		data: () => ({
		}),
		computed: {
		
		}
	}
</script>

<style lang="scss">

</style>
