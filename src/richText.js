import action from '@cocreate/actions';
import text from '@cocreate/text';
import { setSelection } from '@cocreate/selection';

// let element;

function nodeName(btn) {
    let name = btn.getAttribute('node-name');
    if (!name) return;
    let targetSelector = btn.getAttribute('node-target');

    let Document = document;
    if (targetSelector) {
        if (targetSelector.indexOf(';') !== -1) {
            let documentSelector;
            [documentSelector, targetSelector] = targetSelector.split(';');
            let frame = document.querySelector(documentSelector);
            Document = frame.contentDocument;
            // element = Document.documentElement;
        }
    }

    const { element, value, start, end, range } = Document.activeSelection;
    setSelection(element, start, end, range)

    if (start != end) {
        text.updateText({ element, start, end, range });
    }

    let newValue = `<${name}>${value}</${name}>`;
    text.updateText({ element, value: newValue, start, range });
}

action.init({
    name: "nodeName",
    endEvent: "nodeName",
    callback: (data) => {
        nodeName(data.element);
    }
});
