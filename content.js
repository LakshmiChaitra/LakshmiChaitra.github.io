
const CONFIG={email:"chaitracollege@gmail.com",github:"https://github.com/LakshmiChaitra",linkedin:"https://www.linkedin.com/in/chaitra-p-717157442",resume:"Lakshmi_Chaitra_Resume.pdf",web3formsKey:"YOUR_WEB3FORMS_ACCESS_KEY"};
const PROJECTS=[
{featured:true,emoji:"🗣️",label:"RESEARCH",title:"HUPP-LID: language ID for code-mixed text",kind:"Token-level, transliteration-aware language identification for Hindi, Urdu, Punjabi and Pashto",points:["Labels the language of every word in code-mixed text, including words written in a different script from their language.","Handles real Hindi/Urdu overlap with an ambiguity label and a measured human agreement ceiling.","Baselines from dictionary lookup and char n-gram SVM up to BiLSTM, XLM-R, MuRIL and Glot500, plus a gated model combining word and phonetic representations."],tags:["Python","PyTorch","NLP","MuRIL","XLM-R"],code:""},
{emoji:"⚛️",label:"MACHINE LEARNING",title:"Quantum Error Correction ML Decoder",kind:"Interactive quantum error-correction lab",points:["Trained BiLSTM decoders for 3-, 5- and 7-qubit repetition codes.","Inject errors, inspect parity checks and compare decoder performance in the browser.","This live demo covers repetition codes; surface-code support is future work."],tags:["Python","PyTorch","BiLSTM","JavaScript"],live:"https://lakshmichaitra.github.io/quantum-error-correction/",code:"https://github.com/LakshmiChaitra/quantum-error-correction"},
{emoji:"🧭",label:"PERSONALIZED LEARNING",title:"PersonaLearn",kind:"Learner analytics and interactive model predictions",points:["XGBoost risk predictions and three K-Means activity clusters using historical OULAD data.","Explore cohort analytics, learner profiles and rule-based study plans.","Interactive dashboard and model inference run on GitHub Pages.","IBM SkillsBuild x CSRBOX Boot Camp 2026 project."],tags:["Python","XGBoost","K-Means","JavaScript","GitHub Pages"],live:"https://lakshmichaitra.github.io/persona-learn/",code:"https://github.com/LakshmiChaitra/persona-learn"},
{emoji:"🎧",label:"SPEECH + TRANSLATION",title:"Seamless Minds",kind:"Transcription and English speech translation",points:["Whisper transcribes uploaded audio and browser-decodable video tracks on your device.","English speech translation, timed SRT subtitles and printable reports.","Compare transcripts with WER, BLEU and word edit similarity.","Live recording depends on browser support; video links, other translation outputs and visual explanations require a separate AI service."],tags:["JavaScript","Whisper","WebAssembly","HTML/CSS"],live:"https://lakshmichaitra.github.io/transcription-/",code:"https://github.com/LakshmiChaitra/transcription-"},
{emoji:"📚",label:"DOCUMENT SEARCH",title:"DoChat",kind:"Search your documents with source citations",points:["Upload PDFs or text and search for relevant source passages.","Browser-based PDF reading, BM25 search, saved conversations and clickable citations.","The live app returns document excerpts. The original Python RAG API is retained as a separate backend prototype."],tags:["JavaScript","PDF.js","BM25","IndexedDB"],live:"https://lakshmichaitra.github.io/dochat/",code:"https://github.com/LakshmiChaitra/dochat"},
{emoji:"🌐",label:"WEB DEVELOPMENT",title:"Websites for academies and clinics + Midnight Castle",kind:"Academy and clinic websites, plus a 3D browser game",points:["Built responsive websites for academies and clinics, with layouts hosted on GitHub Pages.","Also created Midnight Castle, an interactive 3D browser adventure built with JavaScript and Three.js.","Explore four connected realms, interact with drawers and the observatory, and read or write letters saved on your device.","Choose a traveler and explore using keyboard or on-screen controls, or follow the guided tour."],tags:["HTML/CSS","JavaScript","Three.js","Responsive Design","GitHub Pages"],live:"https://lakshmichaitra.github.io/midnight-castle/",liveLabel:"Play Midnight Castle"}
];
const EXPERIENCE=[
{role:"Virtual Intern, Infosys Springboard Internship 7.0 (Batch 5)",org:"Infosys Springboard",when:"Oct 2026 – Present",text:"Selected for Batch 5 of the Infosys Springboard Virtual Internship 7.0."},
{role:"Data Analyst Intern",org:"Seaweedz Energy Private Limited",when:"Jul 2026 – Present",text:"Working with SQL and Python on data analysis."}
];
const SKILLS=[
{group:"Languages",items:["Python","SQL","JavaScript","HTML/CSS"]},
{group:"AI & machine learning",items:["Machine Learning","Deep Learning","Natural Language Processing","Computer Vision","Transformers & LLMs","Generative AI & RAG","Recommendation Systems","Model Evaluation"]},
{group:"Data analysis & retrieval",items:["NumPy","Pandas","Matplotlib","Statistical Analysis","Clustering (K-Means)","Information Retrieval (TF-IDF, BM25)"]},
{group:"ML frameworks & tools",items:["PyTorch","Scikit-learn","XGBoost","FAISS","ONNX Runtime","OpenAI & Claude APIs"]},
{group:"APIs & deployment",items:["FastAPI","Streamlit","REST APIs","Browser ML Inference","Docker (basics)","AWS & Azure ML"]},
{group:"Core CS & development",items:["Data Structures & Algorithms","Database Fundamentals","Operating Systems","Linux","Git & GitHub"]}
];
const TRAINING=[
{n:"AI and Machine Learning Training Program",o:"iHub-Data, IIIT Hyderabad",d:"Feb – Aug 2026",t:"24-week program in artificial intelligence and machine learning."},
{n:"AI Strategy and Business Intelligence Internship",o:"IBM SkillsBuild with CSRBOX and AICTE",d:"Mar – Apr 2026",t:"Six-week internship in AI strategy and business intelligence."},
{n:"Generative AI Boot Camp",o:"IBM SkillsBuild",d:"",t:"2-week intensive on generative AI and production deployment, including prompt engineering."},
{n:"AI and Prompt Engineering Internship",o:"VaultofCodes",d:"Nov 2025",t:"One-month internship in AI and prompt engineering."},
{n:"Pragati: Path to Future, Cohort 6",o:"Infosys Springboard",d:"Aug – Oct 2025",t:"Completed the cohort and its mandatory assignment."}
];
const CERTS=[
{n:"AWS AI Practitioner Challenge",o:"Udacity",d:"May 2026"},
{n:"McKinsey.org Forward",o:"McKinsey.org",d:"Jun 2026"},
{n:"Intelligent by Design: Build an AI Agent",o:"IBM SkillsBuild",d:"Feb 2026"},
{n:"Applied Generative AI",o:"Infosys Springboard",d:"Dec 2025"},
{n:"Understand the Transformer architecture and explore LLMs in Azure Machine Learning",o:"Microsoft",d:"Aug 2025"},
{n:"Solutions Architecture Job Simulation",o:"AWS, via Forage",d:"Jul 2025"},
{n:"Natural Language Processing Foundation",o:"Infosys Springboard",d:"Jul 2025"},
{n:"Google AI Essentials",o:"Google, via Coursera",d:"Oct 2024",url:"https://coursera.org/verify/URY88SBCOM7B"}
];
const EDUCATION=[
{t:"B.Tech, Computer Science and Engineering (Applied Mathematics)",s:"CR Rao Advanced Institute of Mathematics, Statistics and Computer Science, University of Hyderabad",d:"2024 – 2028"},
{t:"AI and Machine Learning Program",s:"iHub-Data, IIIT Hyderabad",d:"Feb – Aug 2026"}
];
