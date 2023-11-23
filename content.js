const bodyElement = document.querySelector('body');
const visorContainerElement = document.createElement('div');
const visorHeaderElement = document.createElement('div');
const visorElement = document.createElement('div');
const visorFooterElement = document.createElement('div');
const visorSizeIncrement = 5;

let visorSize = visorSizeIncrement * 2;

visorContainerElement.append(visorHeaderElement);
visorContainerElement.append(visorElement);
visorContainerElement.append(visorFooterElement);

bodyElement.append(visorContainerElement);

const setStyles = function(styles) {
  styles.forEach(style => {
    this.style.setProperty(style.name, style.value, 'important');
  });
}

visorContainerElement.setStyles = setStyles;
visorHeaderElement.setStyles = setStyles;
visorElement.setStyles = setStyles;
visorFooterElement.setStyles = setStyles;

visorContainerElement.setStyles([
  { name: 'position', value: 'fixed' },
  { name: 'top', value: '0' },
  { name: 'left', value: '0' },
  { name: 'z-index', value: '99999' },
  { name: 'display', value: 'flex' },
  { name: 'flex-direction', value: 'column' },
  { name: 'width', value: '100vw' },
  { name: 'height', value: '100vh' },
  { name: 'opacity', value: '0.15' },
  { name: 'pointer-events', value: 'none' },
]);

visorHeaderElement.setStyles([
  { name: 'background-color', value: 'black' },
  { name: 'flex', value: '1' },
]);

visorElement.setStyles([
  { name: 'flex-grow', value: '1' },
  { name: 'flex-shrink', value: '1' },
]);

visorFooterElement.setStyles([
  { name: 'background-color', value: 'black' },
  { name: 'flex', value: '1' },
]);

const setVisorSize = () => {
  visorElement.setStyles([
    { name: 'flex-basis', value: `${visorSize}%` },
  ]);
};

const showVisor = () => {
  visorContainerElement.setStyles([{name: 'display', value: 'flex'}]);
};

const hideVisor = () => {
  visorContainerElement.setStyles([{name: 'display', value: 'none'}]);
};

const growVisor = () => {
  if (visorSize + visorSizeIncrement <= 100) {
    visorSize = visorSize + visorSizeIncrement;

    setVisorSize();
  }
};

const shrinkVisor = () => {
  if (visorSize - visorSizeIncrement >= 0) {
    visorSize = visorSize - visorSizeIncrement;

    setVisorSize();
  }
};

setVisorSize(visorSize);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.messageId) {
      case 'toggleVisor':
        (request.active === 'on') ? showVisor() : hideVisor();
        break;
      case 'shrinkOrGrowVisor':
        (request.shrinkOrGrow === 'shrink') ? shrinkVisor() : growVisor();
        break;
    }
  }
);