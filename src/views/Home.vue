<template>
  <div class="colorr">
    <b-row style="margin-right: 0px;
    margin-left: 0px;">
    <b-col xl="3" lg="3"></b-col>
      <b-col xl="6" lg="6" sm="12">
        <div class="login">
          <b-card
            style="
              background-color: #17a2b8;
              border-radius: 50px;
            "
          >
            <b-row style="margin: 20px">
              <b-col xl="12" lg="12" sm="12">
                <div>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/test-f2583.appspot.com/o/login.png?alt=media&token=5d4c1a18-347a-4e8b-ba4b-46595fd0da03"
                    style="width: 316px"
                    alt=""
                  />
                </div>
              </b-col>
              <b-col xl="12" lg="12" sm="12">
                <div style="margin-top: 10px">
                  <font color="#fffff"><h3>องค์การสวนพฤกษศาสตร์</h3></font>
                </div>
                <div style="margin-bottom: 30px">
                  <div align="left" style="margin-top: 30px">
                    <font color="#fffff"><h6>ชื่อผู้ใช้</h6></font>
                  </div>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon icon="person-fill" variant="success"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      type="text"
                      v-model="MEMBER_USERNAME"
                      placeholder="กรอกชื่อผู้ใช้"
                    ></b-form-input>
                  </b-input-group>
                  <div align="left" style="margin-top: 10px">
                    <font color="#fffff"><h6>รหัสผ่าน</h6></font>
                  </div>
                  <b-input-group class="mb-2">
                    <b-input-group-prepend is-text>
                      <b-icon
                        icon="shield-lock-fill"
                        variant="success"
                      ></b-icon>
                    </b-input-group-prepend>
                    <b-form-input
                      type="password"
                      v-model="MEMBER_PASSWORD"
                      placeholder="กรอกรหัสผ่าน"
                    ></b-form-input>
                  </b-input-group>

                  <b-button pill variant="success" @click="addCheck" block
                    >เข้าสู่ระบบ</b-button
                  >
                </div>
              </b-col>
            </b-row>
          </b-card>
          <b-modal id="bv-modal-example" size="sm" centered hide-footer>
            <div class="d-block text-center">
              <div class="center" style="margin-bottom: 10px">
                <img
                  src="https://www.flaticon.com/svg/vstatic/svg/753/753345.svg?token=exp=1611392368~hmac=a9ec527b66e983c751b1a0d3c4638606"
                  width="70px;"
                  alt=""
                />
              </div>
              <font color="#FF0000"><h5>เข้าสู่ระบบไม่สำเร็จ</h5></font>
              <h6>กรุณากรอกให้ถูกต้อง</h6>
            </div>
          </b-modal>
        </div></b-col
      >
      <b-col xl="3" lg="3"></b-col>
      </b-row
    >
  </div>
</template>

<script>
const api_url = require("../../utilities/api");
import axios from "axios";
export default {
  data: () => ({
    MEMBER_USERNAME: "",
    MEMBER_PASSWORD: "",
  }),
  methods: {
    addCheck() {
      
      axios.post(`${api_url.api_url}/selectMEMBER`).then((response) => {
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
              localStorage.setItem("USER", 1);
            } else {
              this.$router.push({ path: "/adminregister" });
              this.$store.commit(
                "Detail/SET_MEMBER_ID",
                this.checkuser[index].MEMBER_ID
              );
              localStorage.setItem("ADMIN", 1);
            }
          } else {
            this.$bvModal.show("bv-modal-example");
          }
        }
      });
    },
  },
};
</script>
<style>
.login {
  margin-top: 40px;
  padding: 0px 20px;
}
.cards {
  margin-top: 50px;
  background-color: #f06292e3;
  border-radius: 100px;
}
.colorr {
  /* background-color: #fffd82; */
  background-image: url("");
  padding-bottom: 5%;
}
</style>
