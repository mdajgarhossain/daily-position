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
          >Date <span class="text-danger">*</span></label
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
          >Settlement</label
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
      <!-- Cash in vault input -->
      <div class="form-group row">
        <label
          for="cash-in-vault"
          class="col-sm-3 col-form-label col-form-label-lg"
          >Cash in vault</label
        >
        <div class="col-sm-7">
          <input
            v-model="cashInVault"
            id="cash-in-vault"
            type="number"
            min="1"
            name="cash-in-vault"
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
          >Cash in hand</label
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
          >Withdrawal from the bank</label
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
          >Deposit into the bank
        </label>
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
      <!-- Show all custom fields -->
      <!-- <div v-if="customFields.length">
        <div
          v-for="(customField, index) in customFields"
          :key="index"
          class="form-group row"
        >
          <label
            for="custom-input"
            class="col-sm-3 col-form-label col-form-label-lg"
            >{{ customField.newLabel }}</label
          >

          <div class="col-sm-7">
            <input
              v-model="customField.newInput"
              id="custom-input"
              type="number"
              min="1"
              name="custom-input"
              class="form-control form-control-lg"
            />
          </div>
          <div class="col-sm-1 text-left d-flex align-items-center currency">
            BDT
          </div>
          <div class="col-sm-1 d-flex align-items-center">
            <span class="btn btn-sm" @click="removeField(customField)">
              <b-icon icon="x-circle" scale="2" variant="danger"></b-icon>
            </span>
          </div>
        </div>
      </div> -->
      <!-- Show custom label & input to add data-->
      <CustomInput v-for="(item, i) in customFields" :key="i" :item="item" />
      <span v-if="alert && (!newLabel || !newInput)" class="text-danger ml-3"
        >Please fill the blank field</span
      >
      <!-- Add custom input field button -->
      <p @click="addCustomField" class="btn btn-outline-success">
        + Add custom field
      </p>

      <!-- Submit -->
      <div class="form-group row">
        <div class="col-sm-3"></div>
        <div class="col-sm-7">
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
  </div>
</template>

<script>
// @ is an alias to /src
import CustomInput from "./CustomInput";

export default {
  name: "CashPosition",
  components: {
    CustomInput,
  },
  data() {
    return {
      errors: [],
      date: "2020-10-07",
      settlement: null,
      cashInVault: null,
      cashInHand: null,
      bankWithdrawal: null,
      bankDeposit: null,
      isVisible: false,
      newLabel: "",
      newInput: "",
      customFields: [],
      alert: false,
      allCashData: [],
    };
  },
  computed: {
    itemtobeSave() {
      return {
        date: this.date,
        settlement: this.settlement,
        cashInVault: this.cashInVault,
        cashInHand: this.cashInHand,
        bankWithdrawal: this.bankWithdrawal,
        bankDeposit: this.bankDeposit,
        customFields: this.customFields,
      };
    },
  },
  methods: {
    //custom input functionality
    addCustomField() {
      //this.itemtobeSave[item.label] = item.input;
      let len = this.customFields.length;
      if (!len) {
        this.customFields.push({
          label: "",
          lnput: "",
        });
      } else {
        console.log(this.customFields);

        if (
          this.customFields &&
          this.customFields[len - 1].label &&
          this.customFields[len - 1].input
        ) {
          this.customFields.push({
            label: "",
            lnput: "",
          });
        } else {
          return;
        }
      }

      return;
      if (this.newLabel && this.newInput) {
        this.customFields.push({
          label: this.newLabel,
          lnput: this.newInput,
        });
        this.alert = false;
        // (this.newLabel = ""), (this.newInput = "");
      } else {
        if (this.isVisible) this.alert = true;
      }
      this.isVisible = true;
    },
    removeField(customField) {
      this.customFields.splice(this.customFields.indexOf(customField), 1);
    },
    reset() {
      this.date = "";
      this.settlement = null;
      this.cashInVault = null;
      this.cashInHand = null;
      this.bankWithdrawal = null;
      this.bankDeposit = null;
    },
    submit() {
      if (this.date) {
        // this.errors = [];
        // if (this.newLabel && this.newInput) {
        //   this.itemtobeSave[this.newLabel] = this.newInput;
        //   // this.$set(this.itemtobeSave, this.newLabel, this.newInput);
        // }
        console.log(this.itemtobeSave);
        this.reset();
        return true;
      }

      this.errors = [];

      if (!this.date) {
        this.errors.push("Date is required");
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
