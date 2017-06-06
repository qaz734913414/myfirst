var storageManager = Object.extend({
	init: function() {
        this.playerArmy = [];
        this.baddies = [];
        this.willAddEnemys = [];
        this.AutoAddEnemy;
        this.dlging = false;
        this.stopped = false;
        this.prestiges = ['一介草民','初出江湖','无名小辈','默默无闻','初生牛犊','碌碌无为','后起之秀','初显锋芒','小有名气','突飞猛进','青云直上','声名鹊起','锋芒毕露','盛气凌人','前途无量','风华正茂','名列前茅','鹤立鸡群','名声显赫','身经百战','举足轻重','锐不可当','中流砥柱','首屈一指','独当一面','卓尔不群','超世绝伦','威风八面','名震一时','风云人物','如雷贯耳','威震九州','声振环宇','人中之龙','名扬天下','功成名遂','傲视群雄','绝世超伦','德高望重','一代宗师','笑傲江湖','盖世英雄','举世无双','名留青史','震古烁今','空前绝后','旷世神话','流芳百世','战无不胜','一统江湖'];
		this.data={
			hasAlreadyPlayed: false,
			player: {
				id:"",
				name: "",
				lvl:1,
				hp:10,
				defense:1,
				basicdmg:3,
				gold:0,
				exp:0,
				map:"xiaoshu_fangjian",
				xyz:{},
				skill:{glj:0,byz:0,jfc:0,hds:0,bgl:0},
				skillpoints:0
			},
			quest: {index:0,state:0},
            armor:0
		};
        if(this.hasLocalStorage()){
            if(window.localStorage.data) {
                this.data = JSON.parse(window.localStorage.data);
            }
            evtps.pub(topic.player_lvl_change,[this.data.player.lvl]);
            evtps.pub(topic.player_hp_change,[this.data.player.hp,this.maxHp()]);
            evtps.pub(topic.player_armor_change,[this.data.armor]);
            evtps.pub(topic.player_notice_change,[questArray[this.data.quest.index].briefing[0]]);
            //evtps.pub(topic.player_exp_change,[this.data.player.exp]);
        }else{
            alert('您的浏览器不支持LocalStorage存储，游戏不会保存，建议使用Chrome。');
        }
	},
	hasLocalStorage: function() {
		return Modernizr.localstorage;
	},
    resetData: function() {
        this.data={
            hasAlreadyPlayed: false,
            player: {
                id:"",
                name: "",
                lvl:1,
                hp:10,
                defense:1,
                basicdmg:3,
                gold:0,
                exp:0,
                map:"xiaoshu_fangjian",
                xyz:{},
                skill:{glj:0,byz:0,jfc:0,hds:0,bgl:0},
                skillpoints:0
            },
            quest: {index:0,state:0},
            armor:0
        };
    },
    resetLevelData:function(){
        this.playerArmy = [];
        this.baddies = [];
        this.AutoAddEnemy =[];
        clearInterval(this.AutoAddEnemy);
    },
    save:function(){
        window.localStorage.data = JSON.stringify(this.data);
    },
	clear: function() {
		if(this.hasLocalStorage()) {
			localStorage.data = "";
			this.resetData();
		}
	},
	hasAlreadyPlayed: function() {
		return this.data.hasAlreadyPlayed;
	},

	initPlayer: function(id) {
		this.data.hasAlreadyPlayed = true;
		this.data.player.id = id;
        this.save();
	},

    setQuestState: function(state) {
        this.data.quest.state=state;
        this.save();
        evtps.pub([topic.player_notice_change],[questArray[this.data.quest.index].briefing[0]]);
    },
    setQuestIndex: function() {
        ++this.data.quest.index;
        this.data.quest.state = 0;
        log.debug('this.data.quest.index='+this.data.quest.index);
        log.debug('this.data.quest.state='+this.data.quest.state);
        this.save();
        if(this.data.quest.index<questArray.length){
            evtps.pub([topic.player_notice_change],[questArray[this.data.quest.index].briefing[0]]);
        }
    },
    setArmor: function(n) {
        this.data.armor = n;
        this.save();
        evtps.pub([topic.player_armor_change],[n]);
    },
    lvlUP: function() {
        var curHp = this.data.player.hp;
        var lvl = ++this.data.player.lvl;
        me.audio.play('laichangshixiayigejieduan',false);
		this.data.player.hp += 2;
		this.data.player.defense += 1;
		this.data.player.basicdmg += 2;
		this.data.player.skillpoints+=1;
        this.save();
        var mxahp = this.maxHp();
        evtps.pub([topic.player_lvl_change],[lvl]);
        evtps.pub([topic.player_hp_change],[curHp,mxahp]);
    },
    maxHp:function(){
      return 10+(this.data.player.lvl-1)*2;
    },
    giveHp: function(hp) {
        var curHp = this.data.player.hp;
		var lvlhp = this.maxHp();
		var hp = lvlhp*0.05;
		var tmphp = this.data.player.hp+hp;
		if(tmphp>=lvlhp){
			this.data.player.hp=lvlhp;
			this.stopHeartBeat();
		}else{
			this.data.player.hp=tmphp; 
		}
        this.save();
        evtps.pub([topic.player_hp_change],[curHp,storage.data.player.hp]);
        return this.data.player.hp;
    },
    cutHp: function(hp) {
		var shanghai = hp - this.data.player.defense;
		hp = shanghai<=1?1:shanghai;
		var tmphp = this.data.player.hp-hp;
       	this.data.player.hp=tmphp<0?0:tmphp;
        this.save();
        evtps.pub([topic.player_hp_change],[storage.data.player.hp,storage.maxHp()]);
    },
    flaskHp: function() {
        var lvlhp = this.maxHp();
        var tmphp = this.data.player.hp+lvlhp*0.3;
        if(tmphp>=lvlhp){
            this.data.player.hp=lvlhp;
        }else{
            this.data.player.hp=tmphp;
        }
        this.save();
        evtps.pub([topic.player_hp_change],[storage.data.player.hp,storage.maxHp()]);
    },
	death:function(){
        evtps.pub([topic.player_death],[]);
		this.stopped = true;
	},
    setGold: function(gold) {
       	this.data.player.gold+=gold;
        this.save();
        evtps.pub([topic.player_gold_change],[storage.data.player.gold]);
    },
    setExp: function(exp) {
        var tmpexp = this.data.player.exp+exp;
		var lvlexp = this.data.player.lvl*10;
		
		if(tmpexp-lvlexp >= 0){
			this.data.player.exp = tmpexp-lvlexp;
			this.lvlUP();
		}else{
			this.data.player.exp = tmpexp;
		}
        this.save();
        evtps.pub([topic.player_exp_change],[storage.data.player.exp]);
    },
    setMap: function(map) {
        this.resetLevelData();
        this.data.player.map=map;
        this.save();
    },
    setXYZ: function(xyz) {
        storage.data.player.xyz=xyz;
        this.save();
    },
    setGlj: function() {
        this.data.player.skill.glj=1;
		game.Hud.setHudGlj();
        this.save();
    },
    setByz: function() {
        this.data.player.skill.byz=1;
        me.input.bindKey(me.input.KEY.J,	"byz");
        this.save();
    },
    setJfc: function() {
        this.data.player.skill.jfc=1;
        me.input.bindKey(me.input.KEY.K,	"jfc");
        this.save();
    },
    setHds: function() {
        this.data.player.skill.hds=1;
        me.input.bindKey(me.input.KEY.L,	"hds");
        this.save();
    },
    setBgl: function() {
        this.data.player.skill.bgl=1;
        me.input.bindKey(me.input.KEY.L,	"bgl");
        this.save();
    },
    gljUpgrade: function() {
		this.data.player.skillpoints--;
        this.data.player.skill.glj++;
        this.save();
    },
    byzUpgrade: function() {
		this.data.player.skillpoints--;
        this.data.player.skill.byz++;
        this.save();
    },
    jfcUpgrade: function() {
		this.data.player.skillpoints--;
        this.data.player.skill.jfc++;
        this.save();
    },
    hdsUpgrade: function() {
		this.data.player.skillpoints--;
        this.data.player.skill.hds++;
        this.save();
    },
    bglUpgrade: function() {
		this.data.player.skillpoints--;
        this.data.player.skill.bgl++;
        this.save();
    }
});