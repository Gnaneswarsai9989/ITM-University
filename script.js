/* =========================================================
   ITM UNIVERSITY WEBSITE — SCRIPT.JS
   1. Hero image slider (auto + dots)
   2. Mobile nav toggle
   3. Apply Now modal open/close
   4. Form submit -> Google Apps Script -> Google Sheet
   ========================================================= */

/* --------- IMPORTANT: PASTE YOUR GOOGLE APPS SCRIPT URL HERE --------- */
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxYh7Xh3CbyUxpyooB9YnuWGizB1qLgCYkmhmghzWynp_62-gGyew1aXDmiIG18UTjvUQ/exec";
/* ---------------------------------------------------------------------- */

/* =========================================================
   STATE → CITIES MAP  (28 States + 8 UTs)
   ========================================================= */
const STATE_CITIES = {
  "Andhra Pradesh":        ["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool","Rajahmundry","Tirupati","Kadapa","Kakinada","Anantapur","Eluru","Ongole","Chittoor","Other"],
  "Arunachal Pradesh":     ["Itanagar","Naharlagun","Tawang","Pasighat","Ziro","Bomdila","Tezu","Aalo","Other"],
  "Assam":                 ["Guwahati","Silchar","Dibrugarh","Jorhat","Nagaon","Tinsukia","Tezpur","Bongaigaon","Diphu","Karimganj","Goalpara","Other"],
  "Bihar":                 ["Patna","Gaya","Bhagalpur","Muzaffarpur","Purnia","Darbhanga","Bihar Sharif","Arrah","Begusarai","Katihar","Samastipur","Hajipur","Chapra","Bettiah","Motihari","Other"],
  "Chhattisgarh":          ["Raipur","Bhilai","Korba","Bilaspur","Durg","Rajnandgaon","Jagdalpur","Raigarh","Ambikapur","Chirmiri","Dhamtari","Other"],
  "Goa":                   ["Panaji","Vasco da Gama","Margao","Mapusa","Ponda","Bicholim","Curchorem","Other"],
  "Gujarat":               ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Junagadh","Gandhinagar","Anand","Bharuch","Morbi","Navsari","Gandhidham","Mehsana","Other"],
  "Haryana":               ["Faridabad","Gurugram","Panipat","Ambala","Yamunanagar","Rohtak","Hisar","Karnal","Sonipat","Panchkula","Bhiwani","Bahadurgarh","Sirsa","Other"],
  "Himachal Pradesh":      ["Shimla","Manali","Dharamshala","Solan","Mandi","Kullu","Baddi","Palampur","Bilaspur","Nahan","Una","Other"],
  "Jharkhand":             ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Deoghar","Phusro","Hazaribagh","Giridih","Ramgarh","Chirkunda","Medininagar","Other"],
  "Karnataka":             ["Bengaluru","Mysuru","Hubli","Dharwad","Mangaluru","Belagavi","Davanagere","Ballari","Vijayapura","Shivamogga","Tumakuru","Raichur","Bidar","Other"],
  "Kerala":                ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Palakkad","Alappuzha","Malappuram","Kannur","Kottayam","Kasaragod","Pathanamthitta","Other"],
  "Madhya Pradesh":        ["Bhopal","Indore","Gwalior","Jabalpur","Ujjain","Sagar","Dewas","Satna","Ratlam","Rewa","Katni","Singrauli","Chhindwara","Khandwa","Morena","Other"],
  "Maharashtra":           ["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Solapur","Thane","Amravati","Kolhapur","Nanded","Sangli","Malegaon","Jalgaon","Akola","Latur","Dhule","Other"],
  "Manipur":               ["Imphal","Thoubal","Bishnupur","Churachandpur","Ukhrul","Senapati","Kakching","Other"],
  "Meghalaya":             ["Shillong","Tura","Jowai","Nongpoh","Williamnagar","Baghmara","Resubelpara","Other"],
  "Mizoram":               ["Aizawl","Lunglei","Saiha","Champhai","Serchhip","Kolasib","Lawngtlai","Other"],
  "Nagaland":              ["Kohima","Dimapur","Mokokchung","Tuensang","Wokha","Zunheboto","Mon","Phek","Other"],
  "Odisha":                ["Bhubaneswar","Cuttack","Rourkela","Brahmapur","Sambalpur","Puri","Balasore","Bhadrak","Baripada","Jharsuguda","Angul","Other"],
  "Punjab":                ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali","Hoshiarpur","Moga","Pathankot","Firozpur","Ropar","Gurdaspur","Other"],
  "Rajasthan":             ["Jaipur","Jodhpur","Kota","Bikaner","Ajmer","Udaipur","Bhilwara","Alwar","Bharatpur","Sikar","Sri Ganganagar","Pali","Barmer","Other"],
  "Sikkim":                ["Gangtok","Namchi","Mangan","Gyalshing","Ravangla","Singtam","Other"],
  "Tamil Nadu":            ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Tiruppur","Vellore","Erode","Thoothukudi","Thanjavur","Dindigul","Kanchipuram","Other"],
  "Telangana":             ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Ramagundam","Mahbubnagar","Nalgonda","Adilabad","Suryapet","Siddipet","Other"],
  "Tripura":               ["Agartala","Udaipur","Dharmanagar","Kailashahar","Belonia","Ambassa","Other"],
  "Uttar Pradesh":         ["Lucknow","Kanpur","Agra","Varanasi","Meerut","Prayagraj","Ghaziabad","Noida","Bareilly","Aligarh","Moradabad","Saharanpur","Gorakhpur","Jhansi","Mathura","Firozabad","Muzaffarnagar","Rampur","Shahjahanpur","Bulandshahr","Other"],
  "Uttarakhand":           ["Dehradun","Haridwar","Roorkee","Haldwani","Rudrapur","Kashipur","Rishikesh","Kotdwar","Srinagar","Almora","Other"],
  "West Bengal":           ["Kolkata","Asansol","Siliguri","Durgapur","Bardhaman","Malda","Baharampur","Habra","Kharagpur","Shantipur","Haldia","Raiganj","Krishnanagar","Howrah","Other"],
  // Union Territories
  "Andaman & Nicobar Islands": ["Port Blair","Diglipur","Car Nicobar","Other"],
  "Chandigarh":            ["Chandigarh"],
  "Dadra & Nagar Haveli and Daman & Diu": ["Daman","Diu","Silvassa","Amli","Other"],
  "Delhi":                 ["New Delhi","North Delhi","South Delhi","East Delhi","West Delhi","Central Delhi","Dwarka","Rohini","Pitampura","Lajpat Nagar","Janakpuri","Saket","Karol Bagh","Other"],
  "Jammu & Kashmir":       ["Srinagar","Jammu","Anantnag","Baramulla","Sopore","Kathua","Udhampur","Punch","Rajouri","Other"],
  "Ladakh":                ["Leh","Kargil","Other"],
  "Lakshadweep":           ["Kavaratti","Agatti","Amini","Andrott","Other"],
  "Puducherry":            ["Puducherry","Karaikal","Mahe","Yanam","Other"]
};

document.addEventListener("DOMContentLoaded", () => {

  /* ============ 0. STATE → CITY DYNAMIC DROPDOWN ============ */
  const stateSelect = document.getElementById("state");
  const citySelect  = document.getElementById("city");

  stateSelect.addEventListener("change", () => {
    const cities = STATE_CITIES[stateSelect.value] || [];
    citySelect.innerHTML = `<option value="" disabled selected>Select City *</option>`;
    cities.forEach(city => {
      const opt = document.createElement("option");
      opt.textContent = city;
      citySelect.appendChild(opt);
    });
    citySelect.disabled = false;
    citySelect.value = "";
  });


  /* ============ 1. ABOUT SECTION GALLERY ============ */
  const gallerySlides = document.querySelectorAll(".about-gallery-slide");
  const galleryDotEls = document.querySelectorAll(".about-dot");
  const galleryPrevBtn = document.getElementById("galleryPrev");
  const galleryNextBtn = document.getElementById("galleryNext");
  let galleryCurrent = 0;
  let galleryTimer;

  function goToGallerySlide(index) {
    gallerySlides[galleryCurrent].classList.remove("active");
    galleryDotEls[galleryCurrent].classList.remove("active");
    galleryCurrent = (index + gallerySlides.length) % gallerySlides.length;
    gallerySlides[galleryCurrent].classList.add("active");
    galleryDotEls[galleryCurrent].classList.add("active");
    resetGalleryTimer();
  }

  function resetGalleryTimer() {
    clearInterval(galleryTimer);
    galleryTimer = setInterval(() => goToGallerySlide(galleryCurrent + 1), 4000);
  }

  if (gallerySlides.length > 0) {
    galleryPrevBtn.addEventListener("click", () => goToGallerySlide(galleryCurrent - 1));
    galleryNextBtn.addEventListener("click", () => goToGallerySlide(galleryCurrent + 1));
    galleryDotEls.forEach((dot, i) => dot.addEventListener("click", () => goToGallerySlide(i)));
    resetGalleryTimer();
  }

  /* ============ 2. MOBILE NAV TOGGLE ============ */

  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");

  hamburgerBtn.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
    });
  });

  /* ============ 3. APPLY NOW MODAL ============ */
  const modalOverlay = document.getElementById("modalOverlay");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const openTriggers = [
    document.getElementById("applyNowBtn"),
    document.getElementById("heroApplyBtn"),
    document.getElementById("aboutApplyBtn"),
    document.getElementById("contactApplyBtn"),
    document.getElementById("admApplyBtn")
  ];

  function openModal() {
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  openTriggers.forEach(btn => {
    if (btn) btn.addEventListener("click", openModal);
  });

  modalCloseBtn.addEventListener("click", () => {
    closeModal();
    setTimeout(() => { if (typeof resetModal === 'function') resetModal(); }, 400);
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
      setTimeout(() => { if (typeof resetModal === 'function') resetModal(); }, 400);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      setTimeout(() => { if (typeof resetModal === 'function') resetModal(); }, 400);
    }
  });

  /* ============ 4. FORM SUBMISSION ============ */
  const applyForm = document.getElementById("applyForm");
  const registerBtn = document.getElementById("registerBtn");
  const formStatus = document.getElementById("formStatus");
  const thankyouScreen = document.getElementById("thankyouScreen");
  const tyCloseBtn = document.getElementById("tyCloseBtn");
  const modalHeader = document.querySelector(".modal-header");

  function showThankyou() {
    applyForm.style.display = "none";
    modalHeader.style.display = "none";
    thankyouScreen.classList.add("visible");
  }

  function resetModal() {
    thankyouScreen.classList.remove("visible");
    applyForm.style.display = "";
    modalHeader.style.display = "";
    formStatus.textContent = "";
    formStatus.className = "form-status";
    // reset city dropdown
    citySelect.innerHTML = `<option value="" disabled selected>Select State First *</option>`;
    citySelect.disabled = true;
  }

  tyCloseBtn.addEventListener("click", () => {
    closeModal();
    setTimeout(resetModal, 400);
  });

  applyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById("fullName").value.trim(),
      email: document.getElementById("email").value.trim(),
      countryCode: document.getElementById("countryCode").value,
      mobile: document.getElementById("mobile").value.trim(),
      state: document.getElementById("state").value,
      city: document.getElementById("city").value,
      course: document.getElementById("course").value,
      specialization: document.getElementById("specialization").value,
      submittedAt: new Date().toLocaleString()
    };

    if (GOOGLE_SCRIPT_URL.includes("PASTE_YOUR_GOOGLE_APPS_SCRIPT")) {
      formStatus.textContent = "Setup needed: add your Google Apps Script URL in script.js";
      formStatus.className = "form-status error";
      console.warn("GOOGLE_SCRIPT_URL is not set. See README.md for setup instructions.");
      return;
    }

    registerBtn.disabled = true;
    registerBtn.textContent = "Submitting...";
    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {
      // no-cors mode is used because Google Apps Script web apps
      // do not return CORS headers by default. We optimistically
      // treat the request as successful if no network error occurs.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      applyForm.reset();
      showThankyou();

    } catch (err) {
      console.error("Form submission error:", err);
      formStatus.textContent = "Something went wrong. Please try again.";
      formStatus.className = "form-status error";
    } finally {
      registerBtn.disabled = false;
      registerBtn.textContent = "Register";
    }
  });

  /* ============ 5. Active nav link on scroll ============ */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  });

});
