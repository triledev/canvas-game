class Player {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y

        this.radius = radius
        this.color = color
    
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        const friction = 0.99
        this.velocity.x *= friction
        this.velocity.y *= friction

        if (this.x + this.radius + this.velocity.x <= canvas.width &&
            this.x - this.radius + this.velocity.x >= 0) {
            this.x += this.velocity.x 
        } else {
            this.velocity.x = 0
        }
        if (this.y + this.radius + this.velocity.y <= canvas.height &&
            this.y - this.radius + this.velocity.y >= 0) {
            this.y += this.velocity.y
        } else {
            this.velocity.y = 0
        }
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.color = color 
        this.radius = radius 
        this.velocity = velocity 
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color 
        c.fill()
    }

    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y 

    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y 
        this.radius = radius 
        this.color = color
        this.velocity = velocity
        this.type = 'Linear'
        this.radians = 0
        this.center = {
            x,
            y
        }

        if (Math.random() < 0.5) {
            this.type = 'Homing'
            if (Math.random() < 0.5) {
                this.type = 'Spinning'
                if (Math.random() < 0.5) {
                    this.type = 'Homing Spinning'
                }
            }
        }
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color 
        c.fill()
    }

    update() {
        this.draw()

        if (this.type === 'Spinning') {
            this.radians += 0.1
            // the center targeting player
            this.center.x += this.velocity.x
            this.center.y += this.velocity.y 
            
            // actual reanderd position
            this.x = this.center.x + Math.cos(this.radians) * 30
            this.y = this.center.y + Math.sin(this.radians) * 30
        } else if (this.type === 'Homing') {
            // calculate the angle to target the player
            const angle = Math.atan2(player.y - this.y, player.x - this.x)
            this.velocity.x = Math.cos(angle)
            this.velocity.y = Math.sin(angle)

            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y 
        } else if (this.type === 'Homing Spinning') {
            this.radians += 0.1
            // the center targeting player
            const angle = Math.atan2(player.y - this.center.y, player.x - this.center.x)
            this.velocity.x = Math.cos(angle)
            this.velocity.y = Math.sin(angle)

            this.center.x += this.velocity.x
            this.center.y += this.velocity.y 
            
            // actual reanderd position
            this.x = this.center.x + Math.cos(this.radians) * 30
            this.y = this.center.y + Math.sin(this.radians) * 30
        } else {
            this.x = this.x + this.velocity.x
            this.y = this.y + this.velocity.y 
        }
    }
}

const friction = 0.97
class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y 
        this.radius = radius 
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color 
        c.fill()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y 
        this.alpha -= 0.01
    }
}

const powerUp = new PowerUp({x:100, y:100, velocity:{x:0, y:0}}) 
class PowerUp {
    constructor(x, y, velocity) {
        this.x = x
        this.y = y 
        this.velocity = velocity 
    }
}