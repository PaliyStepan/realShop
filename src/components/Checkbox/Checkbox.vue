<template>
	<div class="checkbox">
		<label class="checkbox__label">
			<input type="checkbox"
		       class="checkbox__input"
		       :value="value"
		       :checked="modelValue.includes(value)"
		       @change="evt => onChange(evt.target.value)"
			>
			<span class="checkbox__custom">
				<AppIcon name="check"/>
			</span>
				<span class="checkbox__text">
				{{title}}
			</span>
		</label>
	</div>
	
</template>

<script>
	import AppIcon from "../Icon/Icon";
	
	export default {
		name: "Checkbox",
		components: {
			AppIcon
		},
		props: {
			title: {
				type: String,
			},
			value: {
				type: String,
				default: null
			},
			modelValue: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			onChange(value) {
				if (this.modelValue.includes(this.value)) {
					this.$emit('update:modelValue', this.modelValue.filter(cv => cv !== value))
				}
				else {
					this.$emit('update:modelValue', this.modelValue.concat(value))
				}
			}
		}
	}
</script>

<style lang="scss">
	.checkbox {
		
		&__label {
			display: inline-flex;
			align-items: center;
			cursor: pointer;
			position: relative;
		}
		
		&__input {
			position: absolute;
			top: 0;
			left: 0;
			width: 0;
			height: 0;
			opacity: 0;
		}
		
		&__input:checked + &__custom {
			.icon {
				opacity: 1;
			}
		}
		
		&__custom {
			position: relative;
			width: 20px;
			height: 20px;
			border: 2px solid #ddd;
			border-radius: 4px;
			margin-right: 10px;
			
			.icon {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 20px;
				height: 20px;
				opacity: 0;
				transition: opacity 0.3s ease;
			}
		}
	}
</style>
