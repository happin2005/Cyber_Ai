/* ===============================
   PAGE SYSTEM
================================= */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.style.display = "none");
  document.getElementById(id).style.display = "block";
}

showPage("msgChecker");

/* ===============================
   MESSAGE CHECKER (AI-style simulation)
================================= */
document.getElementById("scanMessageBtn").addEventListener("click", () => {
  const text = document.getElementById("messageInput").value.trim();
  const out = document.getElementById("messageResult");
  const aiAnalysis = document.getElementById("aiMessageAnalysis");
  const riskScoreEl = document.getElementById("messageRiskScore");

  if (!text) {
    out.textContent = "Please enter a message.";
    aiAnalysis.textContent = "";
    riskScoreEl.textContent = "";
    return;
  }

  const dangerWords = ["free","money","click","link","otp","password","bank","urgent"];
  const found = dangerWords.filter(w => text.toLowerCase().includes(w));

  let riskScore = Math.min(found.length * 20, 100); // 0-100%
  riskScoreEl.textContent = `Risk Score: ${riskScore}%`;

  if (found.length === 0) {
    out.innerHTML = `<span style="color:lightgreen">✅ Message is safe.</span>`;
    aiAnalysis.textContent = "Analysis: No suspicious patterns detected.";
  } else if (found.length <= 2) {
    out.innerHTML = `<span style="color:orange">⚠️ Message may be suspicious.</span>`;
    aiAnalysis.innerHTML = `Analysis: Detected words: <b>${found.join(", ")}</b>. Possible phishing or scam.`;
  } else {
    out.innerHTML = `<span style="color:red">❌ Message is dangerous!</span>`;
    aiAnalysis.innerHTML = `Analysis: Detected words: <b>${found.join(", ")}</b>. High risk of fraud or cybercrime.`;
  }
});

/* ===============================
   PASSWORD CHECKER & GENERATOR
================================= */
document.getElementById("checkPasswordBtn").addEventListener("click", () => {
  const pw = document.getElementById("passwordInput").value;
  const out = document.getElementById("passwordResult");
  const meter = document.getElementById("pwMeterBar");
  const suggestions = document.getElementById("pwSuggestions");

  if (!pw) {
    out.textContent = "Enter a password.";
    meter.style.width = "0%";
    suggestions.textContent = "";
    return;
  }

  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[\W]/.test(pw)) score++;

  const strength = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
  const colors = ["red","orange","yellow","lightgreen","green"];
  out.textContent = "Password Strength: " + strength[score];
  meter.style.width = (score*20) + "%";
  meter.style.backgroundColor = colors[score];

  let tips = [];
  if (pw.length < 8) tips.push("Make it at least 8 characters");
  if (!/[A-Z]/.test(pw)) tips.push("Add uppercase letters");
  if (!/[0-9]/.test(pw)) tips.push("Add numbers");
  if (!/[\W]/.test(pw)) tips.push("Add special characters");
  suggestions.innerHTML = tips.length ? "Suggestions: " + tips.join(", ") : "No suggestions needed.";
});

// PASSWORD GENERATOR
document.getElementById("generatePasswordBtn").addEventListener("click", () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let pw = "";
  for (let i=0;i<12;i++) pw += chars.charAt(Math.floor(Math.random()*chars.length));
  document.getElementById("passwordInput").value = pw;
  document.getElementById("checkPasswordBtn").click();
});

/* ===============================
   PHONE SAFETY REPORT
================================= */
document.getElementById("runScanBtn").addEventListener("click", () => {
  const out = document.getElementById("reportOutput");
  const canvas = document.getElementById("reportChart");
  const ctx = canvas.getContext("2d");

  const checks = [
    "Unknown Apps","Public WiFi","Browser Security","2FA Enabled","Suspicious Activity"
  ];

  const results = checks.map(() => Math.floor(Math.random()*2)); // 0=OK,1=Issue

  out.innerHTML = "<h3>Scan Result</h3>";
  checks.forEach((c,i) => {
    const status = results[i]===0 ? "✅ Safe":"⚠️ Issue Detected";
    out.innerHTML += `${c}: ${status}<br>`;
  });

  // DRAW SIMPLE BAR CHART
  ctx.clearRect(0,0,canvas.width,canvas.height);
  const barWidth = 60;
  results.forEach((v,i)=>{
    ctx.fillStyle = v===0 ? "lightgreen":"orange";
    const barHeight = v===0 ? 100 : 150;
    ctx.fillRect(i*80+30, 200-barHeight, barWidth, barHeight);
    ctx.fillStyle="white";
    ctx.fillText(checks[i], i*80+30, 195);
  });
});

// EXPORT REPORT
document.getElementById("exportReportBtn").addEventListener("click", () => {
  let reportContent = document.getElementById("reportOutput").innerHTML;
  let a = document.createElement("a");
  let blob = new Blob([reportContent], {type: "text/html"});
  a.href = URL.createObjectURL(blob);
  a.download = "CyberGuardian_Report.html";
  a.click();
});

/* ===============================
   SAFETY SCORE & BADGE
================================= */
document.getElementById("calcSafetyScore").addEventListener("click", () => {
  const checked = document.querySelectorAll("#tipsList input:checked").length;
  const total = document.querySelectorAll("#tipsList input").length;
  const score = Math.floor((checked/total)*100);
  const badgeEl = document.getElementById("safetyBadge");

  document.getElementById("safetyScore").textContent = `Your Safety Score: ${score}%`;

  if(score>=80) {
    badgeEl.textContent = "🏆 Cyber Safety Expert";
    badgeEl.style.backgroundColor = "green";
  } else if(score>=50) {
    badgeEl.textContent = "👍 Safe Surfer";
    badgeEl.style.backgroundColor = "orange";
  } else {
    badgeEl.textContent = "⚠️ Beginner - Stay Alert!";
    badgeEl.style.backgroundColor = "red";
  }
});
