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

	this.hospitalSelected = null;

	this.init = function(){ 
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
		this.createLayerBackground();
		this.addHospitalObjects();
		this.createMesh();
	}


	this.createMesh = function(){
		var meshLayer = new Kinetic.Layer();
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

      		meshLayer.add(verticalLine);
      		meshLayer.add(horizontalLine);
		}

		var pointLayer = new Kinetic.Layer();
		var pointContext = pointLayer.getContext();
		for(var gridX = 0;gridX <= this.grids; gridX++ ){
			for(var gridY = 0;gridY <= this.grids; gridY++){
				var gridPointsXY = this.getCanvasXY([gridX,gridY]);
				var selectPoint = new Kinetic.Circle({
			        x: gridPointsXY[0],
			        y: gridPointsXY[1],
			        radius: 2,
			        fill: 'black',
			        stroke: 'black',
			        strokeWidth: 1
		      		});
		      	pointLayer.add(selectPoint);
			}
		}

		pointLayer.on("mousedown",function(evt){
			var node = evt.shape;
			if(AmbulanceView.hospitalSelected){
				AmbulanceView.selectHospital(node);
			}
		});

		pointLayer.on("mouseover",function(evt){
			var node = evt.shape;
			node.setFill("blue");
			node.setStroke("blue");
			this.draw();
		});

		pointLayer.on("mouseout",function(evt){
			var node = evt.shape;
			node.setFill("black");
			node.setStroke("black");
			this.draw();
		});

		this.stage.add(meshLayer);
		this.stage.add(pointLayer);
	}

	/**
	 * Event is selected when the hospital has been selected and point to place the hospital has also been selected.
	 * @return {[type]} [description]
	 */
	this.selectHospital = function(pointObject){
		var hospitalNode = this.hospitalSelected["node"];
		hospitalNode.setX(pointObject.getX()-10);
		hospitalNode.setY(pointObject.getY()-10);
		this.hospitalSelected["layer"].draw();
		console.log(pointObject.getX() + " " + pointObject.getY());
		console.log(this.getGridXY([pointObject.getX(),pointObject.getY()]))
	}

	/**
	 * Creates border for the layer.
	 * @return {[type]} [description]
	 */
	this.createLayerBackground = function(){
		var backgroungLayer = new Kinetic.Layer();
		var border = new Kinetic.Rect({
	        x: 2,
	        y: 2,
	        width: this.canvasSize + this.rightPadding -3,
	        height: this.canvasSize - 3,
	        stroke: 'black',
	        strokeWidth: 1
      	});
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
      	backgroungLayer.add(scoreText);
      	backgroungLayer.add(aliveText);
      	backgroungLayer.add(deadText);
      	backgroungLayer.add(aliveScore);
      	backgroungLayer.add(deadScore);
      	backgroungLayer.add(hospitalText);
      	backgroungLayer.add(border);
      	this.stage.add(backgroungLayer);

	}

	/**
	 * Returns a list [x,y] to actual [x,y] in the canvas.
	 * @param  {[list]} gridCordinate [description]
	 * @return {[type]}               [description]
	 */
	this.getCanvasXY = function(gridCordinate){
		return [0.5+ this.gridDimension/this.grids*gridCordinate[0]+this.grids,0.5 + gridCordinate[1]*this.gridDimension/this.grids + this.grids]
	}

	this.getGridXY = function(canvasCordinate){
		return [((canvasCordinate[0] - 0.5 - this.grids)*this.grids)/this.gridDimension,((canvasCordinate[1] - 0.5 -this.grids)*this.grids)/this.gridDimension]
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
		this.stage.get("#aliveScore")[0].setText(personAlive);
		this.stage.get("#deadScore")[0].setText(personDead);
		this.stage.draw();
	}

	/**
	 * Creates initial hospital Blocks.
	 */
	this.addHospitalObjects = function(){
		hospitalLayer = new Kinetic.Layer();
		for(var hospital = 0; hospital < AmbulanceContext.numberOfHospitals; hospital++){
			var hospitalObj = new Kinetic.Rect({
		        x: this.canvasSize - this.grids + 20*(hospital+1),
		        y: this.grids + 100,
		        id: hospital+1,
		        width: 20,
		        height: 20,
		        fill: 'blue',
		        stroke: 'black',
		        strokeWidth: 1
		    });

			hospitalLayer.add(hospitalObj);
		}
		hospitalLayer.on("mousedown",function(evt){
			if(!AmbulanceView.hospitalSelected){
				console.log(evt.shape);
				evt.shape.setStroke("red");
				this.draw();
				AmbulanceView.hospitalSelected = {id:evt.shape.getId(),
												 node:evt.shape,
												 layer:this};
			}else{
				evt.shape.setStroke("red");
				AmbulanceView.hospitalSelected["node"].setStroke("black");
				AmbulanceView.hospitalSelected = {id:evt.shape.getId(),
												 node:evt.shape,
												 layer:this};
				this.draw();
			}
		});
		this.stage.add(hospitalLayer);
	}

}