// ============================================
// FORM FIELDS CONFIGURATION
// ============================================

const formFields = {
  state: [
    {
      section: "State Information",
      icon: "fas fa-landmark",
      fields: [
        { name: "stateName", label: "State Name", type: "text", required: true, value: "Tamil Nadu", fullWidth: true },
        { name: "stateCommitteeType", label: "Committee Type", type: "select", required: true, options: ["State Committee", "State Leadership", "State Office"] },
        { name: "stateHeadName", label: "State Head Name", type: "text", required: true, fullWidth: true },
        { name: "stateContactNumber", label: "Contact Number", type: "tel", required: true, pattern: "[0-9]{10}" },
        { name: "stateEmail", label: "Email", type: "email", required: true, fullWidth: true },
        { name: "stateAddress", label: "State Office Address", type: "textarea", required: true, fullWidth: true }
      ]
    }
  ],

  district: [
    {
      section: "District Information",
      icon: "fas fa-map",
      fields: [
        { name: "district", label: "District", type: "select", required: true, options: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur", "Dindigul", "Kanchipuram", "Cuddalore", "Karur", "Tirupur", "Nagapattinam", "Other"] },
        { name: "districtName", label: "District Name", type: "text", required: true, fullWidth: true },
        { name: "districtSecretary", label: "District Secretary", type: "text", required: true, fullWidth: true },
        { name: "districtPresident", label: "District President", type: "text", required: true, fullWidth: true },
        { name: "districtContact1", label: "Contact Number 1", type: "tel", required: true, pattern: "[0-9]{10}" },
        { name: "districtContact2", label: "Contact Number 2", type: "tel", pattern: "[0-9]{10}" },
        { name: "districtEmail", label: "Email", type: "email", required: true, fullWidth: true },
        { name: "districtAddress", label: "District Office Address", type: "textarea", required: true, fullWidth: true },
        { name: "totalBranches", label: "Total Branches", type: "number", required: true },
        { name: "totalMembers", label: "Total Members", type: "number", required: true }
      ]
    }
  ],

  union: [
    {
      section: "Union Information",
      icon: "fas fa-building",
      fields: [
        { name: "unionName", label: "Union Name", type: "text", required: true, fullWidth: true },
        { name: "unionType", label: "Union Type", type: "select", required: true, options: ["Trade Union", "Workers Union", "Employees Union", "Industrial Union", "Other"] },
        { name: "unionPresident", label: "Union President", type: "text", required: true, fullWidth: true },
        { name: "unionSecretary", label: "Union Secretary", type: "text", required: true, fullWidth: true },
        { name: "unionContact", label: "Contact Number", type: "tel", required: true, pattern: "[0-9]{10}" },
        { name: "unionEmail", label: "Email", type: "email", required: true, fullWidth: true },
        { name: "unionAddress", label: "Union Office Address", type: "textarea", required: true, fullWidth: true },
        { name: "totalWorkers", label: "Total Workers", type: "number", required: true },
        { name: "establishedYear", label: "Established Year", type: "number", required: true, min: 1900, max: 2026 }
      ]
    }
  ],

  city: [
    {
      section: "City Information",
      icon: "fas fa-city",
      fields: [
        { name: "cityName", label: "City Name", type: "text", required: true, fullWidth: true },
        { name: "district", label: "District", type: "select", required: true, options: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur", "Dindigul", "Kanchipuram", "Cuddalore", "Karur", "Tirupur", "Nagapattinam", "Other"] },
        { name: "cityPresident", label: "City President", type: "text", required: true, fullWidth: true },
        { name: "citySecretary", label: "City Secretary", type: "text", required: true, fullWidth: true },
        { name: "cityContact", label: "Contact Number", type: "tel", required: true, pattern: "[0-9]{10}" },
        { name: "cityEmail", label: "Email", type: "email", required: true, fullWidth: true },
        { name: "cityAddress", label: "City Office Address", type: "textarea", required: true, fullWidth: true },
        { name: "cityPopulation", label: "City Population", type: "number", required: false },
        { name: "totalWards", label: "Total Wards", type: "number", required: true }
      ]
    }
  ],

  town: [
    {
      section: "Town Information",
      icon: "fas fa-home",
      fields: [
        { name: "townName", label: "Town Name", type: "text", required: true, fullWidth: true },
        { name: "district", label: "District", type: "select", required: true, options: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur", "Dindigul", "Kanchipuram", "Cuddalore", "Karur", "Tirupur", "Nagapattinam", "Other"] },
        { name: "townPanchayat", label: "Town Panchayat", type: "text", required: true, fullWidth: true },
        { name: "townPresident", label: "Town President", type: "text", required: true, fullWidth: true },
        { name: "townContact", label: "Contact Number", type: "tel", required: true, pattern: "[0-9]{10}" },
        { name: "townEmail", label: "Email", type: "email", required: true, fullWidth: true },
        { name: "townAddress", label: "Town Office Address", type: "textarea", required: true, fullWidth: true },
        { name: "totalArea", label: "Total Area (sq.km)", type: "number", required: false },
        { name: "totalStreets", label: "Total Streets", type: "number", required: true }
      ]
    }
  ],

  branch: [
    {
      section: "Branch Information",
      icon: "fas fa-users",
      fields: [
        { name: "branchName", label: "Branch Name", type: "text", required: true, fullWidth: true },
        { name: "branchType", label: "Branch Type", type: "select", required: true, options: ["Local Branch", "Area Branch", "Ward Branch", "Street Branch", "Village Branch"] },
        { name: "district", label: "District", type: "select", required: true, options: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Thanjavur", "Dindigul", "Kanchipuram", "Cuddalore", "Karur", "Tirupur", "Nagapattinam", "Other"] },
        { name: "cityTown", label: "City/Town", type: "text", required: true, fullWidth: true },
        { name: "branchPresident", label: "Branch President", type: "text", required: true, fullWidth: true },
        { name: "branchSecretary", label: "Branch Secretary", type: "text", required: true, fullWidth: true },
        { name: "branchContact", label: "Contact Number", type: "tel", required: true, pattern: "[0-9]{10}" },
        { name: "branchEmail", label: "Email", type: "email", required: true, fullWidth: true },
        { name: "branchAddress", label: "Branch Address", type: "textarea", required: true, fullWidth: true },
        { name: "membershipCount", label: "Membership Count", type: "number", required: true },
        { name: "establishedDate", label: "Established Date", type: "date", required: true },
        { name: "programsConducted", label: "Programs Conducted (Yearly)", type: "number", required: true },
        { name: "eventsOrganized", label: "Events Organized (Yearly)", type: "number", required: true },
        { name: "protestsConducted", label: "Protests Conducted (Yearly)", type: "number", required: true }
      ]
    }
  ]
};

// ============================================
// DOM ELEMENTS
// ============================================

const modal = document.getElementById('registrationModal');
const successModal = document.getElementById('successModal');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const formFieldsContainer = document.getElementById('formFields');
const registrationForm = document.getElementById('registrationForm');
const themeToggle = document.getElementById('themeToggle');
const backBtn = document.querySelector('.back-btn');

// ============================================
// THEME TOGGLE
// ============================================

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// ============================================
// MODAL FUNCTIONS
// ============================================

function openModal(type) {
  const typeNames = {
    state: 'State Registration',
    district: 'District Registration',
    union: 'Union Registration',
    city: 'City Registration',
    town: 'Town Registration',
    branch: 'Branch Registration'
  };

  modalTitle.textContent = typeNames[type];
  modalSubtitle.textContent = `Complete ${typeNames[type].toLowerCase()} form below`;
  
  generateFormFields(type);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  registrationForm.reset();
}

function closeSuccessModal() {
  successModal.classList.remove('active');
  closeModal();
}

// Close modal on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// ============================================
// BACK BUTTON
// ============================================

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = 'index.html';
  }
}

// ============================================
// GENERATE FORM FIELDS
// ============================================

function generateFormFields(type) {
  const fields = formFields[type];
  if (!fields) return;

  let html = '';

  fields.forEach((section, sectionIndex) => {
    html += `
      <div class="form-section">
        <h3 class="form-section-title">
          <i class="fas ${section.icon}"></i> ${section.section}
        </h3>
        <div class="form-grid">
    `;

    section.fields.forEach((field, fieldIndex) => {
      const fieldId = `${field.name}_${sectionIndex}_${fieldIndex}`;
      let inputHtml = '';

      if (field.type === 'select') {
        inputHtml = `<select id="${fieldId}" name="${field.name}" ${field.required ? 'required' : ''}>
          <option value="">Select ${field.label}</option>`;
        
        if (field.options) {
          field.options.forEach(opt => {
            inputHtml += `<option value="${opt}">${opt}</option>`;
          });
        }

        inputHtml += `</select>`;
      } else if (field.type === 'textarea') {
        inputHtml = `<textarea id="${fieldId}" name="${field.name}" rows="4" ${field.required ? 'required' : ''} placeholder="Enter ${field.label.toLowerCase()}"></textarea>`;
      } else {
        const minAttr = field.min ? `min="${field.min}"` : '';
        const maxAttr = field.max ? `max="${field.max}"` : '';
        inputHtml = `<input id="${fieldId}" type="${field.type}" name="${field.name}" ${field.required ? 'required' : ''} ${minAttr} ${maxAttr} placeholder="Enter ${field.label.toLowerCase()}">`;
      }

      html += `
        <div class="form-group ${field.fullWidth ? 'full-width' : ''}">
          <label for="${fieldId}">
            ${field.label} ${field.required ? '<span style="color:var(--accent-red)">*</span>' : ''}
          </label>
          ${inputHtml}
        </div>
      `;
    });

    html += `</div></div>`;
  });

  formFieldsContainer.innerHTML = html;
  attachValidationListeners();
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

function validateField(field, value) {
  if (field.required && !value.trim()) {
    return `${field.label} is required.`;
  }

  if (!value.trim()) return '';

  // Phone validation
  if (field.type === 'tel') {
    const phone = value.replace(/D/g, '');
    if (phone.length < 10 || phone.length > 15) {
      return 'Enter a valid phone number (10-15 digits).';
    }
  }

  // Email validation
  if (field.type === 'email') {
    const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Enter a valid email address.';
    }
  }

  // Number validation
  if (field.type === 'number' || field.type === 'date') {
    if (field.min && Number(value) < field.min) {
      return `${field.label} must be at least ${field.min}.`;
    }
    if (field.max && Number(value) > field.max) {
      return `${field.label} must be at most ${field.max}.`;
    }
  }

  return '';
}

function applyValidationToField(input) {
  const fieldName = input.name;
  const value = input.value;
  
  // Find field config
  let fieldConfig = null;
  for (const type in formFields) {
    const sections = formFields[type];
    for (const section of sections) {
      const found = section.fields.find(f => f.name === fieldName);
      if (found) {
        fieldConfig = found;
        break;
      }
    }
    if (fieldConfig) break;
  }

  if (!fieldConfig) return;

  const message = validateField(fieldConfig, value);
  input.setCustomValidity(message);
  
  // Visual feedback
  if (message) {
    input.style.borderColor = 'var(--accent-red)';
    input.style.boxShadow = '0 0 0 4px rgba(220, 38, 38, 0.15)';
  } else {
    input.style.borderColor = '';
    input.style.boxShadow = '';
  }
}

function attachValidationListeners() {
  const inputs = registrationForm.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    input.addEventListener('input', () => applyValidationToField(input));
    input.addEventListener('change', () => applyValidationToField(input));
    input.addEventListener('blur', () => applyValidationToField(input));
  });
}

function validateFormBeforeSubmit() {
  const inputs = registrationForm.querySelectorAll('input, select, textarea');
  let firstInvalid = null;

  inputs.forEach(input => {
    applyValidationToField(input);
    if (!input.checkValidity() && !firstInvalid) {
      firstInvalid = input;
    }
  });

  if (firstInvalid) {
    firstInvalid.reportValidity();
    firstInvalid.focus();
    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }

  return true;
}

// ============================================
// FIREBASE INTEGRATION
// ============================================

async function saveToFirebase(data) {
  try {
    // Check if Firebase is initialized
    if (typeof db === 'undefined') {
      console.error('Firebase not initialized. Please check firebase-config.js');
      throw new Error('Firebase not initialized');
    }

    const { collection, addDoc, serverTimestamp } = db;
    
    const registrationsRef = collection(db, 'registrations');
    
    await addDoc(registrationsRef, {
      ...data,
      createdAt: serverTimestamp()
    });

    console.log('Registration saved successfully:', data);
    return true;
  } catch (error) {
    console.error('Error saving to Firebase:', error);
    throw error;
  }
}

// ============================================
// FORM SUBMISSION
// ============================================

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Show loading state
  const submitBtn = registrationForm.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Submitting...</span>';

  try {
    if (!validateFormBeforeSubmit()) {
      throw new Error('Validation failed');
    }

    const formData = new FormData(registrationForm);
    const data = Object.fromEntries(formData.entries());

    // Add metadata
    data.timestamp = new Date().toISOString();
    data.registrationType = modalTitle.textContent.trim();
    data.submittedAt = Date.now();

    // Save to Firebase
    await saveToFirebase(data);

    // Show success
    successModal.classList.add('active');
    
    // Reset form
    registrationForm.reset();
  } catch (error) {
    console.error('Submission error:', error);
    alert('Error saving registration. Please check your internet connection and try again.');
  } finally {
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
  }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Registration page loaded successfully');
  
  // Check Firebase initialization
  setTimeout(() => {
    if (typeof db === 'undefined') {
      console.warn('Firebase not initialized. Please ensure firebase-config.js is loaded first.');
    } else {
      console.log('Firebase initialized successfully');
    }
  }, 100);
});
