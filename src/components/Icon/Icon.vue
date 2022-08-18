<template>
	<svg class="icon" :class="className">
		<use :xlink:href=iconName></use>
	</svg>
</template>

<script>
	export default {
		name: "Icon",
		props: {
			name: {
				type: String,
				required: true,
				default: ''
			},
			classes:{
				type: String,
			}
		},
		computed: {
			iconName(){
				return '#icon-' + `${this.name}`
			},
			className(){
				if (this.classes) {
					return `${this.classes}`
				}
			}
		}
	}
</script>

<style scoped>

</style>
