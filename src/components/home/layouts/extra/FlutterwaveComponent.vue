<template>
  <div class="flw">
    <vk-button size="large" class="uk-margin uk-button-red" @click="makePayment">Pay {{ total }}</vk-button>
  </div>
</template>
    
<script>

  export default {
    computed: {
        total () {
            return this.currency + ' ' + this.amount;
        }
    },
    methods: {
        makePayment() {
            let checkout = window.FlutterwaveCheckout({
            public_key: this.flwKey,
            tx_ref: this.reference,
            amount: this.amount,
            currency: this.currency,
            payment_options: this.payment_method,
            customer: {
                name: this.name,
                email: this.email,
                phoneNumber: this.phoneNumber
            },
            callback: (val) => {
                switch( val.status ){
                    case "successful":
                    var formData = new FormData();
                    formData.append('amount',val.amount);
                    formData.append('currency',val.currency);
                    formData.append('customer_email',val.customer.email);
                    formData.append('customer_name',val.customer.name);
                    formData.append('customer_phone',val.customer.phone_number);
                    formData.append('flw_reference',val.flw_ref);
                    formData.append('tx_reference',val.tx_ref);
                    formData.append('payment',this.$route.params.payment);
                    this.bralcoaxios({url: this.$store.state.app.env.backend_url + "/api/v1/4irclub/subscribe/pay/card", request: 'POST', form: formData}).then( (response) => {
                        let resolve = this.bralcoresponse(response);
                        if( resolve.data.charged ){
                        this.paymentCharge = false;
                        this.showPaymentMessage = true;
                        this.fields.method = resolve.data.method;
                        this.fields.checkout = resolve.data.checkout;
                        }
                    });
                    console.log(checkout);
                    checkout.close();
                    break;
                }
            },
            onclose: function(){
                console.log(event);
                document.querySelector('iframe').style.display = 'none';
            },
            customizations: {
                title: this.custom_title,
                description: "Payment for items in cart",
                logo: this.custom_logo,
            },
            });
        }
    },
    name: 'FlutterwaveModal',
    props: {
        flutterEnv: {
            type: String,
            required: false,
            default: '' //set to true if you are going live
        },
        email: {
            type: String,
            required: true,
            default: ''
        },
        name: {
            type: String,
            required: true,
            default: ''
        },
        phoneNumber: {
            type: String,
            required: true,
            default: ''
        },
        amount: {
            type: Number,
            required: true
        },
        flwKey: {
            type: String,
            required: true,
            default: ''
        },
        callback: {
            type: Function,
            required: true,
            default: () => {
              console.log('Payment made, verify payment');
            }
        },
        close: {
            type: Function,
            required: true,
            default: () => {}
        },
        currency: {
            type: String,
            default: "KES"
        },
        country: {
            type: String,
            default: "KE"
        },
        custom_title: {
            type: String,
            default: ""
        },
        custom_logo: {
            type: String,
            default: ""
        },
        reference: {
            type: String,
            default: ""
        },
        payment_method: {
            type: String,
            default: "card"
        },
        paymentCharge: {
            type: Boolean,
            default: true
        },
        showPaymentMessage: {
            type: Boolean,
            default: false
        }
    },
    watch:{
        flutterEnv:{
            handler(val){
                const script = document.createElement("script");
                switch(val){
                    case "live":
                        script.src =  "https://checkout.flutterwave.com/v3.js";
                    break;
                    case "sandbox":
                        script.src = "https://ravemodal-dev.herokuapp.com/v3.js";
                    break;
                    default:
                        script.src = "https://ravemodal-dev.herokuapp.com/v3.js";
                }
                document.getElementsByTagName("head")[0].appendChild(script);
            },
            immediate: false
        }
    }
  }

</script>