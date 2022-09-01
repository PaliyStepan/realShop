<template>
	<label class="tab-label" :class="classes">
		<input
			class="tab-label__input"
			type="radio"
			:value="value"
			:checked="value === modelValue"
			@change="$emit('update:modelValue', $event.target.value)"
		>
		<span class="tab-label__text">
			<slot></slot>
		</span>
	</label>
</template>

<script>
	export default {
		name: "TabLabel",
		props: {
			value: {
				type: String,
				default: null
			},
			modelValue: {
				type: String,
				default: null
			},
			size: {
				type: String
			}
		},
		computed:{
			classes(){
				return {
					'tab-label--sm': this.size === 'sm',
				}
			}
		}
		
	}
</script>

<style lang="scss">
	.tab-label {
		display: inline-flex;
		position: relative;
		
		&__input {
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
			height: 0;
			width: 0;
		}
		
		&__input:checked + &__text{
			border-color: orangered;
		}
		
		&__text {
			display: flex;
			align-items: center;
			padding-left: 24px;
			padding-right: 24px;
			height: 60px;
			border: 2px solid #ddd;
			border-radius: 4px;
			cursor: pointer;
			transition: border-color 0.3s ease;
		}
		
		&--sm &__text {
			height: 40px;
			padding-left: 12px;
			padding-right: 12px;
			font-size: 16px;
		}
	}
</style>
