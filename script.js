document.querySelectorAll('.dot.core').forEach(dot => {
  dot.addEventListener('click', () => {
    dot.classList.toggle('active');
  });
});

const coreToggle = document.getElementById('core-toggle');

coreToggle.addEventListener('change', () => {
const isOn = coreToggle.checked;

// Toggle label visibility
document.getElementById('core-label-on').style.display = isOn ? 'inline' : 'none';
document.getElementById('core-label-off').style.display = isOn ? 'none' : 'inline';

const groups = isOn
  ? {
      red: ['Strength', 'Focus', 'Charisma'],
      green: ['Dexterity', 'Wits', 'Subterfuge'],
      blue: ['Endurance', 'Resolve', 'Awareness']
    }
  : {
      red: ['Strength', 'Dexterity', 'Endurance'],
      green: ['Focus', 'Wits', 'Resolve'],
      blue: ['Charisma', 'Subterfuge', 'Awareness']
    };

document.querySelectorAll('.section.grid').forEach(section => {
  section.querySelectorAll('div').forEach(div => {
    const label = div.querySelector('label');
    const dots = div.querySelectorAll('.dot.core');

    if (!label || dots.length === 0) return;

    const text = label.textContent.trim();

    dots.forEach(dot => {
      dot.classList.remove('red', 'green', 'blue');
      if (groups.red.includes(text)) dot.classList.add('red');
      else if (groups.green.includes(text)) dot.classList.add('green');
      else if (groups.blue.includes(text)) dot.classList.add('blue');
    });
  });
});
});



document.querySelectorAll('.dot.skill').forEach(dot => {
  dot.addEventListener('click', () => {
    if (dot.classList.contains('red')) {
      dot.classList.remove('red');
      dot.classList.remove('orange');
    } else if (dot.classList.contains('orange')) {
      dot.classList.remove('orange');
      dot.classList.add('red');
    } else {
      dot.classList.add('orange');
    }
  });
});

document.querySelectorAll('.dot.health').forEach(dot => {
  dot.addEventListener('click', () => {
    dot.classList.toggle('active');
  });
});

document.querySelectorAll('.dot.sanity').forEach(dot => {
dot.addEventListener('click', () => {
  if (dot.classList.contains('full')) {
    dot.classList.remove('full');
  } else if (dot.classList.contains('half')) {
    dot.classList.remove('half');
    dot.classList.add('full');
  } else {
    dot.classList.add('half');
  }
});
});

document.querySelectorAll('.dot.bond').forEach(dot => {
dot.addEventListener('click', () => {
  dot.classList.toggle('active');
});
});

document.querySelectorAll('.dot.training').forEach(dot => {
dot.addEventListener('click', () => {
  if (dot.classList.contains('black')) {
    dot.classList.remove('black');
  } else if (dot.classList.contains('orange')) {
    dot.classList.remove('orange');
    dot.classList.add('black');
  } else if (dot.classList.contains('yellow')) {
    dot.classList.remove('yellow');
    dot.classList.add('orange');
  } else {
    dot.classList.add('yellow');
  }
});
});


function saveCharacter(filename = "character") {
  const data = {
    agent: document.getElementById("agent").value,
    player: document.getElementById("player").value,
    dots: {}

  };
  
// Save core toggle state
data.coreToggle = document.getElementById("core-toggle").checked;

  document.querySelectorAll('.dot').forEach((dot, i) => {
    data.dots[i] = {
      classes: [...dot.classList]
    };
  });

document.querySelectorAll('input[type="text"]').forEach(input => {
if (input.classList.contains('combat-weapon') || input.classList.contains('bond-name')) return;

const key = input.id || input.previousElementSibling?.innerText.toLowerCase();
if (key) data[key] = input.value;
});
  
  // Save bond names
data.bonds = [];
document.querySelectorAll('.bond-name').forEach(input => {
data.bonds.push(input.value);
});
  
// Save extra text areas
data.personalNotes = document.getElementById("personal-notes").value;
data.wounds = document.getElementById("wounds").value;
data.equipment = document.getElementById("equipment").value;

data.combat = [];

const weapons = document.querySelectorAll('.combat-weapon');
const skills = document.querySelectorAll('.combat-skill');
const ranges = document.querySelectorAll('.combat-range');
const types = document.querySelectorAll('.combat-type');
const damages = document.querySelectorAll('.combat-damage');

for (let i = 0; i < weapons.length; i++) {
data.combat.push({
  weapon: weapons[i]?.value || "",
  skill: skills[i]?.value || "",
  range: ranges[i]?.value || "",
  type: types[i]?.value || "",
  damage: damages[i]?.value || ""
});
}
  
  data.missionNotes = missionNotes;


  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename + ".json";
  link.click();
}

function loadCharacter(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = JSON.parse(e.target.result);
    if (data.agent) document.getElementById("agent").value = data.agent;
    if (data.player) document.getElementById("player").value = data.player;

    // Load core toggle state
const coreToggleInput = document.getElementById("core-toggle");
coreToggleInput.checked = data.coreToggle || false;
coreToggleInput.dispatchEvent(new Event('change')); // Trigger visual and color updates
    
if (Array.isArray(data.combat)) {
const weapons = document.querySelectorAll('.combat-weapon');
const skills = document.querySelectorAll('.combat-skill');
const ranges = document.querySelectorAll('.combat-range');
const types = document.querySelectorAll('.combat-type');
const damages = document.querySelectorAll('.combat-damage');

data.combat.forEach((entry, i) => {
  if (weapons[i]) weapons[i].value = entry.weapon || "";
  if (skills[i]) skills[i].value = entry.skill || "Melee";
  if (ranges[i]) ranges[i].value = entry.range || "Close";
  if (types[i]) types[i].value = entry.type || "Bludgeoning";
  if (damages[i]) damages[i].value = entry.damage || "+1";
});
}

    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.className = "dot";
      data.dots[i]?.classes?.forEach(cls => {
        if (cls !== "dot") dot.classList.add(cls);
      });
    });

    document.querySelectorAll('input[type="text"]').forEach(input => {
      const key = input.id || input.previousElementSibling?.innerText.toLowerCase();
      if (key && data[key] !== undefined) input.value = data[key];
    });
    
    // Load bond names
if (Array.isArray(data.bonds)) {
document.querySelectorAll('.bond-name').forEach((input, index) => {
  input.value = data.bonds[index] || "";
});
}

// Load extra text areas
if (data.personalNotes) document.getElementById("personal-notes").value = data.personalNotes;
if (data.wounds) document.getElementById("wounds").value = data.wounds;
if (data.equipment) document.getElementById("equipment").value = data.equipment;   
    
missionNotes = Array.isArray(data.missionNotes) ? data.missionNotes : [];
renderMissionNotes();
updateTagFilterOptions();

    
    setSheetLocked(true); // Lock after loading a character
    

    
  };
  reader.readAsText(file);
}



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
document.getElementById('core-toggle').dispatchEvent(new Event('change')); 

missionNotes = [];
renderMissionNotes();
updateTagFilterOptions();



setSheetLocked(false); // Unlock after reset


}

// Force initial attribute color setup based on toggle state
window.addEventListener('DOMContentLoaded', () => {
document.getElementById('core-toggle').dispatchEvent(new Event('change'));
});

//Info Button
function toggleInfo(button) {
const popup = button.nextElementSibling;
popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

function openSaveModal() {
document.getElementById("save-modal").style.display = "block";
document.getElementById("filename-input").value = ""; // reset
}

function closeSaveModal() {
document.getElementById("save-modal").style.display = "none";
}

function confirmSave() {
const filename = document.getElementById("filename-input").value.trim() || "character";
closeSaveModal();
saveCharacter(filename);
}

const darkToggle = document.getElementById("dark-toggle");

// Load saved preference
if (localStorage.getItem("darkMode") === "true") {
document.body.classList.add("dark");
darkToggle.checked = true;
}

darkToggle.addEventListener("change", () => {
document.body.classList.toggle("dark", darkToggle.checked);
localStorage.setItem("darkMode", darkToggle.checked);
});

// Dice Roller Open/Close
document.getElementById('dice-roller-toggle').addEventListener('click', () => {
document.getElementById('dice-modal').style.display = 'block';

// Reset dots to yellow on open
document.querySelectorAll('#dice-modal .dot').forEach(dot => {
  dot.classList.remove('orange', 'red');
  dot.classList.add('yellow');
});
});


function closeDiceModal() {
document.getElementById('dice-modal').style.display = 'none';
}

// Cycle dot colors (like skill dots)
// Initialize dice roller dots with yellow fill
document.querySelectorAll('#dice-modal .dot').forEach(dot => {
dot.classList.add('yellow'); // start yellow

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

//Roll Function
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

const roll = randomFromArray(diceTables[color]);
total += roll;

const result = document.createElement('div');
result.classList.add('dice-result', color);
result.innerHTML = `<span class="dice-color-square ${color}"></span> <span class="dice-value">${roll}</span>`;

// Apply staggered animation delay
result.style.animationDelay = `${index * 0.2}s`;

resultsBox.appendChild(result);
});


const totalDiv = document.createElement('div');
totalDiv.classList.add('dice-total');
totalDiv.innerText = `Total: ${total}`;
resultsBox.appendChild(totalDiv);

resultsBox.style.display = 'block';
}

function randomFromArray(arr) {
return arr[Math.floor(Math.random() * arr.length)];
}


// Utility
function capitalize(str) {
return str.charAt(0).toUpperCase() + str.slice(1);
}

const lockToggle = document.getElementById('lock-toggle');

function setSheetLocked(locked) {
const allInputs = document.querySelectorAll('input, select, textarea');
const allDots = document.querySelectorAll('.dot');

allInputs.forEach(el => {
  if (el.type !== 'file') el.disabled = locked;
});

allDots.forEach(dot => {
// Only disable non-dice roller dots
const insideDiceModal = dot.closest('#dice-modal');
if (!insideDiceModal) {
  dot.style.pointerEvents = locked ? 'none' : 'auto';
}
});

lockToggle.classList.toggle('locked', locked);
lockToggle.innerText = locked ? '🔒 Locked' : '🔓 Unlocked';
}

// Toggle button
lockToggle.addEventListener('click', () => {
const isLocked = lockToggle.classList.contains('locked');
setSheetLocked(!isLocked);
});

let missionNotes = [];

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

missionNotes.push(note);
renderMissionNotes();
updateTagFilterOptions();

// Clear form
document.getElementById('mission-title').value = '';
document.getElementById('mission-body').value = '';
document.getElementById('mission-tags').value = '';
}


function renderMissionNotes() {
const container = document.getElementById('mission-notes-list');
const tagFilter = document.getElementById('tag-filter')?.value || '';
const sortOrder = document.getElementById('sort-order')?.value || 'desc';

container.innerHTML = '';

// Apply filter
let filtered = missionNotes.filter(note => {
  if (!tagFilter) return true;
  return note.tags?.includes(tagFilter);
});

// Sort by date (most recent or oldest first)
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

//Delete Mission Notes

function deleteMissionNote(index) {
if (confirm("Are you sure you want to delete this note?")) {
  missionNotes.splice(index, 1);
  renderMissionNotes();
  updateTagFilterOptions();
}
}

//Edit Mission Notes

function editMissionNote(index) {
const note = missionNotes[index];
if (!note) return;

// Pre-fill the input fields
document.getElementById('mission-title').value = note.title || '';
document.getElementById('mission-body').value = note.body || '';
document.getElementById('mission-tags').value = note.tags?.join(', ') || '';

// Remove the old note from the list
missionNotes.splice(index, 1);
renderMissionNotes();
updateTagFilterOptions();
}










