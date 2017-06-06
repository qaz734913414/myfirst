var playScreen = me.ScreenObject.extend({
	onResetEvent: function() {
        var self = this;
        var map = 'xiaoshu_fangjian';

        me.game.onLevelLoaded = function onLevelLoaded() {
            self.onLevelLoaded();
        };
        if(storage.hasAlreadyPlayed()){
            map = storage.data.player.map;
        }
        me.levelDirector.loadLevel(map);
	},
    onLevelLoaded : function() {
        if(storage.data.quest.state == 1){
            if(questArray[storage.data.quest.index].reward1){
                questArray[storage.data.quest.index].reward1();
            }
        }
        var taoist = me.game.world.getChildByProp('id','taoist')[0];
        if(storage.hasAlreadyPlayed()){
            if(storage.data.player.xyz.x && storage.data.player.xyz.y){
                taoist.pos._x = storage.data.player.xyz.x;
                taoist.pos._y = storage.data.player.xyz.y;
            }
        }else{
            storage.initPlayer(taoist.id);
            storage.setXYZ({x:taoist.pos._x,y:taoist.pos._y,z:taoist.z});
            taoist.renderable.setOpacity(0);
            storage.sleepSprite = new me.Sprite(59,225,{image: me.loader.getImage('sleep')});
            me.game.world.addChild(storage.sleepSprite,4);
            new dialogContainer(questArray[0].content,function dialogClosed(){
                storage.setQuestIndex();
                me.game.world.removeChildNow(storage.sleepSprite);
                taoist.renderable.setOpacity(1);
                storage.sleepSprite = null;
            });
        }
    },
	onDestroyEvent: function() {
	}
});
