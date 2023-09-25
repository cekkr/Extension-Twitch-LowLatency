
// Event: click on AutoInvert button
chrome.action.onClicked.addListener(function(tab) {
	console.log("Low Latency requested", tab);

	chrome.tabs.sendMessage(tab.id, {
		message: 'lowlatency!',
		toggle: val,
	});
});

