<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <div style="margin-top: 80px"></div>
    <div align="center">
      <b-card style="width: 80%">
       <div style="margin-bottom: 40px"><h2>ข้อมูลส่วนตัว</h2></div> 
        <b-row>
          <b-col  xl="6" lg="6" sm="12" >
            <b-img
              style="width: 220px"
              src="https://firebasestorage.googleapis.com/v0/b/test-f2583.appspot.com/o/dossier.png?alt=media&token=22457698-d4de-4e30-a45c-3cb5c57dbf48"
            ></b-img><br><br>
          </b-col>
          <b-col  xl="6" lg="6" sm="12" >
            <div>
              <b-row>
                <b-col align="left" cols="4" style="padding-left: 12px !important;"><b>ชื่อ : </b> </b-col>
                <b-col cols="8">
                  <!-- <b-form-input :value="user[0].MEMBER_NAME" class="text-center" style="width:50%;" disabled></b-form-input> -->
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_NAME }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="left" cols="4" style="padding-left: 12px !important;"><b>สำนักงาน :</b></b-col>
                <b-col cols="8">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_WORK }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="left" cols="4" style="padding-left: 12px !important;"><b>เบอร์โทร :</b> </b-col>
                <b-col cols="8">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_TELL }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="left" cols="4" style="padding-left: 12px !important;"><b>อีเมล :</b> </b-col>
                <b-col cols="8">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_EMAIL }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="left" cols="4" style="padding-left: 12px !important;"><b>ชื่อผู้ใช้งาน :</b> </b-col>
                <b-col cols="8">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_USERNAME }}
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top: 20px">
              <b-row>
                <b-col align="left" cols="4" style="padding-left: 12px !important;"><b>รหัสผ่าน :</b> </b-col>
                <b-col cols="8">
                  <div align="left" style="margin-left: 10px">
                    {{ user[0].MEMBER_PASSWORD }}
                  </div>
                </b-col>
              </b-row>
            </div>

            
          </b-col>
        </b-row>
        <div  align="center" style="margin-top: 20px">
              <b-button variant="warning" @click="showModal"
                >แก้ไขข้อมูล</b-button
              >
              <b-modal ref="my-modal" hide-footer title="">
                 <div align="center">
              <b><h4>เเก้ไขข้อมูล</h4></b>
            </div>
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
        .post("https://qsbg.herokuapp.com/selectprofileuser", {
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
        .post("https://qsbg.herokuapp.com/upprofile", {
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
        .post("https://qsbg.herokuapp.com/selectprofileuser", {
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