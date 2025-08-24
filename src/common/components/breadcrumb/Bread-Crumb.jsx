import { Box, Breadcrumb as ChakraBreadCrumb } from "@chakra-ui/react";
import { BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export const BreadCrumb = ({ items = [], linkProps, ...props }) => {
  console.log("items ", items);
  return (
    <Box {...props}>
      <ChakraBreadCrumb separator={<FiChevronRight color="white" />}>
        {items.map((item, index) => (
          <BreadcrumbItem  key={index}>
            <BreadcrumbLink
              as={Link}
              textDecor='none'
              to={item.url}
              isCurrentPage={item?.isCurrent || true}
              {...linkProps}
            >
              {item.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </ChakraBreadCrumb>
    </Box>
  );
};
