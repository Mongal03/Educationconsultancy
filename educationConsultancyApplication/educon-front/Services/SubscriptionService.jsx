import axios from 'axios';

const SUB_URL="http://localhost:9696/edu-con/subscription";
const ID_URL="http://localhost:9696/edu-con/subscription-id";
const CURRENT_URL="http://localhost:9696/edu-con/subscription-current";
const STUD_URL="http://localhost:9696/edu-con/subscription-stud";
const COR_URL="http://localhost:9696/edu-con/sub-course";

export const saveSubscription = (subscription) => {
    return axios.post(SUB_URL, subscription);
}

export const updateSubscription = (subscription) => {
    return axios.put(SUB_URL,subscription);
}

export const getAllSubscriptions = () => {
    return axios.get(SUB_URL);
}

export const getSubscriptionById = (id) => {
    return axios.get(SUB_URL+ '/' + id);
}

export const generateSubscriptionId = () => {
    return axios.get(ID_URL);
}
export const getCurrentSubscriptions = () => {
    return axios.get(CURRENT_URL);
}
export const getAllSubscriptionsByStudent = () => {
    return axios.get(STUD_URL);
}
export const getSubscriptionsByStudent = (id) => {
    return axios.get(STUD_URL+ '/' + id);
}
export const getStatusBySubscriptionId = (id) => {
    return axios.get(ID_URL+ '/' + id);
}
export const getStatusByCourseIdStudentId = (id) => {
    return axios.get(COR_URL+ '/' + id);
}