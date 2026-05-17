# Todo Kacheln

Eine extrem einfache To-do-Web-App ohne Framework, ohne npm und ohne Datenbank.

## Ziel

- Nur HTML, CSS und JavaScript
- Speicherung mit `localStorage`
- Mobile-first für iPhone und iPad
- GitHub Pages kompatibel
- Keine externen Libraries
- Kein Build-System

## Funktionen

- Neue To-do-Kachel erstellen
- Titel bearbeiten
- Details hinzufügen
- Kachel löschen
- Als erledigt markieren
- Drag & Drop Sortierung
- Automatische Speicherung
- Dark Mode über Systemeinstellung

## Dateien

- `index.html` → Struktur der App
- `style.css` → Layout, Farben und mobiles Design
- `script.js` → To-do-Logik und `localStorage`
- `README.md` → Projektbeschreibung

## Starten

Einfach `index.html` im Browser öffnen.

Oder lokal mit einem kleinen Server:

```bash
python3 -m http.server 8000
```

Dann öffnen:

```text
http://localhost:8000
```

## GitHub Pages

Die App funktioniert direkt mit GitHub Pages, da nur statische Dateien verwendet werden.

## Speicherung

Alle Daten bleiben lokal im Browser auf deinem Gerät gespeichert.
