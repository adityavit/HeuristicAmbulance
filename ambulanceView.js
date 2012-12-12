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

	this.personLayer = null;

	this.stage = null;

	this.hospitalSelected = null;

	this.hospitalBoxSize = 20;

	this.ambulanceSelected = null;

	this.personSelected = null;

	this.movingAmbulanceSelected = false;


	this.init = function(){ 
		this.stage = new Kinetic.Stage({
        	container: 'ambulanceDiv',
        	width: this.canvasSize+this.rightPadding,
       		height: this.canvasSize
      	});
		this.personLayer = new Kinetic.Layer({
       		name: "personLayer",
       		id: "personLayer"
		});
		this.context = this.personLayer.getContext();
		this.stage.add(this.personLayer);
		this.loadUI();
	}

	this.loadUI = function(){
		this.createLayerBackground();
		this.addHospitalObjects();
		this.createMesh();
	}


	this.createMesh = function(){
		var meshLayer = new Kinetic.Layer({
			id: "meshLayer"
		});
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

		var pointLayer = new Kinetic.Layer({
			id:"pointLayer"
		});
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
			node.setFill("red");
			node.setStroke("red");
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
		var hospitalCordinate = this.getGridXY([pointObject.getX(),pointObject.getY()]);
		hospitalNode.setX(pointObject.getX()-this.hospitalBoxSize/2);
		hospitalNode.setY(pointObject.getY()-this.hospitalBoxSize/2);
		this.hospitalSelected["layer"].draw();
		AmbulanceContext.registerHospital(hospitalCordinate,this.hospitalSelected["id"]);
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
	        text: '100',
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

      	var ambulanceText = new Kinetic.Text({
	        x: this.canvasSize - this.grids + 10,
	        y: this.grids + 140,
	        text: 'Ambulances:',
	        id: 'ambulanceText',
	        fontSize: 12,
	        fontFamily: 'Calibri',
	        textFill: 'blue'
      	});

      	backgroungLayer.add(scoreText);
      	backgroungLayer.add(aliveText);
      	//backgroungLayer.add(deadText);
      	backgroungLayer.add(aliveScore);
      	//backgroungLayer.add(deadScore);
      	backgroungLayer.add(hospitalText);
      	backgroungLayer.add(ambulanceText);
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

	/**
	 * Adds the UIElement passed to it personLayer.
	 * @param {[type]} uiElement [description]
	 */
	this.addPersonToLayer = function(uiElement){
		this.personLayer.add(uiElement);
		this.personLayer.draw();
	}

	this.addAmbulancesToLayer = function(layer){
		var previousLayer = this.stage.get("#ambulanceSelection");
		if(previousLayer.length > 0){
			previousLayer[0].remove();
		}
		this.stage.add(layer);
		this.stage.draw();
	}

	/**
	 * Updates the score on the UI.
	 * @param  {[number]} personAlive [description]
	 * @param  {[number]} personDead  [description]
	 * @return {[type]}             [description]
	 */
	this.updateScore = function(personAlive){
		this.stage.get("#aliveScore")[0].setText(personAlive);
		// this.stage.get("#deadScore")[0].setText(personDead);
		this.stage.draw();
	}

	/**
	 * Creates initial hospital Blocks.
	 */
	this.addHospitalObjects = function(){
		var hospitalLayer = new Kinetic.Layer({
			id:"hospitalLayer"
		});
		for(var hospital = 0; hospital < AmbulanceContext.numberOfHospitals; hospital++){
			var hospitalObj = new Kinetic.Rect({
		        x: this.canvasSize - this.grids - this.hospitalBoxSize + 30*(hospital+1),
		        y: this.grids + 100,
		        id: hospital+1,
		        width: this.hospitalBoxSize,
		        height: this.hospitalBoxSize,
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

	/**
	 * Function called when all the hospitals are placed on the grid.
	 * @return {[type]} [description]
	 */
	this.hospitalRegistered = function(){
		var startButtonLayer = new Kinetic.Layer(); 	
		var startButton = new Kinetic.Rect({
		        x: this.canvasSize - this.grids - this.hospitalBoxSize + 30,
		        y: this.canvasSize - this.grids*8,
		        width: 100,
		        height: 40,
		        fill: 'green',
		        stroke: 'black',
		        strokeWidth: 2
		    });

		var startText = new Kinetic.Text({
	        x: this.canvasSize - this.grids - this.hospitalBoxSize + 40,
	        y: this.canvasSize - this.grids*8 + 12,
	        text: 'Start ->',
	        fontSize: 12,
	        fontFamily: 'Calibri',
	        textFill: 'black'
      	});

		startButtonLayer.add(startButton);
      	startButtonLayer.add(startText);
      	startButtonLayer.on("mousedown",function(){
      		var pointLayer = AmbulanceView.stage.get("#pointLayer");
			pointLayer[0].hide();
			AmbulanceContext.updateHospitalOnPerson();
			AmbulanceView.addPersonLayerEvent();
      		AmbulanceView.startGame();
      		this.hide();
      	});
		this.stage.add(startButtonLayer);

	}

	this.showMoveAmbulanceBtn = function(){
		var presentMoveBtn = this.stage.get("#moveAmbulanceBtn");
		if(presentMoveBtn.length > 0){
			presentMoveBtn[0].remove();
		}
		var ambulanceMovoButtonLayer = new Kinetic.Layer({
			id: "moveAmbulanceBtn"
		}); 	
		var ambulanceMoveButton = new Kinetic.Rect({
		        x: this.canvasSize - this.grids - this.hospitalBoxSize + 30,
		        y: this.canvasSize - this.grids*8,
		        width: 100,
		        height: 40,
		        fill: 'green',
		        stroke: 'black',
		        strokeWidth: 2
		    });

		var ambulanceStartText = new Kinetic.Text({
	        x: this.canvasSize - this.grids - this.hospitalBoxSize + 40,
	        y: this.canvasSize - this.grids*8 + 12,
	        text: 'Move Ambulance ->',
	        fontSize: 10,
	        fontFamily: 'Calibri',
	        textFill: 'black'
      	});

		ambulanceMovoButtonLayer.add(ambulanceMoveButton);
      	ambulanceMovoButtonLayer.add(ambulanceStartText);
      	ambulanceMovoButtonLayer.on("mousedown",function(){
      		AmbulanceView.moveAmbulance();
      		this.hide();
      	});
		this.stage.add(ambulanceMovoButtonLayer);

	}


	this.moveAmbulance = function(){
		if(!this.movingAmbulanceSelected){
			if(this.ambulanceSelected  && this.personSelected){
					var ambulanceId = this.ambulanceSelected["node"].getId();
					var personId = this.personSelected["node"].getId();
					var hospitalId = this.hospitalSelected["node"].getId();
					//Set the ambulance moving.
					AmbulanceContext.setAmbulanceMoving(hospitalId,ambulanceId);
					//Call the ambulance object to pick the person.
					AmbulanceContext.pickPerson(personId);
					this.movingAmbulanceSelected = true;
					this.hospitalSelected["node"].setStroke("black");
					this.hospitalSelected["layer"].draw();
					this.personSelected = null;
					this.hospitalSelected = null;
					var hospitalLayer = this.stage.get("#hospitalLayer");
					hospitalLayer[0].off("mousedown");
					hospitalLayer[0].on("mousedown",function(evt){
						if(!AmbulanceView.hospitalSelected){
							console.log(evt.shape);
							evt.shape.setStroke("red");
							this.draw();
							console.log("hospital Selected");
							AmbulanceView.hospitalSelected = {id:evt.shape.getId(),
															 node:evt.shape,
															 layer:this};
						}else{
							AmbulanceView.hospitalSelected["node"].setStroke("black");
							evt.shape.setStroke("red");
							AmbulanceView.hospitalSelected = {id:evt.shape.getId(),
															 node:evt.shape,
															 layer:this};
							console.log("hospital Selected When already one selected");
							this.draw();
						}
						if(AmbulanceView.movingAmbulanceSelected){
							if(AmbulanceView.personSelected){
								AmbulanceView.personSelected["node"].setStroke("black");
								AmbulanceView.personSelected["layer"].draw();
								AmbulanceView.personSelected = null;
							}
						}
						AmbulanceView.showMoveAmbulanceBtn();
				});
			}
		}else{
			//moving ambulance is selected will be only the selected one till it reaches a hospital.
			if(this.ambulanceSelected  && this.personSelected){
					var personId = this.personSelected["node"].getId();
					AmbulanceContext.pickPerson(personId);
			}else{
				if(this.ambulanceSelected  && this.hospitalSelected){
					this.movingAmbulanceSelected = false;
					this.moveAmbulanceToHospital(this.hospitalSelected["node"].getId());
					this.ambulanceSelected["node"].remove();
					this.ambulanceSelected = null;
					//Re-register old event to hospital.
					this.startGame();
				}
			}
		}
	}

	/**
	 * Moves the ambulance to hospital.
	 * @return {[type]} [description]
	 */
	this.moveAmbulanceToHospital = function(hospitalId){
		AmbulanceContext.moveAmbulanceToHospital(hospitalId);
	}


	this.updateAmbulanceUI = function(counterValue,cordinate){
		var canvasXY = this.getCanvasXY(cordinate);
		this.ambulanceSelected["node"].setX(canvasXY[0] - this.hospitalBoxSize/2);
		this.ambulanceSelected["node"].setY(canvasXY[1] - this.hospitalBoxSize/2);
		this.ambulanceSelected["node"].getChildren()[1].setText(counterValue);
		this.ambulanceSelected["layer"].draw();
	}

	this.updatePersonLayer = function(){
		this.personLayer.draw();
	}
	/**
	 * Creates Hospital Selection View.
	 * @return {[type]} [description]
	 */
	this.createAmbulanceSelectionView = function(){
		if(AmbulanceView.hospitalSelected){
			this.ambulanceSelected = null;
			AmbulanceView.hospitalSelected["node"].setStroke("red");
			AmbulanceView.hospitalSelected["layer"].draw();
			this.loadAmbulanceUI(AmbulanceContext.getHospital(AmbulanceView.hospitalSelected["id"]));
		}
	}

	this.loadAmbulanceUI = function(hospital){
		var presentAmbulanceLayer = this.stage.get("#ambulanceSelection");
		if(presentAmbulanceLayer.length > 0){
			presentAmbulanceLayer[0].remove();
		}
		var ambulances = hospital.getAmbulances();
		var ambulanceLayer = new Kinetic.Layer({
			id:"ambulanceSelection"
		});
		for(var ambulance =0 ;ambulance < ambulances.length;ambulance++){
			var ambulanceGroup = new Kinetic.Group({
				 x: this.canvasSize - this.grids - this.hospitalBoxSize + 30*(ambulance+1),
				 y: this.grids+ 160,
				 id: ambulances[ambulance].getAmbulanceId()
			});
			var ambulanceText = new Kinetic.Text({
		        x: 3,
		        y: 5,
		        text: ambulances[ambulance].getAmbulanceCounterValue(),
		        id: 'ambulance',
		        fontSize: 11,
		        fontFamily: 'Calibri',
		        textFill: 'black'
	      	});
	      	var ambulanceObj = new Kinetic.Rect({
		        width: this.hospitalBoxSize,
		        height: this.hospitalBoxSize,
		        fill: 'green',
		        stroke: 'black',
		        strokeWidth: 1
		    });
	      	ambulanceGroup.add(ambulanceObj);
	      	ambulanceGroup.add(ambulanceText);
	      	ambulanceLayer.add(ambulanceGroup);
	    }
	    console.log(ambulanceLayer);

	    //Adding Event mouseDown on Ambulance Layer.
	    ambulanceLayer.on("mousedown",function(evt){
			if(!AmbulanceView.ambulanceSelected){
				// console.log(evt.shape);
				evt.shape.getParent().getChildren()[0].setStroke("red");
				this.draw();
				AmbulanceView.ambulanceSelected = {id:evt.shape.getParent().getChildren()[0].getId(),
												 node:evt.shape.getParent(),
												 layer:this};
				AmbulanceView.updatePersonMap();
			}else{
				AmbulanceView.ambulanceSelected["node"].getChildren()[0].setStroke("black");
				evt.shape.getParent().getChildren()[0].setStroke("red");
				AmbulanceView.ambulanceSelected = {id:evt.shape.getParent().getChildren()[0].getId(),
												 node:evt.shape.getParent(),
												 layer:this};
				this.draw();
				AmbulanceView.updatePersonMap();
			}
		});
	    this.addAmbulancesToLayer(ambulanceLayer);
	}

	this.updatePersonMap = function(){
		console.log("inside updatePersonMap");
		if(this.hospitalSelected && this.ambulanceSelected && !this.movingAmbulanceSelected){
			console.log("inside updatePersonMap");
			AmbulanceContext.personUIUpdateOnAmbulanceSelection(this.ambulanceSelected["node"].getId(),this.hospitalSelected["node"].getId());
		}else{
			AmbulanceContext.personUIUpdateOnAmbulanceSelection(this.ambulanceSelected["node"].getId(),null);
		}
	}
	this.addPersonLayerEvent = function(){
		this.personLayer.moveToTop();
		this.personLayer.on("mousedown",function(evt){
			console.log(evt.shape);
			if(!AmbulanceView.personSelected){
				evt.shape.setStroke("red");
				this.draw();
				AmbulanceView.personSelected = {id:evt.shape.getId(),
											   node:evt.shape,
											   layer:this}	
			}else{
				evt.shape.setStroke("red");
				AmbulanceView.personSelected["node"].setStroke("black");
				AmbulanceView.personSelected = {id:evt.shape.getId(),
											   node:evt.shape,
											   layer:this}
				this.draw();
			}
			if(AmbulanceView.movingAmbulanceSelected){
				if(AmbulanceView.hospitalSelected){
					AmbulanceView.hospitalSelected["node"].setStroke("black");
					AmbulanceView.hospitalSelected["layer"].draw();
					AmbulanceView.hospitalSelected = null;
				}
			}

			AmbulanceView.showMoveAmbulanceBtn();
		});
	}
	/**
	 * States the start for the Game.
	 * Assumes hospital and Ambulance objects are create.
	 * Remove the grid points from the mesh.
	 * Attach new listener to the Hospital Click to show the ambulance list.
	 * @return {[type]} [description]
	 */
	this.startGame = function(){
		if(AmbulanceView.hospitalSelected){
			this.createAmbulanceSelectionView();
		}
		var hospitalLayer = this.stage.get("#hospitalLayer");
		hospitalLayer[0].off("mousedown");
		hospitalLayer[0].on("mousedown",function(evt){
			if(!AmbulanceView.hospitalSelected){
				console.log(evt.shape);
				evt.shape.setStroke("red");
				this.draw();
				AmbulanceView.hospitalSelected = {id:evt.shape.getId(),
												 node:evt.shape,
												 layer:this};
				AmbulanceView.createAmbulanceSelectionView();
			}else{
				AmbulanceView.hospitalSelected["node"].setStroke("black");
				evt.shape.setStroke("red");
				AmbulanceView.hospitalSelected = {id:evt.shape.getId(),
												 node:evt.shape,
												 layer:this};
				this.draw();
				AmbulanceView.createAmbulanceSelectionView();
			}
		});
	}

}