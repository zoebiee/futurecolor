const ingredientForm = document.getElementById("ingredient-form");
const ingredientenContainer = document.getElementById("ingredienten-container");
const pottenContainer = document.getElementById("potten-container");
const nieuwePotBtn = document.getElementById("nieuwe-pot");

let ingredientId = 0;
let potId = 0;

ingredientForm.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(ingredientForm);
  const snelheid = data.get("snelheid");
  const tijd = data.get("tijd");
  const kleur = data.get("kleur");
  const structuur = data.get("structuur");

  const div = document.createElement("div");
  div.classList.add("ingredient");
  div.draggable = true;
  div.dataset.snelheid = snelheid;
  div.dataset.tijd = tijd;
  div.dataset.kleur = kleur;
  div.dataset.structuur = structuur;
  div.dataset.id = ingredientId++;
  div.style.background = kleur;
  div.textContent = structuur;

  ingredientenContainer.appendChild(div);
});

nieuwePotBtn.addEventListener("click", () => {
  const pot = document.createElement("div");
  pot.classList.add("pot");
  pot.dataset.id = potId++;
  pottenContainer.appendChild(pot);
});
