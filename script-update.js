//DOM Logic
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM fully loaded");
  
    // Elements
    const darkModeButton = document.getElementById("dark-mode-button");
    const lockToggle = document.getElementById("lock-toggle");
    const hamburgerButton = document.getElementById("hamburger-toggle");
    const hamburgerMenu = document.getElementById("hamburger-menu");
    const coreToggle = document.getElementById("core-toggle");
  
    // Firebase Authentication
  const auth = firebase.auth();
  
  // Auth state listener
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(`✅ Signed in as ${user.displayName}`);
      // Optionally update the UI here
    } else {
      console.log("🚫 User is signed out.");
      // Optionally redirect or hide sensitive features here
    }
  });
  
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
  
  // Login button
  document.getElementById("login")?.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then((result) => {
        console.log(`🔐 Login successful: ${result.user.displayName}`);
      })
      .catch((error) => {
        console.error("❌ Login error:", error);
      });
  });
  
  // Logout button
  document.getElementById("logout")?.addEventListener("click", () => {
    auth.signOut()
      .then(() => {
        console.log("🚪 Logged out successfully.");
      })
      .catch((error) => {
        console.error("❌ Logout error:", error);
      });
  });
  
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
    
  
  });
  
  //Saving Character to Firebase
  // IMPORTS (if using module system)
  // import { collection, doc, setDoc } from "firebase/firestore"; 
  
  function saveToFirebase(characterName, data) {
    if (!characterName) return;
  
    console.log("📤 Saving character to Firebase:", characterName, data);
  
    db.collection("characters").doc(characterName).set(data)
      .then(() => alert("✅ Character saved to cloud!"))
      .catch(err => {
        console.error("❌ Failed to save character:", err);
        alert("❌ Failed to save character.");
      });
  }
  
  //Load Characters from Firebase
  
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
    document.getElementById("player").value = data.player || "";
  
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
