<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
<Navuser />
    <!-- --------------nav------------ -->
    <br /><br /><br /><br />
    
    <!-- เริ่ม -->
  <div align='left' style="margin-left:20px;">  <b-button variant="danger" @click="goproduct" >ย้อนกลับ</b-button></div>
    <!-- v-if="search == product[0].PRODUCT_CODE" -->
    <b-row>
      <b-col xl="6" lg="6" sm="12"
        ><div style="margin:20px;">
          <b-card>
            <div align="center">
              <b-card-img
                src="https://firebasestorage.googleapis.com/v0/b/test-f2583.appspot.com/o/technical-support.png?alt=media&token=65a8ac23-b3d9-47f8-a8e1-5da587df7cc7"
                style="width:25%;"
              ></b-card-img>
            </div>
            <div style="margin:25px;">
              <h4>รายละเอียดครุภัณฑ์</h4>
            </div>
            <div>
              <b-row>
                <b-col align="right" cols="4">เลขครุุภัณฑ์ :</b-col>
                <b-col cols="8">
                  <div>{{ product[0].PRODUCT_CODE }}</div>
                </b-col>
                <b-col align="right" cols="4">ยี่ห้อ :</b-col>
                <b-col cols="8">
                  <div>{{ product[0].BRAND_NAME }}</div>
                </b-col>
                <b-col align="right" cols="4">รุ่น :</b-col>
                <b-col cols="8">
                  <div>{{ product[0].PRODUCT_GEN }}</div>
                </b-col>
                <b-col align="right" cols="4">ประเภท :</b-col>
                <b-col cols="8">
                  <div>{{ product[0].TYPE_NAME }}</div>
                </b-col>
                <b-col align="right" cols="4"></b-col>
                <b-col cols="8">
                  <div></div>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </div>
      </b-col>

      <b-col xl="6" lg="6" sm="12">
        <div style="margin:20px;">
          <b-card title="ปัญหาการแจ้งซ่อม">
            <div>
              <b-form-textarea
                v-model="FIX_DETAIL"
                id="textarea-rows"
                placeholder="กรอกรายละเอียด"
                rows="8"
              ></b-form-textarea>
            </div>
            <div style="margin-top:20px;">
              <b-button variant="success" @click="addfix">ยืนยัน</b-button>
            </div>
          </b-card>
        </div>
      </b-col>
    </b-row>
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
    FIX_DETAIL: "",
    FIX_STATUS: "รอการยืนยัน",
    BACK_MEMBER: "ยังไม่ได้รับคืน",
    product: null,
    // search: "",
    PRODUCT_TYPE: ""
  }),

  mounted() {
    axios
      .post("http://localhost:5000/selectPRODUCT", {
        PRODUCT_ID: this.$store.getters["Detail/PRODUCT_ID"]
      })
      .then(response => {
        console.log(response.data);
        this.product = response.data;
      });
  },
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
      console.log(this.$store.getters["Detail/PRODUCT_ID"]);
      console.log(this.$store.getters["Detail/MEMBER_ID"]);
      return this.$store.getters["Detail/PRODUCT_ID"];
      // this.$store.getters["Detail/MEMBER_ID"];
    },
    addfix() {
      var data = {
        PRODUCT_ID: this.$store.getters["Detail/PRODUCT_ID"],
        MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"],
        FIX_DETAIL: this.FIX_DETAIL,
        FIX_STATUS: this.FIX_STATUS,
        BACK_MEMBER: this.BACK_MEMBER
      };
      axios.post("http://localhost:5000/insertFIX", data).then(response => {
        console.log(response);
        this.$store.commit(
          "Detail/SET_MEMBER_ID",
          this.$store.getters["Detail/MEMBER_ID"]
        );
        this.$router.push({ path: "/userindex" });
      });
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    addproduct() {
      this.$refs["my-modal"].hide();
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
    goprofile() {
      this.$store.commit(
        "Detail/SET_MEMBER_ID",
        this.$store.getters["Detail/MEMBER_ID"]
      );
      this.$router.push({ path: "/userprofileuser" });
    },
    hidemodal() {
      this.$refs["modal-1"].hide();
    },
    info(item, index, button) {
      this.editpro = index;
      console.log(index);
      this.infoModal.title = item.name;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    info1(item, index, button) {
      this.editpro = index;
      console.log(index);
      this.infoModal1.title = item.name;
      this.infoModal1.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal1.id, button);
    },
    info2(item, index, button) {
      this.editpro = index;
      console.log(index);
      this.infoModal2.title = item.name;
      this.infoModal2.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal2.id, button);
    }
  }
};
</script>

<style>
.col-6 {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  z-index: 1 !important;
}
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

.textt {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}
</style>