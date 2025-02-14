<template>
  <v-app>
    <v-main>
      <v-container class="pa-3 fill-height">
        <v-row wrap>
          <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
          <v-col cols="12" md="6" offset-md="3">
            <v-card :loading="loading" elevation="1" light tag="section" class="mx-auto rounded-lg" min-height="500"
              max-width="450">
              <v-card-title>
                <v-row align="center" justify="space-between">
                  <v-col class="text-center">
                    <img :src="companyLogo" alt="UII Logo" width="250" style="vertical-align: middle" class="my-3" />
                    <div class="text-h6 font-weight-bold">Login</div>
                    <div class="text-h4 font-weight-bold primary--text" style="margin-bottom: 165px">{{ app_name }}
                    </div>
                    <!-- <img :src="appLogo" alt="UII Logo" width="120" style="vertical-align: middle;margin-bottom: 165px;" /> -->
                    <div class="ma-3">
                      <div v-if="auth_type === 'google'">
                        <div class="google-login-button-container" ref="googleLoginBtn"></div>
                        <v-divider class="mt-3 mb-3"></v-divider>
                        <v-btn :loading="loading" small :disabled="loading" @click="auth_type = 'password'"
                          color="primary" outlined block>Login dengan password</v-btn>
                      </div>
                      <div v-if="auth_type === 'password'">
                        <v-form ref="form" v-model="valid" @submit="login" lazy-validation>
                          <v-text-field id="email" v-model="email" :rules="[
            (v) => !!v || 'E-mail is required',
            (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ]" label="E-mail" prepend-icon="mdi-email" required></v-text-field>
                          <v-text-field id="password" v-model="password" :rules="[(v) => !!v || 'Password is required']"
                            label="Password" prepend-icon="mdi-lock" type="password" required></v-text-field>
                          <v-btn :loading="loading" :disabled="loading" @click="login" color="primary"
                            block>Masuk</v-btn>
                          <v-divider class="mt-3 mb-3"></v-divider>
                        </v-form>
                        <div class="google-login-button-container" ref="googleLoginBtn"></div>
                      </div>
                      <div class="caption text-center mt-5">{{ app_url }}</div>

                      <!-- <router-link :to="{ name: 'landing-page' }" style="color: grey;"
                    class="text-caption">Kembali</router-link> -->
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  data: () => ({
    valid: true,
    loading: false,
    overlay: false,
    app_name: import.meta.env.VITE_APP_NAME,
    app_url: import.meta.env.VITE_APP_URL,
    companyLogo: import.meta.env.VITE_APP_LOGO_AUTH,
    appLogo: '/assets/logo/sekawan.png',
    auth_type: 'google',
    email: '',
    password: '',
  }),
  mounted() {
    const gClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    window.google.accounts.id.initialize({
      client_id: gClientId,
      callback: this.googleCallback,
      auto_select: true
    });
    window.google.accounts.id.renderButton(this.$refs.googleLoginBtn, {
      text: 'signin_with',
      theme: "outline",
      size: "large"
    });
    window.google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // try next provider if OneTap is not displayed or skipped
      }
    });
  },
  created() {
    this.$store.dispatch('logout');
  },
  methods: {
    googleCallback(googleRes) {
      this.loading = true;
      this.axios.post('google/callback', googleRes).then(response => {
        this.afterLogin(response?.data);
      })
        .catch((err))
        .finally(() => this.loading = false);
      this.afterLogin('user');
      this.loading = false;

    },
    login() {
      this.valid = this.$refs.form.validate();
      if (this.valid) {
        this.loading = true;
        const body = {
          email: this.email,
          password: this.password,
        };
        // this.axios.get(`${this.app_url}/sanctum/csrf-cookie`).then(res => {
        //   this.axios
        //     .post('auth/login', body)
        //     .then((response) => {
        //       this.afterLogin(response?.data);
        //     })
        //     .catch((err) => console.log(err))
        //     .finally(() => (this.loading = false));
        // });
      }
    },
    afterLogin(data) {
      this.$store.dispatch('login', { user: data });
      this.$router.push({ name: 'dashboard', params: {} });
    },
    setLocale(locale) {
      localStorage.setItem('locale', locale);
      location.reload();
    },
  },
  components: { RouterLink }
};
</script>

<style scoped>
.google-login-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>