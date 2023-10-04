<template>
  <div class="wrapper">
    <h1>Login</h1>

    <input v-model="username" class="form" placeholder="Username" type="text" name="username" />
    <input v-model="password" class="form" placeholder="Password" type="text" name="password" />
    <p v-if="incorrect===true" style="color: crimson; font-family: sans-serif">Fill form</p>
    <p
    v-else-if="incorrect=='roleerror'"
      style="color: crimson; font-family: sans-serif"
    >
      Incorrect username or password
    </p>
    <button @click="check" class="form">Log In</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

let username = ref('')
let password = ref('')

let role = ref('')

let incorrect = ref(false)

const check = () => {
  if (username.value.length < 2 || password.value.length < 2) {
    incorrect.value = true
    return
  }

  axios
    .post('http://34.125.211.64:3300/api/admins/login', {
      username: username.value,
      password: password.value
    })
    .then((res) => {
      role.value = res.data.roles[0]
      if(role.value != 'admin' && role.value != 'superadmin'){
          incorrect.value = "roleerror"
          username.value = ""
          password.value = ""
      }
      else{
        localStorage.setItem( 'token', JSON.stringify(res.data.token) );
        window.location.href = `/${role.value}`
      }
    })
    .catch((e) => {
      console.log(e)
    })

}
</script>

<style scoped>
h1 {
  font-family: sans-serif;
}

.form {
  padding: 7px;
  width: 200px;
  background-color: rgb(227, 255, 246);
  border-radius: 5px;
  border: 2px solid rgb(179, 179, 179);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;
}
</style>
