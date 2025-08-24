import { Center, Icon } from "@chakra-ui/react";
import { Accordion as ChakraAccordion, AccordionItem } from "@chakra-ui/react";
import { AccordionButton, AccordionPanel, Box } from "@chakra-ui/react";
import { colors } from "@constants/design";
import { FiMinus, FiPlus } from "react-icons/fi";

export const Accordion = ({ items = [] }) => {
  return (
    <ChakraAccordion allowToggle>
      {items.map((item, index) => (
        <AccordionItem key={index}  border="none">
          {({ isExpanded }) => (
            <Box
              // border={!isExpanded && `1px solid ${colors.primary}70`}
              mb="20px"
              rounded="6px"
              // bg={isExpanded && colors.primaryTint}
            >
              <h2>
                <AccordionButton
                  p={{ base: "16px", md: "30px 36px" }}
                  alignItems="flex-start"
                  justifyContent="space-between"
                >
                  <Box
                    flex="1"
                    fontSize={{ base: "16px", md: "20px" }}
                    fontWeight="500"
                    textAlign="left"
                    // color={isExpanded && colors.primaryDark}
                  >
                    {item.title}
                  </Box>
                  {isExpanded ? (
                    <Center bg={colors.primaryTint2} rounded="5px">
                      <Icon
                        as={FiMinus}
                        boxSize={{base:3, md: 4}}
                        color={colors.primaryDark}
                        m={{ base: "5px", md: "10px" }}
                      />
                    </Center>
                  ) : (
                    <Center bg={colors.primaryTint2} rounded="5px">
                      <Icon
                        as={FiPlus}
                        boxSize={{base:3, md: 4}}
                        color={colors.primaryDark}
                        m={{ base: "5px", md: "10px" }}
                      />
                    </Center>
                  )}
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb="32px"
                pt="10px"
                px={{ base: "16px", md: "36px" }}
                fontWeight="500"
                fontSize={{ base: "15px", md: "16px" }}
              >
                {item.message}
              </AccordionPanel>
            </Box>
          )}
        </AccordionItem>
      ))}
    </ChakraAccordion>
  );
};
