
var inc = 0.1;

// set the scale of the field
var scl = 30;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;


function setup() {
    
   
    createCanvas(1200, 800);
  
//   calc the numb of columns and rows based on scale
    cols = floor(width / scl);
    rows = floor(height / scl);
//   create string to display framerate
    fr = createP('');

//   create the flow field
    flowfield = new Array(cols * rows);

//   create the particles used to guide the field
    for (var i = 0; i < 300; i++) {
        particles[i] = new Particle();
    }

    background(33,33,33);
}


function draw() {
    grad = document.querySelector('#randomGradientButton')

    

  var yoff = 0;

//   loop through rows
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    // loop through columns
    for (var x = 0; x < cols; x++) {
        // find the location of the current vector 
      var index = x + y * cols;
    //   calculate the angle of said vector
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      // create new vector and set it's magnitude and then append the vector to the flowfield at same index
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
    }
    yoff += inc;

    zoff += 0.003;
  }

  for (var i = 0; i < particles.length; i++) {
    // follow mouse cursor
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}