<template>
	<div class="skeleton"
		v-for="item in lengthItems"
	>
		<div class="skeleton__img skeleton__anim"></div>
		<div class="skeleton__text skeleton__anim"></div>
		<div class="skeleton__text skeleton__anim"></div>
		<div class="skeleton__button skeleton__anim"></div>
	</div>
</template>

<script>
	export default {
		name: "Skeleton",
		props: {
			lengthItems: {
				type: Number,
				default: 1,
				required: true
			}
		}
	}
</script>

<style lang="scss">
	.skeleton {
		height: 470px;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 32px;
		
		&__anim {
			background: #eee;
			background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
			background-size: 200% 100%;
			animation: 1s shine linear infinite;
			border-radius: 1px;
		}
		
		&__img {
			height: 200px;
			margin-bottom: 30px;
		}
		
		&__text {
			height: 20px;
			margin-bottom: 20px;
		}
		
		&__button {
			width: 124px;
			height: 50px;
			border-radius: 8px;
		}
		
		@keyframes shine {
			to {
				background-position-x: -200%;
			}
		}
		
	}
</style>
