/**
 * Player Entity
 */
var playerEntity = me.Entity.extend({
    init:function (x, y, settings){
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);
		this.body.collisionType = 1;
        this.body.gravity = 0;
        this.body.setVelocity(3,3);
        this.body.setFriction(0.4,0.4);
             
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		
		this.renderable = this.initAction();
        this.renderable.setCurrentAnimation("stand_down");
        this.anchorPoint.set(0.5, 1.0);
		
		this.dir_name='down';
        this.pause_flag = false;
		this.name = this.id = 'taoist';
        this.basicAttackDist = 100;
		this.noAttackTime = 0;
		this.noAttackMaxTime = 20000;
		this.dead = false;
        this.hp = storage.data.player.hp;
        this.curtime = this.curzs = this.attacking = 0;
        storage.playerArmy.push(this);
    },
    update : function (dt) {
		if(this.noAttackTime>0){
			this.noAttackTime -= dt;
		}
        if(storage.stopped){
            return false;
        }
        this.walk(this);
        this.attack(this);

            // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);
                 
        // return true if we moved or if the renderable was updated
        var code = (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0 || this.pause_flag == true);
        var tmp = me.timer.getTime();
        if(code && (tmp-this.curtime)>1000){
            storage.setXYZ({x:this.pos._x,y:this.pos._y,z:this.z});
            this.curtime = tmp;
        }
        return code;
    },
    onCollision : function (response, other) {
        return true;
    },
    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent : function() {
    },
	initAction : function initAction() {
         var texture = new me.video.renderer.Texture(me.loader.getJSON("player"),me.loader.getImage("player"));
        var playerFrames = new Array();
        for(var i=1;i<265;i++){
            if(i<10){
                playerFrames.push('P00'+i+'.png');
            }else if(i>99){
                playerFrames.push('P'+i+'.png');
            }else{
                playerFrames.push('P0'+i+'.png');
            }

        }
        var renderable = texture.createAnimationFromName(playerFrames);

		renderable.addAnimation("stand_down",  [2]);
		renderable.addAnimation("stand_lr",  [ 0 ]);
		renderable.addAnimation("stand_up",    [1]);
		renderable.addAnimation("stand_sword_down",  [5]);
		renderable.addAnimation("stand_sword_lr",  [3]);
		renderable.addAnimation("stand_sword_up",    [4]);
		renderable.addAnimation("stand_swording_down",  [211]);
		renderable.addAnimation("stand_swording_lr",  [210]);
		renderable.addAnimation("stand_swording_up",    [212]);
		
		renderable.addAnimation("walk_down",   [38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],30);
		renderable.addAnimation("walk_lr",   [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21],30);
		renderable.addAnimation("walk_up",     [22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],30);
		renderable.addAnimation("walk_sword_down",   [86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101],30);
		renderable.addAnimation("walk_sword_lr",   [54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69],30);
		renderable.addAnimation("walk_sword_up",     [70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85],30);
		renderable.addAnimation("walk_swording_down",   [245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260],30);
		renderable.addAnimation("walk_swording_lr",   [213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228],30);
		renderable.addAnimation("walk_swording_up",     [229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244],30);


        renderable.addAnimation("sword_lr_1",     [102,103,104,105,106,107],60);
        renderable.addAnimation("sword_lr_2",     [108,109,110,111,112,113,114,115,116],40);
        renderable.addAnimation("sword_up_1",     [117,118,119,120,121,122,123,124,125],40);
        renderable.addAnimation("sword_up_2",     [126,127,128,129,130,131],60);
        renderable.addAnimation("sword_down_1",     [132,133,134,135,136,137],60);
        renderable.addAnimation("sword_down_2",     [141,142,143,144,145,146,147,148,149],40);

        renderable.addAnimation("mcjs_lr",     [150,151,152,153,154,155,156,157,158,159],35);
        renderable.addAnimation("mcjs_up",     [160,161,162,163,164,165,166,167,168,169],35);
        renderable.addAnimation("mcjs_down",   [170,171,172,173,174,175,176,177,178,179],35);

        renderable.addAnimation("hxzx_lr",   [180,181,182,183,184,185,186,187,188,189],35);
        renderable.addAnimation("hxzx_up",   [190,191,192,193,194,195,196,197,198,199],35);
        renderable.addAnimation("hxzx_down", [200,201,202,203,204,205,206,207,208,209],35);
		
		renderable.addAnimation("bgl_down",  [263,263],1000);
		renderable.addAnimation("bgl_lr",  [261,261],1000);
		renderable.addAnimation("bgl_up",    [262,262],1000);

		return renderable;
	},
    walk : function walk(obj){
		if(obj.pause_flag == true){
			return;
		}
        var sword = storage.data.armor>0?'_sword':'';
			if(obj.noAttackTime>0 && sword != ''){
				sword +='ing';
			}
        if (me.input.isKeyPressed('left')){
            obj.dir_name="left";
            obj.renderable.flipX(false);
            obj.body.vel.x -= obj.body.accel.x * me.timer.tick;
            if (!obj.renderable.isCurrentAnimation("walk"+sword+"_lr")) {
                obj.renderable.setCurrentAnimation("walk"+sword+"_lr");
            }
        }
        else if (me.input.isKeyPressed('right'))
        {
            obj.dir_name="right";
            obj.renderable.flipX(true);
            obj.body.vel.x += obj.body.accel.x * me.timer.tick;
            if (!obj.renderable.isCurrentAnimation("walk"+sword+"_lr")) {
                obj.renderable.setCurrentAnimation("walk"+sword+"_lr");
            }
        }else if (me.input.isKeyPressed('up')) {
            obj.dir_name = 'up';
            obj.renderable.flipX(false);
            obj.body.vel.y -= obj.body.accel.y * me.timer.tick;
            if (!obj.renderable.isCurrentAnimation("walk"+sword+"_up")) {
                obj.renderable.setCurrentAnimation("walk"+sword+"_up");
            }
        } else if (me.input.isKeyPressed('down')) {
            obj.dir_name = 'down';
            obj.renderable.flipX(false);
            obj.body.vel.y += obj.body.accel.y * me.timer.tick;
            if (!obj.renderable.isCurrentAnimation("walk"+sword+"_down")) {
                obj.renderable.setCurrentAnimation("walk"+sword+"_down");
            }
        }else if(obj.pause_flag == false){
            if(obj.dir_name=="left" ){
                obj.renderable.flipX(false);
                obj.renderable.setCurrentAnimation("stand"+sword+"_lr");
            }else if(obj.dir_name=="right"){
                obj.renderable.flipX(true);
                obj.renderable.setCurrentAnimation("stand"+sword+"_lr");
            }else if(this.dir_name=="up"){
                obj.renderable.flipX(false);
                obj.renderable.setCurrentAnimation("stand"+sword+"_up");
            }else{
                obj.renderable.flipX(false);
                obj.renderable.setCurrentAnimation("stand"+sword+"_down");
            }
        }
    },
	attack : function attack(obj) {
        if(obj.attacking == 1){
			obj.noAttackTime = obj.noAttackMaxTime;
            return;
        }
        var attacklist = null;
        var tmpdmg = storage.data.player.basicdmg;
		var tmpstiff = 0;
        var reset = function () {
            obj.attacking = 0;
            obj.pause_flag = false;
            obj.anchorPoint.set(0.5, 1.0);
            obj.walk(obj);
        };
        function flare(){
            reset();
           me.pool.pull("Flare", obj.pos.x,obj.pos.y,{dirnname:obj.dir_name});
        };
        function callghost(){
			reset();
			me.pool.pull("Ghost", obj.pos.x,obj.pos.y,{dirnname:obj.dir_name});
        };
		
        var dir = function(obj,type){
            var tmp = '';
            var px=0.5;
            var py=1.0;
            if(obj.dir_name == 'right'){
                tmp = 'lr';
                if(type == 'sword'){
					px = 0.375;
                    switch(obj.curzs){
                        case 1:
                            py = 0.77;break;
                        case 2:
                            py = 0.61;break;
                    }
                }else if(type == 'mcjs'){
                    px = 0.264;py = 0.721;
                }else if(type == 'hxzx'){
                     px = 0.304;py = 0.916;
                }
                obj.renderable.flipX(true);
            }else if(obj.dir_name == 'left'){
                tmp = 'lr';
                if(type == 'sword'){
                    switch(obj.curzs){
                        case 1:
                            px = 0.62;py = 0.766;
                            break;
                        case 2:
                            px = 0.622;py = 0.61;
                            break;
                    }
                }else if(type == 'mcjs'){
                    px = 0.737;py = 0.726;
                }else if(type == 'hxzx'){
                    px = 0.692;py = 0.904;
                }
                obj.renderable.flipX(false);
            }else if(obj.dir_name == 'up'){
                tmp = obj.dir_name;
                if(type == 'sword'){
                    switch(obj.curzs){
                        case 1:
                            px = 0.59;py = 0.892;
                            break;
                        case 2:
                            px = 0.455;py = 0.896;
                            break;
                    }
                }else if(type == 'mcjs'){
                    px = 0.56;py = 0.93;
                }else if(type == 'hxzx'){
                    px = 0.584;py = 0.998;
                }
                obj.renderable.flipX(false);
            }else{
                tmp = obj.dir_name;
                if(type == 'sword'){
                    switch(obj.curzs){
                        case 1:
                            px = 0.536;py = 0.557;
                            break;
                        case 2:
                            px = 0.45;py = 0.544;
                            break;
                    }
                }else if(type == 'mcjs'){
                    px = 0.48;py = 0.347;
                }else if(type == 'hxzx'){
                    px = 0.454;py = 0.537;
                }
                obj.renderable.flipX(false);
            }
            obj.anchorPoint.set(px,py);
            return tmp;
        };
        if (storage.data.player.skill.byz>0 && me.input.isKeyPressed('byz')){
            obj.attacking = 1;
            obj.pause_flag = true;
            if(++obj.curzs>2){
                obj.curzs = 1;
            }
            var dirname = dir(obj,'sword');
            me.audio.play('banyuezhan',false);
            obj.renderable.setCurrentAnimation("sword_"+dirname+"_"+obj.curzs,reset);
            attacklist = obj.findTarget(obj.pos,obj.basicAttackDist);
        } else if (storage.data.player.skill.jfc>0 && me.input.isKeyPressed('jfc')){
            obj.attacking = 1;
            obj.pause_flag = true;
            var dirname = dir(obj,'mcjs');
            me.audio.play('jifengci',false);
            obj.renderable.setCurrentAnimation("mcjs_"+dirname,reset);
            attacklist = obj.findTarget(obj.pos,obj.basicAttackDist);
            tmpdmg += storage.data.player.skill.byz+2;
			tmpstiff += 100;
        }else if (storage.data.player.skill.hds>0 && me.input.isKeyPressed('hds')){
            obj.attacking = 1;
            obj.pause_flag = true;
            var dirname = dir(obj,'hxzx');
            me.audio.play('huodanshu1',false);
            obj.renderable.setCurrentAnimation("hxzx_"+dirname,flare);
        }else if (storage.data.player.skill.bgl>0 && me.input.isKeyPressed('bgl')){
			if(game.playerArmy.length<4){
				obj.attacking = 1;
				obj.pause_flag = true;
				var dirname = dir(obj,'bgl');
                me.audio.play('baiguling',false);
				obj.renderable.setCurrentAnimation("bgl_"+dirname,callghost);
			}
        }
        if(attacklist && attacklist.length>0){
            for(var t=0;t<attacklist.length;t++){
                var target = attacklist[t];
                target.damage(tmpdmg,tmpstiff,obj);
            }
        }
    },
    
	damage: function(dmg,source) {
        me.audio.play('hurt',false);
        this.renderable.flicker(300);
		storage.cutHp(dmg);
        if(!this.dead && storage.data.player.hp <= 0) {
            this.dead = true;
            me.audio.play('zsgbjh',false);
            storage.death();
        }
    },
    findTarget: function(searchPosition, visionRange) {
        var self = this;
        var targets = [];
        var dir = this.dir_name;
        storage.baddies.forEach(function(target) {
            var dist = target.pos.distance(searchPosition);
            if (dist < visionRange) {
                switch(dir){
                    case 'left':
                        target.pos.x <= self.pos.x ? targets.push(target):null;break;
                    case 'right':
                        target.pos.x >= self.pos.x ? targets.push(target):null;break;
                    case 'down':
                        target.pos.y >= self.pos.y ? targets.push(target):null;break;
                    case 'up':
                        target.pos.y <= self.pos.y ? targets.push(target):null;break;
                }
            }
        });
        return targets;
    }
});