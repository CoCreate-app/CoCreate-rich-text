/*global CustomEvent*/
import action from '@cocreate/actions';
import text from '@cocreate/text';

function cloneElement(btn) {
    let element = btn.closest('toolbar, .toolbar');
    let targetElement = element.toolbar.target;
    let domTextEditor = targetElement.closest('[contenteditable][array][object][key]');
    if (!domTextEditor.htmlString) {
        domTextEditor = domTextEditor.closest('[contenteditable]');
    }

    var clone = targetElement.cloneNode(true);

    text.insertAdjacentElement({
        domTextEditor,
        position: 'afterend',
        target: targetElement,
        elementValue: clone.outerHTML,
    });

    dispatchClickEvent(clone);
}

function dispatchClickEvent(target) {
    let clickEvent = new CustomEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { writable: false, value: target });
    target.ownerDocument.dispatchEvent(clickEvent);
}

action.init({
    name: "cloneElement",
    endEvent: "cloneElement",
    callback: (data) => {
        cloneElement(data.element);
    }
});

