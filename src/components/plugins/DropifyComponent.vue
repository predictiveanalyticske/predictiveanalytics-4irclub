<template>
    <div>
        <vue-dropify 
            :accept="this.accept" 
            :message="this.message"
            :loading="true"
            :multiple="false"
            >
        </vue-dropify>
        <input
            type="file"
            style="display: none"
            ref="fileInput"
            accept="images/*"
            @change="onFilePicked"
        >
        <input
            type="hidden"
            style="display: none"
            accept="base64/*"
            v-model="itemFile"
        >
        <vk-modal-full :show.sync="cropimage" id="croppie_full">
            <div class="uk-padding-large">
                <vk-button-group :class="'uk-position-top-right uk-padding-small'">
                    <vk-button type="link" @click.prevent="crop()"><vk-icon icon="check" ratio="2"></vk-icon></vk-button>
                    <vk-button type="link" @click="cropimage = false"><vk-icon icon="close" ratio="2" :class="'uk-text-danger'"></vk-icon></vk-button>
                </vk-button-group>
                <div class="uk-padding-large">
                    <vue-croppie 
                        ref="croppieRef" 
                        :enableOrientation="true"
                        :boundary="{ width: 400, height: 400}"
                        @result="images[0]"
                        :class="'uk-position-center'"
                        >
                    </vue-croppie>
                </div>
            </div>
        </vk-modal-full>
    </div>
</template>

<script>
    import VueDropify from 'vue-dropify'

    export default {
        components: {
            'vue-dropify': VueDropify,
        },
        props: [ "message", "accept", "files"],
        methods: {
            initFileReader() { // init file upload to dropify
                document.querySelector('input[type="file"]').click();
            },
            onFilePicked (event) {
                var file = event.target.files[0];
                let reader = new FileReader();
                if (file) {
                    reader.readAsDataURL(file);
                }
                reader.onload = (e) => {
                   this.images[0] = e.target.result;
                   this.$refs.croppieRef.bind({
                        url: e.target.result,
                    });
                };

                this.cropimage = true;
            },
            // CALBACK USAGE
            crop() {
                // Here we are getting the result via callback function
                // and set the result to this.cropped which is being 
                // used to display the result above.
                let options = {
                    format: 'jpeg', 
                    size: 'viewport',
                    circle: false
                }
                this.$refs.croppieRef.result(options, (output) => {
                    this.$children[0].images[0] = output;
                    this.itemFile = output;
                });
                this.cropimage = false;
            }
        },
        data () {
            return {
                cropped: '',
                initUpload: false,
                cropimage: false
            }
        },
        computed: {
            itemFile: {
                get() { return this.value },
                set(itemFile) {this.$emit('update:itemFile', itemFile)}
            }, 
            images () {
                return this.files;
            }

        },
        mounted () {
            if( this.files != "" || this.files != undefined){
               this.$children[0].images = this.files;
            }
        }
    }
</script>

<style>
    .croppie-container{
        height: 0% !important;
    }
    #croppie_full{
        z-index: 200000 !important;
    }
</style>