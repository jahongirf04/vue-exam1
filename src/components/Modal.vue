<template>


  <transition name="pop" appear>
  <div class="modal-backdrop" v-show="showModal" @click="closeModal">
    <div role="dialog" class="modal" @click.stop>
      <div class="modal-header"><slot name="header"> Default header </slot></div>
      <div class="modal-body"><slot name="body"> Default body </slot></div>
      <div class="modal-footer"><slot name="footer"> Default footer </slot></div>
    </div>
    
  </div>
</transition>
</template>

<script>
export default {
  props: { showModal: { type: Boolean, required: true } },
  methods: {
    closeModal() {
      this.$emit('update:showModal', false)
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
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

.modal {
  width: 500px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
    transform: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.modal-header {
  padding: 10px;
  background-color: #f0f0f0;
  width: 100%;
  text-align: center;
}


.modal-body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  text-align: center;
  flex-direction: column;
  gap: 20px;
}

.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #f0f0f0;
  width: 100%;
  text-align: center;
  gap: 20px;
}

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .4s linear;
  }
   .fade-enter,
.fade-leave-to {
  opacity: 0;
}


.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
