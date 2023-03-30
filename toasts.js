const addButton = document.getElementById('add-button');
const clearButton = document.getElementById('clear-button');
const toasts = document.getElementById('toasts');
const MIN_DURATION = 500;

addButton.addEventListener('click', onAddToast);
clearButton.addEventListener('click', onClearToasts);

function onClearToasts(){
    toasts.innerHTML = '';
}

function onAddToast() {
    const message = document.getElementById('message-content').value;
    const isCancellable = document.getElementById('cancellable').checked;
    const toastType = document.querySelector('input[name="type"]:checked').value;
    const toast = createToast(message, isCancellable, toastType)
    toasts.prepend(toast);

    setTimeout(() => toast.remove(), getDuration());
}

function createToast(message, isCancellable, toastType){
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.classList.add(`${toastType}-toast`);

    const p = document.createElement('p');
    p.classList.add('message');
    p.textContent = message.length > 0 ? message : getDefaultMessage(toastType);
    toast.appendChild(p);

    if(isCancellable){
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('cancel-button');
        deleteButton.textContent = "X"
        deleteButton.addEventListener('click', () => toast.remove());

        toast.appendChild(deleteButton);
    }

    return toast;
}

function getDuration(){
    const duration = parseInt(document.getElementById('duration').value);
    if (isNaN(duration) || duration < MIN_DURATION){
        return MIN_DURATION;
    }

    return duration;
}

function getDefaultMessage(toastType){
    return toastType === 'success' ? 'Success!' : 'Error.';
}