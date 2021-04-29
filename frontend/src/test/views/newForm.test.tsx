import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import NewForm from 'src/views/Forms/newForm';

describe('New form view', () => {
  test('snapshot renders', () => {
    const component = renderer.create(
      <BrowserRouter>
        <NewForm />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
