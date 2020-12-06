<template>
  <div id="app" v-if="login == 1">
    <Nav />
    <div style="margin: 20px">
      <b-row>
        <b-col cols="4">
          <div align="left" style="margin-top: 70px">
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
          <div align="left" style="margin-top: 70px">
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
        <b-col cols="6">
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
                <md-table-cell>การเเจ้งซ่อม(จำนวน)</md-table-cell>
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
        <b-col cols="6">
          <div class="wrapper" style="margin: 20px; margin-top: 20px">
            <div style="margin: 10px">
              <h4>ข้อมูลยี่ห้อการเเจ้งซ่อมครุภัณฑ์</h4>
            </div>
            <canvas id="graph3" width="150" height="100"></canvas>
          </div>
          <div style="margin: 20px">
            <md-table md-card>
              <md-table-row
                style="background-color: #ffad32"
                slot="md-table-row"
              >
                <md-table-cell>ยี่ห้อ</md-table-cell>
                <md-table-cell>จำนวน</md-table-cell>
              </md-table-row>
              <md-table-row
                slot="md-table-row"
                v-for="(item, index) in itemss"
                :key="index"
              >
                <md-table-cell md-label="สำนักงาน">{{
                  item.brandname
                }}</md-table-cell>
                <md-table-cell md-label="การเเจ้งซ่อม">{{
                  item.brandfixcount
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
    <b-icon icon="exclamation-circle-fill" variant="warning" style="width: 120px; height: 120px;margin-top:200px;"></b-icon>
    <div align="center">
      <h5>ไม่มีการเเจ้งซ่อม</h5>
    </div>
  </div>
         
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js";
import Nav from "../../components/Nav";
export default {
  components: {
    Nav,
  },
  data: () => ({
    login: "",
    YEAR: "2563",
    MONTH: "0",
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
  }),
  created() {
    this.showlogin();
  },

  async mounted() {
    console.log(this.YEAR, this.MONTH);
    var subdistrict = [];
    var fixcount = [];
    await axios
      .post("http://localhost:5000/selectfixdashboard1", {
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
    var brandname = [];
    var brandfixcount = [];

    await axios
      .post("http://localhost:5000/selectfixbrand", {
        year: this.YEAR,
        month: this.MONTH,
      })
      .then((response) => {
        console.log(response.data);
        this.itemss = response.data;

        for (let index = 0; index < this.itemss.length; index++) {
          const element = this.itemss[index];
          brandname.push(element.brandname);
          brandfixcount.push(element.brandfixcount);

          // this.itemcountbrand += parseFloat(element.brandfixcount);
          // console.log(this.itemcountbrand);
        }
      });
    var ctxx = document.getElementById("graph3").getContext("2d");
    var bar1 = new Chart(ctxx, {
      type: "bar",
      data: {
        labels: brandname,
        datasets: [
          {
            backgroundColor: "#ffad32",
            label: "จำนวนยี่ห้อ",
            data: brandfixcount,
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
    showlogin() {
      this.login = localStorage.getItem("ADMIN");
      console.log(this.login);
    },
    async select() {
      console.log(this.YEAR, this.MONTH);
      var workmb = [];
      var fixcount = [];
      await axios
        .post("http://localhost:5000/selectfixdashboard", {
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
      var brandname = [];
      var brandfixcount = [];
      await axios
        .post("http://localhost:5000/selectfixbrand", {
          year: this.YEAR,
          month: this.MONTH,
        })
        .then((response) => {
          console.log(response.data);
          this.itemss = response.data;
          for (let index = 0; index < this.itemss.length; index++) {
            const element = this.itemss[index];

            brandname.push(element.brandname);
            brandfixcount.push(element.brandfixcount);
          
          }
        });
      var ctxx = document.getElementById("graph3").getContext("2d");
      var bar1 = new Chart(ctxx, {
        type: "bar",
        data: {
          labels: brandname,
          datasets: [
            {
              backgroundColor: "#ffad32",
              label: "จำนวนยี่ห้อ",
              data: brandfixcount,
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