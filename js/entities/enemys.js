var enemysObj = {
    "TreeElves" : enemyEntity.extend({
        init: function (x, y, settings){
            this.name='TreeElves';
			this.lvl=settings.lvl||storage.data.player.lvl;
			this.hp = 6*this.lvl;
			
			this.defense=this.lvl;
			this.attack_dmg=this.lvl;
			settings.attackRange = 42;
			settings.name= this.name;
            settings.texture = {name:'treeelves',images:['01.png','02.png','03.png','04.png','05.png','06.png','07.png','09.png'],idle:[0,1,2,3,4,5,6],walk:[0,1,2,3,4,5,6],attacking:[0,4],hit:[7]};
			
            this._super(enemyEntity, 'init', [x, y , settings]);
        },
		attack: function(target) {
			this.renderable.setCurrentAnimation("attacking");
			target.damage(this.attack_dmg, this);
			return true;
		}
	}),
    "WereWolf" : enemyEntity.extend({
        init: function (x, y, settings){
            this.name='WereWolf';
            this.lvl=settings.lvl||storage.data.player.lvl;
            this.hp = 14*this.lvl;

            this.defense=2+this.lvl;
            this.attack_dmg=2+this.lvl;
            settings.attackRange = 42;
            settings.name= this.name;
            settings.texture = {name:'werewolf',speed:30,images:['B01.png','B02.png','B03.png','B04.png','B05.png','B06.png','B07.png','B08.png','B09.png','B10.png','B11.png','B12.png','B13.png','B14.png','B15.png','B16.png','B17.png','B18.png','B19.png','B20.png','B21.png','B22.png','B23.png','B24.png','B25.png','B26.png','B27.png','B28.png','B29.png','B30.png','B31.png','B32.png','B33.png','B34.png','B35.png'],idle:[0],walk:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],attacking:[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],hit:[34]};
            settings.flipX = true;
            this._super(enemyEntity, 'init', [x, y , settings]);
        },
        attack: function(target) {
            this.renderable.setCurrentAnimation("attacking");
            target.damage(this.attack_dmg, this);
            return true;
        }
    }),
    "Elf" : enemyEntity.extend({
        init: function (x, y, settings){
            this.name='Elf';
            this.lvl=settings.lvl||storage.data.player.lvl;
            this.hp = 20*this.lvl;

            this.defense=4+this.lvl;
            this.attack_dmg=8+this.lvl;
            settings.attackRange = 50;
            settings.name= this.name;
            settings.texture = {name:'elf',speed:30,images:['B01.png','B02.png','B03.png','B04.png','B05.png','B06.png','B07.png','B08.png','B09.png','B10.png','B11.png','B12.png','B13.png','B14.png','B15.png','B16.png','B17.png','B18.png','B19.png','B20.png','B21.png','B22.png','B23.png','B24.png','B25.png','B26.png','B27.png','B28.png','B29.png','B30.png','B31.png','B32.png','B33.png'],idle:[0],walk:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],attacking:[17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],hit:[32]};
            settings.flipX = true;
            this._super(enemyEntity, 'init', [x, y , settings]);
        },
        attack: function(target) {
            this.renderable.setCurrentAnimation("attacking");
            target.damage(this.attack_dmg, this);
            return true;
        }
    })
};
