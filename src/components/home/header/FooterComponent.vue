<template>
    <div class="uk-width-1-1 br-footer uk-light">
        <vk-card type="blank">
            <vk-grid class="uk-child-width-1-1">
                <div>
                    <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-1-1@s uk-padding-small">
                        <div class="uk-position-relative uk-padding-large">
                            <img src="@/assets/images/logo-full-white.png" class="uk-position-center"/>
                        </div>
                        <div class="uk-light">
                            <h3>Contact Us</h3>
                            <form @submit.prevent="attemptLogin" :action="$store.getters.backendurl+'/api/v1/auth/login'" method="POST">
                                <fieldset class="uk-fieldset">

                                    <div class="uk-margin uk-light">
                                        <label>Message</label>
                                        <textarea class="uk-textarea" rows="5" name="message"></textarea>
                                    </div>
                                    <div class="uk-margin">
                                        <label>Email</label>
                                        <input class="uk-input" name="email" type="email" placeholder="Email Address">
                                    </div>

                                    <div class="uk-margin uk-light">
                                        <vk-button htmlType="submit" size="large">Send</vk-button>
                                    </div>

                                </fieldset>
                            </form>
                        </div>
                    </vk-grid><hr>
                </div>
                <div class="uk-text-center">
                    <vk-iconnav class="uk-flex-center">
                        <vk-iconnav-item href="https://predictiveanalytics.co.ke" target="blank" icon="world"></vk-iconnav-item>
                        <vk-iconnav-item href="https://www.facebook.com" target="blank" icon="facebook"></vk-iconnav-item>
                        <vk-iconnav-item href="https://predictiveanalytics.co.ke" target="blank" icon="linkedin"></vk-iconnav-item>
                    </vk-iconnav>
                    <p>&copy;{{ year }} All rights reserved | Predictive Analytics</p>
                </div>
            </vk-grid>
        </vk-card>
    </div>
</template>

<script>

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
