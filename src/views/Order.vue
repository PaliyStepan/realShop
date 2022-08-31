<template>
	<section class="section">
		<div class="container">
			<form action="" @submit.prevent>
				
				<div class="order-steps">
					
					<div class="order-step">
						
						<div class="order-step__header">
							<h4>
								1. &nbsp;
								Контактные данные
							</h4>
						</div>
						<div class="order-step__group">
<!--							<form-input-->
<!--								placeholder="Имя"-->
<!--								v-model="user.name"-->
<!--								label="Имя"-->
<!--								:invalid="v$.user.name.$dirty && !v$.email.required"-->
<!--							/>-->
							
							<input type="text"
						       v-model="user.name"
						       :class="{'fuck': v$.user.name.$dirty && !v$.email.required}"
							>
							
							
							<form-input
								placeholder="Фамилия"
								v-model="user.lastName"
								label="Фамилия"
							/>
							<form-input
								placeholder="Телефон"
								v-model="user.phone"
								label="Телефон"
							/>
							<form-input
								placeholder="Email"
								v-model="user.email"
								label="Email"
							/>
						</div>
						
						<app-button
							title="Жми"
							@click="submitFirstStep"
							:disabled="isUserValid"
						/>
						
						{{!isUserValid}}
					</div>
					
					
					<div class="order-step">
						
						<div class="order-step__header">
							<h4>
								2. &nbsp;
								Способ получения
							</h4>
						</div>
						
						<app-check-label value="shop" v-model="receiving">
							Магазин
						</app-check-label>
						<app-check-label value="delivery" v-model="receiving">
							Доставка
						</app-check-label>
						
						{{isReceiving}}
						
						<div class="order-step__tabs">
							<div class="order-step__tab" v-if="isReceiving">
								<div class="order-step__group">
									<form-input
										placeholder="Имя"
										label="Имя"
									/>
									
									<form-input
										placeholder="Фамилия"
									/>
								</div>
							</div>
							<div class="order-step__tab" v-else>
								<div class="order-step__group">
									<form-input
										placeholder="Адрес"
										label="Имя"
									/>
									<form-input
										placeholder="Фамилия"
									/>
									
								</div>
							</div>
						</div>
						
						
					</div>
					
				</div>
				
			</form>
		</div>
	</section>
</template>

<script>
	
	import AppButton from "../components/Button/Button";
	import AppCheckLabel from "../components/CheckLabel/CheckLabel";
	import useValidate from '@vuelidate/core';
	import FormInput from "../components/FormInput/FormInput";
	import { required, email, minLength, sameAs, numeric } from '@vuelidate/validators';

	export default {
		components: {
			FormInput,
			AppButton,
			AppCheckLabel,
		},
		data: () => ({
			activeStep: 1,
			receiving: 'shop',
			v$: useValidate(),
			
			
			user: {
				name: '',
				lastName: '',
				email: '',
				phone: '',
			},
			shop: {
			
			},
			address: {
				city: '',
				street: '',
				building: '',
				frame: '',
				entrance: '',
				floor: '',
				flat: '',
			},
			
			password: {
				password: '',
				confirm: '',
			},
			
			steps: [
			
			]
		}),
		methods: {
			submitFirstStep() {
				
				// this.v$.$validate()
				// if (!this.v$.$error) {
				// 	console.log('ok')
				// } else {
				// 	console.log('not ok')
				// }
				

				if (this.v$.user.$invalid) {
					console.log('-')
				} else {
					console.log('+')
				}
				
				
				
			},
		},
		computed: {
			isReceiving(){
				return this.receiving === 'shop'
			},
			isUserValid(){
				return this.v$.user.$invalid;
			}
		},
		validations() {
			return {
				// email: { required, email},
				// password: {
				// 	password: { required, minLength: minLength(6) },
				// 	confirm: { required, sameAs: sameAs(this.password.password) },
				// },

				user: {
					name: {required},
					lastName: {required},
					phone: { required },
					email: { required, email}
				},

				address: {
					city: '',
					street: '',
					building: '',
					frame: '',
					entrance: '',
					floor: '',
					flat: '',
				},
			}
		}
	}
</script>

<style >

</style>
