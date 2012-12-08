var ambulanceView = function(ambulanceMain){
	
	this.ambulanceMain = ambulanceMain;

	this.gridDimension = 500;
	
	/**
	 * The number of grids in the gridDimension.
	 * @type {Number}
	 */
	this.grids = 25;

	this.rightPadding = 150;

	this.canvasSize = this.gridDimension + 2 * this.grids + 1;

	this.context = null;

	this.canvasLayer = null;

	this.stage = null;

	this.init = function(){
		var canvas = document.getElementById("ambulanceCanvas");
		this.stage = new Kinetic.Stage({
        	container: 'ambulanceDiv',
        	width: this.canvasSize+this.rightPadding,
       		height: this.canvasSize
      	});
		this.canvasLayer = new Kinetic.Layer({
       		name: "ambulanceCanvas",
       		id: "ambulanceCanvasId"
		});
		this.context = this.canvasLayer.getContext();
		this.loadUI();
		this.stage.add(this.canvasLayer);
	}

	this.loadUI = function(){
		this.createMesh();
		this.createLayerBackground();
	}
	this.createMesh = function(){
		for(var x =0; x<= this.gridDimension; x += this.gridDimension/this.grids){
			var verticalLine = new Kinetic.Line({
		        points: [0.5+this.grids+x,this.grids,0.5+this.grids+x,this.gridDimension+this.grids],
		        stroke: 'black',
		        strokeWidth: 1
      		});

      		var horizontalLine = new Kinetic.Line({
      			points: [this.grids,0.5+this.grids+x,this.gridDimension+this.grids,0.5+this.grids+x],
		        stroke: 'black',
		        strokeWidth: 1	
      		});

      		this.canvasLayer.add(verticalLine);
      		this.canvasLayer.add(horizontalLine);
		}
	}

	/**
	 * Creates border for the layer.
	 * @return {[type]} [description]
	 */
	this.createLayerBackground = function(){
		var border = new Kinetic.Rect({
	        x: 2,
	        y: 2,
	        width: this.canvasSize + this.rightPadding -3,
	        height: this.canvasSize - 3,
	        stroke: 'black',
	        strokeWidth: 1
      	});
      	this.canvasLayer.add(border);
      	var scoreText = new Kinetic.Text({
	        x: this.canvasSize - this.grids + 10,
	        y: this.grids + 10,
	        text: 'Score:',
	        fontSize: 12,
	        fontFamily: 'Calibri',
	        textFill: 'green'
      	});

      	var aliveText = new Kinetic.Text({
	        x: this.canvasSize - this.grids + 10,
	        y: this.grids + 30,
	        text: 'Alive:',
	        fontSize: 12,
	        fontFamily: 'Calibri',
	        textFill: 'green'
      	});

      	var deadText = new Kinetic.Text({
	        x: this.canvasSize - this.grids + 10,
	        y: this.grids + 50,
	        text: 'Dead:',
	        fontSize: 12,
	        fontFamily: 'Calibri',
	        textFill: 'red'
      	});

      	var aliveScore = new Kinetic.Text({
	        x: this.canvasSize - this.grids + 50,
	        y: this.grids + 30,
	        text: '10',
	        id: 'aliveScore',
	        fontSize: 12,
	        fontFamily: 'Calibri',
	        textFill: 'green'
      	});

      	var deadScore = new Kinetic.Text({
	        x: this.canvasSize - this.grids + 50,
	        y: this.grids + 50,
	        text: '0',
	        id: 'deadScore',
	        fontSize: 12,
	        fontFamily: 'Calibri',
	        textFill: 'red'
      	});

      	var hospitalText = new Kinetic.Text({
	        x: this.canvasSize - this.grids + 10,
	        y: this.grids + 80,
	        text: 'Hospitals:',
	        fontSize: 12,
	        fontFamily: 'Calibri',
	        textFill: 'blue'
      	});
      	this.canvasLayer.add(scoreText);
      	this.canvasLayer.add(aliveText);
      	this.canvasLayer.add(deadText);
      	this.canvasLayer.add(aliveScore);
      	this.canvasLayer.add(deadScore);
      	this.canvasLayer.add(hospitalText);

	}

	/**
	 * Returns a list [x,y] to actual [x,y] in the canvas.
	 * @param  {[list]} gridCordinate [description]
	 * @return {[type]}               [description]
	 */
	this.getCanvasXY = function(gridCordinate){
		return [0.5+ this.gridDimension/this.grids*gridCordinate[0]+this.grids,0.5 + gridCordinate[1]*this.gridDimension/this.grids + this.grids]
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


	this.addObjectToLayer = function(uiElement){
		this.canvasLayer.add(uiElement);
		this.stage.add(this.canvasLayer);
	}

	/**
	 * Updates the score on the UI.
	 * @param  {[number]} personAlive [description]
	 * @param  {[number]} personDead  [description]
	 * @return {[type]}             [description]
	 */
	this.updateScore = function(personAlive,personDead){
		this.canvasLayer.get("#aliveScore")[0].setText(personAlive);
		this.canvasLayer.get("#deadScore")[0].setText(personDead);
		this.stage.add(this.canvasLayer);
	}



}