<template>
  <div class="container ml-3">
    <form @submit.prevent="submit">
      <h2 class="text-center font-weight-light py-3">Cash Position</h2>
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
        <label for="date" class="col-sm-3 col-form-label col-form-label-lg"
          >Date</label
        >
        <div class="col-sm-7">
          <input
            v-model="date"
            id="date"
            type="date"
            name="date"
            class="form-control form-control-lg"
          />
        </div>
      </div>
      <!-- Sattlement input -->
      <div class="form-group row">
        <label
          for="settlement"
          class="col-sm-3 col-form-label col-form-label-lg"
          >Settlement <span class="text-danger">*</span></label
        >
        <div class="col-sm-7">
          <input
            v-model="settlement"
            id="settlement"
            type="number"
            min="1"
            name="settlement"
            class="form-control form-control-lg"
          />
        </div>
        <div class="col-sm-2 text-left d-flex align-items-center currency">
          BDT
        </div>
      </div>
      <!-- Cash in volt input -->
      <div class="form-group row">
        <label
          for="cash-in-volt"
          class="col-sm-3 col-form-label col-form-label-lg"
          >Cash in volt <span class="text-danger">*</span></label
        >
        <div class="col-sm-7">
          <input
            v-model="cashInVolt"
            id="cash-in-volt"
            type="number"
            min="1"
            name="cash-in-volt"
            class="form-control form-control-lg"
          />
        </div>
        <div class="col-sm-2 text-left d-flex align-items-center currency">
          BDT
        </div>
      </div>
      <!-- Cash in hand input -->
      <div class="form-group row">
        <label
          for="cash-in-hand"
          class="col-sm-3 col-form-label col-form-label-lg"
          >Cash in hand <span class="text-danger">*</span></label
        >
        <div class="col-sm-7">
          <input
            v-model="cashInHand"
            id="cash-in-hand"
            type="number"
            min="1"
            name="cash-in-hand"
            class="form-control form-control-lg"
          />
        </div>
        <div class="col-sm-2 text-left d-flex align-items-center currency">
          BDT
        </div>
      </div>
      <!-- Withdrawal from bank -->
      <div class="form-group row">
        <label
          for="bank-withdrawal"
          class="col-sm-3 col-form-label col-form-label-lg"
          >Withdrawal from the bank <span class="text-danger">*</span></label
        >
        <div class="col-sm-7">
          <input
            v-model="bankWithdrawal"
            id="bank-withdrawal"
            type="number"
            min="1"
            name="bank-withdrawal"
            class="form-control form-control-lg"
          />
        </div>
        <div class="col-sm-2 text-left d-flex align-items-center currency">
          BDT
        </div>
      </div>
      <!-- Deposit into the bank -->
      <div class="form-group row">
        <label
          for="bank-deposit"
          class="col-sm-3 col-form-label col-form-label-lg"
          >Deposit into the bank <span class="text-danger">*</span></label
        >
        <div class="col-sm-7">
          <input
            v-model="bankDeposit"
            id="bank-deposit"
            type="number"
            min="1"
            name="bank-deposit"
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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "CashPosition",
  components: {},
  data() {
    return {
      errors: [],
      date: "",
      settlement: null,
      cashInVolt: null,
      cashInHand: null,
      bankWithdrawal: null,
      bankDeposit: null,
    };
  },
  computed: {
    itemtobeSave() {
      return {
        date: this.date,
        settlement: this.settlement,
        cashInVolt: this.cashInVolt,
        cashInHand: this.cashInHand,
        bankWithdrawal: this.bankWithdrawal,
        bankDeposit: this.bankDeposit,
      };
    },
  },
  methods: {
    reset() {
      this.date = "";
      this.settlement = null;
      this.cashInVolt = null;
      this.cashInHand = null;
      this.bankWithdrawal = null;
      this.bankDeposit = null;
    },
    submit() {
      if (
        this.settlement &&
        this.cashInVolt &&
        this.cashInHand &&
        this.bankWithdrawal &&
        this.bankDeposit
      ) {
        this.errors = [];
        console.log(this.itemtobeSave);
        this.reset();
        return true;
      }

      this.errors = [];

      if (!this.settlement) {
        this.errors.push("You must provide Settlement amount");
      }
      if (!this.cashInVolt) {
        this.errors.push("You must provide Cash in volt amount");
      }
      if (!this.cashInHand) {
        this.errors.push("You must provide Cash in hand amount");
      }
      if (!this.bankWithdrawal) {
        this.errors.push("You must provide Bank withdrawal amount");
      }
      if (!this.bankDeposit) {
        this.errors.push("You must provide Bank deposit amount");
      }
    },
  },
};
</script>
<style scoped>
.currency {
  font-size: 20px;
}
.checkbox {
  width: 30px;
  margin-left: 1px;
}
</style>
