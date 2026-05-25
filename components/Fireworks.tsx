'use client'

import { useEffect, useRef } from 'react'

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: any[] = []
    let fireworks: any[] = []
    
    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Helper functions
    const random = (min: number, max: number) => Math.random() * (max - min) + min
    
    class Firework {
      x: number; y: number; sx: number; sy: number; tx: number; ty: number;
      distanceToTarget: number; distanceTraveled: number;
      coordinates: [number, number][]; coordinateCount: number;
      angle: number; speed: number; acceleration: number;
      brightness: number; targetRadius: number; hue: number;

      constructor(sx: number, sy: number, tx: number, ty: number) {
        this.x = sx
        this.y = sy
        this.sx = sx
        this.sy = sy
        this.tx = tx
        this.ty = ty
        this.distanceToTarget = Math.sqrt(Math.pow(tx - sx, 2) + Math.pow(ty - sy, 2))
        this.distanceTraveled = 0
        this.coordinates = []
        this.coordinateCount = 3
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y])
        }
        this.angle = Math.atan2(ty - sy, tx - sx)
        this.speed = 3
        this.acceleration = 1.05
        this.brightness = random(30, 50)
        this.targetRadius = 1
        this.hue = random(25, 45) // Amber/Gold/Brown hue
      }
      
      update(index: number) {
        this.coordinates.pop()
        this.coordinates.unshift([this.x, this.y])
        
        if (this.targetRadius < 8) {
          this.targetRadius += 0.3
        } else {
          this.targetRadius = 1
        }
        
        this.speed *= this.acceleration
        
        const vx = Math.cos(this.angle) * this.speed
        const vy = Math.sin(this.angle) * this.speed
        
        this.distanceTraveled = Math.sqrt(Math.pow(this.sx - this.x + vx, 2) + Math.pow(this.sy - this.y + vy, 2))
        
        if (this.distanceTraveled >= this.distanceToTarget) {
          createParticles(this.tx, this.ty, this.hue)
          fireworks.splice(index, 1)
        } else {
          this.x += vx
          this.y += vy
        }
      }
      
      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1])
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.lineWidth = 1 // Reset
      }
    }

    class Particle {
      x: number; y: number; coordinates: [number, number][]; coordinateCount: number;
      angle: number; speed: number; friction: number; gravity: number;
      hue: number; brightness: number; alpha: number; decay: number;

      constructor(x: number, y: number, hue: number) {
        this.x = x
        this.y = y
        this.coordinates = []
        this.coordinateCount = 6
        while (this.coordinateCount--) {
          this.coordinates.push([this.x, this.y])
        }
        this.angle = random(0, Math.PI * 2)
        this.speed = random(2, 18) // Huge explosion
        this.friction = 0.95
        this.gravity = 1.2
        // Make some particles golden brown
        this.hue = Math.random() > 0.8 ? 35 : hue + random(-10, 10) 
        this.brightness = random(30, 50)
        this.alpha = 1
        this.decay = random(0.01, 0.02) // Longer fade
      }

      update(index: number) {
        this.coordinates.pop()
        this.coordinates.unshift([this.x, this.y])
        this.speed *= this.friction
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed + this.gravity
        this.alpha -= this.decay
        
        if (this.alpha <= this.decay) {
          particles.splice(index, 1)
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.coordinates[this.coordinates.length - 1][0], this.coordinates[this.coordinates.length - 1][1])
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.lineWidth = 1 // Reset
      }
    }

    const createParticles = (x: number, y: number, hue: number) => {
      let particleCount = 200 // More particles per explosion
      while (particleCount--) {
        particles.push(new Particle(x, y, hue))
      }
    }

    let timerTotal = 25 // Shoot more frequently
    let timerTick = 0

    const loop = () => {
      requestAnimationFrame(loop)
      if (!ctx) return
      
      // Changed composite operation and fill style for light background
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(255, 253, 248, 0.2)' // Cream fade
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      let i = fireworks.length
      while (i--) {
        fireworks[i].draw()
        fireworks[i].update(i)
      }

      let j = particles.length
      while (j--) {
        particles[j].draw()
        particles[j].update(j)
      }

      if (timerTick >= timerTotal) {
        // Launch 1-3 fireworks at a time
        const launchCount = Math.floor(random(1, 4))
        for(let k = 0; k < launchCount; k++) {
          fireworks.push(new Firework(
            canvas.width / 2 + random(-200, 200),
            canvas.height,
            random(0, canvas.width),
            random(0, canvas.height / 2)
          ))
        }
        timerTick = 0
      } else {
        timerTick++
      }
    }

    loop()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0" 
      style={{ opacity: 0.85 }}
    />
  )
}
