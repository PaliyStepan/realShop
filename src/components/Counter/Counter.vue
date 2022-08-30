<template>
	<div class="counter">
		<div class="counter__btn counter__btn--minus">-</div>
		<input type="text" class="counter__input" :value="number">
		<div class="counter__btn counter__btn--plus">+</div>
	</div>
</template>

<script>
	export default {
		name: "Counter",
		props: {
			number: {
				type: Number,
				required: true,
				default: 1
			}
		}
	}
</script>

<style lang="scss">
	
	@import "../../assets/variables";
	
	.counter {
		display: flex;
		align-items: center;
		
		&__input {
			border: none;
			width: 100px;
			text-align: center;
		}
		
		&__btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 40px;
			height: 40px;
			border: 1px solid $green;
			cursor: pointer;
			border-radius: 4px;
			transition: background-color 0.3s ease, color 0.3s ease;
			
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			
		}
		
		&__btn--minus {
			border-color: $green;
			
			&:hover {
				@media (hover: hover) {
					background-color: $green;
					color: #fff;
				}
			}
		}
		
		&__btn--plus {
			background-color: $green;
			color: #fff;
			
			&:hover {
				@media (hover: hover) {
					background-color: #fff;
					color: $dark;
				}
			}
			
		}
	}
</style>
