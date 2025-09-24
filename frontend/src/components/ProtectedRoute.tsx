import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
	allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
	const token = localStorage.getItem("authToken");
	const userRole = localStorage.getItem("userRole");

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	if (!userRole || !allowedRoles.includes(userRole)) {
		return <Navigate to="/dashboard" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
