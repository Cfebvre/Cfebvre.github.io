// DOM Logic

document.addEventListener("DOMContentLoaded", () => {

console.log("✅ DOM fully loaded");

  // Dark Mode Toggle
  const darkModeButton = document.getElementById("dark-mode-button");
  const isDark = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark", isDark);
  if (darkModeButton) {
    darkModeButton.innerText = isDark ? "Light Mode" : "Dark Mode";
    darkModeButton.addEventListener("click", () => {
      const currentlyDark = document.body.classList.contains("dark");
      document.body.classList.toggle("dark", !currentlyDark);
      localStorage.setItem("darkMode", !currentlyDark);
      darkModeButton.innerText = currentlyDark ? "Dark Mode" : "Light Mode";
      console.log("darkModeButton:", darkModeButton);
    });
  }

  // Hamburger Menu Toggle
  const hamburgerButton = document.getElementById("hamburger-toggle");
  const hamburgerMenu = document.getElementById("hamburger-menu");

  if (hamburgerButton && hamburgerMenu) {
    hamburgerButton.addEventListener("click", () => {
      const isOpen = hamburgerMenu.style.display === "flex";
      hamburgerMenu.style.display = isOpen ? "none" : "flex";
      hamburgerMenu.classList.toggle("show", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
      console.log("hamburgerButton:", hamburgerButton);
    });
  }

  document.querySelectorAll('#hamburger-menu button, #hamburger-menu a').forEach(item => {
    item.addEventListener('click', () => {
      if (hamburgerMenu) {
        hamburgerMenu.style.display = "none";
        document.body.classList.remove("menu-open");
      }
    });
  });

  // Load file input
  const loadInput = document.getElementById("load-file");
  if (loadInput) {
    loadInput.addEventListener("change", loadCharacter);
  }

  // Lock toggle
  const lockToggle = document.getElementById('lock-toggle');
  if (lockToggle) {
    lockToggle.addEventListener('click', () => {
      const isLocked = lockToggle.classList.contains('locked');
      setSheetLocked(!isLocked);
      console.log("lockToggle:", lockToggle);
    });
  }

  // Trigger initial core coloring
  const coreToggle = document.getElementById("core-toggle");
  if (coreToggle) {
    coreToggle.dispatchEvent(new Event("change"));
  }

});

// Save to Firebase
function saveToFirebase(characterName, data) {
  if (!characterName) return;
  db.collection("characters").doc(characterName).set(data)
    .then(() => alert("✅ Character saved to cloud!"))
    .catch(err => {
      console.error("Save error:", err);
      alert("❌ Failed to save character.");
    });
}

// Load from Firebase
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

// Placeholder for your existing loadCharacterFromData function
function loadCharacterFromData(data) {
  if (!data) return;

  // Agent & Player Info
  if (data.agent) document.getElementById("agent").value = data.agent;
  if (data.player) document.getElementById("player").value = data.player;

  // Core Toggle State
  const coreToggleInput = document.getElementById("core-toggle");
  if (coreToggleInput) {
    coreToggleInput.checked = !!data.coreToggle;
    coreToggleInput.dispatchEvent(new Event("change"));
  }

  // Dot Classes
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.className = "dot"; // Reset classes
    data.dots?.[i]?.classes?.forEach(cls => {
      if (cls !== "dot") dot.classList.add(cls);
    });
  });

  // Generic Text Inputs
  document.querySelectorAll('input[type="text"]').forEach((input) => {
    const key = input.id || input.previousElementSibling?.innerText?.toLowerCase();
    if (key && data[key] !== undefined && !input.classList.contains("bond-name") && !input.classList.contains("combat-weapon")) {
      input.value = data[key];
    }
  });

  // Bonds
  if (Array.isArray(data.bonds)) {
    document.querySelectorAll(".bond-name").forEach((input, i) => {
      input.value = data.bonds[i] || "";
    });
  }

  // Combat Actions
  if (Array.isArray(data.combat)) {
    const weapons = document.querySelectorAll(".combat-weapon");
    const skills = document.querySelectorAll(".combat-skill");
    const ranges = document.querySelectorAll(".combat-range");
    const types = document.querySelectorAll(".combat-type");
    const damages = document.querySelectorAll(".combat-damage");

    data.combat.forEach((entry, i) => {
      if (weapons[i]) weapons[i].value = entry.weapon || "";
      if (skills[i]) skills[i].value = entry.skill || "Melee";
      if (ranges[i]) ranges[i].value = entry.range || "Close";
      if (types[i]) types[i].value = entry.type || "Bludgeoning";
      if (damages[i]) damages[i].value = entry.damage || "+1";
    });
  }

  // Extra Fields
  if (data.personalNotes) document.getElementById("personal-notes").value = data.personalNotes;
  if (data.wounds) document.getElementById("wounds").value = data.wounds;
  if (data.equipment) document.getElementById("equipment").value = data.equipment;

  // Mission Notes
  missionNotes = Array.isArray(data.missionNotes) ? data.missionNotes : [];
  renderMissionNotes();
  updateTagFilterOptions();

  // Lock the sheet after load
  setSheetLocked(true);
}

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



// Placeholder for your existing gatherCharacterData function
function gatherCharacterData() {
  const data = {
    agent: document.getElementById("agent").value,
    player: document.getElementById("player").value,
    coreToggle: document.getElementById("core-toggle").checked,
    dots: {},
    bonds: [],
    combat: [],
    personalNotes: document.getElementById("personal-notes").value,
    wounds: document.getElementById("wounds").value,
    equipment: document.getElementById("equipment").value,
    missionNotes
  };

  // Save dot states
  document.querySelectorAll(".dot").forEach((dot, i) => {
    data.dots[i] = {
      classes: [...dot.classList]
    };
  });

  // Save bond names
  document.querySelectorAll(".bond-name").forEach((input) => {
    data.bonds.push(input.value);
  });

  // Save combat actions
  const weapons = document.querySelectorAll(".combat-weapon");
  const skills = document.querySelectorAll(".combat-skill");
  const ranges = document.querySelectorAll(".combat-range");
  const types = document.querySelectorAll(".combat-type");
  const damages = document.querySelectorAll(".combat-damage");

  for (let i = 0; i < weapons.length; i++) {
    data.combat.push({
      weapon: weapons[i]?.value || "",
      skill: skills[i]?.value || "",
      range: ranges[i]?.value || "",
      type: types[i]?.value || "",
      damage: damages[i]?.value || ""
    });
  }

  return data;
}


// Placeholder for sheet lock logic
function setSheetLocked(locked) {
  const allInputs = document.querySelectorAll("input, select, textarea");
  const allDots = document.querySelectorAll(".dot");
  const lockToggle = document.getElementById("lock-toggle");

  // Disable/enable form fields
  allInputs.forEach((el) => {
    if (el.type !== "file") el.disabled = locked;
  });

  // Disable/enable dots (but NOT dice roller dots)
  allDots.forEach((dot) => {
    const insideDiceModal = dot.closest("#dice-modal");
    if (!insideDiceModal) {
      dot.style.pointerEvents = locked ? "none" : "auto";
    }
  });

  // Update lock button text and style
  if (lockToggle) {
    lockToggle.classList.toggle("locked", locked);
    lockToggle.innerText = locked ? "🔒 Locked" : "🔓 Unlocked";
  }
}

