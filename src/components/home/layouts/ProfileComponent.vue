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
                      <legend class="uk-legend">Subscriptions</legend><hr>
                    <div v-if="data.length > 0" class="uk-width-1-2@xl uk-width-1-2@l uk-width-1-2@m uk-width-expand@s">
                      <vk-grid class="uk-child-width-1-2" v-for="(value, index) in data" :key="index">
                        <div>
                          <vk-card padding="small" type="secondary">
                            <vk-label slot="badge" v-if="value.payment.active">Active</vk-label>
                            <vk-card-title>{{ value.name }}</vk-card-title>
                            <h5 class="uk-margin-small">{{ value.category }}</h5>
                            <vk-label>{{ value.payment.currency }} {{ value.payment.amount.toString() }}</vk-label>
                          </vk-card>
                        </div>
                      </vk-grid>
                    </div>
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
                data: [],
                fields: {
                    user: null,
                }
            }
        },
        name: "profile",
        mounted () {
            this.bralcoaxios({ url: this.$store.state.app.env.backend_url + '/api/v1/4irclub/profile', request: 'GET' }).then( (response) => {
                let resolve = this.bralcoresponse(response);
                this.data = resolve.data.subscriptions;
                this.fields.user = resolve.data.user;
            });
        }
    }
</script>
