/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  //this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.preguntasBorradas = new Evento(this);

  this.verificarLocalStorage();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerIndice: function(id){
  
    for(var i = 0;i < this.preguntas.length; i++){
      if(this.preguntas[i].id === id){
        return i;
      }
    }
    return -1;
  },
  obtenerUltimoId: function() {
    var maxId = -1;
    for(var i = 0; i<this.preguntas.length; i++){
      if(this.preguntas[i].id > maxId)
        maxId + this.preguntas[i].id;
    }
    return maxId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id){
    var idPreg = this.obtenerIndice(id);
    if(idPreg != -1){
    this.preguntas.splice(idPreg,1);
    this.guardar();
    this.preguntaEliminada.notificar();
    }
  },

  editarPregunta: function(id,nuevoTexto){
    var idPregunta = this.obtenerPregunta();
      if(idPregunta !=-1){
        console.log(nuevoTexto);
        this.preguntas[idPregunta].textoPregunta = nuevoTexto;
        console.log(nuevoTexto);
        this.guardar();
        this.preguntaEditada.notificar();
      } 
  },
 
  borrarPreguntas: function(){
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },
 
  obtenerPregunta: function(valor){
    var identificador;
    if(typeof valor == 'number'){
      identificador = 'id';
    }
      else{
        identificador = 'textoPregunta';
      }
    for(var i = 0; i<this.preguntas.length; i++){
      return this.preguntas[i];
    }
  },

  agregarVotos: function(id,respuestas){
    var idObtener = this.obtenerIndice(id);
    for(var i = 0; i<this.preguntas[idObtener].cantidadPorRespuesta.length; i++){
      if(this.preguntas[idObtener].cantidadPorRespuesta[i].textoRespuesta === respuestas){
        this.preguntas[idObtener].cantidadPorRespuesta[i].cantidad++
      }
    }  
    this.guardar();
    this.votoAgregado.notificar();
  },

  //se guardan las preguntas
  verificarLocalStorage: function(){
    if(localStorage.getItem('preguntas') !== null){
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  },

  reiniciarLocalStorage: function(){
    localStorage.setItem('preguntas', JSON.stringify([]));
  },
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },
};
