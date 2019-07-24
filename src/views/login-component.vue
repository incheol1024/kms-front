<template>
  <v-layout align-center justify-center>
    <v-form ref="form" @keyup.native.enter="submit">
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>TEAM KMS</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field prepend-icon="person" v-model="name" label="Login" type="text"></v-text-field>
          <v-text-field prepend-icon="lock" v-model="password" label="Password" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="loading" :disabled="loading" color="primary" @click="submit">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-layout>
</template>

<script>
import api from "@/apis/api";
import router from "@/router";

export default {
  data: () => ({
    name: "",
    password: "",
    loading: false
  }),
  methods: {
    async submit() {
      this.loading = true;
      let bodyFormData = new FormData();
      bodyFormData.set("username", this.name);
      bodyFormData.set("password", this.password);
      try {
        let response = await api.login(bodyFormData);
        router.push("/title");
      } catch (e) {
        alert(`로그인 실패!!! 관리자에게 문의하세요.${JSON.stringify(e)}`);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>