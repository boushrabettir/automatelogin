import { userInstance } from "../Index.js";
import { writeFileSync } from "fs";
import { setEnvVariable } from "../Utils/Utils.js";
import { Course } from "../Utils/Interfaces.js";

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

export const determineCourses = async () => {
    setEnvVariable();

    const LIST_OF_COURSES: Course[] = await connectToCanvasLm();
    const COURSE_NAMES_JSON: string[] = JSON.parse(process.env.COURSE_NAMES || "[]");
    const CURR_SEMESTER_CLASSES = arrayToSet(COURSE_NAMES_JSON);
     // COURSE_NAMES=["CPSC 253-08", "CPSC 131-06", "CPSC 386-03"]

    let regexPattern = /CPSC/;
    let usersCurrentCourses: string[] = [];

    for (let currentCourse of LIST_OF_COURSES)  {
        let courseName: any = currentCourse.name;
        const isMatch = regexPattern.test(courseName);
        // TODO
        if (isMatch){
            const numberPattern = /\d+/g;
            const numbers = courseName.match(numberPattern);
            console.log(numbers)
        };
    }
    
}
