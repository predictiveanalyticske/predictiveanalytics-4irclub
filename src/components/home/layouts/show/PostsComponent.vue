<template>
    <vk-grid class="uk-child-width-1-1 uk-width-2-3@l uk-width-2-3@m">
        <div v-for="(value, index) in data" :key="index">
            <vk-card type="default">
                <div slot="media-top">
                    <iframe class="uk-width-1-1" height="500" :src="value.link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
                <div>
                    <h3 class="uk-text-warning">{{ value.title }}</h3>
                    <p>{{ value.details }}</p>
                </div>
            </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    export default {
        props:["data"],
        name: "posts",
    }
</script>