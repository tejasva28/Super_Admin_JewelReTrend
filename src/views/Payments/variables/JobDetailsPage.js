// File: src/pages/JobDetailsPage.js

import React, { useContext } from 'react';
import JobDetails from '../views/jobs/JobDetails';
import { JobsContext } from '../context/JobsContext';

export default function JobDetailsPage() {
  const { jobsData, updateJobStatus } = useContext(JobsContext);

  return <JobDetails jobsData={jobsData} updateJobStatus={updateJobStatus} />;
}
