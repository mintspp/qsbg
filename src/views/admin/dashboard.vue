<template>
  <div id="app" v-if="login == 1">
    <Nav />
    <br>
    <div style="margin: 20px; padding-top: 20px;">
      <div align="left">
        <h2>สรุปการแจ้งซ่อมครุภัณฑ์</h2>
      </div> <br>
      <b-row>
        <b-col cols="4" align="left">
          <div align="left">
            <h5>ประจำปี</h5>
            <b-form-select
              @change="select()"
              v-model="YEAR"
              :options="year"
              class="mb-1"
            ></b-form-select>
          </div>
        </b-col>
        <b-col cols="4">
          <div align="left" >
            <h5>ประจำเดือน</h5>
            <b-form-select
              @change="select()"
              v-model="MONTH"
              :options="month"
              class="mb-1"
            ></b-form-select>
          </div>
        </b-col>
      </b-row>
      <div v-if="items != '' && itemss != ''">
        <b-row>
          <b-col xl="6" lg="6" sm="12">
            <div class="wrapper" style="margin: 20px; margin-top: 20px">
              <div style="margin: 10px">
                <h4>ข้อมูลการเเจ้งซ่อมครุภัณฑ์</h4>
              </div>
              <canvas id="graph2" width="150" height="100"></canvas>
            </div>
            <div style="margin: 20px">
              <md-table md-card>
                <md-table-row
                  style="background-color: #80ad47"
                  slot="md-table-row"
                >
                  <md-table-cell>สำนักงาน</md-table-cell>
                  <md-table-cell>การเเจ้งซ่อม (จำนวน)</md-table-cell>
                </md-table-row>
                <md-table-row
                  slot="md-table-row"
                  v-for="(item, index) in items"
                  :key="index"
                >
                  <md-table-cell md-label="สำนักงาน">{{
                    item.workmb
                  }}</md-table-cell>
                  <md-table-cell md-label="การเเจ้งซ่อม">{{
                    item.fixcount
                  }}</md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </b-col>
          <b-col xl="6" lg="6" sm="12">
            <div class="wrapper" style="margin: 20px; margin-top: 20px">
              <div style="margin: 10px">
                <h4>ข้อมูลประเภทการเเจ้งซ่อมครุภัณฑ์</h4>
              </div>
              <canvas id="graph3" width="150" height="100"></canvas>
            </div>
            <div style="margin: 20px">
              <md-table md-card>
                <md-table-row
                  style="background-color: #ffad32"
                  slot="md-table-row"
                >
                  <md-table-cell>ประเภท</md-table-cell>
                  <md-table-cell>การแจ้งซ่อม (จำนวน)</md-table-cell>
                </md-table-row>
                <md-table-row
                  slot="md-table-row"
                  v-for="(item, index) in itemss"
                  :key="index"
                >
                  <md-table-cell md-label="สำนักงาน">{{
                    item.typename
                  }}</md-table-cell>
                  <md-table-cell md-label="การเเจ้งซ่อม">{{
                    item.typefixcount
                  }}</md-table-cell>
                </md-table-row>
                <!-- <md-table-row
                style="background-color: #f1912a"
                slot="md-table-row"
              >
                <md-table-cell md-label="สำนักงาน">รวม</md-table-cell>
                <md-table-cell md-label="การเเจ้งซ่อม">{{
                  itemcountbrand
                }}</md-table-cell>
              </md-table-row> -->
              </md-table>
            </div>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <div>
          <b-icon
            icon="exclamation-circle-fill"
            variant="warning"
            style="width: 120px; height: 120px; margin-top: 200px"
          ></b-icon>
          <div align="center">
            <h5>ไม่มีการเเจ้งซ่อม</h5>
          </div>
        </div>
      </div>
      <br>
      <div style="margin: 20px">
        <h4>ข้อมูลการเเสดงความคิดเห็น</h4>
        <div style="margin: 10px">
          <b-table striped hover 
         
            small
            stacked="md"
            :items="comment"
            :fields="field"
            :per-page="perPage"
            :current-page="currentPage"
          >
           <template v-slot:cell(detail)="row">
            <!-- รอการตอบรับ -->
            <b-button
              class="mr-2"
              variant="warning"
              @click="info4(row.item, row.index, $event.target)"
              >รายละเอียด</b-button
            >
          </template>
          </b-table>
           <b-modal :id="infoModal4.id" ref="modal-1" hide-footer>
          <b-container fluid>
            <div align="center"><h5>รายละเอียด</h5></div>
            <p>รหัสครุภัณฑ์ : {{ comment[detailcomment].PRODUCT_CODE }}</p>
            <p>ยี่ห้อ : {{ comment[detailcomment].BRAND_NAME }}</p>
            <p>รุ่น : {{ comment[detailcomment].PRODUCT_GEN }}</p>
            <p>
              วันที่เเจ้งซ่อม : {{ format_datetime(comment[detailcomment].DATE) }}
            </p>
            <p>ปัญหาการเเจ้งซ่อม : {{ comment[detailcomment].FIX_DETAIL }}</p>
            <p>ชื่อเจ้าของ : {{ comment[detailcomment].MEMBER_NAME }}</p>
          </b-container>
        </b-modal>
        </div>
        <div style="margin: 5px">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
          <br /><br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import axios from "axios";
import Chart from "chart.js";
import Nav from "../../components/Nav";
import moment from "moment";
export default {
  components: {
    Nav,
  },
  data: () => ({
    login: "",
    YEAR: "2563",
    MONTH: "0",
    comment: null,
    field: [
      { key: "COMMENT", label: "ความคิดเห็น" },
      {
        key: "COMMENT_STAR",
        label: "ให้คะเเนน"},
        {
        key: "detail",
        label: "รายละเอียด"},
      
    ],
    totalRows: 1,
    currentPage: 1,
    perPage: 10,
    month: [
      { value: "0", text: "ทุกเดือน" },
      { value: "1", text: "มกราคม" },
      { value: "2", text: "กุมภาพันธ์" },
      { value: "3", text: "มีนาคม" },
      { value: "4", text: "เมษายน" },
      { value: "5", text: "พฤษภาคม" },
      { value: "6", text: "มิถุนายน" },
      { value: "7", text: "กรกฎาคม" },
      { value: "8", text: "สิงหาคม" },
      { value: "9", text: "กันยายน" },
      { value: "10", text: "ตุลาคม" },
      { value: "11", text: "พฤศจิกายน" },
      { value: "12", text: "ธันวาคม" },
    ],
    year: [
      { value: "2563", text: "พุทธศักราช 2563" },
      { value: "2564", text: "พุทธศักราช 2564" },
      { value: "2565", text: "พุทธศักราช 2565" },
      { value: "2566", text: "พุทธศักราช 2566" },
      { value: "2567", text: "พุทธศักราช 2567" },
      { value: "2568", text: "พุทธศักราช 2568" },
      { value: "2569", text: "พุทธศักราช 2569" },
      { value: "2570", text: "พุทธศักราช 2570" },
      { value: "2571", text: "พุทธศักราช 2571" },
      { value: "2572", text: "พุทธศักราช 2572" },
    ],
    items: null,
    // itemcount: 0,
    itemss: null,
    // itemcountbrand: 0,
    infoModal4: {
      id: "info-modal4",
      title: "",
      content: "",
    },
    detailcomment:0
  }),
  created() {
    this.showlogin();

    axios.post(`${api_url.api_url}/commentsss`).then((response) => {
      console.log(response.data);
      this.comment = response.data;
      console.log(this.comment);
      this.totalRows = this.comment.length;
    });
  },

  async mounted() {
    console.log(this.YEAR, this.MONTH);
    var subdistrict = [];
    var fixcount = [];
    await axios
    
      .post(`${api_url.api_url}/selectfixdashboard`, {
        year: this.YEAR,
        month: this.MONTH,
      })
      .then((response) => {
        console.log(response.data);
        this.items = response.data;

        for (let index = 0; index < this.items.length; index++) {
          const element = this.items[index];
          subdistrict.push(element.workmb);
          fixcount.push(element.fixcount);
          // this.itemcount += parseFloat(element.fixcount);
          // console.log(this.itemcount);
        }
      });
    var ctx = document.getElementById("graph2").getContext("2d");
    var bar = new Chart(ctx, {
      type: "bar",
      data: {
        labels: subdistrict,
        datasets: [
          {
            backgroundColor: "#80ad47",
            label: "จำนวนเเจ้งซ่อม",
            data: fixcount,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    console.log(bar);
    //chart 2
    var typename = [];
    var typefixcount = [];

    await axios
    
      .post(`${api_url.api_url}/selectfixtype`, {
        year: this.YEAR,
        month: this.MONTH,
      })
      .then((response) => {
        console.log(response.data);
        this.itemss = response.data;

        for (let index = 0; index < this.itemss.length; index++) {
          const element = this.itemss[index];
          typename.push(element.typename);
          typefixcount.push(element.typefixcount);

          // this.itemcountbrand += parseFloat(element.brandfixcount);
          // console.log(this.itemcountbrand);
        }
      });
    var ctxx = document.getElementById("graph3").getContext("2d");
    var bar1 = new Chart(ctxx, {
      type: "bar",
      data: {
        labels: typename,
        datasets: [
          {
            backgroundColor: "#ffad32",
            label: "จำนวนยี่ห้อ",
            data: typefixcount,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
    console.log(bar1);
  },

  methods: {
    format_datetime(data) {
      var dm = moment(data).format("DD/MM/");
      var year = parseInt(moment(data).format("YYYY")) + 543;
      return dm + year;
    },
    info4(item, index, button) {
      this.detailcomment = index;
      console.log(index);
      this.infoModal4.title = item.name;
      this.infoModal4.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal4.id, button);
    },
    showlogin() {
      this.login = localStorage.getItem("ADMIN");
      console.log(this.login);
    },
    async select() {
      console.log(this.YEAR, this.MONTH);
      var workmb = [];
      var fixcount = [];
      await axios
        .post(`${api_url.api_url}/selectfixdashboard`, {
          year: this.YEAR,
          month: this.MONTH,
        })
        .then((response) => {
          console.log(response.data);
          this.items = response.data;
          for (let index = 0; index < this.items.length; index++) {
            const element = this.items[index];
            workmb.push(element.workmb);
            fixcount.push(element.fixcount);
          }
        });
      var ctx = document.getElementById("graph2").getContext("2d");
      var bar = new Chart(ctx, {
        type: "bar",
        data: {
          labels: workmb,
          datasets: [
            {
              backgroundColor: "#80ad47",
              label: "จำนวนเเจ้งซ่อม",
              data: fixcount,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
      console.log(bar);
      //chart 2
      var typename = [];
      var typefixcount = [];
      await axios
        .post( `${api_url.api_url}/selectfixtype`, {
          year: this.YEAR,
          month: this.MONTH,
        })
        .then((response) => {
          console.log(response.data);
          this.itemss = response.data;
          for (let index = 0; index < this.itemss.length; index++) {
            const element = this.itemss[index];

            typename.push(element.typename);
            typefixcount.push(element.typefixcount);
          }
        });
      var ctxx = document.getElementById("graph3").getContext("2d");
      var bar1 = new Chart(ctxx, {
        type: "bar",
        data: {
          labels: typename,
          datasets: [
            {
              backgroundColor: "#ffad32",
              label: "จำนวนยี่ห้อ",
              data: typefixcount,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
      console.log(bar1);
    },
  },
};
</script>


<style>
.wrapper {
  padding-top: 10px;
  display: block;
  /* height: 600px;
  width: 600px; */
}
.col-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  z-index: 1 !important;
}
</style>