/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
// plugin that creates slider
import Slider from 'nouislider';
// reactstrap components
import { Row, Col } from 'reactstrap';

class CustomControls extends React.Component {
  constructor(props) {
    super(props);
    this.carouselRef = React.createRef();
    this.state = {
      simpleValue: 100.0,
      rangeLow: 200.0,
      rangeHigh: 400.0
    };
  }

  componentDidMount() {
    // slider1 init
    const { slider1 } = this.carouselRef;
    Slider.create(slider1, {
      start: [0.0],
      connect: [true, false],
      step: 0.01,
      range: { min: 100.0, max: 500.0 }
      // }).on('update', (values, handle) => {
    }).on('update', (values) => {
      this.setState({ simpleValue: values[0] });
    });

    // slider2 init
    const { slider2 } = this.carouselRef;
    Slider.create(slider2, {
      start: [200.0, 400.0],
      connect: [false, true, false],
      step: 0.01,
      range: { min: 100.0, max: 500.0 }
    }).on('update', (values) => {
      this.setState({ rangeLow: values[0], rangeHigh: values[1] });
    });
  }

  render() {
    return (
      <>
        <Row>
          <Col lg="3" md="6">
            {/* Checkboxes */}
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">Checkboxes</small>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <label className="custom-control-label" htmlFor="customCheck1">
                <input className="custom-control-input" id="customCheck1" type="checkbox" />
                <span>Unchecked</span>
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <label className="custom-control-label" htmlFor="customCheck2">
                <input
                  className="custom-control-input"
                  defaultChecked
                  id="customCheck2"
                  type="checkbox"
                />
                <span>Checked</span>
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <label className="custom-control-label" htmlFor="customCheck3">
                <input
                  className="custom-control-input"
                  disabled
                  id="customCheck3"
                  type="checkbox"
                />
                <span>Disabled Unchecked</span>
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-3">
              <label className="custom-control-label" htmlFor="customCheck4">
                <input
                  className="custom-control-input"
                  defaultChecked
                  disabled
                  id="customCheck4"
                  type="checkbox"
                />
                <span>Disabled Checked</span>
              </label>
            </div>
          </Col>
          <Col className="mt-4 mt-md-0" lg="3" sm="6">
            {/* Radio buttons */}
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">Radios</small>
            </div>
            <div className="custom-control custom-radio mb-3">
              <label className="custom-control-label" htmlFor="customRadio1">
                <input
                  className="custom-control-input"
                  id="customRadio1"
                  name="custom-radio-1"
                  type="radio"
                />
                <span>Unchecked</span>
              </label>
            </div>
            <div className="custom-control custom-radio mb-3">
              <label className="custom-control-label" htmlFor="customRadio2">
                <input
                  className="custom-control-input"
                  defaultChecked
                  id="customRadio2"
                  name="custom-radio-1"
                  type="radio"
                />
                <span>Checked</span>
              </label>
            </div>
            <div className="custom-control custom-radio mb-3">
              <label className="custom-control-label" htmlFor="customRadio3">
                <input
                  className="custom-control-input"
                  disabled
                  id="customRadio3"
                  name="custom-radio-2"
                  type="radio"
                />
                <span>Disabled unchecked</span>
              </label>
            </div>
            <div className="custom-control custom-radio mb-3">
              <label className="custom-control-label" htmlFor="customRadio4">
                <input
                  className="custom-control-input"
                  defaultChecked
                  disabled
                  id="customRadio4"
                  name="custom-radio-2"
                  type="radio"
                />
                <span>Disabled checkbox</span>
              </label>
            </div>
          </Col>
          <Col className="mt-4 mt-md-0" lg="3" sm="6">
            {/* Toggle buttons */}
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">Toggle buttons</small>
            </div>
            <label className="custom-toggle" htmlFor="checkbox-notCheck">
              <input type="checkbox" id="checkbox-notCheck" />
              <span className="custom-toggle-slider rounded-circle" />
            </label>
            <span className="clearfix" />
            <label className="custom-toggle" htmlFor="checkedCheckbox">
              <input defaultChecked type="checkbox" id="checkedCheckbox" />
              <span className="custom-toggle-slider rounded-circle" />
            </label>
          </Col>
          <Col className="mt-4 mt-md-0" lg="3" sm="6">
            <div className="mb-3">
              <small className="text-uppercase font-weight-bold">Sliders</small>
            </div>
            {/* Simple slider */}
            <div className="input-slider-container">
              <div className="slider" carouselRef="slider1" />
              <Row className="mt-3 d-none">
                <Col xs="6">
                  <span className="range-slider-value">{this.state.simpleValue}</span>
                </Col>
              </Row>
            </div>
            {/* Range slider */}
            <div className="mt-5">
              {/* Range slider container */}
              <div className="slider" carouselRef="slider2" />
              <Row className="d-none">
                <Col xs="6">
                  <span className="range-slider-value value-low">{this.state.rangeLow}</span>
                </Col>
                <Col className="text-right" xs="6">
                  <span className="range-slider-value value-high">{this.state.rangeHigh}</span>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

export default CustomControls;
