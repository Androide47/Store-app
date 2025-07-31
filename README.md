# Store App

A modern web application for tracking and managing store orders, built with a microservices architecture using React, FastAPI, and SQLite.

## Project Structure

The project is organized into three main components:

### 1. Admin Dashboard (`/admin`)
- React-based admin interface
- Built with TypeScript and Tailwind CSS
- Manages store configuration and settings

### 2. Backend Service (`/backend`)
- FastAPI-based REST API
- SQLite database
- Features:
  - Authentication and user management
  - Order processing and tracking
  - Blog management
  - Product management
  - Notification system

### 3. Frontend Store (`/frontend`)
- React-based customer interface
- TypeScript and Tailwind CSS
- Features:
  - User authentication
  - Product browsing
  - Order placement and tracking
  - Blog viewing

### 4. Order Tracker (`/linktracker`)
- Dedicated order tracking interface
- Real-time order status updates
- Live map integration

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Python, FastAPI, SQLite
- **Development**: Bun (package manager)

## Getting Started

1. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

2. **Frontend Setup**
```bash
# Admin Dashboard
cd admin
bun install
bun run dev

# Store Frontend
cd frontend
bun install
bun run dev

# Order Tracker
cd linktracker
bun install
bun run dev
```

## Environment Variables

Create `.env` files in the respective directories:

```env
# Backend
DATABASE_URL=sqlite:///storeapp.db
SECRET_KEY=your_secret_key

# Frontend/Admin/Linktracker
VITE_API_URL=http://localhost:8000
```

## Features

- User authentication and authorization
- Real-time order tracking with live map
- Product management system
- Blog system for store updates
- Notification system
- Multi-language support
- Responsive design for all devices

## Development

- Uses TypeScript for type safety
- Implements modern React patterns and hooks
- FastAPI for high-performance backend
- SQLite for simple, reliable data storage
- Tailwind CSS for responsive styling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.