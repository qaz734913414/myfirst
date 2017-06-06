var storage;
var initApp = function() {
		var app = new App();
		app.center();
		if(Detect.isWindows()) {
			// Workaround for graphical glitches on text
			$('body').addClass('windows');
		}
		
		if(Detect.isOpera()) {
			// Fix for no pointer events
			$('body').addClass('opera');
		}
	
		$('body').click(function(event) {
			if($('#parchment').hasClass('credits')) {
				app.toggleCredits();
			}
			
			if($('#parchment').hasClass('about')) {
				app.toggleAbout();
			}
		});

		$('.barbutton').click(function() {
			$(this).toggleClass('active');
		});

		$('#chatbutton').click(function() {
			if($('#chatbutton').hasClass('active')) {
				app.showChat();
			} else {
				app.hideChat();
			}
		});

		$('#helpbutton').click(function() {
			app.toggleAbout();
		});

		$('#achievementsbutton').click(function() {
			app.toggleAchievements();
			if(app.blinkInterval) {
				clearInterval(app.blinkInterval);
			}
			$(this).removeClass('blink');
		});

		$('#instructions').click(function() {
			app.hideWindows();
		});
		
		$('#playercount').click(function() {
			app.togglePopulationInfo();
		});
		
		$('#population').click(function() {
			app.togglePopulationInfo();
		});

		$('.clickable').click(function(event) {
			event.stopPropagation();
		});

		$('#toggle-credits').click(function() {
			app.toggleCredits();
		});

		$('#create-new span').click(function() {
			app.animateParchment('loadcharacter', 'confirmation');
		});

		$('.delete').click(function() {
			storage.clear();
			app.animateParchment('confirmation', 'createcharacter');
		});

		$('#cancel span').click(function() {
			app.animateParchment('confirmation', 'loadcharacter');
		});
		
		$('.ribbon').click(function() {
			app.toggleAbout();
		});

		$('#nameinput').bind("keyup", function() {
			app.toggleButton();
		});

		$('#previous').click(function() {
			var $achievements = $('#achievements');
	
			if(app.currentPage === 1) {
				return false;
			} else {
				app.currentPage -= 1;
				$achievements.removeClass().addClass('active page' + app.currentPage);
			}
		});

		$('#next').click(function() {
			var $achievements = $('#achievements'),
				$lists = $('#lists'),
				nbPages = $lists.children('ul').length;
	
			if(app.currentPage === nbPages) {
				return false;
			} else {
				app.currentPage += 1;
				$achievements.removeClass().addClass('active page' + app.currentPage);
			}
		});

		//$('#notifications div').bind(TRANSITIONEND, app.resetMessagesPosition.bind(app));
		$('#notifications div').bind('transitionend webkitTransitionEnd oTransitionEnd', app.resetMessagesPosition.bind(app));

		$('.close').click(function() {
			app.hideWindows();
		});
	
		$('.twitter').click(function() {
			var url = $(this).attr('href');

		   app.openPopup('twitter', url);
		   return false;
		});

		$('.facebook').click(function() {
			var url = $(this).attr('href');

		   app.openPopup('facebook', url);
		   return false;
		});

        storage = new storageManager();
		var data = storage.data;
		if(data.hasAlreadyPlayed) {
			if(data.player.name && data.player.name !== "") {
				$('#playername').html(data.player.name);
				$('#playerimage').attr('src','data/img/gui/player1.png');
			}
		}
		
		$('.play div').click(function(event) {
			var nameFromInput = $('#nameinput').val(),
				nameFromStorage = $('#playername').html(),
				name = nameFromInput || nameFromStorage;
			storage.data.player.name = name;
			app.tryStartingGame(name);
		});
	
		document.addEventListener("touchstart", function() {},false);
		
		$('#resize-check').bind("transitionend", app.resizeUi.bind(app));
		$('#resize-check').bind("webkitTransitionEnd", app.resizeUi.bind(app));
		$('#resize-check').bind("oTransitionEnd", app.resizeUi.bind(app));
	
	///================================
	$('#panel').on('click','#p_close',function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		$('#panel').hide();
		$('#panel').html('');
	});
	$('#panel').on('click','#p_swordbuild',function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if(storage.data.player.equip>=5){
			alert('提升到顶级了。。');
		}else if(storage.data.player.equip>0){
			var money = storage.data.player.equip*1000;
			if(storage.data.player.gold>=money){
				storage.data.player.equip++;
				storage.setGold(-money);
				$('#p_sword').attr('src','data/img/gui/sword'+storage.data.player.equip+'.png');
				game.playSoundId('swordbuild');
			}else{
				game.playSoundId('qianbugou');
			}
		}else{
			game.playSoundId('yaonvlile');
		}
	});
	
	$('#panel').on('click','#glj_upgrade',function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if(storage.data.player.skillpoints>0 && storage.data.player.skill.glj>0){
			storage.gljUpgrade();
			game.Hud.setHudSkillPoints(storage.data.player.skillpoints);
			$('#p_glj_lvl').text(storage.data.player.skill.glj);
		}
	});
	$('#panel').on('click','#byz_upgrade',function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if(storage.data.player.skillpoints>0 && storage.data.player.skill.byz>0){
			storage.byzUpgrade();
			game.Hud.setHudSkillPoints(storage.data.player.skillpoints);
			$('#p_byz_lvl').text(storage.data.player.skill.byz);
		}
	});
	$('#panel').on('click','#jfc_img',function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if(storage.data.player.skillpoints>0 && storage.data.player.skill.jfc>0){
			storage.jfcUpgrade();
			game.Hud.setHudSkillPoints(storage.data.player.skillpoints);
			$('#p_jfc_lvl').text(storage.data.player.skill.jfc);
		}
	});
	$('#panel').on('click','#hds_img',function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if(storage.data.player.skillpoints>0 && storage.data.player.skill.hds>0){
			storage.hdsUpgrade();
			game.Hud.setHudSkillPoints(storage.data.player.skillpoints);
			$('#p_hds_lvl').text(storage.data.player.skill.hds);
		}
	});
	$('#panel').on('click','#bgl_img',function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if(storage.data.player.skillpoints>0 && storage.data.player.skill.bgl>0){
			storage.bglUpgrade();
			game.Hud.setHudSkillPoints(storage.data.player.skillpoints);
			$('#p_bgl_lvl').text(storage.data.player.skill.bgl);
		}
	});
	$('#character').on('click','img',function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if($('#panel').html() != ''){
			return;
		}
		
		$('#panel').load('panel.html',function(){
			$('#prestige').text(game.Hud.prestiges[Math.ceil(storage.data.player.lvl/2)-1]);
			$('#p_sword').attr('src','data/img/gui/sword'+storage.data.player.equip+'.png');
			$('#p_hp').text(Math.round(storage.data.player.hp));
			$('#p_def').text(storage.data.player.defense);
			$('#p_dmg').text(storage.data.player.basicdmg);
			$('#p_speed').text('3');
			
			var questObj = game.quest[storage.data.quest.index];
			var content = questObj.content.join('<br/>');
			$('#curquest_name').text('任务：'+questObj.name);
			$('#curquest_content').html(content);
			
			if(storage.data.player.skillpoints>0){
				game.Hud.setHudSkillPoints(storage.data.player.skillpoints);
			}
			
			storage.data.player.skill.glj>0?$("#glj_img").attr("src","data/img/gui/glj.png"):$("#glj_img").attr("src","data/img/gui/glj_gray.png");
			storage.data.player.skill.byz>0?$("#byz_img").attr("src","data/img/gui/byz.png"):$("#byz_img").attr("src","data/img/gui/byz_gray.png");
			storage.data.player.skill.jfc>0?$("#jfc_img").attr("src","data/img/gui/jfc.png"):$("#jfc_img").attr("src","data/img/gui/jfc_gray.png");
			storage.data.player.skill.hds>0?$("#hds_img").attr("src","data/img/gui/hds.png"):$("#hds_img").attr("src","data/img/gui/hds_gray.png");
			storage.data.player.skill.bgl>0?$("#bgl_img").attr("src","data/img/gui/bgl.png"):$("#bgl_img").attr("src","data/img/gui/bgl_gray.png");
			
			$('#p_glj_lvl').text(storage.data.player.skill.glj);
			$('#p_byz_lvl').text(storage.data.player.skill.byz);
			$('#p_jfc_lvl').text(storage.data.player.skill.jfc);
			$('#p_hds_lvl').text(storage.data.player.skill.hds);
			$('#p_bgl_lvl').text(storage.data.player.skill.bgl);
			$(this).show();
		});
	});
//=========================
		log.info("App initialized.");
	
		initGame(app);
};

var initGame = function(app) {
		var input = document.getElementById("chatinput");
		var gamem = new gameManager(app);
		//gamem.setup('#bubbles', canvas, background, foreground, input);
		app.setGame(gamem);
		//if(app.isDesktop && app.supportsWorkers) {
			gamem.loadres();
		//}
		
		gamem.onDisconnect(function(message) {
			$('#death').find('p').html(message+"<em>Please reload the page.</em>");
			$('#respawn').hide();
		});

		gamem.onPlayerDeath(function() {
			if($('body').hasClass('credits')) {
				$('body').removeClass('credits');
			}
			$('body').addClass('death');
		});

		gamem.onPlayerEquipmentChange(function() {
			app.initEquipmentIcons();
		});

		gamem.onPlayerInvincible(function() {
			$('#hitpoints').toggleClass('invincible');
		});

		gamem.onNbPlayersChange(function(worldPlayers, totalPlayers) {
			var setWorldPlayersString = function(string) {
					$("#instance-population").find("span:nth-child(2)").text(string);
					$("#playercount").find("span:nth-child(2)").text(string);
				},
				setTotalPlayersString = function(string) {
					$("#world-population").find("span:nth-child(2)").text(string);
				};
			
			$("#playercount").find("span.count").text(worldPlayers);
			
			$("#instance-population").find("span").text(worldPlayers);
			if(worldPlayers == 1) {
				setWorldPlayersString("player");
			} else {
				setWorldPlayersString("players");
			}
			
			$("#world-population").find("span").text(totalPlayers);
			if(totalPlayers == 1) {
				setTotalPlayersString("player");
			} else {
				setTotalPlayersString("players");
			}
		});

		gamem.onAchievementUnlock(function(id, name, description) {
			app.unlockAchievement(id, name);
		});

		gamem.onNotification(function(message) {
			app.showMessage(message);
		});

		app.playerHpChange(storage.data.player.hp,storage.maxHp());

		$('#nameinput').attr('value', '');
		$('#chatbox').attr('value', '');
		
		if(app.mobile || app.tablet) {
			$('#foreground').bind('touchstart', function(event) {
				app.center();
				app.setMouseCoordinates(event.originalEvent.touches[0]);
				//gamem.click();
				app.hideWindows();
			});
		} else {
			$('#foreground').click(function(event) {
				app.center();
				//app.setMouseCoordinates(event);
				if(game) {
					//gamem.click();
				}
				app.hideWindows();
				// $('#chatinput').focus();
			});
		}

/*		$('body').unbind('click');
		$('body').click(function(event) {
			var hasClosedParchment = false;
			
			if($('#parchment').hasClass('credits')) {
				if(gamem.started) {
					app.closeInGameCredits();
					hasClosedParchment = true;
				} else {
					app.toggleCredits();
				}
			}
			
			if($('#parchment').hasClass('about')) {
				if(gamem.started) {
					app.closeInGameAbout();
					hasClosedParchment = true;
				} else {
					app.toggleAbout();
				}
			}
			
			if(gamem.started && !gamem.renderer.mobile && gamem.player && !hasClosedParchment) {
				gamem.click();
			}
		});*/
		
		$('#respawn').click(function(event) {
			gamem.playerRevive();
			$('body').removeClass('death');
		});
		
/*		$(document).mousemove(function(event) {
			//app.setMouseCoordinates(event);
			if(gamem.started) {
				gamem.movecursor();
			}
		});*/

		$(document).keydown(function(e) {
			var key = e.which,
				$chat = $('#chatinput');

			if(key === 13) {
				if($('#chatbox').hasClass('active')) {
					app.hideChat();
				} else {
					app.showChat();
				}
			}
		});
		
		$('#chatinput').keydown(function(e) {
			var key = e.which,
				$chat = $('#chatinput');

			if(key === 13) {
				if($chat.attr('value') !== '') {
					if(gamem.player) {
						gamem.say($chat.attr('value'));
					}
					$chat.attr('value', '');
					app.hideChat();
					$('#foreground').focus();
					return false;
				} else {
					app.hideChat();
					return false;
				}
			}
			
			if(key === 27) {
				app.hideChat();
				return false;
			}
		});

		$('#nameinput').keypress(function(event) {
			var $name = $('#nameinput'),
				name = $name.attr('value');

			if(event.keyCode === 13) {
				if(name !== '') {
					app.tryStartingGame(name, function() {
						$name.blur(); // exit keyboard on mobile
					});
					return false; // prevent form submit
				} else {
					return false; // prevent form submit
				}
			}
		});
		
		$('#mutebutton').click(function() {
			gamem.audioManager.toggle();
		});
		$(document).bind("keydown", function(e) {
			var key = e.which,
				$chat = $('#chatinput');

			if($('#chatinput:focus').size() == 0 && $('#nameinput:focus').size() == 0) {
				if(key === 13) { // Enter
					if(gamem.ready) {
						$chat.focus();
						return false;
					}
				}
				if(key === 27) { // ESC
					app.hideWindows();
/*					_.each(gamem.player.attackers, function(attacker) {
						attacker.stop();
					});*/
					return false;
				}
			} else {
				if(key === 13 && gamem.ready) {
					$chat.focus();
					return false;
				}
			}
		});
		
		if(app.tablet) {
			$('body').addClass('tablet');
		}
};
$(window).load(function() {
	document.querySelector('body').className += ' upscaled';
	var parchment = document.getElementById("parchment");
	if(!Detect.supportsWebSocket()) {
		parchment.className = "error";
	}
	
	if(!Modernizr.localstorage) {
		var alert = document.createElement("div");
			alert.className = 'alert';
			alertMsg = document.createTextNode("You need to enable cookies/localStorage to play BrowserQuest");
			alert.appendChild(alertMsg);
	
		target = document.getElementById("intro");
		document.body.insertBefore(alert, target);
	} else if(localStorage && localStorage.data) {
		parchment.className = "loadcharacter";
	}
	Detect.healthMaxWidth = $("#healthbar").width() - (12 * Detect.scale);
	initApp();
});