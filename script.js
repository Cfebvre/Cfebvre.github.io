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
      const key = input.id || input.previousElementSibling?.innerText.toLowerCase();
      if (key) data[key] = input.value;
    });
    
    // Save bond names
data.bonds = [];
document.querySelectorAll('.bond-name').forEach(input => {
  data.bonds.push(input.value);
});

data.combat = {
  weapon: document.querySelector('.combat-weapon').value,
  skill: document.querySelector('.combat-skill').value,
  range: document.querySelector('.combat-range').value,
  type: document.querySelector('.combat-type').value,
  damage: document.querySelector('.combat-damage').value
};
  
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
      
      if (data.combat) {
  document.querySelector('.combat-weapon').value = data.combat.weapon || "";
  document.querySelector('.combat-skill').value = data.combat.skill || "Melee";
  document.querySelector('.combat-range').value = data.combat.range || "Close";
  document.querySelector('.combat-type').value = data.combat.type || "Bludgeoning";
  document.querySelector('.combat-damage').value = data.combat.damage || "+1";
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
    };
    reader.readAsText(file);
  }
  