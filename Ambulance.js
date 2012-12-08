/**
 * Ambulance Class.
 */
var Ambulance = function(){

	this.ambulanceId = null;

	this.personList = [];

	this.ambulanceCordinates = null;

	this.ambulanceCounterValue = 0;

	this.ambulanceCordinate = null;

	this.ambulanceSelected = false;


	/**
	 * Inits the ambulance when the hospital is loaded.Every Hospital should store the ambulance object which it created..
	 * @param  {[type]} ambulanceId [description]
	 * @return {[type]}
	 */
	this.init = function(ambulanceId,cordinate){

		this.ambulanceId = ambulanceId;

		this.ambulanceCordinate = cordinate;

	}

	this.getAmbulanceId = function(){
		return this.ambulanceId;
	}

	/**
	 * Updates the current co-oridnate of the ambulance
	 * @param  {[list[x,y]]} cordinate [description]
	 * @return {[type]}           [description]
	 */
	this.updateCordinateOfAmbulance = function(cordinate){
		this.ambulanceCordinate = cordinate;

		//Shows the ambulance updated UI on the Grid if it is not in the hospital i.e. it is not selected.
		if(this.ambulanceSelected){
			this.showAmbulance();
		}
	}

	/**
	 * Called when the ambulance is selected to mark that the ambulance is leaving hospital to pick person.
	 * @return {[type]} [description]
	 */
	this.selectAmbulance = function(){
		this.ambulanceSelected = true;
	}

	/**
	 * Shows the ambulance.Should call the UI to show it on the grid providing with co-ordinate.
	 * @return {[type]}
	 */
	this.showAmbulance = function(){
		//Calls the UI to show the ambulance on the current co-ordinate Value.
	}



	/**
	 * Stores the list of the person it has picked.Should call the personObj to hide itself from the UI.
	 * Also Increaments one counter value for pickup the person.
	 * @param  {[type]} personObj [description]
	 * @return {[type]}
	 */
	this.pickPerson = function(personObj){
		// Pick the person only when the person is alive else mark the person as dead on the UI.
		if(personObj.isPersonAlive(this.ambulanceCounterValue)){
			this.personList.push(personObj);
			personObj.pickedByAmbulance();
			this.ambulanceCounterValue++;
		}else{
			personObj.markPersonDead();
		}
	}

	/**
	 * Returns the value of the ambulanceCounterValue.
	 * @return {[type]} [description]
	 */
	this.getAmbulanceCounterValue = function(){
		return this.ambulanceCounterValue;
	}

	/**
	 * Reaches the hospital and unloads the person.Hospital checks if the persons unloaded isDead or and tells context 
	 * how many dead and saved.
	 * @param  {[type]} hospital [description]
	 * @return {[type]}
	 */
	this.registerToHospital = function(hospital){
		var numberOfPersonInAmbulance = this.personList.length;
		for(person in this.personList){
			//if the person is alive then ask the person object to update the context with alive person count.
			if(this.personList[person].isPersonAlive(this.ambulanceCounterValue)){
				this.personList[person].markPersonAlive(); //Increase the context person alive count.
			}else{
				this.personList[person].markPersonDead(); // Increase the context person dead count.
			}
		}

		/**
		 * Assuming that all the persons are removed parallely.
		 * And Unloading of one person doesn't effect the liveliness of another person.
		 */
		this.ambulanceCounterValue += numberOfPersonInAmbulance;

		/**
		 * All the persons are unloaded.So make the ambulance personList as Empty.
		 * @type {Array}
		 */
		this.personList = [];
		//As ambulance reaches Hospital it not selected any more.
		this.ambulanceSelected = false;

		hospital.addAmbulance(this);
	}
}
