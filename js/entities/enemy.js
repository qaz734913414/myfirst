var enemyEntity = me.Entity.extend({
    init : function init(x, y, settings) {
		this.args = {};
		this.args.param = settings;
		this.args.x = x;
		this.args.y = y;
		this._super(me.Entity, 'init', [x, y , settings]);
		this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.body.gravity = 0;
        this.body.setVelocity(2,2);
        this.body.setFriction(0.4,0.4);
        this.anchorPoint.set(0.5, 1.0);
        this.ptaoist = me.game.world.getChildByProp('id','taoist')[0];

		this.speed = 4;
		this.findTargetTimer = 40;
        this.curTarget = null;
        this.dead = false;
		this.findTargetTimerMax = settings.findTargetTimerMax || 100;
		this.maxTargetingDist = settings.maxTargetingDist || 150;
        this.attackCooldown = 0;
        this.attackDamage = 1;
        this.attackCooldownMax = settings.attackCooldownMax || 750;
        this.attackRange = settings.attackRange || settings.spritewidth;
        this.attackAnimTimer = 0;
        this.attackAnimTimerMax = 1000;
		this.giveUpDist = settings.giveUpDist || 225;
		this.gold = settings.gold || 2;
		this.hunting = false;
		
		var texture = new me.video.renderer.Texture(me.loader.getJSON(settings.texture.name),me.loader.getImage(settings.texture.name));
		this.renderable = texture.createAnimationFromName(settings.texture.images);
		this.renderable.addAnimation("idle",settings.texture.idle);
		this.renderable.addAnimation("walk",settings.texture.walk,settings.texture.speed||100);
		this.renderable.addAnimation("attacking",settings.texture.attacking,settings.texture.speed||100);
		this.renderable.addAnimation("hit",settings.texture.hit);
		this.renderable.setCurrentAnimation("idle");
        this.renderable.flipX(settings.flipX);
        storage.baddies.push(this);
    },

    update : function update(dt) {
        if(storage.stopped){
            return false;
        }
		this.updateDirName();
        if(!this.curTarget) {
            this.recheckTarget(dt);
        }

        if(this.curTarget) {
            this.moveTowardTargetAndAttack(dt);
        }

        this.body.update(dt);
        return (this._super(me.Entity, 'update', [dt]));
    },
    updateDirName: function(){
        if ( this.body.vel.x > 0.0 ){
			this.renderable.flipX(true);
		}
        if ( this.body.vel.x < 0.0 ){
			this.renderable.flipX(false);
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
            if(this.curTarget.name == 'taoist'){
                if(storage.data.player.hp <= 0 || this.curTarget.dead){
                    this.curTarget = null;
                    this.hunting = false;
                    return;
                }
            }else{
                if(this.curTarget.hp <= 0 || this.curTarget.dead){
                    this.curTarget = null;
                    this.hunting = false;
                    return;
                }
            }

            var toTarget = new me.Vector2d( this.curTarget.pos.x, this.curTarget.pos.y );
            toTarget.sub(this.pos);

            var dist = toTarget.length();

            if (!this.hunting && dist > this.giveUpDist) {
                this.curTarget = null;
                return;
            }

            if (dist < this.attackRange) {
                this.tryAttack(this.curTarget);
            }

            if( dist < this.attackRange-1 ){
                this.body.vel.x = this.body.vel.y = 0;
                if(this.attackAnimTimer <= 0) this.renderable.setCurrentAnimation("idle");
            } else {
                toTarget.normalize();
                if(this.attackAnimTimer <= 0){
                        if (!this.renderable.isCurrentAnimation("walk")) {
                            this.renderable.setCurrentAnimation("walk");
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
                this.maybeSwitchAnimation(this.renderable, "attacking", true);
                this.attackCooldown = this.attackCooldownMax;
            }
        }
    },
	attack: function(target) {
		throw "You need to overload this function!";
    },
    recheckTarget: function(dt) {
        if (!this.renderable.isCurrentAnimation("idle")) {
            this.renderable.setCurrentAnimation("idle");
        }
        this.findTargetTimer--;

        if (this.findTargetTimer <= 0) {
            this.curTarget = this.findTarget(this.pos, storage.playerArmy, this.maxTargetingDist);
            this.findTargetTimer = this.findTargetTimerMax;
        }
    },
    findTarget: function(searchPosition, potentialTargets, visionRange) {
        var closestDist = null;
        var nextTarget = null;
        potentialTargets.forEach(function(target) {
            var dist = target.pos.distance(searchPosition);
            if (dist < visionRange) {
                if (!closestDist || dist < closestDist) {
                    closestDist = dist;
                    nextTarget = target;
                }
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
        var cb = returnToIdle ? renderable.setCurrentAnimation.bind(renderable, "idle") : null;
        renderable.setCurrentAnimation(a, cb);
    },
    damage: function(dmg,stiftime,source) {
        var shanghai = dmg - this.defense;
		dmg = shanghai<=1?1:shanghai;
        this.hp -= dmg;
		if(stiftime>0){this.attackCooldown = stiftime;}
        this.maybeSwitchAnimation(this.renderable, "hit", true);

        if(source.name == 'Explod'){
            this.hunting = true;
            var taoistPlayer = me.game.world.getChildByProp('id','taoist')[0];
            if(this.hp > 0 && this.curTarget == null && taoistPlayer != null && storage.data.player.hp > 0 ){
                this.findTargetTimer = this.findTargetTimerMax;
                this.curTarget = taoistPlayer;
            }
        }else{
            if(this.hp > 0 && this.curTarget == null && source != null && source.hp > 0 ){
                this.findTargetTimer = this.findTargetTimerMax;
                this.curTarget = source;
            }
        }
        if(this.hp <= 0 && !this.dead) {
            this.dead = true;
			storage.setExp(1);
            me.audio.play("dead_"+this.name);
            storage.baddies.remove(this);
            me.game.world.removeChild(this);
            this.booty();
            this.args.z = this.pos.z;
            storage.willAddEnemys.push(this.args);
            evtps.pub(topic.player_kill_enemy,[{name:this.name,lvl:this.lvl}]);
		}
    },
    booty : function() {
        var seed =  Math.random();
        var n = 0.5-seed;
        var tmpgold = Math.round(this.gold+n*this.gold);
        for (var g=0;g<tmpgold;g++) {
            new coinEntity(this.pos.x,this.pos.y,{z:this.pos.z});
        }
        if(seed>0.6){
            new flaskEntity(this.pos.x+n,this.pos.y+n,{z:this.pos.z});
        }
    },
	onDestroyEvent : function() {
		log.debug('onDestroyEvent');
	}
});
