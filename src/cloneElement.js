/*global CustomEvent*/
import action from '@cocreate/action';
import uuid from '@cocreate/uuid';
import toolbar from '@cocreate/toolbar';
import text from '@cocreate/text';

function  cloneElement(btn) {
	let element = btn.closest('toolbar, .toolbar');
	let targetElement = element.toolbar.target;
	let domTextEditor = targetElement.ownerDocument.documentElement;
	
	var clone = targetElement.cloneNode(true);
	clone.setAttribute('element_id', uuid.generate(6));
	
	text.insertAdjacentElement({
		domTextEditor,
		position: 'afterend',
		target: targetElement.getAttribute("element_id"),
		elementValue: clone.outerHTML,
	});
	
	dispatchClickEvent(clone);
}

function  dispatchClickEvent(target) {
    let clickEvent = new CustomEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { writable: false, value: target });
    target.ownerDocument.dispatchEvent(clickEvent);
}

function  deleteElement(btn) {
	let element = btn.closest('toolbar, .toolbar');
	let targetElement = element.toolbar.target;
	let domTextEditor = targetElement.ownerDocument.documentElement;

	text.removeElement({
		domTextEditor,
		target: targetElement.getAttribute("element_id"),
	});
	
	toolbar.hide(element);
}

action.init({
	action: "deleteElement",
	endEvent: "deleteElement",
	callback: (btn, data) => {
		deleteElement(btn);
	}
});

action.init({
	action: "cloneElement",
	endEvent: "cloneElement",
	callback: (btn, data) => {
		cloneElement(btn);
	}
});

