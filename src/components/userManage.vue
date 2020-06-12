<template>
  <div>
    <el-row>
      <el-input v-model="input" placeholder="请输入内容" style="width:300px"></el-input>
      <el-button icon="el-icon-search" circle @click="loadData"></el-button>
      <el-button  @click="addDialog">新增</el-button>
    </el-row>
    <div class="line"></div>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="pwd" label="地址"></el-table-column>
      <el-table-column  label="操作">
        <template slot-scope="scope">
          <el-button  @click="editDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog title="用户" :visible.sync="dialogFormVisible" width="36%">
        <el-form :model="formObj" style="width:500px">
          <el-form-item label="ID" hidden>
            <el-input v-model="formObj.id" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="formObj.name" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-select v-model="formObj.pwd" placeholder="请选择活动区域" style="width:300px">
              <el-option label="洛水" value="洛水"></el-option>
              <el-option label="稷下" value="稷下"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'

export default {
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    },
    loadData () {
      let _this = this
      request({
        url: '/user/queryList',
        method: 'post'
      }).then(function (response) {
        console.log(response)
        const result = response.data
        console.log(result)
        _this.tableData = result
      }).catch(function (response) {
        console.log(response)
        alert('请求失败')
      })
    },
    onSubmit () {
      let id = this.formObj.id
      console.log('id=' + id)
      // 发ajax请求
      let url = 'http://localhost:8080/user/add'
      if (id) {
        url = 'http://localhost:8080/user/update'
      }
      let _this = this
      let formData = JSON.stringify(this.formObj)
      this.$ajax
        .post(url, formData, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
        .then(function (response) {
          _this.dialogFormVisible = false
          _this.$message({
            message: '添加成功',
            type: 'success'
          })
          _this.loadData()
        })
        .catch(function (response) {
          _this.$message({
            message: '添加失败',
            type: 'warning'
          })
        })
    },
    addDialog () {
      this.formObj.id = ''
      this.formObj.name = ''
      this.formObj.pwd = ''
      this.operateType = '0'
      this.dialogFormVisible = true
    },
    editDialog (row) {
      let _this = this
      request({
        url: '/user/detail/' + row.id,
        method: 'get'
      }).then(function (response) {
        const result = response.data
        console.log(result)
        _this.formObj.id = result.id
        _this.formObj.name = result.name
        _this.formObj.pwd = result.pwd
        _this.dialogFormVisible = true
        _this.operateType = '1'
      }).catch(function (response) {
        _this.$message({
          message: '查询失败',
          type: 'warning'
        })
      })
    }
  },
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      formObj: {
        id: '',
        name: '',
        pwd: ''
      },
      formLabelWidth: '120px',
      operateType: '',
      input: '',
      params: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  mounted () {
    this.loadData()
  },
  created () {

  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
