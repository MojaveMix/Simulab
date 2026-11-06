// Plain-language "what do the letters mean?" legends, keyed by formula name
// (see simulationRegistry.js). Each entry: [LaTeX symbol, everyday meaning].

export const FORMULA_LEGENDS = {
  "Slope of a curve (derivative)": [
    ["f'(x_0)", "the slope (steepness) of the graph at the point x₀"],
    ["h", "a tiny step to the right of x₀"],
    ["\\lim_{h \\to 0}", "'what the value approaches as the step h shrinks to nothing'"],
  ],
  "Quadratic formula": [
    ["a, b, c", "the three numbers in y = ax² + bx + c"],
    ["b^2 - 4ac", "the discriminant: positive = 2 crossings, zero = 1 touch, negative = none"],
    ["\\pm", "'plus or minus' — gives the two crossing points"],
  ],
  "Graph transformations": [
    ["a", "stretches the graph up/down (negative flips it)"],
    ["b", "squeezes or stretches it sideways"],
    ["h, k", "slide the graph right/left (h) and up/down (k)"],
  ],
  "Sine and cosine on the circle": [
    ["\\theta", "the angle the point has turned through"],
    ["\\cos\\theta", "how far right the point is"],
    ["\\sin\\theta", "how high the point is"],
  ],
  "Pythagorean identity": [
    ["\\sin^2\\theta", "sine multiplied by itself"],
    ["\\cos^2\\theta", "cosine multiplied by itself"],
    ["1", "the radius of the unit circle squared"],
  ],
  "Degrees and radians": [
    ["\\theta_{\\text{rad}}", "the angle in radians"],
    ["\\theta_{\\text{deg}}", "the angle in degrees"],
    ["\\pi", "about 3.14159; half a turn is π radians"],
  ],
  "Hooke's law": [
    ["F", "the force the spring pulls back with (newtons)"],
    ["k", "spring stiffness: bigger = harder to stretch"],
    ["x", "how far the spring is stretched from rest"],
  ],
  "Period of a spring": [
    ["T", "time for one full back-and-forth swing (seconds)"],
    ["m", "mass of the block (kg)"],
    ["k", "spring stiffness (N/m)"],
  ],
  "Damped motion": [
    ["A", "starting stretch"],
    ["\\gamma", "how quickly friction drains the motion"],
    ["\\omega_d", "the swinging speed with friction included"],
  ],
  "Ohm's law": [
    ["V", "voltage, the 'push' of the battery (volts)"],
    ["I", "current, how much charge flows (amps)"],
    ["R", "resistance, how hard it is to flow (ohms)"],
  ],
  "Resistors in series and parallel": [
    ["R_1, R_2", "the two resistors (ohms)"],
    ["R_{\\text{series}}", "total resistance when they are in one line"],
    ["R_{\\text{parallel}}", "total resistance when current can split between them"],
  ],
  "Electric power": [
    ["P", "power: energy used per second (watts)"],
    ["V", "voltage (volts)"],
    ["I", "current (amps)"],
  ],
  "Newton's second law": [
    ["\\sum F", "the total (net) force on the object, newtons"],
    ["m", "mass of the object (kg)"],
    ["a", "acceleration (m/s²)"],
  ],
  "Forces on a slope": [
    ["N", "normal force: the ramp pushing back on the block"],
    ["m g", "weight: mass times gravity (g ≈ 9.81)"],
    ["\\theta", "the angle of the ramp"],
  ],
  "Friction": [
    ["f_{\\max}", "the biggest friction force available"],
    ["\\mu", "friction coefficient: 0 = ice, 1 = very grippy"],
    ["N", "normal force pressing the surfaces together"],
  ],
  "Digital Root Congruence": [
    ["n", "any whole number, e.g. a product like 7 × 8 = 56"],
    ["dr(n)", "the 'digital root': keep adding the digits until one digit is left (56 → 5+6 = 11 → 1+1 = 2)"],
    ["\\bmod 9", "'remainder after dividing by 9'"],
  ],
  "9-Sum Complement Reflection": [
    ["r, c", "the row and column of the multiplication table"],
    ["9 - r", "the 'mirror' row: 1 ↔ 8, 2 ↔ 7, 3 ↔ 6, 4 ↔ 5"],
    ["\\equiv 9", "the two answers always add up to 9"],
  ],
  "3D Harmonic Pillar Wave": [
    ["h(x,z,t)", "height of a pillar at grid position (x, z) at time t"],
    ["A", "maximum wave height"],
    ["\\omega", "how fast the wave ripples in time"],
    ["k", "how closely packed the ripples are in space"],
  ],
  "Instantaneous Derivative & Tangent": [
    ["f'(x_0)", "the exact slope at your chosen point x₀"],
    ["h", "a tiny step to the right of x₀"],
    ["y", "height of the yellow tangent line at any point x"],
  ],
  "Definite Riemann & Simpson Integral": [
    ["\\int_a^b", "'accumulate everything between start a and end b'"],
    ["f(x)", "height of the curve"],
    ["dx", "a tiny slice of width"],
    ["N", "how many rectangular slices you cut the area into"],
  ],
  "Fourier Odd-Harmonic Series": [
    ["f(x)", "the resulting square-ish wave"],
    ["A", "wave amplitude"],
    ["k", "harmonic number: 1st, 3rd, 5th wave..."],
    ["\\sin", "the smooth sine wave being added"],
  ],
  "Lorenz Convection System": [
    ["x, y, z", "the point's position in 3D space"],
    ["\\sigma", "how thick/viscous the fluid is (Prandtl number)"],
    ["\\rho", "temperature difference driving the flow (Rayleigh number)"],
    ["\\beta", "the shape/aspect ratio of the convection roll"],
  ],
  "Phase Volume Contraction (Lie Derivative)": [
    ["\\nabla \\cdot \\mathbf{F}", "'how fast a cloud of points shrinks in size'"],
    ["< 0", "negative: paths get sucked into a thin ribbon, never blowing up"],
  ],
  "Binomial Probability Mass": [
    ["P(X = k)", "chance of getting exactly k right-turns"],
    ["n", "number of rows of pins the ball hits"],
    ["p", "chance of bouncing right at any single pin (0.5 for fair)"],
    ["\\binom{n}{k}", "'number of different paths that end in slot k'"],
  ],
  "Central Limit Moments": [
    ["\\mu", "the average slot balls land in"],
    ["\\sigma", "how spread out the bell curve is"],
  ],
  "Monte Carlo Quadrature for π": [
    ["\\hat{\\pi}", "our estimated value of π"],
    ["N_{\\text{inside}}", "how many random dots landed inside the circle"],
    ["N_{\\text{total}}", "total dots dropped inside the square"],
  ],
  "Newtonian Equations with Quadratic Drag": [
    ["m", "mass of the projectile (kg)"],
    ["\\mathbf{v}", "speed and direction of the ball"],
    ["\\mathbf{g}", "gravity pulling down (9.81 on Earth, 1.62 on Moon)"],
    ["C_d", "how aerodynamic the shape is"],
    ["\\rho", "air density (thick air = more drag, vacuum = 0)"],
  ],
  "Ideal Vacuum Range & Apex": [
    ["R_{\\text{vac}}", "how far the ball would fly with zero air"],
    ["H_{\\max}", "highest point reached"],
    ["v_0", "launch speed"],
    ["\\theta", "launch angle (45° gives maximum distance in vacuum)"],
  ],
  "Mechanical Energy Balance": [
    ["E(t)", "total energy: energy of motion + energy of height"],
    ["W_{\\text{drag}}", "energy lost as heat to the air"],
  ],
  "System Lagrangian": [
    ["\\mathcal{L}", "the 'Lagrangian' = energy of motion minus energy of height"],
    ["m_1, m_2", "masses of the two pendulum bobs"],
    ["L_1, L_2", "lengths of the two rods"],
    ["\\theta_1, \\theta_2", "angles of the two rods from straight down"],
  ],
  "Small-Angle Harmonic Period": [
    ["T_0", "time for one gentle swing when released from a small angle"],
    ["L_1", "length of the rod"],
    ["g", "gravity"],
  ],
  "Vis-Viva Orbital Velocity": [
    ["v", "speed of the planet at its current position"],
    ["G M", "gravitational pull of the central star"],
    ["r", "current distance from star to planet"],
    ["a", "average distance (semi-major axis)"],
  ],
  "Kepler's Third Harmonic Law": [
    ["T", "time to complete one full orbit ('one year')"],
    ["a", "average distance from the star"],
    ["e", "eccentricity: 0 = perfect circle, 0.9 = stretched oval"],
  ],
  "Two-Source Wave Superposition": [
    ["\\Psi", "water height at position (x, z) at time t"],
    ["r_1, r_2", "distances to the two wave sources"],
    ["k", "how closely packed the wave ripples are"],
    ["\\omega", "how fast the waves bob up and down"],
  ],
  "Constructive & Destructive Fringe Condition": [
    ["\\Delta r", "difference in distance to the two sources"],
    ["\\lambda", "wavelength: crest-to-crest distance"],
    ["m", "any whole number: 0, 1, 2..."],
  ],
  "Snell-Descartes Law of Refraction": [
    ["n_1, n_2", "how much each material slows light (air ≈ 1, glass ≈ 1.5)"],
    ["\\theta_1", "angle the light arrives at"],
    ["\\theta_2", "angle after it bends"],
    ["\\theta_c", "critical angle: past it, light cannot escape"],
  ],
  "Gaussian Thin Lens Equation": [
    ["f", "focal length of the lens"],
    ["d_o", "distance from object to lens"],
    ["d_i", "distance from lens to image"],
    ["M", "magnification: how much bigger or smaller (negative = upside-down)"],
    ["h_o, h_i", "heights of the object and the image"],
  ],
  "Ideal Gas Equation of State": [
    ["P", "pressure"],
    ["V", "volume of the container"],
    ["n", "amount of gas (moles)"],
    ["T", "temperature in Kelvin"],
    ["R", "a fixed constant of nature (8.314)"],
  ],
  "Maxwell-Boltzmann Speeds": [
    ["v_{\\text{rms}}", "typical molecule speed"],
    ["T", "temperature in Kelvin"],
    ["M", "mass of one mole of the gas"],
    ["R", "a fixed constant of nature (8.314)"],
  ],
};

export const FORMULA_LEGENDS_I18N = {
  fr: {
    "Slope of a curve (derivative)": [
      ["f'(x_0)", "la pente (taux de variation) de la courbe au point x₀"],
      ["h", "un petit incrément à droite de x₀"],
      ["\\lim_{h \\to 0}", "la valeur limite quand l'incrément h tend vers zéro"],
    ],
    "Quadratic formula": [
      ["a, b, c", "les coefficients de y = ax² + bx + c"],
      ["b^2 - 4ac", "le discriminant Δ : positif = 2 racines, nul = 1 racine double, négatif = aucune"],
      ["\\pm", "plus ou moins — donne les deux solutions"],
    ],
    "Hooke's law": [
      ["F", "la force de rappel exercée par le ressort (newtons)"],
      ["k", "la raideur du ressort (N/m) : plus elle est grande, plus il est dur"],
      ["x", "l'allongement du ressort par rapport à sa position de repos"],
    ],
    "Period of a spring": [
      ["T", "la période d'un aller-retour complet (secondes)"],
      ["m", "la masse du solide oscillant (kg)"],
      ["k", "la raideur du ressort (N/m)"],
    ],
    "Ohm's law": [
      ["V", "la tension électrique aux bornes (volts)"],
      ["I", "l'intensité du courant qui traverse le circuit (ampères)"],
      ["R", "la résistance électrique qui s'oppose au passage du courant (ohms)"],
    ],
    "Newton's second law": [
      ["\\sum F", "la somme vectorielle des forces appliquées (newtons)"],
      ["m", "la masse de l'objet (kg)"],
      ["a", "l'accélération subie par l'objet (m/s²)"],
    ],
    "Vis-Viva Orbital Velocity": [
      ["v", "la vitesse orbitale du corps à sa position actuelle"],
      ["G M", "le paramètre gravitationnel de l'étoile centrale"],
      ["r", "la distance instantanée entre l'étoile et la planète"],
      ["a", "le demi-grand axe de l'orbite"],
    ],
    "Ideal Gas Equation of State": [
      ["P", "la pression du gaz (pascals)"],
      ["V", "le volume du récipient"],
      ["n", "la quantité de matière de gaz (moles)"],
      ["T", "la température absolue en Kelvin"],
      ["R", "la constante universelle des gaz parfaits (8,314 J/mol·K)"],
    ],
  },
  ar: {
    "Slope of a curve (derivative)": [
      ["f'(x_0)", "ميل المماس (معدل التغير اللحظي) عند النقطة x₀"],
      ["h", "خطوة صغيرة جداً على يمين النقطة x₀"],
      ["\\lim_{h \\to 0}", "النهاية عندما تقترب الخطوة h من الصفر التام"],
    ],
    "Quadratic formula": [
      ["a, b, c", "معاملات المعادلة التربيعية y = ax² + bx + c"],
      ["b^2 - 4ac", "المميّز: موجب = جذران، صفر = جذر مكرر، سالب = لا توجد جذور حقيقية"],
      ["\\pm", "موجب أو سالب — لإيجاد جذري المعادلة"],
    ],
    "Hooke's law": [
      ["F", "قوة الإرجاع التي يبذلها النابض (بالنيوتن)"],
      ["k", "ثابت صلابة النابض: كلما زاد زادت مقاومة الشد"],
      ["x", "مقدار إزاحة أو استطالة النابض عن موضع اتزانه"],
    ],
    "Period of a spring": [
      ["T", "الزمن الدوري اللازم لدورة اهتزاز كاملة (بالثواني)"],
      ["m", "كتلة الجسم المهتز (كجم)"],
      ["k", "ثابت صلابة النابض (نيوتن/متر)"],
    ],
    "Ohm's law": [
      ["V", "فرق الجهد الكهربائي بين طرفي العنصر (فولت)"],
      ["I", "شدة التيار الكهربائي المار في الدائرة (أمبير)"],
      ["R", "المقاومة الكهربائية الممانعة للتيار (أوم)"],
    ],
    "Newton's second law": [
      ["\\sum F", "محصلة القوى المؤثرة على الجسم (بالنيوتن)"],
      ["m", "كتلة الجسم (كجم)"],
      ["a", "تسارع حركة الجسم (م/ث²)"],
    ],
    "Vis-Viva Orbital Velocity": [
      ["v", "سرعة الكوكب اللحظية في مداره"],
      ["G M", "ثابت الجاذبية مضروباً في كتلة النجم المركزي"],
      ["r", "المسافة اللحظية بين الكوكب والنجم"],
      ["a", "نصف المحور الأكبر للمدار البيضاوي"],
    ],
    "Ideal Gas Equation of State": [
      ["P", "ضغط الغاز داخل الوعاء"],
      ["V", "حجم الوعاء أو الغرفة"],
      ["n", "كمية مادة الغاز (بالمول)"],
      ["T", "درجة الحرارة المطلقة (بالكلفن)"],
      ["R", "الثابت العام للغازات المثالية (8.314)"],
    ],
  },
};

export function getFormulaLegend(name, lang = "en") {
  if (lang !== "en" && FORMULA_LEGENDS_I18N[lang]?.[name]) {
    return FORMULA_LEGENDS_I18N[lang][name];
  }
  return FORMULA_LEGENDS[name] || null;
}
