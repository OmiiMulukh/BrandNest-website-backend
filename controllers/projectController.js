import Project from "../models/Project.js";

// Add a new project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      image,
      technologies,
      liveLink,
      githubLink,
      featured
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title, description and category are required"
      });
    }

    const project = await Project.create({
      title,
      description,
      category,
      image,
      technologies,
      liveLink,
      githubLink,
      featured
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });
  } catch (error) {
    console.error("Create project error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      count: projects.length,
      projects
    });
  } catch (error) {
    console.error("Get projects error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Get single project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      project
    });
  } catch (error) {
    console.error("Get project error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// Update a project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project
    });
  } catch (error) {
    console.error("Update project error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// Delete a project
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error("Delete project error:", error.message);

    res.status(500).json({
      message: "Server error"
    });
  }
};