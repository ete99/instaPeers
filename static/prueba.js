const canv = document.querySelector('canvas')
canv.width = window.innerWidth
canv.height = window.innerHeight
const c = canv.getContext('2d')

let mousex = undefined
let mousey = undefined

const circlesCount = 300
const maxRadius = 40
const distanceFromMouse = 20
const circleArray = []
const xC = canv.width/2
const yC = canv.height/2
const rC = 100 * Math.log(circlesCount)-((100 * Math.log(circlesCount))%yC)-80

const colorArray = [
  '#046975',
  '#2EA1D4',
  '#3BCC2A',
  '#FFDF59',
  '#FF1D47'
]

const debounce = (func) => {
  let timer
  return (event) => {
    if (timer) { clearTimeout(timer) }
    timer = setTimeout(func, 100, event)
  }
}

window.addEventListener('resize', debounce(() => {
  canv.width = window.innerWidth
  canv.height = window.innerHeight

  init()
}))

const init = () => {
  circleArray.length = 0
  let radioActual = 60
  let cuentaC = 1
  for (let i = 0; i < circlesCount; i++) {
    cuentaC++
    const radius = 10       //Math.random() * 20 + 1
    const angle = cuentaC*2*Math.PI/(2*Math.PI*radioActual/40)
    const x = xC + radioActual*Math.cos(angle)   //Math.random() * (innerWidth - radius  * 2) + radius
    const y = yC + radioActual*Math.sin(angle)   //Math.random() * (innerHeight - radius  * 2) + radius
    if((cuentaC)*40 > 2*Math.PI*radioActual){
        radioActual = radioActual + 30
        cuentaC = 0
    }

    /*
    switch(i%4){
        case 0:
            const x = xC+((rC-i*rC/40)%rC)*Math.cos(angle)   //Math.random() * (innerWidth - radius  * 2) + radius
            const y = yC+((rC-i*rC/40)%rC)*Math.sin(angle)   //Math.random() * (innerHeight - radius  * 2) + radius
        break;
        case 0:

        break;
        case 0:

        break;
        case 3:

        break;
    }
    */
    const dx = 0    //(Math.random() - 0.5) * 2
    const dy = 0    //(Math.random() - 0.5) * 2

    circleArray.push(new Circle(x, y, dx, dy, radius))
  }

}

const Circle = function(x, y, dx, dy, radius) {
  this.x = x
  this.y = y
  this.dx = dx
  this.dy = dy
  this.radius = radius
  this.minRadius = radius
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]

  this.draw = function() {
    c.lineWidth = 2
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.strokeStyle = 'black'
    c.stroke()
    c.fillStyle = this.color
    c.fill()

  }

  this.update = function() {
  /*
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }

    this.x += this.dx
    this.y += this.dy
  */

    if (mousex - this.x < distanceFromMouse && mousex - this.x > -distanceFromMouse && mousey - this.y < distanceFromMouse && mousey - this.y > -distanceFromMouse) {
      if (this.radius < maxRadius) this.radius += 1
    } else {
      if (this.radius > this.minRadius) this.radius -= 1
    }

    this.draw()
  }
}

const animate = () => {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)
  drawCrcl(xC,yC)
  let j = 0
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update()
    ///*
    j=(i+1)%circlesCount
    //if(i+1<circleArray.length){
      //drawLine(circleArray[i].x, circleArray[i].y, circleArray[j].x, circleArray[j].y, 2)
      //drawLine(circleArray[i].x, circleArray[i].y, xC, yC, 0.2)
    //}
    //*/
  }
}

init()
animate()

window.addEventListener('mousemove', (e) => {
  mousex = e.x
  mousey = e.y
})
function drawLine(x0, y0, x1, y1, width=4, color='rgb(173,10,0)'){
    ctx.strokeStyle = color
    ctx.lineWidth = width

    ctx.beginPath()
    ctx.moveTo(x0,y0)
    ctx.lineTo(x1, y1)
    ctx.stroke()
}

function drawCrcl(x, y, size=15, color='rgb(127,255,212)'){
  c.beginPath();
  c.fillStyle = color;
  c.arc(x, y, size, 0, 2 * Math.PI);
  c.fill();
}