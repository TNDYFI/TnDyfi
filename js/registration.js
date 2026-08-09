/* =========================================================
   REGISTRATION SYSTEM
   Firebase இல்லாமல் LocalStorage version
   Later Firebase connect செய்ய easy
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const memberModal =
    document.getElementById("memberModal");

  const branchModal =
    document.getElementById("branchModal");

  const successModal =
    document.getElementById("successModal");

  const memberForm =
    document.getElementById("memberForm");

  const branchForm =
    document.getElementById("branchForm");

  const toastContainer =
    document.getElementById("toastContainer");

  const themeToggle =
    document.getElementById("themeToggle");


  /* =======================================================
     THEME
     ======================================================= */

  function applyTheme() {

    const dark =
      document.documentElement.classList.contains("dark");

    if (themeToggle) {

      const icon =
        themeToggle.querySelector("i");

      if (icon) {

        icon.className =
          dark
            ? "fas fa-sun"
            : "fas fa-moon";
      }

    }

  }


  applyTheme();


  themeToggle?.addEventListener("click", () => {

    const dark =
      document.documentElement.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );

    applyTheme();

  });


  /* =======================================================
     MODAL OPEN
     ======================================================= */

  function openModal(modal) {

    if (!modal) return;

    modal.classList.add("active");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow = "hidden";

  }


  /* =======================================================
     MODAL CLOSE
     ======================================================= */

  function closeModal(modal) {

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    if (
      !memberModal.classList.contains("active") &&
      !branchModal.classList.contains("active") &&
      !successModal.classList.contains("active")
    ) {

      document.body.style.overflow = "";

    }

  }


  /* =======================================================
     OPTION BUTTONS
     ======================================================= */

  document
    .querySelectorAll("[data-open]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const type =
          button.dataset.open;

        if (type === "member") {

          resetMemberForm();

          openModal(memberModal);

        }

        if (type === "branch") {

          resetBranchForm();

          openModal(branchModal);

        }

      });

    });


  /* =======================================================
     CLOSE BUTTONS
     ======================================================= */

  document
    .querySelectorAll("[data-close]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const type =
          button.dataset.close;

        if (type === "member") {
          closeModal(memberModal);
        }

        if (type === "branch") {
          closeModal(branchModal);
        }

      });

    });


  /* =======================================================
     OUTSIDE CLICK
     ======================================================= */

  [memberModal, branchModal].forEach(modal => {

    modal?.addEventListener("click", event => {

      if (event.target === modal) {

        closeModal(modal);

      }

    });

  });


  /* =======================================================
     ESCAPE
     ======================================================= */

  document.addEventListener("keydown", event => {

    if (event.key !== "Escape") return;

    if (memberModal.classList.contains("active")) {

      closeModal(memberModal);

    }

    if (branchModal.classList.contains("active")) {

      closeModal(branchModal);

    }

  });


  /* =======================================================
     STEP SYSTEM
     ======================================================= */

  let memberStep = 1;
  let branchStep = 1;


  const MEMBER_TOTAL_STEPS = 4;
  const BRANCH_TOTAL_STEPS = 2;


  function showMemberStep(step) {

    memberStep =
      Math.max(
        1,
        Math.min(
          MEMBER_TOTAL_STEPS,
          step
        )
      );

    document
      .querySelectorAll("#memberForm .form-step")
      .forEach(el => {

        el.classList.toggle(
          "active",
          Number(el.dataset.step) === memberStep
        );

      });


    updateProgress(
      "member",
      memberStep,
      MEMBER_TOTAL_STEPS
    );


    scrollModalTop(memberModal);

  }


  function showBranchStep(step) {

    branchStep =
      Math.max(
        1,
        Math.min(
          BRANCH_TOTAL_STEPS,
          step
        )
      );

    document
      .querySelectorAll("#branchForm .form-step")
      .forEach(el => {

        el.classList.toggle(
          "active",
          Number(el.dataset.step) === branchStep
        );

      });


    updateProgress(
      "branch",
      branchStep,
      BRANCH_TOTAL_STEPS
    );


    scrollModalTop(branchModal);

  }


  function updateProgress(
    type,
    step,
    total
  ) {

    const percent =
      Math.round(
        (step / total) * 100
      );

    const bar =
      document.getElementById(
        `${type}ProgressBar`
      );

    const text =
      document.getElementById(
        `${type}StepText`
      );

    const percentText =
      document.getElementById(
        `${type}ProgressPercent`
      );


    if (bar) {
      bar.style.width =
        `${percent}%`;
    }

    if (text) {

      text.textContent =
        `Step ${step} of ${total}`;

    }

    if (percentText) {

      percentText.textContent =
        `${percent}%`;

    }

  }


  function scrollModalTop(modal) {

    if (!modal) return;

    const box =
      modal.querySelector(
        ".registration-modal-box"
      );

    box?.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     VALIDATE CURRENT STEP
     ======================================================= */

  function validateStep(form, step) {

    const current =
      form.querySelector(
        `.form-step[data-step="${step}"]`
      );

    if (!current) return true;

    const requiredFields =
      current.querySelectorAll(
        "input[required], select[required], textarea[required]"
      );


    for (const field of requiredFields) {

      if (!field.checkValidity()) {

        field.reportValidity();

        field.focus();

        return false;

      }

    }


    return true;

  }


  /* =======================================================
     MEMBER NEXT
     ======================================================= */

  document
    .querySelectorAll(".member-next")
    .forEach(button => {

      button.addEventListener("click", () => {

        if (
          !validateStep(
            memberForm,
            memberStep
          )
        ) return;

        showMemberStep(
          memberStep + 1
        );

      });

    });


  /* =======================================================
     MEMBER BACK
     ======================================================= */

  document
    .querySelectorAll(".member-back")
    .forEach(button => {

      button.addEventListener("click", () => {

        showMemberStep(
          memberStep - 1
        );

      });

    });


  /* =======================================================
     BRANCH NEXT
     ======================================================= */

  document
    .querySelectorAll(".branch-next")
    .forEach(button => {

      button.addEventListener("click", () => {

        if (
          !validateStep(
            branchForm,
            branchStep
          )
        ) return;

        showBranchStep(
          branchStep + 1
        );

      });

    });


  /* =======================================================
     BRANCH BACK
     ======================================================= */

  document
    .querySelectorAll(".branch-back")
    .forEach(button => {

      button.addEventListener("click", () => {

        showBranchStep(
          branchStep - 1
        );

      });

    });


  /* =======================================================
     MOBILE NUMBER ONLY
     ======================================================= */

  document
    .querySelectorAll(
      'input[type="tel"]'
    )
    .forEach(input => {

      input.addEventListener(
        "input",
        () => {

          input.value =
            input.value
              .replace(/\D/g, "")
              .slice(0, 10);

        }
      );

    });


  /* =======================================================
     SIGNATURE PAD
     ======================================================= */

  const canvas =
    document.getElementById(
      "memberSignature"
    );

  const signatureWrapper =
    document.querySelector(
      ".signature-pad-wrapper"
    );

  const clearSignature =
    document.getElementById(
      "clearMemberSignature"
    );


  let ctx = null;
  let drawing = false;
  let hasSignature = false;


  function setupSignatureCanvas() {

    if (!canvas) return;

    const rect =
      canvas.getBoundingClientRect();

    const ratio =
      Math.max(
        window.devicePixelRatio || 1,
        1
      );


    canvas.width =
      rect.width * ratio;

    canvas.height =
      rect.height * ratio;


    ctx =
      canvas.getContext("2d");


    ctx.scale(
      ratio,
      ratio
    );


    ctx.lineWidth = 2.2;

    ctx.lineCap = "round";

    ctx.lineJoin = "round";

    ctx.strokeStyle = "#111827";

  }


  function getPoint(event) {

    const rect =
      canvas.getBoundingClientRect();

    let clientX;
    let clientY;


    if (event.touches?.length) {

      clientX =
        event.touches[0].clientX;

      clientY =
        event.touches[0].clientY;

    } else {

      clientX =
        event.clientX;

      clientY =
        event.clientY;

    }


    return {
      x:
        clientX - rect.left,

      y:
        clientY - rect.top
    };

  }


  function startDrawing(event) {

    event.preventDefault();

    if (!ctx) return;

    drawing = true;

    hasSignature = true;

    signatureWrapper
      ?.classList.add("signed");


    const point =
      getPoint(event);

    ctx.beginPath();

    ctx.moveTo(
      point.x,
      point.y
    );

  }


  function draw(event) {

    if (!drawing || !ctx) return;

    event.preventDefault();

    const point =
      getPoint(event);

    ctx.lineTo(
      point.x,
      point.y
    );

    ctx.stroke();

  }


  function stopDrawing(event) {

    if (!drawing) return;

    event.preventDefault();

    drawing = false;

    ctx?.closePath();

  }


  canvas?.addEventListener(
    "pointerdown",
    startDrawing
  );

  canvas?.addEventListener(
    "pointermove",
    draw
  );

  canvas?.addEventListener(
    "pointerup",
    stopDrawing
  );

  canvas?.addEventListener(
    "pointercancel",
    stopDrawing
  );

  canvas?.addEventListener(
    "pointerleave",
    stopDrawing
  );


  clearSignature?.addEventListener(
    "click",
    () => {

      if (!canvas || !ctx) return;

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      hasSignature = false;

      signatureWrapper
        ?.classList.remove("signed");

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (
        memberModal.classList.contains(
          "active"
        ) &&
        memberStep === 4
      ) {

        setupSignatureCanvas();

      }

    }
  );


  /* =======================================================
     MEMBER FORM SUBMIT
     ======================================================= */

  memberForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (!validateStep(
        memberForm,
        4
      )) return;


      if (!hasSignature) {

        showToast(
          "Please add your signature.",
          "error"
        );

        return;

      }


      const data =
        formToObject(
          memberForm
        );


      data.registrationType =
        "Member Registration";

      data.signature =
        canvas.toDataURL(
          "image/png"
        );

      data.submittedAt =
        new Date().toISOString();


      const id =
        createRegistrationId(
          "MEM"
        );


      data.registrationId =
        id;


      saveRegistration(
        "memberRegistrations",
        data
      );


      closeModal(
        memberModal
      );


      showSuccess(
        id,
        "Member Registration",
        "உங்கள் Member Registration வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது."
      );

    }
  );


  /* =======================================================
     BRANCH FORM SUBMIT
     ======================================================= */

  branchForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (!validateStep(
        branchForm,
        2
      )) return;


      const data =
        formToObject(
          branchForm
        );


      data.state =
        "Tamil Nadu";

      data.registrationType =
        "Branch Registration";

      data.submittedAt =
        new Date().toISOString();


      const id =
        createRegistrationId(
          "BR"
        );


      data.registrationId =
        id;


      saveRegistration(
        "branchRegistrations",
        data
      );


      closeModal(
        branchModal
      );


      showSuccess(
        id,
        "Branch Registration",
        "உங்கள் Branch Registration வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது."
      );

    }
  );


  /* =======================================================
     FORM → OBJECT
     ======================================================= */

  function formToObject(form) {

    const formData =
      new FormData(form);

    const object = {};


    formData.forEach(
      (value, key) => {

        if (
          key === "agreement" ||
          key === "branchAgreement"
        ) return;

        object[key] =
          String(value).trim();

      }
    );


    return object;

  }


  /* =======================================================
     SAVE LOCAL
     ======================================================= */

  function saveRegistration(
    storageKey,
    data
  ) {

    try {

      const oldData =
        JSON.parse(
          localStorage.getItem(
            storageKey
          ) || "[]"
        );


      oldData.push(data);


      localStorage.setItem(
        storageKey,
        JSON.stringify(
          oldData
        )
      );


      console.log(
        "Registration saved:",
        data
      );

    } catch (error) {

      console.error(
        "LocalStorage error:",
        error
      );

    }

  }


  /* =======================================================
     REGISTRATION ID
     ======================================================= */

  function createRegistrationId(
    prefix
  ) {

    const date =
      new Date();

    const year =
      date.getFullYear();

    const random =
      Math.floor(
        100000 +
        Math.random() * 900000
      );


    return `${prefix}-${year}-${random}`;

  }


  /* =======================================================
     SUCCESS
     ======================================================= */

  function showSuccess(
    id,
    type,
    message
  ) {

    const idElement =
      document.getElementById(
        "registrationId"
      );

    const messageElement =
      document.getElementById(
        "successMessage"
      );


    if (idElement) {

      idElement.textContent =
        id;

    }


    if (messageElement) {

      messageElement.textContent =
        message;

    }


    successModal.classList.add(
      "active"
    );


    successModal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";


    showToast(
      `${type} submitted successfully`,
      "success"
    );

  }


  /* =======================================================
     SUCCESS CLOSE
     ======================================================= */

  document
    .getElementById(
      "successClose"
    )
    ?.addEventListener(
      "click",
      () => {

        successModal.classList.remove(
          "active"
        );

        successModal.setAttribute(
          "aria-hidden",
          "true"
        );

        document.body.style.overflow =
          "";

      }
    );


  /* =======================================================
     COPY REGISTRATION ID
     ======================================================= */

  document
    .getElementById(
      "copyRegistrationId"
    )
    ?.addEventListener(
      "click",
      async () => {

        const id =
          document.getElementById(
            "registrationId"
          )?.textContent;


        if (!id) return;


        try {

          await navigator.clipboard.writeText(
            id
          );

          showToast(
            "Registration ID copied",
            "success"
          );

        } catch {

          showToast(
            "Copy failed",
            "error"
          );

        }

      }
    );


  /* =======================================================
     RESET MEMBER
     ======================================================= */

  function resetMemberForm() {

    memberForm?.reset();

    memberStep = 1;

    showMemberStep(1);


    hasSignature = false;

    signatureWrapper
      ?.classList.remove(
        "signed"
      );


    setTimeout(
      setupSignatureCanvas,
      250
    );

  }


  /* =======================================================
     RESET BRANCH
     ======================================================= */

  function resetBranchForm() {

    branchForm?.reset();

    branchStep = 1;

    showBranchStep(1);

  }


  /* =======================================================
     TOAST
     ======================================================= */

  function showToast(
    message,
    type = "success"
  ) {

    if (!toastContainer) return;


    const toast =
      document.createElement(
        "div"
      );


    toast.className =
      `toast ${type}`;


    toast.textContent =
      message;


    toastContainer.appendChild(
      toast
    );


    setTimeout(
      () => {

        toast.style.opacity =
          "0";

        toast.style.transform =
          "translateY(10px)";

        setTimeout(
          () => toast.remove(),
          250
        );

      },
      3000
    );

  }


  /* =======================================================
     INITIAL
     ======================================================= */

  showMemberStep(1);

  showBranchStep(1);


  console.log(
    "Registration system initialized successfully."
  );

});
