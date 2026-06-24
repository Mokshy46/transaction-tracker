# Transaction Tracker

A full-stack transaction tracking application built with Django REST Framework and React. The system processes transactions, maintains user statistics, and ranks users based on a custom scoring algorithm.

## Live Demo

### Frontend
(https://transaction-tracker-three.vercel.app/)
### Backend API
(https://transaction-tracker-bpiw.onrender.com/)
### Demo Video
(https://www.loom.com/share/945e8ca2d6ec46e6bd34e943ac8e7c04)


## Features

* Manage users
* Process transactions with unique transaction IDs
* Automatic user statistics calculation
* User ranking leaderboard
* User summary dashboard
* Transaction amount validation
* Duplicate transaction prevention using UUIDs
* Responsive React frontend
* RESTful API architecture

---

## Tech Stack

### Backend

* Django
* Django REST Framework
* SQLite
* Django CORS Headers

### Frontend

* React
* React Router
* Axios
* Tailwind CSS

### Deployment

* Backend: Render
* Frontend: Vercel

---

## Ranking Logic

The ranking score is calculated using multiple factors:

```text
Score = Total Amount + (Total Transactions × 100)
```

### Example

* Total Amount = 1000
* Total Transactions = 5

```text
Score = 1000 + (5 × 100)
Score = 1500
```

Users are ranked in descending order based on their score.

---

## API Endpoints

### Create User

**POST** `/api/user/`

#### Request

```json
{
  "name": "John"
}
```

---

### Create Transaction

**POST** `/api/transaction/`

#### Request

```json
{
  "user": 1,
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 500
}
```

#### Response

```json
{
  "user": 1,
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 500
}
```

---

### User Summary

**GET** `/api/summary/<user_id>/`

#### Response

```json
{
  "user": 1,
  "name": "John",
  "score": 1500,
  "total_amount": 1000,
  "total_transactions": 5
}
```

---

### Ranking Leaderboard

**GET** `/api/ranking/`

#### Response

```json
[
  {
    "user": 1,
    "name": "John",
    "score": 1500,
    "total_amount": 1000,
    "total_transactions": 5
  }
]
```

---

### Rate Limiting

DRF ScopedRateThrottle is used to prevent abuse.

- Transaction Creation: 5 requests/minute
- Read-only Endpoints (Summary & Ranking): 60 requests/minute

This helps reduce automated manipulation of the ranking system while maintaining a smooth user experience.

---

## Duplicate Transaction Prevention

Each transaction requires a unique UUID:

```json
{
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

The database enforces uniqueness using:

```python
transaction_id = models.UUIDField(unique=True)
```

This prevents duplicate transaction processing by rejecting repeated transaction IDs.

---

## Validation

### Transaction Amount Validation

Transaction amount must be greater than zero.

#### Invalid Request

```json
{
  "amount": -100
}
```

#### Response

```json
{
  "amount": [
    "Invalid Amount Value"
  ]
}
```

---

## Concurrency Handling

Transaction processing is wrapped inside a database transaction using:

```python
with transaction.atomic():
```

This ensures that transaction creation and user statistics updates occur as a single atomic operation.

If any step fails, all changes are rolled back, preventing partial updates and maintaining consistency.

---

## Fairness and Abuse Prevention

The ranking system uses multiple factors:

```text
Score = Total Amount + (Total Transactions × 100)
```

This prevents rankings from being based solely on transaction count or solely on transaction value.

Additional safeguards include:

* Positive transaction amount validation
* Unique transaction IDs
* Database-level uniqueness constraints

---

## Assumptions

* Users are created before transactions are processed.
* User identification is performed using the User ID.
* SQLite is used as the database for simplicity and ease of setup.
* Clients generate unique UUID transaction IDs.

---

## Trade-offs and Limitations

* SQLite is used instead of PostgreSQL for simplicity.
* Authentication and authorization are not implemented.
* Rate limiting/throttling is not implemented.
* UUID uniqueness is enforced at the database level.
* The application is designed for assignment-scale workloads rather than high-volume production traffic.

---

## Local Setup

### Backend

```bash
git clone <repository-url>

cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Project Structure

```text
transaction-tracker/
│
├── backend/
│   ├── config/
│   ├── core/
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```


## Author

**Mokshith Gowda**
