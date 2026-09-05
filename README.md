# 🏆 FIFA World Cup Tournament Simulator & Tournament Management System

[![PHP](https://img.shields.io/badge/PHP-7.4%20%7C%208.x-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-5.7%20%7C%208.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Responsive%20Design-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3.org/Style/CSS/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A lightweight, full-stack tournament simulation web application that automates the execution of a 16-nation international football tournament. Powered by a rating-based stochastic simulation engine, the system manages stage transitions from group rounds to finals, dynamically tracks head-to-head match metrics, loads external vector assets on demand, and maintains historical data using MySQL and PHP.

---

## 📌 Table of Contents
- [System Overview](#-system-overview)
- [Architecture & Data Flow](#-architecture--data-flow)
- [Key Modules & Technical Features](#-key-modules--technical-features)
- [Mathematical Simulation Engine](#-mathematical-simulation-engine)
- [Database Schema & Architecture](#-database-schema--architecture)
- [API Specification](#-api-specification)
- [Repository File Structure](#-repository-file-structure)
- [Installation & Local Deployment Guide](#-installation--local-deployment-guide)
- [Credentials & Usage Flow](#-credentials--usage-flow)
- [Technical Q&A / Evaluation Defense Notes](#-technical-qa--evaluation-defense-notes)
- [License](#-license)

---

## 🚀 System Overview

The application addresses the full lifecycle of an international sporting event:
1. **Access Control:** Client-side administrative barrier with session remembrance.
2. **Team Draft:** 16-team selection via live keyword filtering, continental category routing, or a randomized batch generator.
3. **Asset Delivery:** Dynamic integration with CDN vector providers (`flagcdn.com`), eliminating large local asset overheads.
4. **Group Distribution:** Algorithmic shuffling into 4 balanced groups (A, B, C, D).
5. **Dynamic Fixture Simulation:** Multi-variable, probabilistic score calculation factoring in team overall ratings (0–100) while clamping outcomes to realistic football scores.
6. **Knockout Stage Progression:** Dynamic bracket pairing under strict seeded match rules ($A_1 \text{ vs. } B_2$, etc.).
7. **Tournament Archiving:** Relational database persistence allowing users to review, query, and restore past tournament statistics.

---

## 🔄 Architecture & Data Flow

```text
               +----------------------------------------+
               |        Client Web Interface            |
               | (index.html / dashboard.html / JS/CSS) |
               +-------------------+--------------------+
                                   |
         +-------------------------+-------------------------+
         |                                                   |
         v                                                   v
+------------------+                               +------------------+
|  localStorage    |                               |   flagcdn.com    |
| - Dark/Light mode|                               | - Real-time SVG/ |
| - Auth sessions  |                               |   PNG flag fetch |
+------------------+                               +------------------+
         |
         | (Asynchronous JSON Payload via Fetch API)
         v
+----------------------------------------------------+
|               Backend Service Layer                |
|                    (api.php)                       |
+-------------------------+--------------------------+
                          |
                          | (Prepared SQL Statements / PDO)
                          v
+----------------------------------------------------+
|               Relational Database                  |
|                 (worldcup_db)                      |
|  - Historical tourneys, groups, & match results    |
+----------------------------------------------------+
