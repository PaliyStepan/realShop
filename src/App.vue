<template>
	<div id="app">
		<Header/>
		<main class="main">
			<router-view/>
		</main>
	</div>
</template>

<script>
	import Header from "./components/Header";

	export default {
		components: {
			Header
		},
		computed: {
		
		}
	}
</script>

<style lang="scss">

</style>
