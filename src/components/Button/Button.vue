<template>
	<button
		class="button"
	>
		{{ title }}
	</button>

</template>

<script>
	export default {
		name: "Button",
		props: {
			title: {
				type: String,
				required: true,
				default: 'Кнопка'
			},
		},
		computed:{
			isDisabled(){
				return !this.disabled
			}
		}
	}
</script>

<style lang="scss">
	.button {
		display: inline-flex;
		align-items: center;
		height: 50px;
		background-color: $green;
		padding-left: 20px;
		padding-right: 20px;
		border-radius: 4px;
		color: #fff;
		transition: background-color 0.3s ease;
		cursor: pointer;
		border: none;
		font-size: 16px;
		
		&:hover {
			background-color: darken($green, 10%);
		}
		
		&[disabled] {
			background-color: red;
		}
	}
</style>
