import Particles from "react-tsparticles";

export default function ParticleBackground() {
  return (
    <Particles
      options={{
        particles: {
          number: { value: 15, density: { enable: true, value_area: 800 } },
          color: { value: "#6366F1" },
          shape: { type: "circle" },
          opacity: { value: 0.1, random: true },
          size: { value: 3, random: true },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "bounce" }
          }
        }
      }}
    />
  );
} 