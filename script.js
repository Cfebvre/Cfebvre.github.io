document.querySelectorAll('.dot.core').forEach(dot => {
  dot.addEventListener('click', () => {
    dot.classList.toggle('active');
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


function saveCharacter() {
  const data = {
    agent: document.getElementById("agent").value,
    player: document.getElementById("player").value,
    dots: {}
  };

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

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "character.json";
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
}

