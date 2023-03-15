import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';

export const FormContacts = ({ onFormSubmit }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const FormScheme = object({
    name: string()
      .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, {
        message:
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
        excludeEmptyString: true,
      })
      .required('Required'),
    number: string()
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        {
          message:
            'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
          excludeEmptyString: true,
        }
      )
      .required('Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FormScheme}
      onSubmit={(values, actions) => {
        onFormSubmit(values, actions);
      }}
    >
      <Form>
        <label>
          Name
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="p" />
        </label>
        <label>
          Number
          <Field type="tel" name="number" />
          <ErrorMessage name="number" component="p" />
        </label>

        <button type="submit">Add a contact</button>
      </Form>
    </Formik>
  );
};
