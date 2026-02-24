# 🌿 Pflanzenfinder – Installationsanleitung

## Was ist eine PWA?
Eine Progressive Web App (PWA) ist eine normale Webseite, die sich wie eine
echte App auf deinem Handy verhält:
- Eigenes Icon auf dem Homescreen
- Startet ohne Browser (Vollbild)
- Funktioniert offline
- Speichert alle Daten lokal auf dem Gerät

---

## Option 1: Kostenlos mit GitHub Pages (empfohlen)

### Schritt 1: GitHub-Account erstellen
1. Gehe zu https://github.com und registriere dich kostenlos

### Schritt 2: Neues Repository erstellen
1. Klicke auf das „+" oben rechts → „New repository"
2. Name: `pflanzenfinder` (oder ein anderer Name)
3. Wähle „Public"
4. Klicke „Create repository"

### Schritt 3: Dateien hochladen
1. Klicke auf „uploading an existing file"
2. Lade alle Dateien aus diesem ZIP hoch:
   - index.html
   - manifest.json
   - sw.js
   - icon-192.png
   - icon-512.png
3. Klicke „Commit changes"

### Schritt 4: GitHub Pages aktivieren
1. Gehe zu „Settings" im Repository
2. Scrolle zu „Pages" im linken Menü
3. Unter „Source": wähle „Deploy from a branch"
4. Branch: `main`, Ordner: `/ (root)`
5. Klicke „Save"
6. Nach 1-2 Minuten ist die App unter
   `https://DEIN-NAME.github.io/pflanzenfinder/` erreichbar

### Schritt 5: App auf Android installieren
1. Öffne Chrome auf deinem Android-Handy
2. Gehe zu deiner GitHub-Pages-URL
3. Chrome zeigt unten ein Banner „Zum Startbildschirm hinzufügen"
   → ODER: Menü (⋮) → „App installieren" / „Zum Startbildschirm hinzufügen"
4. Bestätigen – fertig! 🎉

---

## Option 2: Lokal über USB (ohne Internet)

### Am PC:
1. Installiere Node.js von https://nodejs.org
2. Öffne ein Terminal/Kommandozeile im Ordner mit den Dateien
3. Führe aus: `npx serve .`
4. Du siehst eine Adresse wie `http://192.168.1.100:3000`

### Am Handy (muss im gleichen WLAN sein):
1. Öffne Chrome
2. Gib die IP-Adresse ein (z.B. `http://192.168.1.100:3000`)
3. Menü → „Zum Startbildschirm hinzufügen"

⚠️ Hinweis: Für die Offline-Funktion und den Installations-Dialog
braucht die App HTTPS – das bietet GitHub Pages automatisch.
Über lokales Netzwerk funktioniert der Install-Prompt nicht,
aber die App läuft trotzdem.

---

## Option 3: Netlify Drop (sehr einfach, kostenlos)

1. Gehe zu https://app.netlify.com/drop
2. Ziehe den gesamten Ordner mit allen Dateien auf die Seite
3. Netlify gibt dir sofort eine URL (z.B. `https://zufälliger-name.netlify.app`)
4. Diese URL im Handy-Chrome öffnen → App installieren

---

## Tipps

- **Daten sichern**: In der App unter „Export" → „JSON exportieren"
  regelmäßig eine Sicherungskopie machen
- **Update**: Wenn du die App aktualisierst, einfach die Dateien
  erneut auf GitHub/Netlify hochladen – die App aktualisiert sich
  automatisch beim nächsten Öffnen mit Internet
- **Mehrere Geräte**: Exportiere deine Daten als JSON und importiere
  sie auf dem anderen Gerät

---

Erstellt mit ❤️ für Wildpflanzen-Sammler
