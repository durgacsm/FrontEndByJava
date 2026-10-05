/* ==========================================
   ELEMENTS
========================================== */

const imageInput =
    document.getElementById("imageInput");

const imagePreview =
    document.getElementById("imagePreview");

const previewBox =
    document.getElementById("previewBox");

const dropZone =
    document.getElementById("dropZone");

const detectBtn =
    document.getElementById("detectBtn");

const removeImage =
    document.getElementById("removeImage");

const resultContent =
    document.getElementById("resultContent");



/* ==========================================
   IMAGE UPLOAD
========================================== */

imageInput.addEventListener(
    "change",
    function () {

        const file = this.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {

            alert(
                "Please select a valid image."
            );

            return;
        }

        showImage(file);
    }
);



function showImage(file) {

    const reader =
        new FileReader();

    reader.onload =
        function (event) {

            imagePreview.src =
                event.target.result;

            dropZone.style.display =
                "none";

            previewBox.style.display =
                "block";

            detectBtn.disabled =
                false;

            resultContent.innerHTML = `

                <div class="waiting-state">

                    <div class="waiting-icon">
                        🔍
                    </div>

                    <h3>
                        Ready to analyze
                    </h3>

                    <p>
                        Click the Analyze Plant
                        button to begin.
                    </p>

                </div>

            `;
        };

    reader.readAsDataURL(file);
}



/* ==========================================
   REMOVE IMAGE
========================================== */

removeImage.addEventListener(
    "click",
    function () {

        imageInput.value = "";

        imagePreview.src = "";

        previewBox.style.display =
            "none";

        dropZone.style.display =
            "flex";

        detectBtn.disabled =
            true;

        resultContent.innerHTML = `

            <div class="waiting-state">

                <div class="waiting-icon">
                    🌱
                </div>

                <h3>
                    Waiting for your plant
                </h3>

                <p>
                    Upload an image to start
                    your plant health analysis.
                </p>

            </div>

        `;
    }
);



/* ==========================================
   DRAG AND DROP
========================================== */

dropZone.addEventListener(
    "dragover",
    function (event) {

        event.preventDefault();

        dropZone.style.borderColor =
            "#208c55";
    }
);


dropZone.addEventListener(
    "dragleave",
    function () {

        dropZone.style.borderColor =
            "#cfe0d5";
    }
);


dropZone.addEventListener(
    "drop",
    function (event) {

        event.preventDefault();

        const file =
            event.dataTransfer.files[0];

        if (
            file &&
            file.type.startsWith("image/")
        ) {

            imageInput.files =
                event.dataTransfer.files;

            showImage(file);
        }

        dropZone.style.borderColor =
            "#cfe0d5";
    }
);



/* ==========================================
   DISEASE DETECTION
========================================== */

detectBtn.addEventListener(
    "click",
    function () {

        detectBtn.disabled =
            true;

        detectBtn.innerHTML =
            "🔬 Analyzing...";


        resultContent.innerHTML = `

            <div class="analyzing">

                <div class="spinner"></div>

                <h3>
                    Analyzing your plant...
                </h3>

                <p>
                    Checking leaf patterns
                    and symptoms.
                </p>

            </div>

        `;


        setTimeout(
            showDiseaseResult,
            2200
        );
    }
);



/* ==========================================
   DEMO RESULT
========================================== */

function showDiseaseResult() {

    const diseases = [

        {
            name: "Leaf Spot",
            confidence: "94%",
            icon: "🍃",

            description:
                "Dark spots or lesions are commonly associated with leaf spot diseases.",

            treatment:
                "Remove severely affected leaves, improve air circulation and avoid wetting the leaves."
        },

        {
            name: "Powdery Mildew",
            confidence: "91%",
            icon: "🌿",

            description:
                "A white powder-like appearance can indicate powdery mildew.",

            treatment:
                "Improve ventilation, reduce excessive humidity and remove badly affected leaves."
        },

        {
            name: "Healthy Plant",
            confidence: "97%",
            icon: "🌱",

            description:
                "The uploaded image appears consistent with a healthy plant.",

            treatment:
                "Continue providing suitable sunlight, water, nutrients and good air circulation."
        }

    ];


    const result =
        diseases[
            Math.floor(
                Math.random() *
                diseases.length
            )
        ];


    resultContent.innerHTML = `

        <div class="disease-result">

            <div class="result-icon">
                ${result.icon}
            </div>

            <h3>
                ${result.name}
            </h3>

            <span class="confidence">
                ${result.confidence}
                confidence
            </span>


            <div class="info-box">

                <strong>
                    🔎 What we found
                </strong>

                <p>
                    ${result.description}
                </p>

            </div>


            <div class="info-box">

                <strong>
                    💡 Recommended action
                </strong>

                <p>
                    ${result.treatment}
                </p>

            </div>

        </div>

    `;


    detectBtn.disabled =
        false;

    detectBtn.innerHTML =
        "🔬 Analyze Again";
}



/* ==========================================
   LOGIN MODAL
========================================== */

const loginModal =
    document.getElementById("loginModal");

const openLogin =
    document.getElementById("openLogin");

const closeLogin =
    document.getElementById("closeLogin");


openLogin.addEventListener(
    "click",
    function () {

        loginModal.classList.add(
            "active"
        );
    }
);


closeLogin.addEventListener(
    "click",
    function () {

        loginModal.classList.remove(
            "active"
        );
    }
);


loginModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            loginModal
        ) {

            loginModal.classList.remove(
                "active"
            );
        }
    }
);



/* ==========================================
   PASSWORD SHOW/HIDE
========================================== */

const password =
    document.getElementById("password");

const showPassword =
    document.getElementById("showPassword");


showPassword.addEventListener(
    "click",
    function () {

        if (
            password.type ===
            "password"
        ) {

            password.type =
                "text";

            showPassword.textContent =
                "🙈";

        } else {

            password.type =
                "password";

            showPassword.textContent =
                "👁";
        }
    }
);



/* ==========================================
   LOGIN
========================================== */

const loginForm =
    document.getElementById("loginForm");

const loginMessage =
    document.getElementById("loginMessage");


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const email =
            document.getElementById(
                "email"
            ).value;

        loginMessage.textContent =
            `Welcome back, ${email}! 🌿`;

        openLogin.textContent =
            "Account ✓";


        setTimeout(
            function () {

                loginModal.classList.remove(
                    "active"
                );

            },
            1500
        );
    }
);



/* ==========================================
   DARK MODE
========================================== */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        if (
            document.body.classList.contains(
                "dark"
            )
        ) {

            themeBtn.textContent =
                "☀️";

        } else {

            themeBtn.textContent =
                "🌙";
        }
    }
);



/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.querySelector(".nav-links");


menuBtn.addEventListener(
    "click",
    function () {

        if (
            navLinks.style.display ===
            "flex"
        ) {

            navLinks.style.display =
                "none";

        } else {

            navLinks.style.display =
                "flex";

            navLinks.style.position =
                "absolute";

            navLinks.style.top =
                "78px";

            navLinks.style.left =
                "0";

            navLinks.style.right =
                "0";

            navLinks.style.padding =
                "25px";

            navLinks.style.flexDirection =
                "column";

            navLinks.style.background =
                "white";
        }
    }
);