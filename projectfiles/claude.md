# Globale Entwickler-Präferenzen

## Allgemeine Regeln
- Bevorzuge TypeScript über JavaScript
- Schreibe Code auf Englisch, Kommentare auf Deutsch
- Verwende moderne ES6+ Syntax
- Keine console.log() in Production-Code

## Code-Qualität
- Schreibe sauberen, lesbaren Code
- Verwende aussagekräftige Variablennamen
- Halte Funktionen klein (max. 20 Zeilen)
- DRY-Prinzip befolgen

## Fehlerbehandlung
- Immer try-catch bei async/await
- Niemals Fehler verschlucken
- Aussagekräftige Fehlermeldungen

## Git
- Commit-Messages auf Deutsch
- Conventional Commits Format nutzen

## Kontext-Regeln

### Bei Bug-Fixes
- Erst verstehen, dann fixen
- Root cause analysieren
- Regression-Test schreiben
- Changelog updaten

### Bei neuen Features
- Erst Types/Interfaces definieren
- API-First Design
- Tests parallel schreiben
- Documentation-Comments

### Bei Refactoring
- Funktionalität nicht ändern
- Tests müssen grün bleiben
- Schrittweise vorgehen
- Performance messen

## Entwicklungsumgebung
Entwickle unter **WSL2 (Ubuntu)** und arbeite **im Container** via **VS
Code Dev Containers**.\
Baue & teste Images mit **Linux-Containern** (Standard unter Docker
Desktop) und nutze **docker buildx** für Multi-Arch.\
So bekommst du auf Windows die gleiche Erfahrung wie auf Linux/macOS --
und dein Stack läuft überall, wo Docker läuft.

------------------------------------------------------------------------

## Empfehlung -- Setup, das sich bewährt

### 🧩 WSL2 + Ubuntu LTS

-   Code liegt unter `\\wsl$\Ubuntu\home\<user>\…` (nicht auf `C:\…`),
    sonst leidet die I/O-Performance.\
-   In Docker Desktop: **„Use the WSL 2 based engine"** aktivieren und
    die Ubuntu-Distro integrieren.

------------------------------------------------------------------------

### 💻 VS Code Extensions

-   **Dev Containers** (aka *Remote -- Containers*)\
-   **Docker**\
-   **WSL**

➡️ Projektordner in WSL öffnen:

``` bash
code .
```

(aus der Ubuntu-Shell heraus)

------------------------------------------------------------------------

### 🧱 Entwicklung im Container

Definiere eine **`.devcontainer`**-Umgebung, in der VS Code dich „rein
steckt".\
**Vorteile:** - identische Toolchain\
- saubere Dependencies\
- reproduzierbar auf jedem Rechner / CI

------------------------------------------------------------------------

### 🐧 Linux-Container als Zielplattform

-   Standardisiert am breitesten kompatibel.\
-   Für Windows-spezifische Fälle (z. B. Windows-Services) ggf. separate
    Windows-Images --\
    aber für Web-/API-/CLI-Apps ist **Linux der De-facto-Standard**.

------------------------------------------------------------------------

### ⚙️ Compose für lokalen Dev-Stack

-   Mehrere Services (App, DB, Cache) via:

    ``` bash
    docker compose up
    ```

-   Mit `docker compose watch` (oder Node/Flask Hot-Reload) bekommst du
    **Live-Reload**.

------------------------------------------------------------------------

### 🌍 Multi-Arch & Portable Builds

Aktiviere `docker buildx` und baue Images für:

``` bash
linux/amd64, linux/arm64
```

Damit läuft dein Stack auf Intel- **und** ARM-Hosts gleichermaßen.

------------------------------------------------------------------------

### ✅ CI Smoke-Builds

Baue Images und fahre containerisierte Tests direkt in: - **GitHub
Actions**\
- **GitLab CI**

➡️ sorgt für echte **„läuft-überall"-Sicherheit**.
