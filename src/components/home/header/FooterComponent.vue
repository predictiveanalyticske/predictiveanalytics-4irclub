<template>
    <div class="uk-width-1-1">
        <vk-card :class="'br-footer'">
            <p>&copy;{{ year }} All rights reserved | {{ data.company }}</p>
        </vk-card>
    </div>
</template>

<script>
    import stored from '../../../stores'

    export default {
        name: 'footernav',
        props: ["data"],
        computed: {
            year: () => {
                return new Date().getFullYear();
            }
        }
    }
</script>

<style>
    .br-footer {
        background-color: #1d1d1d !important;
        color: #fff !important;
    }

</style>