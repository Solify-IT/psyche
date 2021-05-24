import React from 'react';
import renderer from 'react-test-renderer';
import RecordInfo from 'src/components/recordInfo';
import { BrowserRouter } from 'react-router-dom';
import CornerFab from 'src/components/cornerFab';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Button } from '@material-ui/core';
import recordFixture from 'src/fixtures/recordFixture';

Enzyme.configure({ adapter: new Adapter() });

const record = recordFixture;

describe('Patient info', () => {
  test('snapshot renders', () => {
    const component = renderer.create(
      <BrowserRouter>
        <RecordInfo record={record} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders patients info', () => {
    const wrapper = mount(
      <BrowserRouter>
        <RecordInfo record={record} />
      </BrowserRouter>,
    );
    expect(wrapper.find('PatientGeneralInfo')).toHaveLength(3);
  });

  test('renders patient file sections', () => {
    const wrapper = mount(
      <BrowserRouter>
        <RecordInfo record={record} />
      </BrowserRouter>,
    );
    expect(wrapper.find('FormSection')).toHaveLength(2);
  });

  test('renders fab button', () => {
    const wrapper = mount(
      <BrowserRouter>
        <RecordInfo record={record} />
      </BrowserRouter>,
    );
    expect(wrapper.find(CornerFab)).toHaveLength(1);
  });

  test('renders view and modify button per form', () => {
    const wrapper = mount(
      <BrowserRouter>
        <RecordInfo record={record} />
      </BrowserRouter>,
    );
    expect(wrapper.find(Button)).toHaveLength(3 * 2);
  });
});
