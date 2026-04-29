import { DEFAULT_CODE } from "../../defaults";
import lection1 from "./lection1";
import lection2 from "./lection2";
import lection3 from "./lection3";
import lection4 from "./lection4";
import lection5 from "./lection5";
import lection6 from "./lection6";


export const lessons = [lection1, lection2, lection3, lection4, lection5, lection6];


export function createInitialLessonWorkspaces() {
  return lessons.reduce((accumulator, lesson) => {
    if (!lesson.showEditor) {
      return accumulator;
    }

    accumulator[lesson.id] = {
      code: lesson.starterCode || DEFAULT_CODE,
      result: {
        status: "idle",
        stdout: "",
        stderr: "",
        richOutputs: [],
        exitCode: null,
        durationSeconds: null,
      },
      notice: "",
      errorMessage: "",
    };

    return accumulator;
  }, {});
}
