<template>
  <div class="container ml-3">
    <form @submit.prevent="submit">
      <h2 class="text-center font-weight-light py-3">Daily Income</h2>
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
          >Date</label
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
      <!-- Income type input -->
      <div class="form-group row">
        <label
          for="income-type"
          class="col-sm-4 col-form-label col-form-label-lg"
          >Income Type <span class="text-danger">*</span></label
        >
        <div class="col-sm-6">
          <select
            v-model="incomeType"
            id="income-type"
            type="text"
            name="income-type"
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
      <!-- Income amount input -->
      <div class="form-group row">
        <label
          for="income-amount"
          class="col-sm-4 col-form-label col-form-label-lg"
          >Income amount <span class="text-danger">*</span></label
        >
        <div class="col-sm-6">
          <input
            v-model="incomeAmount"
            id="income-amount"
            type="number"
            min="1"
            name="income-amount"
            class="form-control form-control-lg"
          />
        </div>
        <div class="col-sm-2 text-left d-flex align-items-center currency">
          BDT
        </div>
      </div>
      <!-- Submit -->
      <div class="form-group row">
        <div class="col-sm-12 text-center">
          <button
            type="submit"
            value="Submit"
            class="btn btn-secondary btn-lg col-2"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    <!-- modal -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Add Income Type"
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
      incomeType: null,
      incomeAmount: null,
      options: [
        { id: 1, title: "Type1" },
        { id: 2, title: "Type2" },
        { id: 3, title: "Type3" },
      ],
    };
  },
  computed: {
    itemToBeSaved() {
      return {
        date: this.date,
        incomeType: this.incomeType,
        incomeAmount: this.incomeAmount,
        // options: this.options.push({ title: this.incomeType }),
      };
    },
  },
  watch: {
    incomeType: {
      handler(value) {
        if (value === "addInputType") {
          this.incomeType = "";
        }
      },
      deep: true,
    },
    // name: {
    //   deep: true,
    //   handler(value) {
    //     this.incomeType = value;
    //   },
    // },
  },
  methods: {
    reset() {
      this.date = "";
      this.incomeType = null;
      this.incomeAmount = null;
    },
    optionToBeAdded() {
      this.options.push({ id: new Date().valueOf(), title: this.incomeType });
    },
    submit() {
      if (this.incomeType && this.incomeAmount) {
        this.errors = [];
        console.log(this.itemToBeSaved);
        this.reset();
        return true;
      }

      this.errors = [];

      if (!this.incomeType) {
        this.errors.push("You must select an income option");
      }
      if (!this.incomeAmount) {
        this.errors.push("You must provide income amount");
      }
    },
    //modal functionality
    showModal() {
      this.$refs["modal"].show();
    },
    handleChange() {
      if (this.incomeType == "addInputType") {
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
      this.incomeType = obj.id;
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