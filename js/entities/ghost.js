var ghostEntity = me.Entity.extend({
    init : function init(x, y, settings) {
        settings.spritewidth=60;
        settings.spriteheight=70;
        settings.width=50;
        settings.height=70;
        switch(settings.dirnname){
            case "left":
                x=x-100;
				this.dir_name = 'lr';break;
            case "right":
                x=x+100;
				this.dir_name = 'lr';break;
            case "up":
                y=y-100;
				this.dir_name = 'up';break;
            case "down":
                y=y+100;
				this.dir_name = 'down';break;
        }
		this._super(me.Entity, 'init', [x, y , settings]);
		this.body.collisionType = 'GHOST';
        this.body.gravity = 0;
        this.body.setVelocity(2,2);
        this.body.setFriction(0.4,0.4);
        this.anchorPoint.set(0.5,1.0);
		
        //this.ptaoist = me.game.world.getChildByProp('id','taoist')[0];
		
		this.name = 'ghost';
		this.hp = Math.ceil((10+(storage.data.player.lvl-1)*2)/2);
		this.speed = 4;
		this.attackDamage=Math.ceil(storage.data.player.basicdmg/2+storage.data.player.skill.bgl);
		this.defense=Math.ceil(storage.data.player.defense/2+storage.data.player.skill.bgl);
		this.findTargetTimer = 40;
        this.curTarget = null;
        this.dead = false;
		this.findTargetTimerMax = settings.findTargetTimerMax || 100;
        this.attackCooldown = 0;
        this.attackCooldownMax = settings.attackCooldownMax || 750;
        this.attackRange = settings.attackRange || settings.spritewidth;
        this.attackAnimTimer = 0;
        this.attackAnimTimerMax = 1000;
		//this.giveUpDist = settings.giveUpDist || 225;
		//this.followDist = 110 + Math.round( Math.random() * 32 );
		//this.hunting = false;
		this.moveToPlayerPos = false;
		this.renderable = this.initAction();
		this.renderable.setCurrentAnimation("stand_"+this.dir_name);
		this.curGhost = me.game.world.addChild(this,5);
        storage.playerArmy.push(this);
    },
	initAction : function initAction() {
         var texture = new me.video.renderer.Texture(me.loader.getJSON("ghost"),me.loader.getImage("ghost"));
        var playerFrames = new Array();
        for(var i=1;i<104;i++){
            if(i<10){
                playerFrames.push('B00'+i+'.png');
			}else if(i>99){
                playerFrames.push('B'+i+'.png');
            }else{
                playerFrames.push('B0'+i+'.png');
            }
        }
        var renderable = texture.createAnimationFromName(playerFrames);

		renderable.addAnimation("stand_lr",  [0]);
		renderable.addAnimation("stand_up",    [1]);
		renderable.addAnimation("stand_down",  [2]);
		renderable.addAnimation("calling",  [90,91,92,93,94,95,96,97,98,99,100,101,102],30);
		
		renderable.addAnimation("walk_lr",   [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],30);
		renderable.addAnimation("walk_up",     [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34],30);
		renderable.addAnimation("walk_down",   [35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],30);

        renderable.addAnimation("attack_lr",     [51,52,53,54,55,56,57,58,59,60,61,62,63],30);
        renderable.addAnimation("attack_up",     [64,65,66,67,68,69,70,71,72,73,74,75,76,],30);
        renderable.addAnimation("attack_down",   [77,78,79,80,81,82,83,84,85,86,87,88,89],30);

		return renderable;
	},
    update : function update(dt) {
		this.updateDirName();
        if(!this.curTarget) {
            this.recheckTarget(dt);
        }

        //if(this.curTarget && this.moveToPlayerPos == false) {
			if(this.curTarget) {
            this.moveTowardTargetAndAttack(dt);
        }
 		//this.moveToPlayer(dt);
        this.body.update(dt);
        return (this._super(me.Entity, 'update', [dt]));
    },
    updateDirName: function(){
        if ( this.body.vel.y > 0.0 ){
            this.dir_name = "down";
			this.renderable.flipX(false);
		}
        if ( this.body.vel.y < 0.0 ){
            this.dir_name = "up";
			this.renderable.flipX(false);
		}
        if ( this.body.vel.x > 0.0 ){
            this.dir_name = "lr";
			this.renderable.flipX(true);
		}
        if ( this.body.vel.x < 0.0 ){
            this.dir_name = "lr";
			this.renderable.flipX(false);
		}
    },
    moveToPlayer: function(dt) {
        var toTarget = new me.Vector2d(this.ptaoist.pos.x,this.ptaoist.pos.y);
        toTarget.sub(this.pos);

        if(toTarget.length() <= this.followDist){
            this.body.vel.x = this.body.vel.y = 0;
            this.moveToPlayerPos = false;
            this.findTargetTimer = 0;
            this.maybeSwitchAnimation(this.renderable, "stand_"+this.dir_name, false);
        } else {
			this.moveToPlayerPos = true;
            toTarget.normalize();
            this.body.vel.x = toTarget.x * this.speed;
            this.body.vel.y = toTarget.y * this.speed;
            this.maybeSwitchAnimation(this.renderable, "walk_"+this.dir_name, true);
        }
    },
    moveTowardTargetAndAttack: function(dt) {
        if (this.attackCooldown >= 0) {
            this.attackCooldown -= dt;
        }

        if(this.attackAnimTimer > 0){
            this.attackAnimTimer-=dt;
        }

        if (this.curTarget && this.attackCooldown <= 0) {
			if(this.curTarget.hp <= 0 || this.curTarget.dead){
				this.curTarget = null;
				//this.hunting = false;
				return;
			}

            var toTarget = new me.Vector2d( this.curTarget.pos.x, this.curTarget.pos.y );
            toTarget.sub(this.pos);

            var dist = toTarget.length();
            if (dist < this.attackRange) {
                this.tryAttack(this.curTarget);
            }

            if( dist < this.attackRange-1 ){
                this.body.vel.x = this.body.vel.y = 0;
                if(this.attackAnimTimer <= 0) this.renderable.setCurrentAnimation("stand_"+this.dir_name);
            } else {
                toTarget.normalize();
                if(this.attackAnimTimer <= 0){
					if (!this.renderable.isCurrentAnimation("walk_"+this.dir_name)) {
						this.renderable.setCurrentAnimation("walk_"+this.dir_name);
					}
                }
				this.body.vel.x = toTarget.x * this.speed;
				this.body.vel.y = toTarget.y * this.speed;
            }
        }
    },
    tryAttack: function(target) {
        if (this.attackCooldown <= 0) {
            var success = this.attack(target);
            if (success) {
                this.attackAnimTimer = this.attackAnimTimerMax;
                this.attackCooldown = this.attackCooldownMax;
            }
        }
    },
	attack: function(target) {
		this.maybeSwitchAnimation(this.renderable, "attack_"+this.dir_name,true);
		target.damage(this.attackDamage,0,this);
		return true;
    },
    recheckTarget: function(dt) {
        this.findTargetTimer--;
        if (this.findTargetTimer <= 0) {
            this.curTarget = this.findTarget(this.pos, game.baddies);
            this.findTargetTimer = this.findTargetTimerMax;
        }
    },
    findTarget: function(searchPosition, potentialTargets) {
        var closestDist = null;
        var nextTarget = null;
		var mindist = null;
        potentialTargets.forEach(function(target) {
            var dist = target.pos.distance(searchPosition);
            if (!nextTarget) {
				nextTarget = target;
				mindist = dist;
            }else if(mindist>dist){
				mindist = dist;
				nextTarget = target;
			}
        });
        return nextTarget;
    },
    maybeSwitchAnimation: function(renderable, a, returnToIdle) {
        if(renderable && ! renderable.isCurrentAnimation(a) ){
            this.playAnimation(renderable, a, returnToIdle);
        }
    },
    playAnimation: function(renderable, a, returnToIdle) {
        var cb = returnToIdle ? renderable.setCurrentAnimation.bind(renderable,"stand_"+this.dir_name) : null;
        renderable.setCurrentAnimation(a, cb);
    },
    damage: function(dmg,stiftime,source) {
        var shanghai = dmg - this.defense;
		dmg = shanghai<=1?1:shanghai;
        this.hp -= dmg;
		if(stiftime>0){this.attackCooldown = stiftime;}
        //this.maybeSwitchAnimation(this.renderable, "hit", true);

		if(this.hp > 0 && this.curTarget == null && source != null && source.hp > 0 ){
			this.findTargetTimer = this.findTargetTimerMax;
			this.curTarget = source;
		}
        if(this.hp <= 0 && !this.dead) {
            this.dead = true;
            me.audio.play("hurt");
            storage.playerArmy.remove(this);
            me.game.world.removeChild(this);
        }
    },

	onDestroyEvent : function() {}
});
