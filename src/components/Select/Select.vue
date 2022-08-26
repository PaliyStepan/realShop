<template>
	<div class="select"
	     :class="{'is-active': isVisible}"
	>
		<div
			class="select__header"
	        @click="changeVisible"
		>
			<div
				v-if="!hasOption"
				class="select__placeholder"
			>
				{{placeholder}}
			</div>
			<div
				v-else
				class="select__title"
			>
				{{hasOption}}
			</div>
			<app-icon name="arrow-left"/>
		</div>
		<Transition>
			<div
					class="select__options"
					v-if="isVisible"
			>
				<div
						class="select__option"
						v-for="option in options"
						@click="selectOption(option)"
				>
					{{option.name}}
				</div>
			</div>
		</Transition>
	</div>
</template>

<script>
	
	import AppIcon from "../Icon/Icon";
	
	export default {
		name: "Select",
		props: {
			placeholder: {
				type: String,
				default: ''
			},
			options: {
				type: Array,
				required: true
			}
		},
		components: {
			AppIcon
		},
		data:()=>({
			isVisible: false,
			hasOption: null
		}),
		methods: {
			changeVisible() {
				this.isVisible = !this.isVisible
			},
			selectOption(option){
				this.$emit('select', option);
				this.hasOption = option.name
			},
			hideSelect(){
				this.isVisible = false
			}
		},
		computed: {
		
		},
		mounted() {
			document.addEventListener('click', this.hideSelect.bind(this), true)
		},
		beforeUnmount() {
			document.removeEventListener('click', this.hideSelect)
		}
		
	}
</script>

<style lang="scss">
	
	@import "../../assets/variables";
	
	.select {
		position: relative;
		z-index: 2;
		
		&__header {
			width: 100%;
			position: relative;
			display: flex;
			align-items: center;
			padding-left: 20px;
			padding-right: 20px;
			border: 1px solid #ddd;
			height: 46px;
			border-radius: 4px;
			cursor: pointer;
			transition: border-color 0.3s ease;
			
			&:hover {
				@media (hover: hover) {
					border-color: $green;
				}
			}
			
			.icon {
				position: absolute;
				right: 10px;
				top: 50%;
				transform: translateY(-50%) rotate(-90deg);
				width: 20px;
				transition: transform 0.3s ease;
			}
		}
		
		&__title {
			font-size: 16px;
			max-width: 100%;
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		
		&__options {
			position: absolute;
			left: 0;
			right: 0;
			z-index: 2;
			border: 1px solid #ddd;
			border-top: none;
			padding: 20px;
			background-color: #fff;
		}
		
		&__option {
			cursor: pointer;
			font-size: 16px;
			margin-bottom: 5px;
			transition: color 0.3s ease;
			
			&:hover {
				@media (hover: hover) {
					color: $green;
				}
			}
			
			&:last-of-type {
				margin-bottom: 0;
			}
		}
		
		&.is-active {
			.icon {
				transform: translateY(-50%) rotate(90deg);
			}
		}
	}
	
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.15s ease;
	}
	
	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
</style>
