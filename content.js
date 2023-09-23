chrome.runtime.onMessage.addListener(
  function (request) {
    visible = (request.active === 'on') ? true : false;
    display = visible ? 'initial' : 'none';

    visorHeaderElement.setStyles([{ name: 'display', value: display }]);
    visorFooterElement.setStyles([{ name: 'display', value: display }]);
  }
);

const bodyElement = document.querySelector('body');
const visorHeaderElement = document.createElement('div');
const visorFooterElement = document.createElement('div');

bodyElement.append(visorHeaderElement);
bodyElement.append(visorFooterElement);

const setStyles = function(styles) {
  styles.forEach(style => {
    this.style.setProperty(style.name, style.value, 'important');
  });
}

visorHeaderElement.setStyles = setStyles;
visorFooterElement.setStyles = setStyles;

visorHeaderElement.setStyles([
  { name: 'display', value: 'none' },
  { name: 'position', value: 'fixed' },
  { name: 'top', value: '0' },
  { name: 'background-color', value: 'black' },
  { name: 'opacity', value: '0.25' },
  { name: 'height', value: '100vh' },
  { name: 'width', value: '100vw' },
  { name: 'z-index', value: '99999' },
]);

visorFooterElement.setStyles([
  { name: 'display', value: 'none' },
  { name: 'position', value: 'fixed' },
  { name: 'top', value: '0' },
  { name: 'background-color', value: 'black' },
  { name: 'opacity', value: '0.25' },
  { name: 'width', value: '100vw' },
  { name: 'z-index', value: '99999' },
]);

document.addEventListener('mousemove', event => {
  const visorHeight = '150';
  const visorOffset = visorHeight / 2;

  if (event.clientY <= visorOffset) { // Prevent visor from moving too high...
    visorHeaderElement.setStyles([ { name: 'height', value: '0' } ]);

    visorFooterElement.setStyles([
      { name: 'top', value: visorHeight + 'px' },
      { name: 'height', value:  (window.innerHeight - visorHeight) + 'px' },
    ]);
  } else if (event.clientY >= (window.innerHeight - visorOffset)) { // ...or too low
    visorHeaderElement.setStyles([
      { name: 'height', value: (window.innerHeight - visorHeight) + 'px' },
    ]);

    visorFooterElement.setStyles([
      { name: 'top', value: visorHeight + 'px' },
      { name: 'height', value: '0' },
    ]);
  } else {
    visorHeaderElement.setStyles([
      { name: 'height', value: (event.clientY - visorOffset) + 'px' },
    ]);

    visorFooterElement.setStyles([
      { name: 'top', value: (event.clientY + visorOffset) + 'px' },
      { name: 'height', value: (window.innerHeight - (event.clientY + visorOffset)) + 'px' },
    ]);
  }
});