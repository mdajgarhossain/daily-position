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
          <input
            v-model="incomeType"
            id="income-type"
            type="text"
            list="types"
            name="income-type"
            class="form-control form-control-lg"
            @keyup.enter="optionToBeAdded"
            @blur="optionToBeAdded"
          />
          <datalist id="types">
            <option v-for="item in options" :key="item.id">
              {{ item.title }}
            </option>
            <!-- modal -->
            <!-- <option
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              Add new
            </option>
            <div
              class="modal fade"
              id="staticBackdrop"
              data-backdrop="static"
              data-keyboard="false"
              tabindex="-1"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">...</div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Understood
                    </button>
                  </div>
                </div>
              </div>
            </div> -->
          </datalist>
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
    <!-- Modal outside of the datalist tag works just fine-->
    <option
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#staticBackdrop"
    >
      Add new
    </option>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
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
      incomeType: null,
      incomeAmount: null,
      options: [
        { id: 1, title: "Type1" },
        { id: 2, title: "Type2" },
        { id: 3, title: "Type3" },
      ],
      // isModalVisible: false,
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
  },
};
</script>

<style scoped>
.currency {
  font-size: 20px;
}
</style>