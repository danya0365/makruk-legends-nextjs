"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginViewModel, LoginPresenterFactory } from "./LoginPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { LoginCredentials } from "@/src/data/mock/users";

// Initialize presenter instance once (singleton pattern)
const presenter = LoginPresenterFactory.createClient();

export interface LoginPresenterState {
  viewModel: LoginViewModel | null;
  loading: boolean;
  error: string | null;
  formData: LoginCredentials;
  showPassword: boolean;
}

export interface LoginPresenterActions {
  loadData: () => Promise<void>;
  handleInputChange: (field: keyof LoginCredentials, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  togglePasswordVisibility: () => void;
  clearError: () => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Login presenter
 * Provides state management and actions for Login operations
 */
export function useLoginPresenter(
  initialViewModel?: LoginViewModel
): [LoginPresenterState, LoginPresenterActions] {
  const router = useRouter();
  const { login, clearError: clearAuthError, error: authError, isLoading: authLoading } = useAuthStore();
  
  const [viewModel, setViewModel] = useState<LoginViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  /**
   * Load data from presenter
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      setViewModel(newViewModel);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Error loading login data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle input change
   */
  const handleInputChange = useCallback((field: keyof LoginCredentials, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear errors when user types
    if (error) setError(null);
    if (authError) clearAuthError();
  }, [error, authError, clearAuthError]);

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    clearAuthError();

    // Validation
    if (!formData.email || !formData.password) {
      setError("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    try {
      await login(formData);
      // Redirect to home page after successful login
      router.push("/");
    } catch (err) {
      // Error is handled by auth store
      console.error("Login error:", err);
    }
  }, [formData, login, router, clearAuthError]);

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  /**
   * Clear error
   */
  const clearErrorCallback = useCallback(() => {
    setError(null);
    clearAuthError();
  }, [clearAuthError]);

  // Load data on mount if no initial view model
  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [initialViewModel, loadData]);

  return [
    {
      viewModel,
      loading: loading || authLoading,
      error: error || authError,
      formData,
      showPassword,
    },
    {
      loadData,
      handleInputChange,
      handleSubmit,
      togglePasswordVisibility,
      clearError: clearErrorCallback,
      setError,
    },
  ];
}
