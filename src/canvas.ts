/**
 * Imports here.
 */
import dotenv from "dotenv";
dotenv.config();

/**
 * StudentCanvas holds the users
 * info for easy access throughout
 * the verification process
 */
class StudentCanvas {}

/**
 * verification verifies user in their canvas course
 */
export const verification = () => {
  const CANVAS_CLIENT_ID = process.env.CANVAS_CLIENT_ID;
  const CANVAS_CLIENT_SECRET = process.env.CANVAS_CLIENT_SECRET;
  const API_URL = "";
};

/**
 * retrieve_user_courses retrieves the users current courses
 * being taken during the specific semester
 */
export const retrieve_user_courses = (): Array<string> => {
  return [""];
};

/**
 * determine_valid_courses filters out which courses to view
 * dependent on the COURSE_TYPE and SEMESTER_COURSES
 */
export const determine_valid_courses = (): Array<string> => {
  const COURSE_TYPE = process.env.CLASS_TYPE;
  const SEMESTER_COURSES = process.env.SEMESTER_CLASSES;

  return [""];
};
