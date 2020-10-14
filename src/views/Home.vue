<template>
  <div>
    <div align="center" style="padding-top: 100px;">
      <b-card class="bg">
        <div>
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/599/599305.svg"
            style="width:150px;height:150px;"
            alt
          />
          <div style="margin-top:10px;">
            <h5>เข้าสู่ระบบ</h5>
          </div>
        </div>
        <div>
          <div align="left" style="margin-left:10px;">
            <h6>ชื่อผู้ใช้</h6>
          </div>
          <b-form-input
            v-model="MEMBER_USERNAME"
            placeholder="ชื่อผู้ใช้"
          ></b-form-input>
          <div align="left" style="margin-left:10px;margin-top:20px">
            <h6>รหัสผ่าน</h6>
          </div>
          <b-form-input
            v-model="MEMBER_PASSWORD"
            placeholder="รหัสผ่าน"
            type="password"
          ></b-form-input>
          <div style="margin-top:20px">
            <b-button block variant="success" @click="addCheck"
              >เข้าสู่ระบบ</b-button
            >
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    MEMBER_USERNAME: "",
    MEMBER_PASSWORD: ""
  }),
  methods: {
    addCheck() {
      axios.post("http://localhost:5000/selectMEMBER").then(response => {
        console.log(response.data);
        this.checkuser = response.data;
        for (let index = 0; index < this.checkuser.length; index++) {
          console.log(
            this.MEMBER_USERNAME,
            this.checkuser[index].MEMBER_USERNAME
          );
          console.log(
            this.MEMBER_PASSWORD,
            this.checkuser[index].MEMBER_PASSWORD
          );
          if (
            this.MEMBER_USERNAME == this.checkuser[index].MEMBER_USERNAME &&
            this.MEMBER_PASSWORD == this.checkuser[index].MEMBER_PASSWORD
          ) {
            if (this.checkuser[index].MEMBER_STATUS == "user") {
              this.$router.push({ path: "/productuser" });
              this.$store.commit(
                "Detail/SET_MEMBER_ID",
                this.checkuser[index].MEMBER_ID
              );
              localStorage.setItem("USER",1);
              
            } else {
              this.$router.push({ path: "/adminindex" });
              this.$store.commit(
                "Detail/SET_MEMBER_ID",
                this.checkuser[index].MEMBER_ID
              );
              localStorage.setItem("ADMIN",1);
            } 
          }
        }
      });
    }
  }
};
</script>
<style>
.card.bg {
  background-color: #f2f3f4;
  width: 70%;
  /* margin-left:200px;margin-right:200px; */
}
</style>
