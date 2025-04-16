'use client'
import { useState, useMemo, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .trim()
    .min(12, 'Password should be of minimum 12 characters length')
    // tisk tisk.. should add a symbol to that password.
    // .matches(/[#\$%\^&\*\(\)_\+\!\~]/g, { message: 'Password must contain at least one symbol' })
    .matches(/[0-9]/g, { message: 'Password must contain at least one number' })
    .required('Password is required'),
});

const FORM_STATE = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  COMPLETE: "COMPLETE"
}

export default function Home() {
  // More extensible than a boolean
  const [formState, setFormState] = useState<string>(FORM_STATE.IDLE)
  const [error, setError] = useState<string>("")
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      setFormState(FORM_STATE.LOADING)
      fetch('/api/auth/login', { method: "POST", body: JSON.stringify(values) })
        // login(values)
        .then(() => {
          // setFormState(FORM_STATE.IDLE)
          setFormState(FORM_STATE.COMPLETE)
          router.replace("/profile")

        })
        .catch(err => {
          setFormState(FORM_STATE.IDLE)
          setError(err?.message ?? "Invalid credentials.")
        })

    },
  });

  const handleChange = (e: ChangeEvent) => {
    formik.handleChange(e)
    if (error) {
      setError("");
    }
  }

  const ctaCopy = useMemo(() => {
    if (formState === FORM_STATE.COMPLETE) return "Success!"
    return "Login"
  }, [formState])

  return (
    <Box sx={{ width: "100%", height: "100dvh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* TODO: In a non-quick app, I would separate the login form to own component. */}
      <form onSubmit={formik.handleSubmit}>
        {/* <form action={handleLogin}> */}
        <Box sx={{ width: 300 }}>
          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
              <TextField
                label="Email"
                variant="filled"
                type='email'
                name='email'
                value={formik.values.email}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ width: "100%" }}
              />
              <TextField
                label="Password"
                variant="filled"
                type='password'
                name='password'
                value={formik.values.password}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{ width: "100%", marginLeft: 0 }}
              />
              <Button
                type='submit'
                sx={{ width: "100%" }}
                disabled={formState !== FORM_STATE.IDLE}
                loading={formState === FORM_STATE.LOADING}
              >
                {ctaCopy}
              </Button>
              <Typography sx={{ color: "red" }}>
                {error}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </form>
    </Box>
  );
}
