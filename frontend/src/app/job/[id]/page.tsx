import React from "react";
import JobDetail from ".";

function page({ params }: { params: { id: string } }) {
  return <JobDetail id={params?.id} />;
}

export default page;
