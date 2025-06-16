const db = require('../config/database');

const getAllTeams = async (req, res) => {
  try {
    db.all('SELECT * FROM team_data', [], (err, rows) => {
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

const getTeamByName = async (req, res) => {
  try {
    const teamName = req.params.teamName.toUpperCase();
    db.get('SELECT * FROM team_data WHERE team = ?', [teamName], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Time não encontrado.' });
      }
      res.json(row);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getChampionTeam = async (req, res) => {
  try {
    db.get('SELECT * FROM team_data WHERE champion = 1', [], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Time campeão não encontrado.' });
      }
      res.json(row);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getSecondPlaceTeam = async (req, res) => {
  try {
    db.get('SELECT * FROM team_data WHERE second_place = 1', [], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Time segundo colocado não encontrado.' });
      }
      res.json(row);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getThirdPlaceTeam = async (req, res) => {
  try {
    db.get('SELECT * FROM team_data WHERE third_place = 1', [], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ message: 'Time terceiro colocado não encontrado.' });
      }
      res.json(row);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const getTeamsWithMostGoals = async (req, res) => {
  try {
    db.all('SELECT * FROM team_data ORDER BY goals DESC LIMIT 5', [], (err, rows) => {
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

const getTeamsWithMostFoulsSuffered = async (req, res) => {
  try {
    db.all('SELECT * FROM team_data ORDER BY fouled DESC LIMIT 5', [], (err, rows) => {
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

module.exports = {
  getAllTeams,
  getTeamByName,
  getChampionTeam,
  getSecondPlaceTeam,
  getThirdPlaceTeam,
  getTeamsWithMostGoals,
  getTeamsWithMostFoulsSuffered
};
