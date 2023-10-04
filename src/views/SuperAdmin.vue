<script setup>
import { ref } from 'vue'
import Modal from '../components/Modal.vue'
import axios from 'axios'
let showModal = ref(false)
let editModal = ref(false)
let users = ref([])

axios
  .get('http://34.125.211.64:3300/api/users', {
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
  })
  .then((res) => {
    users.value = res.data.users
  })
  .catch((e) => {
    console.log(e)
  })

let id = ref('')
let name = ref('')
let surname = ref('')

let notif = ref(false)

const check = () => {
  if (name.value.length < 2 || surname.value.length < 2) {
    notif.value = 'red'
    return
  } else {
    notif.value = true
    console.log(surname.value, name.value);

    axios.post(
        'http://34.125.211.64:3300/api/users/add',
        {
  name: name.value,
  surname: surname.value,
  age: 18,
  is_diploma: false,
  address: "Hell"
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
    surname.value = ''
    return
  }
}


const deletee = (id)=>{
  axios.delete(`http://34.125.211.64:3300/api/users/${id}`,{
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}` }
        }).then((res)=> {
          console.log(res.data);
          location.reload()
        }).catch((e)=>{
          console.log(e);
        })
}

const edit = (id)=> {

  axios
    .patch(
      `http://34.125.211.64:3300/api/users/update/${editId.value}`,
      { name: editName.value, surname: editSurname.value },
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
}

const logout = ()=>{
        localStorage.removeItem('token')
        window.location.href = `/login`
}

let editName = ref('')
let editSurname = ref('')
let editId = ref('')
const openEditModal = (name, surname, id) => {
  editName.value = name
  editSurname.value = surname
  editId.value = id
}
</script>

<template>
  <div class="wrapper">
    <div v-if="editModal" class="edit-modal-backdrop">
      <div class="edit-modal">
          <h3 style="font-family: sans-serif;">Edit user</h3>
          <input name="pname" v-model="editName" class="product-input" placeholder="Name" type="text" />
          <input
            name="pbrand"
            v-model="editSurname"
            class="product-input"
            placeholder="Brand"
            type="text"
          />
          <div style="display: flex; flex-direction: row; width: 60%; gap: 30px">
            <button style="width: 48%" @click="editModal = false">Cancel</button>
            <button style="width: 48%" v-on:click="edit(), (editModal = false)">Save</button>
          </div>
      </div>
    </div>


    <h1>Welcome</h1>
    <h1>Users</h1>



    <transition name="fade" appear>
      <modal :showModal.sync="showModal">
        <template #header> <h3>Create user</h3> </template>

        <template #body>
          <input name="pname" v-model="name" class="product-input" placeholder="Name" type="text" />
          <input
            v-model="surname"
            name="psurname"
            class="product-input"
            placeholder="Surname"
            type="text"
          />
        </template>

        <template #footer>
          <button @click="showModal = false">Cancel</button>
          <button v-on:click="check(), (showModal = false)">Create</button>
        </template>
      </modal>
    </transition>


    <table>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Surname</th>
        <th>Delete</th>
        <th>Update</th>
      </tr>

      <tbody v-for="(product, index) in users" :key="index">
        <tr v-if="index % 2" style="background-color: rgb(191, 254, 233)">
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.surname }}</td>
          <td><button @click="deletee(product._id)"  style="background-color: crimson; color: white;">Delete</button></td>
          <td>
            <button
              v-on:click="
                openEditModal(product.name, product.surname, product._id), (editModal = true)
              "
              style="background-color: yellow; color: black"
            >
              Edit
            </button>
          </td>
        </tr>

        <tr v-else>
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.surname }}</td>
          <td><button @click="deletee(product._id)" style="background-color: crimson; color: white;">Delete</button></td>
          <td>
            <button
              v-on:click="
                openEditModal(product.name, product.surname, product._id), (editModal = true)
              "
              style="background-color: yellow; color: black"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="showModal = true">Create user</button>
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
  padding: 10px;
  font-family: sans-serif;
}

td{
  padding: 10px;
  font-family: sans-serif;
}

tr {
  text-align: center;
  padding: 10px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(18, 221, 153);
  color: rgb(243, 249, 255);
  cursor: pointer;
}

.edit-modal-backdrop {
  /* position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 50vh;
    width: 50%;
    gap: 20px;
    background-color: azure; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-modal{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 50vh;
    width: 50%;
    gap: 20px;
    background-color: azure;
    border-radius: 10px;
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
