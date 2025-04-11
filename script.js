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
    console.log("Toggled class:", hamburgerMenu.classList);
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

  // Dice roller dot color cycling
  document.querySelectorAll('#dice-modal .dot').forEach(dot => {
    dot.classList.add('yellow'); // Ensure yellow by default
    dot.addEventListener('click', () => {
      if (dot.classList.contains('yellow')) {
        dot.classList.remove('yellow');
        dot.classList.add('orange');
      } else if (dot.classList.contains('orange')) {
        dot.classList.remove('orange');
        dot.classList.add('red');
      } else if (dot.classList.contains('red')) {
        dot.classList.remove('red');
        dot.classList.add('yellow');
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

//Open-Close Dice Modal 

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

//Dice Roller Logic

function rollDice() {
  const diceDots = document.querySelectorAll('#dice-modal .dot');
  const diceTables = {
    yellow: [0, 0, 0, 1, 1, 2],
    orange: [0, 0, 1, 1, 2, 2],
    red: [0, 1, 1, 2, 2, 2]
  };

  const resultsBox = document.getElementById('dice-results');
  resultsBox.innerHTML = ''; // Clear previous results

  let total = 0;

  diceDots.forEach((dot, index) => {
    let color = 'yellow';
    if (dot.classList.contains('red')) color = 'red';
    else if (dot.classList.contains('orange')) color = 'orange';

    const roll = diceTables[color][Math.floor(Math.random() * 6)];
    total += roll;

    const result = document.createElement('div');
    result.classList.add('dice-result', color);
    result.innerHTML = `<span class="dice-color-square ${color}"></span> <span class="dice-value">${roll}</span>`;

    result.style.animationDelay = `${index * 0.2}s`; // Optional animation
    resultsBox.appendChild(result);
  });

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('dice-total');
  totalDiv.innerText = `Total: ${total}`;
  resultsBox.appendChild(totalDiv);

  resultsBox.style.display = 'block';
}

//Gather Character Data

function gatherCharacterData() {
  const data = {
    agent: document.getElementById("agent")?.value || "",
    player: document.getElementById("player")?.value || "",
    coreToggle: document.getElementById("core-toggle")?.checked || false,
    dots: {},
    bonds: [],
    combat: [],
    personalNotes: document.getElementById("personal-notes")?.value || "",
    wounds: document.getElementById("wounds")?.value || "",
    equipment: document.getElementById("equipment")?.value || ""
  };

  // Save dots
  document.querySelectorAll(".dot").forEach((dot, i) => {
    data.dots[i] = {
      classes: [...dot.classList]
    };
  });

  // Bond names
  document.querySelectorAll(".bond-name").forEach(input => {
    data.bonds.push(input.value || "");
  });

  // Combat fields
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

  // Mission notes (if applicable)
  if (typeof missionNotes !== "undefined") {
    data.missionNotes = missionNotes;
  }

  return data;
}

//Open-Close-Confirm Save Modal

function openSaveModal() {
  const modal = document.getElementById("save-modal");
  const filenameInput = document.getElementById("filename-input");

  if (modal && filenameInput) {
    filenameInput.value = "";
    modal.style.display = "block";
  }
}

function closeSaveModal() {
  const modal = document.getElementById("save-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

function confirmSave() {
  const filenameInput = document.getElementById("filename-input");
  const filename = filenameInput?.value.trim() || "character";
  closeSaveModal();
  saveCharacter(filename);
}

//Save Character Locally

function saveCharacter(filename = "character") {
  const data = gatherCharacterData(); // Assuming this already exists
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.json`;
  link.click();
}


//Load Character Locally

function loadCharacter(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      loadCharacterFromData(data); // assumes this is already defined
    } catch (err) {
      console.error("Error reading character file:", err);
      alert("❌ Invalid character file.");
    }
  };

  reader.readAsText(file);
}

//Load Character From Data

function loadCharacterFromData(data) {
  if (!data) return;

  // Agent & Player
  document.getElementById("agent").value = data.agent || "";
  document.getElementById("player").value = data.player || "";

  // Core Toggle
  const coreToggleInput = document.getElementById("core-toggle");
  if (coreToggleInput) {
    coreToggleInput.checked = !!data.coreToggle;
    coreToggleInput.dispatchEvent(new Event("change"));
  }

  // Dots
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.className = "dot";
    data.dots?.[i]?.classes?.forEach(cls => {
      if (cls !== "dot") dot.classList.add(cls);
    });
  });

  // Text fields (excluding special class ones)
  document.querySelectorAll('input[type="text"]').forEach(input => {
    const key = input.id || input.previousElementSibling?.innerText.toLowerCase();
    if (key && !input.classList.contains("combat-weapon") && !input.classList.contains("bond-name")) {
      if (data[key] !== undefined) input.value = data[key];
    }
  });

  // Bonds
  if (Array.isArray(data.bonds)) {
    document.querySelectorAll(".bond-name").forEach((input, i) => {
      input.value = data.bonds[i] || "";
    });
  }

  // Combat fields
  const weapons = document.querySelectorAll(".combat-weapon");
  const skills = document.querySelectorAll(".combat-skill");
  const ranges = document.querySelectorAll(".combat-range");
  const types = document.querySelectorAll(".combat-type");
  const damages = document.querySelectorAll(".combat-damage");

  if (Array.isArray(data.combat)) {
    data.combat.forEach((entry, i) => {
      if (weapons[i]) weapons[i].value = entry.weapon || "";
      if (skills[i]) skills[i].value = entry.skill || "Melee";
      if (ranges[i]) ranges[i].value = entry.range || "Close";
      if (types[i]) types[i].value = entry.type || "Bludgeoning";
      if (damages[i]) damages[i].value = entry.damage || "+1";
    });
  }

  // Notes
  document.getElementById("personal-notes").value = data.personalNotes || "";
  document.getElementById("wounds").value = data.wounds || "";
  document.getElementById("equipment").value = data.equipment || "";

  // Mission Notes (if present)
  if (Array.isArray(data.missionNotes)) {
    missionNotes = data.missionNotes;
    renderMissionNotes?.(); // Only call if function exists
    updateTagFilterOptions?.();
  }

  // Lock sheet after loading
  setSheetLocked(true);
}

// Reset CHaracter

function resetCharacter() {
  // Clear all text inputs and bond names
  document.querySelectorAll('input[type="text"]').forEach(input => input.value = "");
  document.querySelectorAll('textarea').forEach(area => area.value = "");

  // Reset dropdowns
  document.querySelectorAll('select').forEach(select => select.selectedIndex = 0);

  // Clear all dot states
  document.querySelectorAll('.dot').forEach(dot => {
    dot.className = 'dot ' + [...dot.classList].filter(cls =>
      ['core', 'skill', 'health', 'sanity', 'training', 'bond'].includes(cls)
    ).join(' ');
    dot.removeAttribute('data-returning'); // For sanity dots
  });

  // Reset and reapply core toggle coloring
  document.getElementById('core-toggle')?.dispatchEvent(new Event('change'));

  // Clear mission notes (if applicable)
  if (typeof missionNotes !== "undefined") {
    missionNotes = [];
    renderMissionNotes?.();
    updateTagFilterOptions?.();
  }

  // Unlock sheet
  setSheetLocked(false);
}

// Mission notes

function addMissionNote() {
  const title = document.getElementById('mission-title').value.trim();
  const body = document.getElementById('mission-body').value.trim();
  const tagsRaw = document.getElementById('mission-tags').value.trim();

  if (!title && !body) return;

  const tags = tagsRaw ? tagsRaw.split(',').map(tag => tag.trim()).filter(Boolean) : [];

  const note = {
    title,
    body,
    date: new Date().toLocaleDateString(),
    tags
  };

  if (typeof missionNotes === "undefined") {
    missionNotes = [];
  }

  missionNotes.push(note);
  renderMissionNotes?.();
  updateTagFilterOptions?.();

  // Clear form
  document.getElementById('mission-title').value = '';
  document.getElementById('mission-body').value = '';
  document.getElementById('mission-tags').value = '';
}

// Sort and Filter Mission Notes

function renderMissionNotes() {
  const container = document.getElementById('mission-notes-list');
  const tagFilter = document.getElementById('tag-filter')?.value || '';
  const sortOrder = document.getElementById('sort-order')?.value || 'desc';

  container.innerHTML = '';

  let filtered = missionNotes.filter(note => {
    if (!tagFilter) return true;
    return note.tags?.includes(tagFilter);
  });

  filtered.sort((a, b) => {
    const d1 = new Date(a.date);
    const d2 = new Date(b.date);
    return sortOrder === 'desc' ? d2 - d1 : d1 - d2;
  });

  filtered.forEach(note => {
    const div = document.createElement('div');
    div.className = 'mission-note-entry';
    div.innerHTML = `
      <h4>${note.title || '(Untitled Mission)'}</h4>
      <div class="date">${note.date}</div>
      <div>${note.body.replace(/\n/g, '<br>')}</div>
      ${note.tags?.length ? `<div><strong>Tags:</strong> ${note.tags.join(', ')}</div>` : ''}
      <div class="note-controls">
        <button onclick="editMissionNote(${missionNotes.indexOf(note)})">Edit</button>
        <button onclick="deleteMissionNote(${missionNotes.indexOf(note)})">Delete</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function updateTagFilterOptions() {
  const tagFilter = document.getElementById('tag-filter');
  if (!tagFilter) return;

  const tagsSet = new Set();
  missionNotes.forEach(note => {
    note.tags?.forEach(tag => tagsSet.add(tag));
  });

  const current = tagFilter.value;
  tagFilter.innerHTML = '<option value="">All</option>';
  [...tagsSet].sort().forEach(tag => {
    const opt = document.createElement('option');
    opt.value = tag;
    opt.innerText = tag;
    tagFilter.appendChild(opt);
  });

  tagFilter.value = current;
}

//Toggle Tooltip Info

function toggleInfo(button) {
  const popup = button.nextElementSibling;
  if (popup) {
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  }
}
