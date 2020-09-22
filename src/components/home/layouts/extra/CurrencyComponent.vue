<template>
    <div>
        <h3 class="uk-margin-small uk-width-1-1 uk-text-center uk-text-success"
            v-for="(value,index) in amounts" :key="index">{{ currency }} {{ value.amount }} {{ value.type }}</h3>
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
            amounts:{
                type: Array,
                required: true,
            },
            currency:{
                type: String,
                required: true,
                default: 'KES',
            },
        }
    }
</script>