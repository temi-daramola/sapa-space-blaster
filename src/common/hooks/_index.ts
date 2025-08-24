import { useAlert } from "@common/hooks/useAlert";
import { useRequest } from "@common/hooks/useRequest";
import useRouter from "@common/hooks/useRouter";
import { useToggle } from "@common/hooks/useToggle";
import { useRequest as useRequestV2 } from "@common/hooks/useRequest-v2";
import { useNetwork } from "./useNetwork";


export const hooks = {
  useRequest,
  useRouter,
  useToggle,
  useAlert,
  useRequestV2,
  useNetwork
  
};
