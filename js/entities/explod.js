// Entity magic
var explodEntity = me.Entity.extend({
    // Bullet is being created
    init: function (x,y,settings) {
        //settings.collidable = true;
        settings.spritewidth=101;
        settings.spriteheight=101;
        settings.width=101;
        settings.height=101;
        this._super(me.Entity, 'init', [x, y , settings]);
        var texture = new me.video.renderer.Texture(me.loader.getJSON("flare"),me.loader.getImage("flare"));
        this.renderable = texture.createAnimationFromName(['P07.png','P08.png','P09.png','P10.png']);
        this.renderable.addAnimation("exploding",   [0,1,2,3],80);
        this.body.collisionType = me.collision.types.NO_OBJECT;
        this.body.gravity = 0;
        this.body.setVelocity(5,5);
		this.anchorPoint.set(0.5, 0.5);
        this.life = 300;
		this.basicAttackDist = 150;
		this.stifftime = 100;
        this.name='Explod';
        this.renderable.setCurrentAnimation("exploding");
        this.attack(this);
        this.curExplod = me.game.world.addChild(this,6);
        me.audio.play('huodanshu2',false);
    },

    update: function (dt) {
        this.body.update(dt);
        this.life -=dt;

        if(this.life <=0){
            //me.game.world.removeChild(this);
            me.game.world.removeChildNow(this.curExplod);
            return true;
        }
        return (this._super(me.Entity, 'update', [dt]));
    },
	attack : function attack(obj) {
		var attacklist = obj.findTarget(obj.pos,obj.basicAttackDist);
        if(attacklist && attacklist.length>0){
			var tmpdmg = storage.data.player.basicdmg+storage.data.player.skill.byz+2;
            for(var t=0;t<attacklist.length;t++){
                var target = attacklist[t];
                target.damage(tmpdmg,obj.stifftime,obj);
            }
        }
	},
    findTarget: function(searchPosition, visionRange) {
        var self = this;
        var targets = [];
        storage.baddies.forEach(function(target) {
            var dist = target.pos.distance(searchPosition);
            if (dist < visionRange) {
                targets.push(target);
            }
        });
        return targets;
    }
});