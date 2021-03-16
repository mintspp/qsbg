<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <div style="margin-top: 60px"></div>
    <!-- เริ่ม -->
    <div >
      <div align="left" style="padding-left: 10px">
        <h2>ครุภัณฑ์หมดอายุ</h2>
      </div>
      <b-row >
        <b-col v-for="(nn,index) in notification" :key="index" cols="4">
      <b-card style="margin: 20px">
        <div align="center">
                <b-card-img
                  src="https://firebasestorage.googleapis.com/v0/b/test-f2583.appspot.com/o/technical-support.png?alt=media&token=65a8ac23-b3d9-47f8-a8e1-5da587df7cc7"
                  style="width:40%;"
                ></b-card-img>
              </div><br>
      เลขครุภัณฑ์ :  {{nn.PRODUCT_CODE}} <br>
      ยี่ห้อ :  {{nn.BRAND_NAME}} <br>
      ประเภท : {{nn.TYPE_NAME}} <br>
       วันหมดอายุ : {{nn.PRODUCT_EXP}} <br>
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
    // https://qsgb.herokuapp.com
    axios.post("https://qsgb.herokuapp.com/notification").then((response) => {
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