document.addEventListener('DOMContentLoaded', () => {
    // Profile Menu Logic
    const profileIcon = document.getElementById('profileIcon');
    const profileMenu = document.getElementById('profileMenu');

    profileIcon.addEventListener('click', () => {
        profileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
            profileMenu.classList.add('hidden');
        }
    });

    // Dashboard Logic
    const activeBtn = document.getElementById('active-btn');
    const processBtn = document.getElementById('process-btn');
    const variationCount = document.getElementById('variationCount');

    // Track files for variations
    let hooksFiles = [];
    let leadsFiles = [];
    let bodyFiles = [];

    // Formula: Total Variations = (Number of Hooks) × (Number of Leads) × (Number of Bodies)
    function updateVariations() {
        const numberOfHooks = hooksFiles.length;
        const numberOfLeads = leadsFiles.length;
        const numberOfBodies = bodyFiles.length;
        const totalVariations = numberOfHooks * numberOfLeads * numberOfBodies;
        variationCount.textContent = totalVariations;
    }

    // Button Toggler and Redirect Logic
    activeBtn.addEventListener('click', () => {
        activeBtn.classList.add('hidden');
        processBtn.classList.remove('hidden');
        setTimeout(() => {
            window.location.href = 'variation.html';
        }, 2000); // 2-second delay
    });

    // Drag-and-Drop and Click Upload Functionality
    const dropzones = document.querySelectorAll('.upload-file');
    dropzones.forEach((dropzone, index) => {
        const fileInput = dropzone.querySelector('input[type="file"]');

        // Prevent default drag behaviors
        dropzone.addEventListener('dragenter', preventDefaults, false);
        dropzone.addEventListener('dragover', preventDefaults, false);
        dropzone.addEventListener('dragleave', preventDefaults, false);
        dropzone.addEventListener('drop', preventDefaults, false);

        // Highlight dropzone on drag
        dropzone.addEventListener('dragenter', () => highlight(dropzone), false);
        dropzone.addEventListener('dragover', () => highlight(dropzone), false);
        dropzone.addEventListener('dragleave', () => unhighlight(dropzone), false);
        dropzone.addEventListener('drop', () => unhighlight(dropzone), false);

        // Handle drop event
        dropzone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            handleFiles(files, index, true);
        }, false);

        // Trigger file input on click
        dropzone.addEventListener('click', () => fileInput.click());

        // Handle file selection via input
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files, index, false);
        }, false);
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

    function handleFiles(files, index, isDrop) {
        // Filter only video files
        const videoFiles = Array.from(files).filter(file => file.type.startsWith('video/'));

        // Update counts based on dropzone index
        if (index === 0) { // Hooks
            if (isDrop) {
                hooksFiles = hooksFiles.concat(videoFiles);
            } else {
                hooksFiles = videoFiles; // Replace for click upload
            }
        } else if (index === 1) { // Leads
            if (isDrop) {
                leadsFiles = leadsFiles.concat(videoFiles);
            } else {
                leadsFiles = videoFiles; // Replace for click upload
            }
        } else if (index === 2) { // Body
            if (isDrop) {
                bodyFiles = bodyFiles.concat(videoFiles);
            } else {
                bodyFiles = videoFiles; // Replace for click upload
            }
        }

        updateVariations();
    }
});