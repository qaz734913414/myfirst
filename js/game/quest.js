var questArray = [
    {
        "name":"睡梦中",
        "content": ["睡梦中。。。","很久很久以前，青青世界富足而兴旺。在世界的西边有一个小镇，叫做青风镇。人们在小镇里快乐而安详地生活着。",
            "舒适的生活让他们渐渐开始忘记那段黑暗的日子：深渊魔王烛龙从地下钻出来，四处作恶，让恐怖和悲伤笼罩整个大地……多亏了一位仙人，历经艰苦的战斗，烛龙才被打败并封印在了地下的最深处……",
            "最近一段时间，青风镇出现了一些异常。小镇周围开始出现大量的魔物，动物也变得狂躁不安并开始攻击人类。许多村民不得不离开村庄，",
            "但还是有一部分人留了下来，他们期待着仙人再次的出现，期待着黎明的到来。"],
        "finish":[],
        "briefing":["睡梦中。。。"],
        "npc":"",
        "condition":undefined,
        "reward1":undefined,
        "reward2":undefined
    },
    {
        "name":"青风镇",
        "content": [
            "我：这是什么地方？我怎么会在这里！",
            "张虎∶这里是青风镇，村长爷爷在海边发现了你，把你救回来的。你昏迷了3天，一直在说梦话。",
            "我∶青风镇！在海边？我怎么一点也想不起来了，我好像什么都忘记了！",
            "张虎∶噢，对了，村长爷爷说你醒了就过去找他，他有事情要问你，村长爷爷家就在后面。",
            "我∶嗯，我这就过去，或许能知道些我的事！"],
        "finish":["完成后说明"],
        "briefing":["找人问问这是哪里"],
        "npc":"张虎",
        "condition":function(){return true;},
        "reward1":function(){storage.setQuestIndex();},
        "reward2":function(){}
    },
    {
        "name":"村长",
        "content": [
            "村长∶欢迎来到青风镇，年轻人。我是村长墨智，已经好久没有外人来了，昨晚的祈祷看来真的起了作用，可你是。。。，还是很欢迎你的到来。",
            "村长∶从我小的时候开始，青风镇就是这块大陆上最平静得小镇。居住在镇里的人们在这儿快乐安详地生活。",
            "村长∶村子所在的这片土地属于司徒墨领主。我是他的管家，他是一位很有抱负的人，小镇的繁荣多亏了他的帮助。",
            "村长∶可是，一年前，自从司徒领主闭关修炼之后，村庄周围出现了大量的魔物。就连平日温顺的动物，都变得狂暴起来。村民失踪和死亡事件不断，人们纷纷离开了这个地方。",
            "村长∶作为村长，眼看着这些事情发生，却无能为力，真的感到十分痛苦。年轻人，不知道你可否在这里待上一段时间，看看能不能找到些线索？",
            "我∶村长，这些我恐怕帮不了，我自己都不清楚我是怎么来到这里的，而且我也没有那个能力。",
            "我∶村长，你在海边发现我时，还有其他什么吗？我好像什么都记不起来了，你知道我是怎么来的吗？",
            "村长∶不，我相信你有这个能力，但凡来到这里的外来人都有他的责任，这个不着急，等你安稳下，在重长计议吧。。。",
            "村长∶你的事我也不知道，这个只能你自己来找答案，不过我可以告诉你，当你变得强大的一天时，你会想起来自己是谁的，这点请相信我！（村长摆摆手，不愿多说的样子。）",
            "我∶嗯，那好吧，我如何能变强呢？",
            "村长∶年轻人，等你安稳下来，我会告你的。先去小镇上转转吧，镇上的人知道你的到来，一定会非常高兴的。噢，对了，你以后就和张虎一起住吧。好了，去吧！",
            "得到10金币"
        ],
        "finish":["完成后说明"],
        "briefing":["和村长爷爷长谈一下。。。"],
        "npc":"村长",
        "condition":function(){return true;},
        "reward1":function(){storage.setQuestIndex();},
        "reward2":function(){storage.setGold(10);}
    },
    {
        "name":"拜访药剂师苏珊",
        "content": [
            "苏珊∶你好。你是远道而来的客人吗？虽然眼睛看不见，但我闻到了你身上异乡得气味。我叫苏珊。",
            "苏珊∶我和丈夫原来生活的大陆，人人都懂得怎么配制药剂，以及阅读咒术。虽然双眼失明，但我还是可以拼接嗅觉和味觉制造出上乘的药剂，包括毒药。",
            "我∶你好，很高兴认识你。",
            "得到10金币"
        ],
        "finish":["完成后说明"],
        "briefing":["拜访药剂师苏珊。。。"],
        "npc":"苏珊",
        "condition":function(){return true;},
        "reward1":function(){storage.setQuestIndex();},
        "reward2":function(){storage.setGold(10);}
    },
    {
        "name":"剑客曹一斗",
        "content": [
            "曹一斗：嘿！你是从别的地方来的小子吗？我是一名剑客，我叫曹一斗。你一定听说过我吧？我可是赫赫有名的侠者！哈哈。。。",
            "我∶你好，很高兴认识你。",
            "得到10金币"
        ],
        "finish":["完成后说明"],
        "briefing":["拜访剑客曹一斗。。。"],
        "npc":"曹一斗",
        "condition":function(){return true;},
        "reward1":function(){storage.setQuestIndex();},
        "reward2":function(){storage.setGold(10);}
    },
    {
        "name":"拜访铁匠贪狼",
        "content": [
            "贪狼∶因为出生在和平年代，我是对自己打造的武器和防具没有太多信心！真想找父亲和爷爷再学学！可是他们已经不在了！我叫贪狼！",
            "贪狼∶以后需要武器和防具，就来找我，我会给你优惠的价格！哈哈。。。",
            "我∶很高兴认识你。",
            "得到10金币"
        ],
        "finish":["完成后说明"],
        "briefing":["拜访铁匠贪狼。。。"],
        "npc":"贪狼",
        "condition":function(){return true;},
        "reward1":function(){storage.setQuestIndex();},
        "reward2":function(){storage.setGold(10);}
    },
    {
        "name":"商人钱贵钟",
        "content": [
            "钱贵钟∶小伙子，你要买新什么嘛？我的东西价格都是很贵的哦！我向来不喜欢那些没钱的穷光蛋，以及喜欢砍价的人！一分价格一分货噢！",
            "钱贵钟∶没钱只能在那边喝杯粗茶，哼！我叫钱贵钟。",
            "我∶很高兴认识你。",
            "得到1金币"
        ],
        "finish":["完成后说明"],
        "briefing":["拜访商人钱贵钟。。。"],
        "npc":"钱贵钟",
        "condition":function(){return true;},
        "reward1":function(){storage.setQuestIndex();},
        "reward2":function(){storage.setGold(10);}
    },
    {
        "name":"出去走走",
        "content": [
            "村长∶年轻人，你对这个小镇熟悉一些了吗？接下来，你可以四处走走，到村庄外围去看看。不过一定要小心魔物，他们十分危险。。。",
            "村长∶村民们如果需要你的帮助，会有提示。他们需要你的帮助，一边帮他们的忙，一边找线索。有时候真相就隐藏在村民的任务之中。。。",
            "村长∶你能帮助他们，我非常感谢！这里是100金币，请你到小镇西北方的铁匠贪狼哪里去一趟，选一把武器，装备起来，再来找我吧！",
            "我∶多谢村长，我会尽力的。。。",
            "得到100金币"
        ],
        "finish":["完成后说明"],
        "briefing":["回到村长那里，说说你的感受。。。"],
        "npc":"村长",
        "condition":function(){return true;},
        "reward1":function(){storage.setQuestIndex();},
        "reward2":function(){storage.setGold(100);}
    },
    {
        "name":"第一把剑",
        "content": [
            "贪狼∶老村长让你过来取武器的吗？看来你接收了他的请求！太好了！我这里有一把刚刚打造好的精钢剑，你拿去吧。以后我还会给打造皮甲等之类的防具。",
            "贪狼∶我争取打造出好的东西给你！不过不知道能不能超过父亲和爷爷的手艺！。",
            "贪狼∶我爷爷还在就好了！他经历过战争的年代，听说还曾经为仙人打造过武器呢！",
            "贪狼∶我的家族世世代代都是这里的铁匠，我希望我从父亲和爷爷那里继承到了一个出色铁匠应该具备的实力。。。！",
            "我∶嗯，你一定可以的！",
            "贪狼∶好了，你回去见村长吧！",
            "获得精钢剑。"
        ],
        "finish":["完成后说明"],
        "briefing":["去贪狼那获得第一把武器。。。"],
        "npc":"贪狼",
        "condition":function(){return true;},
        "reward1":function(){
            evtps.pub([topic.player_notice_change],["你获得了精钢剑"]);
            storage.setArmor(1);
            window.setTimeout(function(){storage.setQuestIndex();},3000);
        },
        "reward2":function(){}
    },
    {
        "name":"侠者",
        "content": [
            "村长∶不错！看你拿武器的样子，就是一个有经验侠者！",
            "我∶不，村长，其实我什么都不懂！",
            "村长∶不用着急，我说过，你会变得强大起来的！也许你只是忘记了，以后慢慢会想起来的。",
            "村长∶曹一斗，是镇里唯一的剑客，你去找他吧，他会教你一招半式，（小声说道）其实不是不教，是他交不了，咳咳。。。",
            "我∶嗯，谢谢村长，我会认真学习得！",
            "村长∶你不用这么客气，以后村子还要靠你的。。。，好了，你去吧！"
        ],
        "finish":["完成后说明"],
        "briefing":["回去见村长。。。"],
        "npc":"村长",
        "condition":function(){return true},
        "reward1":function(){storage.setQuestIndex();},
        "reward2":function(){}
    },
    {
        "name":"半月斩",
        "content": [
            "我∶村长，让我过来，向您学习用剑的技巧！",
            "曹一斗∶你做了一个明智的选择，我可是赫赫有名的剑侠，侠客！我可不是吹牛哦！我是侠者世家的后代哦！",
            "曹一斗∶我曾经杀过一条恶龙，他的眼睛和山洞一样大！",
            "曹一斗∶你不信吗？你真的不信吗？？",
            "曹一斗∶曾经我还偷过神的苹果，那个苹果和山一样大！为了逃脱，我和诸神大战了一场！把他们都打败了！",
            "曹一斗∶什么？你还不信吗？",
            "曹一斗∶不信就算了！",
            "曹一斗∶我现在就教你一式剑招，名为“半月斩”，仔细看清楚了！",
            "曹一斗∶咦！这么快就学会了，仔细看着面前的少年。。。镇子外面有很多魔物，你也需要了解一下怎么才能和他们展开战斗，尝试到村子外面去消灭一些吧。",
            "曹一斗∶按J键可以施展半月斩。生命不够的时候，一定不要恋战，跑的越远越好。",
            "我∶多谢曹剑侠！"
        ],
        "finish":["完成后说明"],
        "briefing":["向曹一斗学习用剑，然后消灭1个树精灵，向他展示学习成果"],
        "npc":"曹一斗",
        "condition":function(){
            if(storage.QuestTmpTreeElvesNum>=1){
                return true;
            }
        },
        "reward1":function(){
            evtps.pub([topic.player_notice_change],["您学会了半月斩，按J键施展"]);
            storage.setByz();
            window.setTimeout(function(){evtps.pub([topic.player_notice_change],["消灭1个树精灵，向曹一斗展示学习成果"]);},3000);

            storage.QuestTmpTreeElvesFun = function(enemy){
                if(enemy.name == "TreeElves"){
                    if(storage.QuestTmpTreeElvesNum){
                        storage.QuestTmpTreeElvesNum++;
                    }else{
                        storage.QuestTmpTreeElvesNum = 1;
                    }
                }
            };
            evtps.sub(topic.player_kill_enemy,storage.QuestTmpTreeElvesFun);
        },
        "reward2":function(){
            storage.setQuestIndex();
            storage.QuestTmpTreeElvesNum = undefined;
            evtps.unsub(topic.player_kill_enemy,storage.QuestTmpTreeElvesFun,function(){
                storage.QuestTmpTreeElvesFun = undefined;
            });
        }
    },
    {
        "name":"变强的方法，战斗！",
        "content": [
            "村长∶不错，看来你已经知道怎样与魔物进行战斗了。这里是100金币，作为对你的奖励。",
            "村长∶你不是一直想知道如何使自己变强嘛，就是不断的同这些魔物战斗，在和这些魔物战斗以后，你会提升自己得等级。",
            "村长∶每当等级提升1级，你的各方面属性值都会提高，并且会得到2个技能点，用他来增加技能等级，使技能更厉害。",
            "我∶嗯，谢谢村长，我会继续努力的！"
        ],
        "finish":["完成后说明"],
        "briefing":["村长找你谈谈变强的方法。。。"],
        "npc":"村长",
        "condition":function(){return true},
        "reward1":function(){storage.setQuestIndex();},
        "reward2":function(){}
    },
    {
        "name":"男人间的打赌！",
        "content": [
            "曹一斗∶你现在有了一些本事，不过，哼哼，想象我一样屠龙的话，还是太早了点呢！",
            "曹一斗∶这样吧，我和你打个赌！你能杀掉100只树精灵，我就把我的成名绝技交给你！要是不行的话，以后你都要叫我大哥哦！勉强做我的跟班吧。怎么样？敢接受我的挑战吗？",
            "我∶我想我可以尝试一下。",
            "曹一斗∶哼哼！打赌我从来就没有输过哦！那就等你的消息了！"
        ],
        "finish":["完成后说明"],
        "briefing":["曹一斗要同你进行男人间的打赌。。。"],
        "npc":"曹一斗",
        "condition":function(){
            if(storage.QuestTmpTreeElvesNum>=100){
                return true;
            }
        },
        "reward1":function(){
            window.setTimeout(function(){evtps.pub([topic.player_notice_change],["消灭100个树精灵，完成和曹一斗的赌约"]);},3000);
            storage.QuestTmpTreeElvesFun = function(enemy){
                if(enemy.name == "TreeElves"){
                    if(storage.QuestTmpTreeElvesNum){
                        storage.QuestTmpTreeElvesNum++;
                    }else{
                        storage.QuestTmpTreeElvesNum = 1;
                    }
                }
            };
            evtps.sub(topic.player_kill_enemy,storage.QuestTmpTreeElvesFun);
        },
        "reward2":function(){
            storage.setQuestIndex();
            storage.QuestTmpTreeElvesNum = undefined;
            evtps.unsub(topic.player_kill_enemy,storage.QuestTmpTreeElvesFun,function(){
                storage.QuestTmpTreeElvesFun = undefined;
            });
        }
    }
];
var questTrigger = me.Entity.extend({
    init : function init(x, y, settings) {
        this._super(me.Entity, 'init', [x, y , settings]);
        this.body.collisionType = me.collision.types.NPC_OBJECT;
        this.body.gravity = 0;
		this.freshtime = 500;
		this.hasQuest = false;
        var texture =  new me.video.renderer.Texture({framewidth:32, frameheight:32}, me.loader.getImage('quest_point'));
        this.renderable = texture.createAnimationFromName([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]);
        this.renderable.addAnimation ("show", [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38],50);
		this.renderable.addAnimation ("hide", [40]);
		this.renderable.setCurrentAnimation("hide");
    },
    hasQuest:function(){
        for (var i = 0; i < this.indexs.length; i++) {
            if (this.indexs[i] == storage.data.quest.index) {
                return true;
            }
        }
        return false;
    },
	update : function (dt) {
		this.freshtime-=dt;
		if(this.freshtime<=0){
			this.freshtime=3000;

			if(this.hasQuest()){
				if (!this.renderable.isCurrentAnimation("show")) {
					this.renderable.setCurrentAnimation("show");
				}
			}else{
				if (!this.renderable.isCurrentAnimation("hide")) {
					this.renderable.setCurrentAnimation("hide");
				}
			}
		}
		return (this._super(me.Entity, 'update', [dt]));
	},
    onCollision : function (response, other) {
        if(other.body.collisionType == 1 && storage.dlging == false){
            if(this.hasQuest()){
                var curQuest = storage.data.quest;
                var questObj = questArray[curQuest.index];
				if(curQuest.state ==0){
					storage.setQuestState(1);
					new dialogContainer(questObj.content, function dialogClosed() {
						if($.isFunction(questObj.reward1)){
							questObj.reward1();
						};
					});
				}else if(curQuest.state ==1){
					if((questObj.condition)()){
						new dialogContainer(['你完成了任务！'], function dialogClosed() {
							if($.isFunction(questObj.reward2)){
								questObj.reward2();
							};
						});

					}else{
						new dialogContainer(questObj.briefing);
					}
				}
            }
        }
        return false;
    }
});
var questEntity = {
    "ZhangHu" : questTrigger.extend({
        init: function (x, y, settings){
            this.indexs = [1];
            settings.name='张虎';
            this._super(questTrigger, 'init', [x, y , settings]);
        }
    }),
    "LuoCunZhang" : questTrigger.extend({
        init: function (x, y, settings){
            this.indexs = [2,7,9,11];
            settings.name='罗村长';
            this._super(questTrigger, 'init', [x, y , settings]);
        }
    }),
    "SuShan" : questTrigger.extend({
        init: function (x, y, settings){
            this.indexs = [3];
            settings.name='苏珊';
            this._super(questTrigger, 'init', [x, y , settings]);
        }
    }),
    "CaoYiDou" : questTrigger.extend({
        init: function (x, y, settings){
            this.indexs = [4,10,12];
            settings.name='曹一斗';
            this._super(questTrigger, 'init', [x, y , settings]);
        }
    }),
    "TanLang" : questTrigger.extend({
        init: function (x, y, settings){
            this.indexs = [5,8];
            settings.name='贪狼';
            this._super(questTrigger, 'init', [x, y , settings]);
        }
    }),
    "QianZhongGui" : questTrigger.extend({
        init: function (x, y, settings){
            this.indexs = [6];
            settings.name='钱贵钟';
            this._super(questTrigger, 'init', [x, y , settings]);
        }
    })
};
