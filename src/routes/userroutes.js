const express = require('express');
const router = express.Router();
const { connexion } = require('../../db/mysql');

// 🔽 GET - Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const [users] = await connexion.query('SELECT id, username, password_hash FROM users');
    res.json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔽 PUT - Modifier un utilisateur par ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Le nom d\'utilisateur est requis' });
  }

  try {
    await connexion.query('UPDATE users SET username = ? WHERE id = ?', [username, id]);
    res.json({ message: 'Utilisateur mis à jour' });
  } catch (err) {
    console.error('Erreur lors de la mise à jour :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// 🔽 DELETE - Supprimer un utilisateur par ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await connexion.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    console.error('Erreur lors de la suppression :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
