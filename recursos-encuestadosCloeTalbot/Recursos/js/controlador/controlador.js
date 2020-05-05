/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id) {
      this.modelo.borrarPregunta(id);
  },

  borrarPreguntas: function() {
      this.modelo.borrarPreguntas();
  },

  editarPregunta: function(id,nuevoTexto) {
      this.modelo.editarPregunta(id,nuevoTexto);
  },

  agregarVotos: function(id,respuestaSeleccionada) {
      this.modelo.agregarVotos(id,respuestaSeleccionada);
  },

};