# SimuLab — Interactive Mathematics & Physics Virtual Laboratory

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r174-black?logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![KaTeX](https://img.shields.io/badge/KaTeX-0.19-329894?logo=latex&logoColor=white)](https://katex.org/)
[![Vitest](https://img.shields.io/badge/Vitest-4.1-FCC72B?logo=vitest&logoColor=black)](https://vitest.dev/)

**SimuLab** is an interactive, browser-based Mathematics and Physics Virtual Laboratory. It bridges the gap between abstract textbook formulas and physical intuition through 60 FPS 3D/2D visual experiments, real-time parameter controls, book-typeset formulas (KaTeX), and natural-language AI simulation synthesis.

---

## Table of Contents

- [Core Philosophy & Vision](#core-philosophy--vision)
- [Key Features](#key-features)
- [Simulation Laboratories](#simulation-laboratories)
  - [Mathematics Laboratory](#mathematics-laboratory)
  - [Physics Laboratory](#physics-laboratory)
- [AI Simulation Studio](#ai-simulation-studio)
- [Educational Approach](#educational-approach)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Project Directory Structure](#project-directory-structure)
- [Getting Started](#getting-started)
- [Testing & Quality Assurance](#testing--quality-assurance)
- [Author & Credits](#author--credits)

---

## Core Philosophy & Vision

Traditional STEM education often relies on static 2D textbook diagrams and rote formula memorization. When students only memorize equations like $PV = nRT$ or $F = G\frac{m_1 m_2}{r^2}$, the underlying mechanics remain abstract.

**SimuLab transforms formulas into living experiments:**
- **Observe Consequences in Real Time:** Move sliders for gravity, mass, temperature, index of refraction, or dampening and watch trajectories and phase spaces recompute at 60 FPS.
- **De-Cryptify Mathematical Symbols:** Every formula is typeset in textbook KaTeX alongside an interactive plain-language symbol legend explaining what variables physically mean.
- **Hypothesis-Driven Exploration:** Users can test "what-if" edge cases (e.g., zero gravity, vacuum vs. air drag, total internal reflection) in a risk-free virtual setting.

---

## Key Features

1. **Flagship Vedic Square 3D Simulation**
   - High-fidelity 3D visualization of modular arithmetic modulo 9.
   - Interactive 9x9 matrix, complement dual symmetry pairing ($n \leftrightarrow 9-n$), harmonic wave surfaces, and constellation/mandala ray tracing.
2. **Textbook Math Typesetting (KaTeX)**
   - No raw code strings like `4 * N_inside / N_total`.
   - Elegantly formatted mathematical equations with full LaTeX notation and plain-language variable descriptions.
3. **AI-Powered Natural Language Simulation Generator**
   - Users describe experiments in plain English (e.g., *"Fire a 6 kg projectile on Mars at 55 m/s"*).
   - The engine parses parameters, matches scientific models, assigns physical constants, and generates a runnable lab with an empirical hypothesis.
4. **Custom 3D Landing Page Viewport**
   - Interactive Three.js WebGL hero supporting three real-time computational modes:
     - **Sacred Torus & Harmonics:** Mod-9 crystal lattice and dynamic wave floor.
     - **Keplerian Gravitational Field:** Multi-body celestial orbits and Vis-Viva vectors.
     - **Lorenz Strange Attractor:** Deterministic chaos butterfly manifold.
5. **Modern SaaS UI & Navigation**
   - Executive translucent navigation bar with quick simulation dropdown and mobile drawer.
   - Clean geometric vector SVG icons (zero emojis).
   - Dark Mode and Light Mode theme switcher with local storage persistence.
6. **Robust Numerical Solvers**
   - 4th-Order Runge-Kutta (RK4) integration for non-linear ODEs (Lorenz attractor, double pendulum).
   - Vis-Viva celestial mechanics, Simpson quadrature numerical integration, and Maxwell-Boltzmann probability distributions.

---

## Simulation Laboratories

SimuLab hosts 10 scientific simulations divided across two specialized departments:

### Mathematics Laboratory

| Simulation | Model & Solvers | Key Concepts |
| :--- | :--- | :--- |
| **Vedic Square 3D** | Digital root modulo 9, harmonic sine surface, 3D laser graph | Modular arithmetic, 9-complement symmetry, sacred geometry, matrix topology |
| **Calculus & Fourier Series** | Dynamic tangent slope, Riemann sums vs. Simpson rule, Fourier square/sawtooth synthesis | Derivatives as limits, area under curves, harmonic wave reconstruction |
| **Lorenz Strange Attractor** | 4th-Order Runge-Kutta (RK4) numerical ODE solver | Deterministic chaos, butterfly effect, phase space volume contraction ($\sigma, \rho, \beta$) |
| **Monte Carlo & Probability** | Galton board binomial quincunx simulation, rejection sampling $\pi$ estimator | Central Limit Theorem, Bell curve / Gaussian distribution, stochastic convergence |

### Physics Laboratory

| Simulation | Model & Solvers | Key Concepts |
| :--- | :--- | :--- |
| **Ballistic Projectile Motion** | Newtonian kinematics with quadratic aerodynamic drag ($\mathbf{F}_d = -\frac{1}{2}\rho C_d A v \mathbf{v}$) | Gravity on Moon/Mars/Earth, air resistance, energy dissipation, optimal launch angles |
| **Lagrangian Double Pendulum** | Coupled non-linear Euler-Lagrange equations via RK4 integration | Extreme sensitivity to initial conditions, chaotic trajectories, phase portrait |
| **Keplerian Orbital Gravity** | 2-body Newtonian gravity, Vis-Viva equation ($v^2 = GM(\frac{2}{r} - \frac{1}{a})$), Kepler's 3rd Law | Orbital eccentricity, periapsis/apoapsis velocity, satellite orbits |
| **Wave Superposition & Interference** | 2D wave equation with exponential attenuation and phase shift ($\Psi = A e^{-\gamma r}\sin(kr - \omega t)$) | Constructive/destructive interference, path difference ($\Delta r = m\lambda$), fringe patterns |
| **Optics & Snell's Law** | Snell-Descartes refraction law ($n_1\sin\theta_1 = n_2\sin\theta_2$), thin lens formula | Critical angle, Total Internal Reflection (TIR), focal length, real vs. virtual image |
| **Ideal Gas Thermodynamics** | Kinetic theory of gases ($PV = nRT$), Maxwell-Boltzmann speed distribution | Temperature in Kelvin, molecular root-mean-square speed ($v_{\text{rms}}$), pressure-volume work |

---

## AI Simulation Studio

The AI Simulation Studio (`src/engine/aiSimulationEngine.js`) lets users generate experiments using natural language prompts.

### Example Prompts:
- *"Launch a 6 kg projectile at 52 degrees with 55 m/s velocity on Mars from a 12m cliff with low atmospheric drag."*
- *"Shine a laser beam from water (n=1.33) into air (n=1.0) at a 58 degree incident angle to observe Total Internal Reflection."*
- *"Simulate a chaotic 3D Lorenz strange attractor with Rayleigh number rho = 42 and Prandtl sigma = 12."*
- *"Heat 2.5 moles of Helium gas to 750 Kelvin inside a compressed 6 Liter chamber and inspect the Maxwell-Boltzmann speed distribution."*

### How it Works:
1. **Entity Extraction:** Identifies domain, simulation archetype, numbers, physical units ($m/s$, $kg$, $Kelvin$, $moles$), and celestial bodies.
2. **Scientific Validation:** Bounds input values to physically safe ranges and matches verified formulas.
3. **Hypothesis Formulation:** Produces an empirical hypothesis explaining expected outcomes.
4. **Live Execution:** Launches the experiment directly into the workspace runner.

---

## Educational Approach

SimuLab implements a **"Read the words first, the equation second"** pedagogy:

- **Hook:** Every experiment opens with an engaging, real-world framing (e.g., *"Why do planets speed up when close to their sun?"*).
- **What to Observe:** Concrete visual cues to look for while adjusting parameters.
- **Things to Try:** Guided micro-experiments that reveal non-intuitive physical phenomena.
- **Textbook KaTeX Formulas:** Equations typeset with proper mathematical standards ($LaTeX$).
- **Variable Legends:** Explicit definitions explaining what each mathematical letter represents ($v_{\mathrm{rms}}$, $\theta$, $k$, $P$, etc.).

---

## Architecture & Tech Stack

```
   ┌──────────────────────────────────────────────────────────────┐
   │                   SimuLab Architecture                      │
   └──────────────────────────────────────────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
  ┌──────────────┐         ┌──────────────┐         ┌──────────────┐
  │ Presentation │         │  Simulation  │         │ Mathematical │
  │    Layer     │         │    Engine    │         │    Solvers   │
  └──────────────┘         └──────────────┘         └──────────────┘
  • React 19               • Registry Catalog       • RK4 ODE Solver
  • Tailwind CSS           • Universal Runner       • Kepler Solvers
  • KaTeX Typesetting      • AI Natural Language    • Wave Functions
  • Vector SVG Icons       • Educational Guides     • Snell / Optics
  • Three.js / R3F Canvas  • Formula Legends        • Maxwell-Boltzmann
```

- **Frontend Framework:** React 19 with functional hooks and state management.
- **3D Graphics Engine:** Three.js and `@react-three/fiber` / `@react-three/drei`.
- **Styling:** Tailwind CSS with responsive layout and full Dark/Light theme tokens.
- **Mathematics Rendering:** KaTeX (`katex.renderToString`).
- **Build Tool:** Vite 7.
- **Testing:** Vitest with React Testing Library.

---

## Project Directory Structure

```text
SimuLab/
├── public/                     # Static assets and fonts
├── src/
│   ├── components/             # Reusable UI & visualization components
│   │   ├── AISimulationStudio.jsx  # Natural language experiment synthesis UI
│   │   ├── EducationPanels.jsx     # KaTeX formulas & plain-language legends
│   │   ├── Icons.jsx               # Vector SVG icons (zero emojis)
│   │   ├── LandingHero3D.jsx       # Interactive Three.js WebGL hero viewport
│   │   ├── LandingPage.jsx         # Executive SaaS landing page
│   │   ├── MathFormula.jsx         # KaTeX typesetting renderer
│   │   ├── Matrix2D.jsx            # 2D Vedic square matrix component
│   │   ├── Navbar.jsx              # Translucent sticky navbar with theme switcher
│   │   ├── Sim2DVisualizers.jsx    # 2D SVG graphs (tangents, Galton, waves)
│   │   ├── Sim3DScenes.jsx         # 3D WebGL scenes (attractor, orbits)
│   │   ├── SimulationLibrary.jsx   # Searchable catalog & filter grid
│   │   ├── VedicLogo.jsx           # Monogram brand identity
│   │   └── VedicScene.jsx          # Flagship Vedic Square 3D WebGL scene
│   ├── engine/                 # Reusable simulation engine & models
│   │   ├── aiSimulationEngine.js   # Prompt parsing & hypothesis generation
│   │   ├── beginnerGuides.js       # Plain-language "Start here" guides
│   │   ├── formulaLegends.js       # Variable-by-variable symbol dictionaries
│   │   ├── mathModels.js           # Math simulation algorithms (RK4, Galton, Fourier)
│   │   ├── physicsModels.js        # Physics engines (kinematics, orbits, optics, gas)
│   │   └── simulationRegistry.js   # Unified metadata catalog for all 10 simulations
│   ├── simulations/            # Simulation host runners
│   │   ├── UniversalSimRunner.jsx  # Dynamic multi-model parameter controller & runner
│   │   └── VedicSquareSim.jsx      # Flagship Vedic Square 3D laboratory runner
│   ├── utils/                  # Mathematical utilities
│   │   └── vedicMath.js            # Modular arithmetic modulo 9 & sacred geometries
│   ├── App.jsx                 # Top-level application coordinator
│   ├── app.test.js             # Integration and architecture unit tests
│   ├── education.test.js       # KaTeX formatting & educational content tests
│   ├── index.css               # Cosmic grid, range sliders & light/dark theme CSS
│   └── main.jsx                # Application root mounting
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0 or later recommended)
- `npm` (version 9.0 or later)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MojaveMix/SimuLab.git
   cd SimuLab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm start
   # or
   npx vite
   ```

4. **Open your browser:**
   Navigate to [http://localhost:5173](http://localhost:5173) to explore SimuLab.

---

## Testing & Quality Assurance

SimuLab maintains strict code quality and test coverage:

- **Run Unit Tests:**
  ```bash
  npm test
  ```
  Executes 19 unit tests covering:
  - Valid LaTeX formatting across all simulation formulas.
  - Plain-language symbol legend integrity.
  - Vedic Square digital root arithmetic and complement symmetry.
  - Projectile drag physics, orbit speeds, and ideal gas state calculations.
  - AI engine prompt extraction and simulation blueprint generation.

- **Run Linter:**
  ```bash
  npm run lint
  ```
  Validates strict ESLint rules (React Hooks, JSX syntax, and unused variable guards).

- **Production Build:**
  ```bash
  npm run build
  ```
  Compiles optimized production bundles using Vite and Rollup.

---

## Author & Credits

- **Platform Architect & Creator:** [Badr Moujahid](https://badr-moujahid.netlify.app/)
- **GitHub:** [@MojaveMix](https://github.com/MojaveMix)
- **LinkedIn:** [Badr Moujahid](https://www.linkedin.com/in/badr-moujahid-54a118286/)
- **Email:** [badermouj@gmail.com](mailto:badermouj@gmail.com)

*SimuLab was built as an open, expandable laboratory to empower students, educators, and researchers through interactive computational science.*
