<template>
  <div>
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <br />
    <div style="margin-top: 70px"></div>
    <!-- เริ่ม -->
    <div>
      <div align="left" style="padding-left: 10px">
        <h2>ประวัติไม่สามารถซ่อมครุภัณฑ์ได้</h2>
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
          :items="itemsnot"
          :fields="fieldss"
          :filter="filter"
          :filterIncludedFields="filterOn"
        >
          <template v-slot:cell(details)="row">
            <b-button
              class="mr-2"
              @click="info2(row.item, row.index, $event.target)"
              >รายละเอียด</b-button
            >
            <!-- รายละเอียด -->
          </template>
      
        </b-table>
        <!-- ปุ่มรายละเอียด -->
        <b-modal :id="infoModal2.id" ref="modal-2" hide-footer>
          <b-container fluid>
            <div align="center">
              <b><h4>รายละเอียด</h4></b>
            </div>
            <h6>รหัสครุภัณฑ์ : {{ itemsnot[details].PRODUCT_CODE }}</h6>
            <h6>ยี่ห้อ : {{ itemsnot[details].BRAND_NAME }}</h6>
            <h6>รุ่น : {{ itemsnot[details].PRODUCT_GEN }}</h6>
            <h6>ปัญหาการเเจ้งซ่อม : {{ itemsnot[details].FIX_DETAIL }}</h6>
            <h6>
              วันที่เเจ้งซ่อม :
              {{ format_datetime(itemsnot[details].DATE) }}
            </h6>
          </b-container>
        </b-modal>

        <b-modal :id="infoModal3.id" ref="modal-3" hide-footer>
          <b-container fluid>
            <div align="center">
              <h5>การจัดจำหน่าย</h5>
            </div>
            <div style="margin-top: 20px">
              <b-row>
                <b-col align="right" cols="3"
                  >สถานที่ <br />
                  จัดจำหน่าย</b-col
                >
                <b-col cols="9">
                  <div style="margin-right: 50px">
                    <b-form-textarea
                      v-model="DISTRIBUTOR"
                      placeholder="กรอกสถานที่..."
                      rows="3"
                    ></b-form-textarea>
                  </div>
                </b-col>
              </b-row>
              <div style="margin-top: 20px">
                <b-row>
                  <b-col align="right" cols="3">ราคาจำหน่าย</b-col>
                  <b-col cols="9">
                    <div style="margin-right: 50px">
                      <b-form-input
                        v-model="D_PRICE"
                        placeholder="กรอกราคา"
                      ></b-form-input>
                    </div>
                  </b-col>
                </b-row>

                <b-button
                  class="mt-3"
                  variant="outline-success"
                  block
                  @click="addDistributor"
                  >บันทึก</b-button
                >
              </div>
            </div>
          </b-container>
        </b-modal>
        <!-- ปุ่มแก้ไข -->
      </b-container>
    </div>
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

    itemsnot: [
      {
        PRODUCT_NUMBER: "",
        PRODUCT_CODE: "",
        CREATE_DATE: "",
        MEMBER_NAME: "",
        BACK_DATE: "",
        BACK_MEMBER: "",
      },
    ],
    fieldss: [
      // { key: "FIX_ID", label: "ลำดับ", class: "text-center" },
      { key: "PRODUCT_CODE", label: "เลขครุภัณฑ์", class: "text-center" },
      { key: "MEMBER_NAME", label: "ผู้แจ้งซ่อม", class: "text-center" },
      { key: "details", label: "ปัญหาการแจ้งซ่อม", class: "text-center" },
      
    ],
    infoModal3: {
      id: "info-modal3",
      title: "",
      content: "",
    },
    distributor: 0,
    filter: null,
    filterOn: [],
    infoModal2: {
      id: "info-modal2",
      title: "",
      content: "",
    },
    details: 0,
    PRODUCT_TYPE: "",
    DISTRIBUTOR: "",
    D_PRICE: "",
  }),
  mounted() {
    axios
      .post("https://qsbg.herokuapp.com/selecthistoryfixadminnot")
      .then((response) => {
        console.log(response.data);
        this.itemsnot = response.data;
      });
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
 

    info2(item, index, button) {
      this.details = index;
      console.log(index);
      this.infoModal2.title = item.name;
      this.infoModal2.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal2.id, button);
    },
    info3(item, index, button) {
      this.distributor = index;
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