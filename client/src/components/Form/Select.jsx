import React, { Component } from 'react';
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap';

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.item.name]: props.item.value
    }
  }

  onChange = (e) => {
    const { item } = this.props;
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.props.getFieldValue({
        [item.name]: this.state[`${item.name}`]
      })
    })
  }

  render() {
    const { item, value, error } = this.props;
    return (
      <FormGroup>
        <Label for="exampleSelect" className="text-capitalize">{item.name}</Label>
        <Input
          type="select"
          name={item.name}
          id={item.name}
          onChange={this.onChange}
          value={this.state[`${item.name}`]}
          invalid={error ? true : false}
        >
          <option>Please select user type</option>
          {item.options.map((opt, index) => <option key={index} value={opt} >{opt}</option>)}
        </Input>
        <FormFeedback>{error}</FormFeedback>
      </FormGroup>
    );
  }
}

export default Select;