<template>
	<router-link
		class="link"
		:to="to"
	>
		{{title}}
	</router-link>
</template>

<script>
	export default {
		name: "Link",
		props: {
			title: {
				type: String,
				required: true
			},
			to: {
				type: String,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	@import "../../assets/variables";
	
	.link {
		display: inline-flex;
		color: $dark;
		text-decoration: none;
		position: relative;
		font-size: 18px;
		line-height: 18px;
		border-bottom: 2px solid $dark;
	}
</style>
