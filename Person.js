var Person = function(cordinates,timer){

	this.personCordinates = cordinates;


	/**
	 * The person timer value it is compared with the ambulance timer value to detect whether the person dies or lives.
	 * @type {[number]}
	 */
	this.personTimeToLive = timer;

	this.personId = null;

	this.personDisplayed = false;

	this.personUI = null;

	/**
	 * Intializes the person Object.Calls the UI to show the person.
	 * @return {[type]}
	 */
	this.init = function(personId){
		this.personId = personId;
		this.loadUI();
	}


	/**
	 * Return this person id
	 */
	this.getPersonId = function() {
	   return this.personId
	}

	/**
	 * Checks whether the person if saved with ambulance with ambulanceCounter Value will survive or not.
	 * @return {Boolean}
	 */
	this.isPersonAlive = function(ambulanceCounterValue){

		if(this.personTimeToLive > ambulanceCounterValue){
			return true;
		}else{
			return false;
		}

	}

	/**
	 * Returns person time to Survive.
	 * @return {[type]} [description]
	 */
	this.getPersonTimeToLive = function(){
		return this.personTimeToLive;
	}


	this.loadUI = function(){

		this.showPerson();
		/**
		 * Call the UI to attach events to the person also to show it on the UI.
		 */
		
		var getCanvasXY = AmbulanceView.getCanvasXY(this.personCordinates);

		this.personUI = new Kinetic.Circle({
	        x: getCanvasXY[0],
	        y: getCanvasXY[1],
	        radius: 5,
	        fill: 'green',
	        id:this.personId,
	        stroke: 'black',
	        strokeWidth: 1
      		});

		AmbulanceView.addPersonToLayer(this.personUI);
	}

	/**
	 * Shows the person on the UI.
	 * @return {[type]}
	 */
	this.showPerson = function(){
		this.personDisplayed = true;
	}

	/**
	 * Hide the person from the Ui.
	 * @return {[type]}
	 */
	this.hidePerson = function(){
		this.personDisplayed = false;
		this.personUI.remove();
		AmbulanceView.updatePersonLayer();

		/**
		 * Call the UI to remove the person and it's events from the UI.The Person has been picked by the ambulance.
		 * Then only it is hided Forever.
		 */
	}

	/**
	 * Ambulance calls this method on the person object to pick the person.
	 * @return {[type]} [description]
	 */
	this.pickedByAmbulance = function(){
		this.hidePerson();
	}

	/**
	 * Marks the person Dead based when the ambulance reaches late to the person or when person reaches late to hospital
	 * @return {[type]} [description]
	 */
	this.markPersonDead = function(){
		//Only marks the UI for the person as dead when the person is on the streets rather than in ambulance or hospital.
		if(this.personDisplayed){
			AmbulanceContext.removePlayingPerson(this.personId);
			this.personUI.remove();
			AmbulanceView.updatePersonLayer();
			//Also add to dead person count by calling the context.
		}else{
			//Call the context to increase the dead person count.
		}
	}

	this.markPersonAlive = function(){

		/**
		 * Person can only be said to remain alive when it reaches hospital by ambulance.
		 * In that case update the context to increament the counter of the person saved.
		 */
		AmbulanceContext.removePlayingPerson(this.personId);
		AmbulanceContext.personSaved();
		if(this.personDisplayed){
			this.hidePerson();
			//Call the context to increase the alive person count.
		}
	}

	/**
	 * Changes in the UI to show the person in red.
	 * No other change excepth making the person color as red.
	 * @return {[type]} [description]
	 */
	this.updateDeadUI = function(){
		this.personUI.setFill("red");
	}

	/**
	 * Change in the UI to show the person is alive.
	 * Change in the UI to show the person dot in green.
	 * @return {[type]} [description]
	 */
	this.updateAliveUI = function(){
		this.personUI.setFill("green");
	}

	/**
	 * Return this person's coordinates
	 *
	 */
	this.getCordinates = function(){
		return this.personCordinates;
	}
}
