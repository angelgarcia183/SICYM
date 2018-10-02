angular
.module("planeacion")
.controller("MateriasCtrl", MateriasCtrl);
 function MateriasCtrl($scope, $meteor, $reactive, $state, toastr){
 	
 	$reactive(this).attach($scope);
  this.action = true;
  this.nuevo = true;	 
  this.asignatura = {}; 
  
	this.subscribe('materias',()=>{
		return [{
			
		}]
	 });
	 
	this.helpers({
	  materias : () => {
		  return Materias.find();
	  }
  }); 
  
  this.Nuevo = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.asignatura = {};		
  };

  this.guardar = function(asignatura,form)
	{
			if(form.$invalid){
		        toastr.error('Error al guardar los datos.');
		        return;
		  }
			console.log(asignatura);
			asignatura.estatus = true;
			asignatura.usuarioInserto = Meteor.userId();
			Materias.insert(asignatura);
			toastr.success('Guardado correctamente.');
			this.asignatura = {}; 
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
	    form.$setUntouched();
		
	};

	this.editar = function(id)
	{
	    this.asignatura = Materias.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
	};
	
	this.actualizar = function(asignatura,form)
	{
			if(form.$invalid){
		        toastr.error('Error al actualizar los datos.');
		        return;
		  }
			var idTemp = asignatura._id;
			delete asignatura._id;		
			asignatura.usuarioActualizo = Meteor.userId(); 
			Materias.update({_id:idTemp},{$set : asignatura});
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
			form.$setPristine();
      form.$setUntouched();
	};

	this.cambiarEstatus = function(id)
	{
			var asignatura = Materias.findOne({_id:id});
			if(asignatura.estatus == true)
				asignatura.estatus = false;
			else
				asignatura.estatus = true;
			
			Materias.update({_id: id},{$set :  {estatus : asignatura.estatus}});
	};	
	
	$(document).ready(function(){
    $('#periodo').change(
        function () {
            var periodo = $('option:selected', this).text();
            if (periodo == "Trimestral") {
                $('#numero').text("Número de Trimestre *");
            } else if (periodo == "Semestral") {
                $('#numero').html("Número de Semestre *");
            }
        });
 }); 
};