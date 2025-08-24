import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { VStack, Button, Container } from "@chakra-ui/react";
import { List, ListItem, ListIcon, useBreakpointValue } from "@chakra-ui/react";
import { FaStar, FaRocket } from "react-icons/fa";
import { Link } from "@common/components/link/Link";

export default function Home() {
    
  const headingSize = useBreakpointValue({ base: "2xl", md: "4xl" });
  const textSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-b, black, gray.900)"
      color="white"
      align="center"
      justify="center"
      px={4}
      py="100px"
    >
      <Container maxW="container.lg">
        <VStack spacing={10} textAlign="center">
          {/* Game Title..... */}
          <Heading size={headingSize} fontWeight="bold">
            🚀 Sapa Space Blaster 🪐
          </Heading>
          <Text fontSize={textSize} maxW="600px" color="gray.300">
            Pilot your spacecraft, dodge incoming debris, and shoot your way to
            survival. Are you ready to conquer space? 🌌
          </Text>
          {/* Rules Section....... */}
          <Box
            bg="gray.800"
            p={6}
            rounded="2xl"
            shadow="xl"
            w="full"
            maxW="600px"
            textAlign="left"
          >
            <Heading size="lg" mb={4}>
              Game Rules
            </Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={FaStar} color="yellow.400" />
                Use arrow keys (or drag on mobile) to move your spacecraft
                anywhere on the canvas.
              </ListItem>
              <ListItem>
                <ListIcon as={FaStar} color="yellow.400" />
                Your spacecraft fires automatically — focus on dodging and
                aiming!
              </ListItem>
              <ListItem>
                <ListIcon as={FaStar} color="yellow.400" />
                Destroy debris before it collides with you.
              </ListItem>
              <ListItem>
                <ListIcon as={FaStar} color="yellow.400" />
                The game ends if debris touches your spacecraft.
              </ListItem>
            </List>
          </Box>
          {/* Start Button */}
          <Link to="/game">
            <Button size="lg" colorScheme="purple" rightIcon={<FaRocket />}>
              Start Game
            </Button>
          </Link>
        </VStack>
      </Container>
    </Flex>
  );
}
