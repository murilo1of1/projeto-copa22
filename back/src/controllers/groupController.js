const db = require('../config/database');

// Retorna todos os grupos e suas estatísticas
const getAllGroups = async (req, res) => {
  try {
    db.all('SELECT * FROM group_stats', [], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Retorna as estatísticas de um grupo específico
const getGroupByName = async (req, res) => {
  try {
    const groupName = req.params.groupName.toUpperCase();
    db.all('SELECT * FROM group_stats WHERE "group" = ?', [groupName], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: 'Grupo não encontrado.' });
      }
      res.json(rows);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllGroups,
  getGroupByName
};
