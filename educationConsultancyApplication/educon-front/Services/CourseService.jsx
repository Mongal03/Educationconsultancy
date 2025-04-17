import axios from "axios";

const COURSE_URL="http://localhost:9696/edu-con/course";
const ID_URL="http://localhost:9696/edu-con/course-id";

export const saveCourse = (course) => {
    return axios.post(COURSE_URL, course);
}

export const updateCourse = (course) => {
    return axios.put(COURSE_URL, course);
}

export const displayAllCourses = () => {
    return axios.get(COURSE_URL);
}

export const displayCourseById = (id) => {
    return axios.get(COURSE_URL+'/'+id);
}

export const deleteCourseById = (id) => {
    return axios.get(COURSE_URL+'/'+id);
}

export const generateCourseId = () => {
    return axios.get(ID_URL);
}