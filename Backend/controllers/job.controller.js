import { Job } from "../models/job.model.js";
//Admin job posting
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    if (isNaN(Number(experience)) || isNaN(Number(position))) {
      return res.status(400).json({
        message: "Experience and Position must be valid numbers (e.g., 2, 5, 10)",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: typeof requirements === "string" ? requirements.split(",") : requirements,
      salary: String(salary),
      location,
      jobType,
      experienceLevel: Number(experience),
      position: Number(position),
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "Job posted successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error("Job post error:", error);
    return res.status(500).json({
      message: "Server error posting job",
      error: error.message,
      success: false,
    });
  }
};

//Users
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs || jobs.length === 0) {
      return res.status(200).json({ jobs: [], success: true });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Fetch all jobs error:", error);
    return res.status(500).json({
      message: "Server error fetching jobs",
      error: error.message,
      success: false,
    });
  }
};

//Users
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
      })
      .populate({
        path: "company",
      });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error("Fetch job by id error:", error);
    return res.status(500).json({
      message: "Server error fetching job details",
      error: error.message,
      success: false,
    });
  }
};

//Admin job created

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      sort: { createdAt: -1 },
    });
    if (!jobs || jobs.length === 0) {
      return res.status(200).json({ jobs: [], success: true });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error("Fetch admin jobs error:", error);
    return res.status(500).json({
      message: "Server error fetching admin jobs",
      error: error.message,
      success: false,
    });
  }
};
