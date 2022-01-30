/*global CustomEvent*/
import action from '@cocreate/actions';
import text from '@cocreate/text';

function  cloneElement(btn) {
	let element = btn.closest('toolbar, .toolbar');
	let targetElement = element.toolbar.target;
	let domTextEditor = targetElement.ownerDocument.documentElement;
	
	var clone = targetElement.cloneNode(true);

	text.insertAdjacentElement({
		domTextEditor,
		position: 'afterend',
		target: targetElement,
		elementValue: clone.outerHTML,
	});
	
	dispatchClickEvent(clone);
}

function  dispatchClickEvent(target) {
    let clickEvent = new CustomEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { writable: false, value: target });
    target.ownerDocument.dispatchEvent(clickEvent);
}

action.init({
	action: "cloneElement",
	endEvent: "cloneElement",
	callback: (btn, data) => {
		cloneElement(btn);
	}
});

