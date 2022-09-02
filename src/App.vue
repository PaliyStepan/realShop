<template>
	<div id="app">
		<app-header/>
		<main class="main">
			<router-view v-slot="{Component}">
				<transition name="route" mode="out-in">
					<component :is="Component">
					</component>
				</transition>
			</router-view>
		</main>
	</div>
</template>

<script>
	import AppHeader from "./components/Header/Header";

	export default {
		components: {
			AppHeader
		}
	}
</script>

<style lang="scss">
	.route-enter-from,
	.route-leave-to {
		opacity: 0;
	}
	
	.route-enter-active,
	.route-leave-active {
		transition: all 0.2s ease-out ;
	}

</style>
