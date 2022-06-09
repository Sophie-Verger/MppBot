# MppBot

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)  [![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)

MppBot est un bot pouvant être connecté à Slack, Discord et Telegram.

Ce bot permet de faire un daily meeting, en envoyant 3 questions aux membres du groupe auquel est ajouté le bot :
- Qu'as-tu fais hier ?
- Que vas tu faire aujourd'hui
- Quels sont les irritants qui te ralentissent ou t'empêchent d'avancer ?


## Pour commencer

### Pré-requis

- npm
- node-js

### Installation
Lancer la commande ``npm install`` 

## Démarrage

#### Slack
- Démarrage du bot : ``npm run slack``
- Demarrage du daily : ``daily``
- Daily automatique tous les jours de la semaine a 9h00
- Test de connexion : ``npm run test``

#### Discord
- Démarrage du bot : ``f5``
- Demarrage du daily : ``/daily``
- Informations sur le serveur actif (guild_name et guild_member_count : ``/server``
- Informations sur le membre (user_tag et user_id) : ``/user``

#### Telegram
- Démarrage du bot : ``npm run telegram``
- Demarrage du daily : ``/daily``
- Test de connexion : ``/test``

## Fabriqué avec
- [node-js](https://nodejs.org)
- [vscode](https://code.visualstudio.com)
- [slack api](https://api.slack.com)
- [telegram api](https://telegraf.js.org)
- [discord api](https://discordjs.guide)

## Contributing

Si vous souhaitez contribuer, lisez le fichier [CONTRIBUTING.md](https://example.org) pour savoir comment le faire.

## Versions
**Dernière version :** 1.0

## Auteurs
* **Sophie Verger** _alias_ [@Sophie-Verger](https://github.com/Sophie-Verger)
* **Ophelie Leleu** _alias_ [@opheli](https://github.com/opheli)
* **Amandine Quantin** _alias_ [@Dinergo](https://github.com/Dinergo)
