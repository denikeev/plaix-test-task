import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
} from 'react-bootstrap';

import routes from './routes.js';

const App = () => {
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
      // setAuthFailed(false);

      try {
        const res = await axios.post(routes.feedbackPath(), values);
        console.log('res.data>>>', res.data);
        console.log('res.status>>>', res.status);
        // navigate(urls.root);
      } catch (err) {
        formik.setSubmitting(false);
        console.log('sumbiting error>>>', err);
        if (err.response && err.response.status === 401) {
          // setAuthFailed(true);
          // formik.setTouched({ username: false, password: false });
          // return;
        }
        if (err.code === 'ERR_NETWORK') {
          // notify('warn', t('notifications.networkWarn'), { autoClose: 7000 });
          // return;
        }
        throw new Error('Unknown Error', { cause: err });
      }
    },
  });

  return (
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
                    Submit
                  </Button>
                </fieldset>
              </Form>
              )}
              {sended && <div>Feedback sended</div>}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default App;
