<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <br />
    <div style="margin-top: 70px"></div>
    <!-- เริ่ม -->
    <div>
      <div align="left" style="padding-left: 10px">
        <h2>ประวัติการแจ้งซ่อม</h2>
      </div>

      <b-container fluid>
        <!-- ส่วนหัวค้นหาและเลื่อนดูข้อมูล -->
        <b-row>
          <b-col cols="6" class="my-2">
            <!-- ค้นหา -->
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="ค้นหา"
            ></b-form-input>
          </b-col>
        </b-row>
        <br />
        <b-table
          show-empty
          small
          responsive
          fixed
          stacked="md"
          :items="items"
          :fields="fields"
          :filter="filter"
          :filterIncludedFields="filterOn"
        >
          <template v-slot:cell(detail)="row">
            <b-button
              class="mr-2"
              @click="info1(row.item, row.index, $event.target)"
              >รายละเอียด</b-button
            >
            <!-- รายละเอียด -->
          </template>
        </b-table>
        <!-- ปุ่มรายละเอียด -->
        <b-modal :id="infoModal1.id" ref="modal-1" hide-footer>
          <b-container fluid>
            <div align="center">
              <h5>รายละเอียด</h5>
            </div>
            <h6>รหัสครุภัณฑ์ : {{ items[detail].PRODUCT_CODE }}</h6>
            <h6>ยี่ห้อ : {{ items[detail].BRAND_NAME }}</h6>
            <h6>รุ่น : {{ items[detail].PRODUCT_GEN }}</h6>
            <h6>ปัญหาการเเจ้งซ่อม : {{ items[detail].FIX_DETAIL }}</h6>
            <h6>วันที่เเจ้งซ่อม : {{ format_datetime(items[detail].DATE) }}</h6>
            <h6>
              วันที่รับคืน : {{ format_datetime1(items[detail].BACK_DATE) }}
            </h6>
            <h6>ชื่อผู้เเจ้งซ่อม : {{ items[detail].MEMBER_NAME }}</h6>
            <h6>ชื่อผู้รับคืน : {{ items[detail].BACK_MEMBER }}</h6>
          </b-container>
        </b-modal>
        <!-- ปุ่มแก้ไข -->
      </b-container>
    </div>
    <!-- จบ -->
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import Nav from "../../components/Nav";
export default {
  components: {
    Nav,
  },
  data: () => ({
    login: "",

    PRODUCT_TYPE: "",
    DISTRIBUTOR: "",
    D_PRICE: "",
    items: [
      {
        PRODUCT_NUMBER: "",
        PRODUCT_CODE: "",
        CREATE_DATE: "",
        MEMBER_NAME: "",
        BACK_DATE: "",
        BACK_MEMBER: "",
      },
    ],
    fields: [
      // { key: "FIX_ID", label: "ลำดับ", class: "text-center" },
      { key: "PRODUCT_CODE", label: "เลขครุภัณฑ์", class: "text-center" },
      { key: "MEMBER_NAME", label: "ผู้แจ้งซ่อม", class: "text-center" },
      { key: "detail", label: "ปัญหาการแจ้งซ่อม", class: "text-center" },
    ],

    detail: 0,
    details: 0,

    infoModal1: {
      id: "info-modal1",
      title: "",
      content: "",
    },
    infoModal2: {
      id: "info-modal2",
      title: "",
      content: "",
    },
  }),
  mounted() {
    axios
      .post("https://qsbg.herokuapp.com/selecthistoryfixadmin")
      .then((response) => {
        console.log(response.data);
        this.items = response.data;
      });
  },
  created() {
    this.showlogin();
  },
  methods: {
    format_datetime(data) {
      var dm = moment(data).format("DD/MM/");
      var year = parseInt(moment(data).format("YYYY")) + 543;
      var time = moment(data).format(" HH:mm น.");
      return dm + year + time;
    },
    format_datetime1(data) {
      var dm = moment(data).format("DD/MM/");
      var year = parseInt(moment(data).format("YYYY")) + 543;
      return dm + year;
    },
    showlogin() {
      this.login = localStorage.getItem("ADMIN");
      console.log(this.login);
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    addproduct() {
      this.$refs["my-modal"].hide();
    },
    goindex() {
      this.$router.push({ path: "/adminindex" });
    },
    goregister() {
      this.$router.push({ path: "/adminregister" });
    },
    gonotification() {
      this.$router.push({ path: "/adminnotification" });
    },
    godetailfix() {
      this.$router.push({ path: "/admindetailfix" });
    },
    goprofile() {
      this.$router.push({ path: "/adminprofile" });
    },
    hidemodal() {
      this.$refs["modal-1"].hide();
    },
    info1(item, index, button) {
      this.detail = index;
      console.log(index);
      this.infoModal1.title = item.name;
      this.infoModal1.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal1.id, button);
    },
    info2(item, index, button) {
      this.details = index;
      console.log(index);
      this.infoModal2.title = item.name;
      this.infoModal2.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal2.id, button);
    },
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