<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <br />
    <div style="margin-top: 60px"></div>
    <!-- เริ่ม -->

    <div>
      <b-container fluid>
        <b-row>
          <b-col cols="6">
            <div align="left"><h2>ข้อมูลครุภัณฑ์</h2></div>
          </b-col>
          <b-col cols="6">
            <div align="right" style="margin-right: 10px; margin-top: 6px">
              <b-button variant="success" @click="showModal"
                >เพิ่มครุภัณฑ์</b-button
              >
              <b-modal ref="my-modal" size="lg" hide-footer>
                <div class="d-block text-center">
                  <div align="center">
                    <b><h5>กรอกข้อมูลครุภัณฑ์</h5></b>
                  </div>
                  <b-row>
                    <b-col cols="6">ประเภท</b-col>
                    <b-col cols="6">ชื่อผู้ครอบครอง</b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6"
                      ><b-form-select v-model="TYPE_ID">
                        <b-form-select-option
                          v-for="(type, index) in type"
                          :key="index"
                          v-model="type.TYPE_ID"
                          :value="type.TYPE_ID"
                          >{{ type.TYPE_ID + " : "
                          }}{{ type.TYPE_NAME }}</b-form-select-option
                        >
                      </b-form-select></b-col
                    >
                    <b-col cols="6">
                      <b-form-select v-model="MEMBER_ID">
                        <b-form-select-option
                          v-for="(member, index) in member"
                          :key="index"
                          v-model="member.MEMBER_ID"
                          :value="member.MEMBER_ID"
                          >{{ member.MEMBER_ID + " : "
                          }}{{ member.MEMBER_NAME + " (สำนักงาน : "
                          }}{{ member.MEMBER_WORK + ")" }}</b-form-select-option
                        >
                      </b-form-select>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col cols="6">รหัส</b-col>
                    <b-col cols="6">ยี่ห้อ</b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <b-form-input
                        v-model="PRODUCT_CODE"
                        placeholder="กรอกรหัส"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="6">
                      <b-form-select v-model="BRAND_ID">
                        <b-form-select-option
                          v-for="(brand, index) in brand"
                          :key="index"
                          v-model="brand.BRAND_ID"
                          :value="brand.BRAND_ID"
                          >{{ brand.BRAND_NAME }}</b-form-select-option
                        >
                      </b-form-select>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6">รุ่น</b-col>
                    <b-col cols="6">วันหมดอายุ</b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="6"
                      ><b-form-input
                        v-model="PRODUCT_GEN"
                        placeholder="กรอกชื่อรุ่น"
                      ></b-form-input>
                    </b-col>
                    <b-col cols="6">
                      <b-form-datepicker
                        id="example-datepicker"
                        v-model="PRODUCT_EXP"
                        class="mb-2"
                      ></b-form-datepicker>
                    </b-col>
                  </b-row>

                  <!-- ----- v-if PRODUCT_TYPE เพื่อเปิด cpu ram hd win ----- -->
                  <div v-if="TYPE_ID == 1 || TYPE_ID == 4">
                    <div align="left" style="margin-top: 5px">อื่นๆ...</div>
                    <b-row>
                      <b-col cols="6">CPU</b-col>
                      <b-col cols="6">RAM</b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6">
                        <b-form-input
                          v-model="PC_CPU"
                          placeholder="กรอก CPU"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                          v-model="PC_RAM"
                          placeholder="กรอก RAM"
                        ></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6">Hard disk</b-col>
                      <b-col cols="6">WINDOWS</b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6">
                        <b-form-input
                          v-model="PC_HD"
                          placeholder="กรอก Hard disk"
                        ></b-form-input>
                      </b-col>
                      <b-col cols="6">
                        <b-form-input
                          v-model="PC_WINDOW"
                          placeholder="กรอก WINDOWS"
                        ></b-form-input>
                      </b-col>
                    </b-row>
                  </div>
                  <!-- ------------- -->
                </div>
                <b-button
                  class="mt-3"
                  variant="success"
                  block
                  @click="addproduct"
                  >บันทึก</b-button
                >
              </b-modal>
            </div>
          </b-col>
        </b-row>

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
            <div align="right" style="margin-right: 10px">
              <h5>จำนวนทั้งหมด {{ itemss }} ครุภัณฑ์</h5>
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
              variant="success"
            ></b-icon>
            <!-- แก้ไข -->
          </template>
          <template v-slot:cell(more)="row">
            <b-button
              variant="warning"
              class="mr-2"
              @click="info(row.item, row.index, $event.target)"
              >แก้ไข</b-button
            >
            <b-button
              variant="danger"
              class="mr-2"
              @click="info2(row.item, row.index, $event.target)"
              >ตัดจำหน่าย</b-button
            >

            <!-- แก้ไข -->
          </template>
        </b-table>
        <!-- ปุ่มรายละเอียด -->
        <b-modal :id="infoModal1.id" size="lg" ref="modal-1" hide-footer>
          <b-container fluid>
            <div>
              <div align="center">
                <b><h5>รายละเอียด</h5></b>
              </div>
              <b-row>
                <b-col cols="5" align="right">CPU :</b-col>
                <b-col cols="7">{{ items[productdetail].PC_CPU }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="5" align="right">RAM :</b-col>
                <b-col cols="7">{{ items[productdetail].PC_RAM }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="5" align="right">HARD DISK :</b-col>
                <b-col cols="7">{{ items[productdetail].PC_HD }}</b-col>
              </b-row>
              <b-row>
                <b-col cols="5" align="right">WINDOW :</b-col>
                <b-col cols="7">{{ items[productdetail].PC_WINDOW }}</b-col>
              </b-row>
            </div>
          </b-container>
        </b-modal>
        <!-- ปุ่มแก้ไข -->
        <b-modal
          :id="infoModal.id"
          size="lg"
          ref="modal-1"
          :title="infoModal.title"
          hide-footer
        >
          <b-container fluid>
            <div align="center">
              <b><h4>เเก้ไขข้อมูล</h4></b>
            </div>
            <b-row style="margin-top: 5px">
              <b-col cols="4" align="right">เลขครุภัณฑ์ :</b-col>
              <b-col cols="8">
                <b-form-input
                  v-model="items[productdetail].PRODUCT_CODE"
                  style="width: 80%"
                ></b-form-input
              ></b-col>
            </b-row>
            <b-row style="margin-top: 5px">
              <b-col cols="4" align="right">ยี่ห้อ :</b-col>
              <b-col cols="8">
                <b-form-select
                  style="width: 80%"
                  v-model="items[productdetail].BRAND_ID"
                >
                  <b-form-select-option
                    v-for="(brand, index) in brand"
                    :key="index"
                    :value="brand.BRAND_ID"
                    >{{ brand.BRAND_ID + " : "
                    }}{{ brand.BRAND_NAME }}</b-form-select-option
                  >
                </b-form-select>
              </b-col>
            </b-row>
            <b-row style="margin-top: 5px">
              <b-col cols="4" align="right">รุ่น :</b-col>
              <b-col cols="8">
                <b-form-input
                  v-model="items[productdetail].PRODUCT_GEN"
                  style="width: 80%"
                ></b-form-input
              ></b-col>
            </b-row>
            <div
              v-if="
                items[productdetail].TYPE_NAME == 'คอมพิวเตอร์' ||
                items[productdetail].TYPE_NAME == 'โน๊ตบุค'
              "
            >
              <b-row style="margin-top: 5px">
                <b-col cols="4" align="right">CPU :</b-col>
                <b-col cols="8">
                  <b-form-input
                    v-model="items[productdetail].PC_CPU"
                    style="width: 80%"
                  ></b-form-input
                ></b-col>
              </b-row>
              <b-row style="margin-top: 5px">
                <b-col cols="4" align="right">RAM :</b-col>
                <b-col cols="8">
                  <b-form-input
                    v-model="items[productdetail].PC_RAM"
                    style="width: 80%"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row style="margin-top: 5px">
                <b-col cols="4" align="right">HARD DISK :</b-col>
                <b-col cols="8">
                  <b-form-input
                    v-model="items[productdetail].PC_HD"
                    style="width: 80%"
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row style="margin-top: 5px">
                <b-col cols="4" align="right">WINDOW :</b-col>
                <b-col cols="8">
                  <b-form-input
                    v-model="items[productdetail].PC_WINDOW"
                    style="width: 80%"
                  ></b-form-input>
                </b-col>
              </b-row>
            </div>
            <b-row style="margin-top: 5px">
              <b-col cols="4" align="right">ผู้ครอบครอง :</b-col>
              <b-col cols="8">
                <b-form-select
                  style="width: 80%"
                  v-model="items[productdetail].MEMBER_ID"
                >
                  <b-form-select-option
                    v-for="(member, index) in member"
                    :key="index"
                    :value="member.MEMBER_ID"
                    >{{ member.MEMBER_ID + " : "
                    }}{{ member.MEMBER_NAME }}</b-form-select-option
                  >
                </b-form-select>
              </b-col>
            </b-row>
            <b-row style="margin-top: 5px">
              <b-col cols="4" align="right">วันหมดอายุ :</b-col>
              <b-col cols="8">
                <b-form-datepicker
                  id="example-datepicker"
                  v-model="items[productdetail].PRODUCT_EXP"
                  class="mb-2"
                  style="width: 80%"
                ></b-form-datepicker
              ></b-col>
            </b-row>
          </b-container>
          <b-button class="mt-3" variant="warning" @click="updateproduct" block
            >ยืนยัน</b-button
          >
        </b-modal>
        <!-- ปุ่มลบ -->
        <b-modal :id="infoModal2.id" ref="modal-1" hide-footer>
          <b-container fluid>
            <b-row>
              <b-col cols="12" align="center">
                <div style="margin-bottom: 20px">
                  <h5>ตัดจำหน่าย</h5>
                </div>
                <b-row>
                  
                    <b-col align="right" cols="3">รหัสครุภัณฑ์ :</b-col>
                  <b-col cols="9" align="left">
                    {{this.items[this.productdetail].PRODUCT_CODE}}
                  </b-col>
                  <b-col align="right" cols="3">หมายเหตุ :</b-col>
                  <b-col cols="9">
                    <div style="margin-right: 50px"> 
                      <b-form-textarea
                        v-model="NOTE"
                        placeholder=""
                        rows="3"
                      ></b-form-textarea>
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-button
              class="mt-3"
              variant="outline-success"
              block
              @click="addDistributor"
              >บันทึก</b-button
            >
          </b-container>
        </b-modal>
      </b-container>
    </div>
    <!-- จบ -->
  </div>
</template>

<script>
// <Nav />
import moment from "moment";
import Nav from "../../components/Nav";
import axios from "axios";
export default {
  components: {
    Nav,
  },
  data: () => ({
    NOTE: "",
    login: "",
    itemss: "",
    MEMBER_ID: "",
    PRODUCT_CODE: "",
    BRAND_ID: "",
    PRODUCT_GEN: "",
    TYPE_ID: "",
    PRODUCT_EXP: "",
    PC_CPU: "",
    PC_RAM: "",
    PC_HD: "",
    PC_WINDOW: "",
    type: null,
    member: null,
    brand: null,
    items: [
      {
        PRODUCT_ID: "",
        PRODUCT_CODE: "",
        BRAND_NAME: "",
        PRODUCT_GEN: "",
        TYPE_NAME: "",
        PRODUCT_EXP: "",
      },
    ],
    fields: [
      // { key: "PRODUCT_ID", label: "ลำดับ", class: "text-center" },
      { key: "PRODUCT_CODE", label: "เลขครุภัณฑ์", class: "text-center" },
      { key: "BRAND_NAME", label: "ยี่ห้อ", class: "text-center" },
      { key: "MEMBER_NAME", label: "ผู้ครอบครอง", class: "text-center" },
      { key: "TYPE_NAME", label: "ประเภท", class: "text-center" },
      {
        key: "PRODUCT_EXP",
        label: "หมดอายุ",
        class: "text-center",
        formatter: "format_datetime",
      },
      { key: "detail", label: "รายละเอียด", class: "text-center" },
      { key: "more", label: "จัดการ", class: "text-center" },
    ],
    productdetail: 0,
    filter: null,
    filterOn: [],
    infoModal: {
      id: "info-modal",
      title: "",
      content: "",
    },
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
    axios.post("https://qsbg.herokuapp.com/selectPRODUCTadmin").then((response) => {
      console.log(response);
      this.items = response.data;
      this.itemss = response.data.length;
    });
    axios.post("https://qsbg.herokuapp.com/selecttype").then((response) => {
      console.log(response.data);
      this.type = response.data;
    });
    axios.post("https://qsbg.herokuapp.com/selectbrand").then((response) => {
      console.log(response.data);
      this.brand = response.data;
    });
    axios.post("https://qsbg.herokuapp.com/selectmemberproduct").then((response) => {
      console.log(response.data);
      this.member = response.data;
    });
  },
  created() {
    this.showlogin();
  },
  methods: {
    addDistributor() {
      console.log(this.NOTE);
      console.log(this.items[this.productdetail].PRODUCT_ID);
      axios
        .post("https://qsbg.herokuapp.com/insertdistributor", {
          NOTE: this.NOTE,
          PRODUCT_ID: this.items[this.productdetail].PRODUCT_ID,
          STATUS: "3",
        })
        .then((response) => {
          console.log(response.data);
          this.reset(response);
        });
      this.$refs["modal-1"].hide();
    },
   reset(){
     axios.post("https://qsbg.herokuapp.com/selectPRODUCTadmin").then((response) => {
      console.log(response);
      this.items = response.data;
      this.itemss = response.data.length;
    });
   },
    format_datetime(data) {
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
      console.log(this.BRAND_ID, this.TYPE_ID, this.MEMBER_ID);
      var data = {
        PRODUCT_CODE: this.PRODUCT_CODE,
        BRAND_ID: this.BRAND_ID,
        PRODUCT_GEN: this.PRODUCT_GEN,
        TYPE_ID: this.TYPE_ID,
        PRODUCT_EXP: this.PRODUCT_EXP,
        MEMBER_ID: this.MEMBER_ID,
        PC_CPU: this.PC_CPU,
        PC_RAM: this.PC_RAM,
        PC_HD: this.PC_HD,
        PC_WINDOW: this.PC_WINDOW,
        STATUS: "1",
      };
      axios
        .post("https://qsbg.herokuapp.com/insertPRODUCT", data)
        .then((response) => {
          console.log(response);
        });
      this.$refs["my-modal"].hide();
    },
    updateproduct() {
      console.log(
        this.items[this.productdetail].BRAND_ID,
        this.items[this.productdetail].MEMBER_ID
      );
      var data = {
        PRODUCT_ID: this.items[this.productdetail].PRODUCT_ID,
        PRODUCT_CODE: this.items[this.productdetail].PRODUCT_CODE,
        BRAND_ID: this.items[this.productdetail].BRAND_ID,
        PRODUCT_GEN: this.items[this.productdetail].PRODUCT_GEN,
        PRODUCT_EXP: this.items[this.productdetail].PRODUCT_EXP,
        PC_CPU: this.items[this.productdetail].PC_CPU,
        PC_RAM: this.items[this.productdetail].PC_RAM,
        PC_HD: this.items[this.productdetail].PC_HD,
        PC_WINDOW: this.items[this.productdetail].PC_WINDOW,
        MEMBER_ID: this.items[this.productdetail].MEMBER_ID,
      };
      axios
        .post("https://qsbg.herokuapp.com/updatePRODUCT", data)
        .then((response) => {
          console.log(response);
        });
      this.$refs["modal-1"].hide();
    },

    deleteproduct() {
      var data = {
        PRODUCT_ID: this.items[this.productdetail].PRODUCT_ID,
      };
      axios
        .post("https://qsbg.herokuapp.com/deletePRODUCT", data)
        .then((response) => {
          console.log(response);
        });
      this.$refs["modal-2"].hide();
    },

    hidemodal() {
      this.$refs["modal-1"].hide();
    },
    info(item, index, button) {
      this.productdetail = index;
      console.log(index);
      this.infoModal.title = item.name;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    info1(item, index, button) {
      this.productdetail = index;
      console.log(index);
      this.infoModal1.title = item.name;
      this.infoModal1.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal1.id, button);
    },
    info2(item, index, button) {
      this.productdetail = index;
      console.log(index);
      this.infoModal2.title = item.name;
      this.infoModal2.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal2.id, button);
    },
  },
};
</script>

<style>
.b-form-btn-label-control.form-control > label {
  outline: 0;
  padding-left: 0.25rem;
  margin: 0;
  border: 0;
  font-size: inherit;
  cursor: pointer;
  min-height: calc(calc(1.5em + 0.75rem + 2px) - 2px);
  z-index: 1 !important;
}

.md-field {
  width: 100%;
  min-height: 0 !important;
  margin: 0 0 0 !important;
  padding-top: 0 !important;
  display: flex;
  position: relative;
  font-family: inherit;
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
h5,
.h5 {
  font-size: 1.25rem;
  margin-top: 20px;
}
</style>