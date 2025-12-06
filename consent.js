document.addEventListener("DOMContentLoaded", function () {
  let consent = localStorage.getItem("user_consent");

  if (!consent) {
    document.getElementById("consent-banner").style.display = "block";
  }
});

function acceptConsent() {
  localStorage.setItem("user_consent", "accepted");
  hideBanner();
}

function denyConsent() {
  localStorage.setItem("user_consent", "denied");
  hideBanner();
}

function hideBanner() {
  document.getElementById("consent-banner").style.display = "none";
}

function manageConsent() {
  alert("Here you can link your privacy settings page or modal.");
}
