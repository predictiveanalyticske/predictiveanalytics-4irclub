<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card padding="large">
            <vk-tabs align="center" animation="fade" class="uk-padding-small">
                <vk-tabs-item title="Profile">
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-width-1-2@xl uk-width-1-2@l uk-width-1-2@m uk-width-1-1@s">
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
                                            <vk-button htmlType="submit" :class="'uk-button uk-button-red'" size="large"> Save Changes </vk-button>
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
                        <div class="uk-width-2-3@xl uk-width-2-3@l uk-width-2-3@m uk-width-1-1@s">
                            <h2 class="uk-legend">Subscriptions</h2><hr>
                             <div class="uk-flex uk-flex-center">
                                <div class="uk-width-1-1" >
                                    <p class="uk-text-break">You have an active subscription. See more details below. To check more information about the package, click <a :href="$router.resolve({name:'plans'}).href">here</a> to view more packages to subscribe.</p>
                                    <h2>Your Subscription</h2><hr>
                                    <h3>{{ Object.keys(fields.subscription).length > 0  ? fields.subscription.subscription.name : '' }}</h3>
                                    <p>{{ Object.keys(fields.subscription).length > 0 ? fields.subscription.subscription.summary : '' }}</p>
                                    <h4>Features</h4>                                    
                                    <div class="uk-grid uk-child-width-1-1 uk-flex uk-flex-center">
                                        <div class="uk-margin-small" v-for="(value,index) in Object.keys(fields.subscription).length > 0 ? fields.subscription.subscription.features : []" :key="index"> <vk-label>{{ index + 1 }} {{ value.name || '' }} </vk-label></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </vk-tabs-item>
                <vk-tabs-item title="Payments">
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-width-2-3@xl uk-width-2-3@l uk-width-2-3@m uk-width-1-1@s">
                            <h2 class="uk-legend">Payments</h2><hr>
                            <div class="uk-padding-small">
                                <table class="uk-table uk-table-divider uk-table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Method</th>
                                            <th>Amount</th>
                                            <th>Category</th>
                                            <th>Created At</th>
                                            <th>Expire On</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="payment.data.length > 0">
                                        <tr v-for="(item, index) in payment.table.activePage" :key="index">
                                            <td>{{ item.key }}</td>
                                            <td><vk-label type="success">{{ item.method }}</vk-label></td>
                                            <td>{{ item.currency }} {{ item.amount }}</td>
                                            <td><vk-label>{{ item.category }}</vk-label></td>
                                            <td>{{ item.created_at }}</td>
                                            <td>{{ item.expire_at }}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else-if="payment.data.length == 0">
                                        <tr>
                                            <td colspan="6" class="uk-text-center"> Nothing Found Here</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr>
                                            <td colspan="6" class="uk-text-center"> <vk-spinner ratio="1.5"></vk-spinner> </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <vk-pagination align="center" :page.sync="pageNumber" :perPage="payment.table.perPage" :total="payment.data.length">
                                    <vk-pagination-page-prev></vk-pagination-page-prev>
                                    <vk-pagination-pages></vk-pagination-pages>
                                    <vk-pagination-page-next></vk-pagination-page-next>
                                </vk-pagination>
                            </div>
                        </div>
                    </div>
                </vk-tabs-item>
                <vk-tabs-item title="Security">
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-width-1-2@xl uk-width-1-2@l uk-width-1-2@m uk-width-1-1@s">
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
    import {chunk} from 'lodash';
export default {
        components: {
            dropify
        },
        computed: {
            pageNumber: {
                get(){
                    return 1;
                },
                set(val){
                    return val;
                }
            }
        },
        data () {
            return {
                data: {},
                fields: {
                    payments: {
                        type: Object,
                        required: true,
                        default: {}
                    },
                    subscription: {
                        type: Object,
                        required: true,
                        default: {}
                    },
                    user: {
                        type: Object,
                        required: true,
                        default: {}
                    },
                },
                subscription: [],
                payment: {
                    data: [],
                    table: {
                        activePage: {},
                        chunk: {},
                        perPage:10,
                    }
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
            assign(){
                this.$store.commit('banner_title','Profile');
                this.$store.commit('banner_content','');
                this.fields.payments = this.data.payments;
                this.fields.subscription = this.data.subscription;
                this.fields.user = this.data.user;

                this.payment.data = this.fields.payments;
                this.payment.data.forEach( (item,key) => {
                    item.key = key + 1;
                });

                this.payment.table.chunk      = chunk(this.payment.data,this.pageNumber);
                this.payment.table.activePage = this.payment.table.chunk[0];
            },
            initData(){
                this.bralcoaxios({ url: this.$store.state.app.env.backend_url + '/api/v1/4irclub/profile', request: 'GET' }).then( (response) => {
                    let resolve = this.bralcoresponse(response);
                    this.data = resolve;
                    this.assign();
                });
            }
        }
        }
</script>
