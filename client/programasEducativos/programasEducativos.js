angular
.module("planeacion")
.controller("ProgramasEducativosCtrl", ProgramasEducativosCtrl);
 function ProgramasEducativosCtrl($scope, $meteor, $reactive, $state, toastr){
 	
 	$reactive(this).attach($scope);
  this.action = true;
	this.nuevo = true;
	this.buscar={};	 
  this.programaEducativo = {}; 
	
	 this.subscribe('unidades',()=>{
		return [{estatus: true}]
	 });

	 this.subscribe('departamentos',()=>{
		return [{	unidad_id	: this.getReactively("programaEducativo.unidad_id"),
							estatus 	: true}]
	 });

	this.subscribe('programasEducativos',()=>{
		return [{}]
	 });
	 
	this.helpers({
		unidades: () => {
			return Unidades.find().fetch();
		},
		departamentos: () => {
		  return Departamentos.find();
		},
		programasEducativos : () => {
		  return ProgramasEducativos.find();
		},

});
  
  this.Nuevo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.programaEducativo = {};		
  };

  this.guardar = function(programaEducativo,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
			}
			
			console.log(programaEducativo);
			programaEducativo.estatus = true;
			programaEducativo.usuarioInserto = Meteor.userId();
			ProgramasEducativos.insert(programaEducativo);
			toastr.success('Guardado correctamente.');
			this.programaEducativo = {}; 
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
		
	};

	this.editar = function(id)
	{
	    this.programaEducativo = ProgramasEducativos.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(programaEducativo,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  }
			var idTemp = programaEducativo._id;
			delete programaEducativo._id;		
			programaEducativo.usuarioActualizo = Meteor.userId(); 
			ProgramasEducativos.update({_id:idTemp},{$set : programaEducativo});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};

	this.cambiarEstatus = function(id)
	{
			var programaEducativo = ProgramasEducativos.findOne({_id:id});
			if(programaEducativo.estatus == true)
				programaEducativo.estatus = false;
			else
				programaEducativo.estatus = true;
			
			ProgramasEducativos.update({_id: id},{$set :  {estatus : programaEducativo.estatus}});
	};	
	
	this.obtenerUnidades = function(unidadesID) {
		if(unidadesID !== undefined) {
			var unidad;
			var NombreUnidades = [];
			for(var i = 0, len = unidadesID.length; i < len; i++ ) {
				unidad = Unidades.findOne({_id : unidadesID[i]});
				if(unidad !== undefined) {
					NombreUnidades.push(unidad.nombreUnidad);
				}
			}

			return NombreUnidades.join(", ");
		
	}

	}
};