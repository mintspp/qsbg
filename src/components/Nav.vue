<template>
  <div class="navbarbar">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>QSBG</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown left>
            <template v-slot:button-content> จัดการข้อมูล </template>
            <b-dropdown-item @click="goregister">
              ข้อมูลสมาชิก
            </b-dropdown-item>
            <b-dropdown-item @click="goindex"> ข้อมูลครุภัณฑ์ </b-dropdown-item>
            <b-dropdown-item @click="gosetting">
              ข้อมูลยี่ห้อ/ประเภท
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item-dropdown left>
            <template v-slot:button-content> ประวัติ</template>
            <b-dropdown-item @click="gohistory">
              ประวัติการแจ้งซ่อมครุภัณฑ์
            </b-dropdown-item>
            <b-dropdown-item @click="gocannotrepair"> ประวัติไม่สามารถซ่อมครุภัณฑ์ได้ </b-dropdown-item>
            <b-dropdown-item @click="godistributor"> ประวัติการจัดจำหน่าย </b-dropdown-item>
           
          </b-nav-item-dropdown>
            <b-nav-item @click="godashboard">สรุปยอดครุภัณฑ์</b-nav-item>
            
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <!-- person-fill -->
              <template v-slot:button-content>
                <b-badge variant="danger">{{ count.length }}</b-badge>
                <b-icon icon="bell-fill" scale="1"></b-icon>
              </template>
              <b-dropdown-item @click="godetailfix">
                <b-badge variant="danger">{{ count.length }}</b-badge
                >แจ้งซ่อมครุภัณฑ์
              </b-dropdown-item>
              <b-dropdown-item @click="gonotification">
                <b-badge variant="danger">0</b-badge>แจ้งประกันหมดอายุ
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <!-- person-fill -->
              <template v-slot:button-content>
                <b-icon icon="person-fill" scale="1"></b-icon>
              </template>
              <b-dropdown-item @click="goprofile">โปรไฟล์</b-dropdown-item>
              <b-dropdown-item @click="showModal1">ออกจากระบบ</b-dropdown-item>
              <b-modal ref="my-modal1" hide-footer>
                <b-container fluid>
                  <b-row>
                    <b-col cols="12" align="center">
                      <div style="margin-bottom: 20px">
                        <h5>คุณต้องการออกจากระบบใช่หรือไม่</h5>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
                <b-row>
                  <b-col cols="6">
                    <div style="margin-left: 50px; margin-right: 10px">
                      <b-button variant="success" @click="logout" block
                        >ใช่</b-button
                      >
                    </div>
                  </b-col>
                  <b-col cols="6">
                    <div style="margin-left: 10px; margin-right: 50px">
                      <b-button variant="danger" block @click="hidemodal"
                        >ไม่ใช่</b-button
                      >
                    </div>
                  </b-col>
                </b-row>
              </b-modal>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Nav",
  data: () => ({
    login: "",
    count: null,
  }),
  mounted() {
    axios.post("http://localhost:5000/selectfixcount").then((response) => {
      console.log(response.data);
      this.count = response.data;
      console.log(this.count.length);
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
    showModal1() {
      this.$refs["my-modal1"].show();
    },
    hidemodal() {
      this.$refs["my-modal1"].hide();
    },
    goindex() {
      this.$router.push({ path: "/adminindex" });
    },
    gonotification() {
      this.$router.push({ path: "/adminnotification" });
    },
    goregister() {
      this.$router.push({ path: "/adminregister" });
    },
    godistributor(){
      this.$router.push({ path: "/admindistributor" });
    },
    godetailfix() {
      this.$router.push({ path: "/admindetailfix" });
    },
    gohistory() {
      this.$router.push({ path: "/adminhistory" });
    },
    goprofile() {
      this.$router.push({ path: "/adminprofile" });
    },
    godashboard() {
      this.$router.push({ path: "/admindashboard" });
    },
    gosetting() {
      this.$router.push({ path: "/adminsetting" });
    },
    gocannotrepair() {
      this.$router.push({ path: "/admincannotrepair" });
    },
  },
};
</script>

<style>
</style>