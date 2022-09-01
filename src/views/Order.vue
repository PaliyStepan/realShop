<template>
	<section class="section">
		<div class="container">
			<form action="" @submit.prevent>
				
				<div class="order-steps">
					<div class="order-step" v-if="activeStep === 1">
						<div class="order-step__header">
							<h4>
								1. &nbsp;
								Контактные данные
							</h4>
						</div>
						<div class="order-step__items">
							<div class="order-step__row">
								<div class="order-step__col">
									<div class="form-input">
										<div class="form-input__label" >
											Имя
										</div>
										<input type="text"
											class="form-input__field"
											v-model.trim="user.name"
											@blur="v$.user.name.$touch()"
											:class="{'is-error' : v$.user.name.$error}"
										>
										<div class="form-input__error" v-if="errorName.length">
											<p v-for="(error,index) in errorName" :key="index">
												{{error}}
											</p>
										</div>
									</div>
								</div>
								<div class="order-step__col">
									<div class="form-input">
										<div class="form-input__label" >
											Фамилия
										</div>
										<input type="text"
									       class="form-input__field"
									       v-model.trim="user.lastName"
									       @blur="v$.user.lastName.$touch()"
									       :class="{'is-error' : v$.user.lastName.$error}"
										>
										<div class="form-input__error" v-if="errorLastName.length">
											<p v-for="(error,index) in errorLastName" :key="index">
												{{error}}
											</p>
										</div>
									</div>
								</div>
								<div class="order-step__col">
									<div class="form-input">
										<div class="form-input__label" >
											Телефон
										</div>
										<input type="text"
									       class="form-input__field"
									       v-model.trim="user.phone"
									       @blur="v$.user.phone.$touch()"
									       :class="{'is-error' : v$.user.phone.$error}"
								           v-mask="{mask: '+7 NNN NNN NN NN', model: 'user.phone' }"
										>
										<div class="form-input__error" v-if="errorPhone.length">
											<p v-for="(error,index) in errorPhone" :key="index">
												{{error}}
											</p>
										</div>
									</div>
								</div>
								<div class="order-step__col">
									<div class="form-input">
										<div class="form-input__label" >
											Email
										</div>
										<input type="email"
									       class="form-input__field"
									       v-model.trim="user.email"
									       :class="{'is-error' : v$.user.email.$error}"
								           @blur="v$.user.email.$touch()"
										>
										<div class="form-input__error" v-if="errorEmail.length">
											<p v-for="(error,index) in errorEmail" :key="index">
												{{error}}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<app-button
							title="Далее"
							:disabled="!isUserValid"
							@click="nextStep"
						/>
					</div>
					<div class="order-step" v-if="activeStep === 2">
						<div class="order-step__header">
							<h4>
								2. Способ получения
							</h4>
						</div>
						<div class="order-step__tabs">
							<app-check-label value="shop" v-model="receiving">
								Самовывоз
							</app-check-label>
							<app-check-label value="delivery" v-model="receiving">
								Доставка
							</app-check-label>
						</div>
						<div class="order-step__tabs-inner">
							<div class="order-step__tab" v-if="isReceiving">
								<div class="order-step__items">
									<div class="order-step__row">
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Имя
												</div>
												<input type="text"
												       class="form-input__field"
												       v-model.trim="user.name"
												       @blur="v$.user.name.$touch()"
												       :class="{'is-error' : v$.user.name.$error}"
												>
												<div class="form-input__error" v-if="errorName.length">
													<p v-for="(error,index) in errorName" :key="index">
														{{error}}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="order-step__buttons">
									<app-button
											title="Назад"
											@click="prevStep"
									/>
									<app-button
											title="Далее"
											@click="nextStep"
											:disabled="!isAddressValid"
									/>
								</div>
							</div>
							<div class="order-step__tab" v-else>
								<div class="order-step__items">
									<div class="order-step__row">
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label">
													Город *
												</div>
												<input type="text"
											       class="form-input__field"
											       v-model.trim="address.city"
											       @blur="v$.address.city.$touch()"
											       :class="{'is-error' : v$.address.city.$error}"
												>
												<div class="form-input__error" v-if="errorAddress.length">
													<p v-for="(error,index) in errorAddress" :key="index">
														{{error}}
													</p>
												</div>
											</div>
										</div>
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Улица *
												</div>
												<input type="text"
											       class="form-input__field"
											       v-model.trim="address.street"
											       @blur="v$.address.street.$touch()"
											       :class="{'is-error' : v$.address.street.$error}"
												>
												<div class="form-input__error" v-if="errorStreet.length">
													<p v-for="(error,index) in errorStreet" :key="index">
														{{error}}
													</p>
												</div>
											</div>
										</div>
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Строение *
												</div>
												<input type="text"
											       class="form-input__field"
											       v-model.trim="address.building"
											       @blur="v$.address.building.$touch()"
											       :class="{'is-error' : v$.address.building.$error}"
												>
												<div class="form-input__error" v-if="errorBuilding.length">
													<p v-for="(error,index) in errorBuilding" :key="index">
														{{error}}
													</p>
												</div>
											</div>
										</div>
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Корпус
												</div>
												<input type="text"
											       class="form-input__field"
											       v-model.trim="address.frame"
												>
											</div>
										</div>
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Подъезд
												</div>
												<input type="text"
											       class="form-input__field"
											       v-model.trim="address.entrance"
												>
											</div>
										</div>
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Этаж
												</div>
												<input type="text"
											       class="form-input__field"
											       v-model.trim="address.floor"
												>
											</div>
										</div>
										<div class="order-step__col">
											<div class="form-input">
												<div class="form-input__label" >
													Квартира
												</div>
												<input type="text"
											       class="form-input__field"
											       v-model.trim="address.flat"
												>
											</div>
										</div>
									</div>
								</div>
								<div class="order-step__buttons">
									<app-button
										title="Назад"
										@click="prevStep"
									/>
									<app-button
										title="Далее"
										@click="nextStep"
										:disabled="!isAddressValid"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="order-step" v-if="activeStep === 3">
						<div class="order-step__header">
							<h4>
								3. Cпособ олплаты
							</h4>
						</div>
						<div class="order-step__tabs-inner">
							<div class="order-step__tabs">
								<app-check-label
									size="sm"
									v-for="pay in payment"
									:key="pay.value"
									v-model="orderPayment"
									:value="pay.value"
								>
									{{pay.name}}
								</app-check-label>
							</div>
							
							<div class="order-step__buttons">
								<app-button
									title="Назад"
									@click="prevStep"
								/>
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
	import AppCheckLabel from "../components/TabLabel/TabLabel";
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
			activeStep: 3,
			receiving: 'delivery',
			v$: useValidate(),
			user: {
				name: '',
				lastName: '',
				email: '',
				phone: '+7',
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
			orderPayment: 'cash',
			payment: [
				{
					name: 'Наличные',
					value: 'cash'
				},
				{
					name: 'Картой',
					value: 'card'
				},
				{
					name: 'Онлайн на сайте',
					value: 'online'
				},
				{
					name: 'Кредит Тинькофф',
					value: 'tinkoff'
				},
			],
			
		}),
		methods: {
			nextStep(){
				this.activeStep = this.activeStep + 1
			},
			prevStep(){
				this.activeStep = this.activeStep - 1
			}
		},
		computed: {
			isReceiving(){
				return this.receiving === 'shop'
			},
			isUserValid(){
				return this.v$.user.$invalid;
			},
			isAddressValid(){
				return this.v$.address.$invalid;
			},
			errorName(){
				const errors = [];
				if (this.v$.user.name.$error) errors.push('Обязательное поле')
				return errors
			},
			errorLastName(){
				const errors = [];
				if (this.v$.user.lastName.$error) errors.push('Обязательное поле')
				return errors
			},
			errorPhone(){
				const errors = [];
				if (this.v$.user.phone.$error) errors.push('Обязательное поле')
				return errors
			},
			errorEmail(){
				const errors = [];
				if (this.v$.user.email.$error) errors.push('Обязательное поле')
				return errors
			},
			errorAddress(){
				const errors = [];
				if (this.v$.address.city.$error) errors.push('Обязательное поле')
				return errors
			},
			errorStreet(){
				const errors = [];
				if (this.v$.address.street.$error) errors.push('Обязательное поле')
				return errors
			},
			errorBuilding(){
				const errors = [];
				if (this.v$.address.building.$error) errors.push('Обязательное поле')
				return errors
			}
		},
		validations() {
			return {
				user: {
					name: {required},
					lastName: {required},
					phone: { required, minLength: minLength(16) },
					email: { required, email}
				},
				address: {
					city: {required},
					street: {required},
					building: {required},
					frame: '',
					entrance: '',
					floor: '',
					flat: '',
				},
			}
		},
		mounted() {
		
		}
	}
</script>

<style lang="scss">
	.order-step {
		
		&__header {
			margin-bottom: 40px;
		}
		
		&__items {
			margin-bottom: 40px;
		}
		
		&__row {
			display: flex;
			flex-wrap: wrap;
			margin-left: -15px;
			margin-right: -15px;
			margin-bottom: -30px;
		}
		
		&__col {
			padding-left: 15px;
			padding-right: 15px;
			flex: 0 0 25%;
			margin-bottom: 30px;
		}
		
		&__buttons {
			display: flex;
			align-items: center;
			
			.button {
				margin-right: 20px;
				
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
		
		&__tabs {
			display: flex;
			flex-wrap: wrap;
			margin-bottom: 20px;
			
			.tab-label {
				margin-right: 15px;
				
				&:last-of-type {
					margin-right: 0;
				}
			}
		}
	}
</style>
