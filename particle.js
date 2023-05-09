
class Particle {
    constructor() {
      this.pos = createVector(random(width), random(height));
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxspeed = 6;
      this.prevPos = this.pos.copy();
      this.gradientDirection = random(TWO_PI);
    }
    setGradient(colorStart, colorEnd) {
        this.colorStart = colorStart;
        this.colorEnd = colorEnd;
      }
    update() {
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    follow(vectors) {
      var desired = p5.Vector.sub(createVector(mouseX, mouseY), this.pos);
      var d = desired.mag();
      if (d < 100) {
        var m = map(d, 0, 100, 0, 1);
        desired.setMag(m);
      } else {
        desired.setMag(1);
      }
      
      var steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      this.applyForce(steer);
      var x = floor(this.pos.x / scl);
      var y = floor(this.pos.y / scl);
      var index = x + y * cols;
      var force = vectors[index];
      this.applyForce(force);
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    show() {
        var colorStart = color(0, 0, 255); // Default to blue
        var colorEnd = color(148, 0, 211); // Default to violet
        // calculate the interpolation value based on the particle's y position
        var interpValue = map(this.pos.y, 0, height, 0, 1);
  
        // interpolate between the start and end colors based on the interpolation value
        var currentColor = lerpColor(colorStart, colorEnd, interpValue);
  
        // set the stroke color to the interpolated color
        stroke(currentColor);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
        }
  
        updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
        }
  
    edges() {
      if (this.pos.x > width) {
        this.pos.x = 0;
        this.updatePrev();
      }
      if (this.pos.x < 0) {
        this.pos.x = width;
        this.updatePrev();
      }
      if (this.pos.y > height) {
        this.pos.y = 0;
        this.updatePrev();
      }
      if (this.pos.y < 0) {
        this.pos.y = height;
        this.updatePrev();
      }
  
    }
  
  }

