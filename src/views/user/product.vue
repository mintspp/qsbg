<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Navuser />
    <!-- --------------nav------------ -->

    <br>
    <div style="margin-top:50px;"></div>
    <div style="width:40%;padding-top:10px;">
      <b-input-group class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          type="search"
          v-model="search"
          @keyup="searchproduct()"
          placeholder="รหัสครุภัณฑ์"
        ></b-form-input>
      </b-input-group>
    </div>

    <div class="cardpd">
      <b-row>
        <b-col
          v-for="(pd, index) in productmember"
          :key="index"
          xl="4"
          lg="4"
          sm="12"
        >
          <div style="margin:20px;" @click="gofixproduct(pd)">
            <b-card class="text-center">
              <div align="center">
                <b-card-img
                  src="https://firebasestorage.googleapis.com/v0/b/test-f2583.appspot.com/o/technical-support.png?alt=media&token=65a8ac23-b3d9-47f8-a8e1-5da587df7cc7"
                  style="width:50%;"
                ></b-card-img><br>
              </div>
              <b-row style="margin-top: 10px">
                <b-col cols="5" align="right">ประเภท :</b-col>
                <b-col cols="7" align="left">{{ pd.TYPE_NAME }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="5" align="right">เลขครุภัณฑ์ :</b-col>
                <b-col cols="7" align="left">{{ pd.PRODUCT_CODE }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="5" align="right">ยี่ห้อ :</b-col>
                <b-col cols="7" align="left">{{ pd.BRAND_NAME }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="5" align="right">รุ่น :</b-col>
                <b-col cols="7" align="left">{{ pd.PRODUCT_GEN }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="5" align="right">หมดอายุ :</b-col>
                <b-col cols="7" align="left">{{ pd.PRODUCT_EXP }}</b-col>
              </b-row>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// <Navuser />
import Navuser from "../../components/Navuser";
import axios from "axios";
export default {
  components: {
    Navuser
  },
  data: () => ({
    login: "",
    productmember: null,
    search: ""
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
        .post("http://localhost:5000/selectPRODUCTMEMBER", {
          MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"]
        })
        .then(response => {
          console.log(response.data);
          this.productmember = response.data;
        });
      return this.$store.getters["Detail/MEMBER_ID"];
    },
    searchproduct() {
      if (this.search == "") {
        axios
          .post("http://localhost:5000/selectPRODUCTMEMBER", {
            MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"]
          })
          .then(response => {
            console.log(response.data);
            this.productmember = response.data;
          });
      } else {
        axios
          .post("http://localhost:5000/selectPRODUCTFIX", {
            search: this.search,
            MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"]
          })
          .then(response => {
            console.log(response.data);
            this.productmember = response.data;
          });
      }
    },
    gofix() {
      this.$store.commit(
        "Detail/SET_MEMBER_ID",
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$router.push({ path: "/userfix" });
    },
    gofixproduct(item) {
      this.$store.commit(
        "Detail/SET_MEMBER_ID",
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$store.commit("Detail/SET_PRODUCT_ID", item.PRODUCT_ID);
      console.log(
        this.$store.getters["Detail/PRODUCT_ID"],
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$router.push({ path: "/userfix" });
    },
    goindex() {
      this.$store.commit(
        "Detail/SET_MEMBER_ID",
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$router.push({ path: "/userindex" });
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