var Person = function(cordinates,timer){

	this.personCordinates = cordinates;

	this.personTimer = timer;

	this.personTimerCounter = 0;

	this.personId = null;

	/**
	 * Intializes the person Object.Calls the UI to show the person.
	 * @return {[type]}
	 */
	this.init = function(personId){
		this.personId = personId;

	}

	/**
	 * Starts the counter of the person when the person is clicked.
	 * @return {[type]}
	 */
	this.startCounter = function(){

	}

	/**
	 * Checks whether the counter of the person has reached the personTimer.
	 * @return {Boolean}
	 */
	this.isPersonDead = function(){

	}

	/**
	 * Picks the person with the ambulance.Once picked remove from UI.
	 * @return {[type]}
	 */
	this.pickPerson = function(){

	}

	/**
	 * Stops the person Counter.
	 * @return {[type]}
	 */
	this.stopCounter = function(){

	}

	/**
	 * Shows the person on the UI.
	 * @return {[type]}
	 */
	this.showPerson = function(){

	}

	/**
	 * Hide the person from the Ui.
	 * @return {[type]}
	 */
	this.hidePerson = function(){

	}

	/**
	 * Will be called by the runATimeStamp in ambulanceContext Update the person if it selected.Else leave the person
	 * as it is.If the person is not picked till the counter expiers the person dies.
	 * @return {[type]}
	 */
	this.updateOnTimeStamp = function(){

	}
}
