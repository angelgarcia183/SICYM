Meteor.publish("alumnos",function(params){
    return Alumnos.find();
});

Meteor.publish("buscarAlumnos",function(options) {
    if(options != undefined) {
            let selector = {
                "NombreCompleto" : { '$regex': '.*' + options.where.nombreCompleto
            || '' + '.*', '$options': 'i' }
            }
            return Alumnos.find(selector, options.options)   
    }
});