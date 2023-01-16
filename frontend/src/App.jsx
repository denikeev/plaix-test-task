import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  Spinner,
} from 'react-bootstrap';

import routes from './routes.js';
import success from './success.svg';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [sended, setSended] = useState(null);
  const nameRef = useRef();

  useEffect(() => {
    if (!sended) {
      nameRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: { name: '', email: '', body: '' },
    validationSchema: yup.object({
      name: yup.string().max(70).required(),
      email: yup.string().email().max(70).required(),
      body: yup.string().max(1000).required(),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(routes.feedbackPath(), values);
        setSended(true);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.code === 'ERR_NETWORK') {
          toast.warn('Connection error', {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
          });
        }
        throw new Error('Unknown Error', { cause: err });
      }
    },
  });

  const renderReceived = () => (
    <div className="text-center">
      <img className="d-block mx-auto mb-2" src={success} width="100" height="100" alt="success image" />
      <p className="fs-1 mb-0">Thank You!</p>
      <small className="fs-5 text-muted">Your feedback has been received.</small>
    </div>
  );

  return (
    <>
      <div className="d-flex h-100">
        <div className="m-auto">
          <Container>
            <Row>
              <Col>
                {!sended && (
                <Form onSubmit={formik.handleSubmit}>
                  <h1>Feedback</h1>
                  <fieldset disabled={formik.isSubmitting}>
                    <FloatingLabel
                      controlId="name"
                      label="First name"
                      className="mb-3"
                    >
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        isInvalid={formik.touched.name && !!formik.errors.name}
                        name="name"
                        type="text"
                        placeholder="First name"
                        autoComplete="off"
                        ref={nameRef}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.name}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="email"
                      label="Email"
                      className="mb-3"
                    >
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        isInvalid={formik.touched.email && !!formik.errors.email}
                        name="email"
                        type="email"
                        placeholder="Your email"
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.email}</Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="body"
                      label="Your comments"
                      className="mb-3"
                    >
                      <Form.Control
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.body}
                        isInvalid={formik.touched.body && !!formik.errors.body}
                        name="body"
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '150px' }}
                      />
                      <Form.Control.Feedback type="invalid" tooltip>{formik.errors.body}</Form.Control.Feedback>
                    </FloatingLabel>
                    <Button variant="primary" type="submit">
                      <span>Submit</span>
                      {formik.isSubmitting && <Spinner className="ms-2" as="span" size="sm" animation="border"aria-hidden="true" role="status">
                        <span className="visually-hidden">Sending...</span>
                      </Spinner>}
                    </Button>
                  </fieldset>
                </Form>
                )}
                {sended && renderReceived()}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
