# Mini Notes

Eine extrem einfache, mobile Notizen-Web-App ohne Framework und ohne Datenbank.

## Funktionen

- Notizen erstellen
- Notizen bearbeiten
- Notizen löschen
- Automatische Speicherung im Browser mit `localStorage`
- Dark Mode über die Systemeinstellung
- Optimiert für iPhone und iPad
- Nur HTML, CSS und JavaScript

## Dateien

- `index.html` – Grundaufbau der App
- `style.css` – Aussehen, Layout und Dark Mode
- `script.js` – Notizen-Logik und `localStorage`

## Starten

Öffne `index.html` direkt im Browser.

Alternativ kannst du im Projektordner einen kleinen lokalen Server starten:

```bash
python3 -m http.server 8000
```

Danach öffnest du:

```text
http://localhost:8000
```

## Hinweise

Die Notizen werden nur auf dem aktuellen Gerät und im aktuellen Browser gespeichert. Wenn du Browserdaten löschst, werden auch die Notizen gelöscht.
