<template>
  <div class="add-bill">
    <el-form
      ref="addBillForm"
      :rules="addBillFormRules"
      :inline="true"
      :model="addBillForm"
      label-width="80px">
      <el-form-item
        label="账单类型"
        class="type-form-item"
        prop="type">
        <el-radio-group
          @change="handleSetCategoryOptions"
          v-model="addBillForm.type">
          <el-radio label="收入"></el-radio>
          <el-radio label="支出"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="账单分类">
        <el-select
          class="bill-category-select"
          v-model="addBillForm.category"
          :placeholder="categorySelectPlaceholder">
          <el-option
            v-for="category in categoryOptions"
            :key="category.id"
            :label="category.name"
            :value="category.id">
          </el-option>
        </el-select>
        <i
          class="el-icon-plus create-category"
          title="新建分类"
          @click="showCreateCategoryDialog"
        ></i>
      </el-form-item>
      <el-form-item label="账单金额" prop="amount">
        <el-input
          class="amount-input"
          v-model.number="addBillForm.amount"
          placeholder="请输入账单金额">
        </el-input>
      </el-form-item>
      <el-form-item class="operating-form-item">
        <el-button
          type="primary"
          :disabled="createBillBtnDisabled"
          @click="handleCreateBill">
          保存
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="新建账单分类"
      width="400px"
      :visible.sync="createCategoryDialogVisible"
      :before-close="handleResetAndClose">
      <el-form
        class="create-category-form"
        ref="createCategoryForm"
        :rules="createCategoryFormRules"
        :model="createCategoryForm"
        label-width="80px">
        <el-form-item
          label="账单类型"
          class="category-type-form-item"
          prop="type">
          <el-radio-group v-model="createCategoryForm.type">
            <el-radio label="收入"></el-radio>
            <el-radio label="支出"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="账单分类" prop="name">
          <el-input
            class="create-category-input"
            v-model.trim="createCategoryForm.name"
            placeholder="请输入账单分类名称">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleResetAndClose">取 消</el-button>
        <el-button
          type="primary"
          :disabled="createCategoryBtnDisabled"
          @click="handleCreateCategory">
          新 建
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddBill',
  data() {
    return {
      addBillFormRules: {
        type: [{ required: true, message: '请选择账单分类', trigger: 'change' }],
        amount: [{ required: true, message: '请输入账单金额', trigger: 'blur' }],
      },
      createCategoryFormRules: {
        type: [{ required: true, message: '请选择分类的账单分类', trigger: 'change' }],
        name: [{ required: true, message: '请输入分类名', trigger: 'blur' }],
      },
      categoryList: [],
      categoryOptions: [],
      addBillForm: {
        type: '',
        category: '',
        amount: null,
      },
      createCategoryForm: {
        type: '',
        name: '',
      },
      createBillBtnDisabled: false,
      createCategoryDialogVisible: false,
      createCategoryBtnDisabled: false,
    };
  },
  computed: {
    categorySelectPlaceholder() {
      return this.addBillForm.type === '' ? '请先选择账单类型' : '请选择账单分类';
    },
  },
  watch: {
    categoryList() {
      this.handleSetCategoryOptions();
    },
  },
  methods: {
    // 获取分类信息
    async queryCategoryList() {
      const { data } = await this.$api.category.queryCategoryList();
      const categoryList = [];
      (data.categoryList || []).forEach((category) => {
        const { id, name, type } = category;
        categoryList.push({ id, name, type });
      });
      this.categoryList = categoryList;
    },
    // 账单类型变化/更新分类列表时，重新设置分类项
    handleSetCategoryOptions() {
      // 重置分类已选项
      this.addBillForm.category = '';
      /* eslint arrow-body-style: "off" */
      this.categoryOptions = this.categoryList.filter((category) => {
        const type = category.type === 0 ? '支出' : '收入';
        return type === this.addBillForm.type;
      });
    },
    // 显示新建分类弹窗
    showCreateCategoryDialog() {
      this.createCategoryDialogVisible = true;
    },
    // 重置并关闭新建分类弹窗
    handleResetAndClose() {
      this.resetForm('createCategoryForm');
      this.createCategoryDialogVisible = false;
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 新建分类
    async handleCreateCategory() {
      this.createCategoryBtnDisabled = true;
      this.$refs.createCategoryForm.validate(async (valid) => {
        if (valid) {
          const { type, name } = this.createCategoryForm;
          const { data } = await this.$api.category.createCategory({
            type: type === '收入' ? 1 : 0,
            categoryName: name,
          });
          if (data.code === 0) { // 新建成功
            this.$message({
              type: 'success',
              message: data.message,
            });
            // 更新分类列表
            this.queryCategoryList();
          }
          this.handleResetAndClose();
        }
        this.createCategoryBtnDisabled = false;
      });
    },
    // 新建账单
    async handleCreateBill() {
      this.createBillBtnDisabled = true;
      this.$refs.addBillForm.validate(async (valid) => {
        if (valid) {
          const { type, amount, category } = this.addBillForm;
          const { data } = await this.$api.bill.createBill({
            type: type === '收入' ? 1 : 0,
            amount: type === '支出' ? (Math.abs(amount)) : amount,
            categoryId: category,
          });
          if (data.code === 0) { // 新建成功
            this.$message({
              type: 'success',
              message: data.message,
            });
            // 通知创建账单成功，更新数据
            this.$store.commit('createBill');
          }
          this.resetForm('addBillForm');
          this.addBillForm.category = '';
        }
        this.createBillBtnDisabled = false;
      });
    },
  },
  created() {
    this.queryCategoryList();
  },
};
</script>

<style scoped lang="scss">
@import "style/variable.scss";

.bill-category-select {
  width: $form-item-width;
}
.amount-input {
  width: $form-item-width;
}
.create-category {
  width: 30px;
  line-height: 40px;
  margin-left: 2px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  &-form {
    .el-form-item {
      margin-bottom: 0;
    }
    .category-type-form-item {
      margin-bottom: 22px;
    }
  }
  &-input {
    width: 250px;
  }
}
</style>
