// Button Toggler and Redirect Logic
const activeBtn = document.getElementById('active-btn');
const processBtn = document.getElementById('process-btn');

activeBtn.addEventListener('click', () => {
    activeBtn.classList.add('hidden');
    processBtn.classList.remove('hidden');
    setTimeout(() => {
        window.location.href = 'variation.html';
    }, 2000); // 2-second delay
});

// Drag-and-Drop Functionality for All Upload Sections
const dropzones = document.querySelectorAll('.upload-file'); // Target all upload-file divs
dropzones.forEach((dropzone, index) => {
    const fileInput = dropzone.querySelector('input[type="file"]'); // Find input inside this dropzone
    const fileList = dropzone.querySelector('#fileList'); // Optional: only if uncommented in HTML

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight dropzone on drag
    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => highlight(dropzone), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, () => unhighlight(dropzone), false);
    });

    // Handle drop event
    dropzone.addEventListener('drop', (e) => handleDrop(e, fileList), false);

    // Trigger file input on click
    dropzone.addEventListener('click', () => fileInput.click());

    // Handle file selection via input
    fileInput.addEventListener('change', () => handleFiles(fileInput.files, fileList), false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(dropzone) {
    dropzone.classList.add('dragover');
}

function unhighlight(dropzone) {
    dropzone.classList.remove('dragover');
}

function handleDrop(e, fileList) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files, fileList);
}

function handleFiles(files, fileList) {
    if (!fileList) return; // Skip if fileList isn’t present in HTML
    fileList.innerHTML = ''; // Clear previous file list

    Array.from(files).forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.textContent = `${file.name} (${formatFileSize(file.size)})`;
        fileList.appendChild(fileElement);
    });
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
}