# AllStarTeam – IPL Stats + Teams Dashboard

A full-stack **React + Vite + Node.js + Express + MySQL** application that displays IPL teams, players, match logs, Orange Cap, Purple Cap, All-Star XI, and more.  
Frontend is React-only (no update/delete actions), but backend fully supports CRUD via REST APIs.

## 🚀 Tech Stack

### Frontend
- React + Vite
- Plain CSS
- Dynamic team color tags
- Responsive grid UI
- Player role badges
- Navbar navigation
- Dedicated pages for each dataset

### Backend
- Node.js
- Express.js
- MySQL
- MVC + Router architecture
- Fully modular controllers & routes

### Database
- MySQL with multiple tables:
  - Teams
  - Players
  - Coaches
  - AllStarTeam
  - Matches
  - Evaluation

## 📌 Features

### ✔️ Teams Page
- Show all IPL teams
- Dynamic color-coded team icons (CSK, RCB, MI, RR, DC, PK, LSG, SRH, GT, KKR)
- Win/loss stats
- Points calculation
- View roster + coaches on click

### ✔️ Players Page
- Full player list
- Role badges (`BAT`, `BOWL`, `AR`, `WK`)
- Runs / wickets table

### ✔️ Orange Cap & Purple Cap
Separate pages showing:
- Top run scorers
- Top wicket takers

### ✔️ All-Star XI
- Pre-calculated all-star team using stats and evaluation
- Table format display

### ✔️ Match Log
- All match entries
- Simplified display

### ✔️ Backend CRUD Supported (UI only reads)
- Teams: POST / DELETE / PATCH
- Players: DELETE / PATCH
- Coaches: DELETE / PATCH
- Matches: POST / DELETE

## 📁 Folder Structure
```
backend/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── index.js
 ├── db.js
frontend/
 ├── src/
 │   ├── pages/
 │   ├── components/
 │   ├── utils/
 │   ├── App.jsx
 ├── index.html
```

## 🔌 API Routes Used

### Teams
```
GET /teams  
POST /teams  
GET /teams/pointsTable  
GET /teams/:id  
DELETE /teams/:id  
PATCH /teams/:id  
```
```
### Players
GET /players  
GET /players/orangeCap  
GET /players/purpleCap  
DELETE /players/:id  
PATCH /players/:id  
```
```
### Coaches
GET /coaches  
GET /coaches/:id  
DELETE /coaches/:id  
PATCH /coaches/:id  
```
```
### All-Star Team
GET /allstarteam
```
```
### Match Logs
GET /matches  
GET /matches/:id  
POST /matches  
DELETE /matches/:id  
```

## ⚙️ Setup

### Backend
```
npm install
nodemon index.js
```

### Frontend
```
npm install
npm run dev
```

Ensure MySQL server is running and configured in `db.js`.


