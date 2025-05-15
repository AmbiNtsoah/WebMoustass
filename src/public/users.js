document.getElementById("avatarBtn").addEventListener("click", () => {
  const menu = document.getElementById("dropdownMenu");
  menu.classList.toggle("hidden");
});
// Cacher le menu si on clique ailleurs
document.addEventListener("click", (e) => {
  const menu = document.getElementById("dropdownMenu");
  const button = document.getElementById("avatarBtn");

  if (!menu.contains(e.target) && !button.contains(e.target)) {
    menu.classList.add("hidden");
  }
});

// Fonction de déconnexion
function logout() {
      // Supprimer les données utilisateur (selon votre logique d'authentification)
      localStorage.removeItem("username");
      alert("Déconnexion ...");
      window.location.href = "login.html"; // Rediriger vers la page de connexion
    }

document.addEventListener("DOMContentLoaded", () => {
  fetch("/users")
    .then(response => {
      if (!response.ok) throw new Error("Erreur de chargement des utilisateurs");
      return response.json();
    })
    .then(users => {
      const tableBody = document.getElementById("messages-table-body");
      tableBody.innerHTML = "";

      users.forEach(user => {
        const row = document.createElement("tr");

        // ID
        const idCell = document.createElement("td");
        idCell.textContent = user.id;
        row.appendChild(idCell);

        // Username
        const usernameCell = document.createElement("td");
        usernameCell.textContent = user.username;
        row.appendChild(usernameCell);

        // Password (si tu veux l'afficher, attention aux risques de sécurité)
        const passwordCell = document.createElement("td");
        passwordCell.textContent = user.password_hash || "••••••";  // masque si besoin
        row.appendChild(passwordCell);

        // Actions
        const actionCell = document.createElement("td");

        // Bouton Modifier
        const editBtn = document.createElement("button");
        editBtn.textContent = "Modifier";
        editBtn.className = "read-btn";
        editBtn.onclick = () => {
          const nouveauUsername = prompt("Nouveau nom d'utilisateur :", user.username);
          if (nouveauUsername) {
            fetch(`/users/${user.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username: nouveauUsername })
            })
            .then(res => res.json())
            .then(() => location.reload())
            .catch(() => alert("Erreur lors de la modification"));
          }
        };
        actionCell.appendChild(editBtn);

        // Bouton Supprimer
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Supprimer";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => {
          if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
            fetch(`/users/${user.id}`, { method: "DELETE" })
              .then(res => res.json())
              .then(() => location.reload())
              .catch(() => alert("Erreur lors de la suppression"));
          }
        };
        actionCell.appendChild(deleteBtn);

        row.appendChild(actionCell);
        tableBody.appendChild(row);
      });
    })
    .catch(err => console.error("Erreur :", err));
});
