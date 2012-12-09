var Hospital = function(cordinate){

	/**
	 * default number of ambulances in the hospital.
	 * @type {Number}
	 */
	this.numberOfAmbulance = 3;

	/**
	 * Stores the cordinates for the hospital.
	 * @type {[type]}
	 */
	this.cordinate = cordinate;

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
		for(var ambulanceNumber = 0; ambulanceNumber < this.numberOfAmbulance; ambulanceNumber++){
			this.ambulances.push(new Ambulance(this.numberOfAmbulance*hospitalId + ambulanceNumber,this.cordinate));
		}

	}

	this.updateCordinate = function(cordinate){
		this.cordiante = cordinate;
	}

	/**
	 * Selects the ambulance to use.And removes the ambulance from the current list of ambulances.
	 * @return {[type]}
	 */
	this.selectAmbulance = function(ambulanceId){
		var ambulance = this.getAmbulanceObject(ambulanceId);
		this.removeAmbulance(ambulanceId);
		return ambulance;
	}

	/**
	 * Returns the ambulances for the hospital.
	 * @return {[list]} List of ambulances Objects currently with Hospital.
	 */
	this.getAmbulances = function(){
		return this.ambulances;
	}

	/**
	 * Returns the cordinate of the hospital.
	 * @return {[type]}
	 */
	this.getCordinates = function(){
		this.cordiante;
	}


	/**
	 * Adds the ambulance to the hospital when coming from another hospital.
	 * Adds the hospital current Co-ordiantes to the ambulance.Also adds the ambulance to data structure.
	 * @param {[Ambulance]} ambulance [description]
	 */
	this.addAmbulance = function(ambulance){
		ambulance.updateCordinateOfAmbulance(this.cordiante);
		this.ambulances.push(ambulance);
	}

	/**
	 * Removes the ambulance from Hospital when it goes to save person.
	 * @param  {[type]} ambulanceId [description]
	 * @return {[type]}
	 */
	this.removeAmbulance = function(ambulanceId){
		var tempAmbulances = [];
		for(var ambulance in this.ambulances){
			if(this.ambulances[ambulance].getAmbulanceId() != ambulanceId){
				tempAmbulances.push(this.ambulances[ambulance]);
			}
		}

		this.ambulances = tempAmbulances;
	}

	/**
	 * Returns the ambulance Object provided with the ambulance Id.
	 * @param  {[type]} ambulanceId [description]
	 * @return {[type]}
	 */
	this.getAmbulanceObject = function(ambulanceId){
		for(var ambulance in this.ambulances){
			if(this.ambulances[ambulance].getAmbulanceId() == ambulanceId){
				return this.ambulances[ambulance];
			}
		}
	}

}
