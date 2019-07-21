<template>
    <v-layout row wrap full-height>
        <v-flex d-flex xs9>
            <v-layout column mr-5>
                <v-flex >
                    <project-component></project-component>
                </v-flex>
                <v-flex>
                    <event-component></event-component>
                </v-flex>
            </v-layout>
        </v-flex>

        <v-flex xs3>
            <overview-component></overview-component>
        </v-flex>

        <v-flex xs12>
            <recent-component></recent-component>
        </v-flex>
    </v-layout>
</template>

<script>
import event from "./dashboard/event-component.vue"
import overview from "./dashboard/overview-component.vue"
import project from "./dashboard/project-component.vue"
import recent from "./dashboard/recent-component.vue"

export default {
    components :{
        "event-component" : event,
        "overview-component": overview,
        "project-component" : project,
        "recent-component" : recent
    }
}
</script>