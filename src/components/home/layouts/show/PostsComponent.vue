<template>
    <vk-grid class="uk-child-width-1-1 uk-width-2-3@l uk-width-2-3@m">
        <div v-for="(value, index) in data" :key="index">
            <vk-card type="default">
                 <vk-label slot="badge">{{ value.type }}</vk-label>
                <div slot="media-top">
                    <iframe v-if="value.type == 'youtube'" class="uk-width-1-1" height="500" :src="value.link" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                    <div v-else class="uk-text-center">
                        <vk-icon-link :href="value.link" @click.prevent="playVideo" ratio="10" icon="play"></vk-icon-link>
                    </div>
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
        methods: {
            playVideo(){
                window.open(event.currentTarget.attributes.href.value,"_blank");
            }
        },  
        name: "posts",
    }
</script>