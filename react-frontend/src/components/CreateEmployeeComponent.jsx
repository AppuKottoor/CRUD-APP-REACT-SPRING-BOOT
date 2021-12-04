import React, { Component } from "react";
import { useNavigate,useParams } from 'react-router-dom';
import EmployeeServices from "../services/EmployeeServices";
 class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
    }
    this.changeEmailIdHandler=this.changeEmailIdHandler.bind(this);
    this.changeFirstnameHandler=this.changeFirstnameHandler.bind(this);
    this.changeLastnameHandler=this.changeLastnameHandler.bind(this);
    this.saveEmployee=this.saveEmployee.bind(this);
  }

  componentDidMount(){

    if(this.state.id==-1){
      return
    }else{
      EmployeeServices.getEmployeebyId(this.state.id).then((res)=>{
        let employee=res.data;
        this.setState({
          firstName:employee.firstName,
          lastName:employee.lastName,
          emailId:employee.emailId
        });
      });
    }
    
  }


  saveEmployee=(e)=>{
      e.preventDefault();
      let  employee={firstName:this.state.firstName,lastName:this.state.lastName,emailId:this.state.emailId};
      console.log("employee=>" + JSON.stringify(employee));
      if(this.state.id==-1){
        EmployeeServices.creatEmployee(employee)
      .then(
          res=>{this.props.navigate("/");}
      );        
      }else{
        EmployeeServices.updateEmployee(employee,this.state.id).then(res=>{
          this.props.navigate("/");
        });
      }
      
  }
  changeFirstnameHandler=(e)=>{
      this.setState({firstName:e.target.value});
  }
  changeLastnameHandler=(e)=>{
    this.setState({lastName:e.target.value});
}
changeEmailIdHandler=(e)=>{
    this.setState({emailId:e.target.value});
}
cancel(){
    this.props.navigate("/")
}
getTitle(){
  if(this.state.id==-1){
    return <h1>Add Employee</h1>
  }else{
    return <h1>Update Employee</h1>
  }
}

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <div className="text-center">{this.getTitle()}</div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      placeholder="Enter First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstnameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      placeholder="Enter Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastnameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      placeholder="Enter Email Id"
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailIdHandler}
                    />
                  </div>
                  <button className="btn btn-success mt-3" onClick={this.saveEmployee}>Save</button>
                  <button className="btn btn-danger mt-3" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const CreateNavigation=(props)=>{
    let navigate = useNavigate();
    let params = useParams();
    return <CreateEmployeeComponent {...props} navigate={navigate} params={params}/>
}
export default CreateNavigation