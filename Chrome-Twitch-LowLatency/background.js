
// Event: click on AutoInvert button
chrome.action.onClicked.addListener(function(tab) {
	console.log("Low Latency requested", tab);

	chrome.tabs.sendMessage(tab.id, {
		message: 'lowlatency!'
	});
});

// Support me
chrome.contextMenus.create(
	{
		contexts: ['action'],
		title: 'Support the developer!',
		id: "rikicoderSupportDeveloper",
	},
	(info)=>{
		console.log("create context menu: ", info)
})

chrome.contextMenus.onClicked.addListener(function(e) {
	if(e.menuItemId == 'rikicoderSupportDeveloper')
		chrome.tabs.create({ url: "https://www.twitch.tv/rikicoder" });
})