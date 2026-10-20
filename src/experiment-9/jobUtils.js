
export function filterJobs(jobs, filters) {
  return jobs.filter((job) => {
    const titleMatch = job.title
      .toLowerCase()
      .includes((filters.title || "").toLowerCase());

    const locationMatch = job.location
      .toLowerCase()
      .includes((filters.location || "").toLowerCase());

    const companyMatch = job.company
      .toLowerCase()
      .includes((filters.company || "").toLowerCase());

    const salaryMatch =
      filters.salary === "" ||
      job.salary >= Number(filters.salary);

    return (
      titleMatch &&
      locationMatch &&
      companyMatch &&
      salaryMatch
    );
  });
}
