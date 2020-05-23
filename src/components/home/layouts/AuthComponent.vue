<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="uk-card-red uk-width-1-1 uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-2">
                    <div>
                        <h1>Account Login</h1>
                        <h4 class="uk-margin-remove">Registered account can be able to access the services.</h4>
                    </div>
                </vk-grid>
            </vk-card>
        </div>
        <div class="uk-padding-remove uk-margin-remove">
            <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s uk-padding-large">
                <div></div>
                <div>
                    <vk-card padding="small">
                        <div class="uk-width-1-1 uk-text-center">
                            <vk-icon icon="user" ratio="6"></vk-icon>
                        </div>
                        <vk-tabs align="center" :keepAlive="true" :activeTab="tab">
                            <vk-tabs-item title="Login">

                                <div slot="header">
                                    <vk-card-title>
                                        <p>Account Login</p>
                                    </vk-card-title>
                                </div>
                                <div class="uk-padding-small">
                                    <form class="uk-padding-small" @submit.prevent="attemptLogin" :action="$store.state.app.backend_url + '/api/v1/auth/login'" method="POST">
                                        <fieldset class="uk-fieldset">

                                            <div class="uk-margin">
                                                <label>Email</label>
                                                <input class="uk-input" required v-model="fields.email" name="email" type="email" placeholder="Email Address">
                                            </div>

                                            <div class="uk-margin">
                                                <label>Password</label>
                                                <input class="uk-input" required v-model="fields.password" name="password" type="password" placeholder="Password">
                                            </div>

                                            <div class="uk-margin">
                                                <vk-button htmlType="submit">Login</vk-button>
                                            </div>

                                        </fieldset>
                                    </form>
                                </div>
                            </vk-tabs-item>
                            <vk-tabs-item title="Forgot Password">

                                <div slot="header">
                                    <vk-card-title>
                                        <p>Reset Password</p>
                                    </vk-card-title>
                                </div>
                                <div class="uk-padding-small">
                                    <form class="uk-padding-small">
                                        <fieldset class="uk-fieldset">

                                            <div class="uk-margin">
                                                <label>Email</label>
                                                <input class="uk-input" type="email" id="email" placeholder="Email Address">
                                            </div>

                                            <div class="uk-margin">
                                                <vk-button>Reset</vk-button>
                                            </div>

                                        </fieldset>
                                    </form>
                                </div>

                            </vk-tabs-item>

                        </vk-tabs>
                    </vk-card>
                </div>
            </vk-grid>
        </div>
    </vk-grid>
</template>

<script>
    export default {
        name: "login",
        data () {
            return  {
                tab: 0,
                fields: {}
            }
        },
        methods: {
            attemptLogin (event) {
                let el = event.target

                var formData = new FormData();
                
                for(var item in this.fields){
                    formData.append(item,this.fields[item]);
                }   
                this.bralcoaxios({ url: el.attributes.action.value, request:el.attributes.method.value, form: formData }).then( (response) => {
                    this.bralcoresponse(response);
                });
            }
        },
        mounted() {
           let fields = {};
           document.querySelectorAll('input').forEach(function(index,item){ fields[item.name] = null; });
           this.fields = fields;
        }
    }
</script>