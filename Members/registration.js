// Form fields configuration for each registration type
const formFields = {
  state: [
    {
      section: 'Basic Information',
      icon: 'fa-user',
      fields: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true },
        { name: 'fatherName', label: 'Father\\'s Name', type: 'text', required: true },
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'email', label: 'Email', type: 'email', required: false },
        { name: 'district', label: 'District', type: 'text', required: true },
        { name: 'state', label: 'State', type: 'text', value: 'Tamil Nadu', required: true }
      ]
    },
    {
      section: 'Organization Details',
      icon: 'fa-building',
      fields: [
        { name: 'position', label: 'Position', type: 'text', required: true },
        { name: 'experience', label: 'Years of Experience', type: 'number', required: false }
      ]
    }
  ],

  district: [
    {
      section: 'Basic Information',
      icon: 'fa-user',
      fields: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true },
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'email', label: 'Email', type: 'email', required: false }
      ]
    },
    {
      section: 'Location Details',
      icon: 'fa-map',
      fields: [
        { name: 'state', label: 'State', type: 'text', value: 'Tamil Nadu', required: true },
        { name: 'district', label: 'District', type: 'text', required: true },
        { name: 'union', label: 'Union', type: 'select', required: true }
      ]
    }
  ],

  union: [
    {
      section: 'Basic Information',
      icon: 'fa-user',
      fields: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true },
        { name: 'age', label: 'Age', type: 'number', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'email', label: 'Email', type: 'email', required: false }
      ]
    },
    {
      section: 'Location Details',
      icon: 'fa-map',
      fields: [
        { name: 'state', label: 'State', type: 'text', value: 'Tamil Nadu', required: true },
        { name: 'district', label: 'District', type: 'select', required: true },
        { name: 'unionName', label: 'Union Name', type: 'text', required: true }
      ]
    },
    {
      section: 'Branch Information',
      icon: 'fa-users',
      fields: [
        { name: 'totalBranches', label: 'Total Branches', type: 'number', required: true },
        { name: 'totalMembers', label: 'Total Members', type: 'number', required: true },
        { name: 'programsConducted', label: 'Programs Conducted', type: 'number', required: true },
        { name: 'eventsOrganized', label: 'Events Organized', type: 'number', required: true },
        { name: 'protestsConducted', label: 'Protests Conducted', type: 'number', required: true }
      ]
    }
  ],

  city: [
    {
      section: 'Basic Information',
      icon: 'fa-user',
      fields: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'email', label: 'Email', type: 'email', required: false }
      ]
    },
    {
      section: 'Location Details',
      icon: 'fa-city',
      fields: [
        { name: 'state', label: 'State', type: 'text', value: 'Tamil Nadu', required: true },
        { name: 'district', label: 'District', type: 'select', required: true },
        { name: 'city', label: 'City Name', type: 'text', required: true }
      ]
    }
  ],

  town: [
    {
      section: 'Basic Information',
      icon: 'fa-user',
      fields: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: true }
      ]
    },
    {
      section: 'Location Details',
      icon: 'fa-home',
      fields: [
        { name: 'state', label: 'State', type: 'text', value: 'Tamil Nadu', required: true },
        { name: 'district', label: 'District', type: 'select', required: true },
        { name: 'union', label: 'Union', type: 'select', required: true },
        { name: 'town', label: 'Town Name', type: 'text', required: true }
      ]
    }
  ],

  branch: [
    {
      section: 'Branch Information',
      icon: 'fa-users',
      fields: [
        { name: 'branchName', label: 'Branch Name', type: 'text', required: true },
        { name: 'state', label: 'State', type: 'text', value: 'Tamil Nadu', required: true },
        { name: 'district', label: 'District', type: 'select', required: true },
        { name: 'union', label: 'Union', type: 'select', required: true },
        { name: 'town', label: 'Town', type: 'select', required: true }
      ]
    },
    {
      section: 'Member Details',
      icon: 'fa-id-card',
      fields: [
        { name: 'totalMembers', label: 'Total Members Count', type: 'number', required: true },
        { name: 'secretaryName', label: 'Branch Secretary Name', type: 'text', required: true },
        { name: 'presidentName', label: 'President Name', type: 'text', required: true },
        { name: 'contact1', label: 'Contact Number 1', type: 'tel', required: true },
        { name: 'contact2', label: 'Contact Number 2', type: 'tel', required: false }
      ]
    },
    {
      section: 'Activity Details',
      icon: 'fa-calendar-check',
      fields: [
        { name: 'programsConducted', label: 'How many programs conducted?', type: 'number', required: true },
        { name: 'eventsOrganized', label: 'How many events organized?', type: 'number', required: true },
        { name: 'membershipCount', label: 'Branch membership count', type: 'number', required: true },
        { name: 'protestsConducted', label: 'How many protests conducted?', type: 'number', required: true }
      ]
    }
  ]
};

// Sample data (Replace with Firebase fetch)
const sampleData = {
  districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'],
  unions: {
    'Chennai': ['Anna Nagar', 'T. Nagar', 'Adyar', 'Velachery'],
    'Coimbatore': ['Gandhipuram', 'RS Puram', 'Saibaba Colony'],
    'Madurai': ['Anna Nagar', 'KK Nagar', 'Goripalayam']
  },
  towns: {
    'Chennai': ['Tambaram', 'Chromepet', 'Pallavaram'],
    'Coimbatore': ['Vadavalli', 'Kuniyamuthur'],
    'Madurai': ['Thallakulam', 'Othakkadai']
  }
};

// Modal elements
const modal = document.getElementById('registrationModal');
const successModal = document.getElementById('successModal');
const formFieldsContainer = document.getElementById('formFields');
const registrationForm = document.getElementById('registrationForm');

// Open modal with specific type
function openModal(type) {
  const title = document.getElementById('modalTitle');
  const subtitle = document.getElementById('modalSubtitle');
  
  title.innerHTML = `<i class="fas fa-file-signature"></i> ${type.charAt(0).toUpperCase() + type.slice(1)} Registration`;
  subtitle.textContent = 'Fill in all the required details';
  
  generateFormFields(type);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  registrationForm.reset();
}

// Close success modal
function closeSuccessModal() {
  successModal.classList.remove('active');
  closeModal();
}

// Generate form fields dynamically
function generateFormFields(type) {
  const fields = formFields[type];
  if (!fields) return;
  
  let html = '';
  
  fields.forEach(section => {
    html += `
      <div class="form-section">
        <h3 class="form-section-title">
          <i class="fas ${section.icon}"></i>
          ${section.section}
        </h3>
        <div class="form-grid">
    `;
    
    section.fields.forEach(field => {
      let inputHtml = '';
      
      if (field.type === 'select') {
        inputHtml = `<select name="${field.name}" ${field.required ? 'required' : ''}>`;
        inputHtml += `<option value="">Select ${field.label}</option>`;
        
        // Populate options based on field
        if (field.name === 'district') {
          sampleData.districts.forEach(d => {
            inputHtml += `<option value="${d}">${d}</option>`;
          });
        } else if (field.name === 'union') {
          inputHtml += `<!-- Will be populated based on district -->`;
        } else if (field.name === 'town') {
          inputHtml += `<!-- Will be populated based on district -->`;
        } else if (field.options) {
          field.options.forEach(opt => {
            inputHtml += `<option value="${opt}">${opt}</option>`;
          });
        }
        
        inputHtml += `</select>`;
      } else if (field.type === 'textarea') {
        inputHtml = `<textarea name="${field.name}" rows="4" ${field.required ? 'required' : ''} placeholder="Enter ${field.label.toLowerCase()}"></textarea>`;
      } else {
        inputHtml = `<input type="${field.type}" name="${field.name}" ${field.required ? 'required' : ''} ${field.value ? `value="${field.value}"` : ''} placeholder="Enter ${field.label.toLowerCase()}">`;
      }
      
      html += `
        <div class="form-group ${field.fullWidth ? 'full-width' : ''}">
          <label>${field.label} ${field.required ? '<span style="color:var(--accent-red)">*</span>' : ''}</label>
          ${inputHtml}
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  formFieldsContainer.innerHTML = html;
  
  // Add event listeners for dependent dropdowns
  setupDependentDropdowns();
}

// Setup dependent dropdowns (District -> Union -> Town)
function setupDependentDropdowns() {
  const districtSelect = registrationForm.querySelector('select[name="district"]');
  const unionSelect = registrationForm.querySelector('select[name="union"]');
  const townSelect = registrationForm.querySelector('select[name="town"]');
  
  if (districtSelect) {
    districtSelect.addEventListener('change', () => {
      const selectedDistrict = districtSelect.value;
      
      if (unionSelect && sampleData.unions[selectedDistrict]) {
        unionSelect.innerHTML = '<option value="">Select Union</option>';
        sampleData.unions[selectedDistrict].forEach(union => {
          unionSelect.innerHTML += `<option value="${union}">${union}</option>`;
        });
        unionSelect.disabled = false;
      }
      
      if (townSelect && sampleData.towns[selectedDistrict]) {
        townSelect.innerHTML = '<option value="">Select Town</option>';
        sampleData.towns[selectedDistrict].forEach(town => {
          townSelect.innerHTML += `<option value="${town}">${town}</option>`;
        });
        townSelect.disabled = false;
      }
    });
  }
}

// Form submission
registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(registrationForm);
  const data = Object.fromEntries(formData.entries());
  
  // Add timestamp
  data.timestamp = new Date().toISOString();
  data.registrationType = document.getElementById('modalTitle').textContent.trim();
  
  try {
    // Save to Firebase
    await saveToFirebase(data);
    
    // Show success modal
    successModal.classList.add('active');
    
    console.log('Registration saved:', data);
  } catch (error) {
    console.error('Error saving registration:', error);
    alert('Error saving registration. Please try again.');
  }
});

// Firebase save function
async function saveToFirebase(data) {
  // Import Firebase from your config file
  const { db, collection, addDoc } = await import('./firebase-config.js');
  
  try {
    const registrationType = data.registrationType.toLowerCase().split(' ')[0];
    const docRef = await addDoc(collection(db, 'registrations', registrationType), data);
    console.log('Document written with ID: ', docRef.id);
    return docRef;
  } catch (error) {
    console.error('Error adding document: ', error);
    throw error;
  }
}

// Close modal on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});