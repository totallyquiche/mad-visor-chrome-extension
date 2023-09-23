document.querySelector('#on').addEventListener('click', function (event) {
  updateContent('on');
});

document.querySelector('#off').addEventListener('click', function (event) {
  updateContent('off');
});

const updateContent = status => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { active: status }
      );
    }
  );
};