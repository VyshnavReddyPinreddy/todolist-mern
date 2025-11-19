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
