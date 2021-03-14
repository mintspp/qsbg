<template>
  <div>
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <br />
    <div style="margin-top: 60px"></div>

    <b-container fluid>
      <!-- ส่วนหัวค้นหาและเลื่อนดูข้อมูล -->
      <div align="left" style="padding-left: 10px">
        <h2>ประวัติการจัดจำหน่าย</h2>
      </div>
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
      </b-table>
    </b-container>
  </div>
</template>

<script>
import moment from "moment";
import Nav from "../../components/Nav";
import axios from "axios";
export default {
  components: {
    Nav,
  },
  data: () => ({
    items: [
      {
        PRODUCT_CODE: "",
        BRAND_NAME: "",
        NOTE: "",
        DATE: "",
      },
    ],
    fields: [
      { key: "PRODUCT_CODE", label: "รหัสครุภัณฑ์", class: "text-center" },
      { key: "BRAND_NAME", label: "ยี่ห้อ", class: "text-center" },
      { key: "NOTE", label: "รายละเอียด", class: "text-center" },
      {
        key: "DATE",
        label: "วันที่จัดจำหน่าย",
        class: "text-center",
        formatter: "format_datetime1",
      },
    ],
  }),
  mounted() {
    axios.post("https://qsbg.herokuapp.com/selectdistributor").then((response) => {
      console.log(response.data);
      this.items = response.data;
    });
  },
  methods: {
    format_datetime1(data) {
      var dm = moment(data).format("DD/MM/");
      var year = parseInt(moment(data).format("YYYY")) + 543;
      return dm + year;
    },
  },
};
</script>

<style>
</style>