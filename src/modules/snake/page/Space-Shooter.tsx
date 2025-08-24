import React, { useRef, useEffect, useState } from "react";
import { Box, Button, VStack, Text, Flex } from "@chakra-ui/react";
import spaceship from "@common/assets/spacecraft-1.png";
import shoot from "@common/assets/shoot-1.wav";
import explosion from "@common/assets/explosion-1.wav";
import asteroidImgSrc from "@common/assets/asteroid.png";

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lasers, setLasers] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });

  // Responsive canvas size
  useEffect(() => {
    const resizeCanvas = () => {
      const w = Math.min(window.innerWidth - 40, 500); // max 500px
      const h = Math.min(window.innerHeight - 150, 500); // leave space for header/footer
      setCanvasSize({ width: w, height: h });
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Game state
  const player = useRef({ x: 200, y: 400, width: 70, height: 70, speed: 8 });
  const debris = useRef<
    { x: number; y: number; size: number; speed: number }[]
  >([]);
  const bullets = useRef<
    { x: number; y: number; width: number; height: number; speed: number }[]
  >([]);
  const powerUps = useRef<
    { x: number; y: number; size: number; type: "up" | "down" }[]
  >([]);
  const explosions = useRef<{ particles: Particle[] }[]>([]);
  const keys = useRef<Record<string, boolean>>({});

  type Particle = {
    x: number;
    y: number;
    radius: number;
    color: string;
    speedX: number;
    speedY: number;
    alpha: number;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Scale values based on canvas size
    const scale = canvas.width / 500;

    player.current = {
      x: canvas.width / 2 - 35 * scale,
      y: canvas.height - 100 * scale,
      width: 70 * scale,
      height: 70 * scale,
      speed: 6 * scale,
    };

    // Load images
    const shipImg = new Image();
    shipImg.src = spaceship;
    const asteroidImg = new Image();
    asteroidImg.src = asteroidImgSrc;

    // Sound helpers
    const playShootSound = () => {
      const s = new Audio(shoot);
      s.play().catch(() => {});
    };
    const playExplosionSound = () => {
      const e = new Audio(explosion);
      e.play().catch(() => {});
    };

    // Keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "p" || e.key === "P") {
        setPaused((prev) => !prev);
      } else {
        keys.current[e.key] = true;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => (keys.current[e.key] = false);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Background stars
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      speed: 0.5 + Math.random(),
    }));

    let animationFrame: number;

    // Shooting
    const shootInterval = setInterval(() => {
      if (!isGameOver && !paused) {
        const offsets = {
          1: [0],
          2: [-10, 10],
          3: [-15, 0, 15],
          4: [-20, -7, 7, 20],
        }[lasers];

        offsets?.forEach((offset) => {
          bullets.current.push({
            x: player.current.x + player.current.width / 2 - 3 + offset * scale,
            y: player.current.y,
            width: 6 * scale,
            height: 16 * scale,
            speed: 5 * scale,
          });
        });

        playShootSound();
      }
    }, 300);

    // Asteroids
    const asteroidInterval = setInterval(() => {
      if (!isGameOver && !paused) {
        debris.current.push({
          x: Math.random() * (canvas.width - 32 * scale),
          y: 0,
          size: 36 * scale,
          speed: 1.5 * scale + Math.random() * 1.5,
        });
      }
    }, 300);

    // PowerUps
    const powerInterval = setInterval(() => {
      if (!isGameOver && !paused) {
        const type = Math.random() < 0.7 ? "up" : "down";
        powerUps.current.push({
          x: Math.random() * (canvas.width - 20 * scale),
          y: 0,
          size: 20 * scale,
          type,
        });
      }
    }, 7000);

    // Create explosion effect
    const createExplosion = (x: number, y: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < 20; i++) {
        particles.push({
          x,
          y,
          radius: (2 + Math.random() * 3) * scale,
          color: ["orange", "red", "yellow"][Math.floor(Math.random() * 3)],
          speedX: (Math.random() - 0.5) * 4 * scale,
          speedY: (Math.random() - 0.5) * 4 * scale,
          alpha: 1,
        });
      }
      explosions.current.push({ particles });
      playExplosionSound();
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = "white";
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      if (!paused && !isGameOver) {
        // Movement
        if (keys.current["ArrowLeft"] && player.current.x > 0)
          player.current.x -= player.current.speed;
        if (
          keys.current["ArrowRight"] &&
          player.current.x < canvas.width - player.current.width
        )
          player.current.x += player.current.speed;
        if (keys.current["ArrowUp"] && player.current.y > 0)
          player.current.y -= player.current.speed;
        if (
          keys.current["ArrowDown"] &&
          player.current.y < canvas.height - player.current.height
        )
          player.current.y += player.current.speed;

        // Bullets
        bullets.current = bullets.current.filter((b) => b.y > 0);
        bullets.current.forEach((b) => {
          b.y -= b.speed;
          ctx.fillStyle = "yellow";
          ctx.fillRect(b.x, b.y, b.width, b.height);
        });

        // Debris
        debris.current.forEach((d) => {
          d.y += d.speed;
          if (asteroidImg.complete) {
            ctx.drawImage(asteroidImg, d.x, d.y, d.size, d.size);
          } else {
            ctx.fillStyle = "red";
            ctx.fillRect(d.x, d.y, d.size, d.size);
          }
        });

        // Power-ups
        powerUps.current.forEach((p) => {
          p.y += 3 * scale;
          ctx.fillStyle = p.type === "up" ? "cyan" : "magenta";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        });

        // Bullet vs debris
        const newDebris: typeof debris.current = [];
        debris.current.forEach((d) => {
          let hit = false;
          bullets.current = bullets.current.filter((b) => {
            const collided =
              b.x < d.x + d.size &&
              b.x + b.width > d.x &&
              b.y < d.y + d.size &&
              b.y + b.height > d.y;
            if (collided) {
              hit = true;
              setScore((s) => s + 10);
              createExplosion(d.x + d.size / 2, d.y + d.size / 2);
            }
            return !collided;
          });
          if (!hit) newDebris.push(d);
        });
        debris.current = newDebris;

        // Debris vs player
        for (let d of debris.current) {
          if (
            player.current.x < d.x + d.size &&
            player.current.x + player.current.width > d.x &&
            player.current.y < d.y + d.size &&
            player.current.y + player.current.height > d.y
          ) {
            createExplosion(
              player.current.x + player.current.width / 2,
              player.current.y + player.current.height / 2
            );
            setIsGameOver(true);
          }
        }

        // PowerUp vs player
        powerUps.current = powerUps.current.filter((p) => {
          const collected =
            player.current.x < p.x + p.size &&
            player.current.x + player.current.width > p.x &&
            player.current.y < p.y + p.size &&
            player.current.y + player.current.height > p.y;
          if (collected) {
            if (p.type === "up") {
              setLasers((l) => Math.min(4, l + 1));
            } else {
              setLasers(1);
            }
          }
          return !collected && p.y < canvas.height;
        });
      }

      // Draw explosions
      explosions.current.forEach((exp) => {
        exp.particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.alpha -= 0.02;
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        });
      });
      explosions.current = explosions.current.filter((exp) =>
        exp.particles.some((p) => p.alpha > 0)
      );

      // Draw player only if alive
      if (!isGameOver) {
        ctx.drawImage(
          shipImg,
          player.current.x,
          player.current.y,
          player.current.width,
          player.current.height
        );
      }

      // Show Game Over message inside canvas
      if (isGameOver) {
        ctx.fillStyle = "red";
        ctx.font = `${24 * scale}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);

        ctx.fillStyle = "white";
        ctx.font = `${16 * scale}px Arial`;
        ctx.fillText(
          `Your high score is: ${score}`,
          canvas.width / 2,
          canvas.height / 2
        );

        // Restart button inside canvas
        const btnWidth = 120 * scale;
        const btnHeight = 36 * scale;
        const btnX = canvas.width / 2 - btnWidth / 2;
        const btnY = canvas.height / 2 + 30 * scale;

        ctx.fillStyle = "#444";
        ctx.fillRect(btnX, btnY, btnWidth, btnHeight);
        ctx.fillStyle = "white";
        ctx.font = `${14 * scale}px Arial`;
        ctx.fillText("Restart", canvas.width / 2, btnY + 24 * scale);

        // Restart button click handling
        canvas.onclick = (e) => {
          const rect = canvas.getBoundingClientRect();
          const mx = e.clientX - rect.left;
          const my = e.clientY - rect.top;
          if (
            mx >= btnX &&
            mx <= btnX + btnWidth &&
            my >= btnY &&
            my <= btnY + btnHeight
          ) {
            window.location.reload();
          }
        };
      }

      animationFrame = requestAnimationFrame(gameLoop);
    };

    animationFrame = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrame);
      clearInterval(shootInterval);
      clearInterval(asteroidInterval);
      clearInterval(powerInterval);
    };
  }, [isGameOver, paused, lasers, canvasSize]);

  return (
    <Flex
      minH="100vh"
      justify="center"
      align="center"
      bg="#000000"
      color="white"
      p={4}
    >
      <VStack>
        <Text fontSize={{ base: "md", md: "xl" }} color="white" mb="10px">
          Score: {score} | Lasers: {lasers}
        </Text>
        <Box border="2px solid white" bg="black">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        {!isGameOver && (
          <Button
            mt="15px"
            size={{ base: "sm", md: "md" }}
            bg="white"
            color="black"
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? "Resume" : "Pause"}
          </Button>
        )}
      </VStack>
    </Flex>
  );
};

export default Game;
