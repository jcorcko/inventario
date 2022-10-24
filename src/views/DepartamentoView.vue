<template>
  
  <div class="container-fluid">
   
    <h2>{{titulo}}</h2>
    <hr>
    <form @submit.prevent="accion()">
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label" style="font-weight: bold;">Departamento</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" v-model="obDepartamento.nombre" placeholder="NUEVO DEPARTAMENTO">
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label" style="font-weight: bold;">Encargado</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" v-model="obDepartamento.encargado" placeholder="NUEVO ENCARGADO">
        </div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label" style="font-weight: bold;">FUNCIONARIOS</label>
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
     name: 'AreaView',
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
          this.codigo = 'nuevo';
          this.titulo = 'Nuevo Departamento' ;
          this.etiquetaGuardar = 'Guardar' ;
            this.generarCodigo();
     },
     methods: {
          accion (){
                  axios({
                          method: "post",
                          url: `${process.env.VUE_APP_RUTA_API}/departamento`,
                          data: this.obDepartamento
                      })
                      .then(response => {
                          console.log(response);
                          this.$router.push({ name: 'areas' });
                      })
                      .catch(e => console.log(e));
               
          },
       generarCodigo(){
             //area?_sort=id&_order=desc&_limit=1
            
          axios({
                method: "get",
                url: process.env.VUE_APP_RUTA_API+"/area?_sort=id&_order=desc&_limit=1"
            })
            .then(response => {
                let dato = response.data;               
                let uuid =dato ? dato[0].id + 1  : 1;

                this.obDepartamento.id = uuid;
                console.log(uuid);
            })
            .catch(e => console.log(e));
        }
     }
}
</script>

<style>

</style>