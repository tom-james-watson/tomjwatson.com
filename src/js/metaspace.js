class GlitchText {

  constructor(text) {
    this.canvas = document.getElementById('stage')
    this.context = this.canvas.getContext('2d')
    this.text = text

    this.init()
    this.tick()
  }

  init () {
    this.canvas.width = document.documentElement.offsetWidth
    this.maxHeight = 250
    this.canvas.height = this.canvas.width / 4

    this.textSize = Math.floor(this.canvas.width / 7)
    this.font = 'normal ' + this.textSize + 'px "Gugi", monospace'
    this.context.font = this.font
    this.textWidth = (this.context.measureText(this.text)).width

    this.textX = (this.canvas.width - this.textWidth) / 2
    this.textY = this.canvas.height / 1.6

    this.fps = 8

    this.glitchThreshold = 0.85
    this.glitchOffsetBase = 10
    this.glitchOffset = 10

    this.scanlineThreshold = 0.8
  }

  tick() {
    setTimeout((function () {
      this.render()
      this.tick()
    }).bind(this), 1000 / this.fps)
  }

  render() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.renderText()

    if (Math.random() >= this.glitchThreshold) {
      this.renderGlitchText()
    }

    if (Math.random() >= this.scanlineThreshold) {
      this.renderScanline()
    }
  }

  renderText() {
    this.context.font = this.font
    this.context.globalCompositeOperation = 'lighter'

    this.context.fillStyle = "rgb(255,255,255)"
    this.context.fillText(this.text, this.textX, this.textY)
  }

  renderGlitchText() {

    const offset = this.glitchOffsetBase + this.glitchOffset * Math.random()

    const cyanTextX = this.textX + offset
    this.context.fillStyle = "rgb(0,255,255)"
    this.context.fillText(this.text, cyanTextX, this.textY)

    const magentaTextX = this.textX - offset
    this.context.fillStyle = "rgb(255,0,255)"
    this.context.fillText(this.text, magentaTextX, this.textY)

  }

  renderScanline() {

    const lineA = this.canvas.height * this.randomInRange(0.2, 0.6)
    const lineB = this.canvas.height * this.randomInRange(0.2, 0.6)

    const scanlineSize = this.canvas.height / 4 * Math.random() + 1

    const lineAImageData = this.context.getImageData(0, lineA, this.canvas.width, scanlineSize)
    const lineBImageData = this.context.getImageData(0, lineB, this.canvas.width, scanlineSize)

    this.context.putImageData(lineBImageData, 0, lineA)
    this.context.putImageData(lineAImageData, 0, lineB)

  }

  randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname !== '/meta.space/') {
    return
  }
  const glitchText = new GlitchText('meta.space')
  window.onresize = glitchText.init
})
