const bodyElement = document.querySelector('body');
const visorContainerElement = document.createElement('div');
const visorHeaderElement = document.createElement('div');
const visorElement = document.createElement('div');
const visorFooterElement = document.createElement('div');
const visorSizeIncrement = 10;

let visorSize = visorSizeIncrement * 10;

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
]);

visorElement.setStyles([
  { name: 'height', value: `${visorSize}px` },
]);

visorFooterElement.setStyles([
  { name: 'background-color', value: 'black' },
  { name: 'flex', value: '1' },
]);

const setVisorSize = () => {
  visorElement.setStyles([
    { name: 'height', value: `${visorSize}px` },
  ]);
};

const showVisor = () => {
  visorContainerElement.setStyles([{name: 'display', value: 'flex'}]);
};

const hideVisor = () => {
  visorContainerElement.setStyles([{name: 'display', value: 'none'}]);
};

const growVisor = () => {
  visorSize = visorSize + visorSizeIncrement;

  setVisorSize();
};

const shrinkVisor = () => {
  if (visorSize - visorSizeIncrement >= visorSizeIncrement) {
    visorSize = visorSize - visorSizeIncrement;

    setVisorSize();
  }
};

document.addEventListener('mousemove', event => {
  const windowHeight = window.innerHeight;

  let headerHeight = event.clientY - (visorSize / 2);

  if (headerHeight < 0) {
    headerHeight = 0;
  }

  if (headerHeight >= (windowHeight - visorSize)) {
    headerHeight = (windowHeight - visorSize);
  }

  visorHeaderElement.setStyles([
    { name: 'height', value: `${headerHeight}px` },
  ]);
});

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