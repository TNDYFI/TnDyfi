"use strict";

/* =========================================================
   LOGIN SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const form =
        document.getElementById("loginForm");

    const email =
        document.getElementById("loginEmail");

    const password =
        document.getElementById("loginPassword");

    const emailGroup =
        document.querySelector(".inputGroup1");

    const passwordGroup =
        document.querySelector(".inputGroup2");

    const showPasswordCheck =
        document.getElementById("showPasswordCheck");

    const loginButton =
        document.getElementById("login");

    const loginCard =
        document.querySelector(".login-card");

    const emailError =
        document.getElementById("emailError");

    const passwordError =
        document.getElementById("passwordError");

    const loginStatus =
        document.getElementById("loginStatus");


    /* -----------------------------------------------------
       GSAP CHECK
    ----------------------------------------------------- */

    const hasGSAP =
        typeof window.gsap !== "undefined";


    if (!form || !email || !password) {
        console.error("Login form elements not found.");
        return;
    }


    /* =====================================================
       THEME
       ===================================================== */

    function applyTheme() {

        try {

            const theme =
                localStorage.getItem("theme");

            document.documentElement.classList.remove(
                "dark",
                "light"
            );

            if (theme === "dark") {

                document.documentElement
                    .classList.add("dark");

            } else {

                document.documentElement
                    .classList.add("light");

            }

        } catch (error) {

            document.documentElement
                .classList.add("light");
        }
    }


    applyTheme();


    /* =====================================================
       EMAIL UI
       ===================================================== */

    function updateEmailState() {

        const hasValue =
            email.value.trim().length > 0;

        emailGroup.classList.toggle(
            "has-value",
            hasValue
        );

        emailGroup.classList.toggle(
            "focusWithText",
            hasValue || document.activeElement === email
        );

    }


    email.addEventListener(
        "input",
        updateEmailState
    );

    email.addEventListener(
        "focus",
        updateEmailState
    );

    email.addEventListener(
        "blur",
        updateEmailState
    );


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    function updatePasswordVisibility() {

        if (showPasswordCheck.checked) {

            password.type = "text";

        } else {

            password.type = "password";

        }

    }


    showPasswordCheck.addEventListener(
        "change",
        updatePasswordVisibility
    );


    /* =====================================================
       VALIDATION
    ===================================================== */

    function clearErrors() {

        emailError.textContent = "";
        passwordError.textContent = "";

        loginStatus.textContent = "";

        loginStatus.className =
            "login-status";
    }


    function validateEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(value);
    }


    function validateForm() {

        clearErrors();

        let valid = true;

        const emailValue =
            email.value.trim();

        const passwordValue =
            password.value;


        if (!emailValue) {

            emailError.textContent =
                "Please enter your email.";

            valid = false;

        } else if (!validateEmail(emailValue)) {

            emailError.textContent =
                "Please enter a valid email.";

            valid = false;
        }


        if (!passwordValue) {

            passwordError.textContent =
                "Please enter your password.";

            valid = false;

        }


        if (!valid) {

            if (!emailValue) {

                email.focus();

            } else {

                password.focus();

            }

        }


        return valid;
    }


    /* =====================================================
       LOADING
    ===================================================== */

    function setLoading(state) {

        loginCard.classList.toggle(
            "loading",
            state
        );

        loginButton.disabled =
            state;
    }


    /* =====================================================
       LOGIN
       ===================================================== */

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            if (loginButton.disabled) {
                return;
            }


            if (!validateForm()) {
                return;
            }


            const emailValue =
                email.value.trim();

            const passwordValue =
                password.value;


            setLoading(true);


            /*
             ==================================================
             IMPORTANT

             Replace this section with your Firebase login
             if your project uses Firebase Authentication.

             Example:

             signInWithEmailAndPassword(
                 auth,
                 emailValue,
                 passwordValue
             )
             ==================================================
            */


            try {

                /*
                   Small delay only for UI.
                   Remove this when Firebase is connected.
                */

                await new Promise(resolve => {
                    setTimeout(resolve, 700);
                });


                loginStatus.textContent =
                    "Login successful.";

                loginStatus.classList.add(
                    "success"
                );


                /*
                 ===============================================
                 AFTER SUCCESS

                 Change this to your actual main page.

                 Example:

                 window.location.href = "index.html";

                 ===============================================
                */

                window.location.href =
                    "index.html";


            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                loginStatus.textContent =
                    "Login failed. Please try again.";

                loginStatus.classList.add(
                    "error"
                );

            } finally {

                setLoading(false);

            }

        }
    );


    /* =====================================================
       ENTER KEY
       ===================================================== */

    email.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                password.focus();

            }

        }
    );


    password.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                form.requestSubmit();

            }

        }
    );


    /* =====================================================
       ANDROID KEYBOARD / RESIZE
    ===================================================== */

    let lastHeight =
        window.innerHeight;


    function handleViewportResize() {

        const currentHeight =
            window.innerHeight;


        /*
          Android keyboard opened.
          Keep card inside visible area.
        */

        if (
            currentHeight <
            lastHeight - 120
        ) {

            document.body.classList.add(
                "keyboard-open"
            );

        } else {

            document.body.classList.remove(
                "keyboard-open"
            );

        }


        lastHeight =
            currentHeight;


        /*
          Recalculate animation positions
          if your full SVG animation is active.
        */

        if (
            typeof window.recalculateLoginFace ===
            "function"
        ) {

            window.recalculateLoginFace();

        }

    }


    window.addEventListener(
        "resize",
        handleViewportResize,
        {
            passive: true
        }
    );


    /* =====================================================
       VISUAL FEEDBACK
    ===================================================== */

    [email, password].forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                input.parentElement
                    .classList.add("active");

            }
        );


        input.addEventListener(
            "blur",
            () => {

                input.parentElement
                    .classList.remove("active");

            }
        );

    });


    /* =====================================================
       PREVENT DOUBLE TAP ZOOM
    ===================================================== */

    let lastTouchEnd = 0;

    document.addEventListener(
        "touchend",
        event => {

            const now =
                Date.now();

            if (
                now - lastTouchEnd <= 300
            ) {

                event.preventDefault();

            }

            lastTouchEnd = now;

        },
        {
            passive: false
        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateEmailState();

    updatePasswordVisibility();


    console.log(
        "✓ Advanced Login System Ready"
    );

});
