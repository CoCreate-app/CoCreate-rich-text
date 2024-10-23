/*global CustomEvent*/
import action from '@cocreate/actions';

/**
 * Copies the target element's HTML to the clipboard.
 * @param {HTMLElement} btn - The button element that triggered the copy action.
 */
async function copyElementToClipboard(btn) {
    try {
        // Find the closest toolbar ancestor
        const toolbarElement = btn.closest('toolbar, .toolbar');
        if (!toolbarElement) {
            console.error('No toolbar ancestor found.');
            return;
        }

        const targetElement = toolbarElement.toolbar.target;
        if (!targetElement) {
            console.error('No target element found in the toolbar.');
            return;
        }

        // Get the outer HTML of the target element
        const elementHTML = targetElement.outerHTML;

        // Copy the HTML to the clipboard
        await navigator.clipboard.writeText(elementHTML);
        console.log('Element HTML copied to clipboard successfully!');

        // Dispatch the copyElement event to trigger the next action in the chain
        dispatchCopyEvent(targetElement);
    } catch (err) {
        console.error('Failed to copy element HTML to clipboard:', err);
    }
}

/**
 * Dispatches a custom 'copyElement' event to trigger the next action in the chain.
 * @param {HTMLElement} target - The element associated with the event.
 */
function dispatchCopyEvent(target) {
    const copyEvent = new CustomEvent('copyElement', { bubbles: true });

    // Define the 'target' property as non-writable and set its value
    Object.defineProperty(copyEvent, 'target', { writable: false, value: target });

    // Dispatch the event from the document
    target.ownerDocument.dispatchEvent(copyEvent);
}

// Initialize the copy action
action.init({
    name: "copyElement",
    endEvent: "copyElement",
    callback: (data) => {
        copyElementToClipboard(data.element);
    }
});
