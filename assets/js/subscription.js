const cancel = document.getElementById('cancel-btn');
const popup = document.getElementById('popup');
const no = document.getElementById('no-btn');
const cross = document.getElementById('cross-icon');


cancel.addEventListener('click', () => {
    popup.classList.remove('hidden');
});

no.addEventListener('click', () => {
    popup.classList.add('hidden');
});
cross.addEventListener('click', () => {
    popup.classList.add('hidden');
});
