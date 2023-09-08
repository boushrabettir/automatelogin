import { userInstance } from "../Index.js";
import { setEnvVariable } from "../Utils/Utils.js";
import { Course } from "../Utils/Interfaces.js";

// TODO - Create OAuth part lol how did i forget

const connectToCanvasLm = async (): Promise<Course[]> => {

    let courses: Course[] = [];
    const CANVAS_TOKEN = process.env.CANVAS_TOKEN;

    try {
        const response = await fetch("https://canvas.instructure.com/api/v1/courses?enrollment_state=active", {
            headers: {
                "Authorization": `Bearer ${CANVAS_TOKEN}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            courses = data;
        }
        
       
    } catch (err) {
        console.error(err);
    }

    return courses;
}


const arrayToSet = (elementArray: string[] ): Set<any> => {
    let processedSet = new Set<string>();

    for (const element of elementArray) {
        processedSet.add(element);
    }

    return processedSet;
}

const findMatch = (course: string): string => {

    const COURSE_NAMES_JSON: string[] = JSON.parse(process.env.COURSE_NAMES || "[]");
    const CURR_SEMESTER_CLASSES = arrayToSet(COURSE_NAMES_JSON);
    // COURSE_NAMES=["CPSC 253-08", "CPSC 131-06", "CPSC 386-03"]

    const TEMP = [/253-08/, /131-06/, /386-03/];

    let foundCourse: string = "";

    for (let avaliableCourse of TEMP) {
        if (avaliableCourse.test(course)) {
            foundCourse = avaliableCourse.toString();
            break;
        }
    }

    return foundCourse;
}

/**
 * determineCourses finds all the users valid courses being
 * taken for the specific professor for the discord.
 */
export const determineCourses = async (): Promise<string[]> => {
    setEnvVariable();

    // TODO -
    const LIST_OF_COURSES: Course[] = await connectToCanvasLm();
    
    let regexPattern = /CPSC/;

    let usersCurrentCourses: string[] = [];

    for (let currentCourse of LIST_OF_COURSES)  {
        let courseName: any = currentCourse.name;
        const isMatch = regexPattern.test(courseName);
        if (isMatch){
            const foundCourse = findMatch(courseName);
            if (foundCourse) usersCurrentCourses.push(courseName);
        };
    }

    return usersCurrentCourses;
    
}
