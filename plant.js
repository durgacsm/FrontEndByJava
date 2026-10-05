const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const detectBtn = document.getElementById("detectBtn");
const resultContent = document.getElementById("resultContent");


/* ---------------- IMAGE UPLOAD ---------------- */

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    // Check image type
    if (!file.type.startsWith("image/")) {

        alert("Please upload an image file.");

        return;
    }

    // Create preview
    const reader = new FileReader();

    reader.onload = function (event) {

        imagePreview.src = event.target.result;

        imagePreview.style.display = "block";

        detectBtn.disabled = false;

        resultContent.innerHTML = `
            <div class="result-placeholder">
                <div>🔍</div>
                <h3>Ready to Analyze</h3>
                <p>
                    Click "Detect Disease" to analyze this image.
                </p>
            </div>
        `;
    };

    reader.readAsDataURL(file);

});


/* ---------------- DISEASE DETECTION ---------------- */

detectBtn.addEventListener("click", function () {

    detectBtn.disabled = true;

    detectBtn.textContent = "Analyzing...";


    // Simulate AI processing
    setTimeout(function () {

        // Demo result
        const diseases = [

            {
                name: "Leaf Spot",
                confidence: "94%",
                icon: "🍃",
                description:
                    "Dark spots or lesions may appear on the leaves.",
                treatment:
                    "Remove infected leaves, improve air circulation, and avoid watering the leaves directly."
            },

            {
                name: "Powdery Mildew",
                confidence: "91%",
                icon: "🌿",
                description:
                    "A white powder-like substance can appear on the surface of leaves.",
                treatment:
                    "Improve ventilation, avoid excessive humidity, and remove severely affected leaves."
            },

            {
                name: "Healthy Plant",
                confidence: "96%",
                icon: "🌱",
                description:
                    "The uploaded image appears to show a healthy plant.",
                treatment:
                    "Continue providing adequate sunlight, water, nutrients, and proper air circulation."
            }

        ];


        // Select random demo result
        const result =
            diseases[Math.floor(Math.random() * diseases.length)];


        resultContent.innerHTML = `

            <div class="disease-result">

                <div class="disease-icon">
                    ${result.icon}
                </div>

                <h3>
                    ${result.name}
                </h3>

                <span class="confidence">
                    Confidence: ${result.confidence}
                </span>

                <div class="info-box">

                    <strong>
                        Description
                    </strong>

                    <p>
                        ${result.description}
                    </p>

                </div>

                <div class="info-box">

                    <strong>
                        Recommended Action
                    </strong>

                    <p>
                        ${result.treatment}
                    </p>

                </div>

            </div>

        `;


        detectBtn.disabled = false;

        detectBtn.textContent = "🔍 Detect Again";

    }, 1500);

});