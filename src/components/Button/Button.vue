<template>
	<div
		class="button"
		:class="classes"
	>
		{{ title }}
		
		<slot></slot>
	</div>

</template>

<script>
	export default {
		name: "Button",
		props: {
			title: {
				type: String,
			},
			kind: {
				type: String,
			},
			size: {
				type: String,
			},
			disabled: {
				type: Boolean,
				default: true
			}
		},
		computed:{
			classes(){
				return {
					'button--bordered': this.kind === 'bordered',
					'button--square': this.size === 'square',
					'button--disabled': this.disabled === false,
				}
			}
		}
	}
</script>

<style lang="scss">
	
	@import "../../assets/variables";
	
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 44px;
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
			@media (hover: hover) {
				background-color: darken($green, 10%);
				
				.icon {
					fill: #fff;
				}
			}
		}
		
		&--disabled {
			opacity: 0.5;
			pointer-events: none;
		}
		
		&--bordered {
			border: 1px solid $green;
			background-color: #fff;
			color: $green;
			
			&:hover {
				@media (hover: hover) {
					color: #fff;
				}
			}
			
		}
		
		&--square {
			width: 44px;
			padding: 0;
		}
		
		.icon {
			width: 24px;
			height: 24px;
		}
	}
</style>
