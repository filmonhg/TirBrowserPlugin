function inputListener(evt) {
  let lastIndex = this.value.length - 1;
  let appended = this.value[lastIndex];
  if (charmap.hasOwnProperty(appended)) {
    this.value = this.value.substring(0, lastIndex) + charmap[appended];
  }
}

let nodes = document.querySelectorAll('input[type=text]');

for (let i = 0; i < nodes.length; ++i) {
  let node = nodes[i];
  node.addEventListener('input', inputListener);
}

// @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver.
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // This DOM change was new nodes being added.
      for (let i = 0; i < mutation.addedNodes.length; i++) {
        const newNode = mutation.addedNodes[i];
        if (newNode.nodeName === 'INPUT' && newNode.type === 'text') {
          newNode.addEventListener('input', inputListener);
        }
      }
    }
  });
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
