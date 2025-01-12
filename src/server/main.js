import express from "express";
import ViteExpress from "vite-express";
import dbConnect from "./src/db/dbConnect.js";
import {
  User,
  AnonymousUser,
  Notification,
  Case,
  Comment,
  Category,
} from "./src/db/models/index.schema.js";
import mongoose from "mongoose";

const app = express();
const port = 3000;

dbConnect();

app.use(express.json());

app.post("/anonymous-users", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res
        .status(400)
        .send({ error: "Username and password are required" });
    }

    // Cek apakah username sudah ada
    const existingUser = await AnonymousUser.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ error: "Username already exists" });
    }

    const anonymousUser = new AnonymousUser({
      username,
      password,
    });

    await anonymousUser.save();

    res.status(201).send({
      message: "Anonymous user created successfully",
      data: anonymousUser,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/anonymous-users", async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const user = await AnonymousUser.findById(id);
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }
      return res.status(200).send(user);
    }

    const users = await AnonymousUser.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/cases", async (req, res) => {
  try {
    const { content, categories, examples, author, isAnonymous } = req.body;

    // Validasi input
    if (!content || !categories || !examples || !author) {
      return res.status(400).send({
        error: "content, categories, examples, and author are required",
      });
    }

    // Validasi kategori
    for (const categoryId of categories) {
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res
          .status(400)
          .send({ error: `Invalid category ID: ${categoryId}` });
      }
    }

    // Validasi examples
    for (const exampleId of examples) {
      const exampleExists = await Category.findOne({
        "examples._id": exampleId,
      });
      if (!exampleExists) {
        return res
          .status(400)
          .send({ error: `Invalid example ID: ${exampleId}` });
      }
    }

    // Validasi author
    const authorExists =
      (await User.findById(author)) || (await AnonymousUser.findById(author));
    if (!authorExists) {
      return res.status(400).send({ error: "Invalid author" });
    }

    const caseData = {
      content,
      categories,
      examples,
      author,
      authorModel: authorExists instanceof User ? "User" : "AnonymousUser",
      isAnonymous: isAnonymous || false,
    };

    const newCase = new Case(caseData);
    await newCase.save();

    res.status(201).send({
      message: "Case created successfully",
      data: newCase,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/cases", async (req, res) => {
  try {
    const cases = await mongoose.model("Case").aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categories",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorUser",
        },
      },
      {
        $lookup: {
          from: "anonymoususers",
          localField: "author",
          foreignField: "_id",
          as: "authorAnonymousUser",
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "caseId",
          as: "comments",
        },
      },
      {
        $addFields: {
          author: {
            $cond: {
              if: { $gt: [{ $size: "$authorUser" }, 0] },
              then: { $arrayElemAt: ["$authorUser", 0] },
              else: { $arrayElemAt: ["$authorAnonymousUser", 0] },
            },
          },
        },
      },
      {
        $project: {
          authorUser: 0,
          authorAnonymousUser: 0,
        },
      },
    ]);

    res.status(200).send(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.put("/cases/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content, categories, examples, author, isAnonymous } = req.body;

    // Validasi input
    if (!content || !categories || !examples || !author) {
      return res.status(400).send({
        error: "content, categories, examples, and author are required",
      });
    }

    // Validasi kategori
    for (const categoryId of categories) {
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res
          .status(400)
          .send({ error: `Invalid category ID: ${categoryId}` });
      }
    }

    // Validasi examples
    for (const exampleId of examples) {
      const exampleExists = await Category.findOne({
        "examples._id": exampleId,
      });
      if (!exampleExists) {
        return res
          .status(400)
          .send({ error: `Invalid example ID: ${exampleId}` });
      }
    }

    // Validasi author
    const authorExists =
      (await User.findById(author)) || (await AnonymousUser.findById(author));
    if (!authorExists) {
      return res.status(400).send({ error: "Invalid author" });
    }

    const updatedCase = await Case.findByIdAndUpdate(
      id,
      {
        content,
        categories,
        examples,
        author,
        authorModel: authorExists instanceof User ? "User" : "AnonymousUser",
        isAnonymous: isAnonymous || false,
      },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).send({ error: "Case not found" });
    }

    res.status(200).send({
      message: "Case updated successfully",
      data: updatedCase,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.patch("/cases/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validasi kategori jika ada
    if (updates.categories) {
      for (const categoryId of updates.categories) {
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
          return res
            .status(400)
            .send({ error: `Invalid category ID: ${categoryId}` });
        }
      }
    }

    // Validasi examples jika ada
    if (updates.examples) {
      for (const exampleId of updates.examples) {
        const exampleExists = await Category.findOne({
          "examples._id": exampleId,
        });
        if (!exampleExists) {
          return res
            .status(400)
            .send({ error: `Invalid example ID: ${exampleId}` });
        }
      }
    }

    // Validasi author jika ada
    if (updates.author) {
      const authorExists =
        (await User.findById(updates.author)) ||
        (await AnonymousUser.findById(updates.author));
      if (!authorExists) {
        return res.status(400).send({ error: "Invalid author" });
      }
      updates.authorModel =
        authorExists instanceof User ? "User" : "AnonymousUser";
    }

    const updatedCase = await Case.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedCase) {
      return res.status(404).send({ error: "Case not found" });
    }

    res.status(200).send({
      message: "Case updated successfully",
      data: updatedCase,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.delete("/cases/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCase = await Case.findByIdAndDelete(id);

    if (!deletedCase) {
      return res.status(404).send({ error: "Case not found" });
    }

    res.status(200).send({
      message: "Case deleted successfully",
      data: deletedCase,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/categories", async (req, res) => {
  try {
    const { name, description, examples } = req.body;

    // Validasi input
    if (!name || !description) {
      return res
        .status(400)
        .send({ error: "Name and description are required" });
    }

    // Validasi setiap contoh dalam array examples
    if (!Array.isArray(examples) || examples.length === 0) {
      return res.status(400).send({ error: "Examples array is required" });
    }

    for (const example of examples) {
      if (!example.name || !example.description) {
        return res.status(400).send({
          error: "Name and description are required for each example",
        });
      }
    }

    // Cek apakah kategori sudah ada
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).send({ error: "Category already exists" });
    }

    const category = new Category({
      name,
      description,
      examples,
    });

    await category.save();

    res.status(201).send({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}...`)
);
