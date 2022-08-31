<template>
	<label class="check-label">
		<input
			type="radio"
			:value="value"
			:checked="value === modelValue"
			@change="$emit('update:modelValue', $event.target.value)"
		>
		<span class="check-label__text">
			<slot></slot>
		</span>
	</label>
</template>

<script>
	export default {
		name: "CheckLabel",
		props: {
			value: {
				type: String,
				default: null
			},
			modelValue: {
				type: String,
				default: null
			}
		}
	}
</script>

<style scoped>

</style>
