# 🚀 Backend Wizards — Stage 1 API

A production-ready backend system that accepts a name, integrates with multiple external APIs, classifies the data, stores it, and exposes RESTful endpoints for managing profiles.

---

## 📌 Overview

This project is part of the **Backend Wizards Stage 1 Assessment**.

The API:

* Accepts a name input
* Calls three external APIs:

  * Genderize API
  * Agify API
  * Nationalize API
* Applies classification logic
* Stores results in a database
* Prevents duplicate entries
* Exposes REST endpoints for data retrieval and management

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **HTTP Client:** Axios
* **UUID Generation:** uuid (v7)
* **Environment:** Node.js (ES Modules)

---

## ⚙️ Features

* ✅ Multi-API integration
* ✅ Data persistence (MongoDB)
* ✅ Idempotency (no duplicate profiles)
* ✅ Filtering support
* ✅ Robust error handling
* ✅ UUID v7 for all records
* ✅ ISO 8601 UTC timestamps
* ✅ CORS enabled (`Access-Control-Allow-Origin: *`)

---

## 📁 Project Structure

```
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── profile.controller.js
│   ├── models/
│   │   └── profile.model.js
│   ├── routes/
│   │   └── profile.routes.js
│   ├── services/
│   │   └── externalApi.service.js
│   ├── utils/
│   │   ├── ageClassifier.js
│   │   └── validateExternal.js
│   └── app.js
│
├── server.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/backend-wizards-stage1.git
cd backend-wizards-stage1
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

### 4. Run the server

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 🌐 API Base URL

```
https://your-deployed-url.com
```

---

## 📌 API Endpoints

---

### 1️⃣ Create Profile

**POST** `/api/profiles`

#### Request Body:

```json
{
  "name": "ella"
}
```

#### Success Response (201):

```json
{
  "status": "success",
  "data": {
    "id": "uuid-v7",
    "name": "ella",
    "gender": "female",
    "gender_probability": 0.99,
    "sample_size": 1234,
    "age": 46,
    "age_group": "adult",
    "country_id": "DRC",
    "country_probability": 0.85,
    "created_at": "2026-04-01T12:00:00Z"
  }
}
```

#### Duplicate Response:

```json
{
  "status": "success",
  "message": "Profile already exists",
  "data": { ...existing profile... }
}
```

---

### 2️⃣ Get Single Profile

**GET** `/api/profiles/{id}`

#### Response (200):

```json
{
  "status": "success",
  "data": { ...profile... }
}
```

---

### 3️⃣ Get All Profiles

**GET** `/api/profiles`

#### Query Parameters (optional):

* `gender`
* `country_id`
* `age_group`

#### Example:

```
/api/profiles?gender=male&country_id=NG
```

#### Response:

```json
{
  "status": "success",
  "count": 2,
  "data": [
    {
      "id": "id-1",
      "name": "emmanuel",
      "gender": "male",
      "age": 25,
      "age_group": "adult",
      "country_id": "NG"
    }
  ]
}
```

---

### 4️⃣ Delete Profile

**DELETE** `/api/profiles/{id}`

#### Response:

```
204 No Content
```

---

## ⚠️ Error Handling

All errors follow this format:

```json
{
  "status": "error",
  "message": "Error message"
}
```

### Common Errors:

* **400** → Missing or empty name
* **422** → Invalid data type
* **404** → Profile not found
* **502** → External API failure
* **500** → Server error

---

## 🚨 External API Edge Cases

The API returns **502 Bad Gateway** when:

* Gender is `null` or count = 0
* Age is `null`
* No nationality data

Example:

```json
{
  "status": "error",
  "message": "Genderize returned an invalid response"
}
```

---

## 🧠 Classification Logic

* Age:

  * 0–12 → child
  * 13–19 → teenager
  * 20–59 → adult
  * 60+ → senior

* Nationality:

  * Highest probability country is selected

---

## 🧪 Testing

You can test the API using:

* Postman
* Thunder Client
* cURL

---

## 🚀 Deployment

Supported platforms:

* Railway
* Vercel
* AWS

---

## ✅ Submission Checklist

* [x] All endpoints working
* [x] Duplicate handling implemented
* [x] Filtering working
* [x] Proper error handling
* [x] UUID v7 used
* [x] CORS enabled
* [x] Deployed and accessible

---

## 📎 Submission Details

* **API Base URL:** https://yourapp.domain.app
* **GitHub Repo:** https://github.com/your-username/backend-wizards-stage1

---

## 👨‍💻 Author

Built by **Ekemini Ben**
Full-Stack Software Engineer

---
