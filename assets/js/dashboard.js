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

    // Formula: Total Variations = (Number of Hooks or 1) × (Number of Leads or 1) × (Number of Bodies)
    // Body is compulsory, and at least one Hook or Lead is required
    function updateVariations() {
        const numberOfHooks = hooksFiles.length > 0 ? hooksFiles.length : 1;
        const numberOfLeads = leadsFiles.length > 0 ? leadsFiles.length : 1;
        const numberOfBodies = bodyFiles.length;

        const isValid = numberOfBodies > 0 && (hooksFiles.length > 0 || leadsFiles.length > 0);
        const totalVariations = isValid ? numberOfHooks * numberOfLeads * numberOfBodies : 0;

        variationCount.textContent = totalVariations;
        activeBtn.disabled = !isValid;
        if (!isValid) {
            activeBtn.style.opacity = '0.5';
        } else {
            activeBtn.style.opacity = '1';
        }
    }

    // Button Toggler and Redirect Logic with Formatted Variations
    activeBtn.addEventListener('click', () => {
        if (!activeBtn.disabled) {
            activeBtn.classList.add('hidden');
            processBtn.classList.remove('hidden');

            // Generate variations with "hook-X_body-Y.mp4" format
            const variations = [];
            hooksFiles.forEach((hook, hookIndex) => {
                bodyFiles.forEach((body, bodyIndex) => {
                    variations.push({
                        name: `hook-${hookIndex + 1}_body-${bodyIndex + 1}.mp4`
                    });
                });
            });
            // If no hooks, use leads (optional, based on your logic preference)
            if (hooksFiles.length === 0 && leadsFiles.length > 0) {
                leadsFiles.forEach((lead, leadIndex) => {
                    bodyFiles.forEach((body, bodyIndex) => {
                        variations.push({
                            name: `lead-${leadIndex + 1}_body-${bodyIndex + 1}.mp4`
                        });
                    });
                });
            }

            // Store variations and total in localStorage
            localStorage.setItem('variations', JSON.stringify(variations));
            localStorage.setItem('totalVariations', variations.length);

            // Simulate processing delay before redirect
            setTimeout(() => {
                window.location.href = 'variation.html';
            }, 2000);
        }
    });

    // Drag-and-Drop and Click Upload Functionality
    const dropzones = document.querySelectorAll('.upload-file');
    dropzones.forEach((dropzone) => {
        const fileInput = dropzone.querySelector('input[type="file"]');
        const uploadIcon = dropzone.querySelector('.upload-icon');
        const fileCount = dropzone.querySelector('.file-count');
        const errorMessage = dropzone.querySelector('.error-message');
        const index = 
            dropzone.id === 'hooksDropzone' ? 0 :
            dropzone.id === 'leadsDropzone' ? 1 :
            dropzone.id === 'bodyDropzone' ? 2 : -1;

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
            handleFiles(files, index, uploadIcon, fileCount, errorMessage);
        }, false);

        // Handle file selection via input (click upload)
        fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            handleFiles(files, index, uploadIcon, fileCount, errorMessage);
        }, false);

        // Trigger file input on click, but prevent double processing
        dropzone.addEventListener('click', (e) => {
            if (e.target === dropzone || e.target === uploadIcon || e.target === fileCount || e.target === errorMessage || e.target.tagName === 'LABEL' || e.target.tagName === 'IMG') {
                fileInput.click();
            }
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

    function handleFiles(files, index, uploadIcon, fileCount, errorMessage) {
        // Filter video files
        const videoFiles = Array.from(files).filter(file => file.type.startsWith('video/'));
        const nonVideoFiles = Array.from(files).filter(file => !file.type.startsWith('video/'));

        // Update counts based on dropzone index (append for both drag and click)
        if (index === 0) { // Hooks
            hooksFiles = hooksFiles.concat(videoFiles);
            if (hooksFiles.length > 0) {
                uploadIcon.classList.add('hidden');
                fileCount.classList.remove('hidden');
                fileCount.textContent = `${hooksFiles.length} files uploaded`;
                errorMessage.classList.add('hidden');
            }
        } else if (index === 1) { // Leads
            leadsFiles = leadsFiles.concat(videoFiles);
            if (leadsFiles.length > 0) {
                uploadIcon.classList.add('hidden');
                fileCount.classList.remove('hidden');
                fileCount.textContent = `${leadsFiles.length} files uploaded`;
                errorMessage.classList.add('hidden');
            }
        } else if (index === 2) { // Body
            bodyFiles = bodyFiles.concat(videoFiles);
            if (bodyFiles.length > 0) {
                uploadIcon.classList.add('hidden');
                fileCount.classList.remove('hidden');
                fileCount.textContent = `${bodyFiles.length} files uploaded`;
                errorMessage.classList.add('hidden');
            }
        }

        // Show error if non-video files are uploaded
        if (nonVideoFiles.length > 0) {
            errorMessage.classList.remove('hidden');
        } else if (videoFiles.length > 0) {
            errorMessage.classList.add('hidden');
        }

        updateVariations();
    }
});