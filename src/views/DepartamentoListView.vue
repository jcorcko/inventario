<template>
    <h5>Busqueda :</h5>
    <form class="row g-3">
      <div class="col-md-3">
        <label for="validationCustom04" class="form-label">Criterio</label>
        <select class="form-select" id="validationCustom04" v-model="criterio">
          <option selected disabled value="">Seleccione ..</option>
          <option value="id">Id</option>
          <option value="NombreDepartamento">Departamento</option>
          <option value="NombreEncargado">Encargado</option>
        </select>
      </div>
      <div class="col-md-4">
        <label for="validationCustom03" class="form-label">Valor</label>
        <input type="text" class="form-control" id="validationCustom03" v-model="valor">
        <div class="invalid-feedback">
          Ingrese un valor válido.
        </div>
      </div>
      
      <div class="col-12">
        <button class="btn btn-primary"  @click.prevent="buscar()">Buscar</button>
      </div>
    </form>
    <br/>
    <hr/>
  <h5>Lista de departamentos</h5>
  <div class="container-sm">
      <table class="table">
        <thead class="table-dark">
            <tr>
                <th>Codigo</th>
                <th>Departamento</th>
                <th>Encargado</th>
                <th>Nro Funcionario</th>
                <th>Acciones</th>                
            </tr>
        </thead>
        <tbody>
            <tr v-for="(departamento,index) in ListaDepartamento" :key="index">
                <td>{{departamento.id}}</td>
                <td>{{departamento.nombre}}</td>
                <td>{{departamento.encargado}}</td>
                <td>{{departamento.funcionarios}}</td>
                <td>
                    <button class="btn btn-primary m-2" @click="Accion('editar',departamento.id)">Editar</button>
                    <button class="btn btn-danger m-2" @click="Accion('eliminar',departamento.id)">Eliminar</button>
                </td>
            </tr>
        </tbody>
       </table>

  </div>
</template>

<script>
export default {
    name: 'DepartamentoListView',
    data(){
             return {
                ListaDepartamento : [],
                ListaDepartamentoTemp : [],
                criterio : null,
                valor : null
             }
    },
    mounted() {
            this.getListDepartamento();
    },
    methods: {
        buscar(){
                if(this.criterio === 'id'){
                    this.ListaDepartamento = this.ListaDepartamentoTemp.filter(item => item.id.toString().toLowerCase().indexOf(this.valor) > -1)      
                }
                if(this.criterio === 'NombreDepartamento'){
                    this.ListaDepartamento = this.ListaDepartamentoTemp.filter(item => item.NombreDepartamento.toLowerCase().indexOf(this.valor) > -1)      
                }
                if(this.criterio === 'NombreEncargado'){
                    this.ListaDepartamento = this.ListaDepartamentoTemp.filter(item => item.NombreEncargado.toLowerCase().indexOf(this.valor) > -1)      
                }
        },
        getListDepartamento () {
                axios({
                    method: "get",
                    url: process.env.VUE_APP_RUTA_API+"/departamento"
                })
                    .then(response => {
                        this.ListaDepartamento = response.data;
                        this.ListaDepartamentoTemp = response.data;
                        console.log(response);
                    })
                    .catch(e => console.log(e));
        },
        Accion (opcion, id)  {
            if (opcion === 'editar') {
                this.$router.push({ name: 'departamentosModificar', params: { id } });
            } else {
                if (confirm("¿Eliminar registro?")) {
                    axios({
                        method: "delete",
                        url: process.env.VUE_APP_RUTA_API+"/departamento/" + id
                    })
                        .then(response => {
                            this.getListDepartamento();
                            console.log(response);
                        })
                        .catch(e => console.log(e));
                }
            }
        }
    }
}
</script>

<style>

</style>