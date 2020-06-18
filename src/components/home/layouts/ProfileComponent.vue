<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card padding="large">
            <vk-tabs align="center" animation="fade" class="uk-padding-small">
                <vk-tabs-item title="Profile">
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-width-1-2">
                            <form>
                                <fieldset class="uk-fieldset">
                                    <h2 class="uk-legend">Account Details</h2><hr>
                                    <div class="uk-width-1-1" v-if="fields.user != null">
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
                                    <div class="uk-width-1-2 uk-padding-large uk-flex-center" v-else>
                                        <vk-spinner ratio="5"></vk-spinner>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </vk-tabs-item>
                <vk-tabs-item title="Subscription">
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-width-1-2">
                            <h2 class="uk-legend">Subscriptions</h2><hr>
                             <div class="uk-flex uk-flex-center">
                            <div class="uk-width-1-1" >
                                <p class="uk-text-break">You have an active subscription. See more details below. To check more information about the package, click <a :href="$router.resolve({name:'plans'}).href">here</a> to view more packages to subscribe.</p>
                                <accordion :contents="subscription" />
                            </div>
                            </div>
                        </div>
                    </div>
                </vk-tabs-item>
                <vk-tabs-item title="Payments">
                    <div class="uk-flex uk-flex-center">
                        
                    </div>
                </vk-tabs-item>
                <vk-tabs-item title="Security">
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-width-1-2">
                            <form action="" method="POST" @click.prevent="submitForm">
                                <fieldset class="uk-fieldset">
                                    <h2 class="uk-legend">Account Security</h2><hr>
                                    <div class="uk-width-1-1" >
                                        <div class="uk-margin">
                                            <label>Current Password</label>
                                            <input class="uk-input" type="text" name="currentpassword" placeholder="First Name">
                                        </div>

                                        <div class="uk-margin">
                                            <label>New Password</label>
                                            <input class="uk-input" type="text" name="newpassword" placeholder="New Password">
                                        </div>

                                        <div class="uk-margin">
                                            <label>Confirm New Password</label>
                                            <input class="uk-input" type="text" name="newpassword_confirmation" placeholder="Confirm New Password">
                                        </div>

                                        <div class="uk-margin">
                                            <vk-button htmlType="submit" :class="'uk-button uk-button-primary'"> Update </vk-button>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>                 
                        </div> 
                    </div> 
                </vk-tabs-item>
            </vk-tabs>
          </vk-card>
        </div>
    </vk-grid>
</template>

<script>
    import dropify from "@/components/plugins/DropifyComponent";
    import accordion from "@/components/plugins/AccordionComponent"

export default {
        components: {
            accordion,
            dropify
        },
        computed: {
            subscription () {
                if( this.fields.user != null ){
                    return [{
                        active: false,
                        title:  this.fields.user.subscription.subscription.category,
                        html:   '<div class="uk-padding-small"><h3>Features</h3><hr><h4>'+this.fields.user.subscription.subscription.details+'</h4><hr><</div>'
                    }];
                } else {
                    return [];
                }
            }
        },
        data () {
            return {
                fields: {
                    user: null,
                }
            }
        },
        beforeRouteEnter(to,from,next){
            next( vm => {
                vm.initData(),
                next()
            });
        },
        name: "profile",
        methods: {
            initData(){
                this.bralcoaxios({ url: this.$store.state.app.env.backend_url + '/api/v1/4irclub/profile', request: 'GET' }).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    this.fields.user = resolve.data;
                    this.fields.user.subscription.subscription.details = '<ol>';
                    let self = this;
                    JSON.parse(this.fields.user.subscription.subscription.features).forEach( function(item){
                        self.fields.user.subscription.subscription.details += '<li>'+item+'</li>';
                    });
                    this.fields.user.subscription.subscription.details += '</ol>';
                });
                this.$store.commit('banner_title','Profile');
                this.$store.commit('banner_content','');
            }
        }
    }
</script>
