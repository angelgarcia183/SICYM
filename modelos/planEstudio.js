PlanesEstudio = new Mongo.Collection("planesdeEstudio");
PlanesEstudio.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});