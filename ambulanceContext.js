var ambulanceContext = function(ambulanceMain){

	this.numberOfPersons = 100;

	this.numberOfHospitals = 5;

	this.ObjectsToRunTimeStamp = [];

	this.ambulanceMain = ambulanceMain;

	this.hospitals = {};

	this.ambulanceObjectMoving = null;

        //Map of People Currently in the game. i.e It does not include dead people or people who have reached the hospital
	this.persons = {};

	this.registeredHospitals = 0;

	this.savedPersons = 0;	
	this.deadPerson = 0;
     
        //Used to Generate Living time of people
        this.minLivingTime = 30
        this.maxLivingTime = 50

	this.init = function(){
          this.generatePersonMap();
	}

	/**
	 * Generate a person random map to store the data of the person
	 * co-ordinates and their timing.
	 * @return {[type]}
	 */
	this.generatePersonMap = function(){
	   //Generate X, Y and timer for each person 	
           hashes = []
	   for(var i = 0; i < this.numberOfPersons; i++) 
	   {
	      var x_cor, y_cor, key
	      do
	      {
		x_cor = getRandomInt(0, AmbulanceView.grids)
		y_cor = getRandomInt(0, AmbulanceView.grids)
                //Hash this coordinates	
                key = x_cor * (AmbulanceView.grids) + y_cor
                if(hashes.indexOf(key) == -1) 
		{ 
                  //Unique Coordinate
		  break                          
		} 
	      } while (true)
         
              hashes.push(key)
              //Generate the object
              var newPerson = new Person([x_cor,y_cor],getRandomInt(this.minLivingTime, this.maxLivingTime));
	      newPerson.init(i+1);
	      //Save the Person in the Map. Pid is the key. Note pid starts from 1
	      this.persons[(i+1)] = newPerson
	   }
	}

	this.setAmbulanceMoving = function(hospitalId,ambulanceId){
		if(!this.ambulanceObjectMoving){
			this.ambulanceObjectMoving = this.hospitals[hospitalId].getAmbulanceObject(ambulanceId);
			this.hospitals[hospitalId].removeAmbulance(ambulanceId);
			this.ambulanceObjectMoving.selectAmbulance();
		}
	}

	this.pickPerson = function(personId){
		var personObj = this.persons[personId];
		this.ambulanceObjectMoving.pickPerson(personObj);
	}
	/**
	 * Generates a Random Integer between min and max
	 */
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	this.moveAmbulanceToHospital = function(hospitalId){
		if(this.ambulanceObjectMoving){
			console.log("amulance added to hospital " + hospitalId);
			console.log(this.hospitals[hospitalId]);
			this.hospitals[hospitalId].addAmbulance(this.ambulanceObjectMoving);
			this.ambulanceObjectMoving = null;
		}
	}


	/**
	 * Create object of the person and calls calls UI load the person.
	 * @return {[type]}
	 */
	this.loadPersons = function(){

	}

	/**
	 * Creates hospital object with the ambulances.
	 * Called by the UI provided with co-ordinates of the grid.
	 * If all the hospitals are registered calls the view to show the start button.
	 * @return {[type]}
	 */
	this.registerHospital = function(hospitalCord,hospitalId){
		if(!this.hospitals[hospitalId]){
			this.hospitals[hospitalId] = new Hospital(hospitalCord);
			this.hospitals[hospitalId].init(hospitalId);
			this.registeredHospitals++;
			console.log(this.registeredHospitals);
			if(this.registeredHospitals == this.numberOfHospitals){
				 AmbulanceView.hospitalRegistered();
			}
		}else{
			this.hospitals[hospitalId].updateCordinate(hospitalCord);
		}
	}

	/**
	 * Generates points co-ordiantes with the path points between the two points.
	 * @param  {[list]} point1 [description]
	 * @param  {[list]} point2 [description]
	 * @return {[list of points]}
	 */
	this.generatePathPoints = function(point1,point2){

	}

	/**
	 * Updates all the object with one time stamp.Ie a person or ambulance.
	 * Selected Person counter decreases and ambulance out of hospital moves one path ahead.
	 * Should be run using setTimeOut for some defined time second.
	 * @return {[type]}
	 */
	this.runATimeStamp = function(){

	}

	this.getHospital = function(hospitalId){
		return this.hospitals[hospitalId];
	}


        /**
         *  Returns the Manhattan Distance between the two points
	 *
	 */
	this.getPathDistance = function(point1, point2) {
	   return ( Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]) );
        } 

	/**	
	 *  Increases the counter for number of persons saved by 1 on every call 
	 *  made by the person object
	 */
	this.personSaved = function() {
	   this.savedPersons++;
	   //Update the UI
	   AmbulanceView.updateScore(this.savedPersons);
        }

	/**
	 *  If hospital is placed on the person, that person is saved automatically
	 *
	 */
	this.updateHospitalOnPerson = function() {
	   var h_cor, p_cor;
	   for(hid in this.hospitals) 
	   {
		h_cor = this.hospitals[hid].getCordinates();
		for(pid in this.persons) 
		{
		  
		  //Check if the hospital is placed on this person
		  p_cor = this.persons[pid].getCordinates();	
		  if(h_cor[0] == p_cor[0] && h_cor[1] == p_cor[1])
		  {
		     //There can be only person at a coordinate, so safe to break
		     //Mark this person live
		     this.persons[pid].markPersonAlive(); 
		     break;	 
		  }
		}
	   }
	}
	
	/**
	 *  For this hospital, fetch the ambulance and check which all 'Persons' who are in the game
	 *  (i.e not dead or not at the hospital) can be picked up before they die and which cannot be picked up
	 *  
	 */
	this.personUIUpdateOnAmbulanceSelection = function(ambid,hid) {
	   var h_cor = this.hospitals[hid].getCordinates();
	   var h_amb = this.hospitals[hid].getAmbulanceObject(ambid);
	   for(pid in this.persons) 
	   {
		if(this.persons[pid].isPersonAlive( h_amb.getAmbulanceCounterValue() 
						    + this.getPathDistance(h_cor,this.persons[pid].getCordinates()) )) 
		{
		    this.persons[pid].updateAliveUI()	
		}
		else
		{
		    this.persons[pid].updateDeadUI()
		}
	   }
        }

	/**
	 *  Removes the Person from internal structure 'Persons' which stores the persons who are in the game
	 *  i.e not dead or not at the hospital. Should be called from Person.js in either markPersonDead or when they reach hospital
	 *  Input : Person id
	 */
	 this.removePlayingPerson = function(pid) {
	    delete this.persons[pid]
	 }		

}
