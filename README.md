# Resume Optimizer & Cover Letter Generator
# Resume Optimizer & Cover Letter Generator

An AI-powered full-stack application that helps job seekers optimize their resumes for specific job descriptions and generate tailored cover letters.

## Features

- Upload or paste your resume and job description
- Get a resume summary and analysis
- View similarity score between your resume and job description
- Identify missing keywords and get suggestions for incorporating them
- Generate professional cover letters tailored to your experience and the job
- Download the cover letter as a text file

## Tech Stack

### Frontend
- React with TypeScript
- Chakra UI for components and styling
- React Query for API calls and data fetching
- React Dropzone for file uploads
- Framer Motion for animations

### Backend
- FastAPI with Python 3.11+
- PyPDF2 for PDF text extraction
- Google Gemini AI for analysis and generation

### Database
- PostgreSQL with SQLAlchemy ORM

### Deployment
- Docker containerization
- Nginx for serving the frontend

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local development)
- [Python 3.11](https://www.python.org/downloads/) (for local development)

### Running with Docker

1. Clone the repository
   ```
   git clone https://github.com/yourusername/resume-optimizer.git
   cd resume-optimizer
   ```

2. Create a `.env` file (optional - you can use the provided defaults)
   ```
   cp .env.example .env
   ```

3. Start the application using Docker Compose
   ```
   docker-compose up -d
   ```

4. Access the application at http://localhost:3000

### Local Development

#### Backend

1. Navigate to the backend directory
   ```
   cd backend
   ```

2. Create a virtual environment
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```
   pip install -r requirements.txt
   ```

4. Run the development server
   ```
   uvicorn app.main:app --reload
   ```

#### Frontend

1. Navigate to the frontend directory
   ```
   cd frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

## Project Structure

```
project_root/
├── backend/               # FastAPI application
│   ├── app/
│   │   ├── main.py        # Main application entry point
│   │   ├── api/           # API routes and endpoints
│   │   ├── core/          # Configuration and settings
│   │   ├── db/            # Database models and session
│   │   ├── schemas/       # Pydantic models for validation
│   │   └── services/      # Business logic services
│   ├── requirements.txt   # Python dependencies
│   └── Dockerfile         # Backend Docker configuration
├── frontend/              # React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service functions
│   │   └── styles/        # Global styles and theme
│   ├── package.json       # Node.js dependencies
│   └── Dockerfile         # Frontend Docker configuration
├── docker-compose.yml     # Docker Compose configuration
└── .env                   # Environment variables
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Generative AI for powering the AI analysis and generation
- [Chakra UI](https://chakra-ui.com/) for the component library
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework