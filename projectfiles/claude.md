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
