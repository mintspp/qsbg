<template>

  <div id="app" v-if="login == 1">
    <Nav />
    <div>
    <div class="wrapper">
      <canvas id="graph2" width="300" height="250"></canvas>
    </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import Nav from "../../components/Nav"
export default {
  components:{
    Nav,
  },
  data:()=>({
    login: "",
  }),
   mounted() {
    var month = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค."
    ];
    var price = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var ctx = document.getElementById("graph2").getContext("2d");
    var bar = new Chart(ctx, {
      type: "bar",
      data: {
        labels: month,
        datasets: [
          {
            backgroundColor: "#37a15b",
            label: "ยอดขาย(บาท)",
            data: price
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    console.log(bar);
  },
  created(){
    this.showlogin();
  },
  methods:{
     showlogin() {
      this.login = localStorage.getItem("ADMIN");
      console.log(this.login);
    },
  },
};
</script>


<style>
.wrapper {
  padding-top: 100px;;
    display: block;
    height: 600px;
    width: 600px;
}
</style>