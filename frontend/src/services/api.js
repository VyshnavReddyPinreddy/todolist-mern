import axios from "axios";
import axiosInstance from "./axiosInstance";

export function loginUser(data) {
  return axiosInstance.post("/auth/login", data);
}

export function logoutUser(){
  return axiosInstance.post("/auth/logout");
}

export function registerUser(data) {
  return axiosInstance.post("/auth/register", data);
}

export function verifyEmail(data) {
  return axiosInstance.post("/auth/verify-email", data);
}

export function resendOtp() {
  return axiosInstance.post("/auth/resend-otp");
}

export function sendResetPasswordOtp(data) {
  return axiosInstance.post("/auth/send-reset-password-otp", data);
}

export function resetPassword(data) {
  return axiosInstance.post("/auth/reset-password", data);
}

export function checkAuth(){
  return axiosInstance.get("/auth/check-auth");
}

export function fetchUsername(){
  return axiosInstance.get("/user/username");
}

export function createTask(data){
  return axiosInstance.post("/task",data);
}

export function viewTasks(){
  return axiosInstance.get("/task/");
}

export function deleteTask(id){
  return axiosInstance.delete(`/task/${id}`);
}

export function updateTask(id,data){
  return axiosInstance.put(`/task/${id}`,data);
}

export function markTask(id){
  return axiosInstance.patch(`/task/${id}/complete`);
}



