<script setup>
import { ref } from 'vue'
import Modal from '../components/Modal.vue'
import axios from 'axios'
let showModal = ref(false)
let products = ref([])

axios
  .get('http://34.125.211.64:3300/api/products', {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
  })
  .then((res) => {
    products.value = res.data.products
  })
  .catch((e) => {
    console.log(e)
  })

let id = ref('')
let name = ref('')
let brand = ref('')
let group = ref('')

let notif = ref(false)

const check = () => {
  if (name.value.length < 2 || brand.value.length < 2 || group.value.length < 2) {
    notif.value = 'red'
    return
  } else {
    notif.value = true

    axios.post(
        'http://34.125.211.64:3300/api/products/add',
        {
  "name": name.value,
  "brand": brand.value,
  "group": group.value,
  "price": 0,
  "arrival_price": 0,
  "selling_price": 0,
  "description": "Life good"
},
        {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        }
      )
      .then((res) => {
        console.log(res.data)
        location.reload()
      })
      .catch((e) => {
        console.log(e)
      })

    id.value = ''
    name.value = ''
    brand.value = ''
    group.value = ''
    return
  }
}

const deletee = (id)=>{
  axios.delete(`http://34.125.211.64:3300/api/products/${id}`,{
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        }).then((res)=> {
          console.log(res.data);
          location.reload()
        }).catch((e)=>{
          console.log(e);
        })
}

const edit = (id)=> {
  if (name.value.length < 2 || surname.value.length < 2) {
    notif.value = 'red'
    return
  }
  else{
  axios.patch(`http://34.125.211.64:3300/api/products/update/${id}`,{name: "John"},{
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        }).then((res)=> {
          console.log(res.data);
          location.reload()
        }).catch((e)=>{
          console.log(e);
        })
      }
}

const logout = ()=>{
        localStorage.removeItem('token')
        window.location.href = `/login`
}
</script>

<template>
  <div class="wrapper">
    <h1>Welcome</h1>
    <transition name="fade" appear>
      <modal :showModal.sync="showModal">
        <template #header> <h3>Create product</h3> </template>

        <template #body>
          <input name="pname" v-model="name" class="product-input" placeholder="Name" type="text" />
          <input name="pbrand" v-model="brand" class="product-input" placeholder="Brand" type="text" />
          <input
            name="pprice"
            v-model="group"
            class="product-input"
            placeholder="Group"
            type="text"
          />
        </template>

        <template #footer>
          <button @click="showModal = false">Cancel</button>
          <button
            v-on:click="check(), showModal = false"
          >
            Create
          </button>
        </template>
      </modal>
    </transition>

    <!-- <h1>{{ products }}</h1> -->
    <table>
      <tr>
        <th>id</th>
        <th>Product name</th>
        <th>Brand</th>
        <th>Group</th>
        <th>Delete</th>
        <th>Update</th>
      </tr>

      <tbody v-for="(product, index) in products" :key="index">
        <tr v-if="index % 2" style="background-color: rgb(191, 254, 233)">
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.group }}</td>
          <td><button @click="deletee(product._id)" style="background-color: crimson; color: white;">Delete</button></td>
          <td><button v-on:click="edit(product._id)" style="background-color:yellow; color: black;">Edit</button></td>
        </tr>

        <tr v-else>
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.group }}</td>
          <td><button @click="deletee(product._id)" style="background-color: crimson; color: white;">Delete</button></td>
          <td><button v-on:click="edit(product._id)" style="background-color:yellow; color: black;">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <button @click="showModal = true">Create product</button>
    <button @click="logout">Log out</button>
    <div
      v-if="notif === true"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgb(54, 240, 178);
        width: 150px;
        height: 60px;
        border-radius: 5px;
      "
    >
      <div style="display: flex; width: 100%; justify-content: end; padding-right: 5px">
        <button
          @click="notif = false"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: crimson;
            height: 10px;
            width: 10px;
            margin-top: 5px;
          "
        >
          x
        </button>
      </div>
      <p style="font-family: sans-serif; color: white">Successfuly saved</p>
    </div>

    <div
      v-else-if="notif == 'red'"
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: crimson;
        width: 120px;
        height: 60px;
        border-radius: 5px;
      "
    >
      <div style="display: flex; width: 100%; justify-content: end; padding-right: 5px">
        <button
          @click="notif = false"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: white;
            height: 10px;
            width: 10px;
            margin-top: 5px;
            color: crimson;
          "
        >
          x
        </button>
      </div>
      <p style="font-family: sans-serif; color: white">Not saved</p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-family: sans-serif;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-direction: column;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.product-input {
  border: 2px solid rgb(185, 185, 185);
  font-family: sans-serif;
  padding: 10px;
  text-align: start;
  width: 60%;
  color: rgb(123, 123, 123);
}

#ptype {
  border: 2px solid rgb(185, 185, 185);
  font-family: sans-serif;
  padding: 10px;
  text-align: start;
  width: 60%;
  color: rgb(123, 123, 123);
}

table {
  width: 40%;
  padding: 10px;
}

th {
  background-color: rgb(191, 181, 220);
  font-family: sans-serif;
  padding: 10px;
}

td{
    padding: 10px;
    font-family: sans-serif;
}

tr {
  text-align: center;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(18, 221, 153);
  color: rgb(243, 249, 255);
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition:
    transform 0.4s cubic-bezier(0.5, 0, 0.5, 1),
    opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
