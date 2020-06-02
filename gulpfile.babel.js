import * as gulp from "gulp";
import { readJson, remove, writeJson } from "fs-extra";
import { resolve } from "path";
import babel from "gulp-babel";
import gzip from "gulp-gzip";
import tar from "gulp-tar";
import zip from "gulp-zip";

const makePath = (str) => resolve(__dirname, str);

gulp.task("clean", () => Promise.all([remove("dist"), remove("release")]));

gulp.task("move", () =>
  gulp
    .src(["src/**", "!src/*.js", "LICENSE", "README.md"])
    .pipe(gulp.dest("dist"))
);

gulp.task("compile", () =>
  gulp
    .src(["src/**/*.js"])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(gulp.dest("dist"))
);

gulp.task("package", async () => {
  const pkg = await readJson(makePath("./package.json"));
  delete pkg.devDependencies;
  delete pkg.scripts;
  pkg.main = "index.js";
  return writeJson(makePath("./dist/package.json"), pkg, { spaces: "\t" });
});

gulp.task("tar", () =>
  gulp
    .src("dist/*")
    .pipe(tar("archive.tar"))
    .pipe(gzip())
    .pipe(gulp.dest("release"))
);

gulp.task("zip", () =>
  gulp.src("dist/*").pipe(zip("archive.zip")).pipe(gulp.dest("release"))
);

gulp.task(
  "build",
  gulp.series(["clean", "move", "package", "compile", "tar", "zip"])
);
