<template>
  <v-app id='app'>
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="blue darken-3" dark app fixed>
        <v-toolbar-title style="width: 100px" class="ml-0 pl-3">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar-title>
        <v-text-field flat solo-inverted hide-details prepend-inner-icon="search" label="Search"
                      @keyup.enter="submit" placeholder="Press Enter"></v-text-field>
        <v-btn icon @click="logout">
            <v-icon>cancel</v-icon>
        </v-btn>
    </v-toolbar>

    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" v-model="drawer" fixed app>
        <v-container align-center>
            <h1 style="cursor: pointer" class=".display-4 mb-3" @click="gotitle">TEAM KMS</h1>
            <v-img src="https://picsum.photos/350/165" height="125" class="grey darken-4 mb-4"></v-img>

            <v-card>
                <v-list>
                    <v-list-group v-for="(item,i) in items" :key="i" prepend-icon="local_activity" no-action>
                        <template v-slot:activator>
                            <v-list-tile>
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>

                        <v-list-tile v-for="(children,k) in item.children" :key="k" @click="route(children)" avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>{{children.name}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>

                    <v-list-tile avatar @click="setting">
                        <v-list-tile-action>
                            <v-icon>settings</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Setting</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile avatar @click="help">
                        <v-list-tile-action>
                            <v-icon>help</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Help</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-container>
    </v-navigation-drawer>

    <v-content>
        <v-container fluid grid-list-md>
            <router-view></router-view>
        </v-container>
    </v-content>

    <v-dialog v-model="dialog" width="500">
        <v-card>
            <v-card-title class="headline primary lighten-2" primary-title>
                Error!!!!
            </v-card-title>
            <v-card-text>
                {{errormsg}}
            </v-card-text>
        </v-card>
    </v-dialog>
</v-app>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import util from 'util'
import 'vuetify/dist/vuetify.min.css'
import title from './views/title-component.vue'
import router from './router'
import { async } from 'q';

export default {
  data() {
        return {
            drawer: null,
            items: [{
                text: 'Solutions',
                children: [],
                type: 'SOL'
            }, {
                text: 'Sites',
                children: [],
                type: 'SITE'
            }, {
                text: 'Dev QnA',
                children: [],
                type: 'QNA'
            }],
            errormsg: "",
            dialog: false
        };
    },
    created() {
      this.items.forEach(async item =>  {
          if (item.children.length < 1) {
              try {
                var response = await axios.get("menu/" + item.type)
                for (let i = 0; i < response.data.length; i++) {
                        item.children.push(response.data[i]);
                    }
              }
              catch(e){
                
              }
            }
      })
    },
    methods: {
        logout: function logout() {
            axios.post("logout").then(function (response) {
                window.location.replace('login');
            }).catch(function (error) {
                window.location.replace('login');
            });
        },
        route(children) {
            if (children.type === 'SOL') router.push('/solutions/' + children.id);
            else if (children.type === 'SITE') router.push('/sites/' + children.id);
            else if (children.type === 'QNA') router.push('/qna/' + children.name + "/" + children.id);
        },
        gotitle() {
            router.push('/title');
        },
        submit() {
            router.push('/search');
        },
        setting() {
            router.push('/setting');
        },
        help() {
            router.push('/help');
        }
    }
}
</script>

<style lang="stylus">

</style>
