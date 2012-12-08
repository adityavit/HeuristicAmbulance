var ambulanceView = function(ambulanceMain){
	
	this.ambulanceMain = ambulanceMain;

	this.gridDimension = 500;
	
	/**
	 * The number of grids in the gridDimension.
	 * @type {Number}
	 */
	this.grids = 25;

	this.canvasSize = this.gridDimension + 2 * this.grids + 1;

	this.context = null;

	this.canvasLayer = null;

	this.stage = null;

	this.init = function(){
		var canvas = document.getElementById("ambulanceCanvas");
		this.stage = new Kinetic.Stage({
        	container: 'ambulanceDiv',
        	width: this.canvasSize,
       		height: this.canvasSize
      	});
		this.canvasLayer = new Kinetic.Layer();
		this.context = this.canvasLayer.getContext();
		this.stage.add(this.canvasLayer);

	}

	this.createMesh = function(){
		this.context.lineWidth = 1;
		this.context.beginPath();
	    for (var x = 0; x <= this.gridDimension; x += this.gridDimension/this.grids) {
	        this.context.moveTo(0.5 + x + this.grids, this.grids);
	        this.context.lineTo(0.5 + x + this.grids, this.gridDimension + this.grids);
	    }


	    for (var x = 0; x <= this.gridDimension; x += this.gridDimension/this.grids) {
	        this.context.moveTo(this.grids, 0.5 + x + this.grids);
	        this.context.lineTo(this.gridDimension + this.grids, 0.5 + x + this.grids);
	    }

	    this.context.strokeStyle = "black";
	    this.context.stroke();
	}

	/**
	 * Returns a list [x,y] to actual x,y in the canvas.
	 * @param  {[number]} gridX [description]
	 * @param  {[number]} gridY [description]
	 * @return {[list]}
	 */
	this.getCanvasXY = function(gridX,gridY){
		return [0.5+ this.gridDimension/this.grids*gridX+this.grids,0.5 + gridY*this.gridDimension/this.grids + this.grids]
	}
	/**
	 * Creates a path between the grid points given in the list as list objects of form [x,y]
	 * @param  {[list]} listOfGridPoints [description]
	 * @return {[type]}
	 */
	this.drawPath = function(listOfGridPoints){
		this.context.lineWidth = 3;
		this.context.beginPath();
		this.context.strokeStyle = "blue";
		var startPointXY = this.getCanvasXY(listOfGridPoints[0][0],listOfGridPoints[0][1]);
		this.context.moveTo(startPointXY[0],startPointXY[1]);
		for(var point = 0;point < listOfGridPoints.length -1; point++){
			var startPointXY = this.getCanvasXY(listOfGridPoints[point][0],listOfGridPoints[point][1]);
			var endPointXY = this.getCanvasXY(listOfGridPoints[point+1][0],listOfGridPoints[point+1][1]);
			this.context.lineTo(endPointXY[0],endPointXY[1]);
		}
		this.context.stroke();
	}



}