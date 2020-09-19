<template>
  <div>
    <b-card class="bg" style="margin-left:200px;margin-right:200px;margin-top:100px;">
      <div>
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/599/599305.svg"
          style="width:150px;height:150px;"
          alt
        />
      </div>
      <div align="left" style="margin-left:10px;">
        <h6>ชื่อผู้ใช้</h6>
      </div>
      <b-form-input v-model="text" placeholder="ชื่อผู้ใช้"></b-form-input>
      <div align="left" style="margin-left:10px;margin-top:10px">
        <h6>รหัสผ่าน</h6>
      </div>
      <b-form-input v-model="text" placeholder="รหัสผ่าน"></b-form-input>
      <div style="margin-top:20px">
  <b-button block variant="success">เข้าสู่ระบบ </b-button>
</div>
    </b-card>
  </div>
</template>

<script>
export default {};
</script>
<style>
.card.bg {
  background-color: #F2F3F4 ;
}
</style>
