import * as gulp from "gulp";
import * as ts from "gulp-typescript";

const tsProject = ts.createProject("tsconfig.json");

gulp.task("default", () => {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});
