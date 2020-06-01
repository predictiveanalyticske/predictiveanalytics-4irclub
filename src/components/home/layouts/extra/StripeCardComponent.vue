<template>
        <div class="accordion-content uk-padding">
            <input id="card-holder-name" type="text">

            <!-- Stripe Elements Placeholder -->
            <div id="card-element"></div>

            <button id="card-button">
                Process Payment
            </button>
        </div>
</template>

<script src="https://js.stripe.com/v3/"></script>

<script>
    import Stripe from 'stripe';

    export default {
        created () {
            const stripe = new Stripe('sk_test_...');

            const elements = stripe.elements();
            const cardElement = elements.create('card');

            cardElement.mount('#card-element');
        },
        methods: {
            processPayment () {
                const cardHolderName = document.getElementById('card-holder-name');
                const cardButton = document.getElementById('card-button');

                cardButton.addEventListener('click', async (e) => {
                    const { paymentMethod, error } = await stripe.createPaymentMethod(
                        'card', cardElement, {
                            billing_details: { name: cardHolderName.value }
                        }
                    );

                    if (error) {
                        // Display "error.message" to the user...
                    } else {
                        // The card has been verified successfully...
                    }
                });
            }
        },
        mounted () {
            console.log(this.$store.state.app);
        },
        name:"stripecard",
        props: ["fields","data"],
    }
</script>