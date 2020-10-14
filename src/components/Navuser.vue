<template>
  <div class="navbarbar">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>QSBG</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item @click="goproduct">แจ้งซ่อมครุภัณฑ์</b-nav-item>

            <b-nav-item @click="goindex">รายการแจ้งซ่อมครุภัณฑ์</b-nav-item>
            <b-nav-item @click="gohistoryuser">ประวัติการแจ้งซ่อมครุภัณฑ์</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <!-- person-fill -->
              <template v-slot:button-content>
                <b-icon icon="person-fill" scale="1"></b-icon>
              </template>
              <b-dropdown-item @click="goprofile">โปรไฟล์</b-dropdown-item>
              <b-dropdown-item @click="showModal1">ออกจากระบบ</b-dropdown-item>
              <b-modal
                ref="my-modal1"
                hide-footer
               
              >
                <b-container fluid>
                  <b-row>
                    <b-col cols="12" align="center">
                      <div style="margin-bottom:20px;">
                        <h5>คุณต้องการออกจากระบบใช่หรือไม่</h5>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
                <b-row>
                  <b-col cols="6">
                    <div style="margin-left:50px;margin-right:10px;">
                      <b-button variant="success" @click="logout" block>ใช่</b-button>
                    </div>
                  </b-col>
                  <b-col cols="6">
                    <div style="margin-left:10px;margin-right:50px;">
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
export default {
  name: "Navuser",
  data: () => ({}),
  methods: {
      logout(){
      localStorage.clear();
      this.$router.push({ path: "/" });
    },
    showModal1() {
      this.$refs["my-modal1"].show();
    },
    hidemodal() {
      this.$refs["my-modal1"].hide();
    },
    gohistoryuser(){
      this.$store.commit(
        "Detail/SET_MEMBER_ID",
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$router.push({ path: "/historyuser" });
    },
    goindex() {
      this.$store.commit(
        "Detail/SET_MEMBER_ID",
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$router.push({ path: "/userindex" });
    },
    goproduct() {
      this.$store.commit(
        "Detail/SET_MEMBER_ID",
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$router.push({ path: "/productuser" });
    },
    gofix() {
      this.$store.commit(
        "Detail/SET_MEMBER_ID",
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$router.push({ path: "/userfix" });
    },
    goprofile() {
      this.$store.commit(
        "Detail/SET_MEMBER_ID",
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$router.push({ path: "/userprofileuser" });
    }
  }
};
</script>

<style>
</style>