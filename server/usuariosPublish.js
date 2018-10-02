Meteor.publish("usuarios",function(params){
    return Meteor.users.find(params);
});

Meteor.publish('usuariosCatalogo', () => {
  return Roles.getUsersInRole('Maestro');
});

Meteor.publish('listaUsuarios', () => {
  return Meteor.users.find({"roles" : "Maestro"});
})

Meteor.publish('listaCoordinadores', () => {
  return Meteor.users.find({"roles" : "Coordinador"});
})

Meteor.publish('listaAdministradores', () => {
  return Meteor.users.find({"roles" : "Administrador"});
})

Meteor.publish('listaAdministradoresPorUnidad', (params) => {
  return Meteor.users.find(params)
})


Meteor.publish('listaMaestrosPorUnidad', (params) => {
    return Meteor.users.find(params);
})


Meteor.publish("buscarUsuarios",function(options) {
  if(options != undefined) {
          let selector =  {
               "username" : { '$regex': '.*' + options.where.username
          || '' + '.*', '$options': 'i' }
          }
          return Meteor.users.find(selector, options.options)   
  }
});

Meteor.publish('listaCoordinadoresPorUnidad', (params) => {
  return Meteor.users.find(params);
});
