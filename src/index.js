import express from "express"
import path from "path";
import { trainRouter } from "./train";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/train', trainRouter);

app.use("/public", express.static(path.join(path.resolve("./"), "public")))

app.listen(process.env.PORT || 8000, () =>
  console.log(`API listening on port ${process.env.PORT || 8000}`),
);