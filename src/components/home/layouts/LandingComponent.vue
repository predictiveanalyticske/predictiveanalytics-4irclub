<template>
    <vk-grid class="uk-child-width-1-1 uk-margin-remove">
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="uk-card-red uk-width-1-1 uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-expand@s">
                    <div>
                        <h1>4th Industrial Revolution Club</h1>
                        <p>Life Long Learning to re-engineer your career and business to be adaptive to the demands of the emerging 4th Industrial Revolution.</p>
                    </div>
                </vk-grid>
            </vk-card>
        </div>
        <div class="uk-padding-remove uk-margin-remove">
                <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-expand@s uk-padding-large">
                    <div class="uk-text-center uk-padding-large uk-visible@m uk-visible@l">
                        <vk-icon icon="users" ratio="11"></vk-icon>
                    </div>
                    <div>
                        <vk-card class="uk-width-1-1 uk-padding-small">
                            <h2>This is a subscription based platform with a lifelong learning package that includes:</h2>
                            <ul class="uk-list uk-list-large">
                                <li><h6>Monthly Topical Webinairs</h6></li>
                                <li><h6>Free online courses</h6></li>
                                <li><h6>Job Openings and Job Placement for Data Science Talent</h6></li>
                                <li><h6>Business Consulting Opportunities</h6></li>
                                <li><h6>Free documentaries</h6></li>
                            </ul>
                        </vk-card>
                    </div>
                </vk-grid>
        </div>
        <div class="uk-padding-remove uk-margin-remove">
                <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-expand@s uk-padding-large">
                    <div>
                        <vk-card class="uk-width-1-1 uk-padding-large">
                            <vk-icon icon="grid" class="uk-hidden@s uk-visible@m uk-text-center" ratio="13"></vk-icon>
                            <ul class="uk-list uk-list-large">
                                <li><h6>Free events</h6></li>
                                <li><h6>Dicsounted Rate for Analytics Masterclass.</h6></li>
                                <li><h6>Free monthly group  coaching (Career or Business)</h6></li>
                                <li><h6>Exam / Quiz Platform to test your knowledge.</h6></li>
                                <li><h6>Discounted access to Accredited Courses.</h6></li>
                                <li><h6>Access to Data Science Community Database ( ideal for Consultants, Recruiters and Vendors) </h6></li>
                            </ul>
                        </vk-card>
                    </div>
                    <div class="uk-text-center uk-padding-large">
                        <vk-icon icon="grid" class="uk-hidden@s uk-visible@m uk-visible@l uk-visible@xl" ratio="13"></vk-icon>
                    </div>
                </vk-grid>
        </div>
        <div class="uk-padding-remove uk-margin-remove">
                <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-expand@s uk-padding-large">
                    <div class="uk-text-center uk-padding-large">
                        <vk-icon icon="tag" class="uk-hidden@s uk-visible@m uk-visible@l uk-visible@xl" ratio="13"></vk-icon>
                    </div>
                    <div>
                        <vk-card class=" uk-width-1-1 uk-padding-large">
                            <vk-icon icon="tag" class="uk-hidden@s uk-text-center" ratio="13"></vk-icon>
                            <ul class="uk-list uk-list-large">
                                <li><h6>Free Access to Diagnostics tools:</h6>
                                    <ul class="uk-list uk-list-large uk-list-bullet">
                                        <li><h6>Career disruption diagnostic</h6></li>
                                        <li><h6>Data Science career fitness diagnosis</h6></li>
                                        <li><h6>Procurement Sandbox Toolkit for Big Data Tools</h6></li>
                                        <li><h6>Data Science Trainers Toolkit</h6></li>
                                        <li><h6>Data Science Talent Interviewers Framework</h6></li>
                                        <li><h6>Data Science Toolkit for Leaders </h6></li>
                                    </ul>
                                </li>
                                <li><h6>Free events</h6></li>
                                <li><h6>Dicsounted Rate for Analytics Masterclass.</h6></li>
                                <li><h6>Virtual/Physical Office Space</h6></li>
                                <li><h6> Access to living book title Big Data Principle and Practice authored by <b>Timothy Oriedo</b></h6></li>
                            </ul>
                        </vk-card>
                    </div>
                </vk-grid>
        </div>
        <div class="uk-padding-remove uk-margin-remove">
            <vk-card class="uk-card-red uk-width-1-1 uk-light uk-padding-large">
                <vk-grid class="uk-child-width-1-2@xl uk-child-width-1-2@l uk-child-width-1-2@m uk-child-width-expand@s uk-padding-large">
                    <div>
                        <h2>This is necessitated by the drive towards the 4th industrial revolution.</h2>
                        <ul class="uk-list uk-list-large">
                            <li><h6>The fourth industrial revolution is the current and developing environment in which disruptive technologies and trends such as the Internet of Things (IoT), robotics, virtual reality (VR) and artificial intelligence (AI) are changing the way we live and work.</h6></li>
                            <li><h6>Reskilling – the process of learning new skills so you can do a different job, or of training people to do a different job. While upskilling points out the same, it focuses more on improving worker's skills so they can work within the same job.</h6></li>
                        </ul>
                        <a class="uk-button uk-button-default uk-button-large" :href="plansLink">View Plans</a>
                    </div>
                </vk-grid>
            </vk-card>
        </div>

    </vk-grid>
</template>

<script>
    export default {
        name: 'landing',
        data () {
            return {
                plansLink:this.$router.resolve({name:"plans"}).href
            }
        }
    }
</script>
