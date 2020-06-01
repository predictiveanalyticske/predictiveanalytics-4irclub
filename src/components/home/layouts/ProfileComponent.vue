<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="br-banner uk-width-1-1 uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-2">
                    <div>
                        <h1>Profile</h1>
                    </div>
                </vk-grid>
            </vk-card>
        </div>
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card padding="large">
            <vk-tabs-vertical align="left" animation="fade" class="uk-padding-large">
                <vk-tabs-item title="Profile">
                    <form>
                        <fieldset class="uk-fieldset">
                            <legend class="uk-legend">Profile</legend><hr>
                            <div class="uk-width-1-2" v-if="fields.user != null">
                                <div class="uk-margin">
                                    <label>Avatar</label>
                                    <dropify
                                        :accept="'images/*'"
                                        :message="'Upload Avatar Image'"
                                        :files="[fields.user.avatar != null ? fields.user.avatar : '']"
                                        :itemFile.sync="fields.user.avatar"
                                        @click.native="initUpload"
                                        >
                                    </dropify>
                                </div>

                                <div class="uk-margin">
                                    <label>First Name</label>
                                    <input class="uk-input" type="text" v-model="fields.user.first_name" placeholder="First Name">
                                </div>

                                <div class="uk-margin">
                                    <label>Surname Name</label>
                                    <input class="uk-input" type="text" v-model="fields.user.last_name" placeholder="Surname Name">
                                </div>

                                <div class="uk-margin">
                                    <label>Email Address</label>
                                    <input class="uk-input" disabled type="text" v-model="fields.user.email" placeholder="Email Address">
                                </div>

                                <div class="uk-margin">
                                    <label>Phone Number</label>
                                    <input class="uk-input" type="text" v-model="fields.user.phone" placeholder="Phone Number">
                                </div>

                                <div class="uk-margin">
                                    <vk-button htmlType="submit" :class="'uk-button uk-button-primary'"> Save Changes </vk-button>
                                </div>
                            </div>
                            <div class="uk-width-1-2 uk-padding-large" v-else>
                                <vk-spinner ratio="3"></vk-spinner>
                            </div>
                        </fieldset>
                    </form>
                </vk-tabs-item>
                <vk-tabs-item title="Subscription">
                    
                </vk-tabs-item>
                <vk-tabs-item title="Security">

                </vk-tabs-item>
            </vk-tabs-vertical>
          </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    import dropify from "@/components/plugins/DropifyComponent.vue";

    export default {
        components: {
            dropify
        },
        data () {
            return {
                fields: {
                    subscription: null,
                    user: null,
                }
            }
        },
        name: "profile",
        methods: {
            attemptLogin (event) {
                let el = event.target
                let formData = new FormData(el);

                this.bralcoaxios({ url: el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    this.bralcoresponse(response);
                });
            }
        }, 
        created () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + '/api/v1/4irclub/profile', request: 'GET' }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.fields.subscription = resolve.data.subscription;
                this.fields.user         = resolve.data.user;
            });
        }
    }
</script>
