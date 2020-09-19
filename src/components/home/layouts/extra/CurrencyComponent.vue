<template>
    <div>
        <h3 class="uk-margin-small uk-width-1-1 uk-text-center uk-text-success">{{ monthlyAmount }} per month</h3>
        <h3 class="uk-margin-small uk-width-1-1 uk-text-center uk-text-success">{{ annualAmount }} per year</h3>
        <select class="uk-select" v-model="currencySelected">
            <option 
                v-for="(value,key) in currencies.data"
                :key="key"
                :selected="value == currency"
                :value="value"
            >{{ key }}</option>
        </select>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                currencies: require('@/currencies'),
                currencySelected: ''
            }
        },
        methods: {
          changeCurrency () {
            console.log(event.target);
          },
        },
        name: "currency",
        props: {
            annualAmount:{
                type: Number,
                required: true,
                default: 0
            },
            currency:{
                type: String,
                required: true,
                default: 'KES',
            },
            monthlyAmount:{
                type: Number,
                required: true,
                default: 0
            },
        }
    }
</script>