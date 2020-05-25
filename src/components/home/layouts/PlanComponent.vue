<template>
      <vk-grid class="uk-child-width-1-1 uk-margin-remove">
          <div class="uk-padding-remove uk-margin-remove">
              <vk-card class="br-banner uk-width-1-1 uk-light uk-padding-large">
                  <vk-grid class="uk-child-width-1-2">
                      <div>
                        <h1>{{ data.name }}</h1>
                        <h4 class="uk-margin-remove">{{ data.category }}</h4>
                      </div>
                  </vk-grid>
              </vk-card>
          </div>
          <div class="uk-margin-remove uk-padding-remove">
            <vk-card class="uk-padding-small">
              <div class="uk-flex uk-flex-center uk-padding-large">
                <vk-card type="blank" class="uk-width-3-4 uk-padding-remove">
                  <h3>Review & Checkout</h3>
                  <accordion :contents="items" class="uk-width-2-3"/>
                </vk-card>
                <vk-card class="uk-width-1-4 uk-card-red uk-light">
                  <div>
                    <h4 class="uk-margin-small">Order Summary</h4>
                    <div class="uk-grid-small uk-grid">
                        <div class="uk-width-expand" uk-leader>Subtotal</div>
                        <div>KSH {{ fields.amount }}</div>
                    </div><hr>
                    <p  class="uk-margin-remove">Totals<p>
                    <div class="uk-grid-small uk-grid">
                        <div class="uk-width-expand" uk-leader>{{ fields.subscription }}</div>
                        <div>KSH {{ fields.amount }}</div>
                    </div><hr>
                    <p  class="uk-margin-remove">Total Due Today<p>
                    <h4 class="uk-margin-remove">Ksh {{ fields.amount }}</h4>
                    <vk-button class="uk-margin-small uk-width-1-1">Checkout</vk-button>
                  </div>
                </vk-card>
              </div>
            </vk-card>
          </div>
      </vk-grid>
</template>

<script>
    import accordion from '@/components/plugins/AccordionComponent'
    export default {
        components: {
          accordion
        },
        name: 'plan',
        data () {
          return {
            data: {},
            fields:{
              amount: 0
            },
            items: [],
            showPayment: false,
          }
        },
        beforeCreate () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + "/api/v1/subscriptions/fetch/view/" + this.$route.params.item, request: "GET" }).then( (response) => {
                var resolve = this.bralcoresponse(response);
                this.data   = resolve.data;
                this.items.push({title:"What's in the package ?", active: true, html: this.data.details});

            });
        },
        methods: {
          buyPackage(value){
            this.fields.payment = value;
            this.showPayment = true;
            event.target.scrollTop = this.$el.lastElementChild.offsetTop;
          }
        }
    }
</script>
