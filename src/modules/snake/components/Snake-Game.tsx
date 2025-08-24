import { useEffect, useRef, useState } from "react";
import { Box, Flex, Button, Text, useMediaQuery, Icon } from "@chakra-ui/react";
import {
  FiArrowUp,
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import Modal from "@common/components/modal/Modal";
import { hooks } from "@common/hooks/_index";
import { BaseNotify } from "@common/components/notify/Base-Notify";
import { TbMoodSadDizzy } from "react-icons/tb";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
];
const INITIAL_FOOD = { x: 5, y: 5 };
const SPEED = 130;
const CELL_SIZE = 20;
const SNAKE_LINE_WIDTH = 8;

type Position = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isGameRunning, setIsGameRunning] = useState(false);

  const modalToggle = hooks.useToggle();
  const directionRef = useRef<Direction>("RIGHT");
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const pathRef = useRef<Path2D>(new Path2D());

  const moveSnake = () => {
    const head = { ...snake[0] };
    switch (directionRef.current) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
    }

    if (
      head.x < 0 ||
      head.x >= BOARD_SIZE ||
      head.y < 0 ||
      head.y >= BOARD_SIZE
    ) {
      setGameOver(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const px = head.x * CELL_SIZE + CELL_SIZE / 2;
    const py = head.y * CELL_SIZE + CELL_SIZE / 2;
    if (ctx.isPointInStroke(pathRef.current, px, py)) {
      setGameOver(true);
      return;
    }

    const newSnake = [head, ...snake];
    if (head.x === food.x && head.y === food.y) {
      setFood({
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      });
      setScore((s) => s + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const drawGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#2D3748";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#F56565";
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    const path = new Path2D();
    path.moveTo(
      snake[0].x * CELL_SIZE + CELL_SIZE / 2,
      snake[0].y * CELL_SIZE + CELL_SIZE / 2
    );
    for (let i = 1; i < snake.length; i++) {
      path.lineTo(
        snake[i].x * CELL_SIZE + CELL_SIZE / 2,
        snake[i].y * CELL_SIZE + CELL_SIZE / 2
      );
    }
    pathRef.current = path;

    ctx.strokeStyle = "#48BB78";
    ctx.lineWidth = SNAKE_LINE_WIDTH;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke(path);
  };

  useEffect(() => {
    if (gameOver || !isGameRunning) return;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;

      if (delta > SPEED) {
        moveSnake();
        lastTimeRef.current = time;
      }
      drawGame();
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [snake, food, gameOver, isGameRunning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newDir: Direction | null = (() => {
        switch (e.key) {
          case "ArrowUp":
            return directionRef.current !== "DOWN" ? "UP" : null;
          case "ArrowDown":
            return directionRef.current !== "UP" ? "DOWN" : null;
          case "ArrowLeft":
            return directionRef.current !== "RIGHT" ? "LEFT" : null;
          case "ArrowRight":
            return directionRef.current !== "LEFT" ? "RIGHT" : null;
          default:
            return null;
        }
      })();
      if (newDir) directionRef.current = newDir;
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setGameOver(false);
    setScore(0);
    setIsGameRunning(false); // Wait for manual start again
    directionRef.current = "RIGHT";
    lastTimeRef.current = 0;
  };

  const changeDirection = (newDirection: Direction) => {
    const current = directionRef.current;
    if (
      (newDirection === "UP" && current !== "DOWN") ||
      (newDirection === "DOWN" && current !== "UP") ||
      (newDirection === "LEFT" && current !== "RIGHT") ||
      (newDirection === "RIGHT" && current !== "LEFT")
    ) {
      directionRef.current = newDirection;
    }
  };

  const handleRestart = () => {
    if (modalToggle.isOpen) modalToggle.reset();
    restartGame();
  };

  useEffect(() => {
    if (gameOver) modalToggle.set(true);
  }, [gameOver]);

  return (
    <Flex direction="column" align="center" p={4} w="100%">
      <Modal
        isOpen={modalToggle.isOpen}
        isOverlayClose={false}
        isCentered={true}
        size={undefined}
        reset={handleRestart}
        contentProps={undefined}
      >
        <Box p="20px">
          <BaseNotify
            title="Game Over"
            message={`Better luck next time. Your high score is ${score}`}
            view={<Icon fontSize="50px" as={TbMoodSadDizzy} />}
            action={undefined}
            btnText={undefined}
            baseProps={undefined}
          >
            <Button
              size="sm"
              bg="black"
              color="white"
              onClick={handleRestart}
              mt={4}
            >
              Try again
            </Button>
          </BaseNotify>
        </Box>
      </Modal>

      <Text color="white" fontSize="lg" mb={2}>
        Score: {score}
      </Text>

      <Box
        border="2px solid #4A5568"
        bg="gray.700"
        w="100%"
        maxW="400px"
        aspectRatio="1"
        overflow="hidden"
        mb={5}
        mt="50px"
        position="relative"
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
          width={BOARD_SIZE * CELL_SIZE}
          height={BOARD_SIZE * CELL_SIZE}
        />

        {!isGameRunning && !gameOver && (
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            justify="center"
            align="center"
            bg="rgba(0, 0, 0, 0.6)"
            zIndex={10}
          >
            <Button
              size="sm"
              colorScheme="green"
              onClick={() => setIsGameRunning(true)}
            >
              Start Game
            </Button>
          </Flex>
        )}
      </Box>

      {isMobile && (
        <Flex mt={0} direction="column" align="center">
          <Button
            colorScheme="teal"
            size="md"
            onClick={() => changeDirection("UP")}
          >
            <FiArrowUp />
          </Button>
          <Flex gap="60px" mb={5} my={4}>
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => changeDirection("LEFT")}
            >
              <FiArrowLeft />
            </Button>
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => changeDirection("RIGHT")}
            >
              <FiArrowRight />
            </Button>
          </Flex>
          <Button
            colorScheme="teal"
            size="md"
            onClick={() => changeDirection("DOWN")}
          >
            <FiArrowDown />
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default SnakeGame;

{
  /* {gameOver && (
        <Box mt={2}>
          <Text color="white" fontSize="lg" mb={2}>
            Game Over!
          </Text>
          <Button onClick={restartGame} colorScheme="teal">
            Restart
          </Button>
        </Box>
      )} */
}

// import { useEffect, useRef, useState } from "react";
// import { Box, Flex, Button, Text } from "@chakra-ui/react";
// import { FiArrowUp, FiArrowDown, FiArrowLeft, FiArrowRight } from "react-icons/fi";
// import { useMediaQuery } from "@chakra-ui/react";  // ✅ import Chakra's media query hook

// const BOARD_SIZE = 20;
// const INITIAL_SNAKE = [
//   { x: 10, y: 10 },
//   { x: 9, y: 10 },
//   { x: 8, y: 10 },
//   { x: 7, y: 10 },
//   { x: 6, y: 10 },
// ];
// const INITIAL_FOOD = { x: 5, y: 5 };
// const SPEED = 130;
// const CELL_SIZE = 20;
// const SNAKE_LINE_WIDTH = 8;

// type Position = { x: number; y: number };
// type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

// function SnakeGame() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
//   const [food, setFood] = useState<Position>(INITIAL_FOOD);
//   const [gameOver, setGameOver] = useState<boolean>(false);
//   const [score, setScore] = useState<number>(0);
//   const [isMobile] = useMediaQuery("(max-width: 768px)");  // ✅ detect mobile screen

//   const directionRef = useRef<Direction>("RIGHT");
//   const animationFrameIdRef = useRef<number | null>(null);
//   const lastUpdateTimeRef = useRef<number>(0);
//   const pathRef = useRef<Path2D>(new Path2D());

//   const moveSnake = () => {
//     const head = { ...snake[0] };

//     switch (directionRef.current) {
//       case "UP":
//         head.y -= 1;
//         break;
//       case "DOWN":
//         head.y += 1;
//         break;
//       case "LEFT":
//         head.x -= 1;
//         break;
//       case "RIGHT":
//         head.x += 1;
//         break;
//     }

//     if (
//       head.x < 0 ||
//       head.x >= BOARD_SIZE ||
//       head.y < 0 ||
//       head.y >= BOARD_SIZE
//     ) {
//       setGameOver(true);
//       return;
//     }

//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const px = head.x * CELL_SIZE + CELL_SIZE / 2;
//     const py = head.y * CELL_SIZE + CELL_SIZE / 2;
//     if (ctx.isPointInStroke(pathRef.current, px, py)) {
//       setGameOver(true);
//       return;
//     }

//     const newSnake = [head, ...snake];

//     if (head.x === food.x && head.y === food.y) {
//       setFood({
//         x: Math.floor(Math.random() * BOARD_SIZE),
//         y: Math.floor(Math.random() * BOARD_SIZE),
//       });
//       setScore((prev) => prev + 1);
//     } else {
//       newSnake.pop();
//     }

//     setSnake(newSnake);
//   };

//   const drawGame = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const canvasSize = BOARD_SIZE * CELL_SIZE;

//     ctx.fillStyle = "#2D3748";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = "#F56565";
//     ctx.fillRect(
//       food.x * CELL_SIZE,
//       food.y * CELL_SIZE,
//       CELL_SIZE,
//       CELL_SIZE
//     );

//     const path = new Path2D();
//     path.moveTo(
//       snake[0].x * CELL_SIZE + CELL_SIZE / 2,
//       snake[0].y * CELL_SIZE + CELL_SIZE / 2
//     );
//     for (let i = 1; i < snake.length; i++) {
//       path.lineTo(
//         snake[i].x * CELL_SIZE + CELL_SIZE / 2,
//         snake[i].y * CELL_SIZE + CELL_SIZE / 2
//       );
//     }

//     pathRef.current = path;

//     ctx.strokeStyle = "#48BB78";
//     ctx.lineWidth = SNAKE_LINE_WIDTH;
//     ctx.lineJoin = "round";
//     ctx.lineCap = "round";
//     ctx.stroke(path);
//   };

//   useEffect(() => {
//     if (gameOver) return;

//     const animate = (time: number) => {
//       if (!lastUpdateTimeRef.current) {
//         lastUpdateTimeRef.current = time;
//       }
//       const deltaTime = time - lastUpdateTimeRef.current;

//       if (deltaTime > SPEED) {
//         moveSnake();
//         lastUpdateTimeRef.current = time;
//       }
//       drawGame();
//       animationFrameIdRef.current = requestAnimationFrame(animate);
//     };

//     animationFrameIdRef.current = requestAnimationFrame(animate);

//     return () => {
//       if (animationFrameIdRef.current !== null) {
//         cancelAnimationFrame(animationFrameIdRef.current);
//       }
//     };
//   }, [snake, food, gameOver]);

//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       const newDirection: Direction | null = (() => {
//         switch (e.key) {
//           case "ArrowUp":
//             return directionRef.current !== "DOWN" ? "UP" : null;
//           case "ArrowDown":
//             return directionRef.current !== "UP" ? "DOWN" : null;
//           case "ArrowLeft":
//             return directionRef.current !== "RIGHT" ? "LEFT" : null;
//           case "ArrowRight":
//             return directionRef.current !== "LEFT" ? "RIGHT" : null;
//           default:
//             return null;
//         }
//       })();
//       if (newDirection) directionRef.current = newDirection;
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   const restartGame = () => {
//     setSnake(INITIAL_SNAKE);
//     setFood(INITIAL_FOOD);
//     setGameOver(false);
//     setScore(0);
//     directionRef.current = "RIGHT";
//     lastUpdateTimeRef.current = 0;
//   };

//   const changeDirection = (newDirection: Direction) => {
//     const current = directionRef.current;
//     if (
//       (newDirection === "UP" && current !== "DOWN") ||
//       (newDirection === "DOWN" && current !== "UP") ||
//       (newDirection === "LEFT" && current !== "RIGHT") ||
//       (newDirection === "RIGHT" && current !== "LEFT")
//     ) {
//       directionRef.current = newDirection;
//     }
//   };

//   return (
//     <Box>

//       <Text color="white" fontSize="lg" mb={2}>
//         Score: {score}
//       </Text>

//       <Box border="2px solid #4A5568" mb={4} bg="gray.700">
//         <canvas
//           ref={canvasRef}
//           width={BOARD_SIZE * CELL_SIZE}
//           height={BOARD_SIZE * CELL_SIZE}
//         />
//       </Box>

//       {isMobile && (
//         <Flex mt={5} direction="column" align="center" >
//           <Button
//             colorScheme="teal"
//             size="sm"
//             onClick={() => changeDirection("UP")}
//           >
//             <FiArrowUp />
//           </Button>
//           <Flex my="10px">
//             <Button
//               colorScheme="teal"
//               size="sm"
//               onClick={() => changeDirection("LEFT")}
//               me="50px"
//             >
//               <FiArrowLeft />
//             </Button>
//             <Button
//               colorScheme="teal"
//               size="sm"
//               onClick={() => changeDirection("RIGHT")}
//             >
//               <FiArrowRight />
//             </Button>
//           </Flex>
//           <Button
//             colorScheme="teal"
//             size="sm"
//             onClick={() => changeDirection("DOWN")}
//           >
//             <FiArrowDown />
//           </Button>
//         </Flex>
//       )}

//       {gameOver && (
//         <Box mt={2}>
//           <Text color="white" fontSize="lg" mb={2}>
//             Game Over!
//           </Text>
//           <Button onClick={restartGame} colorScheme="teal">
//             Restart
//           </Button>
//         </Box>
//       )}

//     </Box>
//   );
// }

// export default SnakeGame;
