React.createClass({

  getInitialState: function() {
    return {
      gender: null,
      marital_status: null,
      spouse_work_status: null,
      spouse_salary: null,
      alimony_giving: null,
      alimony_recieving: null,
      flag: false
    }
  },

  handleChange: function(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.setState(obj);
  },

  handleMaritalStatusChange: function(e) {
    var name = e.target.name;
    var obj = {};
    if (e.target.value == 'single') {
      this.state.spouse_work_status = 'false';
      this.state.spouse_salary = null;
    }
    obj[name] = e.target.value;
    this.setState(obj);
  },

  handleSpouseStatusChange: function(e) {
    var name = e.target.name;
    var obj = {};
    if (e.target.value == 'false') {
      this.state.spouse_salary = null;
    }
    obj[name] = e.target.value;
    this.setState(obj);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var obj = {};
    obj['flag'] = true;
    this.setState(obj);
  },

  user_data: function(){
    return {
      gender: this.state.gender,
      marital_status: this.state.marital_status,
      spouse_work_status: this.state.spouse_work_status,
      spouse_salary: this.state.spouse_salary,
      alimony_giving: this.state.alimony_giving,
      alimony_recieving: this.state.alimony_recieving
    }
  },

  status_form: function() {
    return(
      <div className='row'>
        <div className='col-md-6'>
          <form onSubmit={this.handleSubmit}>
            <div className='row'>
              <Gender gender={this.state.gender} handleChange={this.handleChange} />
            </div>
            <div className='row'>
              <Marital_Status marital_status={this.state.marital_status} handleChange={this.handleMaritalStatusChange} />
            </div>
            <div className='row'>
              <Spouse spouse_work_status={this.state.spouse_work_status} marital_status={this.state.marital_status} handleChange={this.handleSpouseStatusChange} />
            </div>
            <div className='row'>
              <Spouse_Salary spouse_work_status={this.state.spouse_work_status} handleChange={this.handleChange} />
            </div>
            <div className='row'>
              <Alimony_giving gender={this.state.gender} marital_status={this.state.marital_status} handleChange={this.handleChange} />
            </div>
            <div className='row'>
              <Alimony_recieving gender={this.state.gender} marital_status={this.state.marital_status} handleChange={this.handleChange} />
            </div>
            &nbsp;
            <div className='row'>
              <div className='col-md-6'>
                <input type='submit' value='Submit' className='btn btn-info'></input>
              </div>
            </div>
          </form>
        </div>
        <div className='col-md-5 col-md-offset-1'>
          <Show_data flag={this.state.flag} usr_data={this.user_data()}/>
        </div>
      </div>
    );
  },


 render: function() {
    return this.status_form();
  }
});


var Gender = React.createClass ({
  render: function() {
    var gender_state = this.props.gender;
    var selected_gender = ( gender_state === null) ? '' : gender_state;
    return (
      <div className='col-md-12'>
        <label htmlFor='gender'>Gender</label>
        <select className='form-control' id='gender' ref='gender' name='gender' value={selected_gender}
          onChange={this.props.handleChange}>
            <option value='' disabled='true'>Select</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
        </select>
      </div>
    );
  }
});

var Marital_Status = React.createClass ({
  render: function() {
    var marital_status_state = this.props.marital_status;
    var selected_marital_status = ( marital_status_state === null) ? '' : marital_status_state;
    return (
      <div className='col-md-12'>
        <label htmlFor='marital_status'>Marital Status</label>
        <select className='form-control' id='marital_status' ref='marital_status' name='marital_status' value={selected_marital_status}
          onChange={this.props.handleChange}>
            <option value='' disabled='true'>Select</option>
            <option value='single'>Single</option>
            <option value='married'>Married</option>
            <option value='divorce'>Divorce</option>
        </select>
      </div>
    );
  }
});

var Spouse = React.createClass ({
  render: function() {
    var marital_status = this.props.marital_status;
    var spouse_work_status = this.props.spouse_work_status;
    var selected_spouse_status = (spouse_work_status === null) ? '' : spouse_work_status;
    if (marital_status == 'married') {
      return (
        <div className='col-md-12'>
          <label htmlFor='spouse_work_status'>Spouse Work Status</label>
          <select className='form-control' id='spouse_work_status' ref='spouse_work_status' name='spouse_work_status' value={selected_spouse_status}
            onChange={this.props.handleChange}>
              <option value='' disabled='true'>Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
          </select>
        </div>
      );
    }
    else
      return null;
  }
});

var Spouse_Salary = React.createClass ({
  render: function() {
    if (this.props.spouse_work_status == 'true' || this.props.spouse_work_status == true) {
      return (
        <div className='col-md-12'>
          <label htmlFor='spouse_salary'>Spouse Salary</label>
          <input type='number' className='form-control' id='spouse_salary' ref='spouse_salary'
            placeholder='Salary' name='spouse_salary'
            defaultValue={this.props.spouse_salary} onChange={this.props.handleChange}>
          </input>
        </div>
      );
    }
    else
      return null;
  }
});
var Alimony_giving = React.createClass ({
  render: function() {
    if (this.props.gender == 'male' && this.props.marital_status == 'divorce') {
      return (
        <div className='col-md-12'>
          <label htmlFor='spouse_salary'>Alimony Giving</label>
          <input type='number' className='form-control' id='spouse_salary' ref='spouse_salary'
            placeholder='Salary' name='spouse_salary'
            defaultValue={this.props.alimony_giving} onChange={this.props.handleChange}>
          </input>
        </div>
      );
    }
    else
      return null;
  }
});
var Alimony_recieving = React.createClass ({
  render: function() {
    if (this.props.gender == 'female' && this.props.marital_status == 'divorce') {
      return (
        <div className='col-md-12'>
          <label htmlFor='spouse_salary'>Alimony Recieving</label>
          <input type='number' className='form-control' id='spouse_salary' ref='spouse_salary'
            placeholder='Salary' name='spouse_salary'
            defaultValue={this.props.alimony_recieving} onChange={this.props.handleChange}>
          </input>
        </div>
      );
    }
    else
      return null;
  }
});

var Show_data = React.createClass ({
  render: function() {
  if (this.props.flag == true || this.props.flag == 'true' ) {
          var buildInfo = this.props.usr_data;
            var properties = Object.keys(buildInfo).map(function(k, idx) {
               return (
                 <p ><strong>{k}</strong> - {buildInfo[k]}</p>
               )
             });
  }
  else{
      return null;}
      }});

window.Demo = Demo;

ReactDOM.render(
  <Demo name="World" />,
  document.getElementById('container')
);
