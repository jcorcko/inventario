<template>
  
    <div class="container-fluid">
      <h2>{{titulo}}</h2>
      <hr>
      <form @submit.prevent="accion()">
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label" style="font-weight: bold;">Id</label>
          <div class="col-sm-10">
            <input type="text" disabled class="form-control" v-model="obDepartamento.id" placeholder="ID">
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-2 col-form-label" style="font-weight: bold;">Departamento</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="obDepartamento.nombre" placeholder="NUEVO DEPARTAMENTO">
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-2 col-form-label" style="font-weight: bold;">Encargado</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="obDepartamento.encargado" placeholder="NUEVO ENCARGADO">
          </div>
        </div>
        <div class="row mb-3">
          <label for="inputPassword3" class="col-sm-2 col-form-label" style="font-weight: bold;">Funcionarios</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" v-model="obDepartamento.funcionarios" placeholder="CANTIDAD FUNCIONARIO">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">{{etiquetaGuardar}}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
       name: 'DepartamentoEdicionView',
       data(){
           return {
               codigo : null,
               titulo : '',
               etiquetaGuardar : '',
               obDepartamento : {
                          id : null,
                          nombre: null,
                          encargado: null,
                          funcionarios : null
                        }
           }
       },
       created(){
            this.codigo = this.$route.params.id ;
            this.titulo = 'Editar departamento';
            this.etiquetaGuardar = 'Modificar';
               this.getDepartamento();
       },
       methods: {
            accion (){
                 
                    axios({
                            method: "patch",
                            url: `${process.env.VUE_APP_RUTA_API}/departamento/${this.obDepartamento.id}`,
                            data: this.obDepartamento
                        })
                        .then(response => {
                            console.log(response);
                            this.$router.push({ name: 'departamentos' });
                        })
                        .catch(e => console.log(e));
                  
            },
            getArea(){
              axios({
                  method: "get",
                  url: process.env.VUE_APP_RUTA_API+"/departamento/"+this.codigo
              })
              .then(response => {
                  this.obDepartamento = response.data;
              console.log(response);
              })
              .catch(e => console.log(e));
          },
       }
  }
  </script>
  
  <style>
  
  </style>