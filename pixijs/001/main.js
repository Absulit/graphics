var renderer = PIXI.autoDetectRenderer(
    800,
    600,
    {
        backgroundColor : 0x000000,
        antialias:true,
    }
);

var ticker = new PIXI.ticker.Ticker,
    delta;


document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

stage.interactive = true;

var origin = new PIXI.Point(0, 0);
var center = new PIXI.Point(400, 300);

var sphere = new PIXI.Graphics();

sphere.lineStyle(0);
sphere.beginFill(0xe6478b, 1);
sphere.drawCircle(0, 0,100);
sphere.endFill();

sphere.position = center;


stage.addChild(sphere);




var triangleContainer = new PIXI.Container();
var triangleGraphic = new PIXI.Graphics();

//graphics.lineStyle(0, 0xFF0000, 1);
triangleGraphic.beginFill(0xFF700B, 1);

triangleGraphic.moveTo(0, 0);
triangleGraphic.lineTo(200, 0);
triangleGraphic.lineTo(0, 10);
triangleGraphic.endFill();

var triangle;
var numTriangles = 10;
var anglePerTriangle = 360 / numTriangles * PIXI.DEG_TO_RAD;


for(var k=0; k < numTriangles; k++){
    triangle = triangleGraphic.clone();

    //triangle.position = center.clone();
    triangle.rotation = k * anglePerTriangle;

    //console.log(triangle.rotation);
    //triangle.position = center;
    triangleContainer.addChild(triangle);
}

// create a filter
//var blurFilter = new PIXI.filters.BlurFilter();

// set the filter
//triangleContainer.filters = [blurFilter];

stage.addChild(triangleContainer);




var sphere2 = sphere.clone();
sphere2.position = center.clone();
sphere2.position.x += 100;
sphere2.scale.x = .4;
sphere2.scale.y = .4;

sphere2.tint = 0xFF0000;

stage.addChild(sphere2);



var spheresContainer = new PIXI.Container();

var sphere;
var numSpheres = 6;
var anglePerSphere = 360 / numSpheres * PIXI.DEG_TO_RAD;


for(var k=0; k < numSpheres; k++){
    sphere = sphere2.clone();

    //triangle.position = center.clone();
    sphere.rotation = k * anglePerSphere;
    sphere.scale.x = .4;
    sphere.scale.y = .4;
    sphere.position.x += 100;

    //console.log(triangle.rotation);
    //triangle.position = center;
    spheresContainer.addChild(sphere);
}

spheresContainer.position = center.clone();

stage.addChild(spheresContainer);


//stage.addChild(graphics);

// start animating
function update() {
    requestAnimationFrame(update);

    delta = ticker.elapsedMS;

    //triangleContainer.position = origin;
    triangleContainer.rotation += 0.001 * delta;
    triangleContainer.position = center;
    triangleContainer.scale.x = .5 + Math.abs(Math.sin(triangleContainer.rotation));
    triangleContainer.scale.y = .5 + Math.abs(Math.sin(triangleContainer.rotation));

    //console.log(delta);


    // render the container
    renderer.render(stage);
}

update();
