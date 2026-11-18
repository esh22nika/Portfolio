// Each pair describes a component and its role in the project, in processing order.
export const architecture = {
  SarvBoli: [
    ["Expo client","Captures microphone audio and plays replies. Expo SecureStore keeps the user signed in between sessions."],
    ["FastAPI voice flow","Accepts the recording and coordinates transcription and response generation."],
    ["EC2 deployment","Runs the backend with Docker Compose. Health checks and timing logs help trace slow requests."]
  ],
  "Local RAG agent": [["Document search","Retrieves relevant material to pass to the chatbot as context."],["Local chatbot","Uses the fetched context when replying to a question."]],
  "Local blog writing agent": [["LangGraph","Coordinates stages of the writing workflow."],["Ollama","Runs the Qwen language model locally."],["Streamlit","Provides the interface for starting the workflow and reading its output."]],
  Abhayam: [["Video input","Processes CCTV footage for the hackathon prototype."],["Vision pipeline","Uses computer vision models and gesture recognition to identify events for review."]],
  "RGB-D reconstruction": [["RGB-D frames","Pairs color and depth observations."],["ICP alignment","Estimates how successive observations line up."],["TSDF fusion","Integrates aligned depth observations into a volume that can be used to extract a mesh."]],
  FloatChat: [["Argo readings","Ingests ocean observations from profiling floats."],["Retrieval","Uses FAISS and Qdrant as part of the natural-language retrieval pipeline."],["Charts","Presents the results of queries in a browser interface."]],
  "Kaggle notebooks": [["Notebooks","Contain exploratory analysis, feature preparation, and modeling work."],["Submissions","Capture predictions and competition experiments alongside the notebooks."]],
  DeshKaVote: [["Django app","Handles election workflows and email-code sign-in."],["Celery & Redis","Queues and processes votes in the background."],["Live dashboard","Django Channels sends election updates over WebSockets. PostgreSQL stores election data."]],
  "Cinema booking": [["Flask dashboards","Separate interfaces support customers, theatre staff, and administrators."],["PostgreSQL","Stores showtimes and bookings and supports the reporting dashboards."]],
  "Smart Crop Analyser": [["Flutter app","Collects district information, soil details, and photos from a camera or gallery."],["FastAPI service","Combines model outputs with weather data and rule-based risk estimates."],["Recommendations","Ranks crops and returns soil and plant disease analysis for the mobile interface."]],
  "ChemFlow Analytics": [["CSV input","Reads equipment flow rate, pressure, and temperature."],["Django REST API","Processes uploads and serves analysis and reports."],["React & PyQt","Two interfaces use the same backend to preview charts and download reports."]]
};
