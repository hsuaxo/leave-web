<template>
  <div class="container">
    <h3>Editar Permiso</h3>
    <form class="border-top border-bottom mt-2 mb-3 pt-2 pb-1">
      <div class="form-row">
        <div class="form-group col-4">
          <label for="firstName">Nombres</label>
          <input
            type="text"
            :class="[
              'form-control',
              $v.leave.employeeFirstName.$error ? 'border-danger' : '',
            ]"
            id="firstName"
            v-model.trim="$v.leave.employeeFirstName.$model"
          />
        </div>
        <div class="form-group col-4">
          <label for="lastName">Apellidos</label>
          <input
            type="text"
            :class="[
              'form-control',
              $v.leave.employeeLastName.$error ? 'border-danger' : '',
            ]"
            id="lastName"
            v-model.trim="$v.leave.employeeLastName.$model"
          />
        </div>
        <div class="form-group col-4">
          <label for="type">Tipo</label>
          <select
            id="type"
            :class="[
              'form-control',
              $v.leave.typeId.$error ? 'border-danger' : '',
            ]"
            v-model="$v.leave.typeId.$model"
          >
            <option value="">Seleccionar</option>
            <option v-for="item in leaveTypes" :key="item.id" :value="item.id">
              {{ item.description }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-4">
          <label for="date">Fecha</label>
          <b-form-datepicker
            :class="$v.leave.date.$error ? 'border-danger' : ''"
            :min="dateMin"
            v-model="$v.leave.date.$model"
          ></b-form-datepicker>
        </div>
      </div>
    </form>
    <div class="text-right">
      <button type="button" class="btn btn-primary mr-3" @click="save">
        <i class="fa-solid fa-save mr-2"></i>Guardar
      </button>
      <button type="button" class="btn btn-danger" @click="cancel">
        <i class="fa-solid fa-times mr-2"></i>Cancelar
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Leave } from "@/types";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { required, maxLength } from "vuelidate/lib/validators";

@Component({
  computed: mapState(["leaveTypes"]),
  validations: {
    leave: {
      employeeFirstName: {
        required,
        maxLength: maxLength(100),
      },
      employeeLastName: {
        required,
        maxLength: maxLength(100),
      },
      typeId: {
        required,
      },
      date: {
        required,
      },
    },
  },
})
export default class LeaveEditor extends Vue {
  @Prop() readonly id!: string;
  leave: Leave = {
    id: null,
    employeeFirstName: "",
    employeeLastName: "",
    typeId: "",
    date: null,
  };
  dateMin = new Date();
  async getLeave(): Promise<void> {
    this.$store.commit("SET_LOADING", true);
    try {
      this.leave = await this.$store.dispatch("getLeave", this.id);
    } catch (error) {
      console.log(error);
    } finally {
      this.$store.commit("SET_LOADING", false);
    }
  }
  async getLeaveTypes(): Promise<void> {
    this.$store.commit("SET_LOADING", true);
    try {
      await this.$store.dispatch("getLeaveTypes");
    } catch (error) {
      console.log(error);
    } finally {
      this.$store.commit("SET_LOADING", false);
    }
  }
  async save(): Promise<void> {
    if (this.$v.leave && this.$v.leave.$invalid) {
      this.$v.leave.$touch();
      return;
    }
    this.$store.commit("SET_LOADING", true);
    try {
      await this.$store.dispatch("saveLeave", this.leave);
      this.$bvModal
        .msgBoxOk("PERMISO GUARDADO", {
          title: "Permisos",
          centered: true,
        })
        .then(() => this.cancel());
    } catch (error) {
      console.log(error);
    } finally {
      this.$store.commit("SET_LOADING", false);
    }
  }
  cancel(): void {
    this.$router.push({ name: "Home" });
  }
  created(): void {
    if (this.id) this.getLeave();
    this.getLeaveTypes();
  }
}
</script>
