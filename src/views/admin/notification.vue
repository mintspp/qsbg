<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <div style="margin-top:60px;"></div>
    <!-- เริ่ม -->
    <div>
      <b-container fluid>
        <!-- ส่วนหัวค้นหาและเลื่อนดูข้อมูล -->
        <b-row>
          <b-col cols="6" class="my-2">
            <!-- ค้นหา -->
            <b-form-input v-model="filter" type="search" id="filterInput" placeholder="ค้นหา"></b-form-input>
          </b-col>
          <b-col cols="6">
           
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
            <b-button class="mr-2" @click="info1(row.item, row.index, $event.target)">รายละเอียด</b-button>
            <!-- แก้ไข -->
          </template>
          <template v-slot:cell(more)="row">
            <b-button
              variant="warning"
              class="mr-2"
              @click="info(row.item, row.index, $event.target)"
            >แก้ไข</b-button>
            <b-button
              variant="danger"
              class="mr-2"
              @click="info2(row.item, row.index, $event.target)"
            >ลบ</b-button>

            <!-- แก้ไข -->
          </template>
        </b-table>
        <!-- ปุ่มรายละเอียด -->
        <b-modal :id="infoModal1.id" size="lg" ref="modal-1" hide-footer>
          <b-container fluid>
            <b-row>
              <b-col cols="12">รายละเอียด</b-col>
            </b-row>
          </b-container>
        </b-modal>
        <!-- ปุ่มแก้ไข -->
        <b-modal :id="infoModal.id" size="lg" ref="modal-1" :title="infoModal.title" hide-footer>
          <b-container fluid>
            <b-row>
              <b-col cols="12">เเก้ไขข้อมูล</b-col>
            </b-row>
          </b-container>
          <b-button class="mt-3" variant="warning" block>ยืนยัน</b-button>
        </b-modal>
        <!-- ปุ่มลบ -->
        <b-modal :id="infoModal2.id" centered ref="modal-1" hide-footer>
          <b-container fluid>
            <b-row>
              <b-col cols="12" align="center">
                <div style="margin-bottom:20px;">
                  <h5>คุณต้องการลบใช่หรือไม่</h5>
                </div>
              </b-col>
            </b-row>
          </b-container>
          <b-row>
            <b-col cols="6">
              <div style="margin-left:50px;margin-right:10px;">
                <b-button variant="success" block>ใช่</b-button>
              </div>
            </b-col>
            <b-col cols="6">
              <div style="margin-left:10px;margin-right:50px;">
                <b-button variant="danger" block @click="hidemodal">ไม่ใช่</b-button>
              </div>
            </b-col>
          </b-row>
        </b-modal>
      </b-container>
    </div>
    <!-- จบ -->
  </div>
</template>

<script>
import Nav from "../../components/Nav"
export default {
    components:{
    Nav,
  },
  data: () => ({
    login: "",
    PRODUCT_TYPE: "",
    options: [
      { value: "คอมพิวเตอร์", text: "คอมพิวเตอร์" },
      { value: "เครื่องสำรองไฟ", text: "เครื่องสำรองไฟ" }
    ],
    items: [
      {
        PRODUCT_NUMBER: "1",
        PRODUCT_CODE: "12345",
        PRODUCT_BRAND: "Acer",
        PRODUCT_GEN: "Acer",
        PRODUCT_TYPE: "คอมพิวเตอร์",
        PRODUCT_EXP:""
      }
    ],
    fields: [
      { key: "PRODUCT_NUMBER", label: "ลำดับ", class: "text-center" },
      { key: "PRODUCT_CODE", label: "เลขครุภัณฑ์", class: "text-center" },
      { key: "PRODUCT_BRAND", label: "ยี่ห้อ", class: "text-center" },
      { key: "PRODUCT_GEN", label: "รุ่น", class: "text-center" },
      { key: "PRODUCT_TYPE", label: "ประกัน", class: "text-center" },
      { key: "detail", label: "รายละเอียด", class: "text-center" },
      { key: "PRODUCT_EXP", label: "ประกัน", class: "text-center" },
      { key: "more", label: "จัดการ", class: "text-center" }
    ],

    filter: null,
    filterOn: [],
    infoModal: {
      id: "info-modal",
      title: "",
      content: ""
    },
    infoModal1: {
      id: "info-modal1",
      title: "",
      content: ""
    },
    infoModal2: {
      id: "info-modal2",
      title: "",
      content: ""
    }
  }),
  created(){
    this.showlogin();
  },
  methods: {
    showlogin() {
      this.login = localStorage.getItem("ADMIN");
      console.log(this.login);
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    addproduct() {
      this.$refs["my-modal"].hide();
    },
     goindex() {
      this.$router.push({ path: "/adminindex" });
    },
    goregister() {
      this.$router.push({ path: "/adminregister" });
    },
    godetailfix() {
      this.$router.push({ path: "/admindetailfix" });
    },
    gohistory() {
      this.$router.push({ path: "/adminhistory" });
    },
    goprofile() {
      this.$router.push({ path: "/adminprofile" });
    },
    hidemodal() {
      this.$refs["modal-1"].hide();
    },
    info(item, index, button) {
      this.editpro = index;
      console.log(index);
      this.infoModal.title = item.name;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    info1(item, index, button) {
      this.editpro = index;
      console.log(index);
      this.infoModal1.title = item.name;
      this.infoModal1.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal1.id, button);
    },
    info2(item, index, button) {
      this.editpro = index;
      console.log(index);
      this.infoModal2.title = item.name;
      this.infoModal2.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal2.id, button);
    }
  }
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
</style>