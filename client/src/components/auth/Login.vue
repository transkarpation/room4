<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)">
      <h3>Login</h3>
      <ValidationProvider
        name="email"
        rules="required"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            v-model="fd.email"
            type="email"
            :class="['form-control', {'is-invalid': errors[0]}]"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div class="invalid-feedback">
            {{ errors[0] }}
          </div>
        </div>
      </ValidationProvider>
      <ValidationProvider
        name="password"
        rules="required"
        v-slot="{ errors }"
      >
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            v-model="fd.password"
            type="password"
            :class="['form-control', {'is-invalid': errors[0]}]"
            id="exampleInputPassword1"
          />
          <div class="invalid-feedback">
            {{ errors[0] }}
          </div>
        </div>
      </ValidationProvider>
      <button type="submit" class="btn btn-primary">Submit</button>
      or <router-link :to="{path: '/auth/register'}">Register</router-link>
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      fd: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        let resp = await this.$http.post("/auth/login", this.fd);
        this.$store.commit('login', resp.data)
        this.$router.push({path: '/'})
      } catch (e) {
        if (e.response && e.response.status === 401) {
          this.$notify({
            group: 'main',
            text: 'Wrong credentials',
            type: 'error'
          })
        }
      }
    },
  },
};
</script>
