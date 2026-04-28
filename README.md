<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>P. Lakshmi Chaitra — AI & ML Engineer</title>

<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet"/>

<style>
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg:#080C18;
  --accent:#3B82F6;
  --accent2:#60A5FA;
  --text:#F1F5F9;
  --muted:#94A3B8;
  --border:rgba(59,130,246,0.18);
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Outfit', sans-serif;
}

nav {
  position: fixed; width:100%;
  display:flex; justify-content:space-between;
  padding:1.2rem 4rem;
  background: rgba(8,12,24,0.9);
}
.nav-logo { color: var(--accent2); font-weight:700; }
.nav-links { display:flex; gap:2rem; list-style:none; }
.nav-links a { color:var(--muted); text-decoration:none; }

#hero {
  min-height:100vh;
  display:flex; align-items:center;
  padding:8rem 4rem;
}

.hero-name {
  font-family:'Playfair Display', serif;
  font-size: clamp(3.5rem, 9vw, 7.5rem);
  font-weight:900;
  line-height:1.05;
}
.hero-name span { color: var(--accent2); }

.hero-sub {
  font-size: clamp(1.2rem, 2.8vw, 1.6rem);
  color: var(--muted);
  margin:1.5rem 0;
}

.btn-primary {
  background: var(--accent);
  padding:0.85rem 2rem;
  border-radius:8px;
  color:white;
  text-decoration:none;
}

section { padding:6rem 4rem; }

.about-text p {
  color: var(--muted);
  line-height:1.8;
}
.about-text span { color: var(--accent2); }
</style>
</head>

<body>

<nav>
  <div class="nav-logo">Chaitra</div>
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<section id="hero">
  <div>
    <h1 class="hero-name">P. Lakshmi<br><span>Chaitra</span></h1>

    <p class="hero-sub">
      AI/ML Intern & Mathematics and Computing Student building production-ready intelligent systems. B.Tech CSE student at CR Rao AIMSCS, Hyderabad.
    </p>

    <a href="#projects" class="btn-primary">View My Work</a>
  </div>
</section>

<section id="about">
  <div class="about-text">
    <p>
      I am a <span>B.Tech Computer Science (Applied Mathematics)</span> student at CR Rao AIMSCS, Hyderabad — also pursuing advanced AI/ML coursework through <span>IIIT Hyderabad × iHub</span>.
    </p>
    <p>
      I build things end to end — from data pipelines to deployed web apps.
    </p>
  </div>
</section>

</body>
</html>
