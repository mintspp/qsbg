<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <div style="margin-top: 80px"></div>
    <div align="center">
      <b-card style="width: 80%">
        <h2>ข้อมูลส่วนตัว</h2>
        <b-row>
          <b-col cols="6">
            <b-img
              style="width: 300px"
              src="https://www.flaticon.com/svg/vstatic/svg/476/476863.svg?token=exp=1610615862~hmac=e7873a5d50a41909b9d82cb3d27f362b"
            ></b-img>
          </b-col>
          <b-col cols="6">
            <div>
              <b-row>
                <b-col align="right" cols="6">ชื่อ : </b-col>
                <b-col cols="6">
                  <!-- <b-form-input :value="user[0].MEMBER_NAME" class="text-center" style="width:50%;" disabled></b-form-input> -->
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_NAME }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="right" cols="6">สำนักงาน :</b-col>
                <b-col cols="6">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_WORK }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="right" cols="6">เบอร์โทร :</b-col>
                <b-col cols="6">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_TELL }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="right" cols="6">อีเมล :</b-col>
                <b-col cols="6">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_EMAIL }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="right" cols="6">ชื่อผู้ใช้งาน :</b-col>
                <b-col cols="6">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_USERNAME }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="right" cols="6">รหัสผ่าน</b-col>
                <b-col cols="6">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_PASSWORD }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-button variant="warning" @click="showModal"
                >แก้ไขข้อมูล</b-button
              >
              <b-modal ref="my-modal" hide-footer title="แก้ไขข้อมูล">
                <div class="d-block text-center">
                  <b-row style="margin-top: 5px">
                    <b-col cols="4" align="right">ชื่อ :</b-col>
                    <b-col cols="8">
                      <b-form-input
                        v-model="user[0].MEMBER_NAME"
                        style="width: 80%"
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top: 5px">
                    <b-col cols="4" align="right">เบอร์โทร :</b-col>
                    <b-col cols="8">
                      <b-form-input
                        v-model="user[0].MEMBER_TELL"
                        style="width: 80%"
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top: 5px">
                    <b-col cols="4" align="right">อีเมล :</b-col>
                    <b-col cols="8">
                      <b-form-input
                        v-model="user[0].MEMBER_EMAIL"
                        style="width: 80%"
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top: 5px">
                    <b-col cols="4" align="right">ชื่อผู้ใช้งาน :</b-col>
                    <b-col cols="8">
                      <b-form-input
                        v-model="user[0].MEMBER_USERNAME"
                        style="width: 80%"
                      ></b-form-input>
                    </b-col>
                  </b-row>

                  <b-row style="margin-top: 5px">
                    <b-col cols="4" align="right">รหัสผ่าน :</b-col>
                    <b-col cols="8">
                      <b-form-input
                        v-model="user[0].MEMBER_PASSWORD"
                        style="width: 80%"
                      ></b-form-input>
                    </b-col>
                  </b-row>
                </div>
                <b-button
                  class="mt-2"
                  variant="outline-warning"
                  block
                  @click="updatemember()"
                  >ยืนยัน</b-button
                >
              </b-modal>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </div>
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
    user: null,
  }),
  created() {
    this.showmember();
    this.showlogin();
  },
  mounted() {
    axios
        .post("http://localhost:5000/selectprofileuser", {
          MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"],
        })
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
        });
  },
  methods: {
    showlogin() {
      this.login = localStorage.getItem("ADMIN");
      console.log(this.login);
    },
    updatemember() {
      axios
        .post("http://localhost:5000/upprofile", {
          MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"],
          MEMBER_NAME: this.user[0].MEMBER_NAME,
          MEMBER_TELL: this.user[0].MEMBER_TELL,
          MEMBER_EMAIL: this.user[0].MEMBER_EMAIL,
          MEMBER_USERNAME: this.user[0].MEMBER_USERNAME,
          MEMBER_PASSWORD: this.user[0].MEMBER_PASSWORD,
        })
        .then((response) => {
          console.log(response.data);
          this.reset(response);
          this.$refs["my-modal"].hide();
        });
    },
    reset() {
      axios
        .post("http://localhost:5000/selectprofileuser", {
          MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"],
        })
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
        });
    },
    showmember() {
      console.log(this.$store.getters["Detail/MEMBER_ID"]);
      
      return this.$store.getters["Detail/MEMBER_ID"];
    },
    showModal() {
      this.$refs["my-modal"].show();
    },

    goindex() {
      this.$router.push({ path: "/adminindex" });
    },
    goregister() {
      this.$router.push({ path: "/adminregister" });
    },
    godetailfix() {
      this.$router.push({ path: "/admindetailfix" });
    },
    gohistory() {
      this.$router.push({ path: "/adminhistory" });
    },
    gonotification() {
      this.$router.push({ path: "/adminnotification" });
    },
  },
};
</script>

<style>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  z-index: 1 !important;
  border-radius: 0.25rem;
}
</style>