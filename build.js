// build.js
import { readFile, writeFile, mkdir } from "fs/promises";
import { resolve } from "path";

const root = resolve("src");
const outDir = resolve("dist");

const sections = [
  { file: "header.html", id: "header-container" },
  { file: "abstract.html", id: "abstract-container" },
  { file: "pipeline.html", id: "pipeline-container" },
  { file: "introduction.html", id: "introduction-container" },
];

(async () => {
  // 1️⃣ make sure dist/ exists
  await mkdir(outDir, { recursive: true });

  // 2️⃣ read the template
  let html = await readFile(`${root}/index.html`, "utf8");

  // 3️⃣ inject the partials
  for (const { file, id } of sections) {
    const snippet = await readFile(`${root}/${file}`, "utf8");
    html = html.replace(
      new RegExp(`<div[^>]*id="${id}"[^>]*>\\s*</div>`),
      snippet.trim()
    );
  }

  // 4️⃣ strip the loader script (no run-time fetches any more)
  html = html.replace(/<script[^>]*src="scripts\/app\.js"[^>]*><\/script>/, "");

  // 5️⃣ write the finished file
  await writeFile(`${outDir}/index.html`, html);

  console.log("✅ dist/index.html created");
})();
