// Current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// AWS Projects Data
let projects = [
    {
        id: 1,
        title: "AWS ECS Cluster Automation",
        description: "Automated deployment of containerized applications using AWS ECS with CI/CD pipeline integration. Implemented blue-green deployments with AWS CodeDeploy, automated scaling policies based on CloudWatch metrics, and integrated with AWS Secrets Manager for secure credential management.",
        technologies: ["AWS ECS", "Docker", "Terraform", "GitHub Actions", "AWS CodePipeline", "AWS CodeBuild"],
        images: [
            "https://via.placeholder.com/800x500/232F3E/FFFFFF?text=ECS+Cluster",
            "https://via.placeholder.com/800x500/232F3E/FFFFFF?text=CI/CD+Pipeline",
            "https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Deployment+Strategy"
        ],
        link: "#",
        github: "#"
    },
    {
        id: 2,
        title: "Serverless API with Lambda",
        description: "Built a scalable serverless API using AWS Lambda, API Gateway, and DynamoDB with proper authentication. Implemented JWT authentication with Amazon Cognito, request validation, rate limiting, and caching at the API Gateway level. Used AWS X-Ray for distributed tracing and performance monitoring.",
        technologies: ["AWS Lambda", "API Gateway", "DynamoDB", "Node.js", "Amazon Cognito", "AWS X-Ray"],
        images: [
            "https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Lambda+Architecture",
            "https://via.placeholder.com/800x500/232F3E/FFFFFF?text=API+Design",
            "https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Performance+Metrics"
        ],
        link: "#",
        github: "#"
    },
    {
        id: 3,
        title: "Terraform Multi-Account Setup",
        description: "Implemented secure multi-account AWS environment with IAM roles, SCPs, and centralized logging using Terraform. Created a landing zone with AWS Organizations, implemented cross-account access with IAM roles, and centralized logging with CloudTrail and Config across all accounts.",
        technologies: ["AWS Organizations", "IAM", "CloudTrail", "AWS Config", "Terraform", "SCPs"],
        images: [
            "https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Account+Structure",
            "https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Security+Controls",
            "https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Terraform+Code"
        ],
        link: "#",
        github: "#"
    }
];

// Error documentation data
let errors = [
    {
        id: 1,
        title: "ECS Task Failing to Start",
        date: "2023-07-15",
        description: "Tasks in my ECS cluster were failing to start with the error: 'CannotPullContainerError: Error response from daemon: pull access denied'. The containers couldn't be pulled from ECR.",
        solution: "Created an IAM role with proper permissions for the ECS task execution role. Added AmazonEC2ContainerRegistryReadOnly policy and verified the ECR repository permissions. Also checked the task definition to ensure the correct image URI was specified.",
        images: [
            "https://via.placeholder.com/800x500/f44336/FFFFFF?text=ECS+Error"
        ]
    },
    {
        id: 2,
        title: "Terraform State Lock Issue",
        date: "2023-09-22",
        description: "Terraform operations were failing with the error: 'Error acquiring the state lock: ConditionalCheckFailedException'. The state was locked by another process that had terminated unexpectedly.",
        solution: "Used the AWS console to manually remove the lock item from the DynamoDB table. Implemented proper error handling in CI/CD pipelines to ensure locks are always released. Added timeout configurations for state locking operations.",
        images: [
            "https://via.placeholder.com/800x500/f44336/FFFFFF?text=Terraform+Lock"
        ]
    },
    {
        id: 3,
        title: "Lambda Cold Start Timeout",
        date: "2023-11-05",
        description: "Lambda functions were timing out during cold starts when connecting to RDS, despite working fine after initialization. The 3-second default timeout was too short for the VPC-connected Lambda.",
        solution: "Increased the timeout to 30 seconds for VPC-connected Lambdas. Implemented provisioned concurrency to keep functions warm. Optimized the initialization code to reduce cold start time. Added proper error handling and retries for database connections.",
        images: [
            "https://via.placeholder.com/800x500/f44336/FFFFFF?text=Lambda+Timeout"
        ]
    }
];





/* ==================== HAPPY ENDING SECTION START ==================== */
// HAPPY ENDING data

let successGallery = [
    {
        id: 1,
        title: "AWS ECS Deployment",
        date: "2023-06-15",
        image: "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Project+Success"
    },
    {
        id: 2,
        title: "Automated Pipeline",
        date: "2023-08-20",
        image: "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=CI/CD+Pipeline"
    },
    {
        id: 3,
        title: "Terraform Deployment",
        date: "2023-10-10",
        image: "https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Infrastructure+Success"
    }
];

// Navigation functionality
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('data-section');
        
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        if (sectionId === 'home') {
            // Scroll to top for home
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
                // Scroll to the section
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
        
        // Update active nav link
        document.querySelectorAll('nav a').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Gallery functionality
let currentGalleryImages = [];
let currentGalleryIndex = 0;
let isAdminMode = false;

function setupGallery(images) {
    currentGalleryImages = images;
    currentGalleryIndex = 0;
    
    const galleryMainImage = document.getElementById('galleryMainImage');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    
    // Clear existing thumbnails
    galleryThumbnails.innerHTML = '';
    
    if (images.length === 0) {
        galleryMainImage.src = 'https://via.placeholder.com/800x500/333/666?text=No+Images';
        return;
    }
    
    // Set main image
    galleryMainImage.src = images[0];
    
    // Create thumbnails
    images.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img;
        thumbnail.classList.add('gallery-thumbnail');
        if (index === 0) thumbnail.classList.add('active');
        
        thumbnail.addEventListener('click', () => {
            currentGalleryIndex = index;
            updateGallery();
        });
        
        galleryThumbnails.appendChild(thumbnail);
    });
    
    // Show/hide navigation buttons based on image count
    document.getElementById('prevBtn').style.display = images.length > 1 ? 'block' : 'none';
    document.getElementById('nextBtn').style.display = images.length > 1 ? 'block' : 'none';
    
    // Show/hide admin controls
    document.getElementById('galleryActions').style.display = isAdminMode ? 'flex' : 'none';
}

function updateGallery() {
    const galleryMainImage = document.getElementById('galleryMainImage');
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    
    galleryMainImage.src = currentGalleryImages[currentGalleryIndex];
    
    // Update active thumbnail
    thumbnails.forEach((thumb, index) => {
        if (index === currentGalleryIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Gallery navigation
document.getElementById('prevBtn').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    updateGallery();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    updateGallery();
});

// Image upload in gallery
document.getElementById('galleryUploadInput').addEventListener('change', function(e) {
    if (e.target.files) {
        handleImageUpload(e.target.files, true);
    }
});

// Delete image in gallery
document.getElementById('deleteImageBtn').addEventListener('click', function() {
    if (currentGalleryImages.length > 0) {
        if (confirm('Delete this image?')) {
            currentGalleryImages.splice(currentGalleryIndex, 1);
            setupGallery(currentGalleryImages);
            showMessage('Image deleted successfully!', 'success');
        }
    }
});

// Copy image in gallery
document.getElementById('copyImageBtn').addEventListener('click', function() {
    if (currentGalleryImages.length > 0) {
        const currentImage = currentGalleryImages[currentGalleryIndex];
        navigator.clipboard.writeText(currentImage)
            .then(() => {
                showMessage('Image URL copied to clipboard!', 'success');
            })
            .catch(err => {
                showMessage('Failed to copy image URL', 'error');
                console.error('Failed to copy: ', err);
            });
    }
});

// Open project modal
function openProjectModal(projectId, editMode = false) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    document.getElementById('modalProjectTitle').textContent = project.title;
    document.getElementById('modalProjectDescription').textContent = project.description;
    document.getElementById('modalProjectLink').setAttribute('href', project.link);
    
    const techContainer = document.getElementById('modalProjectTech');
    techContainer.innerHTML = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Setup gallery
    setupGallery(project.images);
    
    // Show edit button if in admin mode
    document.getElementById('editProjectBtn').style.display = isAdminMode ? 'block' : 'none';
    
    document.getElementById('projectModal').style.display = 'block';
}

// Close modal
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        document.getElementById('projectModal').style.display = 'none';
        document.getElementById('projectEditorModal').style.display = 'none';
        document.getElementById('errorEditorModal').style.display = 'none';
        document.getElementById('successEditorModal').style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === document.getElementById('projectModal')) {
        document.getElementById('projectModal').style.display = 'none';
    }
    if (e.target === document.getElementById('projectEditorModal')) {
        document.getElementById('projectEditorModal').style.display = 'none';
    }
    if (e.target === document.getElementById('errorEditorModal')) {
        document.getElementById('errorEditorModal').style.display = 'none';
    }
    if (e.target === document.getElementById('successEditorModal')) {
        document.getElementById('successEditorModal').style.display = 'none';
    }
});

// Add event listeners to view buttons
document.querySelectorAll('.view-project').forEach(btn => {
    btn.addEventListener('click', function() {
        const projectId = parseInt(this.getAttribute('data-id'));
        openProjectModal(projectId);
    });
});

// Edit project button
document.getElementById('editProjectBtn').addEventListener('click', function() {
    const projectId = parseInt(document.getElementById('modalProjectTitle').getAttribute('data-id'));
    openProjectEditor(projectId);
});

// Open project editor
function openProjectEditor(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;
    
    document.getElementById('projectEditorTitle').textContent = `Edit Project: ${project.title}`;
    document.getElementById('editProjectTitle').value = project.title;
    document.getElementById('editProjectDescription').value = project.description;
    document.getElementById('editProjectLink').value = project.link;
    
    // Set current project ID
    document.getElementById('editProjectTitle').setAttribute('data-id', project.id);
    
    // Setup technologies
    const techContainer = document.getElementById('editorTechTags');
    techContainer.innerHTML = project.technologies.map(tech => `
        <span class="tech-tag" style="position: relative; padding-right: 20px;">
            ${tech}
            <span class="remove-tech" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); cursor: pointer;">
                <i class="fas fa-times"></i>
            </span>
        </span>
    `).join('');
    
    // Add remove handlers
    document.querySelectorAll('.remove-tech').forEach(btn => {
        btn.addEventListener('click', function() {
            const tech = this.parentElement.textContent.trim();
            const techContainer = document.getElementById('editorTechTags');
            const tags = Array.from(techContainer.querySelectorAll('.tech-tag'))
                .map(tag => tag.textContent.trim());
            
            const updatedTags = tags.filter(t => t !== tech);
            techContainer.innerHTML = updatedTags.map(tech => `
                <span class="tech-tag" style="position: relative; padding-right: 20px;">
                    ${tech}
                    <span class="remove-tech" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </span>
                </span>
            `).join('');
            
            // Re-add event listeners
            document.querySelectorAll('.remove-tech').forEach(btn => {
                btn.addEventListener('click', function() {
                    const tech = this.parentElement.textContent.trim();
                    const techContainer = document.getElementById('editorTechTags');
                    const tags = Array.from(techContainer.querySelectorAll('.tech-tag'))
                        .map(tag => tag.textContent.trim());
                    
                    const updatedTags = tags.filter(t => t !== tech);
                    techContainer.innerHTML = updatedTags.map(tech => `
                        <span class="tech-tag" style="position: relative; padding-right: 20px;">
                            ${tech}
                            <span class="remove-tech" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); cursor: pointer;">
                                <i class="fas fa-times"></i>
                            </span>
                        </span>
                    `).join('');
                });
            });
        });
    });
    
    // Setup image gallery in editor
    const editorGallery = document.getElementById('editorImageGallery');
    editorGallery.innerHTML = project.images.map((img, index) => `
        <div class="image-thumbnail">
            <img src="${img}" style="width: 100%; height: 120px; object-fit: cover;">
            <div class="image-thumbnail-actions">
                <button class="image-thumbnail-btn view-image" data-index="${index}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="image-thumbnail-btn delete-image" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
                <button class="image-thumbnail-btn copy-image" data-index="${index}">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for image actions
    document.querySelectorAll('.view-image').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            viewImageInEditor(project.images[index]);
        });
    });
    
    document.querySelectorAll('.delete-image').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (confirm('Delete this image?')) {
                project.images.splice(index, 1);
                openProjectEditor(project.id); // Refresh editor
                showMessage('Image deleted successfully!', 'success');
            }
        });
    });
    
    document.querySelectorAll('.copy-image').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const imageUrl = project.images[index];
            navigator.clipboard.writeText(imageUrl)
                .then(() => {
                    showMessage('Image URL copied to clipboard!', 'success');
                })
                .catch(err => {
                    showMessage('Failed to copy image URL', 'error');
                    console.error('Failed to copy: ', err);
                });
        });
    });
    
    // Image upload in editor
    document.getElementById('editorImageUpload').addEventListener('change', function(e) {
        if (e.target.files) {
            handleImageUpload(e.target.files, false, project);
        }
    });
    
    // Drag and drop for editor
    const editorUploadContainer = document.getElementById('editorUploadContainer');
    
    editorUploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        editorUploadContainer.style.borderColor = 'var(--accent)';
    });
    
    editorUploadContainer.addEventListener('dragleave', () => {
        editorUploadContainer.style.borderColor = 'var(--primary)';
    });
    
    editorUploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        editorUploadContainer.style.borderColor = 'var(--primary)';
        if (e.dataTransfer.files) {
            handleImageUpload(e.dataTransfer.files, false, project);
        }
    });
    
    // Click to upload
    editorUploadContainer.addEventListener('click', () => {
        document.getElementById('editorImageUpload').click();
    });
    
    // Show the editor modal
    document.getElementById('projectModal').style.display = 'none';
    document.getElementById('projectEditorModal').style.display = 'block';
}

// View image in editor (full screen)
function viewImageInEditor(src) {
    const viewer = document.createElement('div');
    viewer.style.position = 'fixed';
    viewer.style.top = '0';
    viewer.style.left = '0';
    viewer.style.width = '100%';
    viewer.style.height = '100%';
    viewer.style.backgroundColor = 'rgba(0,0,0,0.9)';
    viewer.style.display = 'flex';
    viewer.style.alignItems = 'center';
    viewer.style.justifyContent = 'center';
    viewer.style.zIndex = '2000';
    viewer.style.cursor = 'pointer';
    
    const img = document.createElement('img');
    img.src = src;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.objectFit = 'contain';
    
    viewer.appendChild(img);
    document.body.appendChild(viewer);
    
    viewer.addEventListener('click', () => {
        document.body.removeChild(viewer);
    });
}

// Handle image uploads
function handleImageUpload(files, forGallery = false, project = null) {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    let uploadedCount = 0;
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') && validImageTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = function(event) {
                if (forGallery) {
                    // For gallery in view mode
                    currentGalleryImages.push(event.target.result);
                    setupGallery(currentGalleryImages);
                } else if (project) {
                    // For editor mode
                    project.images.push(event.target.result);
                    openProjectEditor(project.id); // Refresh editor
                }
                uploadedCount++;
                
                if (uploadedCount === files.length) {
                    showMessage(`${uploadedCount} image(s) uploaded successfully!`, 'success');
                }
            };
            reader.readAsDataURL(file);
        } else {
            showMessage('Only JPG, PNG, GIF, or WEBP images are allowed', 'error');
        }
    });
}
/* ==================== HAPPY ENDING SECTION END ==================== */












// Resume SECTION Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize resume from localStorage if available
    if (localStorage.getItem('resumeData')) {
        loadResumeFromStorage();
    }
    
    // Set up edit/save functionality
    setupResumeEditor();
    
    // Set up print/download/delete/upload buttons
    setupResumeActions();
});

function setupResumeEditor() {
    const editBtn = document.getElementById('editResumeBtn');
    const saveBtn = document.getElementById('saveResumeBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    
    editBtn.addEventListener('click', function() {
        enableEditMode();
    });
    
    saveBtn.addEventListener('click', function() {
        saveResume();
    });
    
    cancelBtn.addEventListener('click', function() {
        disableEditMode();
        // Reload from storage to discard changes
        if (localStorage.getItem('resumeData')) {
            loadResumeFromStorage();
        }
    });
}

function enableEditMode() {
    document.getElementById('resumeContent').classList.add('edit-mode');
    document.getElementById('editResumeBtn').style.display = 'none';
    document.getElementById('saveResumeBtn').style.display = 'inline-block';
    document.getElementById('cancelEditBtn').style.display = 'inline-block';
    
    // Make all editable elements contenteditable
    document.querySelectorAll('.editable-text, .experience-details li, .skills-column li, #resumeName, #resumeTitle, #resumeEmail, #resumePhone, #resumeLinkedIn, #resumeGithub, .experience-header h3, .experience-company, .experience-date').forEach(el => {
        el.setAttribute('contenteditable', 'true');
    });
}

function disableEditMode() {
    document.getElementById('resumeContent').classList.remove('edit-mode');
    document.getElementById('editResumeBtn').style.display = 'inline-block';
    document.getElementById('saveResumeBtn').style.display = 'none';
    document.getElementById('cancelEditBtn').style.display = 'none';
    
    // Disable contenteditable
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
        el.setAttribute('contenteditable', 'false');
    });
}

function saveResume() {
    const resumeData = {
        name: document.getElementById('resumeName').textContent,
        title: document.getElementById('resumeTitle').textContent,
        contact: {
            email: document.getElementById('resumeEmail').textContent,
            phone: document.getElementById('resumePhone').textContent,
            linkedin: document.getElementById('resumeLinkedIn').textContent,
            github: document.getElementById('resumeGithub').textContent
        },
        summary: document.getElementById('professionalSummary').innerHTML,
        skills: {
            cloudPlatforms: Array.from(document.getElementById('cloudPlatforms').children).map(li => li.textContent),
            iac: Array.from(document.getElementById('iac').children).map(li => li.textContent),
            ciCdTools: Array.from(document.getElementById('ciCdTools').children).map(li => li.textContent),
            containerization: Array.from(document.getElementById('containerization').children).map(li => li.textContent),
            monitoring: Array.from(document.getElementById('monitoring').children).map(li => li.textContent),
            scripting: Array.from(document.getElementById('scripting').children).map(li => li.textContent),
            security: Array.from(document.getElementById('security').children).map(li => li.textContent),
            networking: Array.from(document.getElementById('networking').children).map(li => li.textContent),
            os: Array.from(document.getElementById('os').children).map(li => li.textContent)
        },
        experience: Array.from(document.querySelectorAll('.experience-item')).map(exp => ({
            title: exp.querySelector('.experience-header h3')?.textContent || '',
            date: exp.querySelector('.experience-date')?.textContent || '',
            company: exp.querySelector('.experience-company')?.textContent || '',
            details: Array.from(exp.querySelectorAll('.experience-details li')).map(li => li.textContent)
        })),
        projects: Array.from(document.querySelectorAll('.resume-section:nth-of-type(4) .experience-item')).map(proj => ({
            title: proj.querySelector('h3')?.textContent || '',
            description: proj.querySelector('p')?.textContent || '',
            contributions: Array.from(proj.querySelectorAll('li')).map(li => li.textContent),
            impact: proj.querySelector('p:last-of-type')?.textContent || ''
        })),
        education: Array.from(document.querySelectorAll('.resume-section:nth-of-type(5) .experience-item')).map(edu => ({
            degree: edu.querySelector('h3')?.textContent || '',
            date: edu.querySelector('.experience-date')?.textContent || '',
            institution: edu.querySelector('.experience-company')?.textContent || ''
        })),
        additionalInfo: document.getElementById('additionalInfo').innerHTML
    };
    
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    disableEditMode();
    
    // Show success message
    showToast('Resume saved successfully!', 'success');
}

function loadResumeFromStorage() {
    const resumeData = JSON.parse(localStorage.getItem('resumeData'));
    if (!resumeData) return;
    
    // Basic info
    document.getElementById('resumeName').textContent = resumeData.name || 'SAMUEL UGWU EBUBE';
    document.getElementById('resumeTitle').textContent = resumeData.title || 'DEVOPS ENGINEER | CLOUD AUTOMATION';
    
    // Contact info
    document.getElementById('resumeEmail').textContent = resumeData.contact?.email || 'melvinsamuel070@gmail.com';
    document.getElementById('resumePhone').textContent = resumeData.contact?.phone || '+234-703-655-4955';
    document.getElementById('resumeLinkedIn').textContent = resumeData.contact?.linkedin || 'LinkedIn';
    document.getElementById('resumeGithub').textContent = resumeData.contact?.github || 'GitHub';
    
    // Summary
    document.getElementById('professionalSummary').innerHTML = resumeData.summary || 
        'Results-driven DevOps Engineer with 3+ years of experience in designing, automating, and maintaining cloud-based solutions...';
    
    // Skills
    populateList('cloudPlatforms', resumeData.skills?.cloudPlatforms || ['AWS (EC2, S3, RDS, IAM, Lambda, CloudFormation)']);
    populateList('iac', resumeData.skills?.iac || ['Terraform', 'AWS CloudFormation']);
    populateList('ciCdTools', resumeData.skills?.ciCdTools || ['Jenkins', 'GitHub Actions', 'AWS CodePipeline']);
    populateList('containerization', resumeData.skills?.containerization || ['Docker', 'Kubernetes (EKS, ECS)']);
    populateList('monitoring', resumeData.skills?.monitoring || ['AWS CloudWatch', 'Prometheus', 'Grafana', 'ELK Stack']);
    populateList('scripting', resumeData.skills?.scripting || ['Shell', 'Python', 'JSON', 'YAML']);
    populateList('security', resumeData.skills?.security || ['IAM', 'SSL/TLS', 'Security Groups', 'OWASP ZAP']);
    populateList('networking', resumeData.skills?.networking || ['VPC', 'Load Balancing', 'DNS', 'TCP/IP', 'Firewall Configuration']);
    populateList('os', resumeData.skills?.os || ['Linux (Ubuntu, Red Hat, CentOS)', 'MacOS']);
    
    // Experience (currently handles only the first experience item as per your HTML)
    if (resumeData.experience?.length > 0) {
        const exp = resumeData.experience[0];
        const expItem = document.querySelector('.experience-item');
        if (expItem) {
            if (expItem.querySelector('.experience-header h3')) {
                expItem.querySelector('.experience-header h3').textContent = exp.title;
            }
            if (expItem.querySelector('.experience-date')) {
                expItem.querySelector('.experience-date').textContent = exp.date;
            }
            if (expItem.querySelector('.experience-company')) {
                expItem.querySelector('.experience-company').textContent = exp.company;
            }
            if (expItem.querySelector('.experience-details')) {
                populateListElement(expItem.querySelector('.experience-details'), exp.details);
            }
        }
    }
    
    // Projects (currently handles all project items)
    const projectItems = document.querySelectorAll('.resume-section:nth-of-type(4) .experience-item');
    if (resumeData.projects?.length > 0) {
        resumeData.projects.forEach((proj, index) => {
            if (index < projectItems.length) {
                const projItem = projectItems[index];
                if (projItem.querySelector('h3')) {
                    projItem.querySelector('h3').textContent = proj.title;
                }
                if (projItem.querySelector('p')) {
                    projItem.querySelector('p').textContent = proj.description;
                }
                if (projItem.querySelector('ul')) {
                    populateListElement(projItem.querySelector('ul'), proj.contributions);
                }
                if (projItem.querySelector('p:last-of-type')) {
                    projItem.querySelector('p:last-of-type').textContent = proj.impact;
                }
            }
        });
    }
    
    // Education
    const eduItem = document.querySelector('.resume-section:nth-of-type(5) .experience-item');
    if (resumeData.education?.length > 0) {
        const edu = resumeData.education[0];
        if (eduItem) {
            if (eduItem.querySelector('.experience-header h3')) {
                eduItem.querySelector('.experience-header h3').textContent = edu.degree;
            }
            if (eduItem.querySelector('.experience-date')) {
                eduItem.querySelector('.experience-date').textContent = edu.date;
            }
            if (eduItem.querySelector('.experience-company')) {
                eduItem.querySelector('.experience-company').textContent = edu.institution;
            }
        }
    }
    
    // Additional info
    document.getElementById('additionalInfo').innerHTML = resumeData.additionalInfo || 
        '<p><strong>References:</strong> Available upon request.</p>';
}

function populateList(elementId, items) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    container.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        container.appendChild(li);
    });
}

function populateListElement(container, items) {
    if (!container) return;
    
    container.innerHTML = '';
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        container.appendChild(li);
    });
}

function setupResumeActions() {
    // Print Resume
    document.getElementById('printResumeBtn').addEventListener('click', function() {
        window.print();
    });
    
    // Download as PDF
    document.getElementById('downloadPdfBtn').addEventListener('click', function() {
        generatePDF();
    });
    
    // Delete Resume
    document.getElementById('deleteResumeBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your resume? This action cannot be undone.')) {
            localStorage.removeItem('resumeData');
            // Reset to default content
            loadResumeFromStorage();
            showToast('Resume deleted successfully!', 'success');
        }
    });
    
    // Upload Resume
    document.getElementById('uploadResumeBtn').addEventListener('click', function() {
        document.getElementById('resumeUpload').click();
    });
    
    document.getElementById('resumeUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/json' || 
                file.name.endsWith('.json')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const data = JSON.parse(e.target.result);
                        localStorage.setItem('resumeData', JSON.stringify(data));
                        loadResumeFromStorage();
                        showToast('Resume imported successfully!', 'success');
                    } catch (error) {
                        showToast('Error parsing JSON file', 'error');
                        console.error('Error parsing JSON:', error);
                    }
                };
                reader.readAsText(file);
            } else {
                showToast('Please upload a valid JSON file', 'error');
            }
        }
    });
}

function generatePDF() {
    // Create a temporary clone of the resume for PDF generation
    const resumeClone = document.getElementById('resumeContent').cloneNode(true);
    resumeClone.style.color = '#000';
    resumeClone.style.backgroundColor = '#fff';
    resumeClone.style.padding = '20px';
    
    // Remove edit controls and buttons
    resumeClone.querySelectorAll('.resume-controls, .resume-actions, .add-item-btn').forEach(el => el.remove());
    
    // Create a print window
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>${document.getElementById('resumeName').textContent} - Resume</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #000; margin: 0; padding: 20px; }
                    .resume-name { font-size: 24pt; font-weight: bold; margin-bottom: 5px; }
                    .resume-title { font-size: 14pt; color: #333; margin-bottom: 15px; }
                    .resume-section-title { 
                        font-size: 16pt; 
                        border-bottom: 2px solid #007bff; 
                        padding-bottom: 5px;
                        margin: 20px 0 15px;
                    }
                    .resume-contact { 
                        display: flex; 
                        justify-content: center; 
                        flex-wrap: wrap; 
                        gap: 15px;
                        margin-bottom: 20px;
                    }
                    .resume-contact p { margin: 0; }
                    .skills-container { 
                        display: grid; 
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); 
                        gap: 15px;
                        margin-bottom: 20px;
                    }
                    .skills-column h3 { font-size: 12pt; margin-bottom: 5px; }
                    ul { margin-left: 20px; padding-left: 0; }
                    li { margin-bottom: 5px; }
                    .experience-item { margin-bottom: 15px; }
                    .experience-header { display: flex; justify-content: space-between; }
                    .experience-company { font-weight: bold; margin: 5px 0; }
                    @page { size: A4; margin: 1cm; }
                </style>
            </head>
            <body>
                ${resumeClone.outerHTML}
                <script>
                    setTimeout(function() {
                        window.print();
                        window.close();
                    }, 500);
                </script>
            </body>
        </html>
    `);
    printWindow.document.close();
}

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Add some basic styling for the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.padding = '12px 24px';
    toast.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    toast.style.color = 'white';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    
    setTimeout(() => {
        toast.style.opacity = '1';
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }, 100);
}










// ADMIN CONTROL SYSTEM AND PASSWORD
let isAdmin = false;

// Check if user is admin (in a real app, this would be server-side verification)
function checkAdminStatus() {
    // For demo purposes, we'll use a simple prompt
    // In production, this should be proper authentication
    const adminPassword = localStorage.getItem('adminPassword');
    if (adminPassword === 'melvin') { // Replace with your secure password
        isAdmin = true;
        activateAdminFeatures();
    }
}
// Toggle Admin Panel
document.getElementById('adminToggle').addEventListener('click', function() {
    if (!isAdmin) {
        const password = prompt('Enter admin password:');
        if (password === 'melvin') { // Replace with your secure password
            localStorage.setItem('adminPassword', password);
            isAdmin = true;
            activateAdminFeatures();
            showMessage('Admin mode activated', 'success');
        } else {
            showMessage('Invalid password', 'error');
        }
    } else {
        isAdmin = false;
        deactivateAdminFeatures();
        showMessage('Admin mode deactivated', 'success');
    }
});

function activateAdminFeatures() {
    // Show admin panel
    document.getElementById('adminPanel').style.display = 'block';
    document.getElementById('adminToggle').classList.add('active');
    
    // Show all edit buttons
    document.querySelectorAll('.edit-success, .delete-success').forEach(btn => {
        btn.style.display = 'inline-block';
    });
    
    // Show project edit buttons
    document.querySelectorAll('.view-project').forEach(btn => {
        btn.innerHTML = '<i class="fas fa-edit"></i> Edit Project';
    });
    
    // Show gallery actions
    document.getElementById('galleryActions').style.display = 'flex';
    
    // Show zoom controls
    document.getElementById('zoomControls').style.display = 'flex';
    
    // Enable content editing
    enableContentEditing();
}

function deactivateAdminFeatures() {
    // Hide admin panel
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminToggle').classList.remove('active');
    
    // Hide all edit buttons
    document.querySelectorAll('.edit-success, .delete-success').forEach(btn => {
        btn.style.display = 'none';
    });
    
    // Reset project view buttons
    document.querySelectorAll('.view-project').forEach(btn => {
        btn.innerHTML = '<i class="fas fa-eye"></i> View Details';
    });
    
    // Hide gallery actions
    document.getElementById('galleryActions').style.display = 'none';
    
    // Hide zoom controls
    document.getElementById('zoomControls').style.display = 'none';
    
    // Disable content editing
    disableContentEditing();
}

function enableContentEditing() {
    // Make all section titles editable
    document.querySelectorAll('.section-title').forEach(title => {
        title.setAttribute('contenteditable', 'true');
        title.style.borderBottom = '1px dashed #ccc';
    });
    
    // Make about text editable
    document.querySelectorAll('.about-text p').forEach(para => {
        para.setAttribute('contenteditable', 'true');
        para.style.borderLeft = '2px solid var(--primary)';
        para.style.paddingLeft = '10px';
    });
}

function disableContentEditing() {
    // Remove editable attributes
    document.querySelectorAll('[contenteditable="true"]').forEach(element => {
        element.removeAttribute('contenteditable');
        element.style.borderBottom = 'none';
        element.style.borderLeft = 'none';
        element.style.paddingLeft = '0';
    });
}

// Admin options
document.getElementById('editProfile').addEventListener('click', function() {
    if (isAdmin) {
        // Implement profile editing functionality
        alert('Profile editor will open here');
    }
});

document.getElementById('addProject').addEventListener('click', function() {
    if (isAdmin) {
        // Open project editor in create mode
        openProjectEditor(null, true);
    }
});

document.getElementById('editContent').addEventListener('click', function() {
    if (isAdmin) {
        // Toggle content editing
        if (document.querySelector('[contenteditable="true"]')) {
            disableContentEditing();
            showMessage('Content editing disabled', 'info');
        } else {
            enableContentEditing();
            showMessage('Content editing enabled', 'info');
        }
    }
});

// Initialize admin status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAdminStatus();
});

// Add technology in editor
document.getElementById('addTechBtn').addEventListener('click', function() {
    const techInput = document.getElementById('newTechInput');
    const tech = techInput.value.trim();
    
    if (tech) {
        const techContainer = document.getElementById('editorTechTags');
        const existingTechs = Array.from(techContainer.querySelectorAll('.tech-tag'))
            .map(tag => tag.textContent.trim());
        
        if (!existingTechs.includes(tech)) {
            techContainer.innerHTML += `
                <span class="tech-tag" style="position: relative; padding-right: 20px;">
                    ${tech}
                    <span class="remove-tech" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </span>
                </span>
            `;
            
            // Add event listener to the new remove button
            const newRemoveBtn = techContainer.querySelector('.tech-tag:last-child .remove-tech');
            newRemoveBtn.addEventListener('click', function() {
                const tech = this.parentElement.textContent.trim();
                const techContainer = document.getElementById('editorTechTags');
                const tags = Array.from(techContainer.querySelectorAll('.tech-tag'))
                    .map(tag => tag.textContent.trim());
                
                const updatedTags = tags.filter(t => t !== tech);
                techContainer.innerHTML = updatedTags.map(tech => `
                    <span class="tech-tag" style="position: relative; padding-right: 20px;">
                        ${tech}
                        <span class="remove-tech" style="position: absolute; right: 5px; top: 50%; transform: translateY(-50%); cursor: pointer;">
                            <i class="fas fa-times"></i>
                        </span>
                    </span>
                `).join('');
            });
            
            showMessage('Technology added successfully!', 'success');
        } else {
            showMessage('Technology already exists', 'error');
        }
        
        techInput.value = '';
    }
});

// Save project in editor
document.getElementById('saveProjectBtn').addEventListener('click', function() {
    const projectId = parseInt(document.getElementById('editProjectTitle').getAttribute('data-id'));
    const title = document.getElementById('editProjectTitle').value.trim();
    const description = document.getElementById('editProjectDescription').value.trim();
    const link = document.getElementById('editProjectLink').value.trim();
    
    // Get technologies
    const techContainer = document.getElementById('editorTechTags');
    const technologies = Array.from(techContainer.querySelectorAll('.tech-tag'))
        .map(tag => tag.textContent.trim());
    
    if (!title || !description) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
        projects[projectIndex].title = title;
        projects[projectIndex].description = description;
        projects[projectIndex].link = link || "#";
        projects[projectIndex].technologies = technologies;
        
        // Images are already updated in the project object
        
        // Update the projects grid
        renderProjects();
        
        // Close the editor
        document.getElementById('projectEditorModal').style.display = 'none';
        
        // Show success message
        showMessage('Project updated successfully!', 'success');
    }
});

// Delete project in editor
document.getElementById('deleteProjectBtn').addEventListener('click', function() {
    const projectId = parseInt(document.getElementById('editProjectTitle').getAttribute('data-id'));
    
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        projects = projects.filter(p => p.id !== projectId);
        renderProjects();
        document.getElementById('projectEditorModal').style.display = 'none';
        document.getElementById('projectModal').style.display = 'none';
        showMessage('Project deleted successfully!', 'success');
    }
});

// Cancel edit
document.getElementById('cancelEditBtn').addEventListener('click', function() {
    if (confirm('Discard all changes?')) {
        document.getElementById('projectEditorModal').style.display = 'none';
    }
});

// Enhanced zoom functionality
let currentZoom = 1;
let isDragging = false;
let startX, startY, scrollLeft, scrollTop;
let zoomedImage = null;

function setupZoomFunctionality() {
    // Add event listeners to project images for zoom
    document.querySelectorAll('.project-image, .gallery-main-image').forEach(img => {
        img.addEventListener('click', function(e) {
            if (!this.classList.contains('zoomed')) {
                // Zoom in
                this.classList.add('zoomed');
                zoomedImage = this;
                currentZoom = 2; // Initial zoom level
                document.getElementById('zoomControls').style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close zoom when clicking outside
    document.addEventListener('click', function(e) {
        if (zoomedImage && !zoomedImage.contains(e.target)) {
            zoomedImage.classList.remove('zoomed', 'grabbing');
            zoomedImage = null;
            document.getElementById('zoomControls').style.display = 'none';
            document.body.style.overflow = '';
            currentZoom = 1;
        }
    });

    // Drag to move zoomed image
    document.addEventListener('mousedown', function(e) {
        if (zoomedImage && zoomedImage.contains(e.target)) {
            isDragging = true;
            zoomedImage.classList.add('grabbing');
            startX = e.pageX - zoomedImage.offsetLeft;
            startY = e.pageY - zoomedImage.offsetTop;
            scrollLeft = zoomedImage.scrollLeft;
            scrollTop = zoomedImage.scrollTop;
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging || !zoomedImage) return;
        e.preventDefault();
        const x = e.pageX - zoomedImage.offsetLeft;
        const walkX = (x - startX) * 3;
        const y = e.pageY - zoomedImage.offsetTop;
        const walkY = (y - startY) * 3;
        zoomedImage.scrollLeft = scrollLeft - walkX;
        zoomedImage.scrollTop = scrollTop - walkY;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        if (zoomedImage) zoomedImage.classList.remove('grabbing');
    });

    // Zoom controls
    document.getElementById('zoomInBtn').addEventListener('click', function() {
        if (zoomedImage) {
            currentZoom += 0.5;
            zoomedImage.style.transform = `translate(-50%, -50%) scale(${currentZoom})`;
        }
    });

    document.getElementById('zoomOutBtn').addEventListener('click', function() {
        if (zoomedImage && currentZoom > 0.5) {
            currentZoom -= 0.5;
            zoomedImage.style.transform = `translate(-50%, -50%) scale(${currentZoom})`;
        }
    });

    document.getElementById('resetZoomBtn').addEventListener('click', function() {
        if (zoomedImage) {
            currentZoom = 1;
            zoomedImage.style.transform = `translate(-50%, -50%) scale(${currentZoom})`;
        }
    });

    // Mouse wheel zoom
    document.addEventListener('wheel', function(e) {
        if (zoomedImage && e.ctrlKey) {
            e.preventDefault();
            if (e.deltaY < 0) {
                // Zoom in
                currentZoom += 0.1;
            } else {
                // Zoom out
                if (currentZoom > 0.5) currentZoom -= 0.1;
            }
            zoomedImage.style.transform = `translate(-50%, -50%) scale(${currentZoom})`;
        }
    }, { passive: false });

    // Close zoom with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && zoomedImage) {
            zoomedImage.classList.remove('zoomed', 'grabbing');
            zoomedImage = null;
            document.getElementById('zoomControls').style.display = 'none';
            document.body.style.overflow = '';
            currentZoom = 1;
        }
    });
}

// Add project
document.getElementById('addProject').addEventListener('click', function() {
    // Create a new project object
    const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
        title: "New Project",
        description: "Describe your project here...",
        technologies: [],
        images: [],
        link: "#"
    };
    
    // Add to projects array
    projects.push(newProject);
    
    // Open editor for the new project
    openProjectEditor(newProject.id);
    
    // Close admin panel
    document.getElementById('adminPanel').style.display = 'none';
    
    showMessage('New project created!', 'success');
});

// Edit profile
document.getElementById('editProfile').addEventListener('click', function() {
    showMessage('Profile editing functionality will be implemented here.', 'success');
    document.getElementById('adminPanel').style.display = 'none';
});

// Edit content
document.getElementById('editContent').addEventListener('click', function() {
    showMessage('Content editing functionality will be implemented here.', 'success');
    document.getElementById('adminPanel').style.display = 'none';
});

// Project image slider functionality
function setupProjectSliders() {
    document.querySelectorAll('.project-image-container').forEach(container => {
        const slide = container.querySelector('.project-image-slide');
        const images = slide.querySelectorAll('.project-image');
        const dots = container.querySelectorAll('.slide-dot');
        let currentIndex = 0;
        
        // Set initial slide width
        slide.style.width = `${images.length * 100}%`;
        
        // Set initial dot state
        dots.forEach((dot, index) => {
            if (index === 0) dot.classList.add('active');
            else dot.classList.remove('active');
            
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlide();
            });
        });
        
        function updateSlide() {
            slide.style.transform = `translateX(-${currentIndex * (100 / images.length)}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                if (index === currentIndex) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }
        
        // Auto slide if more than one image
        if (images.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                updateSlide();
            }, 5000);
        }
    });
}

// Render all projects
function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" data-id="${project.id}">
            <div class="project-image-container">
                <div class="project-image-slide">
                    ${project.images.map(img => `
                        <img src="${img}" alt="${project.title}" class="project-image">
                    `).join('')}
                </div>
                <div class="project-slide-nav">
                    ${project.images.map((_, index) => `
                        <div class="slide-dot ${index === 0 ? 'active' : ''}"></div>
                    `).join('')}
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
                <div class="project-tech">
                    ${project.technologies.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    ${project.technologies.length > 3 ? `<span class="tech-tag">+${project.technologies.length - 3} more</span>` : ''}
                </div>
                <div class="project-actions">
                    <button class="btn btn-primary view-project" data-id="${project.id}">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-outline edit-project" data-id="${project.id}" style="display: ${isAdminMode ? 'block' : 'none'}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger delete-project" data-id="${project.id}" style="display: ${isAdminMode ? 'block' : 'none'}; margin-left: auto;">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners
    setupProjectInteractions();
    // Setup sliders after projects are rendered
    setupProjectSliders();
}

// Setup project interactions
function setupProjectInteractions() {
    // View project
    document.querySelectorAll('.view-project').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            openProjectModal(projectId);
        });
    });
    
    // Edit project
    document.querySelectorAll('.edit-project').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            openProjectEditor(projectId);
        });
    });
    
    // Delete project
    document.querySelectorAll('.delete-project').forEach(btn => {
        btn.addEventListener('click', function() {
            const projectId = parseInt(this.getAttribute('data-id'));
            if (confirm('Delete this project permanently?')) {
                projects = projects.filter(p => p.id !== projectId);
                renderProjects();
                showMessage('Project deleted successfully!', 'success');
            }
        });
    });
}

// Workshop interactions
function setupWorkshopInteractions() {
    // Animate the empire structure on scroll
    const empireLayers = document.querySelectorAll('.empire-layer');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    empireLayers.forEach((layer, index) => {
        layer.style.opacity = 0;
        layer.style.transform = 'translateY(20px)';
        layer.style.transition = `all 0.5s ease ${index * 0.2}s`;
        observer.observe(layer);
    });
    
    // Add tooltips to tools
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        const toolName = item.querySelector('span').textContent;
        item.setAttribute('title', `Click to see ${toolName} projects`);
        
        item.addEventListener('click', function() {
            const section = document.getElementById('projects');
            document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
            section.classList.add('active');
            section.scrollIntoView({ behavior: 'smooth' });
            
            // Update active nav link
            document.querySelectorAll('nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });
            document.querySelector('nav a[data-section="projects"]').classList.add('active');
        });
    });
}

// Empire communication functionality
function setupEmpireCommunication() {
    // Toggle communication panel
    document.getElementById('commToggle').addEventListener('click', function() {
        const panel = document.getElementById('empireComm');
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });
    
    // Send message
    document.getElementById('sendCommBtn').addEventListener('click', function() {
        const message = document.getElementById('commMessage').value.trim();
        if (message) {
            showMessage(`Message sent to the empire: "${message}"`, 'success');
            document.getElementById('commMessage').value = '';
            document.getElementById('empireComm').style.display = 'none';
        }
    });
    
    // Allow pressing Enter to send message
    document.getElementById('commMessage').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('sendCommBtn').click();
        }
    });
}

// Show success/error message
function showMessage(text, type = 'success') {
    const messageContainer = document.getElementById('messageContainer');
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${text}</span>
        <button class="close-message">&times;</button>
    `;
    
    messageContainer.appendChild(message);
    
    // Show the message
    setTimeout(() => {
        message.classList.add('show');
    }, 10);
    
    // Close button
    message.querySelector('.close-message').addEventListener('click', () => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => {
            message.remove();
        }, 300);
    }, 5000);
}

// Render success gallery
function renderSuccessGallery() {
    const gallery = document.getElementById('successGallery');
    gallery.innerHTML = successGallery.map(item => `
        <div class="success-item" data-id="${item.id}">
            <div class="success-actions">
                <button class="success-action-btn edit-success" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="success-action-btn delete-success" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="success-image-container">
                <img src="${item.image}" class="success-image">
            </div>
            <div class="success-info">
                <h3 class="success-title">${item.title}</h3>
                <p class="success-date">Completed: ${new Date(item.date).toLocaleDateString()}</p>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-success').forEach(btn => {
        btn.addEventListener('click', function() {
            const successId = parseInt(this.closest('.success-item').getAttribute('data-id'));
            openSuccessEditor(successId);
        });
    });
    
    document.querySelectorAll('.delete-success').forEach(btn => {
        btn.addEventListener('click', function() {
            const successId = parseInt(this.closest('.success-item').getAttribute('data-id'));
            if (confirm('Delete this success item?')) {
                successGallery = successGallery.filter(item => item.id !== successId);
                renderSuccessGallery();
                showMessage('Success item deleted!', 'success');
            }
        });
    });
}

// Open success editor
function openSuccessEditor(successId = null) {
    if (successId) {
        // Edit existing success
        const success = successGallery.find(item => item.id === successId);
        if (!success) return;
        
        document.getElementById('successEditorTitle').textContent = `Edit Success: ${success.title}`;
        document.getElementById('successTitle').value = success.title;
        document.getElementById('successDate').value = success.date;
        document.getElementById('successImagePreview').src = success.image;
        document.getElementById('successImagePreview').style.display = 'block';
        
        // Set current success ID
        document.getElementById('successTitle').setAttribute('data-id', success.id);
    } else {
        // Add new success
        document.getElementById('successEditorTitle').textContent = 'Add New Success';
        document.getElementById('successTitle').value = '';
        document.getElementById('successDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('successImagePreview').style.display = 'none';
        
        // Clear any existing ID
        document.getElementById('successTitle').removeAttribute('data-id');
    }
    
    // Image upload for success
    document.getElementById('successImageUpload').addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            
            if (file.type.startsWith('image/') && validImageTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById('successImagePreview').src = event.target.result;
                    document.getElementById('successImagePreview').style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                showMessage('Only JPG, PNG, GIF, or WEBP images are allowed', 'error');
            }
        }
    });
    
    // Drag and drop for success image
    const successUploadContainer = document.getElementById('successUploadContainer');
    
    successUploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        successUploadContainer.style.borderColor = 'var(--accent)';
    });
    
    successUploadContainer.addEventListener('dragleave', () => {
        successUploadContainer.style.borderColor = 'var(--primary)';
    });
    
    successUploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        successUploadContainer.style.borderColor = 'var(--primary)';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            
            if (file.type.startsWith('image/') && validImageTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    document.getElementById('successImagePreview').src = event.target.result;
                    document.getElementById('successImagePreview').style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                showMessage('Only JPG, PNG, GIF, or WEBP images are allowed', 'error');
            }
        }
    });
    
    // Click to upload
    successUploadContainer.addEventListener('click', () => {
        document.getElementById('successImageUpload').click();
    });
    
    // Show the editor modal
    document.getElementById('successEditorModal').style.display = 'block';
}

// Save success
document.getElementById('saveSuccessBtn').addEventListener('click', function() {
    const successId = document.getElementById('successTitle').getAttribute('data-id');
    const title = document.getElementById('successTitle').value.trim();
    const date = document.getElementById('successDate').value;
    const image = document.getElementById('successImagePreview').src;
    
    if (!title || !date || !image) {
        showMessage('Please fill in all required fields and upload an image', 'error');
        return;
    }
    
    if (successId) {
        // Update existing success
        const successIndex = successGallery.findIndex(item => item.id === parseInt(successId));
        if (successIndex !== -1) {
            successGallery[successIndex].title = title;
            successGallery[successIndex].date = date;
            successGallery[successIndex].image = image;
        }
    } else {
        // Add new success
        const newId = successGallery.length > 0 ? Math.max(...successGallery.map(item => item.id)) + 1 : 1;
        successGallery.push({
            id: newId,
            title,
            date,
            image
        });
    }
    
    // Update the display
    renderSuccessGallery();
    
    // Close the editor
    document.getElementById('successEditorModal').style.display = 'none';
    
    // Show success message
    showMessage('Success item saved!', 'success');
});

// Delete success
document.getElementById('deleteSuccessBtn').addEventListener('click', function() {
    const successId = document.getElementById('successTitle').getAttribute('data-id');
    if (!successId) {
        // New success, just close
        document.getElementById('successEditorModal').style.display = 'none';
        return;
    }
    
    if (confirm('Are you sure you want to delete this success item? This action cannot be undone.')) {
        successGallery = successGallery.filter(item => item.id !== parseInt(successId));
        renderSuccessGallery();
        document.getElementById('successEditorModal').style.display = 'none';
        showMessage('Success item deleted!', 'success');
    }
});

// Cancel success edit
document.getElementById('cancelSuccessBtn').addEventListener('click', function() {
    if (confirm('Discard all changes?')) {
        document.getElementById('successEditorModal').style.display = 'none';
    }
});

// Add success button
document.getElementById('addSuccessBtn').addEventListener('click', function() {
    openSuccessEditor();
});

// Upload success images
document.getElementById('uploadSuccessBtn').addEventListener('click', function() {
    document.getElementById('successUpload').click();
});

document.getElementById('successUpload').addEventListener('change', function(e) {
    if (e.target.files) {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        let uploadedCount = 0;
        
        Array.from(e.target.files).forEach(file => {
            if (file.type.startsWith('image/') && validImageTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const newId = successGallery.length > 0 ? Math.max(...successGallery.map(i => i.id)) + 1 : 1;
                    successGallery.push({
                        id: newId,
                        title: `Success ${newId}`,
                        date: new Date().toISOString().split('T')[0],
                        image: event.target.result
                    });
                    
                    uploadedCount++;
                    
                    if (uploadedCount === e.target.files.length) {
                        renderSuccessGallery();
                        showMessage(`${uploadedCount} success image(s) added!`, 'success');
                    }
                };
                reader.readAsDataURL(file);
            } else {
                showMessage('Only JPG, PNG, GIF, or WEBP images are allowed', 'error');
            }
        });
    }
});




// Render errors
function renderErrors() {
    const container = document.getElementById('errorsContainer');
    container.innerHTML = errors.map(error => `
        <div class="error-item" data-id="${error.id}">
            <div class="error-header">
                <h3 class="error-title">${error.title}</h3>
                <span class="error-date">${new Date(error.date).toLocaleDateString()}</span>
            </div>
            <div class="error-description">
                <p>${error.description}</p>
            </div>
            <div class="error-solution">
                <div class="error-solution-title">Solution:</div>
                <p>${error.solution}</p>
            </div>
        </div>
    `).join('');
}

// Open error editor
function openErrorEditor(errorId = null) {
    if (errorId) {
        // Edit existing error
        const error = errors.find(e => e.id === errorId);
        if (!error) return;
        
        document.getElementById('errorEditorTitle').textContent = `Edit Error: ${error.title}`;
        document.getElementById('errorTitle').value = error.title;
        document.getElementById('errorDate').value = error.date;
        document.getElementById('errorDescription').value = error.description;
        document.getElementById('errorSolution').value = error.solution;
        
        // Set current error ID
        document.getElementById('errorTitle').setAttribute('data-id', error.id);
        
        // Setup image gallery in editor
        const gallery = document.getElementById('errorImageGallery');
        gallery.innerHTML = error.images.map((img, index) => `
            <div class="image-thumbnail">
                <img src="${img}" style="width: 100%; height: 120px; object-fit: cover;">
                <div class="image-thumbnail-actions">
                    <button class="image-thumbnail-btn view-image" data-index="${index}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="image-thumbnail-btn delete-image" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="image-thumbnail-btn copy-image" data-index="${index}">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add event listeners for image actions
        document.querySelectorAll('.view-image').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                viewImageInEditor(error.images[index]);
            });
        });
        
        document.querySelectorAll('.delete-image').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                if (confirm('Delete this image?')) {
                    error.images.splice(index, 1);
                    openErrorEditor(error.id); // Refresh editor
                    showMessage('Image deleted successfully!', 'success');
                }
            });
        });
        
        document.querySelectorAll('.copy-image').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                const imageUrl = error.images[index];
                navigator.clipboard.writeText(imageUrl)
                    .then(() => {
                        showMessage('Image URL copied to clipboard!', 'success');
                    })
                    .catch(err => {
                        showMessage('Failed to copy image URL', 'error');
                        console.error('Failed to copy: ', err);
                    });
            });
        });
    } else {
        // Add new error
        document.getElementById('errorEditorTitle').textContent = 'Document New Error';
        document.getElementById('errorTitle').value = '';
        document.getElementById('errorDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('errorDescription').value = '';
        document.getElementById('errorSolution').value = '';
        document.getElementById('errorImageGallery').innerHTML = '';
        
        // Clear any existing ID
        document.getElementById('errorTitle').removeAttribute('data-id');
    }
    
    // Image upload for errors
    document.getElementById('errorImageUpload').addEventListener('change', function(e) {
        if (e.target.files) {
            handleErrorImageUpload(e.target.files);
        }
    });
    
    // Drag and drop for error images
    const errorUploadContainer = document.getElementById('errorUploadContainer');
    
    errorUploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        errorUploadContainer.style.borderColor = 'var(--accent)';
    });
    
    errorUploadContainer.addEventListener('dragleave', () => {
        errorUploadContainer.style.borderColor = 'var(--primary)';
    });
    
    errorUploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        errorUploadContainer.style.borderColor = 'var(--primary)';
        if (e.dataTransfer.files) {
            handleErrorImageUpload(e.dataTransfer.files);
        }
    });
    
    // Click to upload
    errorUploadContainer.addEventListener('click', () => {
        document.getElementById('errorImageUpload').click();
    });
    
    // Show the editor modal
    document.getElementById('errorEditorModal').style.display = 'block';
}

// Handle error image uploads
function handleErrorImageUpload(files) {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    let uploadedCount = 0;
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/') && validImageTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const gallery = document.getElementById('errorImageGallery');
                gallery.innerHTML += `
                    <div class="image-thumbnail">
                        <img src="${event.target.result}" style="width: 100%; height: 120px; object-fit: cover;">
                        <div class="image-thumbnail-actions">
                            <button class="image-thumbnail-btn view-image">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="image-thumbnail-btn delete-image">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button class="image-thumbnail-btn copy-image">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                `;
                
                uploadedCount++;
                
                if (uploadedCount === files.length) {
                    showMessage(`${uploadedCount} image(s) uploaded successfully!`, 'success');
                }
            };
            reader.readAsDataURL(file);
        } else {
            showMessage('Only JPG, PNG, GIF, or WEBP images are allowed', 'error');
        }
    });
}

// Save error
document.getElementById('saveErrorBtn').addEventListener('click', function() {
    const errorId = document.getElementById('errorTitle').getAttribute('data-id');
    const title = document.getElementById('errorTitle').value.trim();
    const date = document.getElementById('errorDate').value;
    const description = document.getElementById('errorDescription').value.trim();
    const solution = document.getElementById('errorSolution').value.trim();
    
    // Get images from gallery
    const gallery = document.getElementById('errorImageGallery');
    const images = Array.from(gallery.querySelectorAll('img')).map(img => img.src);
    
    if (!title || !description || !solution) {
        showMessage('Please fill in all required fields', 'error');
        return;
    }
    
    if (errorId) {
        // Update existing error
        const errorIndex = errors.findIndex(e => e.id === parseInt(errorId));
        if (errorIndex !== -1) {
            errors[errorIndex].title = title;
            errors[errorIndex].date = date;
            errors[errorIndex].description = description;
            errors[errorIndex].solution = solution;
            errors[errorIndex].images = images;
        }
    } else {
        // Add new error
        const newId = errors.length > 0 ? Math.max(...errors.map(e => e.id)) + 1 : 1;
        errors.push({
            id: newId,
            title,
            date,
            description,
            solution,
            images
        });
    }
    
    // Update the display
    renderErrors();
    
    // Close the editor
    document.getElementById('errorEditorModal').style.display = 'none';
    
    // Show success message
    showMessage('Error documentation saved successfully!', 'success');
});

// Delete error
document.getElementById('deleteErrorBtn').addEventListener('click', function() {
    const errorId = document.getElementById('errorTitle').getAttribute('data-id');
    if (!errorId) {
        // New error, just close
        document.getElementById('errorEditorModal').style.display = 'none';
        return;
    }
    
    if (confirm('Are you sure you want to delete this error documentation? This action cannot be undone.')) {
        errors = errors.filter(e => e.id !== parseInt(errorId));
        renderErrors();
        document.getElementById('errorEditorModal').style.display = 'none';
        showMessage('Error documentation deleted successfully!', 'success');
    }
});

// Cancel error edit
document.getElementById('cancelErrorBtn').addEventListener('click', function() {
    if (confirm('Discard all changes?')) {
        document.getElementById('errorEditorModal').style.display = 'none';
    }
});

// Add error button
document.getElementById('addErrorBtn').addEventListener('click', function() {
    openErrorEditor();
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupZoomFunctionality();
    renderProjects();
    renderSuccessGallery();
    renderErrors();
    setupWorkshopInteractions();
    setupEmpireCommunication();
    
    // Show home content (header is already visible)
    document.querySelector('nav a[data-section="home"]').classList.add('active');
    
    // Handle contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showMessage('Thank you for your message! I will get back to you soon.', 'success');
        this.reset();
    });
    
    // Smooth scrolling for "Explore My Projects" button
    document.querySelector('a[data-section="projects"]').addEventListener('click', function(e) {
        e.preventDefault();
        const projectsSection = document.getElementById('projects');
        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show projects section
        projectsSection.classList.add('active');
        projectsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update active nav link
        document.querySelectorAll('nav a').forEach(navLink => {
            navLink.classList.remove('active');
        });
        document.querySelector('nav a[data-section="projects"]').classList.add('active');
    });
    
    // Tab functionality in project editor
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Deactivate all tab buttons
            document.querySelectorAll('.tab-btn').forEach(tabBtn => {
                tabBtn.classList.remove('active');
            });
            
            // Activate current tab
            this.classList.add('active');
            document.getElementById(`${tabId}Tab`).classList.add('active');
        });
    });
});


// For seamless infinite scrolling (add before closing </body>)
document.addEventListener('DOMContentLoaded', function() {
    const marqueeContent = document.querySelector('.marquee-content');
    const projects = marqueeContent.innerHTML;
    marqueeContent.innerHTML = projects + projects; // Duplicate content
    
    // Pause animation on hover
    const container = document.querySelector('.marquee-container');
    container.addEventListener('mouseenter', () => {
        marqueeContent.style.animationPlayState = 'paused';
    });
    container.addEventListener('mouseleave', () => {
        marqueeContent.style.animationPlayState = 'running';
    });
});


