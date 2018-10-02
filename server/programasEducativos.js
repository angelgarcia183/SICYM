Meteor.publish("programasEducativos",function(params){
    return ProgramasEducativos.find(params);
});