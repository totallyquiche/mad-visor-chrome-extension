document.querySelector('#on').addEventListener('click', function (event) {
  sendMessage({ messageId: 'toggleVisor', active: 'on' });
});

document.querySelector('#off').addEventListener('click', function (event) {
  sendMessage({ messageId: 'toggleVisor', active: 'off' });
});

document.querySelector('#grow').addEventListener('click', function (event) {
  sendMessage({ messageId: 'shrinkOrGrowVisor', shrinkOrGrow: 'grow' });
});

document.querySelector('#shrink').addEventListener('click', function (event) {
  sendMessage({ messageId: 'shrinkOrGrowVisor', shrinkOrGrow: 'shrink' });
});

const sendMessage = message => {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        message
      );
    }
  );
};