<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
          <vk-card padding="large">
            <vk-tabs align="center" animation="fade">
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
                                            <vue-phone-number-input @update="getPhoneNumber" :required="true" :size="'10'" v-model="fields.user.phone" :defaultCountryCode="'KE'"/>
                                            <input class="uk-input" type="hidden" v-model="fields.user.phone" placeholder="Phone Number">
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
                <vk-tabs-item title="Subscriptions">
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-width-3-4@xl uk-width-3-4@l uk-width-2-3@m uk-width-1-1@s">
                            <h2 class="uk-legend">Subscriptions</h2><hr>
                                <div v-if="subscriptions.data.length > 0" class="uk-grid uk-child-width-1-3@xl uk-child-width-1-3@l uk-child-width-1-3@m uk-child-width-1-1@s uk-padding-small">
                                    <div class="uk-padding-remove" v-for="(item, index) in subscriptions.table.activePage" :key="index">
                                        <vk-card class="uk-padding-remove" padding="small">
                                            <vk-label type="success" slot="badge" v-if="item.active">Active</vk-label>
                                            <vk-label type="danger" slot="badge" v-else>Inactive</vk-label>
                                            <vk-card-title>{{ item.subscription.name }} <br> {{ item.subscription.category }}</vk-card-title>
                                            <p>{{item.subscription.summary}}</p>
                                            <vk-label type="danger" v-if="item.expired">Expired</vk-label>
                                            <vk-label type="success" v-else>Not Expired</vk-label>
                                        </vk-card>
                                    </div>
                                </div>

                                <vk-pagination align="center" :page.sync="subscriptions.table.pageNumber" :perPage="subscriptions.table.perPage" :total="subscriptions.table.tableLength.value">
                                    <vk-pagination-page-prev></vk-pagination-page-prev>
                                    <vk-pagination-pages></vk-pagination-pages>
                                    <vk-pagination-page-next></vk-pagination-page-next>
                                </vk-pagination>
                        </div>
                    </div>
                </vk-tabs-item>
                <vk-tabs-item title="Payments">
                    <div class="uk-flex uk-flex-center">
                        <div class="uk-width-3-4@xl uk-width-3-4@l uk-width-2-3@m uk-width-1-1@s">
                            <h2 class="uk-legend">Payments</h2><hr>
                            <div class="uk-padding-small div-table">
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
                                    <tbody v-if="payments.data.length > 0">
                                        <tr v-for="(item, index) in payments.table.activePage" :key="index">
                                            <td>{{ item.key }}</td>
                                            <td><vk-label type="success">{{ item.method }}</vk-label></td>
                                            <td>{{ item.currency }} {{ item.amount }}</td>
                                            <td><vk-label>{{ item.category }}</vk-label></td>
                                            <td>{{ item.created_at }}</td>
                                            <td>{{ item.expire_at }}</td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else-if="payments.data.length == 0">
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
                                <vk-pagination align="center" :page.sync="payments.table.pageNumber" :perPage="payments.table.perPage" :total="payments.table.tableLength.value">
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
                formatedNumber: '',                 
                subscriptions: {
                    data: [],
                    table: {
                        activePage: {},
                        pages: {},
                        pageNumber: 1,  // default to page 0
                        perPage: 10,
                        sortedBy: { name: 'asc' },
                        tableLength: {
                            type: Number,
                            value: 0
                        }
                    }
                },
                payments: {
                    data: [],
                    table: {
                        activePage: {},
                        pages: {},
                        pageNumber: 1,  // default to page 0
                        perPage: 10,
                        sortedBy: { name: 'asc' },
                        tableLength: {
                            type: Number,
                            value: 0
                        }
                    }
                }
            }
        },
        beforeMount (){
            this.$store.commit('banner_title','Profile');
            this.$store.commit('banner_content','');
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

                this.payments.data      = this.data.payments;
                this.subscriptions.data = this.data.subscriptions;
                this.fields.user        = this.data.user;

                if( this.data.payments.length > 0){
                    let payments = this.payments.data;
                    for(let value in payments)
                    {
                       payments[value].key = parseInt(value) + 1;
                    }
                    this.payments.table.subChunk          = chunk(this.payments.data, this.payments.table.perPage);
                    this.payments.table.activePage        = this.payments.table.subChunk[this.payments.table.pageNumber - 1];
                    this.payments.table.tableLength.value = this.payments.data.length;
                }

                if( this.data.subscriptions.length > 0){
                    let subscriptions = this.subscriptions.data;
                    for(let value in subscriptions)
                    {
                       subscriptions[value].key = parseInt(value) + 1;
                    }
                    this.subscriptions.table.subChunk          = chunk(this.subscriptions.data, this.subscriptions.table.perPage);
                    this.subscriptions.table.activePage        = this.subscriptions.table.subChunk[this.subscriptions.table.pageNumber - 1];
                    this.subscriptions.table.tableLength.value = this.subscriptions.data.length;
                }
            },
            getPhoneNumber (val) {
                this.fields.user.phone = val.formattedNumber;
                this.formatedNumber = val.formattedNumber;
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
