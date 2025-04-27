
//Global var
let currentAgentId = null;

//DOM Logic
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded");

  // Elements
  const lockToggle = document.getElementById("lock-toggle");
  const hamburgerButton = document.getElementById("hamburger-toggle");
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const closeMenuButton = document.getElementById("closeMenu");
  const loginButton = document.getElementById("login");
  const mainLoginButton = document.getElementById("main-login-button");
const mainGoogleLogin = document.getElementById("main-google-login");
  const dropdown = document.querySelector(".hamburger-dropdown");
  console.log("🧪 loginButton found?", loginButton);
  console.log("🧪 hamburgerMenu:", hamburgerMenu);
console.log("🧪 dropdown:", dropdown);

  // Firebase Authentication
const auth = firebase.auth();
const db = firebase.firestore(); // ✅ Add this line

// Auth state listener
auth.onAuthStateChanged((user) => {
  if (loginButton) {
    if (user) {
      console.log(`✅ Signed in as ${user.displayName}`);
      loginButton.textContent = "Sign Out";
      loginButton.onclick = () => {
        auth.signOut().then(() => {
          console.log("🚪 Signed out");
          window.location.href = "index.html";
        });
      };

      // ✅ Show hamburger menu when signed in
      hamburgerButton?.classList.remove("hidden");

    } else {
      console.log("🚫 User is signed out");
      loginButton.textContent = "Sign In";
      loginButton.onclick = () => {
        console.log("🔁 Sign in clicked (header)");
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).catch(console.error);
      };

      // ✅ Hide hamburger menu when signed out
      hamburgerButton?.classList.add("hidden");
    }
  }

  // Main login button visibility
  if (mainLoginButton) {
    if (user) {
      mainLoginButton.classList.add("hidden");
    } else {
      mainLoginButton.classList.remove("hidden");
    }
  }
});

// Main Login Button
mainGoogleLogin?.addEventListener("click", () => {
  console.log("🔁 Sign in clicked (main button)");
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      console.log("✅ Signed in via main button:", result.user.displayName);
      mainLoginButton?.classList.add("hidden"); // ✅ manually hide
    })
    .catch(console.error);
});



  // Lock toggle
  if (lockToggle) {
    lockToggle.addEventListener("click", () => {
      const isLocked = lockToggle.classList.contains("locked");
      setSheetLocked(!isLocked);
    });
  }
  

 // Hamburger menu toggle
hamburgerButton?.addEventListener("click", () => {
hamburgerMenu?.classList.toggle("open");
});

document.querySelectorAll(".hamburger-menu a").forEach(link => {
  link.addEventListener("click", () => {
    hamburgerMenu?.classList.remove("open");
  });
});

closeMenuButton?.addEventListener("click", () => {
  hamburgerMenu?.classList.remove("open");
});

//Dice icon button

document.getElementById("dice-icon")?.addEventListener("click", () => {
  openDiceModal(); // ✅ existing function to open modal
});

//lock toggle button

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
    lockToggle.classList.toggle("unlocked", !locked);

    // Set correct SVG based on state
    lockToggle.innerHTML = locked
      ? `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
           <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
         </svg>` // 🔒 locked
      : `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
  <path d="M17 6a5 5 0 0 0-10 0v4"></path>
</svg>`; // 🔓 unlocked
  }
}

//Create Agent Button

document.getElementById("create-agent")?.addEventListener("click", () => {
  const newAgentId = crypto.randomUUID(); // Generate a brand new UUID
  localStorage.setItem("loadAgentId", newAgentId); // Store it for character-sheet.html
  console.log("🆕 Creating new agent with ID:", newAgentId);
  window.location.href = "character-sheet.html"; // Redirect
});

// Load Fallbacl Logic

const agentId = localStorage.getItem("loadAgentId");
  const agentName = localStorage.getItem("loadAgentName");

  if (agentId) {
    console.log(`📥 Loading agent by ID: ${agentId}`);
    loadFromFirebase(agentId);
    currentAgentId = agentId; // ✅ Save for later when saving
    localStorage.removeItem("loadAgentId");
  } else if (agentName) {
    console.log(`📥 Loading agent by NAME: ${agentName}`);
    loadFromFirebase(agentName);
    currentAgentId = agentName; // (fallback for old ones)
    localStorage.removeItem("loadAgentName");
  } else {
    console.log("ℹ️ No agent selected.");
  }


  // Core Attribute Dot Behavior (simple toggle fill)
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
      if (dot.classList.contains("white")) {
        dot.classList.remove("white");
      } else if (dot.classList.contains("orange")) {
        dot.classList.remove("orange");
        dot.classList.add("white");
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

  //Homepage Terminal Text Function

  const terminal = document.getElementById("terminal-text");
if (terminal) {
  const terminalLines = [
    "[DG-001] Secure uplink established…",
    "[PROTOCOL-SIGMA] Verifying agent credentials...",
    "Access Level: ███████████ confirmed",
    "Pulling blacksite telemetry…",
    "INTERNAL MEMO // REDACTED // THE PROGRAM IS LISTENING",
    "Agent trace: UNKNOWN ORIGIN // Routing through Oslo // Spoofing complete",
    "DG GREEN FLAGGED: CIRCLE OF THE VEIL // Initiating burn sequence",
    "[ENCRYPTION] Packet injection: ████████.███",
    "[LOG] Suspicious artifact found in ███████ farmhouse",
    "[NOTICE] You were never here."
  ];

  const gibberishSet = [
    "[xAF934] $%#*(@)987sfads...:::;",
    "> BINARY DUMP @ 0x00FFEC: ██ ░▒▓ █ █ █",
    ":::transcode(redirect) INJECT_$YZ##002",
    "!~Δ0110 ERROR: INTERFERENCE ON CHANNEL SIGMA",
    "[SYS_TRACER] C0RruPT//hex-seed::1992{…}",
    "### UPLINK LOST / NO ECHO RESPONSE",
    "(ↁ_ↁ) > route:nosleep.protocol.breach()",
    "-->[██]stack overflow. reroute through {mirror}",
    "//echo:echo:echo:██-██-██",
    "char[] VOIDSTREAM = {'d','e','l','t','a'};"
  ];

  let currentIndex = 0;
  let phase = "intro";

  // Setup 10 empty lines first
  const lines = [];
  for (let i = 0; i < terminalLines.length; i++) {
    const line = document.createElement("div");
    terminal.appendChild(line);
    lines.push(line);
  }

  function typeLine(lineEl, text, callback) {
    let i = 0;
    lineEl.textContent = '';
    lineEl.classList.add('terminal-cursor');

    const interval = setInterval(() => {
      lineEl.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        lineEl.classList.remove('terminal-cursor');
        callback();
      }
    }, 25); // Typing speed
  }

  function cycleTerminal() {
    const lineEl = lines[currentIndex];
    const nextText =
      phase === "intro"
        ? gibberishSet[Math.floor(Math.random() * gibberishSet.length)]
        : terminalLines[currentIndex];

    typeLine(lineEl, nextText, () => {
      currentIndex++;

      if (currentIndex >= terminalLines.length) {
        currentIndex = 0;
        phase = phase === "intro" ? "restore" : "intro";
      }

      setTimeout(cycleTerminal, 400);
    });

    terminal.scrollTop = terminal.scrollHeight;
  }

  // Initial pass with original lines typed in
  function startIntroLines(index = 0) {
    if (index >= terminalLines.length) {
      currentIndex = 0;
      setTimeout(cycleTerminal, 1000);
      return;
    }

    typeLine(lines[index], terminalLines[index], () => {
      setTimeout(() => startIntroLines(index + 1), 300);
    });
  }

  startIntroLines();
}

//Render Agent List
function renderAgentList(userId) {
  const container = document.getElementById("agent-cards");
  if (!container) return;

  console.log("🔍 Looking for agents owned by:", userId);

  db.collection("characters")
    .where("uid", "==", userId)
    .get()
    .then(snapshot => {
      console.log("📦 Docs found:", snapshot.size);
      if (snapshot.empty) {
        container.innerHTML = "<p>No agents found.</p>";
        return;
      }

      snapshot.forEach(doc => {
        console.log("🧪 Agent doc:", doc.id, doc.data());
        const data = doc.data();
        const card = document.createElement("div");
        card.classList.add("agent-card");
        card.style.border = "1px solid #333";
        card.style.padding = "1rem";
        card.style.background = "#111";
        card.style.borderRadius = "6px";
        card.style.cursor = "pointer";

        card.innerHTML = `
        <h4>${data.agent || "(Unnamed Agent)"}</h3>
        <p><strong>Status:</strong> ${data.status || "Unknown"}</p>
        <p><strong>Profession:</strong> ${data.profession || "N/A"}</p>
      `;

      card.addEventListener("click", () => {
        localStorage.setItem("loadAgentId", doc.id); // store by agentId (doc.id)
        window.location.href = "character-sheet.html";
      });

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("❌ Failed to load agents:", error);
    });
}

// Only run this on agent-profiles.html
if (window.location.pathname.includes("agent-profiles.html")) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      renderAgentList(user.uid);
    }
  });
}

// Auto-hide loading overlay after 2 seconds
const overlay = document.getElementById("loading-overlay");
if (overlay) {
  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.style.display = "none", 400);
  }, 2000);
}

//Save Icon Logic
document.getElementById("save-icon")?.addEventListener("click", () => {
  if (!currentAgentId) {
    alert("❌ No agent loaded. Cannot save.");
    return;
  }

  const data = gatherCharacterData();
  const user = firebase.auth().currentUser;

  if (!user) {
    alert("❌ You must be signed in to save.");
    return;
  }

  data.uid = user.uid; // ✅ Keep owner
  data.agentId = currentAgentId; // ✅ Attach the agentId if missing (optional but clean)

  saveToFirebase(currentAgentId, data); // ✅ Save to ID, not to agentName
});
//Home Button Back to Index Page
document.getElementById("logo-button")?.addEventListener("click", () => {
  window.location.href = "index.html";
});


});

//Saving Character to Firebase
// IMPORTS (if using module system)
// import { collection, doc, setDoc } from "firebase/firestore"; 

function saveToFirebase(characterName, data) {
  const user = firebase.auth().currentUser;
  if (!characterName || !user) return;

  // ✅ Assign UID if missing
  if (!data.agentId) {
    data.agentId = crypto.randomUUID(); // Modern browsers support crypto.randomUUID()
  }

  data.uid = user.uid; // Link to user

  console.log("📤 Saving character to Firebase:", data.agentId, data);

  db.collection("characters").doc(data.agentId).set(data)
    .then(() => alert("✅ Character saved to cloud!"))
    .catch(err => {
      console.error("❌ Failed to save character:", err);
      alert("❌ Failed to save character.");
    });
}


// Load Characters from Firebase

async function loadFromFirebase(agentId) {
  try {
    const doc = await db.collection("characters").doc(agentId).get();
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
    lockToggle.classList.remove("locked", "unlocked");
    lockToggle.classList.add(locked ? "locked" : "unlocked");

    // ✅ Correct: Inject SVG dynamically
    lockToggle.innerHTML = locked
      ? `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
           <rect x="3" y="11" width="18" height="10" rx="2" ry="2"/>
           <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
         </svg>` // Locked
      : `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#0f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
  <path d="M17 6a5 5 0 0 0-10 0v4"></path>
</svg>`; // Unlocked

    // ✅ Also: Update tooltip
    lockToggle.title = locked ? "Sheet Locked" : "Sheet Unlocked";
  }
}

//Open-Close Dice Modal 

function openDiceModal() {
  document.getElementById("dice-modal").style.display = "flex";
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
    result.classList.add('dice-result');
  
    // Delay each result's appearance
    result.style.animationDelay = `${index * 0.2}s`;
  
    result.innerHTML = `
      <span class="dice-color-dot ${color}"></span>
      <span class="dice-value">${roll}</span>
    `;
  
    resultsBox.appendChild(result);
  });

//Delay Results

  setTimeout(() => {
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('dice-total');
    totalDiv.innerText = `Total: ${total}`;
    resultsBox.appendChild(totalDiv);
  }, diceDots.length * 200); // Match the delay from above



  resultsBox.style.display = 'flex';
}

//Gather Character Data

function gatherCharacterData() {
  const data = {
    agent: document.getElementById("agent")?.value || "",
    age: document.getElementById("age")?.value || "",
    profession: document.getElementById("profession")?.value || "",
    status: document.getElementById("status")?.value || "Active",
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

//Load Character From Data

function loadCharacterFromData(data) {
  if (!data) return;

  // Agent & Player
  document.getElementById("agent").value = data.agent || "";
  document.getElementById("age").value = data.age || "";
  document.getElementById("profession").value = data.profession || "";
  document.getElementById("status").value = data.status || "Active";

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

  // Lock sheet after loading
  setSheetLocked(true);
}

//Toggle Tooltip Info

function toggleInfo(button) {
  // Try to find popup as a sibling of the label
  const label = button.closest("label");
  const parent = label?.parentElement;

  const popup = parent?.querySelector(".info-popup");
  if (popup) {
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  }
}
