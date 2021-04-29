<template>
  <div>
    <!-- --------------nav------------ -->
    <Navuser />
    <!-- --------------nav------------ -->
    <div v-if="itemss == ''">
      <div style="padding: 100px; padding-top: 200px">
        <h5>ยังไม่มีประวัติแจ้งซ่อมครุภัณฑ์</h5>
      </div>
    </div>
    <div v-if="itemss != ''">
      <!-- เริ่ม -->
      <div style="margin-bottom: 10px; padding-top: 60px"></div>
      <div>
        <b-container fluid>
          <!-- ส่วนหัวค้นหาและเลื่อนดูข้อมูล -->
          <h3 align="left">ประวัติแจ้งซ่อมครุภัณฑ์</h3>
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
                style="width: 25px; height: 25px"
                @click="info2(row.item, row.index, $event.target)"
                icon="file-earmark-text"
                variant="danger"
              ></b-icon>
            </template>
            <template v-slot:cell(de)="row">
              <b-button
                variant="success"
                @click="info3(row.item, row.index, $event.target)"
                >ให้คะเเนน</b-button
              >
            </template>
          </b-table>
          <!-- ปุ่มรายละเอียด -->
          <b-modal :id="infoModal2.id" size="lg" ref="modal-1" hide-footer>
            <b-container fluid>
              <!-- productdetail -->
              <div align="center"><b><h4>รายละเอียด</h4></b></div>
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
              <div v-if="itemss[productdetail].COMMENT_TYPE == null">
                <div align="center"><b>ให้คะเเนน</b></div>
                <b-row>
                  เเสดงความคิดเห็น :
                  <b-col cols="12"
                    ><b-form-textarea
                      id="textarea"
                      v-model="COMMENT"
                      placeholder="เเสดงความคิดเห็น"
                      rows="3"
                      max-rows="6"
                    ></b-form-textarea>
                  </b-col>
                </b-row>
                <b-row> ให้ดาว : </b-row>
                <b-form-rating
                  v-model="COMMENT_STAR"
                  variant="warning"
                  class="mb-2"
                ></b-form-rating>
                <div style="margin-top: 10px">
                  <b-button
                    variant="success"
                    @click="comment(itemss[productdetail].fixid)"
                    block
                    >ยืนยัน</b-button
                  >
                </div>
              </div>
               <div v-else>
                <h5 align="center">{{ itemss[productdetail].COMMENT_TYPE }}</h5>
                <h6>เเสดงความคิดเห็น : {{ itemss[productdetail].COMMENT }}</h6>
                <h6>วันที่ : {{ format_datetime1(itemss[productdetail].COMMENT_DATE) }}</h6>
                 <h6>คะเเนน : {{ itemss[productdetail].COMMENT_STAR }}</h6>
                <b-form-rating
                  readonly
                  v-model="itemss[productdetail].COMMENT_STAR"
                  variant="warning"
                  class="mb-2"
                ></b-form-rating>
              </div>
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
    itemss: null,
    fieldss: [
      // { key: "fixid", label: "ลำดับ", class: "text-center" },
      { key: "PRODUCT_CODE", label: "เลขครุภัณฑ์", class: "text-center" },
      {
        key: "DATE",
        label: "วันที่แจ้งซ่อม",
        class: "text-center",
        formatter: "format_datetime",
      },
      { key: "detail", label: "รายละเอียด", class: "text-center" },
      { key: "FIX_STATUS", label: "สถานะ", class: "text-center" },
      {
        key: "BACK_DATE",
        label: "วันที่ให้คืน",
        class: "text-center",
        formatter: "format_datetime1",
      },
      { key: "BACK_MEMBER", label: "ผู้ให้คืน", class: "text-center" },
      { key: "de", label: "การให้คะเเนน", class: "text-center" },
    ],
    productdetail: 0,
    filter: null,
    filterOn: [],
    infoModal2: {
      id: "info-modal2",
      title: "",
      content: "",
    },
    COMMENT_STAR: "",
    COMMENT: "",
    COMMENT_TYPE: "ให้ดาวเเล้ว",
    infoModal3: {
      id: "info-modal3",
      title: "",
      content: "",
    },
  }),
  mounted() {
    axios
    
      .post(`${api_url.api_url}/selectfixdetails`, {
        MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"],
      })
      .then((response) => {
        console.log(response.data);
        this.itemss = response.data;
      });
  },
  created() {
    this.showmember();
    this.showlogin();
  },
  methods: {
    comment(fixid) {
      console.log(fixid);
      axios
      
        .post(`${api_url.api_url}/insertFIXCOMMENT`, {
          FIX_ID: fixid,
          COMMENT: this.COMMENT,
          COMMENT_STAR: this.COMMENT_STAR,
          COMMENT_TYPE: this.COMMENT_TYPE,
        })
        .then((response) => {
          console.log(response);
          this.reset(response)
          this.$refs["modal-3"].hide();
        });
    },
    reset(){
      axios
      
      .post(`${api_url.api_url}/selectfixdetails`, {
        MEMBER_ID: this.$store.getters["Detail/MEMBER_ID"],
      })
      .then((response) => {
        console.log(response.data);
        this.itemss = response.data;
      });
    },
    format_datetime(data) {
      var dm = moment(data).format("DD/MM/");
      var year = parseInt(moment(data).format("YYYY")) + 543;
      return dm + year;
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
      console.log(item.fixid);
      this.productdetail = index;
      console.log(index);
      this.infoModal3.title = item.name;
      this.infoModal3.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal3.id, button);
    },
  },
};
</script>

<style>
</style>