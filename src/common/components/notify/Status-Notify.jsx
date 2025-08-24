import { Circle, Icon, Spinner, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiAlertOctagon, FiCheckCircle } from "react-icons/fi";
import { FiClipboard, FiFileText } from "react-icons/fi";
import { BaseNotify } from "./Base-Notify";

function StatusNotify({
  title,
  message,
  action,
  btnText,
  status,
  children,
  baseProps,
  ...props
}) {
  const [circleBg, setCircleBg] = useState(null);
  const [centerBg, setCenterBg] = useState(null);

  const notify = {
    loading: "loading",
    success: "success",
    error: "error",
    empty: "empty",
  };

  useEffect(() => {
    console.log("status ", status);
    if (status === notify.success) {
      setCircleBg("green.100");
      setCenterBg("green.400");
    }
    if (status === notify.error) {
      setCircleBg("red.100");
      setCenterBg("red.500");
    }

    if (status === notify.info) {
      setCircleBg("blue.100");
      setCenterBg("blue.500");
    }
    if (status === "networkError") {
      setCircleBg("orange.100");
      setCenterBg("orange.500");
    }
    if (status === notify.empty) {
      setCircleBg("#00000020");
      setCenterBg("#00000060");
    }
  }, [status]);
  return (
    <BaseNotify
      title={title}
      message={message}
      action={action}
      btnText={btnText}
      {...props}
      baseProps={baseProps}
      view={
        status === "loading" ? (
          <Spinner thickness="4px" size="xl" speed=".8s" />
        ) : (
          <Circle bg={circleBg}>
            <Center bg={centerBg} rounded="full" m="20px">
              <Icon
                fontSize="22px"
                m="16px"
                color="white"
                as={
                  status == "error"
                    ? FiAlertOctagon
                    : status === "info"
                    ? FiFileText
                    : status === "empty"
                    ? FiClipboard
                    : status === "success"
                    ? FiCheckCircle
                    : // else success
                      null
                }
              />
            </Center>
          </Circle>
        )
      }
    >
      {children}
    </BaseNotify>
  );
}

export default StatusNotify;
