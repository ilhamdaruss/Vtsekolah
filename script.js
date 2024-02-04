(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.playAudioList([this.audio_28F099CB_3C9D_5CFE_41C1_C83A3BCCB85E]); this.init(); this.syncPlaylists([this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_21005C89_37E2_4BEB_41B6_16C26E0C39B4].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 1,
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "class": "Player",
 "backgroundPreloadEnabled": true,
 "children": [
  "this.MainViewer",
  "this.Container_24DC39CD_37E2_4D6B_41C2_45CFF5903EF9",
  "this.Container_2518DAD6_37EE_4F79_41C9_7213EB2B1C27"
 ],
 "borderSize": 0,
 "desktopMipmappingEnabled": false,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "buttonToggleFullscreen": "this.IconButton_21005C89_37E2_4BEB_41B6_16C26E0C39B4",
 "scripts": {
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "registerKey": function(key, value){  window[key] = value; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "existsKey": function(key){  return key in window; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "unregisterKey": function(key){  delete window[key]; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "gap": 10,
 "height": "100%",
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_24D3E9CD_37E2_4D6B_41C7_0CEA3640E19D",
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "data": {
  "name": "Player480"
 },
 "overflow": "visible",
 "definitions": [{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E710E7E_70A0_BA49_41D5_0DDA95297436",
 "initialPosition": {
  "yaw": -109.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E710E7E_70A0_BA49_41D5_0DDA95297436",
 "id": "camera_7E70FE7E_70A0_BA49_418B_99F9B9154CFC",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -13.7,
   "backwardYaw": 54.16,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7C821354_6D0E_1199_41B1_47D5ADAC8568"
 ],
 "id": "panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80",
 "thumbnailUrl": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_t.jpg",
 "hfovMin": "150%",
 "label": "Lab. MIPA",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.39,
 "overlays": [
  "this.overlay_6817AB96_6544_11CA_41D0_7C1D8E170F9A"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D76DD91_70A0_BEDA_41CF_195450B4BFF7",
 "initialPosition": {
  "yaw": 152.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D76DD91_70A0_BEDA_41CF_195450B4BFF7",
 "id": "camera_7D76BD91_70A0_BEDA_41B4_66F161CE7D6B",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -3.69,
   "backwardYaw": -60.86,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7D79BE42_6D0E_73F8_41C2_D3D7C02CCDEC"
 ],
 "id": "panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74",
 "thumbnailUrl": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_t.jpg",
 "hfovMin": "150%",
 "label": "Lapangan 2",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 173.18,
 "overlays": [
  "this.overlay_6E3B6916_6544_3EC8_41D3_7C484A54E4E2"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7FD82F0B_70A0_BBCF_41D8_7A8B7A8D1F66",
 "initialPosition": {
  "yaw": 155.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7FD82F0B_70A0_BBCF_41D8_7A8B7A8D1F66",
 "id": "camera_7FD81F0B_70A0_BBCF_41CD_8A26B03E32F4",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "media": "this.panorama_6F33576A_6544_1158_41D4_E86843FB5838",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6F33576A_6544_1158_41D4_E86843FB5838_camera"
  },
  {
   "media": "this.panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_camera"
  },
  {
   "media": "this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_camera"
  },
  {
   "media": "this.panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_camera"
  },
  {
   "media": "this.panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_camera"
  },
  {
   "media": "this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_camera"
  },
  {
   "media": "this.panorama_6E969F63_6544_1149_41AD_20922D73616F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E969F63_6544_1149_41AD_20922D73616F_camera"
  },
  {
   "media": "this.panorama_694244BA_6544_F738_41CE_6EAB048386FD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_694244BA_6544_F738_41CE_6EAB048386FD_camera"
  },
  {
   "media": "this.panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_camera"
  },
  {
   "media": "this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_camera"
  },
  {
   "media": "this.panorama_692014CD_6544_1759_41C0_AA2C828F2669",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_692014CD_6544_1759_41C0_AA2C828F2669_camera"
  },
  {
   "media": "this.panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_camera"
  },
  {
   "media": "this.panorama_69064ED3_6544_3349_41C4_0954964676C5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_69064ED3_6544_3349_41C4_0954964676C5_camera"
  },
  {
   "media": "this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_camera"
  },
  {
   "media": "this.panorama_698A2543_6544_7149_41BF_089F9E80F0F0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_698A2543_6544_7149_41BF_089F9E80F0F0_camera"
  },
  {
   "media": "this.panorama_69A9FB54_6544_714F_41BF_0B406B4318D7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_camera"
  },
  {
   "media": "this.panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_camera"
  },
  {
   "media": "this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_camera"
  },
  {
   "media": "this.panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_camera"
  },
  {
   "media": "this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_camera"
  },
  {
   "media": "this.panorama_688A1867_6544_3F4A_41D7_4653CD783039",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_688A1867_6544_3F4A_41D7_4653CD783039_camera"
  },
  {
   "media": "this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_camera"
  },
  {
   "media": "this.panorama_68A654D0_6544_1746_41D1_F0113F0F99FD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_camera"
  },
  {
   "media": "this.panorama_6B49CA60_6544_1346_4190_6E871F321584",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6B49CA60_6544_1346_4190_6E871F321584_camera"
  },
  {
   "media": "this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_camera"
  },
  {
   "media": "this.panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_camera"
  },
  {
   "media": "this.panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_camera"
  },
  {
   "media": "this.panorama_6B93716E_6544_115A_41CE_B100A60FF51A",
   "camera": "this.panorama_6B93716E_6544_115A_41CE_B100A60FF51A_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 133.59,
   "backwardYaw": 118.75,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B93716E_6544_115A_41CE_B100A60FF51A",
   "distance": 1
  },
  {
   "yaw": 10.85,
   "backwardYaw": 169.74,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D",
   "distance": 1
  },
  {
   "yaw": -83.15,
   "backwardYaw": 9.41,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_6B49CA60_6544_1346_4190_6E871F321584",
 "thumbnailUrl": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_t.jpg",
 "hfovMin": "150%",
 "label": "IMG_3018",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.64,
 "overlays": [
  "this.overlay_6B49DA60_6544_1346_417C_BBD742764EC0",
  "this.overlay_6B49AA60_6544_1346_41D8_0FCEA7E2DD40",
  "this.overlay_6B49BA60_6544_1346_41D1_A480EF0FBC8C",
  "this.overlay_6B498A60_6544_1346_41D2_D351B4C9B7D9",
  "this.overlay_6B496A60_6544_1346_41C0_45348928AA5E",
  "this.overlay_6B497A60_6544_1346_41D0_8B892A60439B",
  "this.overlay_6B495A60_6544_1346_41C1_F814C05A1D84",
  "this.overlay_6B492A60_6544_1346_41D3_EBE821BBDB26",
  "this.overlay_6B493A60_6544_1346_41D4_C2C7658EC050",
  "this.overlay_6B490A60_6544_1346_41BC_45C4C92A7A7E",
  "this.overlay_6B491A60_6544_1346_41D5_FC92BC7F9325",
  "this.overlay_6B4AEA60_6544_1346_41AB_C04DF603B228",
  "this.overlay_6B4AFA60_6544_1346_41C8_A0EF620B95B8",
  "this.overlay_7D7ACAE6_6D05_F030_41DA_775FA6EEBDAB"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -125.88,
   "backwardYaw": -144.51,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2",
   "distance": 1
  },
  {
   "yaw": 165.14,
   "backwardYaw": -27.45,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7F68384E_6D06_1F88_41D2_C3DBF99E06D1"
 ],
 "id": "panorama_694244BA_6544_F738_41CE_6EAB048386FD",
 "thumbnailUrl": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_t.jpg",
 "hfovMin": "150%",
 "label": "Ruang Tamu",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.64,
 "overlays": [
  "this.overlay_694234BA_6544_F738_41D7_D3707CFFCD71",
  "this.overlay_694214BA_6544_F738_41AB_4FF4909F21EE",
  "this.overlay_7D21D873_6D0E_1026_41CF_F0FB99EF3241"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7FC9BF00_70A0_BBB9_41CF_D9C529EA2C9A",
 "initialPosition": {
  "yaw": 25.57,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7FC9BF00_70A0_BBB9_41CF_D9C529EA2C9A",
 "id": "camera_7FC9AF00_70A0_BBB9_41D5_7475951D6CF2",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7EAB4DBE_70A0_BEC9_41D2_D369A216DB13",
 "initialPosition": {
  "yaw": 131.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7EAB4DBE_70A0_BEC9_41D2_D369A216DB13",
 "id": "camera_7EAB3DBE_70A0_BEC9_41C6_0E7F2DB071E4",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D550DA8_70A0_BEC9_41C2_024A9FEA6A8F",
 "initialPosition": {
  "yaw": -91.66,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D550DA8_70A0_BEC9_41C2_024A9FEA6A8F",
 "id": "camera_7D54DDA8_70A0_BEC9_41B1_651F231BCDB7",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7C7E5C93_70A0_BEDF_41CC_2BF1B23930F7",
 "initialPosition": {
  "yaw": -149.77,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7C7E5C93_70A0_BEDF_41CC_2BF1B23930F7",
 "id": "camera_7C7E3C93_70A0_BEDF_41C8_808A373296ED",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7DB72CD9_70A0_BE4B_41D9_A1C4D42FC8BB",
 "initialPosition": {
  "yaw": 161.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7DB72CD9_70A0_BE4B_41D9_A1C4D42FC8BB",
 "id": "camera_7DB71CD9_70A0_BE4B_41C5_09F212BEB1E5",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 70.57,
   "backwardYaw": 58.62,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7FE38219_6D3A_1388_41CC_07F94428523A"
 ],
 "id": "panorama_69A9FB54_6544_714F_41BF_0B406B4318D7",
 "thumbnailUrl": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_t.jpg",
 "hfovMin": "150%",
 "label": "Ruang UKS",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 174.76,
 "overlays": [
  "this.overlay_69A9EB54_6544_714F_41AC_A5069F1CD2CC",
  "this.overlay_69A9DB54_6544_714F_41D2_77F9777FDDF7",
  "this.overlay_69A9CB54_6544_714F_41BD_2263DA132229",
  "this.overlay_69A90B54_6544_714F_41D3_ADB92BF59B86",
  "this.overlay_69A97B54_6544_714F_41CD_A71A8889447A",
  "this.overlay_69A95B54_6544_714F_41D9_16556787FEAF",
  "this.overlay_69A94B54_6544_714F_41CF_50161E2CF23C"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D5B8DB3_70A0_BEDF_41B9_49CC204E0599",
 "initialPosition": {
  "yaw": -121.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D5B8DB3_70A0_BEDF_41B9_49CC204E0599",
 "id": "camera_7D5B7DB3_70A0_BEDF_41C0_E54CA10FAE77",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E9FCDDF_70A0_BE47_41B3_EF59EAC27A48",
 "initialPosition": {
  "yaw": -178.23,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E9FCDDF_70A0_BE47_41B3_EF59EAC27A48",
 "id": "camera_7E9FBDDE_70A0_BE49_41D4_6B17D14B0FC8",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7DECED15_70A0_BFDB_41CA_7D418FC8AC3B",
 "initialPosition": {
  "yaw": -100.87,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7DECED15_70A0_BFDB_41CA_7D418FC8AC3B",
 "id": "camera_7DECBD15_70A0_BFDB_41D0_038D64931EFE",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E479E8F_70A0_BAC7_41D6_6FEE28BCB8AF",
 "initialPosition": {
  "yaw": 96.85,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E479E8F_70A0_BAC7_41D6_6FEE28BCB8AF",
 "id": "camera_7E477E8F_70A0_BAC7_41D3_707A1F6F038F",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 85.7,
   "backwardYaw": 153.75,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE",
   "distance": 1
  },
  {
   "yaw": -92.74,
   "backwardYaw": -154.43,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16",
 "thumbnailUrl": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_t.jpg",
 "hfovMin": "150%",
 "label": "Depan Panggung",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.64,
 "overlays": [
  "this.overlay_685C412B_6544_0ED9_41D1_1755869FE8FA",
  "this.overlay_685C512B_6544_0ED9_41D0_D85B32A3EE74"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -18.29,
   "backwardYaw": -179.84,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_69064ED3_6544_3349_41C4_0954964676C5",
 "thumbnailUrl": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_t.jpg",
 "hfovMin": "150%",
 "label": "Lapangan 1",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 174.84,
 "overlays": [
  "this.overlay_69066ED4_6544_334F_41D0_715533422428"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": -60.86,
   "backwardYaw": -3.69,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74",
   "distance": 1
  },
  {
   "yaw": -4.5,
   "backwardYaw": 48.79,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C",
   "distance": 1
  },
  {
   "yaw": 178.45,
   "backwardYaw": -83.32,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9",
 "thumbnailUrl": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_t.jpg",
 "hfovMin": "150%",
 "label": "Jalan Masuk 2",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 175.09,
 "overlays": [
  "this.overlay_697A53A1_6544_31C8_41B1_D7F6C1A3FA09",
  "this.overlay_697A73A1_6544_31C8_41D3_D8888A4D58CC",
  "this.overlay_697A63A1_6544_31C8_41D5_956963202CDF",
  "this.overlay_697A13A1_6544_31C8_41CF_8DDB9AFD86BE",
  "this.overlay_697A03A1_6544_31C8_41A7_EE38699471D6",
  "this.overlay_697AD3A1_6544_31C8_41CB_2FA849750B60",
  "this.overlay_697AE3A1_6544_31C8_41D2_B1FC99A25D5F"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7F943ED5_70A0_BA5A_41C0_CF1D8AC59D47",
 "initialPosition": {
  "yaw": -131.21,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7F943ED5_70A0_BA5A_41C0_CF1D8AC59D47",
 "id": "camera_7F942ED5_70A0_BA5A_41BE_7243AA7D51E4",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 47.89,
   "backwardYaw": -48.47,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6E969F63_6544_1149_41AD_20922D73616F",
   "distance": 1
  },
  {
   "yaw": -27.45,
   "backwardYaw": 165.14,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_694244BA_6544_F738_41CE_6EAB048386FD",
   "distance": 1
  },
  {
   "yaw": -175.64,
   "backwardYaw": -178.48,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C",
   "distance": 1
  },
  {
   "yaw": 12.08,
   "backwardYaw": 1.77,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01",
 "thumbnailUrl": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_t.jpg",
 "hfovMin": "150%",
 "label": "Lorong Sekolah",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 175.17,
 "overlays": [
  "this.overlay_6E3AB495_6544_17C8_41C3_056E85EC6948",
  "this.overlay_6E3A8495_6544_17C8_41D0_64ABA0441582",
  "this.overlay_6E3A9495_6544_17C8_41AD_1F4B1811F8FD",
  "this.overlay_6E3B6495_6544_17C8_41D6_2190E988FAF7",
  "this.overlay_75BF0AA6_6544_F3A2_4198_3A1EE470D572",
  "this.overlay_74614AAF_6544_13A4_41D3_F9DE1149C573"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7C621C5E_70A0_BE49_41C7_946D04ED1A19",
 "initialPosition": {
  "yaw": -74.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7C621C5E_70A0_BE49_41C7_946D04ED1A19",
 "id": "camera_7C620C5E_70A0_BE49_41D5_C99F791DD66E",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -144.51,
   "backwardYaw": -125.88,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_694244BA_6544_F738_41CE_6EAB048386FD",
   "distance": 1
  },
  {
   "yaw": 72.92,
   "backwardYaw": 30.23,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7EBDD1E4_6D07_F0B8_41B1_209EABEE683E"
 ],
 "id": "panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2",
 "thumbnailUrl": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_t.jpg",
 "hfovMin": "150%",
 "label": "Ruang Kepala Sekolah",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.39,
 "overlays": [
  "this.overlay_6900A91E_6544_3EFB_41D0_1665924F0021",
  "this.overlay_6900D91E_6544_3EFB_4184_1AB71FBA48C6"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E828C37_70A0_BDC7_41B0_3048912150EC",
 "initialPosition": {
  "yaw": 100.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E828C37_70A0_BDC7_41B0_3048912150EC",
 "id": "camera_7E827C37_70A0_BDC7_41DA_AD2F22F68852",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -179.84,
   "backwardYaw": -18.29,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_69064ED3_6544_3349_41C4_0954964676C5",
   "distance": 1
  },
  {
   "yaw": 88.34,
   "backwardYaw": 91.22,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_692014CD_6544_1759_41C0_AA2C828F2669",
   "distance": 1
  },
  {
   "yaw": -83.26,
   "backwardYaw": 76.53,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE",
   "distance": 1
  },
  {
   "yaw": 1.77,
   "backwardYaw": 12.08,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_6EDE69BC_6544_1138_41C0_C31D2380581C",
 "thumbnailUrl": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_t.jpg",
 "hfovMin": "150%",
 "label": "Jalan ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 172.19,
 "overlays": [
  "this.overlay_6EDE79BC_6544_1138_41D5_AF30F97FE3E9",
  "this.overlay_6EDE59BC_6544_1138_41B2_65819FA43F0B",
  "this.overlay_6EDE29BC_6544_1138_41D5_46A846248A4B",
  "this.overlay_6EDE39BC_6544_1138_41B3_D001490F9519"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7FEABEEA_70A0_BA4E_41B5_91CF992F20BD",
 "initialPosition": {
  "yaw": 0.16,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7FEABEEA_70A0_BA4E_41B5_91CF992F20BD",
 "id": "camera_7FEAAEEA_70A0_BA4E_41C9_C68D2A7290FA",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -133.62,
   "backwardYaw": -61.49,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7EA63A50_6D06_3398_41CE_5AA956558790"
 ],
 "id": "panorama_698A2543_6544_7149_41BF_089F9E80F0F0",
 "thumbnailUrl": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_t.jpg",
 "hfovMin": "150%",
 "label": "Ruang Perpustakaan",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 174.25,
 "overlays": [
  "this.overlay_698A0543_6544_7149_41A5_22A7B0438DDE"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7C6B9C78_70A0_BE49_41D7_29387265F846",
 "initialPosition": {
  "yaw": -132.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7C6B9C78_70A0_BE49_41D7_29387265F846",
 "id": "camera_7C6B8C77_70A0_BE47_41BB_5B094BD121B4",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E895DD4_70A0_BE59_41CD_CAE91A76B6D1",
 "initialPosition": {
  "yaw": 1.52,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E895DD4_70A0_BE59_41CD_CAE91A76B6D1",
 "id": "camera_7E894DD4_70A0_BE59_41BB_353AD58B6004",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_694244BA_6544_F738_41CE_6EAB048386FD_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7C6DEC6A_70A0_BE49_41B3_3750025783EB",
 "initialPosition": {
  "yaw": -107.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7C6DEC6A_70A0_BE49_41B3_3750025783EB",
 "id": "camera_7C6DDC6A_70A0_BE49_41BF_20C678822A5F",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D031D71_70A0_BE5A_41B3_4A5BA149571C",
 "initialPosition": {
  "yaw": -1.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D031D71_70A0_BE5A_41B3_4A5BA149571C",
 "id": "camera_7D02FD71_70A0_BE5A_41C9_9C15E9AB7B90",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7EDECE12_70A0_BDD9_41D7_FF8B496DA503",
 "initialPosition": {
  "yaw": -94.2,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7EDECE12_70A0_BDD9_41D7_FF8B496DA503",
 "id": "camera_7EDC6E09_70A0_BDC2_41D7_059B36E1F0C7",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7C57CCB9_70A0_BECB_41C4_6425078CD959",
 "initialPosition": {
  "yaw": 142.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7C57CCB9_70A0_BECB_41C4_6425078CD959",
 "id": "camera_7C57ACB9_70A0_BECB_41D8_C6149EBECE7A",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7F843ECA_70A0_BA49_41DA_27B88B6AB78B",
 "initialPosition": {
  "yaw": 176.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7F843ECA_70A0_BA49_41DA_27B88B6AB78B",
 "id": "camera_7F842ECA_70A0_BA49_41D7_51F844433C7F",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D991D0A_70A0_BFC9_41D8_81F05436A2E4",
 "initialPosition": {
  "yaw": 98.67,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D991D0A_70A0_BFC9_41D8_81F05436A2E4",
 "id": "camera_7D990D0A_70A0_BFC9_41DB_5BF90BB4A226",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7DB43752_6D0A_1198_41BB_0122C2812C56.mp3",
  "oggUrl": "media/audio_7DB43752_6D0A_1198_41BB_0122C2812C56.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7DB43752_6D0A_1198_41BB_0122C2812C56",
 "data": {
  "label": "ruang kelas 7"
 }
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7C4E8CAE_70A0_BEC9_41D0_A24CA7DDFA08",
 "initialPosition": {
  "yaw": 122.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7C4E8CAE_70A0_BEC9_41D0_A24CA7DDFA08",
 "id": "camera_7C4E7CAE_70A0_BEC9_41C7_53058D49935E",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7D46AACF_6D0A_3087_41D9_978A66C583FC.mp3",
  "oggUrl": "media/audio_7D46AACF_6D0A_3087_41D9_978A66C583FC.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7D46AACF_6D0A_3087_41D9_978A66C583FC",
 "data": {
  "label": "lab.komputer"
 }
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6B93716E_6544_115A_41CE_B100A60FF51A_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -50.51,
   "backwardYaw": 105.17,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_692014CD_6544_1759_41C0_AA2C828F2669",
   "distance": 1
  },
  {
   "yaw": 30.23,
   "backwardYaw": 72.92,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7E890EF2_6D06_1099_41CD_ECDAA96BDB65"
 ],
 "id": "panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384",
 "thumbnailUrl": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_t.jpg",
 "hfovMin": "150%",
 "label": "Ruang Guru",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.72,
 "overlays": [
  "this.overlay_69CEDA62_6544_134B_41C3_27E7AD500826",
  "this.overlay_69CE2A62_6544_134B_41D4_F6884BB6C18F"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7DA3FCCF_70A0_BE47_41D4_A3FE69122600",
 "initialPosition": {
  "yaw": 4.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7DA3FCCF_70A0_BE47_41D4_A3FE69122600",
 "id": "camera_7DA3ECCF_70A0_BE47_41C3_52C342D5CC89",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 93.94,
   "backwardYaw": 98,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_6F33576A_6544_1158_41D4_E86843FB5838",
 "thumbnailUrl": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_t.jpg",
 "hfovMin": "150%",
 "label": "Bagian Awal",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 172.77,
 "overlays": [
  "this.overlay_6F33E76A_6544_1158_41A7_DDA04429A856"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7EB90C2C_70A0_BDC9_41C0_CDE73ADB7D52",
 "initialPosition": {
  "yaw": -93.44,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7EB90C2C_70A0_BDC9_41C0_CDE73ADB7D52",
 "id": "camera_7EB8EC2C_70A0_BDC9_41DA_8EBBC31D5398",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_688A1867_6544_3F4A_41D7_4653CD783039_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7DCD7D3B_70A0_BFCF_41DB_0EDD0D172A82",
 "initialPosition": {
  "yaw": -125.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7DCD7D3B_70A0_BFCF_41DB_0EDD0D172A82",
 "id": "camera_7DCD6D3B_70A0_BFCF_41B2_47F551B99A05",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7DD19D47_70A0_BE47_41D2_5D286A8531C3",
 "initialPosition": {
  "yaw": -61.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7DD19D47_70A0_BE47_41D2_5D286A8531C3",
 "id": "camera_7DD18D46_70A0_BFB9_41C9_244DDFBDFCC6",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E03CE48_70A0_BA49_41BC_030689D9893F",
 "initialPosition": {
  "yaw": -46.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E03CE48_70A0_BA49_41BC_030689D9893F",
 "id": "camera_7E03AE48_70A0_BA49_41C1_33AFA07E2DD9",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E3C8E33_70A0_BDDF_41D2_E55F7760E617",
 "initialPosition": {
  "yaw": 166.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E3C8E33_70A0_BDDF_41D2_E55F7760E617",
 "id": "camera_7E3C7E33_70A0_BDDF_41DA_F8B39B78926B",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7C77FC85_70A0_BEBB_417E_0D13A5CB3872",
 "initialPosition": {
  "yaw": 54.12,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7C77FC85_70A0_BEBB_417E_0D13A5CB3872",
 "id": "camera_7C77EC84_70A0_BEB9_41D1_F5A22F1F36EB",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -37.89,
   "backwardYaw": -10.68,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D",
   "distance": 1
  },
  {
   "yaw": -177.98,
   "backwardYaw": -70.35,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D",
 "thumbnailUrl": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_t.jpg",
 "hfovMin": "150%",
 "label": "IMG_3020",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.39,
 "overlays": [
  "this.overlay_75031BDE_6545_F17A_41D2_24044E3709C8",
  "this.overlay_750CEBDE_6545_F17A_41C8_39F0CC3A9FE5",
  "this.overlay_750CDBDE_6545_F17A_41D0_A5EC343EE72B",
  "this.overlay_750CBBDE_6545_F17A_41D5_D54F94C89FA7"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7EB9CDC9_70A0_BE4B_41BB_6027091BC798",
 "initialPosition": {
  "yaw": -14.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7EB9CDC9_70A0_BE4B_41BB_6027091BC798",
 "id": "camera_7EB9BDC9_70A0_BE4B_41D4_AD6A3170A214",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 48.79,
   "backwardYaw": -4.5,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9",
   "distance": 1
  },
  {
   "yaw": -178.48,
   "backwardYaw": -175.64,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C",
 "thumbnailUrl": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_t.jpg",
 "hfovMin": "150%",
 "label": "Gedung Sekolah",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 174.76,
 "overlays": [
  "this.overlay_6EC5CF27_6544_32C8_41CB_E4D10B839C4A",
  "this.overlay_6EC5FF27_6544_32C8_41A2_BDE1A3C32082",
  "this.overlay_6EC5EF27_6544_32C8_41BA_7E149565E4C9",
  "this.overlay_6EC59F27_6544_32C8_41CA_51E5DB40FA36"
 ]
},
{
 "touchControlMode": "drag_rotation",
 "buttonRestart": "this.IconButton_24D379CD_37E2_4D6B_41BC_22EE43BEB87A",
 "buttonMoveRight": "this.IconButton_24D3C9CD_37E2_4D6B_41C8_5F5BCF100696",
 "buttonZoomOut": "this.IconButton_24D359CD_37E2_4D6B_41C2_CB8313FA9509",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonPlayRight": "this.IconButton_24D3F9CD_37E2_4D6B_41CB_595F1DB49E48",
 "viewerArea": "this.MainViewer",
 "buttonMoveLeft": "this.IconButton_24D399CD_37E2_4D6B_416B_12F9ECAFE68C",
 "buttonPause": "this.IconButton_24D3A9CD_37E2_4D6B_4193_03A5B3C9D5D6",
 "class": "PanoramaPlayer",
 "buttonZoomIn": "this.IconButton_24DC19CD_37E2_4D6B_41A4_C178C32A94E8",
 "buttonMoveUp": "this.IconButton_24D3B9CD_37E2_4D6B_4189_82E0BF7036C2",
 "buttonMoveDown": "this.IconButton_24D3D9CD_37E2_4D6B_41CB_14DCE84883B9",
 "buttonPlayLeft": "this.IconButton_24D369CD_37E2_4D6B_41C6_155A59D0D5CD",
 "displayPlaybackBar": true,
 "mouseControlMode": "drag_rotation"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D3D3D67_70A0_BE47_41B5_3F1793510C69",
 "initialPosition": {
  "yaw": 118.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D3D3D67_70A0_BE47_41B5_3F1793510C69",
 "id": "camera_7D3D2D67_70A0_BE47_41CF_4F99A8C84C40",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 93.67,
   "backwardYaw": 48.58,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7F489465_6D06_17BA_41C8_D3E0CEEEF22F"
 ],
 "id": "panorama_688A1867_6544_3F4A_41D7_4653CD783039",
 "thumbnailUrl": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_t.jpg",
 "hfovMin": "150%",
 "label": "Mushola & AULA",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 174.76,
 "overlays": [
  "this.overlay_688A3867_6544_3F4A_41C9_E3A1DCF286A1"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7DF74D20_70A0_BFF9_41D4_3E02274E00AD",
 "initialPosition": {
  "yaw": 2.02,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7DF74D20_70A0_BFF9_41D4_3E02274E00AD",
 "id": "camera_7DF73D20_70A0_BFF9_41D4_0B82A8990C34",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 79.13,
   "backwardYaw": 73.23,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7D46AACF_6D0A_3087_41D9_978A66C583FC"
 ],
 "id": "panorama_68A654D0_6544_1746_41D1_F0113F0F99FD",
 "thumbnailUrl": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_t.jpg",
 "hfovMin": "150%",
 "label": "Lab. Komputer & BAHASA",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.39,
 "overlays": [
  "this.overlay_68A624D0_6544_1746_41D7_C78F09ADFD87"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7ECE0DFF_70A0_BE47_41D6_7953031DEAC7",
 "initialPosition": {
  "yaw": -131.42,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7ECE0DFF_70A0_BE47_41D6_7953031DEAC7",
 "id": "camera_7ECDDDFF_70A0_BE47_41DB_93F91B0E0E57",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_69064ED3_6544_3349_41C4_0954964676C5_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_698A2543_6544_7149_41BF_089F9E80F0F0_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 76.53,
   "backwardYaw": -83.26,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C",
   "distance": 1
  },
  {
   "yaw": 58.62,
   "backwardYaw": 70.57,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_69A9FB54_6544_714F_41BF_0B406B4318D7",
   "distance": 1
  },
  {
   "yaw": 9.41,
   "backwardYaw": -83.15,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B49CA60_6544_1346_4190_6E871F321584",
   "distance": 1
  },
  {
   "yaw": 153.75,
   "backwardYaw": 85.7,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16",
   "distance": 1
  },
  {
   "yaw": -61.49,
   "backwardYaw": -133.62,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_698A2543_6544_7149_41BF_089F9E80F0F0",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE",
 "thumbnailUrl": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_t.jpg",
 "hfovMin": "150%",
 "label": "Jalan ",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.72,
 "overlays": [
  "this.overlay_69F2DFDA_6544_117A_41C8_F43D40789D8F",
  "this.overlay_69F22FDA_6544_117A_41B0_9354456AB3F4",
  "this.overlay_69F23FDA_6544_117A_41D5_0C00D1414521",
  "this.overlay_69F20FDA_6544_117A_41BA_9B91E5C5D8C8",
  "this.overlay_69F26FDA_6544_117A_41C0_39E2E874EC0B",
  "this.overlay_69F27FDA_6544_117A_41C7_03880C80E0B1",
  "this.overlay_69F24FDA_6544_117A_41D2_330F5588323E",
  "this.overlay_6290F7DB_6D0A_3004_4148_27CDE3201909",
  "this.overlay_7D0A9E45_6D0E_F00D_41CC_38F1AB938147"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 86.56,
   "backwardYaw": -81.33,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B",
   "distance": 1
  },
  {
   "yaw": 73.23,
   "backwardYaw": 79.13,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_68A654D0_6544_1746_41D1_F0113F0F99FD",
   "distance": 1
  },
  {
   "yaw": -70.35,
   "backwardYaw": -177.98,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7",
 "thumbnailUrl": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_t.jpg",
 "hfovMin": "150%",
 "label": "Jalan 3",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.72,
 "overlays": [
  "this.overlay_6B4DDF31_6544_32C6_41A1_A51CDB21FD5C",
  "this.overlay_6B4DCF31_6544_32C6_419B_D237E0C1C9BA",
  "this.overlay_6B4DFF31_6544_32C6_41A8_856FEE942043",
  "this.overlay_6B4D9F31_6544_32C6_41CE_A23468334B03",
  "this.overlay_6B4D8F31_6544_32C6_41D8_7A25A8DDFDB7",
  "this.overlay_7C0E871F_6D1A_1000_41D4_BEAAF3EAA525"
 ]
},
{
 "adjacentPanoramas": [
  {
   "yaw": 169.74,
   "backwardYaw": 10.85,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B49CA60_6544_1346_4190_6E871F321584",
   "distance": 1
  },
  {
   "yaw": -24.58,
   "backwardYaw": -57.27,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0",
   "distance": 1
  },
  {
   "yaw": -10.68,
   "backwardYaw": -37.89,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_6B058108_6544_0EC6_41D0_366476AEDE1D",
 "thumbnailUrl": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_t.jpg",
 "hfovMin": "150%",
 "label": "IMG_3019",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.39,
 "overlays": [
  "this.overlay_6B057108_6544_0EC6_419D_1806676A087E",
  "this.overlay_6B056108_6544_0EC6_4197_AC55B836C000",
  "this.overlay_6B055108_6544_0EC6_41B2_6ED3593EE6B8",
  "this.overlay_6B054108_6544_0EC6_41CB_BF84A663D3A7",
  "this.overlay_6B052108_6544_0EC6_41D2_78918919CBEF",
  "this.overlay_7D7379E5_6D0A_F02B_41D2_9B79860D7F88"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_692014CD_6544_1759_41C0_AA2C828F2669_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D178D7C_70A0_BE4A_41A3_86556C663684",
 "initialPosition": {
  "yaw": -86.06,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D178D7C_70A0_BE4A_41A3_86556C663684",
 "id": "camera_7D177D7C_70A0_BE4A_41C6_EFA8F6D64E05",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7DFB2D2B_70A0_BFCF_41DC_1C4DF4CD9D7B",
 "initialPosition": {
  "yaw": 119.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7DFB2D2B_70A0_BFCF_41DC_1C4DF4CD9D7B",
 "id": "camera_7DFB1D2B_70A0_BFCF_41D8_7874C7EFC0D5",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E120E59_70A0_BA4B_41C9_7D4C81A8E717",
 "initialPosition": {
  "yaw": -106.77,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E120E59_70A0_BA4B_41C9_7D4C81A8E717",
 "id": "camera_7E11FE59_70A0_BA4B_41C3_35C2556C6853",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E2E7E22_70A0_BDF9_41C1_034960D14AE9",
 "initialPosition": {
  "yaw": 87.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E2E7E22_70A0_BDF9_41C1_034960D14AE9",
 "id": "camera_7E2E5E22_70A0_BDF9_41D3_968A19239E89",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_camera",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "audio": {
  "mp3Url": "media/audio_28F099CB_3C9D_5CFE_41C1_C83A3BCCB85E.mp3",
  "oggUrl": "media/audio_28F099CB_3C9D_5CFE_41C1_C83A3BCCB85E.ogg",
  "class": "AudioResource"
 },
 "class": "MediaAudio",
 "id": "audio_28F099CB_3C9D_5CFE_41C1_C83A3BCCB85E",
 "data": {
  "label": "Education Background Music No Copyright University Royalty Free"
 }
},
{
 "adjacentPanoramas": [
  {
   "yaw": 48.58,
   "backwardYaw": 93.67,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_688A1867_6544_3F4A_41D7_4653CD783039",
   "distance": 1
  },
  {
   "yaw": -81.33,
   "backwardYaw": 86.56,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7",
   "distance": 1
  },
  {
   "yaw": 85.8,
   "backwardYaw": -79.62,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_683E3111_6544_0EC6_41D1_30FAA973D44B",
 "thumbnailUrl": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_t.jpg",
 "hfovMin": "150%",
 "label": "Jalan Menuju Mushola",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_683E2111_6544_0EC6_41CD_A571166D5BFB",
  "this.overlay_683FC111_6544_0EC6_41C7_3A5933EC9DC1",
  "this.overlay_683FF111_6544_0EC6_41BB_03CF71C3C539",
  "this.overlay_62CA1ADA_6D06_1007_41D6_D1AEDC6554B9"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_camera",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -83.32,
   "backwardYaw": 178.45,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9",
   "distance": 1
  },
  {
   "yaw": 98,
   "backwardYaw": 93.94,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6F33576A_6544_1158_41D4_E86843FB5838",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0",
 "thumbnailUrl": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_t.jpg",
 "hfovMin": "150%",
 "label": "Jalan Masuk 1",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 174.59,
 "overlays": [
  "this.overlay_6E5D2DDC_6544_1178_41B2_9BA65D8E5386",
  "this.overlay_6E5DCDDC_6544_1178_41BE_AB629E131BD3"
 ]
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7C821354_6D0E_1199_41B1_47D5ADAC8568.mp3",
  "oggUrl": "media/audio_7C821354_6D0E_1199_41B1_47D5ADAC8568.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7C821354_6D0E_1199_41B1_47D5ADAC8568",
 "data": {
  "label": "lab.mipa"
 }
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D8C2CF4_70A0_BE59_41BC_16780B2A18BC",
 "initialPosition": {
  "yaw": -103.47,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D8C2CF4_70A0_BE59_41BC_16780B2A18BC",
 "id": "camera_7D83FCF4_70A0_BE59_41D6_F852402157E5",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D28FD5C_70A0_BE49_41C8_D8B9B234AFCE",
 "initialPosition": {
  "yaw": -170.59,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D28FD5C_70A0_BE49_41C8_D8B9B234AFCE",
 "id": "camera_7D28DD5C_70A0_BE49_41C9_D7ECADD4F29E",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7FB5CEC0_70A0_BAB9_41C6_F09D14EBFDD6",
 "initialPosition": {
  "yaw": -82,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7FB5CEC0_70A0_BAB9_41C6_F09D14EBFDD6",
 "id": "camera_7FB5AEC0_70A0_BAB9_41D0_0A4D39FF765B",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D242D52_70A0_BE59_41B1_8614FFF37818",
 "initialPosition": {
  "yaw": -10.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D242D52_70A0_BE59_41B1_8614FFF37818",
 "id": "camera_7D240D52_70A0_BE59_41D5_E5D7F06941C4",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_254A0629_3C9D_D7B0_41B6_A488EEE01D99.mp3",
  "oggUrl": "media/audio_254A0629_3C9D_D7B0_41B6_A488EEE01D99.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_254A0629_3C9D_D7B0_41B6_A488EEE01D99",
 "data": {
  "label": "tu"
 }
},
{
 "adjacentPanoramas": [
  {
   "yaw": -79.62,
   "backwardYaw": 85.8,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B",
   "distance": 1
  },
  {
   "yaw": -154.43,
   "backwardYaw": -92.74,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16",
   "distance": 1
  },
  {
   "yaw": 54.16,
   "backwardYaw": -13.7,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC",
 "thumbnailUrl": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_t.jpg",
 "hfovMin": "150%",
 "label": "Jalan 2",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.64,
 "overlays": [
  "this.overlay_687136A2_6544_13CA_41D7_0DC8EB3F365D",
  "this.overlay_6872C6A2_6544_13CA_41B8_0A52997BBB38",
  "this.overlay_6872D6A2_6544_13CA_41C7_F79DDB7BF988",
  "this.overlay_6872F6A2_6544_13CA_41B7_9219C2BEFE51",
  "this.overlay_687286A2_6544_13CA_41D6_F5B126CD432D",
  "this.overlay_62EC3DC0_6D05_F004_41D2_F74324AB10C7"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6E969F63_6544_1149_41AD_20922D73616F_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_camera",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7D79BE42_6D0E_73F8_41C2_D3D7C02CCDEC.mp3",
  "oggUrl": "media/audio_7D79BE42_6D0E_73F8_41C2_D3D7C02CCDEC.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7D79BE42_6D0E_73F8_41C2_D3D7C02CCDEC",
 "data": {
  "label": "lapangan"
 }
},
{
 "adjacentPanoramas": [
  {
   "yaw": 105.17,
   "backwardYaw": -50.51,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384",
   "distance": 1
  },
  {
   "yaw": 91.22,
   "backwardYaw": 88.34,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C",
   "distance": 1
  }
 ],
 "hfov": 360,
 "id": "panorama_692014CD_6544_1759_41C0_AA2C828F2669",
 "thumbnailUrl": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_t.jpg",
 "hfovMin": "150%",
 "label": "Jalan Menuju Ruang Guru",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.64,
 "overlays": [
  "this.overlay_692064CE_6544_175B_41D5_5B0A11975398",
  "this.overlay_692044CE_6544_175B_41CD_DD89034B60D4",
  "this.overlay_692054CE_6544_175B_41D2_9375ACD6E3D3",
  "this.overlay_6921A4CE_6544_175B_41D8_44FF3A8285B9",
  "this.overlay_627CBDEA_6D0B_F007_41D1_D782E8878417"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7FA5FEB5_70A0_BADB_41D1_55E197A34C5B",
 "initialPosition": {
  "yaw": 46.38,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7FA5FEB5_70A0_BADB_41D1_55E197A34C5B",
 "id": "camera_7FA5EEB5_70A0_BADB_41D0_462CD0003995",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D972CFF_70A0_BE47_41D4_5DF043AB5710",
 "initialPosition": {
  "yaw": -167.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D972CFF_70A0_BE47_41D4_5DF043AB5710",
 "id": "camera_7D971CFF_70A0_BE47_41C3_B754295C8D2B",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_camera",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7E890EF2_6D06_1099_41CD_ECDAA96BDB65.mp3",
  "oggUrl": "media/audio_7E890EF2_6D06_1099_41CD_ECDAA96BDB65.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7E890EF2_6D06_1099_41CD_ECDAA96BDB65",
 "data": {
  "label": "ruang guru"
 }
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7EB66C21_70A0_BDFB_41D7_63E286BD24ED",
 "initialPosition": {
  "yaw": -86.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7EB66C21_70A0_BDFB_41D7_63E286BD24ED",
 "id": "camera_7EB65C21_70A0_BDFB_41D2_4B5BB54CEBDD",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": 118.75,
   "backwardYaw": 133.59,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B49CA60_6544_1346_4190_6E871F321584",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7D5CD9E2_6D0A_10B9_41B8_23AC81B96A8C"
 ],
 "id": "panorama_6B93716E_6544_115A_41CE_B100A60FF51A",
 "thumbnailUrl": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_t.jpg",
 "hfovMin": "150%",
 "label": "Kelas VIII B",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.47,
 "overlays": [
  "this.overlay_6B93816E_6544_115A_41D7_2023711697FD"
 ]
},
{
 "items": [
  {
   "media": "this.panorama_6F33576A_6544_1158_41D4_E86843FB5838",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6F33576A_6544_1158_41D4_E86843FB5838_camera"
  },
  {
   "media": "this.panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_camera"
  },
  {
   "media": "this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_camera"
  },
  {
   "media": "this.panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_camera"
  },
  {
   "media": "this.panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_camera"
  },
  {
   "media": "this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_camera"
  },
  {
   "media": "this.panorama_6E969F63_6544_1149_41AD_20922D73616F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6E969F63_6544_1149_41AD_20922D73616F_camera"
  },
  {
   "media": "this.panorama_694244BA_6544_F738_41CE_6EAB048386FD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_694244BA_6544_F738_41CE_6EAB048386FD_camera"
  },
  {
   "media": "this.panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_camera"
  },
  {
   "media": "this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_camera"
  },
  {
   "media": "this.panorama_692014CD_6544_1759_41C0_AA2C828F2669",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_692014CD_6544_1759_41C0_AA2C828F2669_camera"
  },
  {
   "media": "this.panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_camera"
  },
  {
   "media": "this.panorama_69064ED3_6544_3349_41C4_0954964676C5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_69064ED3_6544_3349_41C4_0954964676C5_camera"
  },
  {
   "media": "this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_camera"
  },
  {
   "media": "this.panorama_698A2543_6544_7149_41BF_089F9E80F0F0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_698A2543_6544_7149_41BF_089F9E80F0F0_camera"
  },
  {
   "media": "this.panorama_69A9FB54_6544_714F_41BF_0B406B4318D7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_camera"
  },
  {
   "media": "this.panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_camera"
  },
  {
   "media": "this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_camera"
  },
  {
   "media": "this.panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_camera"
  },
  {
   "media": "this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_camera"
  },
  {
   "media": "this.panorama_688A1867_6544_3F4A_41D7_4653CD783039",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_688A1867_6544_3F4A_41D7_4653CD783039_camera"
  },
  {
   "media": "this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_camera"
  },
  {
   "media": "this.panorama_68A654D0_6544_1746_41D1_F0113F0F99FD",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_camera"
  },
  {
   "media": "this.panorama_6B49CA60_6544_1346_4190_6E871F321584",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6B49CA60_6544_1346_4190_6E871F321584_camera"
  },
  {
   "media": "this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 24, 25)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_camera"
  },
  {
   "media": "this.panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 25, 26)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_camera"
  },
  {
   "media": "this.panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 26, 27)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_camera"
  },
  {
   "media": "this.panorama_6B93716E_6544_115A_41CE_B100A60FF51A",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist, 27, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_6B93716E_6544_115A_41CE_B100A60FF51A_camera"
  }
 ],
 "id": "ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist",
 "class": "PlayList"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -48.47,
   "backwardYaw": 47.89,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_254A0629_3C9D_D7B0_41B6_A488EEE01D99"
 ],
 "id": "panorama_6E969F63_6544_1149_41AD_20922D73616F",
 "thumbnailUrl": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_t.jpg",
 "hfovMin": "150%",
 "label": "Ruang TU",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 174.76,
 "overlays": [
  "this.overlay_6E969F63_6544_1149_41D2_EA285A273AA2"
 ]
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7EFDEDF4_70A0_BE59_41B8_64A55BD319F6",
 "initialPosition": {
  "yaw": 109.65,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7EFDEDF4_70A0_BE59_41B8_64A55BD319F6",
 "id": "camera_7EFDCDF4_70A0_BE59_41C7_4FC96AA76DC6",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E576EA5_70A0_BAFB_41C7_BC96CDDFE30C",
 "initialPosition": {
  "yaw": -94.3,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E576EA5_70A0_BAFB_41C7_BC96CDDFE30C",
 "id": "camera_7E575EA5_70A0_BAFB_41D0_A593B89A99EB",
 "class": "PanoramaCamera"
},
{
 "adjacentPanoramas": [
  {
   "yaw": -57.27,
   "backwardYaw": -24.58,
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D",
   "distance": 1
  }
 ],
 "hfov": 360,
 "audios": [
  "this.audio_7DB43752_6D0A_1198_41BB_0122C2812C56"
 ],
 "id": "panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0",
 "thumbnailUrl": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_t.jpg",
 "hfovMin": "150%",
 "label": "Kelas VII C",
 "pitch": 0,
 "partial": false,
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/f/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/f/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/u/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/u/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/b/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/b/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/d/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/d/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/l/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/l/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/r/0/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_0/r/1/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "height": 512
     }
    ]
   }
  }
 ],
 "vfov": 170.39,
 "overlays": [
  "this.overlay_750E96B4_6545_F3CE_41D7_B45542317F92"
 ]
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7F489465_6D06_17BA_41C8_D3E0CEEEF22F.mp3",
  "oggUrl": "media/audio_7F489465_6D06_17BA_41C8_D3E0CEEEF22F.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7F489465_6D06_17BA_41C8_D3E0CEEEF22F",
 "data": {
  "label": "mushola"
 }
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7FF9AEF5_70A0_BA5A_41B4_744C4A98B43B",
 "initialPosition": {
  "yaw": -26.25,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7FF9AEF5_70A0_BA5A_41B4_744C4A98B43B",
 "id": "camera_7FF98EF5_70A0_BA5A_41D9_ECCAFA6DAC3A",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7FE38219_6D3A_1388_41CC_07F94428523A.mp3",
  "oggUrl": "media/audio_7FE38219_6D3A_1388_41CC_07F94428523A.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7FE38219_6D3A_1388_41CC_07F94428523A",
 "data": {
  "label": "ruang uks"
 }
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7EA63A50_6D06_3398_41CE_5AA956558790.mp3",
  "oggUrl": "media/audio_7EA63A50_6D06_3398_41CE_5AA956558790.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7EA63A50_6D06_3398_41CE_5AA956558790",
 "data": {
  "label": "ruang perpus"
 }
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7EEF9DE9_70A0_BE4B_41B9_DC9400A60052",
 "initialPosition": {
  "yaw": 169.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7EEF9DE9_70A0_BE4B_41B9_DC9400A60052",
 "id": "camera_7EEF7DE9_70A0_BE4B_41A3_2EAEEEAD15A1",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7DBA9CE5_70A0_BE7B_41A7_7698F2348373",
 "initialPosition": {
  "yaw": -88.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7DBA9CE5_70A0_BE7B_41A7_7698F2348373",
 "id": "camera_7DBA7CE5_70A0_BE7B_41CD_3B33DF9F6171",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D671D87_70A0_BEC6_4194_8B7979BF258F",
 "initialPosition": {
  "yaw": 35.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D671D87_70A0_BEC6_4194_8B7979BF258F",
 "id": "camera_7D670D87_70A0_BEC6_41AD_6E990129EECF",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7F68384E_6D06_1F88_41D2_C3DBF99E06D1.mp3",
  "oggUrl": "media/audio_7F68384E_6D06_1F88_41D2_C3DBF99E06D1.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7F68384E_6D06_1F88_41D2_C3DBF99E06D1",
 "data": {
  "label": "tamu"
 }
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7F9ABEE0_70A0_BA7A_41C4_18433100849A",
 "initialPosition": {
  "yaw": 96.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7F9ABEE0_70A0_BA7A_41C4_18433100849A",
 "id": "camera_7F9AAEE0_70A0_BA7A_4195_8C0B3B5EDB5D",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7D453D9D_70A0_BECA_41D2_C8BD3E6C3EF4",
 "initialPosition": {
  "yaw": 129.49,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7D453D9D_70A0_BECA_41D2_C8BD3E6C3EF4",
 "id": "camera_7D451D9D_70A0_BECA_41DB_5B2829F46BC3",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7EBDD1E4_6D07_F0B8_41B1_209EABEE683E.mp3",
  "oggUrl": "media/audio_7EBDD1E4_6D07_F0B8_41B1_209EABEE683E.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7EBDD1E4_6D07_F0B8_41B1_209EABEE683E",
 "data": {
  "label": "ruang kepsek"
 }
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7C5A6CC4_70A0_BEB9_41CB_27B3E58D7042",
 "initialPosition": {
  "yaw": 175.5,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7C5A6CC4_70A0_BEB9_41CB_27B3E58D7042",
 "id": "camera_7C5A5CC4_70A0_BEB9_41C0_4195AF161F9D",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6F33576A_6544_1158_41D4_E86843FB5838_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7C447CA3_70A0_BEFF_41D0_C3F19C124427",
 "initialPosition": {
  "yaw": -169.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7C447CA3_70A0_BEFF_41D0_C3F19C124427",
 "id": "camera_7C446CA3_70A0_BEFF_41D2_97FD00937DFF",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "idleSequence": "this.sequence_7E614E69_70A0_BA4B_41DA_D29BD650E217",
 "initialPosition": {
  "yaw": 96.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": "this.sequence_7E614E69_70A0_BA4B_41DA_D29BD650E217",
 "id": "camera_7E612E69_70A0_BA4B_41D5_1D5DB68FE094",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_camera",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "timeToIdle": 5000,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false
 },
 "id": "panorama_6B49CA60_6544_1346_4190_6E871F321584_camera",
 "class": "PanoramaCamera"
},
{
 "autoplay": true,
 "loop": true,
 "audio": {
  "mp3Url": "media/audio_7D5CD9E2_6D0A_10B9_41B8_23AC81B96A8C.mp3",
  "oggUrl": "media/audio_7D5CD9E2_6D0A_10B9_41B8_23AC81B96A8C.ogg",
  "class": "AudioResource"
 },
 "class": "PanoramaAudio",
 "id": "audio_7D5CD9E2_6D0A_10B9_41B8_23AC81B96A8C",
 "data": {
  "label": "ruang kelas 8"
 }
},
{
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "paddingLeft": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "class": "ViewerArea",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "width": "100%",
 "playbackBarHeadShadowHorizontalLength": 0,
 "minHeight": 50,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "3vmin",
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "minWidth": 100,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "height": "100%",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "shadow": false,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "paddingRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "borderSize": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "propagateClick": false,
 "data": {
  "name": "Container31983"
 },
 "scrollBarWidth": 10,
 "id": "Container_24DC39CD_37E2_4D6B_41C2_45CFF5903EF9",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "class": "Container",
 "right": "29.64%",
 "paddingLeft": 0,
 "children": [
  "this.IconButton_24D359CD_37E2_4D6B_41C2_CB8313FA9509",
  "this.IconButton_21005C89_37E2_4BEB_41B6_16C26E0C39B4",
  "this.IconButton_24D379CD_37E2_4D6B_41BC_22EE43BEB87A",
  "this.IconButton_24D369CD_37E2_4D6B_41C6_155A59D0D5CD",
  "this.IconButton_24D399CD_37E2_4D6B_416B_12F9ECAFE68C",
  "this.Container_24D389CD_37E2_4D6B_41CB_969F34EDD321",
  "this.IconButton_24D3C9CD_37E2_4D6B_41C8_5F5BCF100696",
  "this.IconButton_24D3F9CD_37E2_4D6B_41CB_595F1DB49E48",
  "this.IconButton_24D3E9CD_37E2_4D6B_41C7_0CEA3640E19D",
  "this.IconButton_257BF5BC_37E2_C528_41BA_62CC59276D9E",
  "this.IconButton_24DC19CD_37E2_4D6B_41A4_C178C32A94E8"
 ],
 "borderSize": 0,
 "width": 477.9,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "bottom": "11.93%",
 "contentOpaque": false,
 "minWidth": 20,
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "height": 137.05,
 "gap": 4,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "hidden",
 "layout": "horizontal"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_2518DAD6_37EE_4F79_41C9_7213EB2B1C27",
 "left": "0%",
 "propagateClick": true,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "class": "Container",
 "right": "0%",
 "children": [
  "this.Container_25187AD6_37EE_4F79_41A3_0279D4FA7365"
 ],
 "borderSize": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "creationPolicy": "inAdvance",
 "click": "this.setComponentVisibility(this.Container_2518DAD6_37EE_4F79_41C9_7213EB2B1C27, false, 0, null, null, false)",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "transparencyActive": true,
 "maxHeight": 128,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "id": "IconButton_21005C89_37E2_4BEB_41B6_16C26E0C39B4",
 "toolTipShadowSpread": 0,
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "width": 32.2,
 "minHeight": 1,
 "toolTip": "Fullscreen",
 "horizontalAlign": "center",
 "toolTipFontSize": "3vmin",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipShadowBlurRadius": 3,
 "verticalAlign": "middle",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "iconURL": "skin/IconButton_21005C89_37E2_4BEB_41B6_16C26E0C39B4.png",
 "minWidth": 1,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "mode": "toggle",
 "toolTipTextShadowBlurRadius": 3,
 "height": 56,
 "toolTipBorderSize": 1,
 "toolTipShadowColor": "#333333",
 "paddingTop": 0,
 "toolTipPaddingLeft": 6,
 "backgroundOpacity": 0,
 "toolTipDisplayTime": 600,
 "shadow": false,
 "paddingBottom": 0,
 "toolTipPaddingTop": 4,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingRight": 6,
 "toolTipFontStyle": "normal",
 "cursor": "hand",
 "toolTipShadowVerticalLength": 0,
 "maxWidth": 128,
 "data": {
  "name": "IconButton1493"
 },
 "toolTipTextShadowOpacity": 0
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D3E9CD_37E2_4D6B_41C7_0CEA3640E19D",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D3E9CD_37E2_4D6B_41C7_0CEA3640E19D.png",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D3E9CD_37E2_4D6B_41C7_0CEA3640E19D_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31994"
 }
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E710E7E_70A0_BA49_41D5_0DDA95297436",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.98,
   "image": "this.AnimatedImageResource_76D317D8_655C_11AC_41D3_C19064F66EB2",
   "pitch": -6.88,
   "yaw": -13.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC, this.camera_7DCD6D3B_70A0_BFCF_41B2_47F551B99A05); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Ruang Lab. MIPA"
  }
 ],
 "id": "overlay_6817AB96_6544_11CA_41D0_7C1D8E170F9A",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.98,
   "yaw": -13.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D76DD91_70A0_BEDA_41CF_195450B4BFF7",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.84,
   "image": "this.AnimatedImageResource_7626E7CF_655C_11A4_41D6_7E1FC280FB1E",
   "pitch": -6.08,
   "yaw": -3.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9, this.camera_7DFB1D2B_70A0_BFCF_41D8_7874C7EFC0D5); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Lapangan"
  }
 ],
 "id": "overlay_6E3B6916_6544_3EC8_41D3_7C484A54E4E2",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.84,
   "yaw": -3.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7FD82F0B_70A0_BBCF_41D8_7A8B7A8D1F66",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.92,
   "image": "this.AnimatedImageResource_76D4D7DB_655C_11AC_41BE_FB9485692FB1",
   "pitch": -11.09,
   "yaw": 10.85,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D, this.camera_7D240D52_70A0_BE59_41D5_E5D7F06941C4); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_6B49DA60_6544_1346_417C_BBD742764EC0",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.92,
   "yaw": 10.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.78,
   "image": "this.AnimatedImageResource_76D767DB_655C_11AC_41D9_3722E77F9528",
   "pitch": -8.13,
   "yaw": -67.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B49AA60_6544_1346_41D8_0FCEA7E2DD40",
 "maps": [
  {
   "hfov": 4.78,
   "yaw": -67.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "       Tahap \u000dPembangunan"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_2_0.png",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 31
     }
    ]
   },
   "pitch": -6.2,
   "yaw": -67.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6B49BA60_6544_1346_41D1_A480EF0FBC8C",
 "maps": [
  {
   "hfov": 16.05,
   "yaw": -67.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_2_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.94,
   "image": "this.AnimatedImageResource_7B786375_70A0_EA5B_41D2_EDD8E125AF7C",
   "pitch": -22.74,
   "yaw": -83.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE, this.camera_7D28DD5C_70A0_BE49_41C9_D7ECADD4F29E); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Menuju Lantai 1"
  }
 ],
 "id": "overlay_6B498A60_6544_1346_41D2_D351B4C9B7D9",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.94,
   "yaw": -83.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0_HS_3_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.82,
   "image": "this.AnimatedImageResource_76D627DC_655C_11A4_41D3_239000B2AB81",
   "pitch": -4.41,
   "yaw": -16.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B496A60_6544_1346_41C0_45348928AA5E",
 "maps": [
  {
   "hfov": 4.82,
   "yaw": -16.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "   Ruang\u000dKelas VII A"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0_HS_5_0.png",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 39
     }
    ]
   },
   "pitch": -3.46,
   "yaw": -16.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6B497A60_6544_1346_41D0_8B892A60439B",
 "maps": [
  {
   "hfov": 4.56,
   "yaw": -16.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0_HS_5_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.21,
   "image": "this.AnimatedImageResource_76D657DC_655C_11A4_41D0_418A75A17091",
   "pitch": -10.68,
   "yaw": -163.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B495A60_6544_1346_41C1_F814C05A1D84",
 "maps": [
  {
   "hfov": 3.21,
   "yaw": -163.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "        Tempat \u000dPengisian Minum"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_7_0.png",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 30
     }
    ]
   },
   "pitch": -9.86,
   "yaw": -162.3,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6B492A60_6544_1346_41D3_EBE821BBDB26",
 "maps": [
  {
   "hfov": 13.58,
   "yaw": -162.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_7_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.39,
   "image": "this.AnimatedImageResource_76D6E7DC_655C_11A4_41C0_996F04368B61",
   "pitch": -13.43,
   "yaw": -113.37,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B493A60_6544_1346_41D4_C2C7658EC050",
 "maps": [
  {
   "hfov": 6.39,
   "yaw": -113.37,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "    Ruang\u000dKelas VIII A"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.68,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0_HS_9_0.png",
      "width": 53,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   },
   "pitch": -12.4,
   "yaw": -112.11,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6B490A60_6544_1346_41BC_45C4C92A7A7E",
 "maps": [
  {
   "hfov": 8.68,
   "yaw": -112.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0_HS_9_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.15,
   "image": "this.AnimatedImageResource_76D977DC_655C_11A4_41A2_82EBAC48E1B9",
   "pitch": -10.05,
   "yaw": 133.59,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B93716E_6544_115A_41CE_B100A60FF51A, this.camera_7DD18D46_70A0_BFB9_41C9_244DDFBDFCC6); this.mainPlayList.set('selectedIndex', 27)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6B491A60_6544_1346_41D5_FC92BC7F9325",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.15,
   "yaw": 133.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.41,
   "image": "this.AnimatedImageResource_76D987DC_655C_11A4_41CE_1ABA5191EE8E",
   "pitch": -6.67,
   "yaw": 99.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B4AEA60_6544_1346_41AB_C04DF603B228",
 "maps": [
  {
   "hfov": 2.41,
   "yaw": 99.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_11_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Toilet \u000dAkhwat"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_12_0.png",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   },
   "pitch": -5.45,
   "yaw": 100.09,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6B4AFA60_6544_1346_41C8_A0EF620B95B8",
 "maps": [
  {
   "hfov": 7.99,
   "yaw": 100.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_12_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "    Ruang \u000dKelas VIII B"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0_HS_13_0.png",
      "width": 81,
      "class": "ImageResourceLevel",
      "height": 103
     }
    ]
   },
   "pitch": -10.02,
   "yaw": 137.38,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_7D7ACAE6_6D05_F030_41DA_775FA6EEBDAB",
 "maps": [
  {
   "hfov": 13.44,
   "yaw": 137.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0_HS_13_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.93,
   "image": "this.AnimatedImageResource_762B67D2_655C_11BC_41D8_192C41B875D6",
   "pitch": -15.06,
   "yaw": -125.88,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2, this.camera_7D670D87_70A0_BEC6_41AD_6E990129EECF); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_694234BA_6544_F738_41D7_D3707CFFCD71",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.93,
   "yaw": -125.88,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.87,
   "image": "this.AnimatedImageResource_762BB7D3_655C_11BC_41D8_2FD2842BE180",
   "pitch": -16.09,
   "yaw": 165.14,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01, this.camera_7D76BD91_70A0_BEDA_41B4_66F161CE7D6B); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Ruang Tamu"
  }
 ],
 "id": "overlay_694214BA_6544_F738_41AB_4FF4909F21EE",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.87,
   "yaw": 165.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "      Ruang \u000dKepala Sekolah"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0_HS_2_0.png",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 62
     }
    ]
   },
   "pitch": 0.44,
   "yaw": -131.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_7D21D873_6D0E_1026_41CF_F0FB99EF3241",
 "maps": [
  {
   "hfov": 12.42,
   "yaw": -131.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_0_HS_2_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7FC9BF00_70A0_BBB9_41CF_D9C529EA2C9A",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7EAB4DBE_70A0_BEC9_41D2_D369A216DB13",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D550DA8_70A0_BEC9_41C2_024A9FEA6A8F",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7C7E5C93_70A0_BEDF_41CC_2BF1B23930F7",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7DB72CD9_70A0_BE4B_41D9_A1C4D42FC8BB",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.18,
   "image": "this.AnimatedImageResource_76D137D5_655C_11A4_41D5_0625C863BF17",
   "pitch": -2.95,
   "yaw": 70.57,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE, this.camera_7D5B7DB3_70A0_BEDF_41C0_E54CA10FAE77); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Ruang UKS"
  }
 ],
 "id": "overlay_69A9EB54_6544_714F_41AC_A5069F1CD2CC",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.18,
   "yaw": 70.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.26,
   "image": "this.AnimatedImageResource_76D157D6_655C_11A4_41A3_371DFD8AD876",
   "pitch": 1.52,
   "yaw": 138.4,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_69A9DB54_6544_714F_41D2_77F9777FDDF7",
 "maps": [
  {
   "hfov": 4.26,
   "yaw": 138.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "   Kamar 1"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_2_0.png",
      "width": 30,
      "class": "ImageResourceLevel",
      "height": 25
     }
    ]
   },
   "pitch": 2.34,
   "yaw": 139.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_69A9CB54_6544_714F_41BD_2263DA132229",
 "maps": [
  {
   "hfov": 9.7,
   "yaw": 139.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_2_0_map.gif",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.26,
   "image": "this.AnimatedImageResource_76D1F7D6_655C_11A4_41B8_4D54F9A2C18D",
   "pitch": 2.27,
   "yaw": 172.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_69A90B54_6544_714F_41D3_ADB92BF59B86",
 "maps": [
  {
   "hfov": 4.26,
   "yaw": 172.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.23,
   "image": "this.AnimatedImageResource_762E47D6_655C_11A4_41B5_642A0A4C34F0",
   "pitch": 2.66,
   "yaw": -158.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_69A97B54_6544_714F_41CD_A71A8889447A",
 "maps": [
  {
   "hfov": 4.23,
   "yaw": -158.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Kamar 2"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_5_0.png",
      "width": 30,
      "class": "ImageResourceLevel",
      "height": 46
     }
    ]
   },
   "pitch": 1.34,
   "yaw": -157.15,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_69A95B54_6544_714F_41D9_16556787FEAF",
 "maps": [
  {
   "hfov": 9.88,
   "yaw": -157.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_5_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 24
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "  Ruang \u000dkonseling"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0_HS_6_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": 4.04,
   "yaw": 172.87,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_69A94B54_6544_714F_41CF_50161E2CF23C",
 "maps": [
  {
   "hfov": 9.21,
   "yaw": 172.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 4.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_0_HS_6_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D5B8DB3_70A0_BEDF_41B9_49CC204E0599",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E9FCDDF_70A0_BE47_41B3_EF59EAC27A48",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7DECED15_70A0_BFDB_41CA_7D418FC8AC3B",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E479E8F_70A0_BAC7_41D6_6FEE28BCB8AF",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.84,
   "image": "this.AnimatedImageResource_76D127D6_655C_11A4_41C1_1B9D7CE4EED6",
   "pitch": -27.89,
   "yaw": 85.7,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE, this.camera_7FF98EF5_70A0_BA5A_41D9_ECCAFA6DAC3A); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_685C412B_6544_0ED9_41D1_1755869FE8FA",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.84,
   "yaw": 85.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 11.8,
   "image": "this.AnimatedImageResource_76D177D6_655C_11A4_41BD_936AD8FE029E",
   "pitch": -28.23,
   "yaw": -92.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC, this.camera_7FC9AF00_70A0_BBB9_41D5_7475951D6CF2); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_685C512B_6544_0ED9_41D0_D85B32A3EE74",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.8,
   "yaw": -92.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -28.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.54,
   "image": "this.AnimatedImageResource_762A87D3_655C_11BC_41B7_B73C34439BD0",
   "pitch": -12.78,
   "yaw": -18.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C, this.camera_7FEAAEEA_70A0_BA4E_41C9_C68D2A7290FA); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_69066ED4_6544_334F_41D0_715533422428",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.54,
   "yaw": -18.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.73,
   "image": "this.AnimatedImageResource_762717CE_655C_11A4_41CE_8B123DBBA670",
   "pitch": -10.15,
   "yaw": 178.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0, this.camera_7F9AAEE0_70A0_BA7A_4195_8C0B3B5EDB5D); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Menuju Keluar"
  }
 ],
 "id": "overlay_697A53A1_6544_31C8_41B1_D7F6C1A3FA09",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.73,
   "yaw": 178.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.82,
   "image": "this.AnimatedImageResource_762757CE_655C_11A4_4168_EAEBFA72E9AC",
   "pitch": -7.13,
   "yaw": -60.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74, this.camera_7F842ECA_70A0_BA49_41D7_51F844433C7F); this.mainPlayList.set('selectedIndex', 3)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Menuju Lapangan "
  }
 ],
 "id": "overlay_697A73A1_6544_31C8_41D3_D8888A4D58CC",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.82,
   "yaw": -60.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.13,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.96,
   "image": "this.AnimatedImageResource_7627E7CF_655C_11A4_41B6_FD2AC161112D",
   "pitch": -5.24,
   "yaw": -4.5,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C, this.camera_7F942ED5_70A0_BA5A_41BE_7243AA7D51E4); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Menuju Gedung SMPIT BIS"
  }
 ],
 "id": "overlay_697A63A1_6544_31C8_41D5_956963202CDF",
 "data": {
  "label": "Arrow 02b Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.96,
   "yaw": -4.5,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.22,
   "image": "this.AnimatedImageResource_762627CF_655C_11A4_41C7_1BB9EF2F32CE",
   "pitch": 2.58,
   "yaw": 55.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_697A13A1_6544_31C8_41CF_8DDB9AFD86BE",
 "maps": [
  {
   "hfov": 3.22,
   "yaw": 55.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Parkiran\u000d  Motor"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_4_0.png",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 27
     }
    ]
   },
   "pitch": 3.63,
   "yaw": 55.71,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_697A03A1_6544_31C8_41A7_EE38699471D6",
 "maps": [
  {
   "hfov": 6.58,
   "yaw": 55.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_4_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.02,
   "image": "this.AnimatedImageResource_762657CF_655C_11A4_41D5_21F7A59E5419",
   "pitch": -1.82,
   "yaw": -103.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_697AD3A1_6544_31C8_41CB_2FA849750B60",
 "maps": [
  {
   "hfov": 3.02,
   "yaw": -103.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Parkiran     \u000d  Mobil"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_6_0.png",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 29
     }
    ]
   },
   "pitch": -0.71,
   "yaw": -102.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_697AE3A1_6544_31C8_41D2_B1FC99A25D5F",
 "maps": [
  {
   "hfov": 7.24,
   "yaw": -102.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.71,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_6_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7F943ED5_70A0_BA5A_41C0_CF1D8AC59D47",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.08,
   "image": "this.AnimatedImageResource_762827D0_655C_11BC_41D3_4FADDECCD126",
   "pitch": -25.22,
   "yaw": 12.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C, this.camera_7E9FBDDE_70A0_BE49_41D4_6B17D14B0FC8); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "jalan"
  }
 ],
 "id": "overlay_6E3AB495_6544_17C8_41C3_056E85EC6948",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.08,
   "yaw": 12.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 13.16,
   "image": "this.AnimatedImageResource_762877D0_655C_11BC_41CD_C520C3272758",
   "pitch": -26.87,
   "yaw": -175.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C, this.camera_7E894DD4_70A0_BE59_41BB_353AD58B6004); this.mainPlayList.set('selectedIndex', 4)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "EXIT"
  }
 ],
 "id": "overlay_6E3A8495_6544_17C8_41D0_64ABA0441582",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 13.16,
   "yaw": -175.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.62,
   "image": "this.AnimatedImageResource_7628A7D0_655C_11BC_41BD_F69844439071",
   "pitch": 0.47,
   "yaw": -27.45,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_694244BA_6544_F738_41CE_6EAB048386FD, this.camera_7EB9BDC9_70A0_BE4B_41D4_AD6A3170A214); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ruang Tamu"
  }
 ],
 "id": "overlay_6E3A9495_6544_17C8_41AD_1F4B1811F8FD",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.62,
   "yaw": -27.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.62,
   "image": "this.AnimatedImageResource_7628C7D0_655C_11BC_41D4_26EDB683F5DC",
   "pitch": 0.3,
   "yaw": 47.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E969F63_6544_1149_41AD_20922D73616F, this.camera_7EAB3DBE_70A0_BEC9_41C6_0E7F2DB071E4); this.mainPlayList.set('selectedIndex', 6)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6E3B6495_6544_17C8_41D6_2190E988FAF7",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.62,
   "yaw": 47.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ruang Tamu"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0_HS_4_0.png",
      "width": 78,
      "class": "ImageResourceLevel",
      "height": 60
     }
    ]
   },
   "pitch": 2.58,
   "yaw": -26.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_75BF0AA6_6544_F3A2_4198_3A1EE470D572",
 "maps": [
  {
   "hfov": 13.29,
   "yaw": -26.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0_HS_4_0_map.gif",
      "width": 20,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ruang TU"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0_HS_5_0.png",
      "width": 65,
      "class": "ImageResourceLevel",
      "height": 67
     }
    ]
   },
   "pitch": 1.32,
   "yaw": 48.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_74614AAF_6544_13A4_41D3_F9DE1149C573",
 "maps": [
  {
   "hfov": 11.08,
   "yaw": 48.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_0_HS_5_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7C621C5E_70A0_BE49_41C7_946D04ED1A19",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.58,
   "image": "this.AnimatedImageResource_762BD7D3_655C_11BC_41B4_8FF01B306A7C",
   "pitch": -15.52,
   "yaw": -144.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_694244BA_6544_F738_41CE_6EAB048386FD, this.camera_7C77EC84_70A0_BEB9_41D1_F5A22F1F36EB); this.mainPlayList.set('selectedIndex', 7)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Ruang Kepala Sekolah"
  }
 ],
 "id": "overlay_6900A91E_6544_3EFB_41D0_1665924F0021",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.58,
   "yaw": -144.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 20.3,
   "image": "this.AnimatedImageResource_762A17D3_655C_11BC_41D0_71F72CBB2991",
   "pitch": -13.31,
   "yaw": 72.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384, this.camera_7C7E3C93_70A0_BEDF_41C8_808A373296ED); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ruang Guru"
  }
 ],
 "id": "overlay_6900D91E_6544_3EFB_4184_1AB71FBA48C6",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 20.3,
   "yaw": 72.92,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E828C37_70A0_BDC7_41B0_3048912150EC",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.19,
   "image": "this.AnimatedImageResource_762B67D0_655C_11BC_41D6_FABD79AED783",
   "pitch": -24.4,
   "yaw": 88.34,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_692014CD_6544_1759_41C0_AA2C828F2669, this.camera_7DBA7CE5_70A0_BE7B_41CD_3B33DF9F6171); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Ke arah Kantor"
  }
 ],
 "id": "overlay_6EDE79BC_6544_1138_41D5_AF30F97FE3E9",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.19,
   "yaw": 88.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.5,
   "image": "this.AnimatedImageResource_762807D1_655C_11BC_41B1_85FB32816135",
   "pitch": -22,
   "yaw": -83.26,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE, this.camera_7D83FCF4_70A0_BE59_41D6_F852402157E5); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan "
  }
 ],
 "id": "overlay_6EDE59BC_6544_1138_41B2_65819FA43F0B",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.5,
   "yaw": -83.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.17,
   "image": "this.AnimatedImageResource_762857D2_655C_11BC_41C8_04A8BE96A405",
   "pitch": -43.34,
   "yaw": -179.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69064ED3_6544_3349_41C4_0954964676C5, this.camera_7DB71CD9_70A0_BE4B_41C5_09F212BEB1E5); this.mainPlayList.set('selectedIndex', 12)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Menuju Lapangan"
  }
 ],
 "id": "overlay_6EDE29BC_6544_1138_41D5_46A846248A4B",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.17,
   "yaw": -179.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -43.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_1_HS_2_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 12.34,
   "image": "this.AnimatedImageResource_7628E7D2_655C_11BC_41BE_6BDE37D2CE6B",
   "pitch": -23.8,
   "yaw": 1.77,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01, this.camera_7D971CFF_70A0_BE47_41C3_B754295C8D2B); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "EXIT"
  }
 ],
 "id": "overlay_6EDE39BC_6544_1138_41B3_D001490F9519",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 12.34,
   "yaw": 1.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_1_HS_3_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7FEABEEA_70A0_BA4E_41B5_91CF992F20BD",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.67,
   "image": "this.AnimatedImageResource_762EE7D5_655C_11A4_41C8_46C33108E5CC",
   "pitch": -2.88,
   "yaw": -133.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE, this.camera_7D3D2D67_70A0_BE47_41CF_4F99A8C84C40); this.mainPlayList.set('selectedIndex', 13)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Ruang Perpustakaan"
  }
 ],
 "id": "overlay_698A0543_6544_7149_41A5_22A7B0438DDE",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.67,
   "yaw": -133.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7C6B9C78_70A0_BE49_41D7_29387265F846",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E895DD4_70A0_BE59_41CD_CAE91A76B6D1",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7C6DEC6A_70A0_BE49_41B3_3750025783EB",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D031D71_70A0_BE5A_41B3_4A5BA149571C",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7EDECE12_70A0_BDD9_41D7_FF8B496DA503",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7C57CCB9_70A0_BECB_41C4_6425078CD959",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7F843ECA_70A0_BA49_41DA_27B88B6AB78B",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D991D0A_70A0_BFC9_41D8_81F05436A2E4",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7C4E8CAE_70A0_BEC9_41D0_A24CA7DDFA08",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.81,
   "image": "this.AnimatedImageResource_762DC7D4_655C_11A4_41CB_A4D45C8FE26A",
   "pitch": -7.57,
   "yaw": -50.51,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_692014CD_6544_1759_41C0_AA2C828F2669, this.camera_7C620C5E_70A0_BE49_41D5_C99F791DD66E); this.mainPlayList.set('selectedIndex', 10)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_69CEDA62_6544_134B_41C3_27E7AD500826",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.81,
   "yaw": -50.51,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.47,
   "image": "this.AnimatedImageResource_762C07D4_655C_11A4_41C1_4A0289555830",
   "pitch": -10.3,
   "yaw": 30.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2, this.camera_7C6DDC6A_70A0_BE49_41BF_20C678822A5F); this.mainPlayList.set('selectedIndex', 8)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ruang Kepala Sekolah"
  }
 ],
 "id": "overlay_69CE2A62_6544_134B_41D4_F6884BB6C18F",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.47,
   "yaw": 30.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7DA3FCCF_70A0_BE47_41D4_A3FE69122600",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.18,
   "image": "this.AnimatedImageResource_76167B1B_654C_129A_41C8_E69C9CD4FA9D",
   "pitch": -12.29,
   "yaw": 93.94,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0, this.camera_7FB5AEC0_70A0_BAB9_41D0_0A4D39FF765B); this.mainPlayList.set('selectedIndex', 1)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Masuk"
  }
 ],
 "id": "overlay_6F33E76A_6544_1158_41A7_DDA04429A856",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.18,
   "yaw": 93.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7EB90C2C_70A0_BDC9_41C0_CDE73ADB7D52",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7DCD7D3B_70A0_BFCF_41DB_0EDD0D172A82",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7DD19D47_70A0_BE47_41D2_5D286A8531C3",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E03CE48_70A0_BA49_41BC_030689D9893F",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E3C8E33_70A0_BDDF_41D2_E55F7760E617",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7C77FC85_70A0_BEBB_417E_0D13A5CB3872",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.86,
   "image": "this.AnimatedImageResource_7B7A2378_70A0_EA49_41C6_3D02127F4F99",
   "pitch": -23.12,
   "yaw": -37.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D, this.camera_7EEF7DE9_70A0_BE4B_41A3_2EAEEEAD15A1); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_75031BDE_6545_F17A_41D2_24044E3709C8",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.86,
   "yaw": -37.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.9,
   "image": "this.AnimatedImageResource_76D8C7DE_655C_11A4_41CB_6133759C9CF6",
   "pitch": -0.08,
   "yaw": 13.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_750CEBDE_6545_F17A_41C8_39F0CC3A9FE5",
 "maps": [
  {
   "hfov": 2.9,
   "yaw": 13.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": " Toilet \u000dIkhwan "
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0_HS_4_0.png",
      "width": 19,
      "class": "ImageResourceLevel",
      "height": 34
     }
    ]
   },
   "pitch": 0.48,
   "yaw": 13.99,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_750CDBDE_6545_F17A_41D0_A5EC343EE72B",
 "maps": [
  {
   "hfov": 3.19,
   "yaw": 13.99,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0_HS_4_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 28
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.3,
   "image": "this.AnimatedImageResource_76DB47DE_655C_11A4_4186_E3077AD9E22B",
   "pitch": -23.6,
   "yaw": -177.98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7, this.camera_7EFDCDF4_70A0_BE59_41C7_4FC96AA76DC6); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "menuju lantai 1"
  }
 ],
 "id": "overlay_750CBBDE_6545_F17A_41D5_D54F94C89FA7",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.3,
   "yaw": -177.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_1_HS_5_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7EB9CDC9_70A0_BE4B_41BB_6027091BC798",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 6.87,
   "image": "this.AnimatedImageResource_762937CF_655C_11A4_41C0_707D8B9F43B6",
   "pitch": -6.74,
   "yaw": 48.79,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9, this.camera_7C5A5CC4_70A0_BEB9_41C0_4195AF161F9D); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Menuju Keluar"
  }
 ],
 "id": "overlay_6EC5CF27_6544_32C8_41CB_E4D10B839C4A",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.87,
   "yaw": 48.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 7.73,
   "image": "this.AnimatedImageResource_762977CF_655C_11A4_41C7_D656042A90F4",
   "pitch": -7.17,
   "yaw": -178.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01, this.camera_7DA3ECCF_70A0_BE47_41C3_52C342D5CC89); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Masuk Gedung Sekolah"
  }
 ],
 "id": "overlay_6EC5FF27_6544_32C8_41A2_BDE1A3C32082",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.73,
   "yaw": -178.48,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.05,
   "image": "this.AnimatedImageResource_762987D0_655C_11BC_41A2_186F63AC070E",
   "pitch": -0.86,
   "yaw": -111.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6EC5EF27_6544_32C8_41BA_7E149565E4C9",
 "maps": [
  {
   "hfov": 2.05,
   "yaw": -111.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Parkiran"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_1_HS_3_0.png",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 24
     }
    ]
   },
   "pitch": -1.15,
   "yaw": -111.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6EC59F27_6544_32C8_41CA_51E5DB40FA36",
 "maps": [
  {
   "hfov": 6.73,
   "yaw": -111.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_1_HS_3_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D379CD_37E2_4D6B_41BC_22EE43BEB87A",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D379CD_37E2_4D6B_41BC_22EE43BEB87A.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_24D379CD_37E2_4D6B_41BC_22EE43BEB87A_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D379CD_37E2_4D6B_41BC_22EE43BEB87A_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31985"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D3C9CD_37E2_4D6B_41C8_5F5BCF100696",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D3C9CD_37E2_4D6B_41C8_5F5BCF100696.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_24D3C9CD_37E2_4D6B_41C8_5F5BCF100696_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D3C9CD_37E2_4D6B_41C8_5F5BCF100696_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31992"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D359CD_37E2_4D6B_41C2_CB8313FA9509",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D359CD_37E2_4D6B_41C2_CB8313FA9509.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_24D359CD_37E2_4D6B_41C2_CB8313FA9509_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D359CD_37E2_4D6B_41C2_CB8313FA9509_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31984"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D3F9CD_37E2_4D6B_41CB_595F1DB49E48",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D3F9CD_37E2_4D6B_41CB_595F1DB49E48.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_24D3F9CD_37E2_4D6B_41CB_595F1DB49E48_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D3F9CD_37E2_4D6B_41CB_595F1DB49E48_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31993"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D399CD_37E2_4D6B_416B_12F9ECAFE68C",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D399CD_37E2_4D6B_416B_12F9ECAFE68C.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_24D399CD_37E2_4D6B_416B_12F9ECAFE68C_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D399CD_37E2_4D6B_416B_12F9ECAFE68C_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31987"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D3A9CD_37E2_4D6B_4193_03A5B3C9D5D6",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D3A9CD_37E2_4D6B_4193_03A5B3C9D5D6.png",
 "minWidth": 0,
 "mode": "toggle",
 "height": 40,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D3A9CD_37E2_4D6B_4193_03A5B3C9D5D6_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31990"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24DC19CD_37E2_4D6B_41A4_C178C32A94E8",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24DC19CD_37E2_4D6B_41A4_C178C32A94E8.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_24DC19CD_37E2_4D6B_41A4_C178C32A94E8_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24DC19CD_37E2_4D6B_41A4_C178C32A94E8_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31995"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D3B9CD_37E2_4D6B_4189_82E0BF7036C2",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D3B9CD_37E2_4D6B_4189_82E0BF7036C2.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_24D3B9CD_37E2_4D6B_4189_82E0BF7036C2_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D3B9CD_37E2_4D6B_4189_82E0BF7036C2_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31989"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D3D9CD_37E2_4D6B_41CB_14DCE84883B9",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 32,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D3D9CD_37E2_4D6B_41CB_14DCE84883B9.png",
 "minWidth": 0,
 "mode": "push",
 "height": 32,
 "rollOverIconURL": "skin/IconButton_24D3D9CD_37E2_4D6B_41CB_14DCE84883B9_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D3D9CD_37E2_4D6B_41CB_14DCE84883B9_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31991"
 }
},
{
 "transparencyActive": true,
 "propagateClick": false,
 "id": "IconButton_24D369CD_37E2_4D6B_41C6_155A59D0D5CD",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 0,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_24D369CD_37E2_4D6B_41C6_155A59D0D5CD.png",
 "minWidth": 0,
 "mode": "push",
 "height": 40,
 "rollOverIconURL": "skin/IconButton_24D369CD_37E2_4D6B_41C6_155A59D0D5CD_rollover.png",
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_24D369CD_37E2_4D6B_41C6_155A59D0D5CD_pressed.png",
 "cursor": "hand",
 "data": {
  "name": "Button31986"
 }
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D3D3D67_70A0_BE47_41B5_3F1793510C69",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.54,
   "image": "this.AnimatedImageResource_76D287D9_655C_11AC_41B4_1BC4113323A6",
   "pitch": -5.5,
   "yaw": 93.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B, this.camera_7ECDDDFF_70A0_BE47_41DB_93F91B0E0E57); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "  Keluar Ruang \u000aMushola & AULA"
  }
 ],
 "id": "overlay_688A3867_6544_3F4A_41C9_E3A1DCF286A1",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.54,
   "yaw": 93.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7DF74D20_70A0_BFF9_41D4_3E02274E00AD",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.05,
   "image": "this.AnimatedImageResource_76D4B7DB_655C_11AC_41BD_266F7FF67A5E",
   "pitch": -10.97,
   "yaw": 79.13,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7, this.camera_7E11FE59_70A0_BA4B_41C3_35C2556C6853); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "        Keluar Ruang \u000aLab. Komputer & BAHASA"
  }
 ],
 "id": "overlay_68A624D0_6544_1746_41D7_C78F09ADFD87",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.05,
   "yaw": 79.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7ECE0DFF_70A0_BE47_41D6_7953031DEAC7",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 13.16,
   "image": "this.AnimatedImageResource_762CA7D4_655C_11A4_41D3_1E26C12BC9FB",
   "pitch": -10.59,
   "yaw": -61.49,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_698A2543_6544_7149_41BF_089F9E80F0F0, this.camera_7FA5EEB5_70A0_BADB_41D0_462CD0003995); this.mainPlayList.set('selectedIndex', 14)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_69F2DFDA_6544_117A_41C8_F43D40789D8F",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 13.16,
   "yaw": -61.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 13.24,
   "image": "this.AnimatedImageResource_762CF7D4_655C_11A4_4195_BF2A770262A2",
   "pitch": -8.53,
   "yaw": 58.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69A9FB54_6544_714F_41BF_0B406B4318D7, this.camera_7E70FE7E_70A0_BA49_418B_99F9B9154CFC); this.mainPlayList.set('selectedIndex', 15)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_69F22FDA_6544_117A_41B0_9354456AB3F4",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 13.24,
   "yaw": 58.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.53,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 16.85,
   "image": "this.AnimatedImageResource_762F17D4_655C_11A4_41C1_DD620998CC37",
   "pitch": -17.28,
   "yaw": 9.41,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B49CA60_6544_1346_4190_6E871F321584, this.camera_7E477E8F_70A0_BAC7_41D3_707A1F6F038F); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Menuju Ke Lantai 2"
  }
 ],
 "id": "overlay_69F23FDA_6544_117A_41D5_0C00D1414521",
 "data": {
  "label": "Arrow 06a"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 16.85,
   "yaw": 9.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.28,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_2_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.1,
   "image": "this.AnimatedImageResource_762FA7D5_655C_11A4_41B6_D80472CF01B0",
   "pitch": -41.65,
   "yaw": 153.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16, this.camera_7E575EA5_70A0_BAFB_41D0_A593B89A99EB); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_69F20FDA_6544_117A_41BA_9B91E5C5D8C8",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.1,
   "yaw": 153.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -41.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_3_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.22,
   "image": "this.AnimatedImageResource_762FC7D5_655C_11A4_41B9_45AAC9AE3284",
   "pitch": -24.14,
   "yaw": 76.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C, this.camera_7E612E69_70A0_BA4B_41D5_1D5DB68FE094); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Menuju Keluar"
  }
 ],
 "id": "overlay_69F26FDA_6544_117A_41C0_39E2E874EC0B",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.22,
   "yaw": 76.53,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_4_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.63,
   "image": "this.AnimatedImageResource_7F184D26_6D3A_71B6_41C9_D5EB99176790",
   "pitch": -5.47,
   "yaw": -112.55,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_69F27FDA_6544_117A_41C7_03880C80E0B1",
 "maps": [
  {
   "hfov": 1.63,
   "yaw": -112.55,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "  Toilet\u000d Ikhwan"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0_HS_6_0.png",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 43
     }
    ]
   },
   "pitch": -5.1,
   "yaw": -112.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_69F24FDA_6544_117A_41D2_330F5588323E",
 "maps": [
  {
   "hfov": 4.86,
   "yaw": -112.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0_HS_6_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 23
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "      Ruang \u000dPerpustakaan"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0_HS_7_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ]
   },
   "pitch": -5.56,
   "yaw": -61.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6290F7DB_6D0A_3004_4148_27CDE3201909",
 "maps": [
  {
   "hfov": 16.43,
   "yaw": -61.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0_HS_7_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ruang \u000d  UKS"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0_HS_8_0.png",
      "width": 70,
      "class": "ImageResourceLevel",
      "height": 92
     }
    ]
   },
   "pitch": -5.26,
   "yaw": 59.28,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_7D0A9E45_6D0E_F00D_41CC_38F1AB938147",
 "maps": [
  {
   "hfov": 11.72,
   "yaw": 59.28,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0_HS_8_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 21
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.84,
   "image": "this.AnimatedImageResource_7B775373_70A0_EA5F_41CA_0C080A3A3AC9",
   "pitch": -20.46,
   "yaw": 86.56,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B, this.camera_7D990D0A_70A0_BFC9_41DB_5BF90BB4A226); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_6B4DDF31_6544_32C6_41A1_A51CDB21FD5C",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.84,
   "yaw": 86.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.23,
   "image": "this.AnimatedImageResource_76D547D9_655C_11AC_418A_E2EA16178313",
   "pitch": -8.75,
   "yaw": 73.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_68A654D0_6544_1746_41D1_F0113F0F99FD, this.camera_7DECBD15_70A0_BFDB_41D0_038D64931EFE); this.mainPlayList.set('selectedIndex', 22)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ruang Lab. Komputer & BAHASA"
  }
 ],
 "id": "overlay_6B4DCF31_6544_32C6_419B_D237E0C1C9BA",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.23,
   "yaw": 73.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.5,
   "image": "this.AnimatedImageResource_76D587D9_655C_11AC_41B4_BC4808F31C6A",
   "pitch": -0.54,
   "yaw": -90.67,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B4DFF31_6544_32C6_41A8_856FEE942043",
 "maps": [
  {
   "hfov": 2.5,
   "yaw": -90.67,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "       Kantin"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_1_HS_3_0.png",
      "width": 25,
      "class": "ImageResourceLevel",
      "height": 22
     }
    ]
   },
   "pitch": -0.62,
   "yaw": -90.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6B4D9F31_6544_32C6_41CE_A23468334B03",
 "maps": [
  {
   "hfov": 10.45,
   "yaw": -90.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_1_HS_3_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.89,
   "image": "this.AnimatedImageResource_76D407DA_655C_11AC_41B2_7E4CE47B2D46",
   "pitch": -32.65,
   "yaw": -70.35,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D, this.camera_7DF73D20_70A0_BFF9_41D4_0B82A8990C34); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "menuju lantai 2"
  }
 ],
 "id": "overlay_6B4D8F31_6544_32C6_41D8_7A25A8DDFDB7",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.89,
   "yaw": -70.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -32.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_1_HS_4_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "     Ruang \u000dLab.Komputer \u000d  & BAHASA"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0_HS_5_0.png",
      "width": 64,
      "class": "ImageResourceLevel",
      "height": 59
     }
    ]
   },
   "pitch": -5.96,
   "yaw": 74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_7C0E871F_6D1A_1000_41D4_BEAAF3EAA525",
 "maps": [
  {
   "hfov": 10.81,
   "yaw": 74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0_HS_5_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.66,
   "image": "this.AnimatedImageResource_7B796376_70A0_EA59_41D6_859FB33E9EB4",
   "pitch": -11.62,
   "yaw": -10.68,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D, this.camera_7C57ACB9_70A0_BECB_41D8_C6149EBECE7A); this.mainPlayList.set('selectedIndex', 26)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_6B057108_6544_0EC6_419D_1806676A087E",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.66,
   "yaw": -10.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.71,
   "image": "this.AnimatedImageResource_76D6C7DD_655C_11A4_41B5_86D54A524F79",
   "pitch": -22.57,
   "yaw": 169.74,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B49CA60_6544_1346_4190_6E871F321584, this.camera_7C446CA3_70A0_BEFF_41D2_97FD00937DFF); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_6B056108_6544_0EC6_4197_AC55B836C000",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.71,
   "yaw": 169.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.96,
   "image": "this.AnimatedImageResource_76D977DD_655C_11A4_41CC_8D8BAC1FFF67",
   "pitch": -2.44,
   "yaw": -24.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0, this.camera_7C4E7CAE_70A0_BEC9_41C7_53058D49935E); this.mainPlayList.set('selectedIndex', 25)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6B055108_6544_0EC6_41B2_6ED3593EE6B8",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.96,
   "yaw": -24.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.22,
   "image": "this.AnimatedImageResource_76D997DD_655C_11A4_4177_5B2FBAF354E3",
   "pitch": -12.96,
   "yaw": -173.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6B054108_6544_0EC6_41CB_BF84A663D3A7",
 "maps": [
  {
   "hfov": 6.22,
   "yaw": -173.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "    Ruang \u000dKelas VII B"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0_HS_4_0.png",
      "width": 43,
      "class": "ImageResourceLevel",
      "height": 51
     }
    ]
   },
   "pitch": -12.03,
   "yaw": -172.6,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_6B052108_6544_0EC6_41D2_78918919CBEF",
 "maps": [
  {
   "hfov": 7.1,
   "yaw": -172.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0_HS_4_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "    Ruang \u000dKelas VII C"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0_HS_5_0.png",
      "width": 55,
      "class": "ImageResourceLevel",
      "height": 58
     }
    ]
   },
   "pitch": -1.65,
   "yaw": -23.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_7D7379E5_6D0A_F02B_41D2_9B79860D7F88",
 "maps": [
  {
   "hfov": 9.33,
   "yaw": -23.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0_HS_5_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D178D7C_70A0_BE4A_41A3_86556C663684",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7DFB2D2B_70A0_BFCF_41DC_1C4DF4CD9D7B",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E120E59_70A0_BA4B_41C9_7D4C81A8E717",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E2E7E22_70A0_BDF9_41C1_034960D14AE9",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.34,
   "image": "this.AnimatedImageResource_7B76D372_70A0_EA59_41C0_20FE6F8FD505",
   "pitch": -14.59,
   "yaw": 85.8,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC, this.camera_7E827C37_70A0_BDC7_41DA_AD2F22F68852); this.mainPlayList.set('selectedIndex', 17)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_683E2111_6544_0EC6_41CD_A571166D5BFB",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.34,
   "yaw": 85.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 15.81,
   "image": "this.AnimatedImageResource_7B773372_70A0_EA59_41C7_BC5955A1F7C7",
   "pitch": -15.41,
   "yaw": -81.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7, this.camera_7EB8EC2C_70A0_BDC9_41DA_8EBBC31D5398); this.mainPlayList.set('selectedIndex', 21)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_683FC111_6544_0EC6_41C7_3A5933EC9DC1",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 15.81,
   "yaw": -81.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 10.31,
   "image": "this.AnimatedImageResource_76D267D9_655C_11AC_4132_39F4104CBEC2",
   "pitch": -5.84,
   "yaw": 48.58,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_688A1867_6544_3F4A_41D7_4653CD783039, this.camera_7EB65C21_70A0_BDFB_41D2_4B5BB54CEBDD); this.mainPlayList.set('selectedIndex', 20)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ruang Mushola & AULA"
  }
 ],
 "id": "overlay_683FF111_6544_0EC6_41BB_03CF71C3C539",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.31,
   "yaw": 48.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "       Ruang \u000dMushola & AULA"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0_HS_3_0.png",
      "width": 134,
      "class": "ImageResourceLevel",
      "height": 133
     }
    ]
   },
   "pitch": -4.06,
   "yaw": 51.86,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_62CA1ADA_6D06_1007_41D6_D1AEDC6554B9",
 "maps": [
  {
   "hfov": 23,
   "yaw": 51.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0_HS_3_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 9.79,
   "image": "this.AnimatedImageResource_762487CE_655C_11A4_41AD_6A74C6631B85",
   "pitch": -8.51,
   "yaw": 98,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6F33576A_6544_1158_41D4_E86843FB5838, this.camera_7D177D7C_70A0_BE4A_41C6_EFA8F6D64E05); this.mainPlayList.set('selectedIndex', 0)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Area Sekolah"
  }
 ],
 "id": "overlay_6E5D2DDC_6544_1178_41B2_9BA65D8E5386",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9.79,
   "yaw": 98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 8.03,
   "image": "this.AnimatedImageResource_7624C7CE_655C_11A4_41D0_42F386EEC822",
   "pitch": -5.54,
   "yaw": -83.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9, this.camera_7D02FD71_70A0_BE5A_41C9_9C15E9AB7B90); this.mainPlayList.set('selectedIndex', 2)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Menuju SMPIT BIS"
  }
 ],
 "id": "overlay_6E5DCDDC_6544_1178_41BE_AB629E131BD3",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.03,
   "yaw": -83.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D8C2CF4_70A0_BE59_41BC_16780B2A18BC",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D28FD5C_70A0_BE49_41C8_D8B9B234AFCE",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7FB5CEC0_70A0_BAB9_41C6_F09D14EBFDD6",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D242D52_70A0_BE59_41B1_8614FFF37818",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 13.25,
   "image": "this.AnimatedImageResource_76D197D7_655C_11A4_41D4_EEE532E3A07C",
   "pitch": -45.42,
   "yaw": -154.43,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16, this.camera_7E2E5E22_70A0_BDF9_41D3_968A19239E89); this.mainPlayList.set('selectedIndex', 16)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_687136A2_6544_13CA_41D7_0DC8EB3F365D",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 13.25,
   "yaw": -154.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -45.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.3,
   "image": "this.AnimatedImageResource_76D027D7_655C_11A4_41C2_268F94C543E9",
   "pitch": -23.57,
   "yaw": -79.62,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_683E3111_6544_0EC6_41D1_30FAA973D44B, this.camera_7EDC6E09_70A0_BDC2_41D7_059B36E1F0C7); this.mainPlayList.set('selectedIndex', 19)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan"
  }
 ],
 "id": "overlay_6872C6A2_6544_13CA_41B8_0A52997BBB38",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.3,
   "yaw": -79.62,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_1_HS_1_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.26,
   "image": "this.AnimatedImageResource_76D047D7_655C_11A4_41C0_1D0515B1E0E7",
   "pitch": -10.18,
   "yaw": 54.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80, this.camera_7E3C7E33_70A0_BDDF_41DA_F8B39B78926B); this.mainPlayList.set('selectedIndex', 18)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_6872D6A2_6544_13CA_41C7_F79DDB7BF988",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.26,
   "yaw": 54.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.27,
   "image": "this.AnimatedImageResource_7F1F9D27_6D3A_71B6_41D2_AA04DACBA484",
   "pitch": -9.21,
   "yaw": 113.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_6872F6A2_6544_13CA_41B7_9219C2BEFE51",
 "maps": [
  {
   "hfov": 1.27,
   "yaw": 113.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Toilet Akhwat"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 2.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0_HS_4_0.png",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 36
     }
    ]
   },
   "pitch": -8.93,
   "yaw": 113.97,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_687286A2_6544_13CA_41D6_F5B126CD432D",
 "maps": [
  {
   "hfov": 2.99,
   "yaw": 113.97,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0_HS_4_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 32
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "  Ruang \u000dLab.MIPA"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0_HS_5_0.png",
      "width": 87,
      "class": "ImageResourceLevel",
      "height": 114
     }
    ]
   },
   "pitch": -6.81,
   "yaw": 55.36,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_62EC3DC0_6D05_F004_41D2_F74324AB10C7",
 "maps": [
  {
   "hfov": 14.58,
   "yaw": 55.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0_HS_5_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 20
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 4.45,
   "image": "this.AnimatedImageResource_762AC7D3_655C_11BC_41C5_FA263EDE79D0",
   "pitch": -10.17,
   "yaw": 105.17,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384, this.camera_7D451D9D_70A0_BECA_41DB_5B2829F46BC3); this.mainPlayList.set('selectedIndex', 11)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ruang Guru"
  }
 ],
 "id": "overlay_692064CE_6544_175B_41D5_5B0A11975398",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.45,
   "yaw": 105.17,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 02"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.38,
   "image": "this.AnimatedImageResource_762D17D3_655C_11BC_41C7_D0F5A2A75C3C",
   "pitch": -6.58,
   "yaw": -93.61,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_692044CE_6544_175B_41CD_DD89034B60D4",
 "maps": [
  {
   "hfov": 3.38,
   "yaw": -93.61,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Tempat Penyimpanan"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_1_HS_2_0.png",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 26
     }
    ]
   },
   "pitch": -6.69,
   "yaw": -92.04,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_692054CE_6544_175B_41D2_9375ACD6E3D3",
 "maps": [
  {
   "hfov": 15.77,
   "yaw": -92.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_1_HS_2_0_map.gif",
      "width": 23,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 17.4,
   "image": "this.AnimatedImageResource_762DB7D4_655C_11A4_41C9_65FEA61E1CC2",
   "pitch": -22.84,
   "yaw": 91.22,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6EDE69BC_6544_1138_41C0_C31D2380581C, this.camera_7D54DDA8_70A0_BEC9_41B1_651F231BCDB7); this.mainPlayList.set('selectedIndex', 9)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Jalan Menuju Keluar "
  }
 ],
 "id": "overlay_6921A4CE_6544_175B_41D8_44FF3A8285B9",
 "data": {
  "label": "Arrow 01c"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 17.4,
   "yaw": 91.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_1_HS_3_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Ruang \u000d Guru"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0_HS_4_0.png",
      "width": 36,
      "class": "ImageResourceLevel",
      "height": 41
     }
    ]
   },
   "pitch": -8.2,
   "yaw": 105.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_627CBDEA_6D0B_F007_41D1_D782E8878417",
 "maps": [
  {
   "hfov": 6.05,
   "yaw": 105.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_0_HS_4_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7FA5FEB5_70A0_BADB_41D1_55E197A34C5B",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D972CFF_70A0_BE47_41D4_5DF043AB5710",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7EB66C21_70A0_BDFB_41D7_63E286BD24ED",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 13.12,
   "image": "this.AnimatedImageResource_76DBE7DF_655C_11A4_41C6_D3BDE701E4E9",
   "pitch": -11.56,
   "yaw": 118.75,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B49CA60_6544_1346_4190_6E871F321584, this.camera_7E03AE48_70A0_BA49_41C1_33AFA07E2DD9); this.mainPlayList.set('selectedIndex', 23)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Ruang Kelas VIII B"
  }
 ],
 "id": "overlay_6B93816E_6544_115A_41D7_2023711697FD",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 13.12,
   "yaw": 118.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 14.25,
   "image": "this.AnimatedImageResource_762B27D2_655C_11BC_41C4_0B960945CD60",
   "pitch": -2.19,
   "yaw": -48.47,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01, this.camera_7C6B8C77_70A0_BE47_41BB_5B094BD121B4); this.mainPlayList.set('selectedIndex', 5)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Ruang TU"
  }
 ],
 "id": "overlay_6E969F63_6544_1149_41D2_EA285A273AA2",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.25,
   "yaw": -48.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7EFDEDF4_70A0_BE59_41B8_64A55BD319F6",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E576EA5_70A0_BAFB_41C7_BC96CDDFE30C",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "items": [
  {
   "hfov": 5.82,
   "image": "this.AnimatedImageResource_76D837DE_655C_11A4_4172_06CCD7D22D1C",
   "pitch": -7.88,
   "yaw": -57.27,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_6B058108_6544_0EC6_41D0_366476AEDE1D, this.camera_7FD81F0B_70A0_BBCF_41CD_8A26B03E32F4); this.mainPlayList.set('selectedIndex', 24)",
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Keluar Ruang Kelas"
  }
 ],
 "id": "overlay_750E96B4_6545_F3CE_41D7_B45542317F92",
 "data": {
  "label": "Circle Door 02"
 },
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.82,
   "yaw": -57.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ]
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7FF9AEF5_70A0_BA5A_41B4_744C4A98B43B",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7EEF9DE9_70A0_BE4B_41B9_DC9400A60052",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7DBA9CE5_70A0_BE7B_41A7_7698F2348373",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D671D87_70A0_BEC6_4194_8B7979BF258F",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7F9ABEE0_70A0_BA7A_41C4_18433100849A",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7D453D9D_70A0_BECA_41D2_C8BD3E6C3EF4",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7C5A6CC4_70A0_BEB9_41CB_27B3E58D7042",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7C447CA3_70A0_BEFF_41D0_C3F19C124427",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "restartMovementOnUserInteraction": false,
 "id": "sequence_7E614E69_70A0_BA4B_41DA_D29BD650E217",
 "movements": [
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_in",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 323,
   "yawSpeed": 7.96,
   "easing": "linear",
   "class": "DistancePanoramaCameraMovement"
  },
  {
   "yawDelta": 18.5,
   "yawSpeed": 7.96,
   "easing": "cubic_out",
   "class": "DistancePanoramaCameraMovement"
  }
 ],
 "class": "PanoramaCameraSequence"
},
{
 "propagateClick": false,
 "data": {
  "name": "Container31988"
 },
 "children": [
  "this.IconButton_24D3B9CD_37E2_4D6B_4189_82E0BF7036C2",
  "this.IconButton_24D3A9CD_37E2_4D6B_4193_03A5B3C9D5D6",
  "this.IconButton_24D3D9CD_37E2_4D6B_41CB_14DCE84883B9"
 ],
 "id": "Container_24D389CD_37E2_4D6B_41CB_969F34EDD321",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "class": "Container",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 40,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "height": "100%",
 "gap": 4,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "overflow": "hidden",
 "scrollBarWidth": 10,
 "layout": "vertical"
},
{
 "transparencyActive": false,
 "maxHeight": 512,
 "propagateClick": false,
 "id": "IconButton_257BF5BC_37E2_C528_41BA_62CC59276D9E",
 "paddingRight": 0,
 "class": "IconButton",
 "paddingLeft": 0,
 "borderSize": 0,
 "width": 45.2,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_257BF5BC_37E2_C528_41BA_62CC59276D9E.png",
 "minWidth": 1,
 "mode": "push",
 "click": "if(!this.Container_2518DAD6_37EE_4F79_41C9_7213EB2B1C27.get('visible')){ this.setComponentVisibility(this.Container_2518DAD6_37EE_4F79_41C9_7213EB2B1C27, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_2518DAD6_37EE_4F79_41C9_7213EB2B1C27, false, 0, null, null, false) }",
 "height": 50.6,
 "paddingTop": 0,
 "backgroundOpacity": 0,
 "shadow": false,
 "paddingBottom": 0,
 "borderRadius": 0,
 "cursor": "hand",
 "maxWidth": 512,
 "data": {
  "name": "IconButton7006"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_25187AD6_37EE_4F79_41A3_0279D4FA7365",
 "left": "15%",
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "data": {
  "name": "Global"
 },
 "paddingRight": 0,
 "class": "Container",
 "right": "15%",
 "children": [
  "this.Container_25188AD6_37EE_4F79_41C9_36F96E92A122",
  "this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B"
 ],
 "shadowVerticalLength": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "shadowHorizontalLength": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "top": "7%",
 "scrollBarOpacity": 0.5,
 "bottom": "7%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "paddingTop": 0,
 "shadowOpacity": 0.3,
 "shadow": true,
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "shadowSpread": 1,
 "borderRadius": 0,
 "overflow": "visible",
 "layout": "vertical",
 "propagateClick": false
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D317D8_655C_11AC_41D3_C19064F66EB2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_68179B96_6544_11CA_41D3_D8F2DBE59F80_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_7626E7CF_655C_11A4_41D6_7E1FC280FB1E",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6E3B7916_6544_3EC8_41D4_EF801B489F74_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_76D4D7DB_655C_11AC_41BE_FB9485692FB1",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D767DB_655C_11AC_41D9_3722E77F9528",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_1_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_7B786375_70A0_EA5B_41D2_EDD8E125AF7C",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_0_HS_3_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D627DC_655C_11A4_41D3_239000B2AB81",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_4_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D657DC_655C_11A4_41D0_418A75A17091",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_6_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D6E7DC_655C_11A4_41C0_996F04368B61",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_8_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D977DC_655C_11A4_41A2_82EBAC48E1B9",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_10_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D987DC_655C_11A4_41CE_1ABA5191EE8E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B49CA60_6544_1346_4190_6E871F321584_1_HS_11_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762B67D2_655C_11BC_41D8_192C41B875D6",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762BB7D3_655C_11BC_41D8_2FD2842BE180",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_694244BA_6544_F738_41CE_6EAB048386FD_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D137D5_655C_11A4_41D5_0625C863BF17",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D157D6_655C_11A4_41A3_371DFD8AD876",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_1_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D1F7D6_655C_11A4_41B8_4D54F9A2C18D",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_3_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762E47D6_655C_11A4_41B5_642A0A4C34F0",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69A9FB54_6544_714F_41BF_0B406B4318D7_1_HS_4_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_76D127D6_655C_11A4_41C1_1B9D7CE4EED6",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_76D177D6_655C_11A4_41BD_936AD8FE029E",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_685CB12B_6544_0ED9_41D0_0E781D7EFF16_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762A87D3_655C_11BC_41B7_B73C34439BD0",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_69064ED3_6544_3349_41C4_0954964676C5_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762717CE_655C_11A4_41CE_8B123DBBA670",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762757CE_655C_11A4_4168_EAEBFA72E9AC",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_7627E7CF_655C_11A4_41B6_FD2AC161112D",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762627CF_655C_11A4_41C7_1BB9EF2F32CE",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_3_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762657CF_655C_11A4_41D5_21F7A59E5419",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6979B3A1_6544_31C8_41BF_FB803A677BD9_1_HS_5_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762827D0_655C_11BC_41D3_4FADDECCD126",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762877D0_655C_11BC_41CD_C520C3272758",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_7628A7D0_655C_11BC_41BD_F69844439071",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_7628C7D0_655C_11BC_41D4_26EDB683F5DC",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6E3AA495_6544_17C8_41BB_AF5E7E1F0C01_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762BD7D3_655C_11BC_41B4_8FF01B306A7C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762A17D3_655C_11BC_41D0_71F72CBB2991",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6900891E_6544_3EFB_41AA_D6CFC86373A2_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762B67D0_655C_11BC_41D6_FABD79AED783",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762807D1_655C_11BC_41B1_85FB32816135",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762857D2_655C_11BC_41C8_04A8BE96A405",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_1_HS_2_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_7628E7D2_655C_11BC_41BE_6BDE37D2CE6B",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6EDE69BC_6544_1138_41C0_C31D2380581C_1_HS_3_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762EE7D5_655C_11A4_41C8_46C33108E5CC",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_698A2543_6544_7149_41BF_089F9E80F0F0_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762DC7D4_655C_11A4_41CB_A4D45C8FE26A",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762C07D4_655C_11A4_41C1_4A0289555830",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69CECA62_6544_134B_41D7_2B7C1B4E2384_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_76167B1B_654C_129A_41C8_E69C9CD4FA9D",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6F33576A_6544_1158_41D4_E86843FB5838_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_7B7A2378_70A0_EA49_41C6_3D02127F4F99",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_0_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D8C7DE_655C_11A4_41CB_6133759C9CF6",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_1_HS_3_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_76DB47DE_655C_11A4_4186_E3077AD9E22B",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_75033BDE_6545_F17A_41CD_D65432C5FD9D_1_HS_5_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762937CF_655C_11A4_41C0_707D8B9F43B6",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762977CF_655C_11A4_41C7_D656042A90F4",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762987D0_655C_11BC_41A2_186F63AC070E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6EC5DF27_6544_32C8_41C6_D7022768B79C_1_HS_2_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D287D9_655C_11AC_41B4_1BC4113323A6",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_688A1867_6544_3F4A_41D7_4653CD783039_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D4B7DB_655C_11AC_41BD_266F7FF67A5E",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_68A654D0_6544_1746_41D1_F0113F0F99FD_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762CA7D4_655C_11A4_41D3_1E26C12BC9FB",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762CF7D4_655C_11A4_4195_BF2A770262A2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762F17D4_655C_11A4_41C1_DD620998CC37",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762FA7D5_655C_11A4_41B6_D80472CF01B0",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_3_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762FC7D5_655C_11A4_41B9_45AAC9AE3284",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_1_HS_4_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_7F184D26_6D3A_71B6_41C9_D5EB99176790",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_69F2FFDA_6544_117A_41C2_AAF2F64C12FE_0_HS_5_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_7B775373_70A0_EA5F_41CA_0C080A3A3AC9",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D547D9_655C_11AC_418A_E2EA16178313",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D587D9_655C_11AC_41B4_BC4808F31C6A",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_1_HS_2_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_76D407DA_655C_11AC_41B2_7E4CE47B2D46",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6B4C2F31_6544_32C6_41AE_D00DBACB81D7_1_HS_4_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_7B796376_70A0_EA59_41D6_859FB33E9EB4",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_76D6C7DD_655C_11A4_41B5_86D54A524F79",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D977DD_655C_11A4_41CC_8D8BAC1FFF67",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D997DD_655C_11A4_4177_5B2FBAF354E3",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B058108_6544_0EC6_41D0_366476AEDE1D_1_HS_3_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_7B76D372_70A0_EA59_41C0_20FE6F8FD505",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_7B773372_70A0_EA59_41C7_BC5955A1F7C7",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_0_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D267D9_655C_11AC_4132_39F4104CBEC2",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_683E3111_6544_0EC6_41D1_30FAA973D44B_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762487CE_655C_11A4_41AD_6A74C6631B85",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_7624C7CE_655C_11A4_41D0_42F386EEC822",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_6E5D1DDC_6544_1178_41A5_72636829D3E0_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_76D197D7_655C_11A4_41D4_EEE532E3A07C",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_1_HS_0_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_76D027D7_655C_11A4_41C2_268F94C543E9",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_1_HS_1_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D047D7_655C_11A4_41C0_1D0515B1E0E7",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_1_HS_2_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_7F1F9D27_6D3A_71B6_41D2_AA04DACBA484",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_687126A2_6544_13CA_41C4_B9A4BFA05EBC_0_HS_3_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762AC7D3_655C_11BC_41C5_FA263EDE79D0",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762D17D3_655C_11BC_41C7_D0F5A2A75C3C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_1_HS_1_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ]
},
{
 "rowCount": 3,
 "frameCount": 9,
 "class": "AnimatedImageResource",
 "colCount": 3,
 "id": "AnimatedImageResource_762DB7D4_655C_11A4_41C9_65FEA61E1CC2",
 "frameDuration": 62,
 "levels": [
  {
   "url": "media/panorama_692014CD_6544_1759_41C0_AA2C828F2669_1_HS_3_0.png",
   "width": 330,
   "class": "ImageResourceLevel",
   "height": 180
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76DBE7DF_655C_11A4_41C6_D3BDE701E4E9",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6B93716E_6544_115A_41CE_B100A60FF51A_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_762B27D2_655C_11BC_41C4_0B960945CD60",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_6E969F63_6544_1149_41AD_20922D73616F_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "id": "AnimatedImageResource_76D837DE_655C_11A4_4172_06CCD7D22D1C",
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_750EA6B4_6545_F3CE_41D8_C567DDE85DE0_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ]
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "id": "Container_25188AD6_37EE_4F79_41C9_36F96E92A122",
 "propagateClick": false,
 "paddingLeft": 0,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "class": "Container",
 "children": [
  "this.HTMLText_25189AD6_37EE_4F79_4190_450DB789C7EE",
  "this.IconButton_2518AAD6_37EE_4F79_41AC_6F279984EA5D"
 ],
 "borderSize": 0,
 "minHeight": 1,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "horizontalAlign": "left",
 "width": "100%",
 "gap": 10,
 "height": 140,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "header"
 },
 "overflow": "scroll",
 "layout": "absolute"
},
{
 "backgroundColorRatios": [
  0
 ],
 "itemThumbnailWidth": 220,
 "id": "ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B",
 "itemLabelFontStyle": "normal",
 "paddingLeft": 70,
 "scrollBarColor": "#04A3E1",
 "horizontalAlign": "center",
 "class": "ThumbnailGrid",
 "itemLabelHorizontalAlign": "center",
 "itemMode": "normal",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "scrollBarOpacity": 0.5,
 "itemPaddingRight": 3,
 "itemMaxHeight": 1000,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "itemThumbnailOpacity": 1,
 "verticalAlign": "middle",
 "width": "100%",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemBorderRadius": 0,
 "minWidth": 1,
 "itemLabelFontFamily": "Montserrat",
 "itemPaddingLeft": 3,
 "itemMaxWidth": 1000,
 "selectedItemLabelFontColor": "#04A3E1",
 "itemLabelPosition": "bottom",
 "backgroundColor": [
  "#000000"
 ],
 "itemOpacity": 1,
 "itemHorizontalAlign": "center",
 "height": "100%",
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0.05,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "shadow": false,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "propagateClick": false,
 "itemWidth": 220,
 "selectedItemThumbnailShadow": true,
 "paddingRight": 70,
 "itemMinHeight": 50,
 "borderSize": 0,
 "backgroundColorDirection": "vertical",
 "itemLabelFontWeight": "normal",
 "itemLabelTextDecoration": "none",
 "selectedItemLabelFontWeight": "bold",
 "rollOverItemLabelFontColor": "#04A3E1",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailGrid_2518CAD6_37EE_4F79_41C7_139CA1F3BE2B_playlist",
 "scrollBarMargin": 2,
 "itemLabelFontSize": 14,
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemHeight": 156,
 "gap": 26,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingTop": 10,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "itemLabelGap": 7,
 "scrollBarWidth": 10,
 "data": {
  "name": "ThumbnailList"
 }
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "id": "HTMLText_25189AD6_37EE_4F79_4190_450DB789C7EE",
 "left": "0%",
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "class": "HTMLText",
 "paddingLeft": 80,
 "borderSize": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "top": "0%",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "width": "77.115%",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.07vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": false,
 "maxHeight": 60,
 "propagateClick": false,
 "id": "IconButton_2518AAD6_37EE_4F79_41AC_6F279984EA5D",
 "paddingRight": 0,
 "class": "IconButton",
 "right": 20,
 "paddingLeft": 0,
 "borderSize": 0,
 "minHeight": 50,
 "horizontalAlign": "right",
 "verticalAlign": "top",
 "iconURL": "skin/IconButton_2518AAD6_37EE_4F79_41AC_6F279984EA5D.jpg",
 "pressedRollOverIconURL": "skin/IconButton_2518AAD6_37EE_4F79_41AC_6F279984EA5D_pressed_rollover.jpg",
 "mode": "push",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2518DAD6_37EE_4F79_41C9_7213EB2B1C27, false, 0, null, null, false)",
 "height": "36.14%",
 "width": "100%",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_2518AAD6_37EE_4F79_41AC_6F279984EA5D_rollover.jpg",
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2518AAD6_37EE_4F79_41AC_6F279984EA5D_pressed.jpg",
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "maxWidth": 60
}],
 "width": "100%",
 "layout": "absolute"
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
