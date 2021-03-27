<template>
  <div>
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <br />
    <div v-if="items == ''">
      <div style="padding: 100px; padding-top: 200px">
        <h5>ยังไม่มีรายการแจ้งซ่อมครุภัณฑ์</h5>
      </div>
    </div>
    <!-- เริ่ม -->
    <div v-if="items != ''" style="padding-top: 40px">
      <b-container fluid>
        <div align="left" style="padding-left: 10px">
          <h2>การแจ้งซ่อมครุภัณฑ์</h2>
        </div>
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
              </b-form-select>
            </div>
          </b-col>
        </b-row>

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
            <!-- แก้ไข -->
            <b-icon
              style="width: 25px; height: 25px"
              @click="info1(row.item, row.index, $event.target)"
              icon="file-earmark-text"
              variant="danger"
            ></b-icon>
          </template>
          <template v-slot:cell(fixstatus)="row">
            <!-- รอการตอบรับ -->
            <b-button
              class="mr-2"
              variant="warning"
              @click="info3(row.item, row.index, $event.target)"
              >สถานะการทำงาน</b-button
            >
          </template>
        </b-table>
        <!-- ปุ่มรายละเอียด -->
        <b-modal :id="infoModal1.id" ref="modal-1" hide-footer>
          <b-container fluid>
            <div align="center">
              <b><h4>รายละเอียด</h4></b>
            </div>
            <p>รหัสครุภัณฑ์ : {{ items[detailfix].PRODUCT_CODE }}</p>
            <p>ยี่ห้อ : {{ items[detailfix].BRAND_NAME }}</p>
            <p>รุ่น : {{ items[detailfix].PRODUCT_GEN }}</p>
            <p>
              วันที่เเจ้งซ่อม : {{ format_datetime(items[detailfix].DATE) }}
            </p>
            <p>ปัญหาการเเจ้งซ่อม : {{ items[detailfix].FIX_DETAIL }}</p>
          </b-container>
        </b-modal>
        <!-- สถานะ -->
        <b-modal :id="infoModal3.id" ref="modal-1" hide-footer>
          <b-container fluid>
            <div v-if="items[detailfix].FIX_STATUS == 'รอการยืนยัน'">
              <div align="center">
                <h5>ยืนยันการตอบรับ</h5>

                <b-button
                  variant="success"
                  style="width: 50%"
                  @click="updatestatus"
                  >ยืนยัน</b-button
                >
              </div>
            </div>
            <div v-if="items[detailfix].FIX_STATUS == 'กำลังดำเนินการ'">
              <h5>สถานะการทำงาน</h5>
              <b-form-select
                @change="updatestatus1"
                v-model="items[detailfix].FIX_STATUS"
                class="mb-3"
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
            <div v-if="items[detailfix].FIX_STATUS == 'เสร็จเเล้ว'">
              <h6>วันที่ส่งคืน</h6>
              <date-picker v-model="BACK_DATE"></date-picker>
              <div style="margin-top: 10px">
                <h6>ชื่อผู้รับคืน</h6>
                <b-form-input
                  v-model="BACK_MEMBER"
                  placeholder="Enter your name"
                ></b-form-input>
              </div>
              <div style="margin-top: 10px">
                <b-button variant="success" @click="updatestatus2" block
                  >ยืนยัน</b-button
                >
              </div>
            </div>
          </b-container>
        </b-modal>
      </b-container>
    </div>
    <!-- จบ -->
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import axios from "axios";
import Nav from "../../components/Nav";
import moment from "moment";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/th";
export default {
  components: {
    Nav,
    DatePicker,
  },
  data: () => ({
    login: "",
    BACK_MEMBER: "",
    BACK_DATE: "",
    PRODUCT_TYPE: "",
    SELECTSTATUS: "",
    items: [
      {
        FIX_ID: "",
        PRODUCT_CODE: "",
        MEMBER_NAME: "",
        DATE: "",
        FIX_DETAIL: "",
        FIX_STATUS: "",
        BACK_DATE: "",
        BACK_MEMBER: "",
      },
    ],

    fields: [
      // { key: "FIX_ID", label: "ลำดับ", class: "text-center" },
      { key: "PRODUCT_CODE", label: "เลขครุภัณฑ์", class: "text-center" },
      { key: "MEMBER_NAME", label: "ผู้แจ้งซ่อม", class: "text-center" },
      {
        key: "DATE",
        label: "วันที่แจ้งซ่อม",
        class: "text-center",
        formatter: "format_datetime",
      },
      { key: "FIX_STATUS", label: "สถานะ", class: "text-center" },
      { key: "detail", label: "ปัญหาการแจ้งซ่อม", class: "text-center" },
      { key: "fixstatus", label: "สถานะ", class: "text-center" },
    ],

    detailfix: 0,
    filter: null,
    filterOn: [],
    infoModal2: {
      id: "info-modal2",
      title: "",
      content: "",
    },
    infoModal1: {
      id: "info-modal1",
      title: "",
      content: "",
    },
    infoModal3: {
      id: "info-modal3",
      title: "",
      content: "",
    },
  }),
  mounted() {
    axios.post(`${api_url.api_url}/selectFIX`).then((response) => {
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
      return dm + year;
    },
    selectstatus() {
      console.log(this.SELECTSTATUS);
      if (this.SELECTSTATUS == "") {
        console.log("เข้า 1");
        axios.post(`${api_url.api_url}/selectFIX`).then((response) => {
          console.log(response.data);
          this.items = response.data;
        });
      } else {
        console.log("เข้า 2");
        axios.post(`${api_url.api_url}/selectFIXSTATUS`,{
          FIX_STATUS:this.SELECTSTATUS
        }).then((response) => {
          console.log(response.data);
          this.items = response.data;
        });
      }
    },
    showlogin() {
      this.login = localStorage.getItem("ADMIN");
      console.log(this.login);
    },
    reset() {
      axios.post(`${api_url.api_url}/selectFIX`).then((response) => {
        console.log(response.data);
        this.items = response.data;
      });
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    updatestatus() {
      console.log(this.items[this.detailfix].FIXHISTORY_ID);
      axios

        .post(`${api_url.api_url}/updatestatus`, {
          FIX_STATUS: "กำลังดำเนินการ",
          FIXHISTORY_ID: this.items[this.detailfix].FIXHISTORY_ID,
        })
        .then((response) => {
          console.log(response.data);
          this.reset(response);
        });
      this.$refs["modal-1"].hide();
    },
    updatestatus1() {
      console.log(
        this.items[this.detailfix].FIXHISTORY_ID,
        this.items[this.detailfix].FIX_ID
      );
      axios

        .post(`${api_url.api_url}/updatestatus1`, {
          FIX_STATUS: this.items[this.detailfix].FIX_STATUS,
          FIXHISTORY_ID: this.items[this.detailfix].FIXHISTORY_ID,
          PRODUCT_CODE: this.items[this.detailfix].PRODUCT_CODE,
          TYPE_NAME: this.items[this.detailfix].TYPE_NAME,
          BRAND_NAME: this.items[this.detailfix].BRAND_NAME,
        })
        .then((response) => {
          console.log(response.data);
          this.reset(response);
        });

      this.$refs["modal-1"].hide();
    },
    updatestatus2() {
      axios

        .post(`${api_url.api_url}/updatestatus`, {
          FIX_STATUS: "การรับคืนสำเร็จ",
          FIXHISTORY_ID: this.items[this.detailfix].FIXHISTORY_ID,
        })
        .then((response) => {
          console.log(response.data);
          this.reset(response);
        });
      axios

        .post(`${api_url.api_url}/updatestatus2`, {
          BACK_MEMBER: this.BACK_MEMBER,
          BACK_DATE: moment(this.BACK_DATE).format("YYYY-MM-DD"),
          FIX_ID: this.items[this.detailfix].FIX_ID,
          BACK_ADMIN: this.$store.getters["Detail/MEMBER_ID"],
        })
        .then((response) => {
          console.log(response.data);
          this.reset(response);
        });
      this.$refs["modal-1"].hide();
    },
    noupdatestatus() {
      this.$refs["modal-1"].hide();
    },
    hidemodal() {
      this.$refs["modal-1"].hide();
    },
    info2(item, index, button) {
      this.detailfix = index;
      console.log(index);
      this.infoModal2.title = item.name;
      this.infoModal2.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal2.id, button);
    },
    info1(item, index, button) {
      this.detailfix = index;
      console.log(index);
      this.infoModal1.title = item.name;
      this.infoModal1.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal1.id, button);
    },
    info3(item, index, button) {
      this.detailfix = index;
      console.log(index);
      this.infoModal3.title = item.name;
      this.infoModal3.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal3.id, button);
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

input.mx-input {
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 209%;
  height: 34px;
  padding: 6px 30px;
  padding-left: 50px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.mx-datepicker svg {
  width: 23em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>