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
	import { mapActions, mapGetters } from 'vuex'

	export default {
		components: {
			AppHeader
		},
		data: () => ({
		}),
		methods: {
			...mapActions('cart', ['GET_CART_FORM_API']),
		},
		mounted() {
			this.GET_CART_FORM_API();
		}
	}
</script>

<style lang="scss">

</style>
