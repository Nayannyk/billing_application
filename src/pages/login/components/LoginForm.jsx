import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const mockCredentials = {
    owner: { email: 'owner@salonbill.com', password: 'Owner@2026', role: 'Owner' },
    manager: { email: 'manager@salonbill.com', password: 'Manager@2026', role: 'Manager' },
    staff: { email: 'staff@salonbill.com', password: 'Staff@2026', role: 'Staff' }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (e) => {
    setFormData(prev => ({ ...prev, rememberMe: e?.target?.checked }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setTimeout(() => {
      const matchedUser = Object.values(mockCredentials)?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (matchedUser) {
        navigate('/billing-dashboard');
      } else {
        setErrors({
          email: 'Invalid credentials. Please check email and password.',
          password: 'Use: owner@salonbill.com / Owner@2026 or manager@salonbill.com / Manager@2026 or staff@salonbill.com / Staff@2026'
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          type="email"
          name="email"
          label="Email Address"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={loading}
        />
      </div>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-[38px] text-muted-foreground hover:text-foreground transition-smooth"
          disabled={loading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={handleCheckboxChange}
          disabled={loading}
        />
        <button
          type="button"
          className="text-sm font-body font-medium text-primary hover:text-primary/80 transition-smooth"
          disabled={loading}
        >
          Forgot Password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        iconName="LogIn"
        iconPosition="right"
        className="shadow-warm-md hover:shadow-warm-lg"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
