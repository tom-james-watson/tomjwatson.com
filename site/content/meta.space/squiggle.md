---
title: "Squiggle"
layout: meta.space
date: 2018-04-19
---

HTML Canvas experiment

<p data-height="265" data-theme-id="0" data-slug-hash="OZPrpz" data-default-tab="result" data-user="tomjwatson" data-embed-version="2" data-pen-title="Squiggle" class="codepen">See the Pen <a href="https://codepen.io/tomjwatson/pen/OZPrpz/">Squiggle</a> by Tom Watson (<a href="https://codepen.io/tomjwatson">@tomjwatson</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Old squiggle
```
class Squiggle {

  constructor() {
    this.canvas = document.getElementById('main')
    this.ctx = this.canvas.getContext('2d')
    this.init()

    window.requestAnimationFrame(this.draw.bind(this));

    window.onresize = () => this.init()
  }

  init () {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  draw() {

    this.ctx.globalCompositeOperation = 'destination-over'
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.ctx.strokeStyle = 'rgb(255, 255, 0)'

    this.ctx.save();

    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);

    var time = new Date();
    this.ctx.beginPath()

    this.ctx.arc(0, 0, 1, 0, Math.PI * 2)
    this.ctx.stroke()

    for (let i = 10; i < 50; i++) {

      this.ctx.rotate(
        (
          ((2 * Math.PI) / 6) * time.getSeconds() +
          ((2 * Math.PI) / 6000) * time.getMilliseconds()
        ) / (i >> 2) * 2
      )
      this.ctx.translate(0, 15);
      this.ctx.arc(0, 0, 0, 0, Math.PI * 2)
      this.ctx.stroke()
    }

    this.ctx.restore()

    window.requestAnimationFrame(this.draw.bind(this))
  }

}

document.addEventListener('DOMContentLoaded', function() {
  const squiggle = new Squiggle()
})
```
