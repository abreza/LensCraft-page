import {
  readFile,
  writeFile,
  mkdir,
  readdir,
  stat,
  copyFile,
} from "fs/promises";
import { resolve, join, relative } from "path";

const root = resolve("src");
const publicDir = resolve("public");
const outDir = resolve("dist");

const sections = [
  { file: "header.html", id: "header-container" },
  { file: "abstract.html", id: "abstract-container" },
  { file: "pipeline.html", id: "pipeline-container" },
  { file: "introduction.html", id: "introduction-container" },
];

async function copyDirectory(srcDir, destDir) {
  try {
    await mkdir(destDir, { recursive: true });

    const entries = await readdir(srcDir);

    for (const entry of entries) {
      const srcPath = join(srcDir, entry);
      const destPath = join(destDir, entry);

      const stats = await stat(srcPath);

      if (stats.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await copyFile(srcPath, destPath);
        console.log(
          `📁 Copied: ${relative(process.cwd(), srcPath)} → ${relative(
            process.cwd(),
            destPath
          )}`
        );
      }
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
    console.log(`⚠️  Public directory not found: ${publicDir}`);
  }
}

(async () => {
  try {
    await mkdir(outDir, { recursive: true });

    console.log("📂 Copying public files...");
    await copyDirectory(publicDir, outDir);

    console.log("🔨 Processing HTML sections...");
    let html = await readFile(`${root}/index.html`, "utf8");

    for (const { file, id } of sections) {
      const snippet = await readFile(`${root}/${file}`, "utf8");
      html = html.replace(
        new RegExp(`<div[^>]*id="${id}"[^>]*>\\s*</div>`),
        snippet.trim()
      );
      console.log(`🔗 Injected: ${file} → #${id}`);
    }

    html = html.replace(
      /<script[^>]*src="scripts\/app\.js"[^>]*><\/script>/,
      ""
    );

    await writeFile(`${outDir}/index.html`, html);

    console.log("✅ Build completed successfully!");
    console.log(`📄 dist/index.html created`);
  } catch (error) {
    console.error("❌ Build failed:", error.message);
    process.exit(1);
  }
})();
