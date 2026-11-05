// Plain-language guides so anyone can enjoy a simulation without prior math/physics knowledge.

export const BEGINNER_GUIDES = {
  "vedic-square-3d": {
    hook: "A multiplication table that secretly draws beautiful stars and patterns.",
    what:
      "Multiply two numbers, then keep adding the digits of the answer until one digit is left (56 → 5+6 = 11 → 1+1 = 2). Do that for every cell of a 9×9 times table and the same digit keeps forming shapes.",
    see: [
      "Each tower is one cell of the times table; the number on top is its single-digit result.",
      "Glowing towers are all cells that share your chosen digit. Beams connect them into a pattern.",
      "Turn on the mirror option to see digit pairs that add up to 9 (like 2 and 7) draw opposite shapes.",
    ],
    tryThis: [
      "Press the number buttons 1–9 and watch the pattern change.",
      "Switch the camera to “Top Mandala” for the cleanest view.",
      "Turn on the 9-Complement mirror and compare 2 with 7.",
    ],
  },
  "calculus-fourier-lab": {
    hook: "See how fast a curve is changing, and measure the area under it.",
    what:
      "Calculus answers two questions: “how steep is this curve right here?” (the yellow line) and “how much area is under it?” (the coloured bars).",
    see: [
      "The blue curve is the function. The yellow line just touches it at your chosen point and shows its slope.",
      "The coloured bars approximate the area under the curve; more bars make it more accurate.",
      "The “Fourier” option builds a square wave out of simple smooth waves added together.",
    ],
    tryThis: [
      "Click anywhere on the graph to move the yellow point.",
      "Raise “Riemann Partitions” and watch the error shrink.",
      "Pick “Fourier Square” and increase the frequency to add more waves.",
    ],
  },
  "chaos-attractor-3d": {
    hook: "The famous “butterfly effect”: tiny changes, wildly different futures.",
    what:
      "A single glowing point moves through 3D space following simple rules. Even though the rules are exact, its path never repeats, and it traces a butterfly-shaped figure.",
    see: [
      "The ribbon is the path the point has travelled; the white ball is where it is now.",
      "It circles two ‘wings’ and jumps between them unpredictably.",
    ],
    tryThis: [
      "Drag to rotate the 3D view and scroll to zoom.",
      "Change the Rayleigh number (ρ) and watch the shape change.",
      "Try the Rössler and Thomas buttons for other chaotic shapes.",
    ],
  },
  "probability-monte-carlo": {
    hook: "Drop balls and throw darts: randomness that reveals order, and even π.",
    what:
      "Each ball bounces left or right at random through rows of pegs. Individually it is unpredictable, but thousands of balls always form a smooth bell shape. Random dots thrown at a circle can even estimate π.",
    see: [
      "Green bars show where the simulated balls landed; the amber marks show the exact mathematical prediction.",
      "In the square, green dots landed inside the circle and red dots outside. Their ratio gives π.",
    ],
    tryThis: [
      "Increase the number of trials and watch the bars match the prediction better.",
      "Make the ball favour the right (p > 0.5) and see the bell shift.",
      "Change the random seed to get a different roll of the dice.",
    ],
  },
  "projectile-ballistics": {
    hook: "Throw something and see how air and gravity shape its flight.",
    what:
      "Anything thrown follows a curved path. Without air it is a perfect arch; with air resistance it falls short and lands more steeply.",
    see: [
      "The orange line is the real flight with air. The dashed grey line is the ideal flight with no air.",
      "The energy bar shows movement energy, height energy, and energy lost to air as heat.",
    ],
    tryThis: [
      "Apply the Moon preset: with weak gravity and no air it flies very far.",
      "Raise the drag factor and watch the real path shrink.",
      "Try 45°. Without air it gives the longest throw.",
    ],
  },
  "double-pendulum-lab": {
    hook: "Two swinging rods that look simple but move unpredictably.",
    what:
      "One pendulum swings regularly. Hang a second one from its end and the motion becomes chaotic: tiny differences at the start lead to completely different swings.",
    see: [
      "The pink trail shows where the bottom weight has been.",
      "The purple picture on the right (the phase portrait) shows the swing as a loop; tidy loops mean regular motion, messy ones mean chaos.",
    ],
    tryThis: [
      "Use the Small-Angle preset to see calm, regular swinging.",
      "Use the High-Energy preset to see chaos.",
      "Change the starting angle by only 5° and compare.",
    ],
  },
  "orbital-gravity-3d": {
    hook: "Watch a planet race around its star, fast up close and slow far away.",
    what:
      "Gravity pulls a planet toward its star. The result is an oval orbit: the planet speeds up when close and slows down when far.",
    see: [
      "The yellow ball is the star, the blue ball is the planet, and the tiny grey ball is its moon.",
      "“Periapsis” is the closest point and “Apoapsis” is the farthest point.",
    ],
    tryThis: [
      "Raise the eccentricity to stretch the orbit like a comet.",
      "Make the star heavier and see the planet move faster.",
      "Rotate the view to see the tilt of the orbit.",
    ],
  },
  "wave-interference-3d": {
    hook: "What happens when two ripples meet on water?",
    what:
      "Two sources make ripples. Where a crest meets a crest the wave gets bigger; where a crest meets a trough they cancel to calm water. This is how light and sound behave too.",
    see: [
      "Tall bright columns are big waves; low dark columns are calm spots.",
      "The green and blue balls are the two wave sources.",
    ],
    tryThis: [
      "Move the sources apart and see more calm lines appear.",
      "Set the phase to 180° and watch crests and troughs swap.",
      "Shorten the wavelength for finer patterns.",
    ],
  },
  "optics-refraction-lens": {
    hook: "Why a straw looks bent in water and how a magnifying glass works.",
    what:
      "Light bends when it passes from one material to another, such as air to glass. A lens uses that bending to focus light and form images.",
    see: [
      "Left: a red laser hits a surface. Part reflects and part bends into the second material.",
      "Right: an object (green arrow) and its image (pink arrow) formed by a lens.",
    ],
    tryThis: [
      "Use the Water → Air preset and push the angle up to see light trapped inside (total internal reflection).",
      "Slide the object closer than the focal length and watch the image flip to virtual.",
    ],
  },
  "thermodynamics-gas-lab": {
    hook: "Why heating a gas makes pressure rise: tiny molecules bouncing around.",
    what:
      "A gas is billions of tiny molecules flying around and hitting the walls. Heat makes them faster, so they hit harder and more often, which is what pressure is.",
    see: [
      "Left: the dots are gas molecules in a box with a moving lid (piston).",
      "Right: the curve shows how many molecules move at each speed. Hotter gas shifts it to the right.",
    ],
    tryThis: [
      "Raise the temperature and watch the dots turn red and the curve move right.",
      "Squeeze the volume to see pressure rise.",
      "Swap light helium for heavier argon and compare speeds.",
    ],
  },
};

export function getBeginnerGuide(simId) {
  return BEGINNER_GUIDES[simId] || null;
}
