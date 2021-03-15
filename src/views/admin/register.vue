<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <div style="margin-top:60px;"></div>

    <!-- เริ่ม -->
    <div>
      <b-container fluid>
          <br />
          <b-row>
         <b-col cols="6">
 <div align="left"><h2>ข้อมูลสมาชิก</h2></div>    
          </b-col>
          <b-col cols="6">
<div align="right" style="margin-right:10px;margin-top:6px;">
              <b-button variant="success" @click="showModal"
                >สมัครสมาชิก</b-button
              >
              <b-modal ref="my-modal" size="lg" hide-footer>
                <div align="center">
                  <b><h5>สมัครสมาชิก</h5></b>
                </div>
                <div style="margin-top:20px;">
                  <b-row>
                    <b-col align="right" cols="4">ชื่อ</b-col>
                    <b-col cols="8">
                      <div style="margin-right:50px;">
                        <b-form-input
                          v-model="MEMBER_NAME"
                          placeholder="กรอกชื่อ"
                        ></b-form-input>
                      </div>
                    </b-col>
                  </b-row>
                </div>

                <div style="margin-top:20px;">
                  <b-row>
                    <b-col align="right" cols="4">สำนักงาน</b-col>
                    <b-col cols="8">
                      <div style="margin-right:50px;">
                        <b-form-select
                          v-model="MEMBER_WORK"
                         :options="options1"
                       
                        ></b-form-select>
                      </div>
                    </b-col>
                  </b-row>
                </div>

                <div style="margin-top:20px;">
                  <b-row>
                    <b-col align="right" cols="4">เบอร์โทร</b-col>
                    <b-col cols="8">
                      <div style="margin-right:50px;">
                        <b-form-input
                          v-model="MEMBER_TELL"
                          placeholder="กรอกเบอร์โทร"
                        ></b-form-input>
                      </div>
                    </b-col>
                  </b-row>
                </div>

                <div style="margin-top:20px;">
                  <b-row>
                    <b-col align="right" cols="4">อีเมล</b-col>
                    <b-col cols="8">
                      <div style="margin-right:50px;">
                        <b-form-input
                          v-model="MEMBER_EMAIL"
                          placeholder="กรอกอีเมล"
                        ></b-form-input>
                      </div>
                    </b-col>
                  </b-row>
                </div>

                <div style="margin-top:20px;">
                  <b-row>
                    <b-col align="right" cols="4">ชื่อผู้ใช้งาน</b-col>
                    <b-col cols="8">
                      <div style="margin-right:50px;">
                        <b-form-input
                          v-model="MEMBER_USERNAME"
                          placeholder="กรอกชื่อผู้ใช้งาน"
                        ></b-form-input>
                      </div>
                    </b-col>
                  </b-row>
                </div>

                <div style="margin-top:20px;">
                  <b-row>
                    <b-col align="right" cols="4">รหัสผ่าน</b-col>
                    <b-col cols="8">
                      <div style="margin-right:50px;">
                        <b-form-input
                          v-model="MEMBER_PASSWORD"
                          placeholder="กรอกรหัสผ่าน"
                        ></b-form-input>
                      </div>
                    </b-col>
                  </b-row>
                </div>

                <b-button
                  class="mt-3"
                  variant="success"
                  block
                  @click="addregister"
                  >บันทึก</b-button
                >
              </b-modal>
            </div>
          </b-col>
          </b-row>
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
        <div align="right" style="margin-right:10px;"><h5>จำนวนทั้งหมด {{itemss}} สมาชิก</h5> </div>
          </b-col>
          
        </b-row>
        
        <!-- ส่วนหัวค้นหาและเลื่อนดูข้อมูล -->
         
        
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
            <!-- รายละเอียด -->
            <b-icon
              style="width: 25px; height: 25px;"
              @click="info2(row.item, row.index, $event.target)"
              icon="file-earmark-text"
              variant="success"
            ></b-icon>
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
              @click="info1(row.item, row.index, $event.target)"
              >ลบ</b-button
            >
          </template>
        </b-table>
        <!-- รายละเอียด -->
        <b-modal :id="infoModal2.id"  ref="modal-2" hide-footer>
          <b-container fluid>
            <b-row>
              <b-col cols="12" align="center">
                <div style="margin-bottom:20px;">
                  <h5>รายละเอียด</h5>
                </div>
              </b-col>
            </b-row>
            <h6>ชื่อผู้ใช้ : {{ items[editmember].MEMBER_USERNAME }}</h6>
            <h6>รหัสผ่าน : {{ items[editmember].MEMBER_PASSWORD }}</h6>
            <h6>เบอร์โทร : {{ items[editmember].MEMBER_TELL }}</h6>
            <h6>อีเมล : {{ items[editmember].MEMBER_EMAIL }}</h6>
          </b-container>
        </b-modal>

        <!-- ปุ่มแก้ไข -->
        <b-modal
          :id="infoModal.id"
          ref="modal-1"
          :title="infoModal.title"
          size="lg"
          hide-footer
        >
          <b-container fluid>
            <div>
              <div style="margin-top:10px;margin-bottom:10px;" align="center">
                <b><h5>แก้ไขข้อมูล</h5> </b>
              </div>
              <b-row>
                <b-col align="right" cols="4">ชื่อ</b-col>
                <b-col cols="8">
                  <div style="margin-right:50px;">
                    <b-form-input
                      v-model="items[editmember].MEMBER_NAME"
                    ></b-form-input>
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top:20px;">
              <b-row>
                <b-col align="right" cols="4">สำนักงาน</b-col>
                <b-col cols="8">
                  <div style="margin-right:50px;">
                    <b-form-select
                      v-model="items[editmember].MEMBER_WORK"
                      :options="options1"
                    ></b-form-select>
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top:20px;">
              <b-row>
                <b-col align="right" cols="4">เบอร์โทร</b-col>
                <b-col cols="8">
                  <div style="margin-right:50px;">
                    <b-form-input
                      v-model="items[editmember].MEMBER_TELL"
                    ></b-form-input>
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top:20px;">
              <b-row>
                <b-col align="right" cols="4">อีเมล</b-col>
                <b-col cols="8">
                  <div style="margin-right:50px;">
                    <b-form-input
                      v-model="items[editmember].MEMBER_EMAIL"
                    ></b-form-input>
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top:20px;">
              <b-row>
                <b-col align="right" cols="4">ชื่อผู้ใช้งาน</b-col>
                <b-col cols="8">
                  <div style="margin-right:50px;">
                    <b-form-input
                      v-model="items[editmember].MEMBER_USERNAME"
                    ></b-form-input>
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top:20px;">
              <b-row>
                <b-col align="right" cols="4">รหัสผ่าน</b-col>
                <b-col cols="8">
                  <div style="margin-right:50px;">
                    <b-form-input
                      v-model="items[editmember].MEMBER_PASSWORD"
                    ></b-form-input>
                  </div>
                </b-col>
              </b-row>
            </div>

            <div style="margin-top:20px;">
              <b-row>
                <b-col align="right" cols="4">สถานะ</b-col>
                <b-col cols="8">
                  <div style="margin-right:50px;">
                    <b-form-select
                      v-model="items[editmember].MEMBER_STATUS"
                      :options="options"
                    ></b-form-select>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-container>
          <b-button class="mt-3" variant="warning" block @click="updatemember"
            >ยืนยัน</b-button
          >
        </b-modal>
        <!-- ปุ่มลบ -->
        <b-modal :id="infoModal1.id" ref="modal-2" hide-footer>
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
                <b-button variant="success" block @click="deletemember"
                  >ใช่</b-button
                >
              </div>
            </b-col>
            <b-col cols="6">
              <div style="margin-left:10px;margin-right:50px;">
                <b-button variant="danger" block @click="hidemodal"
                  >ไม่ใช่</b-button
                >
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
import axios from "axios";
import Nav from "../../components/Nav";
export default {
  components: {
    Nav
  },
  data: () => ({
    options: [
      { value: "admin", text: "admin" },
      { value: "user", text: "user" }
    ],
    options1: [
      { value: "สำนักพัฒนาสวนพฤกษศาสตร์", text: "สำนักพัฒนาสวนพฤกษศาสตร์" },
      { value: "สำนักวิจัย เเละอนุรักษ์", text: "สำนักวิจัย เเละอนุรักษ์" },
      { value: "สำนักส่งเสริมความรู้เเละกิจการ", text: "สำนักส่งเสริมความรู้เเละกิจการพฤกษศาสตร์" },
      { value: "สำนักบริหาร", text: "สำนักบริหาร" }
    ],
    itemss:"",
    login: "",
    MEMBER_NAME: "",
    MEMBER_STATUS: "user",
    MEMBER_USERNAME: "",
    MEMBER_PASSWORD: "",
    MEMBER_TELL: "",
    MEMBER_EMAIL: "",
    MEMBER_WORK: "",
    items: [
      {
        MEMBER_ID: "",
        MEMBER_NAME: "",
        MEMBER_STATUS: "",
        MEMBER_USERNAME: "",
        MEMBER_PASSWORD: "",
        MEMBER_TELL: "",
        MEMBER_EMAIL: "",
        MEMBER_WORK: ""
      }
    ],

    fields: [
      // { key: "MEMBER_ID", label: "ลำดับ", class: "text-center" },
      { key: "MEMBER_NAME", label: "ชื่อ", class: "text-center" },
      { key: "MEMBER_WORK", label: "งาน", class: "text-center" },
      // { key: "MEMBER_TELL", label: "เบอร์โทร", class: "text-center" },
      // { key: "MEMBER_EMAIL", label: "อีเมล", class: "text-center" },
      // { key: "MEMBER_USERNAME", label: "ชื่อผู้ใช้", class: "text-center" },
      // { key: "MEMBER_PASSWORD", label: "รหัสผ่าน", class: "text-center" },
      { key: "MEMBER_STATUS", label: "สถานะ", class: "text-center" },
      { key: "detail", label: "รายละเอียด", class: "text-center" },
      { key: "more", label: "จัดการ", class: "text-center" }
    ],
    editmember: 0,
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
  mounted() {
    axios.post("https://qsbg.herokuapp.com/selectMEMBER").then(response => {
      console.log(response.data);
      this.items = response.data;
       this.itemss =response.data.length
    });
  
  },
  created() {
    this.showlogin();
  },
  methods: {
    showlogin() {
      this.login = localStorage.getItem("ADMIN");
      console.log(this.login);
    },
    addregister() {
      var data = {
        MEMBER_NAME: this.MEMBER_NAME,
        MEMBER_STATUS: this.MEMBER_STATUS,
        MEMBER_USERNAME: this.MEMBER_USERNAME,
        MEMBER_PASSWORD: this.MEMBER_PASSWORD,
        MEMBER_TELL: this.MEMBER_TELL,
        MEMBER_EMAIL: this.MEMBER_EMAIL,
        MEMBER_WORK: this.MEMBER_WORK
      };
      axios.post("https://qsbg.herokuapp.com/insertMEMBER", data).then(response => {
        console.log(response);
      });
      this.$refs["my-modal"].hide();
    },
    updatemember() {
      var data = {
        MEMBER_NAME: this.items[this.editmember].MEMBER_NAME,
        MEMBER_STATUS: this.items[this.editmember].MEMBER_STATUS,
        MEMBER_USERNAME: this.items[this.editmember].MEMBER_USERNAME,
        MEMBER_PASSWORD: this.items[this.editmember].MEMBER_PASSWORD,
        MEMBER_TELL: this.items[this.editmember].MEMBER_TELL,
        MEMBER_EMAIL: this.items[this.editmember].MEMBER_EMAIL,
        MEMBER_WORK: this.items[this.editmember].MEMBER_WORK,
        MEMBER_ID: this.items[this.editmember].MEMBER_ID
      };
      axios.post("https://qsbg.herokuapp.com/updateMEMBER", data).then(response => {
        console.log(response);
      });
      this.$refs["modal-1"].hide();
    },
    deletemember() {
      var data = {
        MEMBER_ID: this.items[this.editmember].MEMBER_ID
      };
      axios.post("https://qsbg.herokuapp.com/deleteMEMBER", data).then(response => {
        console.log(response);
      });
      this.$refs["modal-2"].hide();
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    goindex() {
      this.$router.push({ path: "/adminindex" });
    },
    gohistory() {
      this.$router.push({ path: "/adminhistory" });
    },
    gonotification() {
      this.$router.push({ path: "/adminnotification" });
    },
    godetailfix() {
      this.$router.push({ path: "/admindetailfix" });
    },
    goprofile() {
      this.$router.push({ path: "/adminprofile" });
    },
    hidemodal() {
      this.$refs["modal-1"].hide();
    },
    info(item, index, button) {
      this.editmember = index;
      console.log(index);
      this.infoModal.title = item.name;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    info1(item, index, button) {
      this.editmember = index;
      console.log(index);
      this.infoModal1.title = item.name;
      this.infoModal1.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal1.id, button);
    },
    info2(item, index, button) {
      this.editmember = index;
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

.col-6 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  z-index: 1 !important;
}
</style>