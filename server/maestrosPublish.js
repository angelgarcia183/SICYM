Meteor.publish("maestros",function(params){
    return Maestros.find();
});

Meteor.publish("buscarMaestros",function(options) {
    if(options != undefined) {
            let selector = {
                "NombreCompleto" : { '$regex': '.*' + options.where.nombreCompleto
            || '' + '.*', '$options': 'i' }
            }
            return Maestros.find(selector, options.options)   
    }
});