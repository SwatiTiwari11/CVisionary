async function fetchAIContent() {
    const jobTitle = document.getElementById("jobTitle").value;
    
    if (!jobTitle) {
        alert("Please enter a job title first.");
        return;
    }

    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "text-davinci-003",
            prompt: `Suggest key skills and a brief experience summary for a ${jobTitle}.`,
            max_tokens: 100
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_OPENAI_API_KEY"
            }
        });

        const aiResponse = response.data.choices[0].text.trim().split("\n\n");
        document.getElementById("skills").value = aiResponse[0] || "Suggested skills here...";
        document.getElementById("experience").value = aiResponse[1] || "Suggested experience here...";
    } catch (error) {
        console.error("Error fetching AI content:", error);
        alert("Failed to fetch AI suggestions. Please try again.");
    }
}

function generateResume() {
    document.getElementById("previewName").innerText = document.getElementById("name").value || "Your Name";
    document.getElementById("previewJobTitle").innerText = document.getElementById("jobTitle").value || "Job Title";
    document.getElementById("previewSkills").innerText = document.getElementById("skills").value || "Your skills here";
    document.getElementById("previewExperience").innerText = document.getElementById("experience").value || "Your experience here";
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text(document.getElementById("previewName").innerText, 20, 20);
    doc.text(document.getElementById("previewJobTitle").innerText, 20, 30);
    doc.text("Skills:", 20, 40);
    doc.text(document.getElementById("previewSkills").innerText, 20, 50);
    doc.text("Experience:", 20, 60);
    doc.text(document.getElementById("previewExperience").innerText, 20, 70);
    
    doc.save("Resume.pdf");
}
