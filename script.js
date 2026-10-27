// Hype Quotes List
const hypeQuotes = [
  "🌟 Fact: You are going to be the absolute most charismatic guest at the entire wedding!",
  "✈️ 20+ days of delicious tapas, churros, beautiful views, and celebration—get ready!",
  "💃 Your sister's wedding photos are going to look legendary with you in them!",
  "📸 Warning: Your phone storage will likely reach 100% capacity from all the amazing photos.",
  "☕ Official status: Certified VIP traveler ready to conquer Spain in style!",
  "✨ Spain isn't ready for the level of energy you're bringing to this trip!"
];

// Set this to the deployed Google Apps Script web app URL.
const GOOGLE_SHEETS_WEB_APP_URL = '';

// Generate Hype Logic
function generateHype() {
  const randomHype = hypeQuotes[Math.floor(Math.random() * hypeQuotes.length)];
  const hypeDisplay = document.getElementById('hypeDisplay');
  hypeDisplay.style.opacity = '0';
  setTimeout(() => {
    hypeDisplay.innerText = randomHype;
    hypeDisplay.style.opacity = '1';
  }, 150);
}

// Show Phrasebook Translation Logic
function showPhrase(emoji, spanish, english) {
  const phraseDisplay = document.getElementById('phraseDisplay');
  phraseDisplay.style.opacity = '0';
  setTimeout(() => {
    phraseDisplay.innerHTML = `<strong>${emoji} ${spanish}</strong><br><span style="font-size:0.83rem; color:#64748b;">("${english}")</span>`;
    phraseDisplay.style.opacity = '1';
  }, 150);
}

// Claim Coupon Logic & Custom Modal
async function claimCoupon(btn, couponName) {
  if (btn.classList.contains('claimed')) return;

  if (!GOOGLE_SHEETS_WEB_APP_URL) {
    showModal('Google Sheet not connected', 'Add your deployed Google Apps Script web app URL to script.js before claiming a coupon.');
    return;
  }

  btn.disabled = true;
  btn.innerText = 'Sending...';

  try {
    await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ coupon: couponName })
    });

    btn.innerText = '✓ Request sent';
    btn.classList.add('claimed');
    showModal(`🎟️ ${couponName} Submitted`, 'The claim request was sent.');
  } catch (error) {
    btn.disabled = false;
    btn.innerText = 'Claim Coupon';
    showModal('Unable to send claim', 'The claim could not be sent. Check your connection and try again.');
    console.error('Failed to send coupon claim to Google Sheets:', error);
  }
}

function showModal(title, message) {
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  modalTitle.innerText = title;
  modalBody.innerText = message;

  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}
