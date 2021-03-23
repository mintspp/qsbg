<template>
  <div v-if="login == 1">
    <!-- --------------nav------------ -->
    <Nav />
    <!-- --------------nav------------ -->
    <br />
    <div style="padding-top: 40px;">
      <b-container fluid>
        <div align="left"><h2>ข้อมูลยี่ห้อ/ประเภท  </h2></div> 
        <b-row>
          <b-col xl="6" lg="6" sm="12">
            <div style="margin-top:10px;">
              <b-card>
                <div align="right">
                  <b-button variant="success" @click="showModal"
                    >เพิ่มยี่ห้อ</b-button
                  >
                </div>
                <b-modal ref="my-modal" hide-footer>
                  <div class="d-block text-center" style="margin-bottom:10px;">
                    <h5>เพิ่มยี่ห้อ</h5>
                    <div align="left">ยี่ห้อ</div>
                    <b-form-input
                      v-model="BRAND_NAME"
                      placeholder="Enter your name"
                    ></b-form-input>
                  </div>
                  <b-button variant="success" block @click="insertbrand"
                    >ยืนยัน</b-button
                  >
                </b-modal>
                <img
                  src=""
                  style="width:50px;"
                  alt=""
                />

                <div style="margin-top:10px;">
                  <h5>
                    ยี่ห้อ
                  </h5>
                </div>
                <b-row>
                  <b-col
                    style="margin-top:5px;"
                    v-for="(brand, index) in brand"
                    :key="index"
                    xl="6"
                    lg="6"
                    sm="12"
                  >
                    <b-card>
                      <div align="right">
                        <b-icon
                          icon="pencil-square"
                          @click="updatebrand(brand.BRAND_ID, brand.BRAND_NAME)"
                          variant="warning"
                        ></b-icon>

                        <b-icon
                          icon="trash-fill"
                          @click="
                            dellatebrand(brand.BRAND_ID, brand.BRAND_NAME)
                          "
                          variant="danger"
                        ></b-icon>
                      </div>
                      {{ brand.BRAND_NAME }}
                    </b-card>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
          <b-modal id="bv-modal-example" hide-footer>
            <div class="d-block text-center" style="margin-bottom:10px;">
              <h5>เเก้ไขยี่ห้อ</h5>
              <div align="left">ยี่ห้อ</div>
              <b-form-input
                v-model="setBRAND_N"
                placeholder="Enter your name"
              ></b-form-input>
            </div>
            <b-button variant="success" block @click="update">ยืนยัน</b-button>
          </b-modal>
          <b-modal id="bv-modal-example1" hide-footer>
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
                  <b-button variant="success" block @click="delate"
                    >ใช่</b-button
                  >
                </div>
              </b-col>
              <b-col cols="6">
                <div style="margin-left:10px;margin-right:50px;">
                  <b-button variant="danger" block @click="hidedelatebrand"
                    >ไม่ใช่</b-button
                  >
                </div>
              </b-col>
            </b-row>
          </b-modal>
          <b-col xl="6" lg="6" sm="12">
            <div style="margin-top:10px;">
              <b-card>
                <div align="right">
                  <b-button variant="success" @click="showModal1"
                    >เพิ่มประเภท</b-button
                  >
                  <b-modal ref="my-modal1" hide-footer>
                    <div class="d-block text-center" style="margin-bottom:10px;">
                    <h5>เพิ่มประเภท</h5>
                    <div align="left">ประเภท</div>
                    <b-form-input
                      v-model="TYPE_NAME"
                      placeholder="Enter your name"
                    ></b-form-input>
                  </div>
                  <b-button variant="success" block @click="inserttype"
                    >ยืนยัน</b-button
                  >
                  </b-modal>
                </div>
               <br>
                <div style="margin-top:10px;"><h5>ประเภท</h5></div>

                <b-row>
                  <b-col
                    v-for="(type, index) in type"
                    :key="index"
                    xl="6"
                    lg="6"
                    sm="12"
                  >
                    <b-card style="margin-top:5px;">
                       <div align="right">
                        <b-icon
                          icon="pencil-square"
                          @click="updatetype(type.TYPE_ID, type.TYPE_NAME)"
                          variant="warning"
                        ></b-icon>

                        <b-icon
                          icon="trash-fill"
                          @click="
                            dellatetype(type.TYPE_ID, type.TYPE_NAME)
                          "
                          variant="danger"
                        ></b-icon>
                      </div>
                      {{ type.TYPE_NAME }}
                    </b-card>
                  </b-col>
                </b-row>
              </b-card>
            </div>
          </b-col>
           <b-modal id="bv-modal-example2" hide-footer>
            <div class="d-block text-center" style="margin-bottom:10px;">
              <h5>เเก้ไขประเภท</h5>
              <div align="left">ประเภท</div>
              <b-form-input
                v-model="setTYPE_N"
                placeholder="Enter your name"
              ></b-form-input>
            </div>
            <b-button variant="success" block @click="typeupdate">ยืนยัน</b-button>
          </b-modal>
          <b-modal id="bv-modal-example3" hide-footer>
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
                  <b-button variant="success" block @click="typedelate"
                    >ใช่</b-button
                  >
                </div>
              </b-col>
              <b-col cols="6">
                <div style="margin-left:10px;margin-right:50px;">
                  <b-button variant="danger" block @click="hidedelatetype"
                    >ไม่ใช่</b-button
                  >
                </div>
              </b-col>
            </b-row>
          </b-modal>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
const api_url = require("../../../utilities/api");
import axios from "axios";
import Nav from "../../components/Nav";
export default {
  components: {
    Nav
  },
  data: () => ({
    login: "",
    brand: null,
    type: null,
    search: "",
    BRAND_NAME: "",
    setBRAND_I: "",
    setBRAND_N: "",

    TYPE_NAME:"",
    setTYPE_I : "",
    setTYPE_N :"",
  }),
  mounted() {
    
    axios.post(`${api_url.api_url}/selectBRAND`).then(response => {
      console.log(response.data);
      this.brand = response.data;
    });
    
    axios.post(`${api_url.api_url}/selectTYPE`).then(response => {
      console.log(response.data);
      this.type = response.data;
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
    updatebrand(BRAND_I, BRAND_N) {
      this.setBRAND_I = BRAND_I;
      this.setBRAND_N = BRAND_N;
      console.log(BRAND_I + BRAND_N);
      this.$bvModal.show("bv-modal-example");
    },
    dellatebrand(BRAND_I, BRAND_N) {
      this.setBRAND_I = BRAND_I;
      this.setBRAND_N = BRAND_N;
      console.log(BRAND_I + BRAND_N);
      this.$bvModal.show("bv-modal-example1");
    },
    updatetype(TYPE_I, TYPE_N) {
      this.setTYPE_I = TYPE_I;
      this.setTYPE_N = TYPE_N;
      console.log(TYPE_I + TYPE_N);
      this.$bvModal.show("bv-modal-example2");
    },
    dellatetype(TYPE_I, TYPE_N) {
      this.setTYPE_I = TYPE_I;
      this.setTYPE_N = TYPE_N;
      console.log(TYPE_I + TYPE_N);
      this.$bvModal.show("bv-modal-example3");
    },
    update() {
      console.log(this.setBRAND_I, this.setBRAND_N);
      axios
      
        .post(`${api_url.api_url}/updateBRAND`, {
          BRAND_ID: this.setBRAND_I,
          BRAND_NAME: this.setBRAND_N
        })
        .then(response => {
          console.log(response.data);
          this.reset(response);
        });
      this.$bvModal.hide("bv-modal-example");
    },
    delate() {
      console.log(this.setBRAND_I);
      axios
      
        .post(`${api_url.api_url}/deleteBRAND`, {
          BRAND_ID: this.setBRAND_I
        })
        .then(response => {
          console.log(response.data);
          this.reset(response);
        });
      this.$bvModal.hide("bv-modal-example1");
    },
    typeupdate() {
      console.log(this.setTYPE_I, this.setTYPE_N);
      axios
      
        .post(`${api_url.api_url}/updateTYPE`, {
          TYPE_ID: this.setTYPE_I,
          TYPE_NAME: this.setTYPE_N
        })
        .then(response => {
          console.log(response.data);
          this.reset(response);
        });
      this.$bvModal.hide("bv-modal-example2");
    },
    typedelate() {
      console.log(this.setTYPE_I);
      axios
      
        .post(`${api_url.api_url}/deleteTYPE`, {
          TYPE_ID: this.setTYPE_I
        })
        .then(response => {
          console.log(response.data);
          this.reset(response);
        });
      this.$bvModal.hide("bv-modal-example3");
    },
    hidedelatebrand() {
      this.$bvModal.hide("bv-modal-example1");
    },
    hidedelatetype() {
      this.$bvModal.hide("bv-modal-example3");
    },
    insertbrand() {
      axios
      
        .post(`${api_url.api_url}/insertBRAND`, {
          BRAND_NAME: this.BRAND_NAME
        })
        .then(response => {
          console.log(response);
          this.reset(response);
        });
      this.$refs["my-modal"].hide();
    },
    inserttype(){
      axios
      
        .post(`${api_url.api_url}/insertTYPE`, {
          TYPE_NAME: this.TYPE_NAME
        })
        .then(response => {
          console.log(response);
          this.reset(response);
        });
      this.$refs["my-modal1"].hide();
    },
    reset(){
      
      axios.post(`${api_url.api_url}/selectBRAND`).then(response => {
      console.log(response.data);
      this.brand = response.data;
    });
    
    axios.post(`${api_url.api_url}/selectTYPE`).then(response => {
      console.log(response.data);
      this.type = response.data;
    });
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    showModal1() {
      this.$refs["my-modal1"].show();
    },
    hideModal1() {
      this.$refs["my-modal1"].hide();
    },
    goindex() {
      this.$router.push({ path: "/adminindex" });
    },

    gohistory() {
      this.$router.push({ path: "/adminhistory" });
    },
    godetailfix() {
      this.$router.push({ path: "/admindetailfix" });
    },
    goprofile() {
      this.$router.push({ path: "/adminprofile" });
    },
    godashboard() {
      this.$router.push({ path: "/admindashboard" });
    },

    goregister() {
      this.$router.push({ path: "/adminregister" });
    },
    gonotification() {
      this.$router.push({ path: "/adminnotification" });
    }
  }
};
</script>

<style>
.mb-2,
.my-2 {
  z-index: 1 !important;
  margin-bottom: 0.5rem !important;
}
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm,
.col-sm-auto,
.col-md-1,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md,
.col-md-auto,
.col-lg-1,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg,
.col-lg-auto,
.col-xl-1,
.col-xl-2,
.col-xl-3,
.col-xl-4,
.col-xl-5,
.col-xl-6,
.col-xl-7,
.col-xl-8,
.col-xl-9,
.col-xl-10,
.col-xl-11,
.col-xl-12,
.col-xl,
.col-xl-auto {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  z-index: 1 !important;
}
</style>