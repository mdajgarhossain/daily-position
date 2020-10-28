<template>
  <div class="form-group row">
    <label for="custom-input" class="col-sm-3 col-form-label col-form-label-lg"
      ><input
        type="text"
        placeholder="Add new label"
        v-model="item.label"
        autofocus
    /></label>
    <div class="col-sm-7">
      <input
        v-model="item.input"
        id="custom-input"
        type="number"
        min="1"
        name="custom-input"
        class="form-control form-control-lg"
      />
    </div>
    <div class="col-sm-1 text-left d-flex align-items-center currency">BDT</div>
    <div class="col-sm-1 d-flex align-items-center">
      <span class="btn btn-sm" @click="isVisible = false">
        <b-icon icon="x-circle" scale="2" variant="danger"></b-icon>
      </span>
    </div>
    <!-- <span v-if="alert && (!newLabel || !newInput)" class="text-danger ml-3"
          >Please fill the blank field</span
        > -->
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  //   methods: {
  //     add() {
  //       if (this.item && this.item.input && this.item.label) {
  //         this.$emit("add", this.item);
  //       }
  //     },
  //   },
};
</script>

<style>
</style>