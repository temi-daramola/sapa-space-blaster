import { Button } from "@chakra-ui/react";
import React from "react";
import StatusNotify from "./Status-Notify";

function RequestNotify({
  request,
  error,
  constants,
  retryAction,
  showEmpty,
  children,
  ...props
}) {
  const statusKeys = {
    error: "error",
    loading: "loading",
    success: "success",
    empty: "empty"
  };
  if (request.isLoading) {
    return (
      <StatusNotify
        title={constants.loading.title}
        message={constants.loading.message}
        status={statusKeys.loading}
        {...props}
      />
    );
  }

  if (request.isError) {
    return (
      <StatusNotify
        title={constants.error.title}
        message={error?.message || constants.error.message}
        status={statusKeys.empty}
        {...props}
      >
        {retryAction && (
          <Button onClick={retryAction} size="sm" bg="black" color="white">
            Try again
          </Button>
        )}
      </StatusNotify>
    );
  }

  if (request.isSuccess) {
    // render this is the showEmpty is true and the data from the server is empty
    if (showEmpty) {
      return (
        <StatusNotify
          title={constants.empty.title}
          message={constants.empty.message}
          status={statusKeys.empty}
          {...props}
        />
      );
    }

    // render the children
    return <React.Fragment>{children}</React.Fragment>;
  }

  return null;
}

export default RequestNotify;
// CAN ALSO BE CALLED QUERY_STATUS_COMPONENT
// PageQueryStatusWrapper
// PageQueryStatus
// PageQueryResponse
