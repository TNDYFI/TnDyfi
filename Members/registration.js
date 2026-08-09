/* =====================================================
   DYFI REGISTRATION SYSTEM
   Firebase Independent Version
===================================================== */

"use strict";


/* =====================================================
   DATA
===================================================== */

const STATES = [
  "Tamil Nadu"
];

const DISTRICTS = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kancheepuram",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Kanniyakumari",
  "Namakkal",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvarur",
  "Tiruvannamalai",
  "The Nilgiris",
  "Vellore",
  "Viluppuram",
  "Virudhunagar"
];

const LOCAL_BODIES = [
  "ஒன்றியம்",
  "நகராட்சி",
  "வட்டக்குழு"
];

const BLOOD_GROUPS = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"
];

const QUALIFICATIONS = [
  "Below 10th",
  "10th",
  "12th",
  "ITI",
  "Diploma",
  "UG",
  "PG",
  "M.Phil",
  "Ph.D",
  "Other"
];


/* =====================================================
   DOM
===================================================== */

const modal =
  document.getElementById("registrationModal");

const successModal =
  document.getElementById("successModal");

const detailsModal =
  document.getElementById("detailsModal");

const form =
  document.getElementById("registrationForm");

const formPages =
  document.getElementById("formPages");

const modalTitle =
  document.getElementById("modalTitle");

const modalSubtitle =
  document.getElementById("modalSubtitle");

const modalIcon =
  document.getElementById("modalIcon");

const modalTypeBadge =
  document.getElementById("modalTypeBadge");

const progressBar =
  document.getElementById("progressBar");

const progressLabel =
  document.getElementById("progressLabel");

const progressPercent =
  document.getElementById("progressPercent");

const prevBtn =
  document.getElementById("prevBtn");

const nextBtn =
  document.getElementById("nextBtn");

const successRegistrationId =
  document.getElementById("successRegistrationId");

const detailsBody =
  document.getElementById("detailsBody");

const detailsTitle =
  document.getElementById("detailsTitle");


/* =====================================================
   STATE
===================================================== */

let currentType = null;

let currentStep = 0;

let pages = [];

let lastSubmittedData = null;

let signatureCanvas = null;

let signatureContext = null;

let drawing = false;

let signatureHasData = false;


/* =====================================================
   HELPERS
===================================================== */

function escapeHTML(value) {

  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function createId(prefix = "DYFI") {

  const now = new Date();

  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const random =
    Math.floor(
      1000 +
      Math.random() * 9000
    );

  return `${prefix}-${date}-${random}`;
}


function todayValue() {

  const d = new Date();

  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0")
  ].join("-");
}


function getOptions(array, placeholder) {

  return `
    <option value="">
      ${placeholder}
    </option>

    ${array.map(item => `
      <option value="${escapeHTML(item)}">
        ${escapeHTML(item)}
      </option>
    `).join("")}
  `;
}


function field(
  name,
  label,
  type = "text",
  options = {}
) {

  const {
    required = false,
    full = false,
    placeholder = "",
    value = "",
    min = "",
    max = "",
    step = "",
    extra = ""
  } = options;

  const requiredMark =
    required
      ? `<span>*</span>`
      : "";

  let input = "";

  if (type === "select") {

    input = `
      <select
        id="${name}"
        name="${name}"
        ${required ? "required" : ""}
        ${extra}
      >
        ${options.options || ""}
      </select>
    `;

  } else if (type === "textarea") {

    input = `
      <textarea
        id="${name}"
        name="${name}"
        placeholder="${placeholder}"
        ${required ? "required" : ""}
        ${extra}
      >${escapeHTML(value)}</textarea>
    `;

  } else {

    input = `
      <input
        id="${name}"
        name="${name}"
        type="${type}"
        value="${escapeHTML(value)}"
        placeholder="${placeholder}"
        ${required ? "required" : ""}
        ${min !== "" ? `min="${min}"` : ""}
        ${max !== "" ? `max="${max}"` : ""}
        ${step !== "" ? `step="${step}"` : ""}
        ${extra}
      >
    `;
  }

  return `
    <div class="form-group ${full ? "full-width" : ""}">

      <label for="${name}">
        ${label} ${requiredMark}
      </label>

      ${input}

    </div>
  `;
}


/* =====================================================
   FORM OPEN
===================================================== */

function openRegistration(type) {

  currentType = type;

  currentStep = 0;

  lastSubmittedData = null;

  if (type === "member") {

    modalTitle.textContent =
      "Member Registration";

    modalSubtitle.textContent =
      "உறுப்பினர் முழு விவரங்களை பதிவு செய்யுங்கள்";

    modalTypeBadge.textContent =
      "MEMBER REGISTRATION";

    modalIcon.className =
      "fas fa-user-plus";

  } else {

    modalTitle.textContent =
      "Branch Registration";

    modalSubtitle.textContent =
      "கிளையின் முழு விவரங்களை பதிவு செய்யுங்கள்";

    modalTypeBadge.textContent =
      "BRANCH REGISTRATION";

    modalIcon.className =
      "fas fa-users-gear";
  }

  buildForm(type);

  modal.classList.add("active");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

  updateStep();

  setTimeout(() => {

    if (currentType === "member") {
      setupSignature();
    }

  }, 100);
}


/* =====================================================
   CLOSE
===================================================== */

function closeRegistration() {

  modal.classList.remove("active");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

  form.reset();

  formPages.innerHTML = "";

  pages = [];

  currentStep = 0;

  signatureCanvas = null;

  signatureContext = null;
}


/* =====================================================
   BUILD MEMBER FORM
===================================================== */

function buildMemberForm() {

  formPages.innerHTML = `

    <!-- STEP 1 -->

    <div class="form-page">

      <div class="form-section">

        <h3 class="form-section-title">
          <i class="fas fa-sitemap"></i>
          Organizational Details
        </h3>

        <div class="form-grid">

          ${field(
            "state",
            "State",
            "select",
            {
              required: true,
              full: true,
              options: getOptions(
                STATES,
                "Select State"
              )
            }
          )}

          ${field(
            "district",
            "District",
            "select",
            {
              required: true,
              options: getOptions(
                DISTRICTS,
                "Select District"
              )
            }
          )}

          ${field(
            "localBodyType",
            "Union / Municipality / Vatta Kuzhu",
            "select",
            {
              required: true,
              options: getOptions(
                LOCAL_BODIES,
                "Select Organizational Level"
              )
            }
          )}

          ${field(
            "localBodyName",
            "Union / Municipality / Vatta Kuzhu Name",
            "text",
            {
              required: true,
              full: true,
              placeholder:
                "Enter organization name"
            }
          )}

          ${field(
            "branchName",
            "Branch Name",
            "text",
            {
              required: true,
              full: true,
              placeholder:
                "Enter branch name"
            }
          )}

        </div>

      </div>

    </div>


    <!-- STEP 2 -->

    <div class="form-page">

      <div class="form-section">

        <h3 class="form-section-title">
          <i class="fas fa-user"></i>
          Personal Details
        </h3>

        <div class="form-grid">

          ${field(
            "memberName",
            "Full Name",
            "text",
            {
              required: true,
              full: true,
              placeholder:
                "Enter full name"
            }
          )}

          ${field(
            "fatherMotherName",
            "Father / Mother / Guardian Name",
            "text",
            {
              required: true,
              full: true,
              placeholder:
                "Enter parent / guardian name"
            }
          )}

          ${field(
            "gender",
            "Gender",
            "select",
            {
              required: true,
              options: `
                <option value="">
                  Select Gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              `
            }
          )}

          ${field(
            "dateOfBirth",
            "Date of Birth",
            "date",
            {
              required: true
            }
          )}

          ${field(
            "bloodGroup",
            "Blood Group",
            "select",
            {
              required: true,
              options: getOptions(
                BLOOD_GROUPS,
                "Select Blood Group"
              )
            }
          )}

          ${field(
            "qualification",
            "Qualification",
            "select",
            {
              required: true,
              options: getOptions(
                QUALIFICATIONS,
                "Select Qualification"
              )
            }
          )}

          ${field(
            "occupation",
            "Occupation",
            "text",
            {
              required: true,
              placeholder:
                "Enter occupation"
            }
          )}

          ${field(
            "mobile",
            "Mobile Number",
            "tel",
            {
              required: true,
              placeholder:
                "10 digit mobile number",
              extra:
                `maxlength="10" inputmode="numeric"`
            }
          )}

          ${field(
            "whatsapp",
            "WhatsApp Number",
            "tel",
            {
              placeholder:
                "WhatsApp number",
              extra:
                `maxlength="10" inputmode="numeric"`
            }
          )}

          ${field(
            "email",
            "Email",
            "email",
            {
              full: true,
              placeholder:
                "example@email.com"
            }
          )}

          ${field(
            "address",
            "Full Address",
            "textarea",
            {
              required: true,
              full: true,
              placeholder:
                "Enter complete address"
            }
          )}

        </div>

      </div>

    </div>


    <!-- STEP 3 -->

    <div class="form-page">

      <div class="form-section">

        <h3 class="form-section-title">
          <i class="fas fa-camera"></i>
          Photo & Additional Details
        </h3>

        <div class="form-grid">

          <div class="form-group full-width">

            <label>
              MEMBER PHOTO
            </label>

            <div class="photo-upload">

              <div
                id="photoPreview"
                class="photo-preview">

                <i class="fas fa-user"></i>

              </div>

              <div>

                <label
                  for="memberPhoto"
                  class="upload-label">

                  <i class="fas fa-upload"></i>
                  Choose Photo

                </label>

                <input
                  id="memberPhoto"
                  name="memberPhoto"
                  type="file"
                  accept="image/*"
                  hidden
                >

                <div class="form-help">
                  JPG / PNG recommended
                </div>

              </div>

            </div>

          </div>


          ${field(
            "registrationDate",
            "Registration Date",
            "date",
            {
              required: true,
              value: todayValue()
            }
          )}

          ${field(
            "membershipNumber",
            "Membership Number",
            "text",
            {
              placeholder:
                "Optional membership number"
            }
          )}

          ${field(
            "skills",
            "Special Skills",
            "text",
            {
              full: true,
              placeholder:
                "Example: Media, Design, IT, Sports..."
            }
          )}

          ${field(
            "remarks",
            "Additional Information",
            "textarea",
            {
              full: true,
              placeholder:
                "Any additional information"
            }
          )}

        </div>

      </div>

    </div>


    <!-- STEP 4 -->

    <div class="form-page">

      <div class="form-section">

        <h3 class="form-section-title">
          <i class="fas fa-signature"></i>
          Digital Signature
        </h3>

        <div class="form-grid">

          <div class="form-group full-width">

            <label>
              MEMBER SIGNATURE <span>*</span>
            </label>

            <div class="signature-wrapper">

              <canvas
                id="signatureCanvas"
                class="signature-canvas">
              </canvas>

              <div class="signature-tools">

                <span>
                  Sign inside the box
                </span>

                <button
                  type="button"
                  id="clearSignature"
                  class="clear-signature">

                  <i class="fas fa-eraser"></i>
                  Clear

                </button>

              </div>

            </div>

          </div>


          <div class="form-group full-width">

            <label>
              DECLARATION
            </label>

            <label
              style="
                flex-direction:row;
                align-items:flex-start;
                text-transform:none;
                letter-spacing:0;
                color:#aaa;
                font-size:11px;
              ">

              <input
                id="memberDeclaration"
                type="checkbox"
                style="
                  width:18px;
                  min-height:18px;
                  margin-top:2px;
                "
                required
              >

              <span style="color:#aaa;">
                நான் வழங்கியுள்ள விவரங்கள்
                எனது அறிவிற்கு எட்டியவரை சரியானவை
                என்பதை உறுதி செய்கிறேன்.
              </span>

            </label>

          </div>

        </div>

      </div>

    </div>

  `;

  pages =
    Array.from(
      formPages.querySelectorAll(".form-page")
    );

  setupPhotoUpload();

  setupSignature();
}


/* =====================================================
   BUILD BRANCH FORM
===================================================== */

function buildBranchForm() {

  formPages.innerHTML = `

    <!-- STEP 1 -->

    <div class="form-page">

      <div class="form-section">

        <h3 class="form-section-title">
          <i class="fas fa-sitemap"></i>
          Branch Location
        </h3>

        <div class="form-grid">

          ${field(
            "branchState",
            "State",
            "select",
            {
              required: true,
              full: true,
              options: getOptions(
                STATES,
                "Select State"
              ),
              value: "Tamil Nadu"
            }
          )}

          ${field(
            "branchDistrict",
            "District",
            "select",
            {
              required: true,
              options: getOptions(
                DISTRICTS,
                "Select District"
              )
            }
          )}

          ${field(
            "branchUnion",
            "Union / ஒன்றியம்",
            "text",
            {
              required: true,
              placeholder:
                "Enter union / ஒன்றியம்"
            }
          )}

          ${field(
            "branchLocalBody",
            "நகராட்சி / வட்டக்குழு",
            "text",
            {
              required: true,
              placeholder:
                "Enter நகராட்சி / வட்டக்குழு"
            }
          )}

          ${field(
            "organizationBranchName",
            "Branch Name",
            "text",
            {
              required: true,
              full: true,
              placeholder:
                "Enter branch name"
            }
          )}

          ${field(
            "branchRegistrationDate",
            "Registration Date",
            "date",
            {
              required: true,
              value: todayValue()
            }
          )}

          ${field(
            "establishedDate",
            "Branch Established Date",
            "date"
          )}

        </div>

      </div>

    </div>


    <!-- STEP 2 -->

    <div class="form-page">

      <div class="form-section">

        <h3 class="form-section-title">
          <i class="fas fa-users"></i>
          Branch Strength
        </h3>

        <div class="form-grid">

          ${field(
            "memberCount",
            "Total Branch Members",
            "number",
            {
              required: true,
              min: 0,
              placeholder:
                "Enter member count"
            }
          )}

          ${field(
            "activeMemberCount",
            "Active Members",
            "number",
            {
              min: 0,
              placeholder:
                "Enter active member count"
            }
          )}

          ${field(
            "womenMemberCount",
            "Women Members",
            "number",
            {
              min: 0,
              placeholder:
                "Enter count"
            }
          )}

          ${field(
            "youthMemberCount",
            "Youth Members",
            "number",
            {
              min: 0,
              placeholder:
                "Enter count"
            }
          )}

        </div>

      </div>

    </div>


    <!-- STEP 3 -->

    <div class="form-page">

      <div class="form-section">

        <h3 class="form-section-title">
          <i class="fas fa-user-tie"></i>
          Branch Leadership
        </h3>

        <div class="form-grid">

          ${field(
            "presidentName",
            "President Name",
            "text",
            {
              required: true,
              full: true,
              placeholder:
                "Enter president name"
            }
          )}

          ${field(
            "presidentContact",
            "President Contact",
            "tel",
            {
              required: true,
              placeholder:
                "10 digit mobile number",
              extra:
                `maxlength="10" inputmode="numeric"`
            }
          )}

          ${field(
            "secretaryName",
            "Secretary Name",
            "text",
            {
              required: true,
              full: true,
              placeholder:
                "Enter secretary name"
            }
          )}

          ${field(
            "secretaryContact",
            "Secretary Contact",
            "tel",
            {
              required: true,
              placeholder:
                "10 digit mobile number",
              extra:
                `maxlength="10" inputmode="numeric"`
            }
          )}

          ${field(
            "branchContact",
            "Branch Contact Number",
            "tel",
            {
              placeholder:
                "Branch contact number",
              extra:
                `maxlength="10" inputmode="numeric"`
            }
          )}

          ${field(
            "branchEmail",
            "Branch Email",
            "email",
            {
              placeholder:
                "Branch email"
            }
          )}

          ${field(
            "branchAddress",
            "Branch Address",
            "textarea",
            {
              required: true,
              full: true,
              placeholder:
                "Enter complete branch address"
            }
          )}

        </div>

      </div>

    </div>


    <!-- STEP 4 -->

    <div class="form-page">

      <div class="form-section">

        <h3 class="form-section-title">
          <i class="fas fa-file-circle-check"></i>
          Final Confirmation
        </h3>

        <div class="form-grid">

          ${field(
            "branchActivities",
            "Major Activities",
            "textarea",
            {
              full: true,
              placeholder:
                "Enter major activities conducted by branch"
            }
          )}

          ${field(
            "branchRemarks",
            "Additional Remarks",
            "textarea",
            {
              full: true,
              placeholder:
                "Any additional information"
            }
          )}

          <div class="form-group full-width">

            <label
              style="
                flex-direction:row;
                align-items:flex-start;
                text-transform:none;
                letter-spacing:0;
                color:#aaa;
                font-size:11px;
              ">

              <input
                id="branchDeclaration"
                type="checkbox"
                style="
                  width:18px;
                  min-height:18px;
                  margin-top:2px;
                "
                required
              >

              <span style="color:#aaa;">
                கிளை சார்பாக வழங்கப்பட்ட தகவல்கள்
                சரியானவை என்பதை உறுதி செய்கிறேன்.
              </span>

            </label>

          </div>

        </div>

      </div>

    </div>

  `;

  pages =
    Array.from(
      formPages.querySelectorAll(".form-page")
    );
}


/* =====================================================
   BUILD FORM
===================================================== */

function buildForm(type) {

  if (type === "member") {
    buildMemberForm();
  } else {
    buildBranchForm();
  }

  bindDynamicEvents();
}


/* =====================================================
   DYNAMIC EVENTS
===================================================== */

function bindDynamicEvents() {

  const district =
    document.getElementById("branchDistrict");

  if (district) {

    district.addEventListener(
      "change",
      () => {}
    );

  }


  const memberPhoto =
    document.getElementById("memberPhoto");

  if (memberPhoto) {

    memberPhoto.addEventListener(
      "change",
      previewPhoto
    );

  }


  const clearSignature =
    document.getElementById("clearSignature");

  if (clearSignature) {

    clearSignature.addEventListener(
      "click",
      clearSignaturePad
    );

  }
}


/* =====================================================
   PHOTO
===================================================== */

function setupPhotoUpload() {

  const input =
    document.getElementById("memberPhoto");

  if (!input) return;

  input.addEventListener(
    "change",
    previewPhoto
  );
}


function previewPhoto(event) {

  const file =
    event.target.files &&
    event.target.files[0];

  const preview =
    document.getElementById("photoPreview");

  if (!file || !preview) return;

  if (!file.type.startsWith("image/")) {

    alert("Please select an image file.");

    event.target.value = "";

    return;
  }

  const reader =
    new FileReader();

  reader.onload = function(e) {

    preview.innerHTML =
      `<img src="${e.target.result}" alt="Member Photo">`;

  };

  reader.readAsDataURL(file);
}


/* =====================================================
   SIGNATURE
===================================================== */

function setupSignature() {

  const canvas =
    document.getElementById(
      "signatureCanvas"
    );

  if (!canvas) return;

  signatureCanvas = canvas;

  const ratio =
    Math.max(
      window.devicePixelRatio || 1,
      1
    );

  const rect =
    canvas.getBoundingClientRect();

  canvas.width =
    rect.width * ratio;

  canvas.height =
    rect.height * ratio;

  signatureContext =
    canvas.getContext("2d");

  signatureContext.scale(
    ratio,
    ratio
  );

  signatureContext.strokeStyle =
    "#111";

  signatureContext.lineWidth =
    2.2;

  signatureContext.lineCap =
    "round";

  signatureContext.lineJoin =
    "round";


  canvas.addEventListener(
    "pointerdown",
    startDrawing
  );

  canvas.addEventListener(
    "pointermove",
    drawSignature
  );

  canvas.addEventListener(
    "pointerup",
    stopDrawing
  );

  canvas.addEventListener(
    "pointerleave",
    stopDrawing
  );
}


function getPointerPosition(e) {

  const rect =
    signatureCanvas.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}


function startDrawing(e) {

  drawing = true;

  signatureHasData = true;

  const pos =
    getPointerPosition(e);

  signatureContext.beginPath();

  signatureContext.moveTo(
    pos.x,
    pos.y
  );
}


function drawSignature(e) {

  if (!drawing) return;

  const pos =
    getPointerPosition(e);

  signatureContext.lineTo(
    pos.x,
    pos.y
  );

  signatureContext.stroke();
}


function stopDrawing() {

  drawing = false;
}


function clearSignaturePad() {

  if (
    !signatureCanvas ||
    !signatureContext
  ) return;

  const rect =
    signatureCanvas.getBoundingClientRect();

  signatureContext.clearRect(
    0,
    0,
    rect.width,
    rect.height
  );

  signatureHasData = false;
}


/* =====================================================
   STEP NAVIGATION
===================================================== */

function updateStep() {

  if (!pages.length) return;

  pages.forEach(
    (page, index) => {

      page.classList.toggle(
        "active",
        index === currentStep
      );

    }
  );

  const total =
    pages.length;

  const percent =
    Math.round(
      ((currentStep + 1) / total) * 100
    );

  progressBar.style.width =
    `${percent}%`;

  progressLabel.textContent =
    `Step ${currentStep + 1} of ${total}`;

  progressPercent.textContent =
    `${percent}%`;

  prevBtn.style.visibility =
    currentStep === 0
      ? "hidden"
      : "visible";

  if (currentStep === total - 1) {

    nextBtn.innerHTML = `
      <i class="fas fa-paper-plane"></i>
      <span>Submit Registration</span>
    `;

  } else {

    nextBtn.innerHTML = `
      <span>Next</span>
      <i class="fas fa-arrow-right"></i>
    `;
  }

  const container =
    document.getElementById("formPages");

  if (container) {
    container.scrollTop = 0;
  }

  if (
    currentType === "member" &&
    currentStep === 3
  ) {

    setTimeout(
      setupSignature,
      50
    );
  }
}


/* =====================================================
   VALIDATION
===================================================== */

function validateCurrentStep() {

  const page =
    pages[currentStep];

  if (!page) return true;

  const requiredFields =
    Array.from(
      page.querySelectorAll(
        "input[required], select[required], textarea[required]"
      )
    );

  for (const input of requiredFields) {

    if (
      input.type === "checkbox"
    ) {

      if (!input.checked) {

        alert(
          "Please accept the declaration."
        );

        input.focus();

        return false;
      }

      continue;
    }

    if (
      !String(input.value || "").trim()
    ) {

      const label =
        page.querySelector(
          `label[for="${input.id}"]`
        );

      const labelText =
        label
          ? label.textContent
              .replace("*", "")
              .trim()
          : "required field";

      alert(
        `Please enter ${labelText}.`
      );

      input.focus();

      return false;
    }


    if (
      input.type === "tel"
    ) {

      const clean =
        input.value.replace(
          /\D/g,
          ""
        );

      if (clean.length !== 10) {

        alert(
          "Please enter a valid 10 digit mobile number."
        );

        input.focus();

        return false;
      }
    }

  }


  if (
    currentType === "member" &&
    currentStep === 3
  ) {

    if (!signatureHasData) {

      alert(
        "Please provide your signature."
      );

      return false;
    }

  }

  return true;
}


/* =====================================================
   NEXT
===================================================== */

nextBtn.addEventListener(
  "click",
  () => {

    if (!validateCurrentStep()) {
      return;
    }

    if (
      currentStep <
      pages.length - 1
    ) {

      currentStep++;

      updateStep();

      return;
    }

    submitRegistration();

  }
);


/* =====================================================
   PREVIOUS
===================================================== */

prevBtn.addEventListener(
  "click",
  () => {

    if (currentStep > 0) {

      currentStep--;

      updateStep();
    }

  }
);


/* =====================================================
   COLLECT FORM DATA
===================================================== */

function collectFormData() {

  const formData =
    new FormData(form);

  const data =
    Object.fromEntries(
      formData.entries()
    );

  data.registrationType =
    currentType === "member"
      ? "Member Registration"
      : "Branch Registration";

  data.registrationId =
    createId(
      currentType === "member"
        ? "MEM"
        : "BRN"
    );

  data.submittedAt =
    new Date().toISOString();


  if (currentType === "member") {

    if (signatureCanvas) {

      data.signature =
        signatureCanvas.toDataURL(
          "image/png"
        );
    }

  }

  return data;
}


/* =====================================================
   SAVE LOCAL
===================================================== */

function saveLocal(data) {

  const key =
    "dyfi_registrations";

  let records = [];

  try {

    records =
      JSON.parse(
        localStorage.getItem(key) || "[]"
      );

    if (!Array.isArray(records)) {
      records = [];
    }

  } catch {
    records = [];
  }

  records.push(data);

  localStorage.setItem(
    key,
    JSON.stringify(records)
  );
}


/* =====================================================
   SUBMIT
===================================================== */

function submitRegistration() {

  if (!validateCurrentStep()) {
    return;
  }

  const data =
    collectFormData();

  try {

    saveLocal(data);

    lastSubmittedData =
      data;

    successRegistrationId.textContent =
      data.registrationId;

    closeRegistration();

    successModal.classList.add(
      "active"
    );

    successModal.setAttribute(
      "aria-hidden",
      "false"
    );

  } catch (error) {

    console.error(error);

    alert(
      "Registration save failed. Please try again."
    );

  }
}


/* =====================================================
   SUCCESS MODAL
===================================================== */

document
  .getElementById("successOkBtn")
  .addEventListener(
    "click",
    () => {

      successModal.classList.remove(
        "active"
      );

      successModal.setAttribute(
        "aria-hidden",
        "true"
      );

    }
  );


/* =====================================================
   COPY ID
===================================================== */

document
  .getElementById("copyIdBtn")
  .addEventListener(
    "click",
    async () => {

      const id =
        successRegistrationId.textContent;

      try {

        await navigator.clipboard.writeText(
          id
        );

        document.getElementById(
          "copyIdBtn"
        ).innerHTML = `
          <i class="fas fa-check"></i>
          Copied
        `;

        setTimeout(() => {

          document.getElementById(
            "copyIdBtn"
          ).innerHTML = `
            <i class="fas fa-copy"></i>
            Copy
          `;

        }, 1500);

      } catch {

        alert(
          `Registration ID: ${id}`
        );

      }

    }
  );


/* =====================================================
   VIEW DETAILS
===================================================== */

document
  .getElementById("viewRegistrationBtn")
  .addEventListener(
    "click",
    () => {

      if (!lastSubmittedData) {
        return;
      }

      successModal.classList.remove(
        "active"
      );

      showDetails(
        lastSubmittedData
      );

    }
  );


/* =====================================================
   SHOW DETAILS
===================================================== */

function showDetails(data) {

  detailsTitle.textContent =
    data.registrationType;

  const excluded = [
    "signature",
    "memberPhoto"
  ];

  let html = `
    <div class="details-grid">
  `;

  Object.entries(data).forEach(
    ([key, value]) => {

      if (
        excluded.includes(key) ||
        value === ""
      ) {
        return;
      }

      const readable =
        key
          .replace(
            /([A-Z])/g,
            " $1"
          )
          .replace(
            /^./,
            str => str.toUpperCase()
          );

      html += `
        <div class="detail-item">
          <span>
            ${escapeHTML(readable)}
          </span>

          <strong>
            ${escapeHTML(value)}
          </strong>
        </div>
      `;

    }
  );

  html += `
    </div>
  `;

  detailsBody.innerHTML =
    html;

  detailsModal.classList.add(
    "active"
  );

  detailsModal.setAttribute(
    "aria-hidden",
    "false"
  );
}


/* =====================================================
   DETAILS CLOSE
===================================================== */

function closeDetails() {

  detailsModal.classList.remove(
    "active"
  );

  detailsModal.setAttribute(
    "aria-hidden",
    "true"
  );
}

document
  .getElementById("closeDetailsBtn")
  .addEventListener(
    "click",
    closeDetails
  );

document
  .getElementById("detailsDoneBtn")
  .addEventListener(
    "click",
    closeDetails
  );


/* =====================================================
   CLOSE MODAL
===================================================== */

document
  .getElementById("closeModalBtn")
  .addEventListener(
    "click",
    closeRegistration
  );


modal.addEventListener(
  "click",
  event => {

    if (
      event.target === modal
    ) {

      closeRegistration();
    }

  }
);


successModal.addEventListener(
  "click",
  event => {

    if (
      event.target === successModal
    ) {

      successModal.classList.remove(
        "active"
      );
    }

  }
);

detailsModal.addEventListener(
  "click",
  event => {

    if (
      event.target === detailsModal
    ) {

      closeDetails();
    }

  }
);


/* =====================================================
   BACK BUTTON
===================================================== */

document
  .getElementById("backBtn")
  .addEventListener(
    "click",
    () => {

      if (
        window.history.length > 1
      ) {

        window.history.back();

      } else {

        window.location.href =
          "index.html";
      }

    }
  );


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key !== "Escape"
    ) {
      return;
    }

    if (
      detailsModal.classList.contains(
        "active"
      )
    ) {

      closeDetails();

      return;
    }

    if (
      successModal.classList.contains(
        "active"
      )
    ) {

      successModal.classList.remove(
        "active"
      );

      return;
    }

    if (
      modal.classList.contains(
        "active"
      )
    ) {

      closeRegistration();
    }

  }
);


/* =====================================================
   REGISTRATION BUTTONS
===================================================== */

document.querySelectorAll(
  "[data-open]"
).forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        const type =
          button.dataset.open;

        openRegistration(type);

      }
    );

  }
);


/* =====================================================
   MOBILE NUMBER FILTER
===================================================== */

document.addEventListener(
  "input",
  event => {

    if (
      event.target.matches(
        'input[type="tel"]'
      )
    ) {

      event.target.value =
        event.target.value
          .replace(/\D/g, "")
          .slice(0, 10);

    }

  }
);


/* =====================================================
   PREVENT FORM ENTER SUBMIT
===================================================== */

form.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter" &&
      event.target.tagName !== "TEXTAREA"
    ) {

      event.preventDefault();
    }

  }
);


/* =====================================================
   DEBUG / FUTURE FIREBASE HOOK
===================================================== */

/*
  FUTURE FIREBASE:

  இப்போது Firebase தேவையில்லை.

  பின்னர் Firebase connect செய்யும்போது
  submitRegistration() உள்ளே:

      saveLocal(data);

  என்பதற்குப் பிறகு:

      await saveToFirebase(data);

  என்று add செய்யலாம்.

  அதற்காக current form architecture
  Firebase-ready ஆகவே வைத்திருக்கப்பட்டுள்ளது.
*/


console.log(
  "DYFI Registration System Loaded Successfully"
);
