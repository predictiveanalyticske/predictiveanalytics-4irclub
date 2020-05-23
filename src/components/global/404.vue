<template>
      <div class="uk-width-2-3@l uk-width-2-3@m uk-width-1-2@s uk-position-center uk-light">
        <vk-card padding="small">
            <div class="uk-width-1-1 uk-text-center">
                <vk-icon icon="info" ratio="6"></vk-icon>
            </div>
            <div class="uk-width-1-1 uk-text-center">
                <h2>Page Not Found</h2>
                <router-link to="/dashboard/" tag="a" :class="'uk-button uk-button-default'">Go Home</router-link>
            </div>
        </vk-card>
     </div>
</template>

<script>
    export default {
        data () {
            return  {
                tab: 0,
                fields: {}
            }
        },
    }
</script>
<style scoped>

    .uk-card{ 
        background-color:#9561e2 !important;
        color: #fff !important;
    }

</style>