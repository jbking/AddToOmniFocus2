var currentTab;

function handleClicked() {
  console.log("title: " + currentTab.title + ", url: " + currentTab.url);
  var note = currentTab.url;
  browser.tabs.create({
     "url": "omnifocus:///add?name=" + encodeURIComponent(currentTab.title) + "&note=" + encodeURIComponent(note)
  }).then(function(tab) {
    setTimeout(function() {
      browser.tabs.remove(tab.id);
      browser.tabs.update(currentTab.id, {active: true});
    });
  });
}

browser.browserAction.onClicked.addListener(handleClicked);

// https://github.com/mdn/webextensions-examples/blob/master/bookmark-it/background.js
function updateActiveTab(tabs) {

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}


// listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);

updateActiveTab();
