import axios from "axios";

const STUDENT_URL="http://localhost:9696/edu-con/student";
const ID_URL="http://localhost:9696/edu-con/student-id";
const OTHER_URL="http://localhost:9696/edu-con/student-other";
const STATUS_URL="http://localhost:9696/edu-con/student-status";
const STUD_URL="http://localhost:9696/edu-con/student-me";

export const saveStudent = (student) => {
    return axios.post(STUDENT_URL, student);
}

export const updateStudent = (student) => {
    return axios.put(STUDENT_URL, student);
}

export const getAllStudents = () => {
    return axios.get(STUDENT_URL);
}

export const getStudentById = (id) => {
    return axios.get(STUDENT_URL+'/'+id);
}

export const generateRegistration = () => {
    return axios.get(ID_URL);
}
export const getCurrentStudents=()=>{
    return axios.get(OTHER_URL);
}

export const getStudentStatusByUsername=()=>{
    return axios.get(STATUS_URL);
}

export const getStudentDetail=()=>{
    return axios.get(STUD_URL);
}