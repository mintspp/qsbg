<template>
  <div>
    <!-- --------------nav------------ -->
    <Navuser />
    <!-- --------------nav------------ -->
    <div v-if="itemss == ''">
      <div style="padding:100px;padding-top:200px;">
        <h5>ยังไม่มีประวัติแจ้งซ่อมครุภัณฑ์</h5>
      </div>
    </div>
    <div v-if="itemss != ''">
      <!-- เริ่ม -->
      <div style="margin-bottom:10px;padding-top:60px;">
       
      </div>
      <div>
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
            <b-col cols="6">
              <!-- ------------- -->
            </b-col>
          </b-row>
          <br />
          <b-table
            show-empty
            small
            responsive
            fixed
            stacked="md"
            :items="itemss"
            :fields="fieldss"
            :filter="filter"
            :filterIncludedFields="filterOn"
          >
            <template v-slot:cell(detail)="row">
              <b-icon
                style="width: 25px; height: 25px;"
                @click="info2(row.item, row.index, $event.target)"
                icon="file-earmark-text"
                variant="danger"
              ></b-icon>
        
            </template>
            <template  v-slot:cell(de)="row">
              
              <!-- <div v-for="(item,index) in itemss" :key="index">
                <div v-if="item.FIX_ID == row.item.FIX_ID">                  -->
              <b-button variant="success"  @click="info3(row.item, row.index, $event.target)">ให้คะเเนน</b-button>
              <!-- </div>
              </div> -->
           
            </template>
          </b-table>
          <!-- ปุ่มรายละเอียด -->
          <b-modal :id="infoModal2.id" size="lg" ref="modal-1" hide-footer>
            <b-container fluid>
              <!-- productdetail -->
              <div align="center"><b>รายละเอียด</b></div>
              <b-row>
                <b-col cols="4">ประเภท : </b-col>
                <b-col cols="8">{{ itemss[productdetail].TYPE_NAME }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">รหัสครุภัณฑ์ : </b-col>
                <b-col cols="8">{{ itemss[productdetail].PRODUCT_CODE }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">ยี่ห้อ : </b-col>
                <b-col cols="8">{{ itemss[productdetail].BRAND_NAME }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">รุ่น : </b-col>
                <b-col cols="8">{{ itemss[productdetail].PRODUCT_GEN }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">วันที่เเจ้งซ่อม : </b-col>
                <b-col cols="8">{{ itemss[productdetail].DATE }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">ปัญหาการเเจ้งซ่อม : </b-col>
                <b-col cols="8">{{ itemss[productdetail].FIX_DETAIL }}</b-col>
              </b-row>
            </b-container>
          </b-modal>
          <!-- ให้คะเเนน -->
<b-modal :id="infoModal3.id" size="lg" ref="modal-3" hide-footer>
            <b-container fluid>
              <!-- productdetail -->
              <div align="center"><b>รายละเอียด</b></div>
              <b-row>
                <b-col cols="4">ประเภท : </b-col>
                <b-col cols="8">{{ itemss[productdetail].TYPE_NAME }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">รหัสครุภัณฑ์ : </b-col>
                <b-col cols="8">{{ itemss[productdetail].PRODUCT_CODE }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">ยี่ห้อ : </b-col>
                <b-col cols="8">{{ itemss[productdetail].BRAND_NAME }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">รุ่น : </b-col>
                <b-col cols="8">{{ itemss[productdetail].PRODUCT_GEN }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">วันที่เเจ้งซ่อม : </b-col>
                <b-col cols="8">{{ itemss[productdetail].DATE }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="4">ปัญหาการเเจ้งซ่อม : </b-col>
                <b-col cols="8">{{ itemss[productdetail].FIX_DETAIL }}</b-col>
              </b-row>
            </b-container>
          </b-modal>
       
        </b-container>
      </div>

    </div>
  </div>
</template>

<script>
import moment from "moment"
import Navuser from "../../components/Navuser";
import axios from "axios";
export default {
  components: {
    Navuser
  },
  data: () => ({
    login: "",
    itemss: null,
    fieldss: [
      { key: "FIX_ID", label: "ลำดับ", class: "text-center" },
      { key: "PRODUCT_CODE", label: "เลขครุภัณฑ์", class: "text-center" },
      // { key: "PRODUCT_BRAND", label: "ยี่ห้อ", class: "text-center" },
      // { key: "PRODUCT_GEN", label: "รุ่น", class: "text-center" },
      // { key: "TYPE_NAME", label: "ประเภท", class: "text-center" },
      { key: "DATE", label: "วันที่แจ้งซ่อม", class: "text-center" ,formatter:"format_datetime"},
      { key: "detail", label: "รายละเอียด", class: "text-center" },
      { key: "FIX_STATUS", label: "สถานะ", class: "text-center" },
      { key: "BACK_DATE", label: "วันที่ให้คืน", class: "text-center",formatter:"format_datetime1" },
      { key: "BACK_MEMBER", label: "ผู้ให้คืน", class: "text-center" },
      { key: "de", label: "รายละเอียด", class: "text-center" },
    ],
    productdetail: 0,
    filter: null,
    filterOn: [],
    infoModal2: {
      id: "info-modal2",
      title: "",
      content: ""
    },
    infoModal3: {
      id: "info-modal3",
      title: "",
      content: ""
    }
  }),
  mounted() {
    axios
      .post("http://localhost:5000/selectfixdetails", {
        MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"]
      })
      .then(response => {
        console.log(response.data);
        this.itemss = response.data;
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
      var time = moment(data).format(" HH:mm น.");
      return dm + year + time;
    },
     format_datetime1(data) {
   var dm = moment(data).format("DD/MM/");
      var year = parseInt(moment(data).format("YYYY")) + 543;
      return dm + year;
    },
    showlogin() {
      this.login = localStorage.getItem("USER");
      console.log(this.login);
    },
    showmember() {
      console.log(this.$store.getters["Detail/MEMBER_ID"]);
      return this.$store.getters["Detail/MEMBER_ID"];
    },
    info2(item, index, button) {
      this.productdetail = index;
      console.log(index);
      this.infoModal2.title = item.name;
      this.infoModal2.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal2.id, button);
    },
    info3(item, index, button) {
      console.log(item.FIX_ID);
      this.productdetail = index;
      console.log(index);
      this.infoModal3.title = item.name;
      this.infoModal3.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal3.id, button);
    }
  }
};
</script>

<style>
</style>