# ResumeAI - Resume Optimizer & ATS Scanner

## About

ResumeAI is a powerful tool designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS) and generate tailored cover letters. By analyzing your resume against specific job descriptions, ResumeAI provides actionable insights to increase your chances of landing interviews.

## 🚀 Features

- **Resume Analysis**: Get a concise summary of your resume's strengths and professional profile
- **ATS Compatibility Check**: Ensure your resume passes through ATS filters with a similarity score
- **Keyword Optimization**: Identify missing keywords from job descriptions and get placement suggestions
- **Cover Letter Generation**: Create customized cover letters based on your resume and job descriptions
- **Mobile Responsive**: Fully functional on all devices and screen sizes

## 🛠️ Technology Stack

### Frontend
- React with TypeScript
- Chakra UI for responsive design
- React Query for state management
- Framer Motion for animations

### Backend
- FastAPI (Python)
- Google Gemini AI for content analysis and generation
- PyPDF2 for document processing

## 📋 Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- Google API Key (Gemini API)

## ⚙️ Installation

### Backend Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/resume-optimizer.git
   cd resume-optimizer/backend
   ```

2. Create a virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the backend directory with your API key
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

5. Start the backend server
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file with your backend URL
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```

4. Start the development server
   ```bash
   npm start
   ```

## 🚀 Deployment

The application is configured for easy deployment on platforms like Render:

1. Frontend: Deploy as a static site
2. Backend: Deploy as a web service

## 🔧 Configuration

### Environment Variables

#### Backend
- `GEMINI_API_KEY`: Your Google Gemini API key
- `GEMINI_MODEL`: The model to use (default: "gemini-2.0-flash")

#### Frontend
- `REACT_APP_API_URL`: URL of your backend API

## 📁 Project Structure

```
resume-optimizer/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   └── services/
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
└── README.md
```

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgements

- [Chakra UI](https://chakra-ui.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Google Gemini AI](https://ai.google.dev/)
- [React Query](https://tanstack.com/query/latest)
- [Framer Motion](https://www.framer.com/motion/)

---

Made with ❤️ by Dhvanil
