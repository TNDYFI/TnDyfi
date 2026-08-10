"use strict";

/* =========================================================
   TN DYFI LOGIN SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const form =
        document.getElementById("loginForm");

    const email =
        document.getElementById("loginEmail");

    const password =
        document.getElementById("loginPassword");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const rememberMe =
        document.getElementById("rememberMe");

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

    const forgotPassword =
        document.getElementById("forgotPassword");


    /* =====================================================
       SAFETY CHECK
       ===================================================== */

    if (
        !form ||
        !email ||
        !password ||
        !loginButton
    ) {

        console.error(
            "TN DYFI Login: Required elements missing."
        );

        return;
    }


    /* =====================================================
       THEME
       ===================================================== */

    function applyTheme() {

        try {

            const savedTheme =
                localStorage.getItem("theme");

            document.documentElement.classList.remove(
                "light",
                "dark"
            );

            document.documentElement.classList.add(
                savedTheme === "dark"
                    ? "dark"
                    : "light"
            );

        } catch {

            document.documentElement.classList.add(
                "light"
            );
        }
    }


    applyTheme();


    /* =====================================================
       REMEMBER EMAIL
       ===================================================== */

    try {

        const savedEmail =
            localStorage.getItem("loginEmail");

        if (savedEmail) {

            email.value = savedEmail;

            rememberMe.checked = true;
        }

    } catch {
        /* Ignore storage errors */
    }


    /* =====================================================
       PASSWORD VISIBILITY
       ===================================================== */

    passwordToggle.addEventListener(
        "click",
        () => {

            const isPassword =
                password.type === "password";

            password.type =
                isPassword
                    ? "text"
                    : "password";

            passwordToggle.setAttribute(
                "aria-pressed",
                String(isPassword)
            );

            passwordToggle.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );

            passwordToggle.innerHTML =
                isPassword
                    ? '<i class="fa-regular fa-eye-slash"></i>'
                    : '<i class="fa-regular fa-eye"></i>';
        }
    );


    /* =====================================================
       ERROR HELPERS
       ===================================================== */

    function clearErrors() {

        emailError.textContent = "";
        passwordError.textContent = "";

        loginStatus.textContent = "";

        loginStatus.className =
            "login-status";

        const emailWrapper =
            email.closest(".input-wrapper");

        const passwordWrapper =
            password.closest(".input-wrapper");

        emailWrapper?.classList.remove(
            "has-error"
        );

        passwordWrapper?.classList.remove(
            "has-error"
        );
    }


    function showEmailError(message) {

        emailError.textContent =
            message;

        email
            .closest(".input-wrapper")
            ?.classList.add("has-error");
    }


    function showPasswordError(message) {

        passwordError.textContent =
            message;

        password
            .closest(".input-wrapper")
            ?.classList.add("has-error");
    }


    /* =====================================================
       EMAIL VALIDATION
       ===================================================== */

    function isValidEmail(value) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(value);
    }


    /* =====================================================
       FORM VALIDATION
       ===================================================== */

    function validateForm() {

        clearErrors();

        let valid = true;

        const emailValue =
            email.value.trim();

        const passwordValue =
            password.value;


        if (!emailValue) {

            showEmailError(
                "Please enter your email address."
            );

            valid = false;

        } else if (!isValidEmail(emailValue)) {

            showEmailError(
                "Please enter a valid email address."
            );

            valid = false;
        }


        if (!passwordValue) {

            showPasswordError(
                "Please enter your password."
            );

            valid = false;
        }


        if (!valid) {

            if (
                !emailValue ||
                !isValidEmail(emailValue)
            ) {

                email.focus();

            } else {

                password.focus();
            }

        }


        return valid;
    }


    /* =====================================================
       LOADING STATE
       ===================================================== */

    function setLoading(state) {

        loginCard.classList.toggle(
            "loading",
            state
        );

        loginButton.disabled =
            state;

        email.disabled =
            state;

        password.disabled =
            state;

        passwordToggle.disabled =
            state;
    }


    /* =====================================================
       LOGIN
       ===================================================== */

    form.addEventListener(
        "submit",
        async event => {

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


            /* Save email if requested */

            try {

                if (rememberMe.checked) {

                    localStorage.setItem(
                        "loginEmail",
                        emailValue
                    );

                } else {

                    localStorage.removeItem(
                        "loginEmail"
                    );
                }

            } catch {
                /* Storage unavailable */
            }


            setLoading(true);


            /*
             ==================================================
             IMPORTANT

             இந்த இடத்தில்தான் Firebase Authentication
             connect செய்ய வேண்டும்.

             Example:

             const result =
                 await signInWithEmailAndPassword(
                     auth,
                     emailValue,
                     passwordValue
                 );

             ==================================================
            */


            try {

                /*
                 ----------------------------------------------
                 TEMPORARY DEMO FLOW

                 Firebase connect செய்த பிறகு இதை remove
                 செய்ய வேண்டும்.
                 ----------------------------------------------
                */

                await new Promise(resolve => {

                    setTimeout(resolve, 700);

                });


                /*
                 ----------------------------------------------
                 IMPORTANT

                 Current code design testing மட்டும்.

                 Actual Firebase authentication இல்லாமல்
                 direct redirect செய்ய வேண்டாம்.

                 ----------------------------------------------
                */

                loginStatus.textContent =
                    "Please connect Firebase Authentication.";

                loginStatus.classList.add(
                    "error"
                );

                console.warn(
                    "Firebase Authentication is not connected."
                );

            } catch (error) {

                console.error(
                    "Login error:",
                    error
                );

                loginStatus.textContent =
                    "Unable to login. Please try again.";

                loginStatus.classList.add(
                    "error"
                );

            } finally {

                setLoading(false);
            }

        }
    );


    /* =====================================================
       REAL-TIME ERROR CLEAR
       ===================================================== */

    email.addEventListener(
        "input",
        () => {

            if (emailError.textContent) {

                emailError.textContent = "";

                email
                    .closest(".input-wrapper")
                    ?.classList.remove(
                        "has-error"
                    );
            }
        }
    );


    password.addEventListener(
        "input",
        () => {

            if (passwordError.textContent) {

                passwordError.textContent = "";

                password
                    .closest(".input-wrapper")
                    ?.classList.remove(
                        "has-error"
                    );
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
       FORGOT PASSWORD
       ===================================================== */

    forgotPassword?.addEventListener(
        "click",
        () => {

            loginStatus.textContent =
                "Password recovery will be available after authentication is connected.";

            loginStatus.className =
                "login-status error";
        }
    );


    /* =====================================================
       ANDROID KEYBOARD DETECTION
       ===================================================== */

    let initialHeight =
        window.innerHeight;


    function checkKeyboard() {

        const currentHeight =
            window.innerHeight;

        const keyboardOpened =
            currentHeight <
            initialHeight * 0.72;

        document.body.classList.toggle(
            "keyboard-open",
            keyboardOpened
        );
    }


    window.addEventListener(
        "resize",
        checkKeyboard,
        {
            passive: true
        }
    );


    /* =====================================================
       VISUAL INPUT STATE
       ===================================================== */

    [email, password].forEach(input => {

        input.addEventListener(
            "focus",
            () => {

                input
                    .closest(".form-group")
                    ?.classList.add("active");
            }
        );


        input.addEventListener(
            "blur",
            () => {

                input
                    .closest(".form-group")
                    ?.classList.remove("active");
            }
        );

    });


    /* =====================================================
       INITIAL
       ===================================================== */

    checkKeyboard();

    console.log(
        "✓ TN DYFI Premium Login Ready"
    );

});
