<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>P. Lakshmi Chaitra — AI & ML Engineer</title>

  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet"/>

  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #080C18;
      color: #F1F5F9;
      font-family: 'Outfit', sans-serif;
    }

    nav {
      position: fixed;
      width: 100%;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      background: rgba(0,0,0,0.8);
    }

    .nav-logo {
      font-weight: bold;
      color: #60A5FA;
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      list-style: none;
    }

    .nav-links a {
      color: #94A3B8;
      text-decoration: none;
    }

    #hero {
      height: 100vh;
      display: flex;
      align-items: center;
      padding: 5rem 2rem;
    }

    .hero-name {
      font-size: 3rem;
      font-family: 'Playfair Display', serif;
    }

    .hero-name span {
      color: #60A5FA;
    }

    .hero-sub {
      margin-top: 1rem;
      color: #94A3B8;
    }

    .btn {
      margin-top: 2rem;
      display: inline-block;
      padding: 10px 20px;
      background: #3B82F6;
      color: white;
      text-decoration: none;
      border-radius: 6px;
    }

    section {
      padding: 4rem 2rem;
    }
  </style>
</head>

<body>

<!-- NAV -->
<nav>
  <div class="nav-logo">Chaitra</div>
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<!-- HERO -->
<section id="hero">
  <div>
    <h1 class="hero-name">P. Lakshmi<br><span>Chaitra</span></h1>
    <p class="hero-sub">
      AI/ML Intern & Mathematics and Computing Student building intelligent systems.
    </p>

    <a href="#projects" class="btn">View My Work</a>
  </div>
</section>

<!-- ABOUT -->
<section id="about">
  <h2>About</h2>
  <p>
    B.Tech CSE student at CR Rao AIMSCS, Hyderabad.
    Passionate about AI, ML, and building real-world systems.
  </p>
</section>

<!-- PROJECTS -->
<section id="projects">
  <h2>Projects</h2>
  <p>Project details go here...</p>
</section>

<!-- CONTACT -->
<section id="contact">
  <h2>Contact</h2>
  <p>Email: chaitracollege@gmail.com</p>
</section>

</body>
</html>
