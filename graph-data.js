export const sarvboliDemoUrl = "https://sarvboli.13-236-190-161.sslip.io/";

export const topics = [
  {
    name: "Language & AI", color: "#dcc2ef", x: 50, y: 17,
    projects: [
      ["SarvBoli", "i wanted to make it easier to actually speak the language you’re learning :D I built a React Native app and FastAPI backend for practicing Hindi, Marathi, and Telugu. The voice flow goes from recording and transcription to playing back a reply.", "React Native · Expo · FastAPI", null, null, sarvboliDemoUrl],
      ["Local RAG agent", "a local RAG chatbot experiment. I wanted to see how much of a retrieval and chat workflow I could run on my own machine :)", "Retrieval-augmented generation", "local_rag_agent"],
      ["Local blog writing agent", "a blog writer that runs locally. LangGraph coordinates the writing workflow and Ollama runs the Qwen model, so the project can work without paid model API calls.", "LangGraph · Ollama · Qwen · Streamlit", "blog_writing_agent"]
    ]
  },
  {
    name: "Vision & 3D", color: "#bddeb5", x: 78, y: 32,
    projects: [
      ["Abhayam", "this is where i went from learning computer vision to actually using it :') My team built a CCTV analytics prototype for a women’s safety problem statement and took it to the Smart India Hackathon 2024 Grand Finale.", "YOLOv8 · OpenCV · MediaPipe", "Abhayam-Women-Safety"],
      ["RGB-D reconstruction", "during my VJTI internship, I worked on turning color and depth frames into object meshes. I used ICP to align frames, TSDF fusion to combine depth observations, and compared what happened when depth quality and occlusion changed.", "Open3D · ICP · TSDF fusion", "3D_reconstruction"]
    ]
  },
  {
    name: "Data & the ocean", color: "#b7c9f7", x: 78, y: 68,
    projects: [
      ["FloatChat", "ever wanted to ask the ocean a question? okay, technically it’s the ocean data :P FloatChat uses natural-language queries to explore Argo float measurements and show the results in charts.", "RAG · FAISS · Qdrant · React", "floatchat-sih"],
      ["Kaggle notebooks", "my collection of competition notebooks, submissions, and experiments. good for seeing the steps between looking at a dataset for the first time and making a submission :)", "Machine learning · Notebooks", "Kaggle_Competitions"]
    ]
  },
  {
    name: "Web & security", color: "#e6a8bb", x: 50, y: 83,
    projects: [
      ["DeshKaVote", "i built a voting prototype with Django and PostgreSQL. Voters sign in with an email code, Celery and Redis handle background processing, and WebSockets send election updates without a refresh :)", "Django · PostgreSQL · Celery · Redis · WebSockets", "Online_Voting_Platform"],
      ["Cinema booking", "a movie theatre system with different dashboards for the customer, staff, and admin. Customers can book seats, staff can handle walk-ins, and admins can look through sales and revenue.", "Flask · PostgreSQL · JavaScript", "newCinemaDB"]
    ]
  },
  {
    name: "Tech for farming", color: "#9de0c2", x: 22, y: 68,
    projects: [
      ["Smart Crop Analyser", "i built a Flutter app where you pick a district, enter soil details, and get ranked crop suggestions. I added photo uploads from the camera or gallery for soil analysis and connected the app to the weather and recommendation APIs.", "Flutter · Dart · FastAPI", "smart_crop_backend", "View backend on GitHub ↗"]
    ]
  },
  {
    name: "Desktop & web", color: "#efd49e", x: 22, y: 32,
    projects: [
      ["ChemFlow Analytics", "one CSV, two frontends :D You can explore equipment temperature, pressure, and flow rate in React or PyQt, with charts, upload history, and downloadable reports. Both frontends call the same Django REST backend.", "Django REST · React · PyQt5", "Chemical-Equipment-Parameter-Visualizer"]
    ]
  }
];
