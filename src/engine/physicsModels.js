// Validated Physics Simulation Models & Numerical Integrators for SimuLab

/**
 * 1. Ballistic Projectile Motion with Quadratic Aerodynamic Drag
 * Integrates equations of motion:
 *   m dv_x/dt = -1/2 * rho * C_d * A * |v| * v_x
 *   m dv_y/dt = -m*g - 1/2 * rho * C_d * A * |v| * v_y
 * Also computes analytical vacuum trajectory for comparison, kinetic & potential energy profiles.
 */
export function computeProjectileSimulation({
  velocity = 42,      // m/s
  angleDeg = 48,      // degrees
  gravity = 9.81,     // m/s^2
  mass = 4.0,         // kg
  dragCoeff = 0.02,   // effective k = (0.5 * rho * Cd * A)
  initialHeight = 0,  // m
  dt = 0.02,
}) {
  const rad = (angleDeg * Math.PI) / 180;
  const vx0 = velocity * Math.cos(rad);
  const vy0 = velocity * Math.sin(rad);

  // Analytical vacuum solution
  const discriminant = vy0 * vy0 + 2 * gravity * Math.max(0, initialHeight);
  const vacuumFlightTime = gravity > 0 ? (vy0 + Math.sqrt(discriminant)) / gravity : 10;
  const vacuumRange = vx0 * vacuumFlightTime;
  const vacuumMaxHeight = initialHeight + (vy0 * vy0) / (2 * Math.max(0.01, gravity));

  const vacuumPoints = [];
  const vacSteps = 120;
  for (let i = 0; i <= vacSteps; i++) {
    const t = (i / vacSteps) * vacuumFlightTime;
    const x = vx0 * t;
    const y = Math.max(0, initialHeight + vy0 * t - 0.5 * gravity * t * t);
    vacuumPoints.push({ t, x, y });
  }

  // Numerical RK4 / Euler-Cromer integration with quadratic drag
  const trajectory = [];
  let x = 0;
  let y = Math.max(0, initialHeight);
  let vx = vx0;
  let vy = vy0;
  let t = 0;
  let maxHeight = y;
  let maxSteps = 2500;

  while (y >= 0 && maxSteps-- > 0) {
    const speed = Math.hypot(vx, vy);
    const ke = 0.5 * mass * speed * speed;
    const pe = mass * gravity * y;
    trajectory.push({
      t,
      x,
      y,
      vx,
      vy,
      speed,
      kineticEnergy: ke,
      potentialEnergy: pe,
      totalEnergy: ke + pe,
    });

    if (y > maxHeight) maxHeight = y;

    const dragFactor = (dragCoeff * speed) / Math.max(0.1, mass);
    const ax = -dragFactor * vx;
    const ay = -gravity - dragFactor * vy;

    vx += ax * dt;
    vy += ay * dt;
    x += vx * dt;
    y += vy * dt;
    t += dt;

    if (t > 0.05 && y < 0) {
      // Interpolate ground impact
      const prev = trajectory[trajectory.length - 1];
      const frac = prev.y / Math.max(1e-6, prev.y - y);
      const impactX = prev.x + frac * (x - prev.x);
      const impactT = prev.t + frac * dt;
      const impactSpeed = Math.hypot(vx, vy);
      trajectory.push({
        t: impactT,
        x: impactX,
        y: 0,
        vx,
        vy,
        speed: impactSpeed,
        kineticEnergy: 0.5 * mass * impactSpeed * impactSpeed,
        potentialEnergy: 0,
        totalEnergy: 0.5 * mass * impactSpeed * impactSpeed,
      });
      break;
    }
  }

  const last = trajectory[trajectory.length - 1] || { x: 0, t: 0, speed: 0 };
  const initialEnergy = 0.5 * mass * velocity * velocity + mass * gravity * initialHeight;
  const dissipatedEnergy = Math.max(0, initialEnergy - (last.totalEnergy || 0));

  return {
    trajectory,
    vacuumPoints,
    range: last.x,
    flightTime: last.t,
    maxHeight,
    impactSpeed: last.speed,
    vacuumRange,
    vacuumMaxHeight,
    vacuumFlightTime,
    initialEnergy,
    dissipatedEnergy,
  };
}

/**
 * 2. Nonlinear Simple & Coupled Double Pendulum Lagrangian Dynamics (RK4 Solver)
 */
export function stepDoublePendulum(state, params, dt = 0.016) {
  const { theta1, omega1, theta2, omega2 } = state;
  const {
    length1 = 2.0,
    length2 = 1.6,
    mass1 = 2.0,
    mass2 = 1.5,
    gravity = 9.81,
    damping = 0.015,
  } = params;

  const derivatives = (th1, om1, th2, om2) => {
    const delta = th1 - th2;
    const den1 =
      length1 * (2 * mass1 + mass2 - mass2 * Math.cos(2 * th1 - 2 * th2));
    const num1 =
      -gravity * (2 * mass1 + mass2) * Math.sin(th1) -
      mass2 * gravity * Math.sin(th1 - 2 * th2) -
      2 *
        Math.sin(delta) *
        mass2 *
        (om2 * om2 * length2 + om1 * om1 * length1 * Math.cos(delta));

    const alpha1 = num1 / Math.max(1e-5, den1) - damping * om1;

    const den2 =
      length2 * (2 * mass1 + mass2 - mass2 * Math.cos(2 * th1 - 2 * th2));
    const num2 =
      2 *
      Math.sin(delta) *
      (om1 * om1 * length1 * (mass1 + mass2) +
        gravity * (mass1 + mass2) * Math.cos(th1) +
        om2 * om2 * length2 * mass2 * Math.cos(delta));

    const alpha2 = num2 / Math.max(1e-5, den2) - damping * om2;

    return { dth1: om1, dom1: alpha1, dth2: om2, dom2: alpha2 };
  };

  const k1 = derivatives(theta1, omega1, theta2, omega2);
  const k2 = derivatives(
    theta1 + 0.5 * dt * k1.dth1,
    omega1 + 0.5 * dt * k1.dom1,
    theta2 + 0.5 * dt * k1.dth2,
    omega2 + 0.5 * dt * k1.dom2
  );
  const k3 = derivatives(
    theta1 + 0.5 * dt * k2.dth1,
    omega1 + 0.5 * dt * k2.dom1,
    theta2 + 0.5 * dt * k2.dth2,
    omega2 + 0.5 * dt * k2.dom2
  );
  const k4 = derivatives(
    theta1 + dt * k3.dth1,
    omega1 + dt * k3.dom1,
    theta2 + dt * k3.dth2,
    omega2 + dt * k3.dom2
  );

  const nextTheta1 =
    theta1 + (dt / 6) * (k1.dth1 + 2 * k2.dth1 + 2 * k3.dth1 + k4.dth1);
  const nextOmega1 =
    omega1 + (dt / 6) * (k1.dom1 + 2 * k2.dom1 + 2 * k3.dom1 + k4.dom1);
  const nextTheta2 =
    theta2 + (dt / 6) * (k1.dth2 + 2 * k2.dth2 + 2 * k3.dth2 + k4.dth2);
  const nextOmega2 =
    omega2 + (dt / 6) * (k1.dom2 + 2 * k2.dom2 + 2 * k3.dom2 + k4.dom2);

  const x1 = length1 * Math.sin(nextTheta1);
  const y1 = -length1 * Math.cos(nextTheta1);
  const x2 = x1 + length2 * Math.sin(nextTheta2);
  const y2 = y1 - length2 * Math.cos(nextTheta2);

  // Velocities and mechanical energies
  const vx1 = length1 * nextOmega1 * Math.cos(nextTheta1);
  const vy1 = length1 * nextOmega1 * Math.sin(nextTheta1);
  const vx2 = vx1 + length2 * nextOmega2 * Math.cos(nextTheta2);
  const vy2 = vy1 + length2 * nextOmega2 * Math.sin(nextTheta2);

  const kinetic =
    0.5 * mass1 * (vx1 * vx1 + vy1 * vy1) +
    0.5 * mass2 * (vx2 * vx2 + vy2 * vy2);
  const minPotentialRef = -(mass1 * length1 + mass2 * (length1 + length2)) * gravity;
  const potential = (mass1 * y1 + mass2 * y2) * gravity - minPotentialRef;

  return {
    theta1: nextTheta1,
    omega1: nextOmega1,
    theta2: nextTheta2,
    omega2: nextOmega2,
    x1,
    y1,
    x2,
    y2,
    kinetic,
    potential,
    totalEnergy: kinetic + potential,
    smallAnglePeriod1: 2 * Math.PI * Math.sqrt(length1 / Math.max(0.1, gravity)),
  };
}

/**
 * 3. Orbital Mechanics & Keplerian Gravitational System
 * Computes 3D / 2D orbital trajectories under inverse-square gravity F = -G*M*m / r^2
 */
export function computeOrbitalSystem({
  starMass = 1.0,       // Solar masses (scaled G*M = 4*pi^2 * starMass)
  semiMajorAxis = 4.2,  // AU (scaled scene units)
  eccentricity = 0.35,  // 0 <= e < 0.92
  inclinationDeg = 14,  // orbital plane tilt in 3D
  moonSpeedFactor = 1.0,
}) {
  const mu = 39.478 * starMass; // 4 * pi^2 * M (AU^3 / yr^2)
  const a = Math.max(1.2, semiMajorAxis);
  const e = Math.max(0, Math.min(0.88, eccentricity));
  const incRad = (inclinationDeg * Math.PI) / 180;

  // Kepler's 3rd Law: T = 2*pi * sqrt(a^3 / mu)
  const orbitalPeriod = 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / mu);
  const periapsis = a * (1 - e);
  const apoapsis = a * (1 + e);

  // Vis-Viva equation: v = sqrt(mu * (2/r - 1/a))
  const vPeriapsis = Math.sqrt(mu * (2 / periapsis - 1 / a));
  const vApoapsis = Math.sqrt(mu * (2 / apoapsis - 1 / a));
  const specificEnergy = -mu / (2 * a);
  const angularMomentum = Math.sqrt(mu * a * (1 - e * e));

  // Precompute full 3D orbit ellipse points (true anomaly 0 -> 2*pi)
  const orbitPoints = [];
  const segments = 180;
  for (let i = 0; i <= segments; i++) {
    const nu = (i / segments) * Math.PI * 2;
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(nu));
    const xOrb = r * Math.cos(nu);
    const zOrb = r * Math.sin(nu);

    const x = xOrb;
    const y = zOrb * Math.sin(incRad);
    const z = zOrb * Math.cos(incRad);
    const v = Math.sqrt(mu * (2 / r - 1 / a));
    orbitPoints.push({ nu, r, x, y, z, v });
  }

  return {
    mu,
    semiMajorAxis: a,
    eccentricity: e,
    inclinationRad: incRad,
    orbitalPeriod,
    periapsis,
    apoapsis,
    vPeriapsis,
    vApoapsis,
    specificEnergy,
    angularMomentum,
    moonSpeedFactor,
    orbitPoints,
  };
}

/**
 * 4. Wave Interference, Superposition & Standing Wave Harmonics
 * Computes two-source 2D interference field and 1D cross-section superposition
 * psi(x, y, t) = A1 * sin(k * r1 - omega * t) + A2 * sin(k * r2 - omega * t + phi)
 */
export function computeWaveInterference({
  wavelength = 1.6,
  sourceSeparation = 3.6,
  frequency = 1.5,
  amplitude = 1.0,
  phaseShiftDeg = 0,
  damping = 0.04,
  time = 0,
}) {
  const k = (2 * Math.PI) / Math.max(0.3, wavelength);
  const omega = 2 * Math.PI * frequency;
  const phi = (phaseShiftDeg * Math.PI) / 180;
  const waveSpeed = wavelength * frequency;

  const s1 = { x: -sourceSeparation / 2, z: 0 };
  const s2 = { x: sourceSeparation / 2, z: 0 };

  // Number of constructive interference antinodal lines: m * lambda <= d
  const maxConstructiveOrder = Math.floor(sourceSeparation / wavelength);
  const totalNodalLines = 2 * Math.floor(sourceSeparation / wavelength + 0.5);

  // Sample cross-section along detector screen at z = 4.0
  const detectorZ = 4.0;
  const detectorProfile = [];
  for (let i = -40; i <= 40; i++) {
    const x = (i / 40) * 6;
    const r1 = Math.hypot(x - s1.x, detectorZ - s1.z);
    const r2 = Math.hypot(x - s2.x, detectorZ - s2.z);
    const w1 = amplitude * Math.exp(-damping * r1) * Math.sin(k * r1 - omega * time);
    const w2 = amplitude * Math.exp(-damping * r2) * Math.sin(k * r2 - omega * time + phi);
    const deltaPhase = k * (r2 - r1) + phi;
    const envelopeAmplitude =
      2 * amplitude * Math.abs(Math.cos(deltaPhase / 2)) * Math.exp(-damping * ((r1 + r2) / 2));
    detectorProfile.push({
      x,
      instantaneous: w1 + w2,
      intensity: envelopeAmplitude * envelopeAmplitude,
      envelope: envelopeAmplitude,
    });
  }

  return {
    k,
    omega,
    phi,
    waveSpeed,
    s1,
    s2,
    maxConstructiveOrder,
    totalNodalLines,
    detectorProfile,
  };
}

/**
 * 5. Geometric Optics: Snell's Law Refraction, Total Internal Reflection & Thin Lens
 *   n1 * sin(theta1) = n2 * sin(theta2)
 *   1/f = 1/do + 1/di
 */
export function computeOpticsModel({
  n1 = 1.0,              // Incident refractive index (e.g. Air = 1.0, Water = 1.33, Glass = 1.52)
  n2 = 1.52,             // Refracted refractive index
  incidentAngleDeg = 38, // degrees from normal (0..85)
  focalLength = 2.5,     // Thin lens focal length (m)
  objectDistance = 4.2,  // Object distance d_o (m)
  objectHeight = 1.4,    // Object height h_o (m)
}) {
  const theta1Rad = (incidentAngleDeg * Math.PI) / 180;
  const sinTheta2 = (n1 / n2) * Math.sin(theta1Rad);
  const isTotalInternalReflection = Math.abs(sinTheta2) > 1.0;

  const criticalAngleDeg =
    n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null;

  const refractedAngleDeg = isTotalInternalReflection
    ? null
    : (Math.asin(Math.max(-1, Math.min(1, sinTheta2))) * 180) / Math.PI;

  // Fresnel reflectance approximation (s-polarized & unpolarized average)
  let reflectance = 1.0;
  if (!isTotalInternalReflection) {
    const theta2Rad = (refractedAngleDeg * Math.PI) / 180;
    const cos1 = Math.cos(theta1Rad);
    const cos2 = Math.cos(theta2Rad);
    const rs = Math.pow((n1 * cos1 - n2 * cos2) / (n1 * cos1 + n2 * cos2), 2);
    const rp = Math.pow((n1 * cos2 - n2 * cos1) / (n1 * cos2 + n2 * cos1), 2);
    reflectance = 0.5 * (rs + rp);
  }
  const transmittance = 1 - reflectance;

  // Brewster's polarizing angle: theta_B = atan(n2 / n1)
  const brewsterAngleDeg = (Math.atan(n2 / n1) * 180) / Math.PI;

  // Thin Lens equation: 1/di = 1/f - 1/do
  const invDi = 1 / focalLength - 1 / objectDistance;
  const imageDistance = Math.abs(invDi) > 1e-4 ? 1 / invDi : Infinity;
  const magnification = Number.isFinite(imageDistance)
    ? -imageDistance / objectDistance
    : Infinity;
  const imageHeight = Number.isFinite(magnification)
    ? magnification * objectHeight
    : 0;
  const isRealImage = imageDistance > 0 && Number.isFinite(imageDistance);

  // Speed of light in media (c = 299,792 km/s)
  const c0 = 299792;
  const v1 = c0 / n1;
  const v2 = c0 / n2;

  return {
    n1,
    n2,
    incidentAngleDeg,
    refractedAngleDeg,
    reflectionAngleDeg: incidentAngleDeg,
    isTotalInternalReflection,
    criticalAngleDeg,
    brewsterAngleDeg,
    reflectance,
    transmittance,
    focalLength,
    objectDistance,
    imageDistance,
    magnification,
    objectHeight,
    imageHeight,
    isRealImage,
    speedMedium1: v1,
    speedMedium2: v2,
  };
}

/**
 * 6. Ideal Gas Law & Maxwell-Boltzmann Kinetic Thermodynamics
 *   P * V = n * R * T
 *   v_rms = sqrt(3 * R * T / M)
 *   v_mp  = sqrt(2 * R * T / M)
 *   v_avg = sqrt(8 * R * T / (pi * M))
 */
export function computeThermodynamicsModel({
  temperatureK = 300,     // Kelvin (50..1200 K)
  volumeL = 10.0,         // Liters (2..30 L)
  moles = 1.5,            // mol (0.2..5.0)
  molarMassG = 4.0,       // g/mol (e.g. He=4, Ne=20.18, N2=28, Ar=40, CO2=44)
}) {
  const R = 8.3144626; // J/(mol*K)
  const R_atm = 0.082057; // L*atm/(mol*K)
  const M_kg = Math.max(0.002, molarMassG / 1000); // kg/mol

  // Pressure in kPa and atm
  const volumeM3 = volumeL / 1000;
  const pressurePa = (moles * R * temperatureK) / volumeM3;
  const pressureKPa = pressurePa / 1000;
  const pressureAtm = (moles * R_atm * temperatureK) / volumeL;

  // Characteristic molecular velocities (m/s)
  const vRms = Math.sqrt((3 * R * temperatureK) / M_kg);
  const vMostProbable = Math.sqrt((2 * R * temperatureK) / M_kg);
  const vMean = Math.sqrt((8 * R * temperatureK) / (Math.PI * M_kg));

  // Internal translational kinetic energy U = (3/2) * n * R * T (Joules)
  const internalEnergyJ = 1.5 * moles * R * temperatureK;

  // Relative entropy change from standard state (T0 = 298.15K, V0 = 10L)
  const deltaEntropy =
    moles *
    R *
    (1.5 * Math.log(temperatureK / 298.15) + Math.log(volumeL / 10.0));

  // Maxwell-Boltzmann distribution curve f(v) for v in [0, 3500] m/s
  const distribution = [];
  const maxV = 3200;
  const steps = 64;
  for (let i = 0; i <= steps; i++) {
    const v = (i / steps) * maxV;
    const a = M_kg / (2 * R * temperatureK);
    const probDensity =
      4 *
      Math.PI *
      Math.pow(a / Math.PI, 1.5) *
      v *
      v *
      Math.exp(-a * v * v);
    distribution.push({
      v,
      probDensity: probDensity * 1000, // scaled per (km/s) for display clarity
    });
  }

  return {
    temperatureK,
    volumeL,
    moles,
    molarMassG,
    pressureKPa,
    pressureAtm,
    vRms,
    vMostProbable,
    vMean,
    internalEnergyJ,
    deltaEntropy,
    distribution,
  };
}
