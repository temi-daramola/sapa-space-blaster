import { TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Tabs as ChakraTab, TabList } from "@chakra-ui/react";
import React from 'react';

export const Tabs = ({ labels = [], children }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <ChakraTab>
      <TabList >
        {labels.map((item, index) => (
          <Tab key={index}>{item || `Tab ${index + 1}`}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {childrenArray.map((child, index) => (
          <TabPanel key={index} p="0px">{child}</TabPanel>
        ))}
      </TabPanels>
    </ChakraTab>
  );
};

