
var ambulanceMain = function(){

	this.ambulanceView = null;
	this.ambulanceContext = null;

	this.init = function(){
		this.loadDependencies();
		this.load();
	}
	this.loadDependencies = function(){
		this.ambulanceView = new ambulanceView(this);
		this.ambulanceView.init();
		this.ambulanceView.drawPath([[5,5],[5,6],[6,6]]);
	}

	this.load = function(){
		this.ambulanceView.createMesh();
		//this.ambulanceView.createMesh1();
	}

}

$(function() {
	 ambulance = new ambulanceMain();
	 ambulance.init();
});
