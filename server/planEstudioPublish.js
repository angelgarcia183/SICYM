Meteor.publish("planesEstudio",function(params){
    return PlanesEstudio.find(params);
});