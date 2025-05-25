// Current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// AWS Projects Data
let projects = [
    {
        id: 1,
        title: 'AWS ECS Cluster Automation',
        description: 'Automated deployment of containerized applications using AWS ECS with CI/CD pipeline integration. Implemented blue-green deployments with AWS CodeDeploy, automated scaling policies based on CloudWatch metrics, and integrated with AWS Secrets Manager for secure credential management.',
        technologies: ['AWS ECS', 'Docker', 'Terraform', 'GitHub Actions', 'AWS CodePipeline', 'AWS CodeBuild'],
        images: [
            'https://via.placeholder.com/800x500/232F3E/FFFFFF?text=ECS+Cluster',
            'https://via.placeholder.com/800x500/232F3E/FFFFFF?text=CI/CD+Pipeline',
            'https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Deployment+Strategy'
        ],
        link: '#',
        github: '#'
    },
    {
        id: 2,
        title: 'Serverless API with Lambda',
        description: 'Built a scalable serverless API using AWS Lambda, API Gateway, and DynamoDB with proper authentication. Implemented JWT authentication with Amazon Cognito, request validation, rate limiting, and caching at the API Gateway level. Used AWS X-Ray for distributed tracing and performance monitoring.',
        technologies: ['AWS Lambda', 'API Gateway', 'DynamoDB', 'Node.js', 'Amazon Cognito', 'AWS X-Ray'],
        images: [
            'https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Lambda+Architecture',
            'https://via.placeholder.com/800x500/232F3E/FFFFFF?text=API+Design',
            'https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Performance+Metrics'
        ],
        link: '#',
        github: '#'
    },
    {
        id: 3,
        title: 'Terraform Multi-Account Setup',
        description: 'Implemented secure multi-account AWS environment with IAM roles, SCPs, and centralized logging using Terraform. Created a landing zone with AWS Organizations, implemented cross-account access with IAM roles, and centralized logging with CloudTrail and Config across all accounts.',
        technologies: ['AWS Organizations', 'IAM', 'CloudTrail', 'AWS Config', 'Terraform', 'SCPs'],
        images: [
            'https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Account+Structure',
            'https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Security+Controls',
            'https://via.placeholder.com/800x500/232F3E/FFFFFF?text=Terraform+Code'
        ],
        link: '#',
        github: '#'
    }
];

// Error documentation data
let errors = [
    {
        id: 1,
        title: 'ECS Task Failing to Start',
        date: '2023-07-15',
        description: 'Tasks in my ECS cluster were failing to start with the error: \'CannotPullContainerError: Error response from daemon: pull access denied\'. The containers couldn\'t be pulled from ECR.',
        solution: 'Created an IAM role with proper permissions for the ECS task execution role. Added AmazonEC2ContainerRegistryReadOnly policy and verified the ECR repository permissions. Also checked the task definition to ensure the correct image URI was specified.',
        images: [
            'https://via.placeholder.com/800x500/f44336/FFFFFF?text=ECS+Error'
        ]
    },
    {
        id: 2,
        title: 'Terraform State Lock Issue',
        date: '2023-09-22',
        description: 'Terraform operations were failing with the error: \'Error acquiring the state lock: ConditionalCheckFailedException\'. The state was locked by another process that had terminated unexpectedly.',
        solution: 'Used the AWS console to manually remove the lock item from the DynamoDB table. Implemented proper error handling in CI/CD pipelines to ensure locks are always released. Added timeout configurations for state locking operations.',
        images: [
            'https://via.placeholder.com/800x500/f44336/FFFFFF?text=Terraform+Lock'
        ]
    },
    {
        id: 3,
        title: 'Lambda Cold Start Timeout',
        date: '2023-11-05',
        description: 'Lambda functions were timing out during cold starts when connecting to RDS, despite working fine after initialization. The 3-second default timeout was too short for the VPC-connected Lambda.',
        solution: 'Increased the timeout to 30 seconds for VPC-connected Lambdas. Implemented provisioned concurrency to keep functions warm. Optimized the initialization code to reduce cold start time. Added proper error handling and retries for database connections.',
        images: [
            'https://via.placeholder.com/800x500/f44336/FFFFFF?text=Lambda+Timeout'
        ]
    }
];





/* ==================== HAPPY ENDING SECTION START ==================== */
// HAPPY ENDING data

let successGallery = [
    {
        id: 1,
        title: 'AWS ECS Deployment',
        date: '2023-06-15',
        image: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Project+Success'
    },
    {
        id: 2,
        title: 'Automated Pipeline',
        date: '2023-08-20',
        image: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=CI/CD+Pipeline'
    },
    {
        id: 3,
        title: 'Terraform Deployment',
        date: '2023-10-10',
        image: 'https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=Infrastructure+Success'
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
    
    // Show/hide admin controls based on admin status
    document.getElementById('galleryActions').style.display = isAdmin ? 'flex' : 'none';
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

// Image upload in gallery (admin protected)
document.getElementById('galleryUploadInput').addEventListener('change', function(e) {
    if (!isAdmin) {
        showToast('Admin access required', 'error');
        return;
    }
    
    if (e.target.files) {
        handleImageUpload(e.target.files, true);
    }
});

// Delete image in gallery (admin protected)
document.getElementById('deleteImageBtn').addEventListener('click', function() {
    if (!isAdmin) {
        showToast('Admin access required', 'error');
        return;
    }
    
    if (currentGalleryImages.length > 0) {
        if (confirm('Delete this image?')) {
            currentGalleryImages.splice(currentGalleryIndex, 1);
            setupGallery(currentGalleryImages);
            showToast('Image deleted successfully!', 'success');
        }
    }
});

// Copy image in gallery
document.getElementById('copyImageBtn').addEventListener('click', function() {
    if (currentGalleryImages.length > 0) {
        const currentImage = currentGalleryImages[currentGalleryIndex];
        navigator.clipboard.writeText(currentImage)
            .then(() => {
                showToast('Image URL copied to clipboard!', 'success');
            })
            .catch(err => {
                showToast('Failed to copy image URL', 'error');
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
    
    // Setup gallery with admin controls visibility
    setupGallery(project.images);
    
    // Show edit button if in admin mode
    document.getElementById('editProjectBtn').style.display = isAdmin ? 'block' : 'none';
    
    document.getElementById('projectModal').style.display = 'block';
}

// Close modal
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        document.getElementById('projectModal').style.display = 'none';
        document.getElementById('projectEditorModal').style.display = 'none';
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
});

// Edit project button (admin protected)
document.getElementById('editProjectBtn').addEventListener('click', function() {
    if (!isAdmin) {
        showToast('Admin access required', 'error');
        return;
    }
    
    const projectId = document.getElementById('modalProjectTitle').getAttribute('data-id');
    openProjectEditor(projectId);
});

// Open project editor (admin protected)
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
            if (!isAdmin) {
                showToast('Admin access required', 'error');
                return;
            }
            
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
                    if (!isAdmin) {
                        showToast('Admin access required', 'error');
                        return;
                    }
                    
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
    
    // Setup image gallery in editor with admin controls
    const editorGallery = document.getElementById('editorImageGallery');
    editorGallery.innerHTML = project.images.map((img, index) => `
        <div class="image-thumbnail">
            <img src="${img}" style="width: 100%; height: 120px; object-fit: cover;">
            <div class="image-thumbnail-actions">
                <button class="image-thumbnail-btn view-image" data-index="${index}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="image-thumbnail-btn delete-image" data-index="${index}" style="display: ${isAdmin ? 'inline-block' : 'none'}">
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
            if (!isAdmin) {
                showToast('Admin access required', 'error');
                return;
            }
            
            const index = parseInt(this.getAttribute('data-index'));
            if (confirm('Delete this image?')) {
                project.images.splice(index, 1);
                openProjectEditor(project.id); // Refresh editor
                showToast('Image deleted successfully!', 'success');
            }
        });
    });
    
    document.querySelectorAll('.copy-image').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const imageUrl = project.images[index];
            navigator.clipboard.writeText(imageUrl)
                .then(() => {
                    showToast('Image URL copied to clipboard!', 'success');
                })
                .catch(err => {
                    showToast('Failed to copy image URL', 'error');
                    console.error('Failed to copy: ', err);
                });
        });
    });
    
    // Image upload in editor (admin protected)
    document.getElementById('editorImageUpload').addEventListener('change', function(e) {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }
        
        if (e.target.files) {
            handleImageUpload(e.target.files, false, project);
        }
    });
    
    // Drag and drop for editor (admin protected)
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
        
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }
        
        if (e.dataTransfer.files) {
            handleImageUpload(e.dataTransfer.files, false, project);
        }
    });
    
    // Click to upload (admin protected)
    editorUploadContainer.addEventListener('click', () => {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }
        
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

// Handle image uploads (admin protected)
function handleImageUpload(files, forGallery = false, project = null) {
    if (!isAdmin) {
        showToast('Admin access required', 'error');
        return;
    }
    
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
                    showToast(`${uploadedCount} image(s) uploaded successfully!`, 'success');
                }
            };
            reader.readAsDataURL(file);
        } else {
            showToast('Only JPG, PNG, GIF, or WEBP images are allowed', 'error');
        }
    });
}

/* ==================== HAPPY ENDING SECTION END ==================== */









// Resume SECTION Functionality with Container Support and Admin Control
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const editBtn = document.getElementById('editResumeBtn');
    const saveBtn = document.getElementById('saveResumeBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');
    const printBtn = document.getElementById('printResumeBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const deleteBtn = document.getElementById('deleteResumeBtn');
    const uploadBtn = document.getElementById('uploadResumeBtn');
    const fileInput = document.getElementById('resumeUpload');
    const resumeContent = document.getElementById('resumeContent');
    const adminControls = document.getElementById('adminControls');

    // State variables
    let isContainerized = false;
    let containerStorageAvailable = false;
    let originalResumeData = null;

    // Initialize the app
    function init() {
        console.log('Initializing resume application...');
        checkContainerEnvironment();
        setupEventListeners();
        loadResumeData();
        setupClickableLinks();
        
        // Show admin controls if in admin mode or containerized environment
        if (isAdmin || isContainerized || document.body.classList.contains('admin-mode')) {
            showAdminControls();
        }
    }

    // Make sure links are clickable
    function setupClickableLinks() {
        // Email link
        const emailEl = document.getElementById('resumeEmail');
        if (emailEl) {
            emailEl.innerHTML = `<a href="mailto:${emailEl.textContent}">${emailEl.textContent}</a>`;
        }

        // Phone link
        const phoneEl = document.getElementById('resumePhone');
        if (phoneEl) {
            phoneEl.innerHTML = `<a href="tel:${phoneEl.textContent.replace(/[^0-9+]/g, '')}">${phoneEl.textContent}</a>`;
        }

        // LinkedIn and GitHub links are already handled in populateResume
    }

    // Check if we're in a containerized environment
    function checkContainerEnvironment() {
        // First check for explicit container class
        isContainerized = document.body.classList.contains('containerized-environment');
        
        // Then check URL parameter
        if (!isContainerized) {
            const urlParams = new URLSearchParams(window.location.search);
            isContainerized = urlParams.get('container') === 'true';
        }
        
        // Check for container storage API
        containerStorageAvailable = isContainerized && 
                                 typeof window.containerStorage !== 'undefined' && 
                                 typeof window.containerStorage.getResume === 'function' &&
                                 typeof window.containerStorage.saveResume === 'function' &&
                                 typeof window.containerStorage.deleteResume === 'function';
        
        console.log(`Containerized: ${isContainerized}, Storage Available: ${containerStorageAvailable}`);
    }

    // Show admin controls
    function showAdminControls() {
        if (adminControls) {
            adminControls.style.display = 'block';
        }
        if (editBtn) editBtn.style.display = 'inline-block';
    }

    // Load resume data from storage
    function loadResumeData() {
        console.log('Attempting to load resume data...');
        
        // First try container storage if available
        if (containerStorageAvailable) {
            console.log('Loading from container storage...');
            window.containerStorage.getResume()
                .then(containerResume => {
                    console.log('Received from container storage:', containerResume);
                    if (containerResume) {
                        originalResumeData = JSON.parse(JSON.stringify(containerResume));
                        populateResume(containerResume);
                    } else {
                        console.log('No data in container storage, trying localStorage');
                        loadFromLocalStorage();
                    }
                })
                .catch(err => {
                    console.error('Container storage error:', err);
                    loadFromLocalStorage();
                });
        } else {
            loadFromLocalStorage();
        }
    }

    // Load from localStorage
    function loadFromLocalStorage() {
        const savedResume = localStorage.getItem('resumeData');
        if (savedResume) {
            try {
                const resumeData = JSON.parse(savedResume);
                originalResumeData = JSON.parse(JSON.stringify(resumeData));
                populateResume(resumeData);
            } catch (e) {
                console.error('Error parsing saved resume:', e);
                loadDefaultResume();
            }
        } else {
            loadDefaultResume();
        }
    }

    // Load default resume data
    function loadDefaultResume() {
        console.log('Loading default resume data');
        const defaultResume = {
            name: 'SAMUEL UGWU EBUBE',
            title: 'DEVOPS|CLOUD AUTOMATION ENGINEER',
            contact: {
                email: 'melvinsamuel070@gmail.com',
                phone: '+234-703-655-4955',
                linkedin: 'https://linkedin.com/in/melvin-samuel-6b64532b0/',
                github: 'https://github.com/melvinsamuel070'
            },
            summary: 'Results-driven DevOps Engineer with 3+ years of experience in designing, automating, and maintaining cloud-based solutions. Proficient in AWS cloud services, CI/CD pipelines, infrastructure as code (IaC), and container orchestration. Passionate about optimizing cloud infrastructure for scalability, security, and cost-efficiency while implementing DevOps best practices.',
            skills: {
                cloudPlatforms: ['AWS (EC2, S3, RDS, IAM, Lambda, CloudFormation)'],
                iac: ['Terraform', 'AWS CloudFormation'],
                ciCdTools: ['Jenkins', 'GitHub Actions', 'AWS CodePipeline'],
                containerization: ['Docker', 'Kubernetes (EKS, ECS)'],
                monitoring: ['AWS CloudWatch', 'Prometheus', 'Grafana', 'ELK Stack'],
                scripting: ['Shell', 'Python', 'JSON', 'YAML'],
                security: ['IAM', 'SSL/TLS', 'Security Groups', 'OWASP ZAP'],
                networking: ['VPC', 'Load Balancing', 'DNS', 'TCP/IP', 'Firewall Configuration'],
                os: ['Linux (Ubuntu, Red Hat, CentOS)', 'MacOS']
            },
            experience: [{
                title: 'DevOps Engineer',
                date: '2021 - Present',
                company: 'Tech Solutions Inc.',
                details: [
                    'Designed and implemented CI/CD pipelines reducing deployment time by 40%',
                    'Automated infrastructure provisioning using Terraform',
                    'Implemented monitoring solutions improving system uptime to 99.9%'
                ]
            }],
            projects: [{
                title: 'Cloud Migration Project',
                description: 'Led migration of on-premise infrastructure to AWS',
                contributions: [
                    'Designed AWS architecture',
                    'Automated migration process',
                    'Implemented monitoring'
                ],
                impact: 'Reduced infrastructure costs by 30%'
            }],
            education: [{
                degree: 'Diploma in DevOps & Cloud Computing',
                date: '2022',
                institution: 'Cyclobold School of Software Engineering, Lagos, Nigeria'
            }],
            additionalInfo: '<p><strong>References:</strong> Available upon request.</p>'
        };
        
        originalResumeData = JSON.parse(JSON.stringify(defaultResume));
        saveResumeData(defaultResume);
        populateResume(defaultResume);
    }

    // Save resume data to appropriate storage
    function saveResumeData(resumeData) {
        if (!resumeData) {
            console.error('No resume data to save');
            return;
        }
        
        originalResumeData = JSON.parse(JSON.stringify(resumeData));

        if (containerStorageAvailable) {
            console.log('Saving to container storage...');
            window.containerStorage.saveResume(resumeData)
                .then(() => {
                    console.log('Saved to container storage successfully');
                    localStorage.setItem('resumeData', JSON.stringify(resumeData));
                    showMessage('Resume saved successfully!', 'success');
                })
                .catch(err => {
                    console.error('Error saving to container storage:', err);
                    localStorage.setItem('resumeData', JSON.stringify(resumeData));
                    showMessage('Resume saved to local storage', 'warning');
                });
        } else {
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
            showMessage('Resume saved successfully!', 'success');
        }
    }

    // Populate resume with data
    function populateResume(resumeData) {
        if (!resumeData) return;
        
        // Basic info
        setElementText('resumeName', resumeData.name);
        setElementText('resumeTitle', resumeData.title);
        
        // Contact info
        setElementText('resumeEmail', resumeData.contact?.email);
        setElementText('resumePhone', resumeData.contact?.phone);
        
        // Update LinkedIn and GitHub links
        const linkedinEl = document.getElementById('resumeLinkedIn');
        const githubEl = document.getElementById('resumeGithub');
        
        if (linkedinEl) {
            linkedinEl.innerHTML = `<a href="${resumeData.contact?.linkedin || '#'}" target="_blank">${resumeData.contact?.linkedin || 'LinkedIn'}</a>`;
        }
        if (githubEl) {
            githubEl.innerHTML = `<a href="${resumeData.contact?.github || '#'}" target="_blank">${resumeData.contact?.github || 'GitHub'}</a>`;
        }
        
        // Summary
        const summaryEl = document.getElementById('professionalSummary');
        if (summaryEl) summaryEl.innerHTML = resumeData.summary || '';
        
        // Skills
        populateList('cloudPlatforms', resumeData.skills?.cloudPlatforms);
        populateList('iac', resumeData.skills?.iac);
        populateList('ciCdTools', resumeData.skills?.ciCdTools);
        populateList('containerization', resumeData.skills?.containerization);
        populateList('monitoring', resumeData.skills?.monitoring);
        populateList('scripting', resumeData.skills?.scripting);
        populateList('security', resumeData.skills?.security);
        populateList('networking', resumeData.skills?.networking);
        populateList('os', resumeData.skills?.os);
        
        // Experience
        if (resumeData.experience?.length > 0) {
            const exp = resumeData.experience[0];
            const expItem = document.querySelector('.resume-section:nth-of-type(4) .experience-item');
            if (expItem) {
                setElementText(expItem, '.experience-header h3', exp.title);
                setElementText(expItem, '.experience-date', exp.date);
                setElementText(expItem, '.experience-company', exp.company);
                populateListElement(expItem.querySelector('.experience-details'), exp.details);
            }
        }
        
        // Projects
        if (resumeData.projects?.length > 0) {
            const projectItems = document.querySelectorAll('.resume-section:nth-of-type(5) .experience-item');
            resumeData.projects.forEach((proj, index) => {
                if (index < projectItems.length) {
                    const projItem = projectItems[index];
                    setElementText(projItem, 'h3', proj.title);
                    setElementText(projItem, 'p', proj.description);
                    populateListElement(projItem.querySelector('ul'), proj.contributions);
                    setElementText(projItem, 'p:last-of-type', proj.impact);
                }
            });
        }
        
        // Education
        if (resumeData.education?.length > 0) {
            const edu = resumeData.education[0];
            const eduItem = document.querySelector('.resume-section:nth-of-type(6) .experience-item');
            if (eduItem) {
                setElementText(eduItem, '.experience-header h3', edu.degree);
                setElementText(eduItem, '.experience-date', edu.date);
                setElementText(eduItem, '.experience-company', edu.institution);
            }
        }
        
        // Additional info
        const additionalInfoEl = document.getElementById('additionalInfo');
        if (additionalInfoEl) additionalInfoEl.innerHTML = resumeData.additionalInfo || '';
    }

    // Set up event listeners
    function setupEventListeners() {
        // Edit button
        if (editBtn) {
            editBtn.addEventListener('click', function() {
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
                enableEditMode();
            });
        }

        // Save button
        if (saveBtn) {
            saveBtn.addEventListener('click', function() {
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
                saveResume();
            });
        }

        // Cancel button
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
                cancelEdit();
            });
        }

        // Print button
        if (printBtn) {
            printBtn.addEventListener('click', printResume);
        }

        // Download PDF button
        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', downloadAsPdf);
        }

        // Delete button
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function() {
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
                deleteResume();
            });
        }

        // Upload button
        if (uploadBtn && fileInput) {
            uploadBtn.addEventListener('click', function() {
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
                fileInput.click();
            });
            fileInput.addEventListener('change', handleResumeUpload);
        }
    }

    function enableEditMode() {
        if (!resumeContent || !isAdmin) return;
        
        console.log('Enabling edit mode');
        resumeContent.classList.add('edit-mode');
        if (editBtn) editBtn.style.display = 'none';
        if (saveBtn) saveBtn.style.display = 'inline-block';
        if (cancelBtn) cancelBtn.style.display = 'inline-block';
        
        // Make all editable elements contenteditable
        document.querySelectorAll('.editable-text, .experience-details li, #resumeName, #resumeTitle, #resumeEmail, #resumePhone, #resumeLinkedIn, #resumeGithub, .experience-header h3, .experience-company, .experience-date').forEach(el => {
            el.setAttribute('contenteditable', 'true');
        });
    }

    function disableEditMode() {
        if (!resumeContent) return;
        
        console.log('Disabling edit mode');
        resumeContent.classList.remove('edit-mode');
        if (editBtn) editBtn.style.display = 'inline-block';
        if (saveBtn) saveBtn.style.display = 'none';
        if (cancelBtn) cancelBtn.style.display = 'none';
        
        // Disable contenteditable
        document.querySelectorAll('[contenteditable="true"]').forEach(el => {
            el.setAttribute('contenteditable', 'false');
        });
    }

    function cancelEdit() {
        console.log('Canceling edit');
        disableEditMode();
        
        // Restore original data
        if (originalResumeData) {
            populateResume(originalResumeData);
            showMessage('Changes discarded', 'info');
        } else {
            loadResumeData();
        }
    }

    function saveResume() {
        console.log('Saving resume...');
        const resumeData = {
            name: document.getElementById('resumeName')?.textContent || '',
            title: document.getElementById('resumeTitle')?.textContent || '',
            contact: {
                email: document.getElementById('resumeEmail')?.textContent || '',
                phone: document.getElementById('resumePhone')?.textContent || '',
                linkedin: document.getElementById('resumeLinkedIn')?.textContent || '',
                github: document.getElementById('resumeGithub')?.textContent || ''
            },
            summary: document.getElementById('professionalSummary')?.innerHTML || '',
            skills: {
                cloudPlatforms: getListItems('cloudPlatforms'),
                iac: getListItems('iac'),
                ciCdTools: getListItems('ciCdTools'),
                containerization: getListItems('containerization'),
                monitoring: getListItems('monitoring'),
                scripting: getListItems('scripting'),
                security: getListItems('security'),
                networking: getListItems('networking'),
                os: getListItems('os')
            },
            experience: getExperienceData(),
            projects: getProjectsData(),
            education: getEducationData(),
            additionalInfo: document.getElementById('additionalInfo')?.innerHTML || ''
        };
        
        saveResumeData(resumeData);
        disableEditMode();
    }

    function getListItems(listId) {
        const list = document.getElementById(listId);
        if (!list) return [];
        return Array.from(list.children).map(li => li.textContent);
    }

    function getExperienceData() {
        return Array.from(document.querySelectorAll('.resume-section:nth-of-type(4) .experience-item')).map(exp => ({
            title: exp.querySelector('.experience-header h3')?.textContent || '',
            date: exp.querySelector('.experience-date')?.textContent || '',
            company: exp.querySelector('.experience-company')?.textContent || '',
            details: Array.from(exp.querySelectorAll('.experience-details li')).map(li => li.textContent)
        }));
    }

    function getProjectsData() {
        return Array.from(document.querySelectorAll('.resume-section:nth-of-type(5) .experience-item')).map(proj => ({
            title: proj.querySelector('h3')?.textContent || '',
            description: proj.querySelector('p')?.textContent || '',
            contributions: Array.from(proj.querySelectorAll('li')).map(li => li.textContent),
            impact: proj.querySelector('p:last-of-type')?.textContent || ''
        }));
    }

    function getEducationData() {
        return Array.from(document.querySelectorAll('.resume-section:nth-of-type(6) .experience-item')).map(edu => ({
            degree: edu.querySelector('h3')?.textContent || '',
            date: edu.querySelector('.experience-date')?.textContent || '',
            institution: edu.querySelector('.experience-company')?.textContent || ''
        }));
    }

    function setElementText(elementId, text, defaultValue = '') {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text || defaultValue;
        }
    }

    function populateList(elementId, items) {
        const container = document.getElementById(elementId);
        if (!container || !items) return;
        
        container.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'editable-text';
            li.textContent = item;
            container.appendChild(li);
        });
    }

    function populateListElement(container, items) {
        if (!container || !items) return;
        
        container.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'editable-text';
            li.textContent = item;
            container.appendChild(li);
        });
    }

    function printResume() {
        window.print();
    }

    function downloadAsPdf() {
        showMessage('PDF download functionality would be implemented here', 'info');
    }

    function deleteResume() {
        if (confirm('Are you sure you want to delete your resume data? This cannot be undone.')) {
            if (containerStorageAvailable) {
                window.containerStorage.deleteResume()
                    .then(() => {
                        localStorage.removeItem('resumeData');
                        showMessage('Resume data deleted', 'success');
                        setTimeout(() => location.reload(), 1000);
                    })
                    .catch(err => {
                        console.error('Error deleting from container storage:', err);
                        localStorage.removeItem('resumeData');
                        showMessage('Resume data deleted from local storage', 'success');
                        setTimeout(() => location.reload(), 1000);
                    });
            } else {
                localStorage.removeItem('resumeData');
                showMessage('Resume data deleted', 'success');
                setTimeout(() => location.reload(), 1000);
            }
        }
    }

    function handleResumeUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const resumeData = JSON.parse(e.target.result);
                originalResumeData = JSON.parse(JSON.stringify(resumeData));
                saveResumeData(resumeData);
                populateResume(resumeData);
                showMessage('Resume uploaded successfully!', 'success');
            } catch (e) {
                console.error('Failed to parse uploaded file:', e);
                showMessage('Invalid resume file format', 'error');
            }
        };
        reader.readAsText(file);
    }

    function showMessage(text, type) {
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

    // Initialize the application
    init();
});





















// ADMIN CONTROL SYSTEM AND PASSWORD
// Admin state management
let isAdmin = false;
const ADMIN_PASSWORD = 'melvin'; // In production, use a more secure method

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    checkAdminStatus();
    setupNavigation();
    renderProjects();
    renderErrors();
    renderSuccessGallery();
    setupResumeFunctionality();
    setupTechTutorials();
    setupEventListeners();
});

// Check admin status from localStorage
function checkAdminStatus() {
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession === ADMIN_PASSWORD) {
        isAdmin = true;
        activateAdminFeatures();
    }
}
// Toggle Admin Panel
// Admin toggle functionality
document.getElementById('adminToggle').addEventListener('click', function() {
    if (!isAdmin) {
        const password = prompt('Enter admin password:');
        if (password === ADMIN_PASSWORD) {
            localStorage.setItem('adminSession', ADMIN_PASSWORD);
            isAdmin = true;
            activateAdminFeatures();
            showMessage('Admin mode activated', 'success');
        } else {
            showMessage('Invalid password', 'error');
        }
    } else {
        isAdmin = false;
        localStorage.removeItem('adminSession');
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
    if (!isAdmin) return;
    
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
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }
    // Implement profile editing functionality
    alert('Profile editor will open here');
});

document.getElementById('addProject').addEventListener('click', function() {
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }
    // Open project editor in create mode
    openProjectEditor(null, true);
});

document.getElementById('editContent').addEventListener('click', function() {
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }
    // Toggle content editing
    if (document.querySelector('[contenteditable="true"]')) {
        disableContentEditing();
        showMessage('Content editing disabled', 'info');
    } else {
        enableContentEditing();
        showMessage('Content editing enabled', 'info');
    }
});

// Initialize admin status on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAdminStatus();
});

// Add technology in editor
document.getElementById('addTechBtn').addEventListener('click', function() {
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }

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
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
                
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
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }

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
        projects[projectIndex].link = link || 'https://github.com/melvinsamuel070';
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
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }

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
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }

    // Create a new project object
    const newProject = {
        id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
        title: 'New Project',
        description: [],
        technologies: [],
        images: [],
        link: 'https://github.com/melvinsamuel070'
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
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }
    showMessage('Profile editing functionality will be implemented here.', 'success');
    document.getElementById('adminPanel').style.display = 'none';
});

// Edit content
document.getElementById('editContent').addEventListener('click', function() {
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }
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

// Render projects
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
                    ${project.images.map((_, i) => `
                        <div class="slide-dot ${i === 0 ? 'active' : ''}"></div>
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
                        ${isAdmin ? '<i class="fas fa-edit"></i> Edit Project' : '<i class="fas fa-eye"></i> View Details'}
                    </button>
                    ${isAdmin ? `
                    <button class="btn btn-outline edit-project" data-id="${project.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-danger delete-project" data-id="${project.id}" style="margin-left: auto;">
                        <i class="fas fa-trash"></i>
                    </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    setupProjectInteractions();
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
    if (isAdmin) {
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
}







// empire diagram  (updated to include images)
function renderErrors() {
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupZoomFunctionality();
    renderProjects();
    renderSuccessGallery();
    renderErrors();
    setupWorkshopInteractions();
    setupEmpireCommunication();
    setupProjectInteractions();
    setupProjectSliders();    
});
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
            <div class="success-actions" style="display: ${isAdmin ? 'block' : 'none'}">
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
    if (isAdmin) {
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
}

// Open success editor
function openSuccessEditor(successId = null) {
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }

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
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }

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
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }

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
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }
    openSuccessEditor();
});

// Upload success images
document.getElementById('uploadSuccessBtn').addEventListener('click', function() {
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }
    document.getElementById('successUpload').click();
});

document.getElementById('successUpload').addEventListener('change', function(e) {
    if (!isAdmin) {
        showMessage('Admin access required', 'error');
        return;
    }

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





















// ERRO SECTION


// Enhanced Error Documentation System with Container Support
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

    // Container mode flag
    let isContainerized = false;

    // Initialize
    checkContainerEnvironment();
    loadErrors();
    setupEventListeners();

    // Check if we're in a containerized environment
    function checkContainerEnvironment() {
        isContainerized = document.body.classList.contains('containerized-environment') || 
                        window.location.href.includes('container=true');
    }

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
        
        // Save to storage
        saveErrorsToStorage();
        
        // Refresh the display
        renderErrors();
        
        return errorData.id;
    }

    // Load errors from storage (localStorage or container storage)
    function loadErrors() {
        if (isContainerized) {
            // Try to load from container storage
            if (window.containerStorage && typeof window.containerStorage.getErrors === 'function') {
                window.containerStorage.getErrors()
                    .then(containerErrors => {
                        errors = containerErrors || [];
                        renderErrors();
                    })
                    .catch(err => {
                        console.error('Error loading from container storage:', err);
                        errors = [];
                        renderErrors();
                    });
            } else {
                // Fallback to localStorage if container storage not available
                loadFromLocalStorage();
            }
        } else {
            loadFromLocalStorage();
        }
    }

    function loadFromLocalStorage() {
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

    // Save errors to appropriate storage
    function saveErrorsToStorage() {
        if (isContainerized && window.containerStorage && typeof window.containerStorage.saveErrors === 'function') {
            // Save to container storage
            window.containerStorage.saveErrors(errors)
                .then(() => {
                    // Also save to localStorage as backup
                    try {
                        localStorage.setItem('errorDocumentation', JSON.stringify(errors));
                    } catch (e) {
                        console.error('Error saving to localStorage:', e);
                    }
                })
                .catch(err => {
                    console.error('Error saving to container storage:', err);
                    // Fallback to localStorage
                    try {
                        localStorage.setItem('errorDocumentation', JSON.stringify(errors));
                    } catch (e) {
                        console.error('Error saving to localStorage:', e);
                        showMessage('Warning: Could not save data to storage. Some data may be lost.', 'warning');
                    }
                });
        } else {
            // Save to localStorage
            try {
                localStorage.setItem('errorDocumentation', JSON.stringify(errors));
            } catch (e) {
                console.error('Error saving errors to storage:', e);
                showMessage('Warning: Could not save all data to local storage. Some data may be lost.', 'warning');
            }
        }
    }

    // Render all errors in the new format
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
                <h2 class="error-title">${escapeHtml(error.title)}</h2>
                <div class="error-solution">
                    <h3>Solution:</h3>
                    <p>${formatTextWithLineBreaks(error.solution)}</p>
                </div>
                <hr class="error-divider">
                ${error.images && error.images.length > 0 ? `
                <div class="error-images">
                    <h3>Attached Images:</h3>
                    <div class="images-checklist">
                        ${error.images.map((img, index) => `
                            <div class="image-checklist-item">
                                <input type="checkbox" id="img-${error.id}-${index}">
                                <label for="img-${error.id}-${index}">
                                    <span class="checkmark"></span>
                                    <span class="image-label">Start with the image</span>
                                    <img src="${img}" alt="Error image ${index + 1}" class="thumbnail-preview">
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                <div class="error-footer">
                    <span class="error-date">${formattedDate}</span>
                    <div class="error-actions" style="display: none;">
                        <button class="btn-edit-error" data-id="${error.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-delete-error" data-id="${error.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
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
        document.querySelectorAll('.thumbnail-preview').forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                viewImage(this.src);
            });
        });

        // Show/hide admin controls based on admin state
        updateAdminControls();
    }

    // Update admin controls visibility
    function updateAdminControls() {
        const isAdmin = localStorage.getItem('adminSession') === 'melvin';
        const newErrorBtnDisplay = isAdmin ? 'block' : 'none';
        const errorActionsDisplay = isAdmin ? 'flex' : 'none';
        
        newErrorBtn.style.display = newErrorBtnDisplay;
        document.querySelectorAll('.error-actions').forEach(action => {
            action.style.display = errorActionsDisplay;
        });
    }

    // Helper function to escape HTML
    function escapeHtml(unsafe) {
        if (!unsafe) return '';
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Helper function to preserve line breaks in text
    function formatTextWithLineBreaks(text) {
        if (!text) return '';
        return escapeHtml(text).replace(/\n/g, '<br>');
    }

    // Open editor (for new or existing error)
    function openEditor(errorId = null) {
        // Check admin status
        if (localStorage.getItem('adminSession') !== 'melvin') {
            showMessage('Admin access required', 'error');
            return;
        }

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

        // Save to storage and refresh
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

        // Listen for admin state changes
        document.addEventListener('adminStateChanged', updateAdminControls);
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

    // Initial admin controls setup
    updateAdminControls();
});















// Tech Tutorials Management System with Container Support
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
    let tutorials = [];
    let isContainerized = false;

    // Initialize the app
    function init() {
        checkContainerEnvironment();
        loadTutorials();
        setupEventListeners();
        setupDragAndDrop();
        setupRichTextEditor();
        updateAdminControls(); // Add this to handle admin state
    }

    // Update UI based on admin state
    function updateAdminControls() {
        if (isAdmin) {
            // Show admin controls
            addTutorialBtn.style.display = 'block';
            uploadPdfBtn.style.display = 'block';
            document.querySelectorAll('.btn-edit-tutorial, .btn-delete-tutorial, .btn-copy-tutorial').forEach(btn => {
                btn.style.display = 'inline-block';
            });
        } else {
            // Hide admin controls
            addTutorialBtn.style.display = 'none';
            uploadPdfBtn.style.display = 'none';
            document.querySelectorAll('.btn-edit-tutorial, .btn-delete-tutorial, .btn-copy-tutorial').forEach(btn => {
                btn.style.display = 'none';
            });
        }
    }

    // Check if we're in a containerized environment
    function checkContainerEnvironment() {
        isContainerized = document.body.classList.contains('containerized-environment') || 
                        window.location.href.includes('container=true');
    }

    // Load tutorials from storage (localStorage or container storage)
    function loadTutorials() {
        if (isContainerized) {
            // Try to load from container storage
            if (window.containerStorage && typeof window.containerStorage.getTutorials === 'function') {
                window.containerStorage.getTutorials()
                    .then(containerTutorials => {
                        if (containerTutorials && containerTutorials.length > 0) {
                            tutorials = containerTutorials;
                        } else {
                            // Load default tutorials if container storage is empty
                            loadDefaultTutorials();
                        }
                        renderTutorials();
                    })
                    .catch(err => {
                        console.error('Error loading from container storage:', err);
                        loadFromLocalStorage();
                    });
            } else {
                // Fallback to localStorage if container storage not available
                loadFromLocalStorage();
            }
        } else {
            loadFromLocalStorage();
        }
    }

    // Load default tutorials (for first-time use)
    function loadDefaultTutorials() {
        tutorials = [
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
                videoUrl: null,
                manualContent: null,
                images: []
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
                pdfUrl: null,
                wordUrl: null,
                videoUrl: null,
                manualContent: null,
                images: []
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
                wordUrl: null,
                videoUrl: null,
                manualContent: null,
                images: []
            }    
        ];
    }

    function loadFromLocalStorage() {
        const savedTutorials = localStorage.getItem('techTutorials');
        if (savedTutorials) {
            try {
                tutorials = JSON.parse(savedTutorials);
                if (!tutorials || !Array.isArray(tutorials)) {
                    loadDefaultTutorials();
                }
            } catch (e) {
                console.error('Error parsing saved tutorials:', e);
                loadDefaultTutorials();
            }
        } else {
            loadDefaultTutorials();
        }
        renderTutorials();
    }

    // Save tutorials to appropriate storage
    function saveTutorialsToStorage() {
        if (isContainerized && window.containerStorage && typeof window.containerStorage.saveTutorials === 'function') {
            // Save to container storage
            window.containerStorage.saveTutorials(tutorials)
                .then(() => {
                    // Also save to localStorage as backup
                    try {
                        localStorage.setItem('techTutorials', JSON.stringify(tutorials));
                    } catch (e) {
                        console.error('Error saving to localStorage:', e);
                    }
                })
                .catch(err => {
                    console.error('Error saving to container storage:', err);
                    // Fallback to localStorage
                    try {
                        localStorage.setItem('techTutorials', JSON.stringify(tutorials));
                    } catch (e) {
                        console.error('Error saving to localStorage:', e);
                        showMessage('Warning: Could not save data to storage. Some data may be lost.', 'warning');
                    }
                });
        } else {
            // Save to localStorage
            try {
                localStorage.setItem('techTutorials', JSON.stringify(tutorials));
            } catch (e) {
                console.error('Error saving tutorials to storage:', e);
                showMessage('Warning: Could not save all data to local storage. Some data may be lost.', 'warning');
            }
        }
    }

    // Function to manually add a tutorial
    function addManualTutorial(tutorialData) {
        // Validate and set default values
        if (!tutorialData.id) tutorialData.id = Date.now().toString();
        if (!tutorialData.date) tutorialData.date = new Date().toISOString().split('T')[0];
        if (!tutorialData.sections) tutorialData.sections = [];
        if (!tutorialData.images) tutorialData.images = [];
        
        // Basic validation for required fields
        if (!tutorialData.title) {
            console.error('Error: Missing required field (title)');
            return false;
        }

        // Add to tutorials array
        tutorials.push(tutorialData);
        
        // Save to storage
        saveTutorialsToStorage();
        
        // Refresh the display
        renderTutorials();
        
        return tutorialData.id;
    }

    // Render all tutorials
    function renderTutorials() {
        tutorialsContainer.innerHTML = '';
        
        if (tutorials.length === 0) {
            tutorialsContainer.innerHTML = `
                <div class="no-tutorials-placeholder">
                    <i class="fas fa-book"></i>
                    <p>No tutorials documented yet. ${isAdmin ? 'Click "Add Tutorial" to get started.' : ''}</p>
                </div>
            `;
            return;
        }

        // Sort tutorials by date (newest first)
        const sortedTutorials = [...tutorials].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedTutorials.forEach(tutorial => {
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
        
        if (isAdmin) {
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
        }
        
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
        
        // Image gallery if exists
        if (tutorial.images && tutorial.images.length > 0) {
            const imagesDiv = document.createElement('div');
            imagesDiv.className = 'tutorial-images';
            
            const imagesTitle = document.createElement('h4');
            imagesTitle.textContent = 'Images:';
            imagesDiv.appendChild(imagesTitle);
            
            const imagesContainer = document.createElement('div');
            imagesContainer.className = 'images-container';
            
            tutorial.images.forEach((img, index) => {
                const imgContainer = document.createElement('div');
                imgContainer.className = 'image-thumbnail';
                
                const imgElement = document.createElement('img');
                imgElement.src = img;
                imgElement.alt = `Tutorial image ${index + 1}`;
                imgElement.addEventListener('click', () => viewImage(img));
                
                imgContainer.appendChild(imgElement);
                imagesContainer.appendChild(imgContainer);
            });
            
            imagesDiv.appendChild(imagesContainer);
            content.appendChild(imagesDiv);
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
            if (!isAdmin) {
                showMessage('Admin access required', 'error');
                return;
            }
            openTutorialEditor(null);
        });
        
        // Upload PDF button
        uploadPdfBtn.addEventListener('click', () => {
            if (!isAdmin) {
                showMessage('Admin access required', 'error');
                return;
            }
            pdfUpload.click();
        });
        
        // PDF file input
        pdfUpload.addEventListener('change', handlePdfUpload);
        
        // Tutorial container delegate events
        tutorialsContainer.addEventListener('click', (e) => {
            // Edit tutorial
            if (e.target.closest('.btn-edit-tutorial')) {
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
                const tutorialId = parseInt(e.target.closest('.btn-edit-tutorial').dataset.id);
                openTutorialEditor(tutorialId);
            }
            
            // Delete tutorial
            if (e.target.closest('.btn-delete-tutorial')) {
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
                const tutorialId = parseInt(e.target.closest('.btn-delete-tutorial').dataset.id);
                if (confirm('Are you sure you want to delete this tutorial?')) {
                    deleteTutorial(tutorialId);
                }
            }
            
            // Copy tutorial
            if (e.target.closest('.btn-copy-tutorial')) {
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
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
            if (!isAdmin) return;
            pdfFileUpload.click();
        });
        
        // PDF file upload in modal
        pdfFileUpload.addEventListener('change', (e) => {
            if (!isAdmin) return;
            if (e.target.files.length > 0) {
                pdfFile = e.target.files[0];
                showPdfPreview(pdfFile.name);
            }
        });
        
        // Remove PDF button
        removePdfBtn.addEventListener('click', () => {
            if (!isAdmin) return;
            pdfFile = null;
            pdfFileUpload.value = '';
            hidePdfPreview();
        });
        
        // Word upload container
        wordUploadContainer.addEventListener('click', () => {
            if (!isAdmin) return;
            wordFileUpload.click();
        });
        
        // Word file upload in modal
        wordFileUpload.addEventListener('change', (e) => {
            if (!isAdmin) return;
            if (e.target.files.length > 0) {
                wordFile = e.target.files[0];
                showWordPreview(wordFile.name);
            }
        });
        
        // Remove Word button
        removeWordBtn.addEventListener('click', () => {
            if (!isAdmin) return;
            wordFile = null;
            wordFileUpload.value = '';
            hideWordPreview();
        });
        
        // Video upload container
        videoUploadContainer.addEventListener('click', () => {
            if (!isAdmin) return;
            videoFileUpload.click();
        });
        
        // Video file upload in modal
        videoFileUpload.addEventListener('change', (e) => {
            if (!isAdmin) return;
            if (e.target.files.length > 0) {
                videoFile = e.target.files[0];
                showVideoPreview(videoFile);
            }
        });
        
        // Remove Video button
        removeVideoBtn.addEventListener('click', () => {
            if (!isAdmin) return;
            videoFile = null;
            videoFileUpload.value = '';
            hideVideoPreview();
        });
        
        // Add section button
        addSectionBtn.addEventListener('click', () => {
            if (!isAdmin) return;
            openSectionEditor(null);
        });
        
        // Save tutorial button
        saveTutorialBtn.addEventListener('click', saveTutorial);
        
        // Cancel tutorial button
        cancelTutorialBtn.addEventListener('click', closeTutorialEditor);
        
        // Delete tutorial button
        deleteTutorialBtn.addEventListener('click', () => {
            if (!isAdmin) return;
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
                if (!isAdmin) return;
                
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
            if (!isAdmin) return;
            pdfContainer.style.backgroundColor = '#f0f8ff';
        }
        
        function unhighlight() {
            pdfContainer.style.backgroundColor = '';
        }
        
        pdfContainer.addEventListener('drop', handlePdfDrop, false);
        
        function handlePdfDrop(e) {
            if (!isAdmin) return;
            
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
                if (!isAdmin) return;
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
            if (!isAdmin) return;
            
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
                if (!isAdmin) return;
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
            if (!isAdmin) return;
            
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
        if (!isAdmin) {
            showMessage('Admin access required', 'error');
            return;
        }
        
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
        if (!isAdmin) return;
        
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
        if (!isAdmin) {
            showMessage('Admin access required', 'error');
            return;
        }
        
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
                manualContent: manualContent || null,
                images: []
            });
            currentTutorialId = newId; // Set the new ID for scrolling
        }
        
        saveTutorialsToStorage();
        renderTutorials();
        closeTutorialEditor();
        showMessage('Tutorial saved successfully!', 'success');
    }

    // Save section
    function saveSection() {
        if (!isAdmin) {
            showMessage('Admin access required', 'error');
            return;
        }
        
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
        if (!isAdmin) {
            showMessage('Admin access required', 'error');
            return;
        }
        
        tutorials = tutorials.filter(t => t.id !== tutorialId);
        saveTutorialsToStorage();
        renderTutorials();
        showMessage('Tutorial deleted', 'success');
    }

    // Copy tutorial
    function copyTutorial(tutorialId) {
        if (!isAdmin) {
            showMessage('Admin access required', 'error');
            return;
        }
        
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
            saveTutorialsToStorage();
            renderTutorials();
            showMessage('Tutorial copied', 'success');
        }
    }

    // Handle PDF upload
    function handlePdfUpload(e) {
        if (!isAdmin) return;
        
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type === 'application/pdf') {
                // In a real app, you would upload the file to a server here
                showMessage(`PDF "${file.name}" would be uploaded to the server in a real application`, 'info');
            } else {
                showMessage('Please upload a PDF file', 'warning');
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

    // Make addManualTutorial available globally if needed
    window.addManualTutorial = addManualTutorial;
});










// project section

document.addEventListener('DOMContentLoaded', function() {
    // Projects data storage
    let projects = [];
    let currentProjectId = null;
    const MAX_IMAGE_SIZE = 1024 * 1024; // 1MB max image size
    const MAX_IMAGE_WIDTH = 1200; // Max width for compressed images
    let isContainerized = false;
    let isAdmin = false;
    const ADMIN_PASSWORD = 'melvin';

    // Initialize the app
    function init() {
        checkContainerEnvironment();
        loadProjects();
        setupEventListeners();
        setupDragAndDrop();
        checkAdminStatus(); // Check admin status on init
    }

    // Enhanced admin status check for containerized environments
    function checkAdminStatus() {
        // First try localStorage
        const localStorageAdmin = localStorage.getItem('adminSession');
        if (localStorageAdmin === ADMIN_PASSWORD) {
            setAdmin(true);
            return;
        }

        // If containerized, check container storage
        if (isContainerized && window.containerStorage && typeof window.containerStorage.getAdminStatus === 'function') {
            window.containerStorage.getAdminStatus()
                .then(containerAdmin => {
                    if (containerAdmin === ADMIN_PASSWORD) {
                        setAdmin(true);
                        // Sync to localStorage
                        localStorage.setItem('adminSession', ADMIN_PASSWORD);
                    } else {
                        setAdmin(false); // Explicitly set to false if not admin
                    }
                })
                .catch(err => {
                    console.error('Error checking container admin status:', err);
                    setAdmin(false); // Default to false on error
                });
        } else {
            setAdmin(false); // Default to false if not containerized
        }
    }

    function setAdmin(status) {
        isAdmin = status;
        if (status) {
            activateAdminFeatures();
            // Sync admin status to container storage if available
            if (isContainerized && window.containerStorage && typeof window.containerStorage.setAdminStatus === 'function') {
                window.containerStorage.setAdminStatus(ADMIN_PASSWORD)
                    .catch(err => console.error('Error syncing admin status:', err));
            }
        } else {
            deactivateAdminFeatures();
            localStorage.removeItem('adminSession');
            if (isContainerized && window.containerStorage && typeof window.containerStorage.clearAdminStatus === 'function') {
                window.containerStorage.clearAdminStatus()
                    .catch(err => console.error('Error clearing container admin status:', err));
            }
        }
    }

    // Activate admin features for projects
    function activateAdminFeatures() {
        // Show all edit and delete buttons
        document.querySelectorAll('.edit-project, .delete-project, #editInModalBtn').forEach(btn => {
            btn.style.display = 'inline-block';
        });
        
        // Show the "New Project" button
        document.getElementById('editProjectBtn').style.display = 'inline-block';
        
        // Enable all admin controls in the editor
        const editorControls = document.querySelectorAll('#projectEditorModal input, #projectEditorModal textarea, #projectEditorModal button:not(.close-modal)');
        editorControls.forEach(control => {
            control.disabled = false;
        });
        
        // Enable project details modal controls if needed
        const projectModalControls = document.querySelectorAll('#projectModal .admin-control');
        projectModalControls.forEach(control => {
            control.style.display = 'block';
        });
    }

    // Deactivate admin features for projects
    function deactivateAdminFeatures() {
        // Hide all edit and delete buttons
        document.querySelectorAll('.edit-project, .delete-project, #editInModalBtn').forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide the "New Project" button
        document.getElementById('editProjectBtn').style.display = 'none';
        
        // Close any open editor modal
        document.getElementById('projectEditorModal').style.display = 'none';
        document.getElementById('projectModal').style.display = 'none';
        currentProjectId = null;
        
        // Disable all admin controls in the editor
        const editorControls = document.querySelectorAll('#projectEditorModal input, #projectEditorModal textarea, #projectEditorModal button:not(.close-modal)');
        editorControls.forEach(control => {
            control.disabled = true;
        });
        
        // Hide project details modal controls
        const projectModalControls = document.querySelectorAll('#projectModal .admin-control');
        projectModalControls.forEach(control => {
            control.style.display = 'none';
        });
    }

    // Check if we're in a containerized environment
    function checkContainerEnvironment() {
        isContainerized = document.body.classList.contains('containerized-environment') || 
                        window.location.href.includes('container=true');
    }

    // Load projects from storage (localStorage or container storage)
    function loadProjects() {
        if (isContainerized) {
            // Try to load from container storage
            if (window.containerStorage && typeof window.containerStorage.getProjects === 'function') {
                window.containerStorage.getProjects()
                    .then(containerProjects => {
                        if (containerProjects && containerProjects.length > 0) {
                            projects = containerProjects;
                        } else {
                            // Load default projects if container storage is empty
                            loadDefaultProjects();
                        }
                        renderProjectsGrid();
                    })
                    .catch(err => {
                        console.error('Error loading from container storage:', err);
                        loadFromLocalStorage();
                    });
            } else {
                // Fallback to localStorage if container storage not available
                loadFromLocalStorage();
            }
        } else {
            loadFromLocalStorage();
        }
    }

    // Load default projects (for first-time use)
    function loadDefaultProjects() {
        projects = [
            {
                id: 'proj-1',
                title: 'Containerized Web Application',
                description: 'A modern web application deployed using Docker containers with CI/CD pipeline',
                link: 'https://github.com/melvinsamuel070',
                images: [
                    {
                        src: 'https://via.placeholder.com/800x600?text=Architecture+Diagram',
                        name: 'Architecture Diagram',
                        isFeatured: true
                    },
                    {
                        src: 'https://via.placeholder.com/800x600?text=Deployment+Flow',
                        name: 'Deployment Flow'
                    }
                ],
                technologies: ['Docker', 'Kubernetes', 'Node.js', 'React', 'CI/CD'],
                createdAt: '2023-05-15T10:00:00Z',
                updatedAt: '2023-05-15T10:00:00Z'
            },
            {
                id: 'proj-2',
                title: 'Microservices Platform',
                description: 'A scalable microservices platform with service discovery and load balancing',
                link: 'https://github.com/example/microservices-platform',
                images: [
                    {
                        src: 'https://via.placeholder.com/800x600?text=Service+Mesh',
                        name: 'Service Mesh',
                        isFeatured: true
                    }
                ],
                technologies: ['Kubernetes', 'Istio', 'gRPC', 'Go', 'Prometheus'],
                createdAt: '2023-06-20T14:30:00Z',
                updatedAt: '2023-06-20T14:30:00Z'
            }
        ];
        saveProjectsToStorage();
    }

    function loadFromLocalStorage() {
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) {
            try {
                projects = JSON.parse(savedProjects);
                if (!projects || !Array.isArray(projects)) {
                    loadDefaultProjects();
                }
            } catch (e) {
                console.error('Error parsing saved projects:', e);
                loadDefaultProjects();
            }
        } else {
            loadDefaultProjects();
        }
        renderProjectsGrid();
    }

    // Save projects to appropriate storage
    function saveProjectsToStorage() {
        if (isContainerized && window.containerStorage && typeof window.containerStorage.saveProjects === 'function') {
            // Save to container storage
            window.containerStorage.saveProjects(projects)
                .then(() => {
                    // Also save to localStorage as backup
                    try {
                        localStorage.setItem('projects', JSON.stringify(projects));
                    } catch (e) {
                        console.error('Error saving to localStorage:', e);
                    }
                })
                .catch(err => {
                    console.error('Error saving to container storage:', err);
                    // Fallback to localStorage
                    try {
                        localStorage.setItem('projects', JSON.stringify(projects));
                    } catch (e) {
                        console.error('Error saving to localStorage:', e);
                        showToast('Warning: Could not save data to storage. Some data may be lost.', 'warning');
                    }
                });
        } else {
            // Save to localStorage
            try {
                localStorage.setItem('projects', JSON.stringify(projects));
            } catch (e) {
                console.error('Error saving projects to storage:', e);
                showToast('Warning: Could not save all data to local storage. Some data may be lost.', 'warning');
            }
        }
    }

    // Function to manually add a project
    function addManualProject(projectData) {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return false;
        }

        // Validate and set default values
        if (!projectData.id) projectData.id = 'proj-' + Date.now();
        if (!projectData.createdAt) projectData.createdAt = new Date().toISOString();
        if (!projectData.updatedAt) projectData.updatedAt = new Date().toISOString();
        if (!projectData.images) projectData.images = [];
        if (!projectData.technologies) projectData.technologies = [];
        
        // Basic validation for required fields
        if (!projectData.title || !projectData.description) {
            console.error('Error: Missing required fields (title and description)');
            return false;
        }

        // Ensure at least one featured image exists
        if (projectData.images.length > 0 && !projectData.images.some(img => img.isFeatured)) {
            projectData.images[0].isFeatured = true;
        }

        // Add to projects array
        projects.unshift(projectData);
        
        // Save to storage
        saveProjectsToStorage();
        
        // Refresh the display
        renderProjectsGrid();
        
        return projectData.id;
    }

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            // Remove active class from all tabs and buttons
            document.querySelectorAll('.tab-content, .tab-btn').forEach(el => {
                el.classList.remove('active');
            });
            // Add active class to selected tab and button
            button.classList.add('active');
            document.getElementById(`${tabName}Tab`).classList.add('active');
        });
    });

    // Gallery functionality
    const editorUploadContainer = document.getElementById('editorUploadContainer');
    const editorImageUpload = document.getElementById('editorImageUpload');
    const editorImageGallery = document.getElementById('editorImageGallery');
    
    // Handle click on upload container
    editorUploadContainer.addEventListener('click', () => {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }
        editorImageUpload.click();
    });
    
    // Handle drag and drop
    editorUploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        editorUploadContainer.classList.add('dragover');
    });
    
    editorUploadContainer.addEventListener('dragleave', () => {
        editorUploadContainer.classList.remove('dragover');
    });
    
    editorUploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        editorUploadContainer.classList.remove('dragover');
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }
        handleFiles(e.dataTransfer.files);
    });
    
    // Handle file selection
    editorImageUpload.addEventListener('change', () => {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }
        handleFiles(editorImageUpload.files);
        // Reset input to allow selecting same files again
        editorImageUpload.value = '';
    });
    
    async function handleFiles(files) {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                try {
                    // Check file size before processing
                    if (file.size > MAX_IMAGE_SIZE) {
                        showToast(`Image ${file.name} is too large. Compressing...`, 'warning');
                    }
                    
                    const compressedFile = await compressImage(file);
                    const imageId = 'img-' + Date.now() + '-' + i;
                    
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        // Store the compressed file object with the image data
                        const imageData = {
                            id: imageId,
                            file: compressedFile,
                            src: e.target.result,
                            name: file.name,
                            isFeatured: editorImageGallery.children.length === 0 // First image is featured by default
                        };
                        
                        // Add to gallery display
                        addImageToGallery(imageData);
                    };
                    reader.readAsDataURL(compressedFile);
                } catch (error) {
                    console.error('Error processing image:', error);
                    showToast(`Error processing ${file.name}: ${error.message}`, 'error');
                }
            }
        }
    }
    
    // Image compression function
    async function compressImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    // Calculate new dimensions while maintaining aspect ratio
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > MAX_IMAGE_WIDTH) {
                        height = Math.round((height * MAX_IMAGE_WIDTH) / width);
                        width = MAX_IMAGE_WIDTH;
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    // Draw image with new dimensions
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Convert to JPEG with 80% quality (adjust as needed)
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Canvas to Blob conversion failed'));
                                return;
                            }
                            
                            // Create a new file with the compressed blob
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            
                            resolve(compressedFile);
                        },
                        'image/jpeg',
                        0.8 // Quality (0.8 = 80%)
                    );
                };
                img.onerror = function() {
                    reject(new Error('Failed to load image'));
                };
                img.src = event.target.result;
            };
            reader.onerror = function() {
                reject(new Error('Failed to read file'));
            };
            reader.readAsDataURL(file);
        });
    }
    
    function addImageToGallery(imageData) {
        const imageElement = document.createElement('div');
        imageElement.className = 'gallery-item';
        if (imageData.isFeatured) {
            imageElement.classList.add('featured');
        }
        
        imageElement.innerHTML = `
            <img src="${imageData.src}" alt="${imageData.name}" style="width:100%; border-radius:4px;">
            <div class="gallery-item-actions">
                <button class="btn btn-sm btn-outline set-featured-btn" data-id="${imageData.id}">
                    <i class="fas fa-star"></i>
                </button>
                <button class="btn btn-sm btn-outline delete-image-btn" data-id="${imageData.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        editorImageGallery.appendChild(imageElement);
        
        // Add event listeners for the new buttons
        document.querySelector(`.delete-image-btn[data-id="${imageData.id}"]`).addEventListener('click', () => {
            if (!isAdmin) {
                showToast('Admin access required', 'error');
                return;
            }
            imageElement.remove();
            
            // If we deleted the featured image, make the first remaining image featured
            if (imageData.isFeatured && editorImageGallery.children.length > 0) {
                const firstGalleryItem = editorImageGallery.querySelector('.gallery-item');
                if (firstGalleryItem) {
                    firstGalleryItem.classList.add('featured');
                    firstGalleryItem.querySelector('.set-featured-btn').click();
                }
            }
        });
        
        document.querySelector(`.set-featured-btn[data-id="${imageData.id}"]`).addEventListener('click', (e) => {
            if (!isAdmin) {
                showToast('Admin access required', 'error');
                return;
            }
            // Remove featured status from all images
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.classList.remove('featured');
            });
            
            // Set this image as featured
            e.target.closest('.gallery-item').classlass.add('featured');
        });
    }

    // Technologies functionality
    const editorTechTags = document.getElementById('editorTechTags');
    const newTechInput = document.getElementById('newTechInput');
    const addTechBtn = document.getElementById('addTechBtn');
    
    addTechBtn.addEventListener('click', addTechnology);
    newTechInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTechnology();
        }
    });
    
    function addTechnology() {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }

        const techName = newTechInput.value.trim();
        if (techName) {
            const techId = 'tech-' + Date.now();
            const techElement = document.createElement('div');
            techElement.className = 'tech-tag';
            techElement.innerHTML = `
                <span>${techName}</span>
                <button class="delete-tech-btn" data-id="${techId}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            techElement.setAttribute('data-id', techId);
            editorTechTags.appendChild(techElement);
            newTechInput.value = '';
            
            // Add event listener for delete button
            document.querySelector(`.delete-tech-btn[data-id="${techId}"]`).addEventListener('click', () => {
                if (!isAdmin) {
                    showToast('Admin access required', 'error');
                    return;
                }
                techElement.remove();
            });
        }
    }

    // Save functionality
    const saveProjectBtn = document.getElementById('saveEditProjectBtn');
    saveProjectBtn.addEventListener('click', saveProject);
    
    async function saveProject() {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }

        // Validate required fields
        const title = document.getElementById('editProjectTitle').value.trim();
        const description = document.getElementById('editProjectDescription').value.trim();
        
        if (!title || !description) {
            alert('Please fill in all required fields (Title and Description)');
            return;
        }
        
        // Collect images from gallery
        const images = [];
        const galleryItems = editorImageGallery.querySelectorAll('.gallery-item');
        
        // Check if there are any images
        if (galleryItems.length === 0) {
            alert('Please add at least one image to the project');
            return;
        }
        
        // Convert gallery items to image data
        for (const item of galleryItems) {
            const img = item.querySelector('img');
            const isFeatured = item.classList.contains('featured');
            
            // Find the original file data if available
            const fileInput = document.querySelector(`input[data-id="${img.dataset.id}"]`);
            const file = fileInput ? fileInput.file : null;
            
            images.push({
                src: img.src,
                name: img.alt,
                isFeatured: isFeatured,
                file: file
            });
        }
        
        // Collect technologies
        const technologies = [];
        const techTags = editorTechTags.querySelectorAll('.tech-tag span');
        techTags.forEach(tag => {
            technologies.push(tag.textContent);
        });
        
        // Create project object
        const project = {
            id: currentProjectId || 'proj-' + Date.now(),
            title: title,
            description: description,
            link: document.getElementById('editProjectLink').value.trim(),
            images: images,
            technologies: technologies,
            createdAt: currentProjectId 
                ? projects.find(p => p.id === currentProjectId)?.createdAt || new Date().toISOString()
                : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        try {
            // Show loading state
            saveProjectBtn.disabled = true;
            saveProjectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            
            // Update or add project
            if (currentProjectId) {
                // Update existing project
                const index = projects.findIndex(p => p.id === currentProjectId);
                if (index !== -1) {
                    projects[index] = project;
                }
            } else {
                // Add new project
                projects.unshift(project);
            }
            
            // Save to storage
            saveProjectsToStorage();
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Update the projects grid
            renderProjectsGrid();
            
            // Show success message
            showToast('Project saved successfully!', 'success');
            
            // Close the modal
            document.getElementById('projectEditorModal').style.display = 'none';
            currentProjectId = null;
            
            // Clear the form
            editorImageGallery.innerHTML = '';
            editorTechTags.innerHTML = '';
            document.getElementById('editProjectTitle').value = '';
            document.getElementById('editProjectDescription').value = '';
            document.getElementById('editProjectLink').value = '';
        } catch (error) {
            console.error('Error saving project:', error);
            showToast(error.message || 'Error saving project. Please try again.', 'error');
        } finally {
            // Reset button state
            saveProjectBtn.disabled = false;
            saveProjectBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
        }
    }
    
    // Delete project functionality
    document.getElementById('deleteProjectBtn').addEventListener('click', () => {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }

        if (currentProjectId && confirm('Are you sure you want to delete this project?')) {
            projects = projects.filter(p => p.id !== currentProjectId);
            saveProjectsToStorage();
            renderProjectsGrid();
            document.getElementById('projectEditorModal').style.display = 'none';
            showToast('Project deleted successfully!', 'success');
        }
    });
    
    // Render projects grid
    function renderProjectsGrid() {
        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = '';
        
        if (projects.length === 0) {
            projectsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-folder-open"></i>
                    <h3>No Projects Yet</h3>
                    <p>Click the "New Project" button to get started</p>
                    <button id="createFirstProjectBtn" class="btn btn-primary">
                        <i class="fas fa-plus"></i> Create Your First Project
                    </button>
                </div>
            `;
            
            document.getElementById('createFirstProjectBtn')?.addEventListener('click', () => {
                if (!isAdmin) {
                    showToast('Admin access required', 'error');
                    return;
                }
                document.getElementById('editProjectBtn').click();
            });
            return;
        }
        
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.dataset.id = project.id;
            
            // Create image slideshow container
            const imageContainer = document.createElement('div');
            imageContainer.className = 'project-image-container';
            
            const imageSlide = document.createElement('div');
            imageSlide.className = 'project-image-slide';
            
            // Add images to the slideshow (showing only the first 3 images)
            project.images.slice(0, 3).forEach((img, index) => {
                const imgElement = document.createElement('img');
                imgElement.src = img.src;
                imgElement.alt = img.name;
                imgElement.className = 'project-image';
                imgElement.style.display = index === 0 ? 'block' : 'none';
                imageSlide.appendChild(imgElement);
            });
            
            // Create slide navigation dots
            const slideNav = document.createElement('div');
            slideNav.className = 'project-slide-nav';
            
            for (let i = 0; i < Math.min(project.images.length, 3); i++) {
                const dot = document.createElement('div');
                dot.className = 'slide-dot';
                dot.classList.toggle('active', i === 0);
                slideNav.appendChild(dot);
            }
            
            imageContainer.appendChild(imageSlide);
            imageContainer.appendChild(slideNav);
            
            // Create project info section
            const projectInfo = document.createElement('div');
            projectInfo.className = 'project-info';
            
            const titleElement = document.createElement('h3');
            titleElement.className = 'project-title';
            titleElement.textContent = project.title;
            
            const descriptionElement = document.createElement('p');
            descriptionElement.className = 'project-description';
            descriptionElement.textContent = project.description.length > 100 
                ? project.description.substring(0, 100) + '...' 
                : project.description;
            
            // Create technologies container
            const techContainer = document.createElement('div');
            techContainer.className = 'project-tech';
            
            project.technologies.slice(0, 5).forEach(tech => {
                const techTag = document.createElement('span');
                techTag.className = 'tech-tag';
                techTag.textContent = tech;
                techContainer.appendChild(techTag);
            });
            
            if (project.technologies.length > 5) {
                const moreTag = document.createElement('span');
                moreTag.className = 'tech-tag more';
                moreTag.textContent = `+${project.technologies.length - 5} more`;
                techContainer.appendChild(moreTag);
            }
            
            // Create project actions
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'project-actions';
            
            const viewButton = document.createElement('button');
            viewButton.className = 'btn btn-primary view-project';
            viewButton.innerHTML = '<i class="fas fa-eye"></i> View Details';
            viewButton.addEventListener('click', () => viewProjectDetails(project.id));
            



            

            const editButton = document.createElement('button');
            editButton.className = 'btn btn-outline edit-project';
            editButton.innerHTML = '<i class="fas fa-edit"></i> Edit';
            editButton.style.display = isAdmin ? 'inline-block' : 'none';
            editButton.addEventListener('click', () => {
                if (!isAdmin) {
                    showToast('Admin access required', 'error');
                    return;
                }
                editProject(project.id);
            });
            




            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-outline-danger delete-project';
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.style.display = isAdmin ? 'inline-block' : 'none';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!isAdmin) {
                    showToast('Admin access required', 'error');
                    return;
                }
                if (confirm('Are you sure you want to delete this project?')) {
                    projects = projects.filter(p => p.id !== project.id);
                    saveProjectsToStorage();
                    renderProjectsGrid();
                    showToast('Project deleted successfully!', 'success');
                }
            });
            
            actionsContainer.appendChild(viewButton);
            actionsContainer.appendChild(editButton);
            actionsContainer.appendChild(deleteButton);
            
            // Assemble the project info section
            projectInfo.appendChild(titleElement);
            projectInfo.appendChild(descriptionElement);
            projectInfo.appendChild(techContainer);
            projectInfo.appendChild(actionsContainer);
            
            // Assemble the project card
            projectCard.appendChild(imageContainer);
            projectCard.appendChild(projectInfo);
            
            // Add the project card to the grid
            projectsGrid.appendChild(projectCard);
            
            // Initialize slideshow functionality
            initProjectSlideshow(projectCard);
        });
    }
    
    // View project details
    function viewProjectDetails(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        
        // Set modal content
        document.getElementById('modalProjectTitle').textContent = project.title;
        document.getElementById('modalProjectDescription').textContent = project.description;
        
        if (project.link) {
            const linkBtn = document.getElementById('modalProjectLink');
            linkBtn.href = project.link;
            linkBtn.style.display = 'inline-block';
        } else {
            document.getElementById('modalProjectLink').style.display = 'none';
        }
        
        // Set technologies
        const techContainer = document.getElementById('modalProjectTech');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const techTag = document.createElement('span');
            techTag.className = 'tech-tag';
            techTag.textContent = tech;
            techContainer.appendChild(techTag);
        });
        
        // Set gallery
        const gallery = document.getElementById('projectGallery');
        const thumbnails = document.getElementById('galleryThumbnails');
        const mainImage = document.getElementById('galleryMainImage');
        
        // Clear existing content
        thumbnails.innerHTML = '';
        
        if (project.images.length > 0) {
            // Set first image as main image
            const featuredImage = project.images.find(img => img.isFeatured) || project.images[0];
            mainImage.src = featuredImage.src;
            mainImage.alt = featuredImage.name;
            
            // Add thumbnails
            project.images.forEach((img, index) => {
                const thumb = document.createElement('img');
                thumb.src = img.src;
                thumb.alt = img.name;
                thumb.className = 'gallery-thumbnail';
                if (img.isFeatured || (index === 0 && !featuredImage)) {
                    thumb.classList.add('active');
                }
                thumb.addEventListener('click', () => {
                    mainImage.src = img.src;
                    mainImage.alt = img.name;
                    document.querySelectorAll('.gallery-thumbnail').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                thumbnails.appendChild(thumb);
            });
            
            // Show navigation if multiple images
            if (project.images.length > 1) {
                gallery.querySelector('.gallery-nav').style.display = 'flex';
            } else {
                gallery.querySelector('.gallery-nav').style.display = 'none';
            }
        }
        
        // Show modal
        document.getElementById('projectModal').style.display = 'block';
        
        // Handle edit button in project details modal
        const editInModalBtn = document.getElementById('editInModalBtn');
        if (editInModalBtn) {
            editInModalBtn.style.display = isAdmin ? 'inline-block' : 'none';
            editInModalBtn.onclick = function() {
                if (!isAdmin) {
                    showToast('Admin access required', 'error');
                    return;
                }
                document.getElementById('projectModal').style.display = 'none';
                editProject(projectId);
            };
        }
    }
    
    // Edit project
    function editProject(projectId) {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }

        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        
        currentProjectId = projectId;
        
        // Populate form fields
        document.getElementById('editProjectTitle').value = project.title;
        document.getElementById('editProjectDescription').value = project.description;
        document.getElementById('editProjectLink').value = project.link || '';
        
        // Rebuild gallery
        editorImageGallery.innerHTML = '';
        project.images.forEach(img => {
            const imageElement = document.createElement('div');
            imageElement.className = 'gallery-item';
            if (img.isFeatured) {
                imageElement.classList.add('featured');
            }
            
            imageElement.innerHTML = `
                <img src="${img.src}" alt="${img.name}" style="width:100%; border-radius:4px;">
                <div class="gallery-item-actions">
                    <button class="btn btn-sm btn-outline set-featured-btn" data-id="${img.id || 'img-' + Date.now()}">
                        <i class="fas fa-star"></i>
                    </button>
                    <button class="btn btn-sm btn-outline delete-image-btn" data-id="${img.id || 'img-' + Date.now()}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            editorImageGallery.appendChild(imageElement);
            
            // Add event listeners for the buttons
            imageElement.querySelector('.delete-image-btn').addEventListener('click', () => {
                if (!isAdmin) {
                    showToast('Admin access required', 'error');
                    return;
                }
                imageElement.remove();
            });
            
            imageElement.querySelector('.set-featured-btn').addEventListener('click', (e) => {
                if (!isAdmin) {
                    showToast('Admin access required', 'error');
                    return;
                }
                document.querySelectorAll('.gallery-item').forEach(item => {
                    item.classList.remove('featured');
                });
                e.target.closest('.gallery-item').classList.add('featured');
            });
        });
        
        // Rebuild technologies
        editorTechTags.innerHTML = '';
        project.technologies.forEach(tech => {
            const techId = 'tech-' + Date.now();
            const techElement = document.createElement('div');
            techElement.className = 'tech-tag';
            techElement.innerHTML = `
                <span>${tech}</span>
                <button class="delete-tech-btn" data-id="${techId}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            techElement.setAttribute('data-id', techId);
            editorTechTags.appendChild(techElement);
            
            // Add event listener for delete button
            techElement.querySelector('.delete-tech-btn').addEventListener('click', () => {
                if (!isAdmin) {
                    showToast('Admin access required', 'error');
                    return;
                }
                techElement.remove();
            });
        });
        
        // Show editor modal
        document.getElementById('projectEditorModal').style.display = 'block';
    }
    
    // Initialize project slideshow
    function initProjectSlideshow(projectCard) {
        const images = projectCard.querySelectorAll('.project-image');
        const dots = projectCard.querySelectorAll('.slide-dot');
        
        if (images.length > 1) {
            let currentIndex = 0;
            
            // Auto-rotate images every 3 seconds
            const interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                showImage(currentIndex);
            }, 3000);
            
            // Show specific image when dot is clicked
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(interval);
                    showImage(index);
                });
            });
            
            function showImage(index) {
                images.forEach((img, i) => {
                    img.style.display = i === index ? 'block' : 'none';
                });
                
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
                
                currentIndex = index;
            }
        }
    }

    // Toast notification function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }, 100);
    }

    // Modal close functionality
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    document.getElementById('cancelEditBtn').addEventListener('click', () => {
        document.getElementById('projectEditorModal').style.display = 'none';
        currentProjectId = null;
    });
    
    // New project button functionality
    document.getElementById('editProjectBtn')?.addEventListener('click', () => {
        if (!isAdmin) {
            showToast('Admin access required', 'error');
            return;
        }

        currentProjectId = null;
        editorImageGallery.innerHTML = '';
        editorTechTags.innerHTML = '';
        document.getElementById('editProjectTitle').value = '';
        document.getElementById('editProjectDescription').value = '';
        document.getElementById('editProjectLink').value = '';
        document.getElementById('projectEditorModal').style.display = 'block';
    });
    
    // Click outside modal to close
    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

    // Setup drag and drop for file uploads
    function setupDragAndDrop() {
        // Editor upload container
        editorUploadContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            editorUploadContainer.classList.add('dragover');
        });
        
        editorUploadContainer.addEventListener('dragleave', () => {
            editorUploadContainer.classList.remove('dragover');
        });
        
        editorUploadContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            editorUploadContainer.classList.remove('dragover');
            if (!isAdmin) {
                showToast('Admin access required', 'error');
                return;
            }
            handleFiles(e.dataTransfer.files);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Existing event listeners setup...
    }

    // Initialize the application
    init();

    // Make addManualProject available globally if needed
    window.addManualProject = addManualProject;
});


















// Book Store Module with PDF display and animated advert - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    const BookStore = (function() {
        // Configuration
        const config = {
            advertPosition: {
                top: '48%',
                right: '10px',
                width: '300px'
            },
            bookshelfBackground: 'url("https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
            illuminationColor: 'rgba(255, 215, 0, 0.15)',
            maxFileSize: 25 * 1024 * 1024, // Increased to 25MB
            allowedFileTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            bookCoverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            compressionEnabled: true,
            compressionQuality: 0.8
        };

        // State
        let books = [];
        let bookFiles = {}; // Store file objects separately

        // DOM Elements
        const elements = {
            bookStore: document.getElementById('book-store'),
            booksGrid: document.getElementById('books-grid'),
            bookUploadForm: document.getElementById('book-upload-form'),
            bookSearch: document.getElementById('book-search'),
            bookFileInput: document.getElementById('book-file'),
            fileNameDisplay: document.getElementById('file-name'),
            advertContainer: null,
            phoneElement: null
        };

        // Initialize the book store
        function init() {
            if (!elements.bookStore) return;
            
            createAdvert();
            setupBookshelf();
            loadBooks();
            setupEventListeners();
            updateAdminFeatures(); // Check admin status on init
        }

        // Update admin features based on current admin status
        function updateAdminFeatures() {
            if (isAdmin) {
                // Show upload form and admin controls
                elements.bookUploadForm.style.display = 'block';
                document.querySelectorAll('.delete-book').forEach(btn => {
                    btn.style.display = 'inline-block';
                });
            } else {
                // Hide upload form and admin controls
                elements.bookUploadForm.style.display = 'none';
                document.querySelectorAll('.delete-book').forEach(btn => {
                    btn.style.display = 'none';
                });
            }
        }

        // Create animated advert with phone showing book cover
        function createAdvert() {
            // Main advert container
            elements.advertContainer = document.createElement('div');
            elements.advertContainer.className = 'bookstore-advert';
            elements.advertContainer.style.cssText = `
                position: fixed;
                top: ${config.advertPosition.top};
                right: ${config.advertPosition.right};  
                width: ${config.advertPosition.width};
                max-width: 90%;
                z-index: 1000;
                background: white;
                padding: 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgb(27, 122, 19);
                border-left: 9px solidrgba(76, 175, 79, 0);
                transform: translateY(-50%);
                transition: all 0.3s ease;
            `;
            
            // Phone element that will animate
            elements.phoneElement = document.createElement('div');
            elements.phoneElement.className = 'advert-phone';
            elements.phoneElement.style.cssText = `
                position: absolute;
                top: -10px;
                right: 20px;
                width: 120px;
                height: 200px;
                background: #111;
                border-radius: 15px;
                border: 5px solid #333;
                z-index: 1001;
                transform: rotate(15deg);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0);
                overflow: hidden;
                transition: all 0.5s ease;
            `;
            
            // Phone screen showing book cover
            const phoneScreen = document.createElement('div');
            phoneScreen.className = 'phone-screen';
            phoneScreen.style.cssText = `
                width: 100%;
                height: 100%;
                background-image: url('${config.bookCoverImage}');
                background-size: cover;
                background-position: center;
                transition: all 0.5s ease;
            `;
            elements.phoneElement.appendChild(phoneScreen);
            
            // Advert content
            elements.advertContainer.innerHTML = `
                <div class="advert-content">
                    <span class="close-ad">&times;</span>
                    <h4 style="margin-top: 0; color: #2c3e50; font-size: 16px;">Premium Technical Resources</h4>
                    <p style="color: #7f8c8d; font-size: 14px; margin-bottom: 40px;">Check out our latest book now available in our store!</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                        <a href="#book-store" class="btn" style="background: #4CAF50; color: white; padding: 8px 12px; border-radius: 4px; text-decoration: none; font-size: 14px;">
                            Explore Now
                        </a>
                        <small style="color: #95a5a6; font-size: 12px;">Limited time offer</small>
                    </div>
                </div>
            `;
            
            document.body.appendChild(elements.phoneElement);
            
            // Start animation
            animateAdvert();
            
            // Close button functionality
            elements.advertContainer.querySelector('.close-ad').addEventListener('click', function() {
                elements.advertContainer.style.display = 'none';
                elements.phoneElement.style.display = 'none';
            });
            
            // Clicking the "Explore Now" button scrolls to the book store
            elements.advertContainer.querySelector('a').addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });

            // Make responsive for mobile
            function handleResize() {
                if (window.innerWidth <= 768) {
                    elements.advertContainer.style.width = '250px';
                    elements.advertContainer.style.right = '5px';
                    elements.phoneElement.style.width = '80px';
                    elements.phoneElement.style.height = '160px';
                    elements.phoneElement.style.right = '10px';
                } else {
                    elements.advertContainer.style.width = config.advertPosition.width;
                    elements.advertContainer.style.right = config.advertPosition.right;
                    elements.phoneElement.style.width = '120px';
                    elements.phoneElement.style.height = '200px';
                    elements.phoneElement.style.right = '20px';
                }
            }

            // Initial resize check
            handleResize();
            
            // Add resize listener
            window.addEventListener('resize', handleResize);
        }

        // Animate the advert with phone waving
        function animateAdvert() {
            // Phone waving animation
            let angle = 15;
            let direction = 1;
            
            const wavePhone = () => {
                angle += direction * 2;
                if (angle > 25 || angle < 5) direction *= -1;
                elements.phoneElement.style.transform = `rotate(${angle}deg)`;
                requestAnimationFrame(wavePhone);
            };
            
            // Start waving after a delay
            setTimeout(() => {
                wavePhone();
            }, 1000);
            
            // Phone screen content change animation
            setInterval(() => {
                const screen = elements.phoneElement.querySelector('.phone-screen');
                screen.style.opacity = '0';
                setTimeout(() => {
                    screen.style.backgroundImage = `url('${config.bookCoverImage}')`;
                    screen.style.opacity = '1';
                }, 500);
            }, 3000);
        }

        // Setup bookshelf with wooden background and illumination
        function setupBookshelf() {
            const bookshelf = document.querySelector('.bookshelf');
            if (!bookshelf) return;
            
            bookshelf.style.cssText = `
                position: relative;
                background: ${config.bookshelfBackground} center/cover no-repeat;
                padding: 30px;
                border-radius: 8px;
                box-shadow: inset 0 0 30px rgb(18, 90, 40);
                border: 15px solid #5D4037;
                border-image: url("https://images.unsplash.com/photo-1605773527852-c546a8584ea9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80") 30 round;
                overflow: hidden;
            `;
            
            // Create illumination effect
            const light = document.createElement('div');
            light.className = 'bookshelf-light';
            light.style.cssText = `
                position: absolute;
                top: -50%;
                right: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, ${config.illuminationColor} 0%, transparent 70%);
                pointer-events: none;
                animation: rotateLight 30s linear infinite;
            `;
            
            bookshelf.appendChild(light);
            
            // Add animation for the light
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rotateLight {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Load books from localStorage
        function loadBooks() {
            const savedBooks = localStorage.getItem('bookstoreBooks');
            if (savedBooks) {
                try {
                    books = JSON.parse(savedBooks);
                    // Initialize bookFiles object
                    books.forEach(book => {
                        if (book.fileData) {
                            bookFiles[book.id] = book.fileData;
                            delete book.fileData; // Clean up
                        }
                    });
                } catch (e) {
                    console.error('Error parsing saved books:', e);
                    books = getDefaultBooks();
                }
            } else {
                books = getDefaultBooks();
            }
            updateBooksDisplay();
        }

        // Get default books for first-time users
        function getDefaultBooks() {
            return [
                {
                    id: 'book-1',
                    title: 'DevOps Handbook',
                    description: 'A comprehensive guide to DevOps practices and principles for modern software development.',
                    tags: ['devops', 'automation', 'ci/cd'],
                    fileName: 'devops-handbook.pdf',
                    fileType: 'application/pdf',
                    fileSize: '2.4 MB',
                    uploadDate: new Date().toISOString(),
                    coverImage: config.bookCoverImage
                },
                {
                    id: 'book-2',
                    title: 'Cloud Architecture',
                    description: 'Designing scalable and resilient cloud-native applications for AWS, Azure and GCP.',
                    tags: ['cloud', 'architecture', 'aws', 'azure'],
                    fileName: 'cloud-architecture.pdf',
                    fileType: 'application/pdf',
                    fileSize: '3.1 MB',
                    uploadDate: new Date(Date.now() - 86400000).toISOString(),
                    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
                }
            ];
        }

        // Save books to localStorage
        function saveBooks() {
            // Don't save file data in the main books array
            const booksToSave = books.map(book => {
                const { fileData, ...rest } = book;
                return rest;
            });
            localStorage.setItem('bookstoreBooks', JSON.stringify(booksToSave));
        }

        // Setup event listeners
        function setupEventListeners() {
            // File input change
            elements.bookFileInput.addEventListener('change', function() {
                if (this.files.length > 0) {
                    const file = this.files[0];
                    elements.fileNameDisplay.textContent = `${file.name} (${formatFileSize(file.size)})`;
                    
                    // Validate file
                    if (file.size > config.maxFileSize) {
                        showMessage(`File is too large (max ${formatFileSize(config.maxFileSize)})`, 'error');
                        this.value = '';
                        elements.fileNameDisplay.textContent = 'No file chosen';
                    } else if (!config.allowedFileTypes.includes(file.type)) {
                        showMessage('Only PDF and Word documents are allowed', 'error');
                        this.value = '';
                        elements.fileNameDisplay.textContent = 'No file chosen';
                    }
                } else {
                    elements.fileNameDisplay.textContent = 'No file chosen';
                }
            });

            // Form submission
            elements.bookUploadForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                if (!isAdmin) {
                    showMessage('Admin access required', 'error');
                    return;
                }
                await uploadBook();
            });

            // Search functionality
            elements.bookSearch.addEventListener('input', function() {
                updateBooksDisplay();
            });
        }

        // Upload a new book
        async function uploadBook() {
            if (!isAdmin) {
                showMessage('Admin access required', 'error');
                return;
            }

            const title = document.getElementById('book-title').value.trim();
            const description = document.getElementById('book-description').value.trim();
            const tags = document.getElementById('book-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag);
            const file = elements.bookFileInput.files[0];

            // Validate inputs
            if (!title || !description || !file) {
                showMessage('Please fill all required fields', 'error');
                return;
            }

            if (tags.length === 0) {
                showMessage('Please add at least one tag', 'error');
                return;
            }

            showMessage('Processing your file...', 'info');

            try {
                // Process the file (compress if needed)
                const processedFile = await processFile(file);

                // Create book object
                const newBook = {
                    id: 'book-' + Date.now(),
                    title,
                    description,
                    tags,
                    fileName: file.name,
                    fileType: file.type,
                    fileSize: formatFileSize(processedFile.size),
                    uploadDate: new Date().toISOString(),
                    coverImage: getRandomCoverImage()
                };

                // Store the file data separately
                bookFiles[newBook.id] = processedFile;

                books.unshift(newBook);
                saveBooks();
                updateBooksDisplay();
                
                // Reset form
                elements.bookUploadForm.reset();
                elements.fileNameDisplay.textContent = 'No file chosen';
                
                showMessage('Book uploaded successfully!', 'success');
            } catch (error) {
                console.error('Error uploading book:', error);
                showMessage('Error processing file. Please try again.', 'error');
            }
        }

        // Process file (compress if needed)
        async function processFile(file) {
            if (!config.compressionEnabled || file.size <= 5 * 1024 * 1024) {
                return file; // No compression needed for small files
            }

            if (file.type === 'application/pdf') {
                // For PDFs, we can't compress in the browser, just return as-is
                return file;
            }

            // For Word docs, we could potentially compress, but for now just return as-is
            return file;
        }

        // Get a random cover image for new books
        function getRandomCoverImage() {
            const covers = [
                'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            ];
            return covers[Math.floor(Math.random() * covers.length)];
        }

        // Update books display based on search
        function updateBooksDisplay() {
            const searchTerm = elements.bookSearch.value.toLowerCase();
            
            // Filter books based on search term
            const filteredBooks = books.filter(book => {
                return (
                    book.title.toLowerCase().includes(searchTerm) ||
                    book.description.toLowerCase().includes(searchTerm) ||
                    book.tags.some(tag => tag.toLowerCase().includes(searchTerm))
                );
            });
            
            // Clear current display
            elements.booksGrid.innerHTML = '';
            
            // Show message if no books found
            if (filteredBooks.length === 0) {
                elements.booksGrid.innerHTML = `
                    <div class="no-books">
                        <i class="fas fa-book-open"></i>
                        <p>No books found matching your search</p>
                    </div>
                `;
                return;
            }
            
            // Add books to grid
            filteredBooks.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.innerHTML = `
                    <div class="book-cover" style="background-image: url('${book.coverImage}')">
                        <div class="book-overlay">
                            <button class="btn view-book" data-id="${book.id}">
                                <i class="fas fa-eye"></i> View
                            </button>
                        </div>
                        <span class="file-type">${book.fileType.split('/').pop().toUpperCase()}</span>
                    </div>
                    <div class="book-info">
                        <h4>${book.title}</h4>
                        <p class="book-description">${book.description}</p>
                        <div class="book-meta">
                            <span class="file-size"><i class="fas fa-file"></i> ${book.fileSize}</span>
                            <span class="upload-date"><i class="fas fa-calendar-alt"></i> ${formatDate(book.uploadDate)}</span>
                        </div>
                        <div class="book-tags">
                            ${book.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                        <div class="book-actions">
                            <button class="btn download-book" data-id="${book.id}">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="btn btn-danger delete-book" data-id="${book.id}" style="display: ${isAdmin ? 'inline-block' : 'none'}">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                `;
                
                elements.booksGrid.appendChild(bookCard);
                
                // Add event listeners
                bookCard.querySelector('.view-book').addEventListener('click', () => viewBook(book.id));
                bookCard.querySelector('.download-book').addEventListener('click', () => downloadBook(book.id));
                bookCard.querySelector('.delete-book').addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteBook(book.id);
                });
            });
        }

        // View book details with PDF preview
        function viewBook(bookId) {
            const book = books.find(b => b.id === bookId);
            if (!book) return;
            
            // Check if we have the file data
            const file = bookFiles[bookId];
            const fileUrl = file ? URL.createObjectURL(file) : null;
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'book-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                z-index: 2000;
                display: flex;
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            // Determine if we can show a PDF preview
            const canShowPdfPreview = book.fileType === 'application/pdf' && fileUrl;
            
            modal.innerHTML = `
                <div class="book-modal-content" style="
                    background: white;
                    width: 80%;
                    max-width: 800px;
                    max-height: 90vh;
                    overflow-y: auto;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                    position: relative;
                ">
                    <span class="close-modal" style="
                        position: absolute;
                        top: 15px;
                        right: 15px;
                        font-size: 24px;
                        cursor: pointer;
                        color: #7f8c8d;
                    ">&times;</span>
                    
                    <div class="book-modal-header" style="
                        padding: 20px;
                        border-bottom: 1px solid #ecf0f1;
                        display: flex;
                        align-items: center;
                    ">
                        <div class="book-modal-cover" style="
                            width: 120px;
                            height: 160px;
                            background-image: url('${book.coverImage}');
                            background-size: cover;
                            background-position: center;
                            margin-right: 20px;
                            border-radius: 4px;
                            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        "></div>
                        <div>
                            <h2 style="margin: 0 0 10px 0; color: #2c3e50;">${book.title}</h2>
                            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                <span style="background: #3498db; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px;">
                                    ${book.fileType.split('/').pop().toUpperCase()}
                                </span>
                                <span style="margin-left: 10px; color: #7f8c8d; font-size: 14px;">
                                    <i class="fas fa-file"></i> ${book.fileSize}
                                </span>
                                <span style="margin-left: 10px; color: #7f8c8d; font-size: 14px;">
                                    <i class="fas fa-calendar-alt"></i> ${formatDate(book.uploadDate)}
                                </span>
                            </div>
                            <div class="book-modal-tags" style="margin-bottom: 10px;">
                                ${book.tags.map(tag => `<span style="
                                    display: inline-block;
                                    background: #ecf0f1;
                                    color: #7f8c8d;
                                    padding: 3px 8px;
                                    border-radius: 4px;
                                    font-size: 12px;
                                    margin-right: 5px;
                                ">${tag}</span>`).join('')}
                            </div>
                            <button class="btn download-book" data-id="${book.id}" style="
                                background: #2ecc71;
                                color: white;
                                border: none;
                                padding: 8px 15px;
                                border-radius: 4px;
                                cursor: pointer;
                                font-size: 14px;
                            ">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="btn delete-book" data-id="${book.id}" style="
                                background: #e74c3c;
                                color: white;
                                border: none;
                                padding: 8px 15px;
                                border-radius: 4px;
                                cursor: pointer;
                                font-size: 14px;
                                margin-left: 10px;
                                display: ${isAdmin ? 'inline-block' : 'none'}
                            ">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                    
                    <div class="book-modal-body" style="padding: 20px;">
                        <h3 style="color: #2c3e50; margin-top: 0;">Description</h3>
                        <p style="color: #34495e; line-height: 1.6;">${book.description}</p>
                        
                        <div class="book-preview" style="margin-top: 30px; text-align: center;">
                            ${canShowPdfPreview ? `
                            <iframe src="${fileUrl}" style="
                                width: 100%;
                                height: 500px;
                                border: 1px solid #ddd;
                                border-radius: 4px;
                            "></iframe>
                            ` : `
                            <div style="
                                background: #f5f5f5;
                                border-radius: 4px;
                                padding: 30px;
                                border: 1px dashed #bdc3c7;
                            ">
                                <i class="fas fa-file" style="font-size: 48px; color: #bdc3c7;"></i>
                                <p style="color: #7f8c8d; margin-top: 10px;">Preview not available</p>
                                <small style="color: #bdc3c7;">${book.fileType === 'application/pdf' ? 'PDF preview requires a direct file URL' : 'Preview only available for PDF files'}</small>
                            </div>
                            `}
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Fade in
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
            
            // Add event listeners
            const closeModal = () => {
                modal.style.opacity = '0';
                setTimeout(() => {
                    // Revoke the object URL to free memory
                    if (fileUrl) {
                        URL.revokeObjectURL(fileUrl);
                    }
                    modal.remove();
                }, 300);
            };
            
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            
            modal.querySelector('.download-book').addEventListener('click', () => {
                downloadBook(book.id);
            });
            
            modal.querySelector('.delete-book').addEventListener('click', () => {
                closeModal();
                deleteBook(book.id);
            });
            
            // Close when clicking outside content
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }

        // Download book
        function downloadBook(bookId) {
            const book = books.find(b => b.id === bookId);
            if (!book) return;
            
            const file = bookFiles[bookId];
            if (!file) {
                showMessage(`File not found for "${book.title}"`, 'error');
                return;
            }
            
            try {
                const a = document.createElement('a');
                const url = URL.createObjectURL(file);
                a.href = url;
                a.download = book.fileName;
                document.body.appendChild(a);
                a.click();
                
                // Clean up
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
                
                showMessage(`Downloading "${book.title}"...`, 'info');
            } catch (error) {
                console.error('Error downloading file:', error);
                showMessage(`Failed to download "${book.title}"`, 'error');
            }
        }

        // Delete book
        function deleteBook(bookId) {
            if (!isAdmin) {
                showMessage('Admin access required', 'error');
                return;
            }

            if (confirm('Are you sure you want to delete this book?')) {
                // Remove from books array
                books = books.filter(book => book.id !== bookId);
                
                // Remove from bookFiles
                delete bookFiles[bookId];
                
                saveBooks();
                updateBooksDisplay();
                showMessage('Book deleted successfully', 'success');
            }
        }

        // Show message/notification
        function showMessage(message, type = 'info') {
            const messageEl = document.createElement('div');
            messageEl.className = `bookstore-message bookstore-message-${type}`;
            messageEl.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                padding: 12px 20px;
                background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#2ecc71' : '#3498db'};
                color: white;
                border-radius: 4px;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                z-index: 2000;
                opacity: 0;
                transition: opacity 0.3s ease, transform 0.3s ease;
            `;
            messageEl.textContent = message;
            document.body.appendChild(messageEl);
            
            // Animate in
            setTimeout(() => {
                messageEl.style.opacity = '1';
                messageEl.style.transform = 'translateX(-50%) translateY(-10px)';
            }, 10);
            
            // Remove after delay
            setTimeout(() => {
                messageEl.style.opacity = '0';
                messageEl.style.transform = 'translateX(-50%) translateY(10px)';
                setTimeout(() => {
                    messageEl.remove();
                }, 300);
            }, 3000);
        }

        // Helper function to format file size
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        }

        // Helper function to format date
        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }

        // Public API
        return {
            init: init,
            updateAdminFeatures: updateAdminFeatures
        };
    })();

    // Initialize the book store
    BookStore.init();

    // Update book store admin features when admin status changes
    function activateAdminFeatures() {
        // ... existing code ...
        BookStore.updateAdminFeatures();
    }

    function deactivateAdminFeatures() {
        // ... existing code ...
        BookStore.updateAdminFeatures();
    }
});



















