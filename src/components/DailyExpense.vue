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
      <!-- Expense type input -->
      <div class="form-group row">
        <label
          for="expense-type"
          class="col-sm-4 col-form-label col-form-label-lg"
          >Expense Type <span class="text-danger">*</span></label
        >
        <div class="col-sm-6">
          <input
            v-model="expenseType"
            id="expense-type"
            type="text"
            list="types"
            name="expense-type"
            class="form-control form-control-lg"
            @keyup.enter="optionToBeAdded"
            @blur="optionToBeAdded"
          />
          <datalist id="types">
            <option v-for="(option, index) in options" :key="index">
              {{ option.type }}
            </option>
          </datalist>
        </div>
      </div>
      <!-- Expense amount input -->
      <div class="form-group row">
        <label
          for="expense-amount"
          class="col-sm-4 col-form-label col-form-label-lg"
          >Expense amount <span class="text-danger">*</span></label
        >
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
  </div>
</template>

<script>
export default {
  name: "DailyIncome",
  components: {},
  data() {
    return {
      errors: [],
      date: "",
      expenseType: null,
      expenseAmount: null,
      options: [{ type: "Type1" }, { type: "Type2" }, { type: "Type3" }],
    };
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
      if (this.expenseType && this.expenseAmount) {
        this.errors = [];
        console.log(this.itemToBeSaved);
        this.reset();
        return true;
      }

      this.errors = [];

      if (!this.expenseType) {
        this.errors.push("You must select an expense option");
      }
      if (!this.expenseAmount) {
        this.errors.push("You must provide expense amount");
      }
    },
  },
};
</script>

<style scoped>
.currency {
  font-size: 20px;
}
</style>