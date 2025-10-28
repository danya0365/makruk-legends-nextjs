"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterViewModel, RegisterPresenterFactory } from "./RegisterPresenter";
import { useAuthStore } from "@/src/presentation/stores/authStore";
import { RegisterData } from "@/src/data/mock/users";

// Initialize presenter instance once (singleton pattern)
const presenter = RegisterPresenterFactory.createClient();

export interface RegisterPresenterState {
  viewModel: RegisterViewModel | null;
  loading: boolean;
  error: string | null;
  formData: RegisterData;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

export interface RegisterPresenterActions {
  loadData: () => Promise<void>;
  handleInputChange: (field: keyof RegisterData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
  clearError: () => void;
  setError: (error: string | null) => void;
}

/**
 * Custom hook for Register presenter
 * Provides state management and actions for Register operations
 */
export function useRegisterPresenter(
  initialViewModel?: RegisterViewModel
): [RegisterPresenterState, RegisterPresenterActions] {
  const router = useRouter();
  const { register, clearError: clearAuthError, error: authError, isLoading: authLoading } = useAuthStore();
  
  const [viewModel, setViewModel] = useState<RegisterViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    username: "",
    displayName: "",
    password: "",
    confirmPassword: "",
    country: "TH",
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
      console.error("Error loading register data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle input change
   */
  const handleInputChange = useCallback((field: keyof RegisterData, value: string) => {
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
    if (!formData.email || !formData.username || !formData.displayName || !formData.password || !formData.confirmPassword) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    if (formData.password.length < 6) {
      setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
      return;
    }

    if (formData.username.length < 3) {
      setError("ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร");
      return;
    }

    try {
      await register(formData);
      // Redirect to home page after successful registration
      router.push("/");
    } catch (err) {
      // Error is handled by auth store
      console.error("Register error:", err);
    }
  }, [formData, register, router, clearAuthError]);

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  /**
   * Toggle confirm password visibility
   */
  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
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
      showConfirmPassword,
    },
    {
      loadData,
      handleInputChange,
      handleSubmit,
      togglePasswordVisibility,
      toggleConfirmPasswordVisibility,
      clearError: clearErrorCallback,
      setError,
    },
  ];
}
