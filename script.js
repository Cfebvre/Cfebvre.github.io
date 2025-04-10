//DOM Logic
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded");

  // Elements
  const darkModeButton = document.getElementById("dark-mode-button");
  const lockToggle = document.getElementById("lock-toggle");
  const hamburgerButton = document.getElementById("hamburger-toggle");
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const loadInput = document.getElementById("load-file");
  const coreToggle = document.getElementById("core-toggle");

  // Dark mode toggle
  const isDark = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark", isDark);
  if (darkModeButton) {
    darkModeButton.innerText = isDark ? "Light Mode" : "Dark Mode";
    darkModeButton.addEventListener("click", () => {
      const currentlyDark = document.body.classList.contains("dark");
      document.body.classList.toggle("dark", !currentlyDark);
      localStorage.setItem("darkMode", !currentlyDark);
      darkModeButton.innerText = currentlyDark ? "Dark Mode" : "Light Mode";
    });
  }

  // Lock toggle
  if (lockToggle) {
    lockToggle.addEventListener("click", () => {
      const isLocked = lockToggle.classList.contains("locked");
      setSheetLocked(!isLocked);
    });
  }

 // Hamburger menu toggle
if (hamburgerButton && hamburgerMenu) {
  hamburgerButton.addEventListener("click", () => {
    console.log("Hamburger button clicked!");
    hamburgerMenu.classList.toggle("show");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when clicking any link or button inside
  document.querySelectorAll('#hamburger-menu button, #hamburger-menu a').forEach(item => {
    item.addEventListener('click', () => {
      hamburgerMenu.classList.remove("show");
      document.body.classList.remove("menu-open");
    });
  });
}


  // File input
  if (loadInput) {
    loadInput.addEventListener("change", loadCharacter);
  }

  // Core Toggle Coloring
  if (coreToggle) {
    coreToggle.addEventListener("change", () => {
      const isOn = coreToggle.checked;
      document.getElementById("core-label-on").style.display = isOn ? "inline" : "none";
      document.getElementById("core-label-off").style.display = isOn ? "none" : "inline";
      const groups = isOn
        ? { red: ["Strength", "Focus", "Charisma"], green: ["Dexterity", "Wits", "Subterfuge"], blue: ["Endurance", "Resolve", "Awareness"] }
        : { red: ["Strength", "Dexterity", "Endurance"], green: ["Focus", "Wits", "Resolve"], blue: ["Charisma", "Subterfuge", "Awareness"] };

      document.querySelectorAll(".section.grid").forEach(section => {
        section.querySelectorAll("div").forEach(div => {
          const label = div.querySelector("label");
          const dots = div.querySelectorAll(".dot.core");
          if (!label || dots.length === 0) return;
          const text = label.textContent.trim();
          dots.forEach(dot => {
            dot.classList.remove("red", "green", "blue");
            if (groups.red.includes(text)) dot.classList.add("red");
            else if (groups.green.includes(text)) dot.classList.add("green");
            else if (groups.blue.includes(text)) dot.classList.add("blue");
          });
        });
      });
    });
    coreToggle.dispatchEvent(new Event("change"));
  }

  // Dot click behaviors
  document.querySelectorAll(".dot.core").forEach(dot => {
    dot.addEventListener("click", () => {
      dot.classList.toggle("active");
    });
  });

  document.querySelectorAll(".dot.skill").forEach(dot => {
    dot.addEventListener("click", () => {
      if (dot.classList.contains("red")) {
        dot.classList.remove("red", "orange");
      } else if (dot.classList.contains("orange")) {
        dot.classList.remove("orange");
        dot.classList.add("red");
      } else {
        dot.classList.add("orange");
      }
    });
  });

  document.querySelectorAll(".dot.health, .dot.bond").forEach(dot => {
    dot.addEventListener("click", () => {
      dot.classList.toggle("active");
    });
  });

  document.querySelectorAll(".dot.sanity").forEach(dot => {
    dot.addEventListener("click", () => {
      if (dot.classList.contains("full")) {
        dot.classList.remove("full");
      } else if (dot.classList.contains("half")) {
        dot.classList.remove("half");
        dot.classList.add("full");
      } else {
        dot.classList.add("half");
      }
    });
  });

  document.querySelectorAll(".dot.training").forEach(dot => {
    dot.addEventListener("click", () => {
      if (dot.classList.contains("black")) {
        dot.classList.remove("black");
      } else if (dot.classList.contains("orange")) {
        dot.classList.remove("orange");
        dot.classList.add("black");
      } else if (dot.classList.contains("yellow")) {
        dot.classList.remove("yellow");
        dot.classList.add("orange");
      } else {
        dot.classList.add("yellow");
      }
    });
  });

  document.querySelectorAll(".info-button").forEach(btn => {
    btn.addEventListener("click", () => {
      const popup = btn.nextElementSibling;
      if (popup) {
        popup.style.display = popup.style.display === "block" ? "none" : "block";
      }
    });
  });
});

function loadCharacter(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    loadCharacterFromData(data);
  };
  reader.readAsText(file);
}

function saveToFirebase(characterName, data) {
  if (!characterName) return;
  db.collection("characters").doc(characterName).set(data)
    .then(() => alert("✅ Character saved to cloud!"))
    .catch(err => {
      console.error("Save error:", err);
      alert("❌ Failed to save character.");
    });
}

async function loadFromFirebase(characterName) {
  try {
    const doc = await db.collection("characters").doc(characterName).get();
    if (doc.exists) {
      loadCharacterFromData(doc.data());
    } else {
      alert("❌ Character not found.");
    }
  } catch (err) {
    console.error("Load error:", err);
    alert("Error loading character.");
  }
}

function setSheetLocked(locked) {
  const allInputs = document.querySelectorAll("input, select, textarea");
  const allDots = document.querySelectorAll(".dot");
  const lockToggle = document.getElementById("lock-toggle");
  allInputs.forEach((el) => {
    if (el.type !== "file") el.disabled = locked;
  });
  allDots.forEach((dot) => {
    const insideDiceModal = dot.closest("#dice-modal");
    if (!insideDiceModal) {
      dot.style.pointerEvents = locked ? "none" : "auto";
    }
  });
  if (lockToggle) {
    lockToggle.classList.toggle("locked", locked);
    lockToggle.innerText = locked ? "🔒 Locked" : "🔓 Unlocked";
  }
}

function openDiceModal() {
  document.getElementById("dice-modal").style.display = "block";
  document.querySelectorAll("#dice-modal .dot").forEach(dot => {
    dot.classList.remove("orange", "red");
    dot.classList.add("yellow");
  });
}

function closeDiceModal() {
  document.getElementById("dice-modal").style.display = "none";
}
