
var ambulanceMain = function(){

	/**
	 * Global AmbulanceView Object so that it can be used by other Classes.Without and problem.
	 * @type {[AmbulanceView]}
	 */
	AmbulanceView = null;

	/**
	 * Global AmbulanceContext Object so that it can be used by other classes without passing them the object.
	 * @type {[type]}
	 */
	AmbulanceContext = null;

	this.init = function(){
		this.loadDependencies();
		this.load();
	}
	this.loadDependencies = function(){
		AmbulanceView = new ambulanceView(this);
		AmbulanceContext = new ambulanceContext(this);
		AmbulanceView.init();
		AmbulanceContext.init();
		AmbulanceView.drawPath([[5,5],[5,6],[6,6]]);
		var testPerson = new Person([5,10],12);
		testPerson.init(1);
	}

	this.load = function(){
		//this.ambulanceView.createMesh1();
	}

}

$(function() {
	 ambulance = new ambulanceMain();
	 ambulance.init();
});
