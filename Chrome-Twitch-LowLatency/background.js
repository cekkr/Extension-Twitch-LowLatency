
// Event: click on AutoInvert button
chrome.action.onClicked.addListener(function(tab) {
	console.log("Low Latency requested", tab);

	chrome.tabs.sendMessage(tab.id, {
		message: 'lowlatency!'
	});
});

/// Disable/enable delay alert
chrome.contextMenus.create({
	id: 'toggleDelayAlert',
	title: 'Enable delay alert',
	type: 'checkbox',
	contexts: ['action'],
	checked: true,
});

/// Support me
chrome.contextMenus.create(
	{
		contexts: ['action'],
		title: 'Support the developer!',
		id: "rikicoderSupportDeveloper",
	},
	(info)=>{
		console.log("create context menu: ", info)
})

/// Context menu onClick
chrome.contextMenus.onClicked.addListener(function(e, tab) {
	if(e.menuItemId == 'rikicoderSupportDeveloper')
		chrome.tabs.create({ url: "https://www.twitch.tv/rikicoder" });

	if(e.menuItemId == 'toggleDelayAlert'){
		let checked = e.checked

		if(checked){
			chrome.tabs.sendMessage(tab.id, {
				message: 'showAlert'
			});
		}
		else {
			chrome.tabs.sendMessage(tab.id, {
				message: 'noAlert'
			});
		}
	}
})