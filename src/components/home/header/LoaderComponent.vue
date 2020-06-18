<template>
    <div class="uk-position-cover uk-overlay uk-overlay-default uk-flex uk-flex-center uk-flex-middle overlay" :class="styling">
        <vk-spinner ratio="5" :class="'uk-position-center uk-text-danger'"></vk-spinner>
    </div>
</template>

<script>
    export default {
        name: "loader",
        computed: {
            styling: {
                get () {
                    return !this.getters.loader ? "hidden" : "";
                },
                set (val){
                    return val;
                }
            }
        }
    }
</script>

<style scoped>
    .overlay {
        background-color: rgba(255,255,255,0.5) !important;
    }
    .hidden {
        display: none !important;
    }
    .uk-position-cover{
        z-index: 10000 !important;
    }
</style>
