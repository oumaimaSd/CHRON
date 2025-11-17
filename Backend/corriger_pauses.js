// corriger_pauses.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

db.all("SELECT id, pauses FROM taches", [], (err, rows) => {
  if (err) return console.error(err);

  rows.forEach(t => {
    if (!t.pauses) return;
    let pauses = [];
    try { pauses = JSON.parse(t.pauses); } catch { pauses = []; }
    let total = 0;
    pauses.forEach(p => {
      if (p.debut && p.fin) {
        let diff = (new Date(p.fin) - new Date(p.debut)) / 60000;
        if (diff < 0) diff += 24 * 60; // ✅ si pause après minuit
        total += diff;
      }
    });
    db.run("UPDATE taches SET dureePause=? WHERE id=?", [total, t.id]);
  });

  console.log("✅ Correction des durées de pause terminée.");
});
