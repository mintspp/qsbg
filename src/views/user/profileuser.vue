<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Navuser />
    <!-- --------------nav------------ -->
    <div style="margin-top:80px;"></div>
    <div align="center">
      <b-card style="width:80%">
        <div>
          <h2>ข้อมูลส่วนตัว</h2>
          <b-row>
            <b-col align="right" cols="6">ชื่อ : </b-col>
            <b-col cols="6">
              <!-- <b-form-input :value="user[0].MEMBER_NAME" class="text-center" style="width:50%;" disabled></b-form-input> -->
              <div align="left" style="margin-left:10px;">
                {{ user[0].MEMBER_NAME }}
              </div>
            </b-col>
          </b-row>
        </div>

        <div style="margin-top:20px;">
          <b-row>
            <b-col align="right" cols="6">สำนักงาน :</b-col>
            <b-col cols="6">
              <div align="left" style="margin-left:10px;">
                {{ user[0].MEMBER_WORK }}
              </div>
            </b-col>
          </b-row>
        </div>

        <div style="margin-top:20px;">
          <b-row>
            <b-col align="right" cols="6">เบอร์โทร :</b-col>
            <b-col cols="6">
              <div align="left" style="margin-left:10px;">
                {{ user[0].MEMBER_TELL }}
              </div>
            </b-col>
          </b-row>
        </div>

        <div style="margin-top:20px;">
          <b-row>
            <b-col align="right" cols="6">อีเมล :</b-col>
            <b-col cols="6">
              <div align="left" style="margin-left:10px;">
                {{ user[0].MEMBER_EMAIL }}
              </div>
            </b-col>
          </b-row>
        </div>

        <div style="margin-top:20px;">
          <b-row>
            <b-col align="right" cols="6">ชื่อผู้ใช้งาน :</b-col>
            <b-col cols="6">
              <div align="left" style="margin-left:10px;">
                {{ user[0].MEMBER_USERNAME }}
              </div>
            </b-col>
          </b-row>
        </div>

        <div style="margin-top:20px;">
          <b-row>
            <b-col align="right" cols="6">รหัสผ่าน</b-col>
            <b-col cols="6">
              <div align="left" style="margin-left:10px;">
                {{ user[0].MEMBER_PASSWORD }}
              </div>
            </b-col>
          </b-row>
        </div>

        <div style="margin-top:20px;">
          <b-button variant="warning" @click="showModal">แก้ไขข้อมูล</b-button>
          <b-modal ref="my-modal" hide-footer title="Using Component Methods">
            <div class="d-block text-center">
              <h3>Hello From My Modal!</h3>
            </div>
            <b-button
              class="mt-3"
              variant="outline-danger"
              block
              @click="hideModal"
              >Close Me</b-button
            >
            <b-button
              class="mt-2"
              variant="outline-warning"
              block
              @click="toggleModal"
              >Toggle Me</b-button
            >
          </b-modal>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import Navuser from "../../components/Navuser";
import axios from "axios";
export default {
  components: {
    Navuser
  },
  data: () => ({
    login: "",
    user: null
  }),
  created() {
    this.showmember();
    this.showlogin();
  },
  methods: {
    showlogin() {
      this.login = localStorage.getItem("USER");
      console.log(this.login);
    },
    showmember() {
      console.log(this.$store.getters["Detail/MEMBER_ID"]);
      axios
        .post("http://localhost:5000/selectprofileuser", {
          MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"]
        })
        .then(response => {
          console.log(response.data);
          this.user = response.data;
        });
      return this.$store.getters["Detail/MEMBER_ID"];
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
  }
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