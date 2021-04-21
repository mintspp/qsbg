<template>
  <div>
    <!-- --------------nav------------ -->
    <Navuser />
    <!-- --------------nav------------ -->

    <div v-if="items == ''">
      <div style="padding: 100px; padding-top: 200px">
        <h5>ยังไม่มีรายการแจ้งซ่อมครุภัณฑ์</h5>
      </div>
    </div>
    <div v-if="items != ''">
      <div style="margin-bottom: 10px; padding-top: 60px"></div>
      <!-- เริ่ม -->
      <div>
        <b-container fluid>
          <h3 align="left">รายการแจ้งซ่อมครุภัณฑ์</h3>
          <!-- ส่วนหัวค้นหาและเลื่อนดูข้อมูล -->
          <b-row>
            <b-col xl="6" lg="6" sm="12" class="my-2">
              <!-- ค้นหา -->
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="ค้นหา"
              ></b-form-input>
            </b-col>
            <b-col xl="1" lg="1" sm="12" class="my-2" align="left">
              <p style="font-size: 20px; margin-bottom: 0rem">สถานะ :</p>
            </b-col>
            <b-col xl="5" lg="5" sm="12">
              <div>
                <b-form-select
                  v-model="SELECTSTATUS"
                  @change="selectstatus"
                  class="my-2"
                >
                  <b-form-select-option value="">ทั้งหมด</b-form-select-option>
                  <b-form-select-option value="รอการยืนยัน"
                    >รอการยืนยัน</b-form-select-option
                  >
                  <b-form-select-option value="กำลังดำเนินการ"
                    >กำลังดำเนินการ</b-form-select-option
                  >
                  <b-form-select-option value="เสร็จเเล้ว"
                    >เสร็จเเล้ว</b-form-select-option
                  >
                  <b-form-select-option value="ไม่สามารถซ่อมได้"
                    >ไม่สามารถซ่อมได้</b-form-select-option
                  >
                </b-form-select>
              </div>
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
              <b-icon
                style="width: 25px; height: 25px"
                @click="info1(row.item, row.index, $event.target)"
                icon="file-earmark-text"
                variant="danger"
              ></b-icon>
              <!-- แก้ไข -->
            </template>
          </b-table>

          <b-modal :id="infoModal1.id" size="lg" ref="modal-1" hide-footer>
            <b-container fluid>
              <!-- productdetail -->
              <div align="center">
                <b><h4>รายละเอียด</h4></b>
              </div>
              <b-row>
                <b-col cols="4">ประเภท : </b-col>
                <b-col cols="8">{{ items[productdetail].TYPE_NAME }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">รหัสครุภัณฑ์ : </b-col>
                <b-col cols="8">{{ items[productdetail].PRODUCT_CODE }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">ยี่ห้อ : </b-col>
                <b-col cols="8">{{ items[productdetail].BRAND_NAME }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">รุ่น : </b-col>
                <b-col cols="8">{{ items[productdetail].PRODUCT_GEN }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">วันที่เเจ้งซ่อม : </b-col>
                <b-col cols="8">{{
                  format_datetime(items[productdetail].DATE)
                }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">ปัญหาการเเจ้งซ่อม : </b-col>
                <b-col cols="8">{{ items[productdetail].FIX_DETAIL }}</b-col>
              </b-row>
            </b-container>
          </b-modal>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import moment from "moment";
import Navuser from "../../components/Navuser";
import axios from "axios";
export default {
  components: {
    Navuser,
  },
  data: () => ({
    login: "",
    PRODUCT_TYPE: "",
    SELECTSTATUS: "",
    options: [
      { value: "คอมพิวเตอร์", text: "คอมพิวเตอร์" },
      { value: "เครื่องสำรองไฟ", text: "เครื่องสำรองไฟ" },
    ],
    items: null,
    fields: [
      // { key: "FIX_ID", label: "ลำดับ", class: "text-center" },
      { key: "PRODUCT_CODE", label: "เลขครุภัณฑ์", class: "text-center" },
      // { key: "PRODUCT_BRAND", label: "ยี่ห้อ", class: "text-center" },
      // { key: "PRODUCT_GEN", label: "รุ่น", class: "text-center" },
      { key: "TYPE_NAME", label: "ประเภท", class: "text-center" },
      {
        key: "DATE",
        label: "วันที่แจ้งซ่อม",
        class: "text-center",
        formatter: "format_datetime",
      },
      { key: "detail", label: "รายละเอียด", class: "text-center" },
      { key: "FIX_STATUS", label: "สถานะ", class: "text-center" },
      // { key: "BACK_DATE", label: "วันที่ให้คืน", class: "text-center" },
      { key: "BACK_MEMBER", label: "ผู้ให้คืน", class: "text-center" },
    ],

    productdetail: 0,
    filter: null,
    filterOn: [],
    infoModal1: {
      id: "info-modal1",
      title: "",
      content: "",
    },
  }),

  mounted() {
    axios
      .post(`${api_url.api_url}/selectfixdetail`, {
        MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"],
      })
      .then((response) => {
        console.log(response.data);
        this.items = response.data;
      });
  },
  created() {
    this.showmember();
    this.showlogin();
  },
  methods: {
    format_datetime(data) {
      var dm = moment(data).format("DD/MM/");
      var year = parseInt(moment(data).format("YYYY")) + 543;
      return dm + year;
    },
    selectstatus() {
      console.log(this.SELECTSTATUS);
      if (this.SELECTSTATUS == "") {
        console.log("เข้า 1");
        axios
          .post(`${api_url.api_url}/selectfixdetail`, {
            MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"],
          })
          .then((response) => {
            console.log(response.data);
            this.items = response.data;
          });
      } else {
        console.log("เข้า 2");
        axios
          .post(`${api_url.api_url}/selectfixdetailstatus`, {
            MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"],
            FIX_STATUS: this.SELECTSTATUS,
          })
          .then((response) => {
            console.log(response.data);
            this.items = response.data;
          });
      }
    },
    showlogin() {
      this.login = localStorage.getItem("USER");
      console.log(this.login);
    },
    showmember() {
      console.log(this.$store.getters["Detail/MEMBER_ID"]);
      return this.$store.getters["Detail/MEMBER_ID"];
    },
    info1(item, index, button) {
      this.productdetail = index;
      console.log(index);
      this.infoModal1.title = item.name;
      this.infoModal1.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal1.id, button);
    },
  },
};
</script>

<style>
.nav-fill > .nav-link,
.nav-fill .nav-item {
  flex: 1 1 auto;
  text-align: center;
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
</style>