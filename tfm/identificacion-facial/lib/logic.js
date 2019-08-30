/**
 * Facial recognition made by the model
 * @param {org.basic.identificacion.FacialRecognition} FacialRecognition - the FacialRecognition transaction
 * @transaction
 */
async function facialRecognition(facialRecognition) {  // eslint-disable-line no-unused-vars

    const NS = 'org.basic.identificacion';
    const registro = facialRecognition.registro;
    const contract = registro.contract;
    const factory = getFactory();

    console.log('Identificacion facial realizada ' + facialRecognition.etiqueta );

    if (registro.facialrecognitions) {
        registro.facialrecognitions.push(facialRecognition);
    } else {
        registro.facialrecognitions = [facialRecognition];
    }
  
  	registro.estado = 'PDTE';
    registro.count = registro.facialrecognitions.length;

/*    var hora_registro = facialRecognition.fecha.getHours();
  
    if (hora_registro > contract.horaEntrada ||
        temperatureReading.centigrade > contract.maxTemperature) {
        var temperatureEvent = factory.newEvent(NS, 'TemperatureThresholdEvent');
        temperatureEvent.shipment = shipment;
        temperatureEvent.temperature = temperatureReading.centigrade;
        temperatureEvent.message = 'Temperature threshold violated! Emitting TemperatureEvent for shipment: ' + shipment.$identifier;
        console.log(temperatureEvent.message);
        emit(temperatureEvent);
    }*/

    const registroRegistry = await getAssetRegistry(NS + '.Registro');
    await registroRegistry.update(registro);
}

/**
 * Facial recognition confirmation
 * @param {org.basic.identificacion.ConfirmarIdentificacion} ConfirmarIdentificacion - the FacialRecognition confirmation transaction
 * @transaction
 */
async function confirmarIdentificacion(confirmarIdentificacion) {  // eslint-disable-line no-unused-vars

    const NS = 'org.basic.identificacion';
    const registro = confirmarIdentificacion.registro;
    const factory = getFactory();

    console.log('Identificacion facial confirmada ');
 
  	registro.estado = 'OK';

    const registroRegistry = await getAssetRegistry(NS + '.Registro');
    await registroRegistry.update(registro);
}

/**
 * Facial recognition confirmation
 * @param {org.basic.identificacion.RechazarIdentificacion} RechazarIdentificacion - the FacialRecognition deny transaction
 * @transaction
 */
async function rechazarIdentificacion(rechazarIdentificacion) {  // eslint-disable-line no-unused-vars

    const NS = 'org.basic.identificacion';
    const registro = rechazarIdentificacion.registro;
    const factory = getFactory();

    console.log('Identificacion facial rechazada ');
 
  	registro.estado = 'ERR';
  
    var idEvent = factory.newEvent(NS, 'EventoRechazarId');
    idEvent.registro = registro;
    idEvent.estado = 'ERR';
    idEvent.mensaje = 'Identificacion rechazada';
    console.log(idEvent.message);
    emit(idEvent);

    const registroRegistry = await getAssetRegistry(NS + '.Registro');
    await registroRegistry.update(registro);
}

/**
 * Initialize some test assets and participants useful for running the projects.
 * @param {org.basic.identificacion.setupProject} SetupProject - the SetupProject transaction
 * @transaction
 */

async function setupProject(setupProject) { 

    const factory = getFactory();
    const NS = 'org.basic.identificacion';

    const empleado = factory.newResource(NS, 'Empleado', '12045484F');
    empleado.email = 'borja@email.com';
    empleado.balanceHoras = 0;

    const empresa = factory.newResource(NS, 'Empresa', 'A80569352');
    empresa.email = 'borja@email.com';

    const contract = factory.newResource(NS, 'Contract', 'CON_002');
    contract.empleado = factory.newRelationship(NS, 'Empleado', '12045484F');
    contract.empresa = factory.newRelationship(NS, 'Empresa', 'A80569352');
    const fecha = setupProject.timestamp;
    fecha.setDate(fecha.getDate());
    contract.fecha = fecha;
    var d = new Date(2019, 08, 10, 08, 00, 00, 0);
  	var n = d.getHours();
  	contract.hora_entrada = n;
  	var d = new Date(2019, 08, 10, 15, 00, 00, 0);
  	var n = d.getHours();
  	contract.hora_salida = n;

    const registro = factory.newResource(NS, 'Registro', 'REG_001');
    registro.estado = 'OK';
    registro.count = 1;
    registro.contract = factory.newRelationship(NS, 'Contract', 'CON_002');

    const empleadosRegistry = await getParticipantRegistry(NS + '.Empleado');
    await empleadosRegistry.addAll([empleado]);

    const empresaRegistry = await getParticipantRegistry(NS + '.Empresa');
    await empresaRegistry.addAll([empresa]);

    const contractRegistry = await getAssetRegistry(NS + '.Contract');
    await contractRegistry.addAll([contract]);

    const registroRegistry = await getAssetRegistry(NS + '.Registro');
    await registroRegistry.addAll([registro]);
}

