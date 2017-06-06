var gameManager = Object.extend({
	init: function(app) {
        this.app = app;
		this.dlging = false;
		this.playerArmy = [];
		this.baddies = [];
		this.willAddEnemys = [];
		this.debug = false;
		this.ready = false;
		this.started = false;
	},
    // Run on page load.
    loadres: function () {
        if (!me.video.init(Detect.width,Detect.height, {wrapper : "canvas", scale : "false"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        if(this.debug){
            me.plugin.register(me.debug.Panel, "debug");
            me.debug.renderQuadTree = true;
            me.debug.renderHitBox = true;
        }
		me.audio.init("mp3");
		me.loader.onload = this.loaded.bind(this);
        me.loader.preload(resourceArray);
    },

    // Run on game resources loaded.
    loaded : function () {
        me.state.set(me.state.PLAY,new playScreen());
		me.pool.register("mainPlayer",playerEntity);
		me.pool.register("LuoCunZhang",questEntity.LuoCunZhang);
        me.pool.register("CaoYiDou",questEntity.CaoYiDou);
		me.pool.register("QianZhongGui",questEntity.QianZhongGui);
        me.pool.register("ZhangHu",questEntity.ZhangHu);
		me.pool.register("SuShan",questEntity.SuShan);
		me.pool.register("TanLang",questEntity.TanLang);
        me.pool.register("Door",doorEntity);
        me.pool.register("Flare",flareEntity);
        me.pool.register("Explod",explodEntity);
		me.pool.register("Ghost",ghostEntity);
        me.pool.register("TreeElves",enemysObj.TreeElves);
		me.pool.register("WereWolf",enemysObj.WereWolf);
        me.pool.register("Elf",enemysObj.Elf);
		
		me.input.bindKey(me.input.KEY.A,	"left");
		me.input.bindKey(me.input.KEY.W,	"up");
		me.input.bindKey(me.input.KEY.D,	"right");
		me.input.bindKey(me.input.KEY.S,	"down");
		me.input.bindKey(me.input.KEY.ENTER,"enter",true);
		me.input.bindKey(me.input.KEY.SPACE,"action",true);
        me.input.bindKey(me.input.KEY.J,	"byz");
        me.input.bindKey(me.input.KEY.K,	"jfc");
        me.input.bindKey(me.input.KEY.L,	"hds");
		me.input.bindKey(me.input.KEY.U,	"bgl");

        this.ready = true;
    },
	//////////////===========================
	run: function(started_callback) {
		this.connect(started_callback);
	},
	connect: function(started_callback) {
		log.debug('connecting ... ');
		var self = this,
			connecting = false; // always in dispatcher mode in the build version

		//this.client = new GameClient(this.host, this.port);
	
		if(!self.started) {
			self.start();
			started_callback();
		}
	},
	
	onDisconnect: function(callback) {
		this.disconnect_callback = callback;
	},

	onPlayerDeath: function(callback) {
		this.playerdeath_callback = callback;
	},

	onPlayerHealthChange: function(callback) {
		this.playerhp_callback = callback;
	},

	onPlayerHurt: function(callback) {
		this.playerhurt_callback = callback;
	},

	onPlayerEquipmentChange: function(callback) {
		this.equipment_callback = callback;
	},

	onNbPlayersChange: function(callback) {
		this.nbplayers_callback = callback;
	},

	onNotification: function(callback) {
		this.notification_callback = callback;
	},

	onPlayerInvincible: function(callback) {
		this.invincible_callback = callback
	},
	onAchievementUnlock: function(callback) {
		this.unlock_callback = callback;
	},

	tryUnlockingAchievement: function(name) {
		var achievement = null;
		if(name in this.achievements) {
			achievement = this.achievements[name];
		
			if(achievement.isCompleted() && storage.unlockAchievement(achievement.id)) {
				if(this.unlock_callback) {
					this.unlock_callback(achievement.id, achievement.name, achievement.desc);
					this.audioManager.playSound("achievement");
				}
			}
		}
	},

	showNotification: function(message) {
		if(this.notification_callback) {
			this.notification_callback(message);
		}
	},
	start: function() {
		me.state.change(me.state.PLAY);
        storage.AutoAddEnemy = window.setInterval(this.addEnemys,20000);
        this.playMusic();
        this.started = true;
        log.info("Game started.");
	},

	stop: function() {
		log.info("Game stopped.");
		this.isStopped = true;
	},
	//////////////===========================
    playMusic:function() {
        var autoPlayBg = function() {
		    me.audio.play('bg'+Math.floor(Math.random()*12+1),false,function(){window.setTimeout(autoPlayBg,15000);},0.1);
        };
        autoPlayBg();
    },
    //====================-------------
	addEnemys:function() {
		for(var e=0;e<storage.willAddEnemys.length;e++){
			var n = (5-Math.random()* 10)*10;
			me.game.world.addChild(new enemysObj[storage.willAddEnemys[e].param.name](storage.willAddEnemys[e].x+n,storage.willAddEnemys[e].y+n,storage.willAddEnemys[e].param),storage.willAddEnemys[e].param.z);
		};
        storage.willAddEnemys = [];
	},
	playerRevive:function(){
		me.audio.play("jhxywlzj",false);
        var taoist = me.game.world.getChildByProp('id','taoist')[0];
        storage.data.player.hp = storage.maxHp();
        this.app.playerHpChange(storage.data.player.hp,storage.data.player.hp);
        taoist.dead = false;
        storage.stopped = false;
	},
    giveHp: function(hp) {
        var curhp = storage.giveHp(hp);
        if(curhp>=storage.maxHp()){
            this.stopHeartBeat();
        }
    },
    heartBeat: function() {
        var lvlhp = 10+(this.data.player.lvl-1)*2;
        var tmp = lvlhp-this.data.player.hp;
        if(tmp>0 && !this.heartbeatid){
            //this.heartbeatid = window.setInterval(this.giveHp,1000);
        }
    },
    stopHeartBeat: function() {
        if(this.heartbeatid){
            window.clearInterval(this.heartbeatid);
            this.heartbeatid = '';
        }
    }
    //====================-------------
});