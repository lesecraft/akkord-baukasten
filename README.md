# Akkord-Baukasten

Eine Progressions-Werkbank für Akkorde mit Stimmführungs-Hilfe, Klaviatur-Visualisierung
und MIDI-Export für Logic Pro. Läuft komplett im Browser, keine Server-Komponente nötig.

Dieser Ordner ist so aufgebaut, dass er sich direkt per **GitHub Pages** veröffentlichen
und auf Android als **Vollbild-App installieren** lässt.

```
akkord-baukasten/
├── index.html          ← die App selbst
├── manifest.json        ← macht die App auf Android installierbar
├── sw.js                 ← Service Worker (Offline-Fähigkeit)
├── icons/                ← App-Icons in allen benötigten Formaten
└── README.md             ← diese Datei
```

## 1. Auf GitHub veröffentlichen

1. Erstelle ein neues Repository auf [github.com](https://github.com/new)
   (z. B. `akkord-baukasten`), öffentlich sichtbar.
2. Lade **alle Dateien und den `icons`-Ordner** aus diesem Paket in das Repository hoch:
   auf der Repo-Seite auf **„Add file" → „Upload files"** klicken, den entpackten
   Ordnerinhalt hineinziehen und committen.
   *(Wichtig: der `icons`-Ordner muss mit hochgeladen werden, nicht nur `index.html`.)*
3. Im Repository zu **Settings → Pages** gehen.
4. Unter „Build and deployment" → „Source" **„Deploy from a branch"** wählen,
   als Branch `main` und als Ordner `/ (root)` einstellen, dann **Save**.
5. Nach ca. 1–2 Minuten ist die App erreichbar unter:
   `https://<dein-github-name>.github.io/akkord-baukasten/`

## 2. Auf Android installieren (Vollbild-App)

1. Die obige URL auf dem Android-Handy in **Chrome** öffnen.
2. Chrome zeigt entweder automatisch einen Hinweis **„App installieren"** unten an,
   oder: oben rechts auf die drei Punkte tippen → **„App installieren"**
   (bei älteren Chrome-Versionen: „Zum Startbildschirm hinzufügen").
3. Bestätigen. Die App landet danach mit eigenem Icon auf dem Homescreen.
4. Beim Öffnen über dieses Icon startet sie **im App-Fenster ohne Browser-Chrome**
   (Statusleiste mit Uhr/Akku bleibt sichtbar, Adressleiste ist weg) — das ist der
   `"standalone"`-Modus, mit dem dieses Paket ausgeliefert wird.

Falls du stattdessen den radikaleren, echten Vollbildmodus willst (auch die
Android-Statusleiste verschwindet): in `manifest.json` `"display": "standalone"`
auf `"display": "fullscreen"` ändern und neu hochladen.

## 3. Updates veröffentlichen

Änderungen an `index.html`, `manifest.json` oder den Icons einfach erneut ins
Repository hochladen (oder committen/pushen, falls du mit `git` arbeitest).
GitHub Pages aktualisiert die Seite automatisch nach wenigen Minuten.

Bereits installierte Nutzer:innen bekommen die neue Version automatisch, sobald sie
die App das nächste Mal öffnen — dafür in `sw.js` den `CACHE_NAME` hochzählen
(z. B. `v1` → `v2`), sonst liefert der Service Worker weiter die alte, zwischengespeicherte
Version aus.

## Hinweise

- Die App speichert deine Fortschritte (Progression, Einstellungen, gespeicherte
  Presets) ausschließlich lokal im Browser-Speicher (`localStorage`) — nichts wird
  an einen Server geschickt.
- Die App funktioniert auch offline, sobald sie einmal geladen wurde (dank Service Worker).
- Für iPhones funktioniert derselbe Ordner ebenfalls: in Safari öffnen und über
  „Teilen" → „Zum Home-Bildschirm" hinzufügen.
