function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
const toggleButton = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
toggleButton.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// window.onclick = function (event) {
//     if (!event.target.matches('.navbar-toggle') && !event.target.matches('.navbar-toggle *')) {
//         const menu = document.getElementById('navbarMenu');
//         if (menu.classList.contains('show')) {
//             menu.classList.remove('show');
//         }
//     }
//     if (!event.target.matches('.profile-btn') && !event.target.matches('.profile-btn *')) {
//         const dropdowns = document.getElementsByClassName('profile-content');
//         for (let dropdown of dropdowns) {
//             if (dropdown.classList.contains('show')) {
//                 dropdown.classList.remove('show');
//             }
//         }
//     }
// }
function scrollHeader() {
    const nav = document.getElementById("home");
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 200) nav.classList.add("scroll-header");
    else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

// scroll to top
function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
    else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("generateBtn").addEventListener("click", generateReviews);
});

function sendGreeting() {
    const number = document.getElementById("whatsapp").value.trim();
    if (!number) {
        alert("Please enter a WhatsApp number.");
        return;
    }

    const message = encodeURIComponent("👋 Hi! Hope you're doing well. Just sending you a warm greeting from our team!");
    const link = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;
    window.open(link, '_blank');
}

// genration part
async function generateReviews() {
    const creditsEl = document.getElementById("creditCount");
    let currentCredits = parseInt(creditsEl.textContent, 10);

    if (currentCredits <= 0) {
        showPopup("Not Enough Credits", "Please buy more credits to generate reviews.", false);
        return;
    }
    const spinner = document.getElementById('spinner');
    const spinnerText = document.getElementById('spinnerText');
    const generateBtn = document.getElementById('generateBtn');
    const reviewShare = document.getElementById("share_review");
    const selectedLang = document.getElementById("language").value;

    spinner.style.display = "block";
    // spinnerText.textContent = "⏳ Generating reviews...";
    generateBtn.disabled = true;
    generateBtn.innerText = "Generating...";

    // const doctorNameRaw = document.getElementById('doctorName').value.trim();
    // const doctorName = doctorNameRaw
    //     ? doctorNameRaw.replace(/\b\w/g, c => c.toUpperCase())  // Capitalizes each word
    //     : "";

    // console.log("Doctor Name:", doctorName);
    const service = document.getElementById("service").value.trim();
    const keywords = document.getElementById("keywords").value.trim();

    // const service = document.getElementById('service').value.trim();
    // const keywords = document.getElementById('keywords').value.trim();
    // // const selectedLang = document.getElementById('language').value;
    // const doctorName = document.getElementById('doctorName').value.trim();
    // console.log("Doctor Name:", doctorName);

    // if (!service) {
    //     alert("Service is required.");
    //     return;
    // }

    // let prompt = `Write a unique than before single positive review for ${service} that includes these keywords: ${keywords} and in language ${selectedLang}. The review should be 50-80 words. Make it natural and authentic.`;
    var prompt = `Write a different single positive review than before addEventListener ${service} that includes these keywords: ${keywords} and in language but get me average ${selectedLang}. The review should be 40-60 words. Make it natural and authentic. so that i can just copy it dont give me headings, quotations ans start and end`;

    try {
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer sk-d5c0f57da5164b9fb0daa196d0232465",
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                "model": "deepseek-chat",
                "store": true,
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    {
                        role: "user", content: `make it quick Write a single positive, human genrated, unique than before review for ${service} that includes these keywords: ${keywords} and in language ${selectedLang}. The review should be 40-60 words. Make it natural and authentic do not get me heading or any note get me directly a review that i can directly copy and paste(without quotation),  if cannnot consist of service and keyword by default give me universal review based on a servic.`
                    }
                ]
                // inputs: `<|system|>You are a helpful review writing assistant.<|end|>\n<|user|>${prompt}<|end|>`
            })
        });

        const result = await response.json();
        // console.log("Generated Review:", data?.choices?.[0]?.message?.content);
        const generatedText = result?.choices?.[0]?.message?.content?.trim();


        // if (!generatedText) throw new Error("Invalid response from DeepSeek");
        console.log(generatedText)
        const review = generatedText;
        const reviewsDiv = document.getElementById("reviews");
        reviewsDiv.innerHTML = ""; // Remove existing review

        const box = document.createElement("div");
        box.className = "review-item selected"; // Make it selected by default
        box.setAttribute('data-original', review);
        box.innerText = review;

        // Optional: Allow toggle off only if user clicks again
        box.onclick = () => {
            box.classList.toggle("selected");
        };

        reviewsDiv.appendChild(box);


        generateBtn.innerText = "Regenerate Reviews";
        reviewShare.style.display = "block";
    } catch (err) {
        console.error(err);
        alert("Failed to generate reviews. Please try again.");
    } finally {
        spinner.style.display = "none";
        generateBtn.disabled = false;
    }
// Deduct 1 credit after successful review
    
}
window.addEventListener('DOMContentLoaded', () => {
    const savedCredits = localStorage.getItem('creditCount');
    if (savedCredits !== null) {
      document.getElementById("creditCount").textContent = savedCredits;
    }
  });
  
// 
function showConfirmModal() {
    document.getElementById("confirmModal").style.display = "flex";
}

function closeConfirmModal() {
    document.getElementById("confirmModal").style.display = "none";
}
function toggleCustomerForm() {
    const form = document.getElementById("customerForm");
    form.classList.toggle("hidden");
}
const creditEl = document.getElementById('creditCount');
    let currentCredits = parseInt(creditEl.textContent, 10);
// send review only 
function buyCredits(amount) {
    const creditEl = document.getElementById('creditCount');
    let currentCredits = parseInt(creditEl.textContent, 10);
    currentCredits += amount;
    creditEl.textContent = currentCredits;
    localStorage.setItem('creditCount', currentCredits);
    closeCreditsPopup();
    showPopup("Credits Added", `You've purchased ${amount} credits.`, true);
  }
  
function sendreview() {
    const whatsapp = document.getElementById("whatsapp").value;
    const selectedReviews = [...document.querySelectorAll('.review-item.selected')].map(div => div.innerText);
    const messages = [];
    selectedReviews.forEach((r, i) => {
        messages.push(`${r}`);
    });
    const allTxt = messages.join("\n\n");
    const enc = encodeURIComponent(allTxt);
    const url = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${enc}`;
    window.open(url, '_blank');
    currentCredits -= 1;
        document.getElementById("creditCount").textContent = currentCredits;
        localStorage.setItem('creditCount', currentCredits);
        showPopup("Review Generated", "1 credit deducted from your account.", true);
}
function confirmShare() {
    const name = document.getElementById("name").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const selectedReviews = [...document.querySelectorAll('.review-item.selected')].map(div => div.innerText);

    const messages = [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const reviewUrl = currentUser ? currentUser.reviewUrl : '';

    messages.push(`👋 Hi ${name}, hope you're doing well!`);
    messages.push(`⭐ We'd love to have your feedback on \n🔗 ${reviewUrl}`);

    const allText = messages.join("\n\n");
    const encoded = encodeURIComponent(allText);

    const url = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${encoded}`;
    window.open(url, '_blank');

    document.getElementById("popup").style.display = "block";
    setTimeout(() => {
        document.getElementById("popup").style.display = "none";
    }, 3000);

    closeConfirmModal();
    document.getElementById("reviewForm").reset();
    document.getElementById("reviews").innerHTML = "";
    document.getElementById("generateBtn").innerText = "Generate Reviews";
}
