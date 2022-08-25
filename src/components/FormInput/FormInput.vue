<template>
	<div class="form-input">
		<input type="text"
			class="form-input__field"
			:placeholder="placeholder"
			:value="modelValue"
			v-on:input="updateValue($event.target.value)"
		>
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
	}
</style>
