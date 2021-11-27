import action from '@cocreate/actions';
import text from '@cocreate/text';
import getSelection from '@cocreate/selection';

	let element;
	
function  nodeName(btn) {
	let name = btn.getAttribute('nodename');
	if (!name) return;
	let targetSelector = btn.getAttribute('nodetarget');

	let Document = document;
	if (targetSelector) {
		if(targetSelector.indexOf(';') !== -1) {
			let documentSelector;
			[documentSelector, targetSelector] = targetSelector.split(';');
			let frame = document.querySelector(documentSelector);
			Document = frame.contentDocument;
			element = Document.documentElement;
		}
	}
	
	const selection = Document.getSelection();
	if(!element)
		element = selection.anchorNode.parentElement;

	let value = selection.toString();
	
	const { start, end, range } = getSelection(element);
    if(start != end) {
        text.updateText(element, start, end, range);
    }
    let newValue = `<${name}>${value}</${name}>`;
    text.updateText(element, newValue, start, range);
}

action.init({
	action: "nodeName",
	endEvent: "nodeName",
	callback: (btn, data) => {
		nodeName(btn);
	}
});
