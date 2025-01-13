// Declare the action

import type { RequestHandler } from "express";
import programRepository from "./programRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const programs = await programRepository.readAll();
    res.json(programs);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const program = programRepository.read(parsedId);

  if (program != null) {
    res.json(program);
  } else {
    res.sendStatus(404);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    // Update a specific program based on the provided ID
    const program = {
      id: Number(req.params.id),
      title: req.body.name,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };

    const affectedRows = await programRepository.update(
      Number(req.params.id),
      program,
    );

    // If the category is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the category in JSON format
    if (!affectedRows) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the program data from the request body
    const newProgram = {
      title: req.body.name,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      country: req.body.country,
      year: req.body.year,
      category_id: req.body.category_id,
    };

    // Create the program
    const insertId = await programRepository.create(newProgram);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id) || id <= 0) {
      res.status(400).json({
        error: "Invalid program ID",
      });
      return;
    }

    await programRepository.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { title } = req.body;

  if (title == null) {
    errors.push({ field: "title", message: "The field is required" });
  } else if (title.length > 255) {
    errors.push({
      field: "title",
      message: "Should contain less than 255 characters",
    });
  }

  const { synopsis } = req.body;

  if (synopsis == null) {
    errors.push({
      field: "synopsis",
      message: "The describe field is required",
    });
  } else if (title.length > 255) {
    errors.push({
      field: "title",
      message: "Should contain less than 255 characters",
    });
  }
};

export default { browse, read, edit, add, destroy, validate };
