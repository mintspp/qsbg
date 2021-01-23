<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <div style="margin-top: 60px"></div>
    <!-- เริ่ม -->
    <div >
      <b-row >
        <b-col v-for="(nn,index) in notification" :key="index" cols="4">
      <b-card style="margin: 20px">
        {{nn.PRODUCT_ID}}
      </b-card>
      </b-col>
      </b-row>
    </div>
    <!-- จบ -->
  </div>
</template>

<script>
import Nav from "../../components/Nav";
import axios from "axios";
export default {
  components: {
    Nav,
  },
  data: () => ({
    login: "",
    notification: null,
  }),
  created() {
    this.showlogin();
  },
  mounted() {
    axios.post("http://localhost:5000/notification").then((response) => {
      console.log(response.data);
      this.notification = response.data;
    });
  },
  methods: {
    showlogin() {
      this.login = localStorage.getItem("ADMIN");
      console.log(this.login);
    }
  },
};
</script>

<style>
.navbarbar {
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
}

.mb-2,
.my-2 {
  z-index: 1 !important;
  margin-bottom: 0.5rem !important;
}

*,
*::before,
*::after {
  z-index: 9999 !important;
  box-sizing: border-box;
}

.modal-backdrop {
  opacity: 0.5;
  z-index: 1 !important;
}
</style>