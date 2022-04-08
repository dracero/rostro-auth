import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const movies = await db.collection("aluasist").find({}).toArray();

  res.json(movies);
};
