<template>
	<div class="label">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: "Label"
	}
</script>

<style lang="scss">
	.label {
		display: inline-flex;
		align-items: center;
		background-color: red;
		color: #fff;
		padding: 0 10px;
		font-size: 12px;
		border-radius: 4px;
		height: 22px;
	}
</style>
