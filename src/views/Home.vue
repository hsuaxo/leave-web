<template>
  <div class="container">
    <div class="d-flex align-items-center">
      <h3>Permisos</h3>
      <button
        class="btn btn-primary ml-auto font-weight-500"
        @click="createLeave"
      >
        NUEVO PERMISO
        <i class="fa-solid fa-circle-plus fa-fw" title="EDITAR"></i>
      </button>
    </div>
    <table class="table table-bordered table-striped table-hover mt-2">
      <thead>
        <tr>
          <th class="text-center">ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Tipo</th>
          <th>Fecha</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in leaves" :key="item.id">
          <td class="text-center">{{ item.id }}</td>
          <td>{{ item.employeeFirstName }}</td>
          <td>{{ item.employeeLastName }}</td>
          <td>{{ item.type.description }}</td>
          <td>{{ item.date | moment("MMM DD, YYYY") }}</td>
          <td class="text-center">
            <i
              class="fa-solid fa-pencil text-primary pointer mr-3"
              title="EDITAR"
              @click="editLeave(item.id)"
            ></i>
            <i
              class="fa-solid fa-trash text-danger pointer"
              title="BORRAR"
              @click="deleteLeave(item.id)"
            ></i>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: mapState(["leaves"]),
})
export default class Home extends Vue {
  async getLeaves(): Promise<void> {
    this.$store.commit("SET_LOADING", true);
    try {
      await this.$store.dispatch("getLeaves");
    } catch (error) {
      console.log(error);
    } finally {
      this.$store.commit("SET_LOADING", false);
    }
  }
  createLeave(): void {
    this.$router.push({ name: "NewLeave" });
  }
  editLeave(id: string): void {
    this.$router.push({ path: `edit/${id}` });
  }
  deleteLeave(id: string): void {
    this.$bvModal
      .msgBoxConfirm("Está seguro(a)?", {
        title: "Borrar Permiso",
        okTitle: "SI",
        cancelTitle: "NO",
        centered: true,
      })
      .then(async (value) => {
        if (value) {
          this.$store.commit("SET_LOADING", true);
          try {
            await this.$store.dispatch("deleteLeave", id);
          } catch (error) {
            console.log(error);
          } finally {
            this.$store.commit("SET_LOADING", false);
          }
        }
      });
  }
  created(): void {
    this.getLeaves();
  }
}
</script>
