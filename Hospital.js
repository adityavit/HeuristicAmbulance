var Hospital = function(cordiante){

	/**
	 * default number of ambulances in the hospital.
	 * @type {Number}
	 */
	this.numberOfAmbulance = 3;

	/**
	 * Stores the cordinates for the hospital.
	 * @type {[type]}
	 */
	this.cordinate = cordiante;

	/**
	 * Stores the ambulance in the hospital.
	 * @type {Array}
	 */
	this.ambulances = [];


	/**
	 * Contains the hosptail Id.
	 * @type {[type]}
	 */
	this.hospitalId = null;


	/**
	 * Inits the Hospital.Loads it with ambulances.Create Object of Ambulances.
	 * @return {[type]}
	 */
	this.init = function(hospitalId){

		this.hospitalId = hospitalId;

	}

	/**
	 * Selects the ambulance to use.
	 * @return {[type]}
	 */
	this.selectAmbulance = function(){

	}

	/**
	 * Returns the ambulances for the hospital.
	 * @return {[type]}
	 */
	this.getAmbulances = function(){

	}

	/**
	 * Returns the cordinate of the hospital.
	 * @return {[type]}
	 */
	this.getCordinates = function(){

	}

	/**
	 * Returns the ambulance which are available in the Hospital.
	 * @return {[type]}
	 */
	this.getAvailableAmbulance = function(){

	}

	/**
	 * Adds the ambulance to the hospital when coming from another hospital.
	 * @param {[Ambulance]} ambulance [description]
	 */
	this.addAmbulance = function(ambulance){

	}

	/**
	 * Removes the ambulance from Hospital when it goes to save person.
	 * @param  {[type]} ambulanceId [description]
	 * @return {[type]}
	 */
	this.removeAmbulance = function(ambulanceId){

	}

	/**
	 * Returns the ambulance Object provided with the ambulance Id.
	 * @param  {[type]} ambulanceId [description]
	 * @return {[type]}
	 */
	this.getAmbulanceObject = function(ambulanceId){

	}


}
