var config = {
  params: {
    backgroundcolor: "bcebf9",
		bordercolor: "bcebf9",
		textcolor: "FFFFFF",
		disableExternalCall:disableExternalCalls,
		disableContextMenu:disableContextMenus,
		disableFullscreen:disableFullscreens,
		enableDebugging:"0",
    baseDownloadUrl: "http://wp-china.unity3d.com/download_webplayer-3.x/",
    autoupdateURL : "http://wp-china.unity3d.com/autodownload_webplugin-3.x",
    autoupdateURLSignature : "02a5f78b3066d7d31fb063186a2eec36fdf1205d49c6b0808eb37ef85ed9902e2e1904d87f599238a802ba0abbfe4f18aa82dd2eb5171e99ba839a5cea9e6ea9c1be9eae505937b56fe4a5fd254cffe08958d961f42d970136b5eab9e6c2cd08b81bc8a11e5ade57dc63dcfef2248d89689e4d4feed3cdfe7374c848fd57ebd4"
    }
};

var u = new UnityObject2(config);
	jQuery(function() {
	var $missingScreen = jQuery("#unityPlayer").find(".missing");
	var $brokenScreen = jQuery("#unityPlayer").find(".broken");
	$missingScreen.hide();
	$brokenScreen.hide();
	u.observeProgress(function (progress) {
		switch(progress.pluginStatus) {
			case "broken":
				$brokenScreen.find("a").click(function (e) {
					e.stopPropagation();
					e.preventDefault();
					u.installPlugin();
					return false;
				});
				$brokenScreen.show();
			break;
			case "missing":
				$missingScreen.find("a").click(function (e) {
					e.stopPropagation();
					e.preventDefault();
					u.installPlugin();
					return false;
				});
				$missingScreen.show();
			break;
			case "installed":
				$missingScreen.remove();
			break;
			case "first":
			break;
		}
	});
	u.initPlugin(jQuery("#unityPlayer")[0], gamename);
});	
function killErrors() { return true; } 
window.onerror = killErrors;
