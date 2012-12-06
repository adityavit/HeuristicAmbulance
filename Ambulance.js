/**
 * Ambulance Class.
 */
var Ambulance = function(){

	this.ambulanceId = null;

	this.personList = [];

	this.isAmbulanceBusy = false;

	this.ambulanceCordinates = null;

	/**
	 * Inits the ambulance when the hospital is loaded.Every Hospital should store the ambulance object which it created..
	 * @param  {[type]} ambulanceId [description]
	 * @return {[type]}
	 */
	this.init = function(ambulanceId){

		this.ambulanceId = ambulanceId;

	}

	/**
	 * The ambulance conrdinates which are updated for every time stamp.Depending on the path.
	 * After Updating should ask UI to update it's position on the UI.
	 * @return {[type]}
	 */
	this.updateCordinateOfAmbulance = function(){

	}

	/**
	 * Shows the ambulance.Should call the UI to show it on the grid providing with co-ordinate.
	 * @return {[type]}
	 */
	this.showAmbulance = function(){

	}

	/**
	 * Ambulance Path passed as arguments which is a list of points to the end Point.
	 * Once Got a path the ambulance will have to move it self one step forward on the path at every timestamp.
	 * @return {[type]}
	 */
	this.ambulancePath = function(){

	}

	/**
	 * Will be called by the runATimeStamp in ambulanceContext Update the ambulance if it is selected.Else leave the ambulance
	 * as it is.At every function call it updates it position with the new cordinates in the path by calling the ui.
	 * @return {[type]}
	 */
	this.updateOnTimeStamp = function(){

	}

	/**
	 * Stores the list of the person it has picked.Should call the personObj to hide itself from the UI.
	 * @param  {[type]} personObj [description]
	 * @return {[type]}
	 */
	this.pickPerson = function(personObj){

	}

	/**
	 * Reaches the hospital and unloads the person.Hospital checks if the persons unloaded isDead or and tells context 
	 * how many dead and saved.
	 * @param  {[type]} hospital [description]
	 * @return {[type]}
	 */
	this.registerToHospital = function(hospital){
		
	}
}
