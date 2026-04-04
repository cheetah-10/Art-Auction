import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return null;
	}

	if (!user) {
		return <Navigate to="/login" replace />;
	}

	if (allowedRoles && allowedRoles.includes(user.role)) {
		return <>{children}</>;
	} else {
		return <Navigate to="/unauthorized" replace />;
	}
};

export default ProtectedRoute;
