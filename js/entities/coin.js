var coinEntity = me.CollectableEntity.extend({
    init: function (x, y, settings){
		settings.image="coingold";
		settings.spritewidth=18;
		settings.spriteheight=21;
		settings.width=18;
		settings.height=21;
		var nx = Math.round((5-Math.random()*10)*5);
		var ny = Math.round((5-Math.random()*10)*5);
        this._super(me.CollectableEntity, 'init', [x+nx, y+ny , settings]);
		me.game.world.addChild(this,settings.z-1);
    },
    onCollision : function (response, other) {
        if(other.body.collisionType == 1){
			me.audio.play("cling");
			storage.setGold(10);
			this.body.setCollisionMask(me.collision.types.NO_OBJECT);
			me.game.world.removeChild(this);
		}
        return false;
    }
});