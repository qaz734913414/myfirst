// Entity magic
var flareEntity = me.Entity.extend({
    // Bullet is being created
    init: function (x,y,settings) {
        switch(settings.dirnname){
            case "left":
                x=x-85;y=y-30;
                settings.spritewidth=101;settings.spriteheight=65;settings.width=101;settings.height=65;break;
            case "right":
                x=x+40;y=y-30;
                settings.spritewidth=101;settings.spriteheight=65;settings.width=101;settings.height=65;break;
            case "up":
                x=x-25;y=y-140;
                settings.spritewidth=65;settings.spriteheight=101;settings.width=65;settings.height=101;break;
            case "down":
                x=x-20;y=y+30;
                settings.spritewidth=65;settings.spriteheight=101;settings.width=65;settings.height=101;break;
        }
        //settings.collidable = true;
        this._super(me.Entity, 'init', [x, y , settings]);
        var texture = new me.video.renderer.Texture(me.loader.getJSON("flare"),me.loader.getImage("flare"));
        this.renderable = texture.createAnimationFromName(['P01.png','P02.png','P03.png','P04.png','P05.png','P06.png','P07.png','P08.png','P09.png','P10.png','P11.png','P12.png','P13.png','P14.png','P15.png','P16.png']);
        this.renderable.addAnimation("face_left",   [0,1,2],80);
        this.renderable.addAnimation("face_right",   [10,11,12],80);
        this.renderable.addAnimation("face_up",   [ 3,4,5 ],80);
        this.renderable.addAnimation("face_down",   [13,14,15],80);
        this.renderable.addAnimation("exploding",   [6,7,8,9 ],80);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.body.gravity = 0;
        this.body.setVelocity(5,5);
		this.anchorPoint.set(0.5, 0.5);
		this.dieFlag = false;
        this.life = 2000;
        this.name = settings.dirnname;
		this.basicAttackDist = 50;
        ctime = me.timer.getTime();
        switch(settings.dirnname){
            case "left":
                this.renderable.setCurrentAnimation("face_left");break;
            case "right":
                this.renderable.setCurrentAnimation("face_right");break;
            case "up":
                this.renderable.setCurrentAnimation("face_up");break;
            case "down":
                this.renderable.setCurrentAnimation("face_down");break;
        }

        this.curFlare = me.game.world.addChild(this,5);
    },

    update: function (dt) {
        this.life -=dt;
        if(this.life <=0){
            //me.game.world.removeChild(this);
            me.game.world.removeChildNow(this.curFlare);
            return true;
        }
        if(this.dieFlag){
            this.body.vel.x=0;
            this.body.vel.y=0;
            return (this._super(me.Entity, 'update', [dt]));
        }
	
        switch(this.name){
            case "left":
                this.body.vel.x -= this.body.accel.x * me.timer.tick;this.body.vel.y=0;break;
            case "right":
                this.body.vel.x += this.body.accel.x * me.timer.tick;this.body.vel.y=0;break;
            case "up":
                this.body.vel.y -= this.body.accel.y * me.timer.tick;this.body.vel.x=0;break;
            case "down":
                this.body.vel.y += this.body.accel.y * me.timer.tick;this.body.vel.x=0;break;
        }
		
		//this.attack(this);
        this.body.update(dt);
		me.collision.check(this);

        // handle collisions against other shapes
	////game.playSoundId('huodanshu2');
        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]));
    },
    onCollision : function (response, other) {
        if(response.b.body.collisionType == me.collision.types.ENEMY_OBJECT){
            this.dieFlag = true;
            me.game.world.removeChild(this);
            me.pool.pull("Explod", this.pos.x,this.pos.y,{});
        }
		return false;
    }
});