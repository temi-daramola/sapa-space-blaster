import { Heading as ChakraHeading } from "@chakra-ui/react";

export const Heading = ({ laptopSize = "50px", ...props }) => {
  return (
    <ChakraHeading
      fontSize={{
        base: "32px",  // Mobile (fixed)
        md: "40px",    // Tablet (fixed)
        // lg: laptopSize, // Laptop (customizable via prop)
        lg: laptopSize, // Large screens (scales dynamically)
        "2xl":  `clamp(${laptopSize}, 4vw, 80px)` 
      }}
      // fontFamily={constants.fonts.bold}
      {...props} // Allows passing other Chakra props
    />
  );
};


