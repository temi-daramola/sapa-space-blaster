import { Link } from "@common/components/link/Link";
import { constants } from "@common/constant";
import { hooks } from "@common/hooks/_index";

import { useLocation } from 'react-router';


export const TextLink = ({ name, url, ...props }) => {
  const {location} = hooks.useRouter()
  const isActive = location === url;
  return (
    <Link
      to={url}
      fontWeight="500"
      textTransform="none"
      textDecoration="none"
      _hover={{ textDecoration: "none" }}
      // fontWeight={isActive ? "bold" : "normal"}
      // color={isActive && colors.primary}
      {...props}
    >
      {name}
    </Link>
  );
};
