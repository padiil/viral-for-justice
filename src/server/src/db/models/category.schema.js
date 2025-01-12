import mongoose from "mongoose";

const { Schema } = mongoose;
// const crimeCategory = [
//   {
//     name: "Kejahatan terhadap orang",
//     description:
//       "Tindakan yang menyebabkan penderitaan fisik atau psikologis pada orang lain.",
//     example: [
//       "pembunuhan",
//       "penganiayaan",
//       "perkosaan",
//       "penculikan",
//       "pelecehan seksual",
//       "intimidasi",
//     ],
//   },
//   {
//     name: "Kejahatan terhadap harta benda",
//     description:
//       "Tindakan yang bertujuan untuk mengambil atau merusak harta benda orang lain.",
//     example: [
//       "pencurian",
//       "perampokan",
//       "penipuan",
//       "penggelapan",
//       "vandalisme",
//     ],
//   },
//   {
//     name: "Kejahatan terhadap kekuasaan",
//     description:
//       "Tindakan yang menyalahgunakan kekuasaan atau wewenang untuk keuntungan pribadi atau kelompok.",
//     example: ["korupsi", "kolusi", "nepotisme", "penyalahgunaan wewenang"],
//   },
//   {
//     name: "Kejahatan terhadap keamanan negara",
//     description:
//       "Tindakan yang mengancam kedaulatan negara atau keamanan nasional.",
//     example: ["pengkhianatan", "spionase", "terorisme", "makar"],
//   },
//   {
//     name: "Kejahatan ekonomi",
//     description: "Tindakan kriminal yang didorong oleh motif ekonomi.",
//     example: ["penipuan", "penggelapan", "pencucian uang", "kartel"],
//   },
//   {
//     name: "Kejahatan kekerasan",
//     description: "Tindakan kriminal yang melibatkan kekerasan fisik.",
//     example: ["pembunuhan", "penganiayaan", "perampokan"],
//   },
//   {
//     name: "Kejahatan seksual",
//     description: "Tindakan kriminal yang bermotif seksual.",
//     example: ["perkosaan", "pelecehan seksual", "pedofilia"],
//   },
//   {
//     name: "Kejahatan lingkungan",
//     description: "Tindakan yang merusak lingkungan atau sumber daya alam.",
//     example: [
//       "pencemaran lingkungan",
//       "perburuan liar",
//       "penebangan hutan ilegal",
//     ],
//   },
//   {
//     name: "Kejahatan narkotika",
//     description:
//       "Tindakan yang berkaitan dengan produksi, perdagangan, dan penggunaan narkoba ilegal.",
//     example: ["pengedaran narkoba", "penyalahgunaan narkoba"],
//   },
//   {
//     name: "Kejahatan terorganisir",
//     description:
//       "Tindakan kriminal yang dilakukan oleh kelompok yang terstruktur dan memiliki hierarki.",
//     example: ["mafia", "geng motor", "sindikat kejahatan"],
//   },
//   {
//     name: "Kejahatan siber",
//     description: "Tindakan kriminal yang dilakukan melalui dunia maya.",
//     example: [
//       "peretasan",
//       "pencurian identitas",
//       "penyebaran malware",
//       "penipuan online",
//     ],
//   },
//   {
//     name: "Kejahatan kerah putih",
//     description:
//       "Tindakan kriminal yang dilakukan oleh orang-orang berpendidikan tinggi dan berstatus sosial tinggi.",
//     example: ["korupsi", "penipuan keuangan", "penggelapan dalam jabatan"],
//   },
//   {
//     name: "Kejahatan kerah biru",
//     description:
//       "Tindakan kriminal yang dilakukan oleh orang-orang kelas pekerja.",
//     example: ["pencurian", "perampokan", "vandalisme"],
//   },
// ];

const exampleSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  examples: [exampleSchema],
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
