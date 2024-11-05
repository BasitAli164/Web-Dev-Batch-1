// Checkout.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../context/CartContext';

import ShippingInformation from './ShippingInformation';
import PaymentInformation from './PaymentInformation';
import Confirmation from './Confirmation';

const steps = ['Shipping Information', 'Payment Information', 'Confirmation'];

// Initial form values
const initialValues = {
  shipping: {
    RecipientName: '',
    country: '',
    state: '',
    city: '',
    address: '',
    postalCode: '',
    phone: '',
    shippingMethod: 'standard'
  },
  payment: {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    amount: '',
    paymentMethod: 'credit'
  }
};

// Validation schema
const validationSchema = [
  Yup.object({
    shipping: Yup.object().shape({
      RecipientName: Yup.string().required('Name is required'),
      country: Yup.string().required('Address is required'),
      state: Yup.string().required('City is required'),
      city: Yup.string().required('State is required'),
      address: Yup.string().required('Postal Code is required'),
      postalCode: Yup.string().required('PostalCode is required'),
      phone: Yup.string().required('Invalid phone number').required('Email is required'),
      shippingMethod: Yup.string().required('Shipping method is required')
    })
  }),
  Yup.object({
    payment: Yup.object().shape({
      cardNumber: Yup.string().required('Card number is required'),
      expiryDate: Yup.string().required('Expiry date is required'),
      cvv: Yup.string().required('CVV is required'),
      cardHolderName: Yup.string().required('Card holder name is required'),
      amount: Yup.number().required('Amount is required').positive(),
      paymentMethod: Yup.string().required('Payment method is required')
    })
  }),
  Yup.object() // Confirmation step does not require validation
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { cart, clearCart } = useCartStore();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleDialogClose = () => {
    setDialogOpen(false);
    clearCart();
    navigate('/');
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (activeStep === steps.length - 1) {
      setIsSubmitting(true);
      // Simulate an API call
      setTimeout(() => {
        setIsSubmitting(false);
        setDialogOpen(true);
        setSubmitting(false);
      }, 2000);
    } else {
      handleNext();
    }
  };

  const getStepContent = (step, setFieldTouched, errors, touched, values) => {
    switch (step) {
      case 0:
        return <ShippingInformation setFieldTouched={setFieldTouched} errors={errors} touched={touched} />;
      case 1:
        return <PaymentInformation setFieldTouched={setFieldTouched} errors={errors} touched={touched} />;
      case 2:
        return <Confirmation values={values} />;
      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[activeStep]}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldTouched, errors, touched, values }) => (
        <Form>
          <Box sx={{ width: '100%', mt: 4 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box sx={{ mt: 4 }}>
              {getStepContent(activeStep, setFieldTouched, errors, touched, values)}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </Button>
              )}
            </Box>
          </Box>
          <Dialog open={dialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Order Placed Successfully</DialogTitle>
            <DialogContent>
              <Typography>Your order has been placed successfully. Thank you for shopping with us!</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">Close</Button>
            </DialogActions>
          </Dialog>
        </Form>
      )}
    </Formik>
  );
};

export default Checkout;
