document.addEventListener("click", (event) => {
    const form = document.getElementById("contactForm");
    if (event.target.closest(".form-btn")) {
        if (form) {
            event.preventDefault();

            const formData = {
                name: document.getElementById("form-name").value,
                email: document.getElementById("form-email").value,
                company: document.getElementById("form-company").value,
                service: document.getElementById("form-service").value,
                message: document.getElementById("form-message").value,
                phone: document.getElementById("form-tel").value,
            };

            console.log("Submitting form data:", formData);

            fetch("https://portfolio-646d.onrender.com/api/submit-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (response.ok) {
                        alert("Form submitted successfully!");
                        form.reset();
                    } else {
                        alert("Error submitting form.");
                    }
                })
                .catch((err) => {
                    alert("An error occurred: " + err.message);
                });
        }
    }
});
