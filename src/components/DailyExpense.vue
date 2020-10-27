<template>
  <div class="container ml-3">
    <form @submit.prevent="submit">
      <h2 class="text-center font-weight-light py-3">Daily Expense</h2>
      <!-- Errors -->
      <div v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index" class="text-danger">
            {{ error }}
          </li>
        </ul>
      </div>
      <!-- Date -->
      <div class="form-group row">
        <label for="date" class="col-sm-4 col-form-label col-form-label-lg"
          >Date <span class="text-danger">*</span></label
        >
        <div class="col-sm-6">
          <input
            v-model="date"
            id="date"
            type="date"
            name="date"
            class="form-control form-control-lg"
          />
        </div>
      </div>
      <!-- Expense type input -->
      <div class="form-group row">
        <label
          for="expense-type"
          class="col-sm-4 col-form-label col-form-label-lg"
          >Expense Type
        </label>
        <div class="col-sm-6">
          <select
            v-model="expenseType"
            id="expense-type"
            type="text"
            name="expense-type"
            class="form-control form-control-lg"
            @change="handleChange"
          >
            <option :value="item.id" v-for="item in options" :key="item.id">
              {{ item.title }}
            </option>
            <!-- modal button -->
            <option value="addInputType" class="modalButton btn btn-success">
              <b-button
                ref="modalButton"
                v-b-modal.modal-prevent-closing
                @click="showModal"
                >+ Add new</b-button
              >
            </option>
          </select>
        </div>
      </div>
      <!-- Expense amount input -->
      <div class="form-group row">
        <label
          for="expense-amount"
          class="col-sm-4 col-form-label col-form-label-lg"
          >Expense amount
        </label>
        <div class="col-sm-6">
          <input
            v-model="expenseAmount"
            id="expense-amount"
            type="number"
            min="1"
            name="expense-amount"
            class="form-control form-control-lg"
          />
        </div>
        <div class="col-sm-2 text-left d-flex align-items-center currency">
          BDT
        </div>
      </div>
      <!-- Submit -->
      <div class="form-group row">
        <div class="col-sm-4"></div>
        <div class="col-sm-6">
          <button
            type="submit"
            value="Submit"
            class="btn btn-secondary btn-lg col-2 col-sm-6"
          >
            Submit
          </button>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </form>
    <!-- modal -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add Expense Type"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="typeState"
          label="Type"
          label-for="custom-type"
          invalid-feedback="This field is required"
        >
          <b-form-input
            id="custom-type"
            v-model="customType"
            :state="typeState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "DailyIncome",
  components: {},
  data() {
    return {
      // modal data
      customType: "",
      typeState: null,
      //end modal data
      errors: [],
      date: "",
      expenseType: null,
      expenseAmount: null,
      options: [
        { id: 1, title: "Type1" },
        { id: 2, title: "Type2" },
        { id: 3, title: "Type3" },
      ],
    };
  },
  watch: {
    expenseType: {
      handler(value) {
        if (value === "addInputType") {
          this.expenseType = "";
        }
      },
      deep: true,
    },
  },
  computed: {
    itemToBeSaved() {
      return {
        date: this.date,
        expenseType: this.expenseType,
        expenseAmount: this.expenseAmount,
        // options: this.options.push({ title: this.incomeType }),
      };
    },
  },
  methods: {
    reset() {
      this.date = "";
      this.expenseType = null;
      this.expenseAmount = null;
    },
    optionToBeAdded() {
      this.options.push({ id: new Date().valueOf(), title: this.incomeType });
    },
    submit() {
      if (this.date) {
        this.errors = [];
        console.log(this.itemToBeSaved);
        this.reset();
        return true;
      }

      this.errors = [];

      if (!this.date) {
        this.errors.push("Date is required");
      }
    },
    //modal functionality
    showModal() {
      this.$refs["modal"].show();
    },
    handleChange() {
      if (this.expenseType == "addInputType") {
        console.log("object");
        this.showModal();
      }
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.typeState = valid;
      return valid;
    },
    resetModal() {
      this.customType = "";
      this.typeState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      let obj = { id: new Date().valueOf(), title: this.customType };
      // Push the name to submitted names
      this.options.push(obj);
      this.expenseType = obj.id;
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>

<style scoped>
.currency {
  font-size: 20px;
}
select option.modalButton {
  font-size: 20px;
}
</style>