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







// Enhanced Error Documentation System
document.addEventListener('DOMContentLoaded', function() {
    // Global errors array
    let errors = [];

    // DOM Elements
    const errorsContainer = document.getElementById('errorsContainer');
    const editorModal = document.getElementById('errorEditorModal');
    const newErrorBtn = document.getElementById('newErrorBtn');
    const saveErrorBtn = document.getElementById('saveErrorBtn');
    const cancelErrorBtn = document.getElementById('cancelErrorBtn');
    const deleteErrorBtn = document.getElementById('deleteErrorBtn');
    const errorTitleInput = document.getElementById('errorTitle');
    const errorDateInput = document.getElementById('errorDate');
    const errorDescInput = document.getElementById('errorDescription');
    const errorSolutionInput = document.getElementById('errorSolution');
    const errorImageUpload = document.getElementById('errorImageUpload');
    const errorImageGallery = document.getElementById('errorImageGallery');
    const errorUploadContainer = document.getElementById('errorUploadContainer');
    const closeModalBtn = document.querySelector('.close-modal');

    // Initialize
    loadErrors();
    setupEventListeners();

    // Function to manually add an error
    function addManualError(errorData) {
        // Validate and set default values
        if (!errorData.id) errorData.id = Date.now().toString();
        if (!errorData.date) errorData.date = new Date().toISOString().split('T')[0];
        if (!errorData.images) errorData.images = [];
        
        // Basic validation for required fields
        if (!errorData.title || !errorData.description || !errorData.solution) {
            console.error('Error: Missing required fields (title, description, or solution)');
            return false;
        }

        // Add to errors array
        errors.push(errorData);
        
        // Save to localStorage
        saveErrorsToStorage();
        
        // Refresh the display
        renderErrors();
        
        return errorData.id;
    }

    // Load errors from localStorage
    function loadErrors() {
        const savedErrors = localStorage.getItem('errorDocumentation');
        if (savedErrors) {
            try {
                errors = JSON.parse(savedErrors) || [];
                renderErrors();
            } catch (e) {
                console.error('Error parsing saved errors:', e);
                errors = [];
            }
        }
    }

    // Save errors to localStorage
    function saveErrorsToStorage() {
        try {
            localStorage.setItem('errorDocumentation', JSON.stringify(errors));
        } catch (e) {
            console.error('Error saving errors to storage:', e);
            // Handle storage full or other issues
            showMessage('Warning: Could not save all data to local storage. Some data may be lost.', 'warning');
        }
    }

    // Render all errors
    function renderErrors() {
        errorsContainer.innerHTML = '';
        
        if (errors.length === 0) {
            errorsContainer.innerHTML = `
                <div class="no-errors-placeholder">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>No errors documented yet. Click "Add Error Documentation" to get started.</p>
                </div>
            `;
            return;
        }

        // Sort errors by date (newest first)
        const sortedErrors = [...errors].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedErrors.forEach(error => {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-item';
            errorElement.dataset.id = error.id;
            
            // Format date for display
            const formattedDate = new Date(error.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            
            errorElement.innerHTML = `
                <div class="error-header">
                    <h3 class="error-title">${escapeHtml(error.title)}</h3>
                    <span class="error-date">${formattedDate}</span>
                    <div class="error-actions">
                        <button class="btn-edit-error" data-id="${error.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-delete-error" data-id="${error.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="error-description">
                    <p>${formatTextWithLineBreaks(error.description)}</p>
                </div>
                <div class="error-solution">
                    <div class="error-solution-title">Solution:</div>
                    <p>${formatTextWithLineBreaks(error.solution)}</p>
                </div>
                ${error.images && error.images.length > 0 ? `
                <div class="error-images">
                    <div class="images-title">Attached Images:</div>
                    <div class="images-container">
                        ${error.images.map((img, index) => `
                            <div class="image-thumbnail" data-index="${index}">
                                <img src="${img}" alt="Error image ${index + 1}">
                                <button class="btn-view-image" data-url="${img}">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            `;
            
            errorsContainer.appendChild(errorElement);
        });

        // Add event listeners to all edit/delete buttons
        document.querySelectorAll('.btn-edit-error').forEach(btn => {
            btn.addEventListener('click', function() {
                openEditor(this.dataset.id);
            });
        });

        document.querySelectorAll('.btn-delete-error').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this error?')) {
                    deleteError(this.dataset.id);
                }
            });
        });

        // Add event listeners to view image buttons
        document.querySelectorAll('.btn-view-image').forEach(btn => {
            btn.addEventListener('click', function() {
                viewImage(this.dataset.url);
            });
        });
    }

    // Helper function to escape HTML
    function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Helper function to preserve line breaks in text
    function formatTextWithLineBreaks(text) {
        if (!text) return '';
        return escapeHtml(text).replace(/\n/g, '<br>');
    }

    // Open editor (for new or existing error)
    function openEditor(errorId = null) {
        // Reset form
        errorTitleInput.value = '';
        errorDateInput.value = new Date().toISOString().split('T')[0];
        errorDescInput.value = '';
        errorSolutionInput.value = '';
        errorImageGallery.innerHTML = '<div class="no-images-message">No images uploaded</div>';
        deleteErrorBtn.style.display = 'none';
        errorTitleInput.removeAttribute('data-id');

        // If editing existing error
        if (errorId) {
            const error = errors.find(e => e.id === errorId);
            if (error) {
                errorTitleInput.value = error.title;
                errorDateInput.value = error.date;
                errorDescInput.value = error.description;
                errorSolutionInput.value = error.solution;
                errorTitleInput.dataset.id = error.id;
                deleteErrorBtn.style.display = 'block';

                if (error.images && error.images.length > 0) {
                    errorImageGallery.innerHTML = '';
                    error.images.forEach(img => {
                        addImageToGallery(img);
                    });
                }
            }
        }

        // Show modal
        editorModal.style.display = 'block';
        errorTitleInput.focus();
    }

    // Save error
    function saveError() {
        const errorId = errorTitleInput.dataset.id || Date.now().toString();
        const title = errorTitleInput.value.trim();
        const date = errorDateInput.value;
        const description = errorDescInput.value.trim();
        const solution = errorSolutionInput.value.trim();
        
        // Get all images from gallery
        const images = [];
        errorImageGallery.querySelectorAll('img').forEach(img => {
            images.push(img.src);
        });

        // Validate
        if (!title) {
            showMessage('Please enter an error title', 'error');
            errorTitleInput.focus();
            return;
        }
        
        if (!date) {
            showMessage('Please select a date', 'error');
            errorDateInput.focus();
            return;
        }
        
        if (!description) {
            showMessage('Please describe the error', 'error');
            errorDescInput.focus();
            return;
        }
        
        if (!solution) {
            showMessage('Please provide a solution', 'error');
            errorSolutionInput.focus();
            return;
        }

        // Create/update error object
        const errorData = {
            id: errorId,
            title,
            date,
            description,
            solution,
            images
        };

        // Check if updating existing error
        const existingIndex = errors.findIndex(e => e.id === errorId);
        if (existingIndex >= 0) {
            errors[existingIndex] = errorData;
        } else {
            errors.push(errorData);
        }

        // Save to localStorage and refresh
        saveErrorsToStorage();
        renderErrors();
        closeEditor();
        showMessage('Error documentation saved successfully!', 'success');
    }

    // Delete error
    function deleteError(errorId) {
        errors = errors.filter(error => error.id !== errorId);
        saveErrorsToStorage();
        renderErrors();
        closeEditor();
        showMessage('Error documentation deleted', 'success');
    }

    // Close editor
    function closeEditor() {
        editorModal.style.display = 'none';
    }

    // Add image to gallery
    function addImageToGallery(imageSrc) {
        const noImagesMsg = errorImageGallery.querySelector('.no-images-message');
        if (noImagesMsg) noImagesMsg.remove();

        const imgContainer = document.createElement('div');
        imgContainer.className = 'uploaded-image';
        imgContainer.innerHTML = `
            <img src="${imageSrc}" alt="Uploaded image">
            <div class="image-actions">
                <button class="btn-view-image" data-url="${imageSrc}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-delete-image">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // Add event listeners
        imgContainer.querySelector('.btn-view-image').addEventListener('click', function() {
            viewImage(this.dataset.url);
        });

        imgContainer.querySelector('.btn-delete-image').addEventListener('click', function() {
            if (confirm('Delete this image?')) {
                imgContainer.remove();
                if (errorImageGallery.children.length === 0) {
                    errorImageGallery.innerHTML = '<div class="no-images-message">No images uploaded</div>';
                }
            }
        });

        errorImageGallery.appendChild(imgContainer);
    }

    // View image in modal
    function viewImage(imageUrl) {
        const modal = document.createElement('div');
        modal.className = 'image-viewer-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <img src="${imageUrl}" alt="Full size image">
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        modal.querySelector('.close').addEventListener('click', function() {
            modal.remove();
            document.body.style.overflow = '';
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = '';
            }
        });
    }

    // Show message
    function showMessage(text, type) {
        // Remove any existing messages first
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        document.body.appendChild(message);

        setTimeout(() => {
            message.classList.add('fade-out');
            setTimeout(() => {
                message.remove();
            }, 300);
        }, 3000);
    }

    // Setup event listeners
    function setupEventListeners() {
        // New error button
        newErrorBtn.addEventListener('click', function() {
            openEditor();
        });

        // Save error button
        saveErrorBtn.addEventListener('click', function() {
            saveError();
        });

        // Cancel button
        cancelErrorBtn.addEventListener('click', function() {
            closeEditor();
        });

        // Close modal button
        closeModalBtn.addEventListener('click', function() {
            closeEditor();
        });

        // Delete button
        deleteErrorBtn.addEventListener('click', function() {
            if (errorTitleInput.dataset.id) {
                if (confirm('Are you sure you want to delete this error documentation?')) {
                    deleteError(errorTitleInput.dataset.id);
                }
            }
        });

        // Close modal when clicking outside
        editorModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeEditor();
            }
        });

        // Close modal with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && editorModal.style.display === 'block') {
                closeEditor();
            }
        });

        // Image upload handling
        errorImageUpload.addEventListener('change', function(e) {
            if (e.target.files) {
                handleImageUpload(e.target.files);
            }
        });

        // Drag and drop for images
        errorUploadContainer.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        errorUploadContainer.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });

        errorUploadContainer.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            if (e.dataTransfer.files) {
                handleImageUpload(e.dataTransfer.files);
            }
        });

        // Click to upload
        errorUploadContainer.addEventListener('click', function() {
            errorImageUpload.click();
        });

        // Allow pressing Enter in title field to save
        errorTitleInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                saveErrorBtn.click();
            }
        });
    }

    // Handle image upload
    function handleImageUpload(files) {
        if (files.length > 10) {
            showMessage('Maximum 10 images can be uploaded at once', 'warning');
            return;
        }

        Array.from(files).slice(0, 10).forEach(file => {
            if (!file.type.match('image.*')) {
                showMessage('Skipped non-image file: ' + file.name, 'warning');
                return;
            }

            // Check if file size is reasonable (under 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showMessage('Image too large (max 5MB): ' + file.name, 'warning');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                addImageToGallery(e.target.result);
            };
            reader.onerror = function() {
                showMessage('Error loading image: ' + file.name, 'error');
            };
            reader.readAsDataURL(file);
        });
    }

    // Make addManualError available globally if needed
    window.addManualError = addManualError;
});









// Tech Tutorials Management System
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const addTutorialBtn = document.getElementById('addTutorialBtn');
    const uploadPdfBtn = document.getElementById('uploadPdfBtn');
    const pdfUpload = document.getElementById('pdfUpload');
    const tutorialsContainer = document.querySelector('.tutorials-container');
    const tutorialEditorModal = document.getElementById('tutorialEditorModal');
    const sectionEditorModal = document.getElementById('sectionEditorModal');
    const videoModal = document.getElementById('videoModal');
    const tutorialEditorTitle = document.getElementById('tutorialEditorTitle');
    const tutorialTitleInput = document.getElementById('tutorialTitle');
    const tutorialDateInput = document.getElementById('tutorialDate');
    const tutorialSectionsContainer = document.getElementById('tutorialSections');
    const addSectionBtn = document.getElementById('addSectionBtn');
    const saveTutorialBtn = document.getElementById('saveTutorialBtn');
    const cancelTutorialBtn = document.getElementById('cancelTutorialBtn');
    const deleteTutorialBtn = document.getElementById('deleteTutorialBtn');
    const pdfUploadContainer = document.getElementById('pdfUploadContainer');
    const pdfFileUpload = document.getElementById('pdfFileUpload');
    const pdfPreview = document.getElementById('pdfPreview');
    const pdfFileName = document.getElementById('pdfFileName');
    const removePdfBtn = document.getElementById('removePdfBtn');
    const wordUploadContainer = document.getElementById('wordUploadContainer');
    const wordFileUpload = document.getElementById('wordFileUpload');
    const wordPreview = document.getElementById('wordPreview');
    const wordFileName = document.getElementById('wordFileName');
    const removeWordBtn = document.getElementById('removeWordBtn');
    const videoUploadContainer = document.getElementById('videoUploadContainer');
    const videoFileUpload = document.getElementById('videoFileUpload');
    const videoPreview = document.getElementById('videoPreview');
    const videoElement = document.getElementById('videoElement');
    const removeVideoBtn = document.getElementById('removeVideoBtn');
    const manualContentEditor = document.getElementById('manualContentEditor');
    const sectionTitleInput = document.getElementById('sectionTitle');
    const sectionContentInput = document.getElementById('sectionContent');
    const saveSectionBtn = document.getElementById('saveSectionBtn');
    const cancelSectionBtn = document.getElementById('cancelSectionBtn');
    const modalVideoPlayer = document.getElementById('modalVideoPlayer');
    const videoModalTitle = document.getElementById('videoModalTitle');

    // State variables
    let currentTutorialId = null;
    let currentSectionIndex = null;
    let isEditing = false;
    let pdfFile = null;
    let wordFile = null;
    let videoFile = null;
    let tutorials = [
        {
            id: 1,
            title: 'Docker Installation & Setup Guide',
            date: '2023-06-15',
            sections: [
                {
                    title: 'Installation on Ubuntu',
                    content: 'sudo apt-get update\nsudo apt-get install docker-ce docker-ce-cli containerd.io\nsudo systemctl start docker\nsudo systemctl enable docker'
                },
                {
                    title: 'Basic Commands',
                    content: 'docker run hello-world  # Test installation\ndocker ps             # List running containers\ndocker images         # List images'
                },
                {
                    title: 'Docker Compose Setup',
                    content: 'sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose\nsudo chmod +x /usr/local/bin/docker-compose'
                }
            ],
            pdfUrl: null,
            wordUrl: null,
            videoUrl: 'docker-tutorial.mp4',
            manualContent: null
        },
        {
            id: 2,
            title: 'Jenkins Installation & Configuration',
            date: '2023-07-20',
            sections: [
                {
                    title: 'Installation on Ubuntu',
                    content: 'wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -\nsudo sh -c \'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list\'\nsudo apt-get update\nsudo apt-get install jenkins'
                },
                {
                    title: 'Initial Setup',
                    content: 'sudo systemctl start jenkins\nsudo systemctl status jenkins  # Check status\nsudo cat /var/lib/jenkins/secrets/initialAdminPassword'
                },
                {
                    title: 'Common Plugins',
                    content: '- Pipeline\n- Blue Ocean\n- GitHub Integration\n- Docker Pipeline'
                }
            ],
            pdfUrl: 'jenkins-guide.pdf',
            wordUrl: null,
            videoUrl: null,
            manualContent: null
        },
        {
            id: 3,
            title: 'Kubernetes Cluster Setup',
            date: '2023-08-10',
            sections: [
                {
                    title: 'Minikube Installation',
                    content: 'curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64\nsudo install minikube-linux-amd64 /usr/local/bin/minikube\nminikube start --driver=docker'
                },
                {
                    title: 'kubectl Installation',
                    content: 'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"\nsudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl'
                },
                {
                    title: 'Basic Commands',
                    content: 'kubectl get pods -A           # List all pods\nkubectl apply -f config.yaml # Apply configuration\nkubectl get services         # List services'
                }
            ],
            pdfUrl: null,
            wordUrl: 'kubernetes-guide.docx',
            videoUrl: null,
            manualContent: null
        }    
    ];

    // Initialize the app
    function init() {
        renderTutorials();
        setupEventListeners();
        setupDragAndDrop();
        setupRichTextEditor();
    }

    // Render all tutorials
    function renderTutorials() {
        tutorialsContainer.innerHTML = '';
        tutorials.forEach(tutorial => {
            tutorialsContainer.appendChild(createTutorialCard(tutorial));
        });
        
        // Scroll to the newly added tutorial if we're adding one
        if (!isEditing && currentTutorialId) {
            const newTutorialCard = document.querySelector(`.tutorial-card[data-id="${currentTutorialId}"]`);
            if (newTutorialCard) {
                newTutorialCard.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // Create a tutorial card element
    function createTutorialCard(tutorial) {
        const card = document.createElement('div');
        card.className = 'tutorial-card';
        card.dataset.id = tutorial.id;

        // Header
        const header = document.createElement('div');
        header.className = 'tutorial-header';
        
        const title = document.createElement('h3');
        title.className = 'tutorial-title';
        title.textContent = tutorial.title;
        
        const actions = document.createElement('div');
        actions.className = 'tutorial-actions';
        
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-edit-tutorial';
        editBtn.dataset.id = tutorial.id;
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete-tutorial';
        deleteBtn.dataset.id = tutorial.id;
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'btn-copy-tutorial';
        copyBtn.dataset.id = tutorial.id;
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        actions.appendChild(copyBtn);
        
        header.appendChild(title);
        header.appendChild(actions);
        
        // Content
        const content = document.createElement('div');
        content.className = 'tutorial-content';
        
        if (tutorial.manualContent) {
            // Display manual content if it exists
            const manualContentDiv = document.createElement('div');
            manualContentDiv.className = 'manual-content';
            manualContentDiv.innerHTML = tutorial.manualContent;
            content.appendChild(manualContentDiv);
        } else {
            // Display sections if no manual content
            tutorial.sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'tutorial-section';
                
                const sectionTitle = document.createElement('h4');
                sectionTitle.textContent = section.title;
                
                // Check if content is code (wrapped in <pre><code> tags)
                if (section.content.includes('<pre><code>')) {
                    const sectionContent = document.createElement('div');
                    sectionContent.innerHTML = section.content;
                    sectionDiv.appendChild(sectionTitle);
                    sectionDiv.appendChild(sectionContent);
                } else {
                    const sectionContent = document.createElement('pre');
                    const sectionCode = document.createElement('code');
                    sectionCode.textContent = section.content;
                    sectionContent.appendChild(sectionCode);
                    sectionDiv.appendChild(sectionTitle);
                    sectionDiv.appendChild(sectionContent);
                }
                content.appendChild(sectionDiv);
            });
        }
        
        // Footer
        const footer = document.createElement('div');
        footer.className = 'tutorial-footer';
        
        const date = new Date(tutorial.date);
        const dateStr = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        const dateSpan = document.createElement('span');
        dateSpan.className = 'tutorial-date';
        dateSpan.textContent = `Last updated: ${dateStr}`;
        
        footer.appendChild(dateSpan);
        
        // PDF link if exists
        if (tutorial.pdfUrl) {
            const pdfLink = document.createElement('a');
            pdfLink.href = tutorial.pdfUrl;
            pdfLink.target = '_blank';
            pdfLink.className = 'pdf-link';
            pdfLink.innerHTML = '<i class="fas fa-file-pdf"></i> Download PDF';
            pdfLink.style.marginLeft = '1rem';
            footer.appendChild(pdfLink);
        }
        
        // Word doc link if exists
        if (tutorial.wordUrl) {
            const wordLink = document.createElement('a');
            wordLink.href = tutorial.wordUrl;
            wordLink.target = '_blank';
            wordLink.className = 'word-link';
            wordLink.innerHTML = '<i class="fas fa-file-word"></i> Download Word Doc';
            wordLink.style.marginLeft = '1rem';
            footer.appendChild(wordLink);
        }
        
        // Video link if exists
        if (tutorial.videoUrl) {
            const videoLink = document.createElement('a');
            videoLink.href = '#';
            videoLink.className = 'video-link';
            videoLink.dataset.video = tutorial.videoUrl;
            videoLink.innerHTML = '<i class="fas fa-video"></i> View Video';
            videoLink.style.marginLeft = '1rem';
            footer.appendChild(videoLink);
        }
        
        // Assemble card
        card.appendChild(header);
        card.appendChild(content);
        card.appendChild(footer);
        
        return card;
    }

    // Set up event listeners
    function setupEventListeners() {
        // Add new tutorial button
        addTutorialBtn.addEventListener('click', () => {
            openTutorialEditor(null);
        });
        
        // Upload PDF button
        uploadPdfBtn.addEventListener('click', () => {
            pdfUpload.click();
        });
        
        // PDF file input
        pdfUpload.addEventListener('change', handlePdfUpload);
        
        // Tutorial container delegate events
        tutorialsContainer.addEventListener('click', (e) => {
            // Edit tutorial
            if (e.target.closest('.btn-edit-tutorial')) {
                const tutorialId = parseInt(e.target.closest('.btn-edit-tutorial').dataset.id);
                openTutorialEditor(tutorialId);
            }
            
            // Delete tutorial
            if (e.target.closest('.btn-delete-tutorial')) {
                const tutorialId = parseInt(e.target.closest('.btn-delete-tutorial').dataset.id);
                if (confirm('Are you sure you want to delete this tutorial?')) {
                    deleteTutorial(tutorialId);
                }
            }
            
            // Copy tutorial
            if (e.target.closest('.btn-copy-tutorial')) {
                const tutorialId = parseInt(e.target.closest('.btn-copy-tutorial').dataset.id);
                copyTutorial(tutorialId);
            }
            
            // Play video
            if (e.target.closest('.video-link')) {
                const videoUrl = e.target.closest('.video-link').dataset.video;
                playVideo(videoUrl);
            }
        });
        
        // PDF upload container
        pdfUploadContainer.addEventListener('click', () => {
            pdfFileUpload.click();
        });
        
        // PDF file upload in modal
        pdfFileUpload.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                pdfFile = e.target.files[0];
                showPdfPreview(pdfFile.name);
            }
        });
        
        // Remove PDF button
        removePdfBtn.addEventListener('click', () => {
            pdfFile = null;
            pdfFileUpload.value = '';
            hidePdfPreview();
        });
        
        // Word upload container
        wordUploadContainer.addEventListener('click', () => {
            wordFileUpload.click();
        });
        
        // Word file upload in modal
        wordFileUpload.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                wordFile = e.target.files[0];
                showWordPreview(wordFile.name);
            }
        });
        
        // Remove Word button
        removeWordBtn.addEventListener('click', () => {
            wordFile = null;
            wordFileUpload.value = '';
            hideWordPreview();
        });
        
        // Video upload container
        videoUploadContainer.addEventListener('click', () => {
            videoFileUpload.click();
        });
        
        // Video file upload in modal
        videoFileUpload.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                videoFile = e.target.files[0];
                showVideoPreview(videoFile);
            }
        });
        
        // Remove Video button
        removeVideoBtn.addEventListener('click', () => {
            videoFile = null;
            videoFileUpload.value = '';
            hideVideoPreview();
        });
        
        // Add section button
        addSectionBtn.addEventListener('click', () => {
            openSectionEditor(null);
        });
        
        // Save tutorial button
        saveTutorialBtn.addEventListener('click', saveTutorial);
        
        // Cancel tutorial button
        cancelTutorialBtn.addEventListener('click', closeTutorialEditor);
        
        // Delete tutorial button
        deleteTutorialBtn.addEventListener('click', () => {
            if (currentTutorialId && confirm('Are you sure you want to delete this tutorial?')) {
                deleteTutorial(currentTutorialId);
                closeTutorialEditor();
            }
        });
        
        // Save section button
        saveSectionBtn.addEventListener('click', saveSection);
        
        // Cancel section button
        cancelSectionBtn.addEventListener('click', closeSectionEditor);
        
        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === tutorialEditorModal) {
                closeTutorialEditor();
            }
            if (e.target === sectionEditorModal) {
                closeSectionEditor();
            }
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
        
        // Close modals with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (tutorialEditorModal.style.display === 'block') {
                    closeTutorialEditor();
                } else if (sectionEditorModal.style.display === 'block') {
                    closeSectionEditor();
                } else if (videoModal.style.display === 'block') {
                    closeVideoModal();
                }
            }
        });
    }

    // Setup rich text editor functionality
    function setupRichTextEditor() {
        const toolbarButtons = document.querySelectorAll('.editor-toolbar button');
        
        toolbarButtons.forEach(button => {
            button.addEventListener('click', function() {
                const command = this.dataset.command;
                
                if (command === 'createLink' || command === 'insertImage') {
                    let url = prompt('Enter the ' + (command === 'createLink' ? 'link URL:' : 'image URL:'), 'http://');
                    if (url) {
                        document.execCommand(command, false, url);
                    }
                } else if (command === 'code') {
                    const selection = window.getSelection();
                    if (selection.rangeCount > 0) {
                        const range = selection.getRangeAt(0);
                        const selectedText = range.toString();
                        
                        if (selectedText) {
                            const codeBlock = `<pre><code>${selectedText}</code></pre>`;
                            const div = document.createElement('div');
                            div.innerHTML = codeBlock;
                            
                            range.deleteContents();
                            range.insertNode(div);
                        }
                    }
                } else if (command === 'undo') {
                    document.execCommand('undo', false, null);
                } else if (command === 'redo') {
                    document.execCommand('redo', false, null);
                } else {
                    document.execCommand(command, false, null);
                }
                
                manualContentEditor.focus();
            });
        });
    }

    // Drag and drop setup
    function setupDragAndDrop() {
        // PDF drag and drop
        const pdfContainer = document.getElementById('pdfUploadContainer');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            pdfContainer.addEventListener(eventName, preventDefaults, false);
        });
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        ['dragenter', 'dragover'].forEach(eventName => {
            pdfContainer.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            pdfContainer.addEventListener(eventName, unhighlight, false);
        });
        
        function highlight() {
            pdfContainer.style.backgroundColor = '#f0f8ff';
        }
        
        function unhighlight() {
            pdfContainer.style.backgroundColor = '';
        }
        
        pdfContainer.addEventListener('drop', handlePdfDrop, false);
        
        function handlePdfDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                const file = files[0];
                if (file.type === 'application/pdf') {
                    pdfFile = file;
                    showPdfPreview(file.name);
                } else {
                    alert('Please upload a PDF file');
                }
            }
        }
        
        // Word drag and drop
        const wordContainer = document.getElementById('wordUploadContainer');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            wordContainer.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            wordContainer.addEventListener(eventName, () => {
                wordContainer.style.backgroundColor = '#f0f8ff';
            }, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            wordContainer.addEventListener(eventName, () => {
                wordContainer.style.backgroundColor = '';
            }, false);
        });
        
        wordContainer.addEventListener('drop', handleWordDrop, false);
        
        function handleWordDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                const file = files[0];
                if (file.type === 'application/msword' || 
                    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                    wordFile = file;
                    showWordPreview(file.name);
                } else {
                    alert('Please upload a Word document (.doc or .docx)');
                }
            }
        }
        
        // Video drag and drop
        const videoContainer = document.getElementById('videoUploadContainer');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            videoContainer.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            videoContainer.addEventListener(eventName, () => {
                videoContainer.style.backgroundColor = '#f0f8ff';
            }, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            videoContainer.addEventListener(eventName, () => {
                videoContainer.style.backgroundColor = '';
            }, false);
        });
        
        videoContainer.addEventListener('drop', handleVideoDrop, false);
        
        function handleVideoDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                const file = files[0];
                if (file.type.startsWith('video/')) {
                    videoFile = file;
                    showVideoPreview(file);
                } else {
                    alert('Please upload a video file');
                }
            }
        }
    }

    // Open tutorial editor
    function openTutorialEditor(tutorialId) {
        currentTutorialId = tutorialId;
        isEditing = tutorialId !== null;
        
        if (isEditing) {
            tutorialEditorTitle.textContent = 'Edit Tutorial';
            deleteTutorialBtn.style.display = 'block';
            
            const tutorial = tutorials.find(t => t.id === tutorialId);
            tutorialTitleInput.value = tutorial.title;
            tutorialDateInput.value = tutorial.date;
            pdfFile = null;
            wordFile = null;
            videoFile = null;
            
            // Load manual content if exists
            if (tutorial.manualContent) {
                manualContentEditor.innerHTML = tutorial.manualContent;
            } else {
                manualContentEditor.innerHTML = '';
            }
            
            // Load sections
            tutorialSectionsContainer.innerHTML = '';
            tutorial.sections.forEach((section, index) => {
                addSectionToEditor(section.title, section.content, index);
            });
            
            // Load PDF preview if exists
            if (tutorial.pdfUrl) {
                showPdfPreview(tutorial.pdfUrl.split('/').pop());
            } else {
                hidePdfPreview();
            }
            
            // Load Word preview if exists
            if (tutorial.wordUrl) {
                showWordPreview(tutorial.wordUrl.split('/').pop());
            } else {
                hideWordPreview();
            }
            
            // Load Video preview if exists
            if (tutorial.videoUrl) {
                // In a real app, you would create a preview here
                hideVideoPreview();
            } else {
                hideVideoPreview();
            }
        } else {
            tutorialEditorTitle.textContent = 'Add New Tutorial';
            deleteTutorialBtn.style.display = 'none';
            tutorialTitleInput.value = '';
            tutorialDateInput.value = new Date().toISOString().split('T')[0];
            tutorialSectionsContainer.innerHTML = '';
            manualContentEditor.innerHTML = '';
            pdfFile = null;
            wordFile = null;
            videoFile = null;
            hidePdfPreview();
            hideWordPreview();
            hideVideoPreview();
        }
        
        tutorialEditorModal.style.display = 'block';
    }

    // Close tutorial editor
    function closeTutorialEditor() {
        tutorialEditorModal.style.display = 'none';
    }

    // Open section editor
    function openSectionEditor(sectionIndex) {
        currentSectionIndex = sectionIndex;
        
        if (sectionIndex !== null) {
            const sectionItems = document.querySelectorAll('.tutorial-section-item');
            if (sectionItems.length > sectionIndex) {
                const sectionItem = sectionItems[sectionIndex];
                const title = sectionItem.querySelector('.section-item-title').textContent;
                const content = sectionItem.querySelector('.section-item-content').textContent;
                
                sectionTitleInput.value = title;
                sectionContentInput.value = content;
            }
        } else {
            sectionTitleInput.value = '';
            sectionContentInput.value = '';
        }
        
        sectionEditorModal.style.display = 'block';
    }

    // Close section editor
    function closeSectionEditor() {
        sectionEditorModal.style.display = 'none';
    }

    // Play video in modal
    function playVideo(videoUrl) {
        videoModalTitle.textContent = 'Video Tutorial';
        modalVideoPlayer.src = videoUrl;
        videoModal.style.display = 'block';
        modalVideoPlayer.play();
    }

    // Close video modal
    function closeVideoModal() {
        modalVideoPlayer.pause();
        modalVideoPlayer.src = '';
        videoModal.style.display = 'none';
    }

    // Add section to editor
    function addSectionToEditor(title, content, index) {
        const sectionItem = document.createElement('div');
        sectionItem.className = 'tutorial-section-item';
        
        const header = document.createElement('div');
        header.className = 'section-item-header';
        
        const titleElement = document.createElement('h5');
        titleElement.className = 'section-item-title';
        titleElement.textContent = title;
        
        const actions = document.createElement('div');
        actions.className = 'section-item-actions';
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editBtn.addEventListener('click', () => {
            openSectionEditor(index);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this section?')) {
                sectionItem.remove();
            }
        });
        
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        
        header.appendChild(titleElement);
        header.appendChild(actions);
        
        const contentElement = document.createElement('div');
        contentElement.className = 'section-item-content';
        contentElement.textContent = content;
        
        sectionItem.appendChild(header);
        sectionItem.appendChild(contentElement);
        
        tutorialSectionsContainer.appendChild(sectionItem);
    }

    // Save tutorial
    function saveTutorial() {
        const title = tutorialTitleInput.value.trim();
        const date = tutorialDateInput.value;
        
        if (!title || !date) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Collect sections
        const sections = [];
        const sectionItems = document.querySelectorAll('.tutorial-section-item');
        sectionItems.forEach(item => {
            const title = item.querySelector('.section-item-title').textContent;
            const content = item.querySelector('.section-item-content').textContent;
            sections.push({ title, content });
        });
        
        // Get manual content
        const manualContent = manualContentEditor.innerHTML.trim();
        
        // Check if we have either sections or manual content
        if (sections.length === 0 && !manualContent) {
            alert('Please add content either as sections or using the manual editor');
            return;
        }
        
        // In a real app, you would upload files to a server here
        // For this demo, we'll just store the file names
        let pdfUrl = null;
        if (pdfFile) {
            pdfUrl = `/uploads/${pdfFile.name}`;
        } else if (isEditing) {
            const existingTutorial = tutorials.find(t => t.id === currentTutorialId);
            if (existingTutorial && existingTutorial.pdfUrl) {
                pdfUrl = existingTutorial.pdfUrl;
            }
        }
        
        let wordUrl = null;
        if (wordFile) {
            wordUrl = `/uploads/${wordFile.name}`;
        } else if (isEditing) {
            const existingTutorial = tutorials.find(t => t.id === currentTutorialId);
            if (existingTutorial && existingTutorial.wordUrl) {
                wordUrl = existingTutorial.wordUrl;
            }
        }
        
        let videoUrl = null;
        if (videoFile) {
            videoUrl = `/uploads/${videoFile.name}`;
        } else if (isEditing) {
            const existingTutorial = tutorials.find(t => t.id === currentTutorialId);
            if (existingTutorial && existingTutorial.videoUrl) {
                videoUrl = existingTutorial.videoUrl;
            }
        }
        
        if (isEditing) {
            // Update existing tutorial
            const index = tutorials.findIndex(t => t.id === currentTutorialId);
            if (index !== -1) {
                tutorials[index] = {
                    ...tutorials[index],
                    title,
                    date,
                    sections: manualContent ? [] : sections,
                    pdfUrl,
                    wordUrl,
                    videoUrl,
                    manualContent: manualContent || null
                };
            }
        } else {
            // Add new tutorial
            const newId = tutorials.length > 0 ? Math.max(...tutorials.map(t => t.id)) + 1 : 1;
            tutorials.push({
                id: newId,
                title,
                date,
                sections: manualContent ? [] : sections,
                pdfUrl,
                wordUrl,
                videoUrl,
                manualContent: manualContent || null
            });
            currentTutorialId = newId; // Set the new ID for scrolling
        }
        
        renderTutorials();
        closeTutorialEditor();
    }

    // Save section
    function saveSection() {
        const title = sectionTitleInput.value.trim();
        const content = sectionContentInput.value.trim();
        
        if (!title || !content) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (currentSectionIndex !== null) {
            // Replace existing section
            const sectionItems = document.querySelectorAll('.tutorial-section-item');
            if (sectionItems.length > currentSectionIndex) {
                const sectionItem = sectionItems[currentSectionIndex];
                sectionItem.querySelector('.section-item-title').textContent = title;
                sectionItem.querySelector('.section-item-content').textContent = content;
            }
        } else {
            // Add new section
            addSectionToEditor(title, content, document.querySelectorAll('.tutorial-section-item').length);
        }
        
        closeSectionEditor();
    }

    // Delete tutorial
    function deleteTutorial(tutorialId) {
        tutorials = tutorials.filter(t => t.id !== tutorialId);
        renderTutorials();
    }

    // Copy tutorial
    function copyTutorial(tutorialId) {
        const tutorial = tutorials.find(t => t.id === tutorialId);
        if (tutorial) {
            const newId = tutorials.length > 0 ? Math.max(...tutorials.map(t => t.id)) + 1 : 1;
            const copiedTutorial = {
                ...tutorial,
                id: newId,
                title: `${tutorial.title} (Copy)`,
                date: new Date().toISOString().split('T')[0]
            };
            tutorials.push(copiedTutorial);
            renderTutorials();
        }
    }

    // Handle PDF upload
    function handlePdfUpload(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type === 'application/pdf') {
                // In a real app, you would upload the file to a server here
                alert(`PDF "${file.name}" would be uploaded to the server in a real application`);
            } else {
                alert('Please upload a PDF file');
            }
        }
    }

    // Show PDF preview
    function showPdfPreview(fileName) {
        pdfFileName.textContent = fileName;
        pdfPreview.style.display = 'flex';
    }

    // Hide PDF preview
    function hidePdfPreview() {
        pdfPreview.style.display = 'none';
    }

    // Show Word preview
    function showWordPreview(fileName) {
        wordFileName.textContent = fileName;
        wordPreview.style.display = 'flex';
    }

    // Hide Word preview
    function hideWordPreview() {
        wordPreview.style.display = 'none';
    }

    // Show Video preview
    function showVideoPreview(file) {
        videoElement.src = URL.createObjectURL(file);
        videoPreview.style.display = 'block';
    }

    // Hide Video preview
    function hideVideoPreview() {
        videoElement.src = '';
        videoPreview.style.display = 'none';
    }

    // Initialize the application
    init();
});