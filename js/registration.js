/* =========================================================
   REGISTRATION SYSTEM
   LocalStorage Version
   MEMBER SUBMIT FIXED
   Branch logic preserved
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const memberModal = document.getElementById("memberModal");
  const branchModal = document.getElementById("branchModal");
  const successModal = document.getElementById("successModal");

  const memberForm = document.getElementById("memberForm");
  const branchForm = document.getElementById("branchForm");

  const toastContainer = document.getElementById("toastContainer");
  const themeToggle = document.getElementById("themeToggle");

  /* =======================================================
     THEME
     ======================================================= */

  function applyTheme() {

    const dark =
      document.documentElement.classList.contains("dark");

    if (themeToggle) {

      const icon = themeToggle.querySelector("i");

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

    try {
      localStorage.setItem(
        "theme",
        dark ? "dark" : "light"
      );
    } catch (error) {
      console.warn("Theme storage unavailable:", error);
    }

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

    const memberOpen =
      memberModal?.classList.contains("active");

    const branchOpen =
      branchModal?.classList.contains("active");

    const successOpen =
      successModal?.classList.contains("active");

    if (!memberOpen && !branchOpen && !successOpen) {
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

        const type = button.dataset.open;

        if (type === "member") {

          resetMemberForm();

          openModal(memberModal);

          /*
             Canvas must be sized AFTER modal becomes visible.
          */
          setTimeout(() => {
            setupSignatureCanvas();
          }, 100);

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

        const type = button.dataset.close;

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

    if (memberModal?.classList.contains("active")) {
      closeModal(memberModal);
    }

    if (branchModal?.classList.contains("active")) {
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

    /*
      Important:
      When signature step becomes visible,
      resize canvas correctly.
    */
    if (memberStep === 4) {

      setTimeout(() => {
        setupSignatureCanvas();
      }, 120);

    }

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

  function updateProgress(type, step, total) {

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

    if (box) {
      box.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }

  }

  /* =======================================================
     VALIDATE CURRENT STEP
     ======================================================= */

  function validateStep(form, step) {

    if (!form) return false;

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

        try {
          field.focus();
        } catch (error) {}

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

        if (!memberForm) return;

        if (
          !validateStep(
            memberForm,
            memberStep
          )
        ) {
          return;
        }

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

        if (!branchForm) return;

        if (
          !validateStep(
            branchForm,
            branchStep
          )
        ) {
          return;
        }

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
    .querySelectorAll('input[type="tel"]')
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

    /*
      If canvas is not visible yet, do not resize.
    */
    if (
      rect.width <= 0 ||
      rect.height <= 0
    ) {
      return;
    }

    const ratio =
      Math.max(
        window.devicePixelRatio || 1,
        1
      );

    /*
      Preserve existing signature when resizing.
    */
    let oldCanvas = null;

    if (
      canvas.width > 0 &&
      canvas.height > 0 &&
      hasSignature
    ) {

      oldCanvas =
        document.createElement("canvas");

      oldCanvas.width =
        canvas.width;

      oldCanvas.height =
        canvas.height;

      const oldCtx =
        oldCanvas.getContext("2d");

      oldCtx.drawImage(
        canvas,
        0,
        0
      );

    }

    canvas.width =
      Math.round(rect.width * ratio);

    canvas.height =
      Math.round(rect.height * ratio);

    canvas.style.width =
      `${rect.width}px`;

    canvas.style.height =
      `${rect.height}px`;

    ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    ctx.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );

    ctx.lineWidth = 2.2;

    ctx.lineCap = "round";

    ctx.lineJoin = "round";

    ctx.strokeStyle = "#111827";

    /*
      Restore previous signature.
    */
    if (oldCanvas && hasSignature) {

      ctx.drawImage(
        oldCanvas,
        0,
        0,
        oldCanvas.width / ratio,
        oldCanvas.height / ratio,
        0,
        0,
        rect.width,
        rect.height
      );

    }

  }

  function getPoint(event) {

    if (!canvas) {
      return {
        x: 0,
        y: 0
      };
    }

    const rect =
      canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if (
      event.touches &&
      event.touches.length
    ) {

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

    if (!ctx) {
      setupSignatureCanvas();
    }

    if (!ctx) return;

    event.preventDefault();

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

    if (event) {
      event.preventDefault();
    }

    drawing = false;

    if (ctx) {
      ctx.closePath();
    }

  }

  canvas?.addEventListener(
    "pointerdown",
    startDrawing,
    { passive: false }
  );

  canvas?.addEventListener(
    "pointermove",
    draw,
    { passive: false }
  );

  canvas?.addEventListener(
    "pointerup",
    stopDrawing,
    { passive: false }
  );

  canvas?.addEventListener(
    "pointercancel",
    stopDrawing,
    { passive: false }
  );

  canvas?.addEventListener(
    "pointerleave",
    stopDrawing,
    { passive: false }
  );

  clearSignature?.addEventListener(
    "click",
    () => {

      if (!canvas) return;

      if (!ctx) {
        setupSignatureCanvas();
      }

      if (ctx) {

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

      }

      hasSignature = false;

      signatureWrapper
        ?.classList.remove("signed");

    }
  );

  window.addEventListener(
    "resize",
    () => {

      if (
        memberModal?.classList.contains("active") &&
        memberStep === 4
      ) {

        setTimeout(
          setupSignatureCanvas,
          100
        );

      }

    }
  );

  /* =======================================================
     MEMBER FORM SUBMIT
     ======================================================= */

  memberForm?.addEventListener(
    "submit",
    event => {

      /*
        Prevent normal browser form navigation.
      */
      event.preventDefault();
      event.stopPropagation();

      try {

        /* -----------------------------------------------
           STEP 4 VALIDATION
           ----------------------------------------------- */

        if (
          !validateStep(
            memberForm,
            4
          )
        ) {
          return;
        }

        /* -----------------------------------------------
           SIGNATURE CHECK
           ----------------------------------------------- */

        if (!canvas) {

          showToast(
            "Signature pad not found.",
            "error"
          );

          console.error(
            "Member signature canvas #memberSignature not found."
          );

          return;
        }

        if (!hasSignature) {

          showToast(
            "Please add your signature.",
            "error"
          );

          return;

        }

        /* -----------------------------------------------
           CANVAS CHECK
           ----------------------------------------------- */

        if (
          canvas.width <= 0 ||
          canvas.height <= 0
        ) {

          setupSignatureCanvas();

        }

        if (
          canvas.width <= 0 ||
          canvas.height <= 0
        ) {

          showToast(
            "Signature area is not ready. Please try again.",
            "error"
          );

          return;

        }

        /* -----------------------------------------------
           FORM DATA
           ----------------------------------------------- */

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

        /* -----------------------------------------------
           REGISTRATION ID
           ----------------------------------------------- */

        const id =
          createRegistrationId(
            "MEM"
          );

        data.registrationId =
          id;

        /* -----------------------------------------------
           SAVE
           ----------------------------------------------- */

        const saved =
          saveRegistration(
            "memberRegistrations",
            data
          );

        if (!saved) {

          showToast(
            "Registration save செய்ய முடியவில்லை. Browser storage check செய்யவும்.",
            "error"
          );

          return;

        }

        /* -----------------------------------------------
           CLOSE MEMBER MODAL
           ----------------------------------------------- */

        closeModal(
          memberModal
        );

        /* -----------------------------------------------
           SHOW SUCCESS
           ----------------------------------------------- */

        showSuccess(
          id,
          "Member Registration",
          "உங்கள் Member Registration வெற்றிகரமாக பதிவு செய்யப்பட்டுள்ளது."
        );

      } catch (error) {

        console.error(
          "MEMBER SUBMIT ERROR:",
          error
        );

        showToast(
          "Member Registration submit செய்யும்போது error ஏற்பட்டது.",
          "error"
        );

      }

    }
  );

  /* =======================================================
     BRANCH FORM SUBMIT
     Existing working logic preserved
     ======================================================= */

  branchForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      if (
        !validateStep(
          branchForm,
          2
        )
      ) {
        return;
      }

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

      const saved =
        saveRegistration(
          "branchRegistrations",
          data
        );

      if (!saved) {

        showToast(
          "Branch Registration save செய்ய முடியவில்லை.",
          "error"
        );

        return;

      }

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
        ) {
          return;
        }

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

      const stored =
        localStorage.getItem(
          storageKey
        );

      let oldData = [];

      if (stored) {

        const parsed =
          JSON.parse(stored);

        if (Array.isArray(parsed)) {
          oldData = parsed;
        }

      }

      oldData.push(data);

      localStorage.setItem(
        storageKey,
        JSON.stringify(oldData)
      );

      console.log(
        "Registration saved successfully:",
        storageKey,
        data
      );

      return true;

    } catch (error) {

      console.error(
        "LocalStorage save error:",
        error
      );

      return false;

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

    if (!successModal) {

      showToast(
        `${type} submitted successfully — ${id}`,
        "success"
      );

      return;

    }

    const idElement =
      document.getElementById(
        "registrationId"
      );

    const messageElement =
      document.getElementById(
        "successMessage"
      );

    if (idElement) {
      idElement.textContent = id;
    }

    if (messageElement) {
      messageElement.textContent = message;
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
    .getElementById("successClose")
    ?.addEventListener(
      "click",
      () => {

        successModal?.classList.remove(
          "active"
        );

        successModal?.setAttribute(
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
    .getElementById("copyRegistrationId")
    ?.addEventListener(
      "click",
      async () => {

        const id =
          document.getElementById(
            "registrationId"
          )?.textContent?.trim();

        if (!id) return;

        try {

          if (
            navigator.clipboard &&
            window.isSecureContext
          ) {

            await navigator.clipboard.writeText(
              id
            );

          } else {

            const temp =
              document.createElement("textarea");

            temp.value = id;

            temp.style.position =
              "fixed";

            temp.style.opacity = "0";

            document.body.appendChild(temp);

            temp.select();

            document.execCommand("copy");

            temp.remove();

          }

          showToast(
            "Registration ID copied",
            "success"
          );

        } catch (error) {

          console.error(
            "Copy error:",
            error
          );

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

    hasSignature = false;

    drawing = false;

    signatureWrapper
      ?.classList.remove(
        "signed"
      );

    showMemberStep(1);

    /*
      Clear old canvas safely.
    */
    if (canvas) {

      if (!ctx) {
        setupSignatureCanvas();
      }

      if (ctx) {

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

      }

    }

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

    if (!toastContainer) {

      console.log(
        `[${type}] ${message}`
      );

      return;

    }

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
