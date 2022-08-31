<template>
	<div class="form-input">
		<div class="form-input__label" v-if="label">
			{{label}}
		</div>
		<input type="text"
			class="form-input__field"
			:placeholder="placeholder"
			:value="modelValue"
			v-on:input="updateValue($event.target.value)"
		>
		{{invalid}}
	</div>
	
</template>

<script>
	export default {
		name: "FormInput",
		props: {
			placeholder:{
				type: String
			},
			modelValue: {
				type: [String, Number]
			},
			label: {
				type: String
			},
			invalid: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			updateValue(event) {
				this.$emit('update:modelValue', event);
			},
		}
	}
</script>

<style lang="scss">
	
	@import "../../assets/variables";
	
	.form-input {
	
		&__field {
			 width: 100%;
			 height: 46px;
			 border: 1px solid #ddd;
			 padding: 0 20px;
			 border-radius: 4px;
			 transition: border-color 0.3s ease;
			font-size: 16px;
		
			&:focus {
			    border-color: $dark;
			}
		}
		
		&__label {
			margin-bottom: 4px;
			font-size: 14px;
			padding-left: 20px;
		}
	}
</style>
