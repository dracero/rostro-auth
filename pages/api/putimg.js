import { connectToDatabase } from "../../util/mongodb";

const replaceOneInMongo = async (req, res) => {
  const { db } = await connectToDatabase();
  const { body } = req;
  const { payload } = body;

  try {
    await db.collection("aluasist").insertOne({ payload });
    res.status(200).json({ result: "success" });
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
};

export default replaceOneInMongo;
