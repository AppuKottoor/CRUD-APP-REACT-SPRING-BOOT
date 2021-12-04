import React, { Component } from 'react'
import EmployeeServices from '../services/EmployeeServices';
import { useNavigate } from 'react-router-dom';

class ListEmployeeComponent extends Component {

    
    constructor(props) {
        super(props)
    
        this.state = {
             employees:[]
        }

        this.addEmployee=this.addEmployee.bind(this);
        this.editEmployee=this.editEmployee.bind(this);
        this.deleteEmployee=this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeServices.deleteEmployee(id).then(
            (res)=>{
                this.setState({employees:this.state.employees.filter(employee => employee.id !== id)});
            }
        )
    }
    editEmployee(id){
        this.props.navigate(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeServices.getEmployees()
        .then((res)=>{
            this.setState({employees:res.data})
        })
    }
    addEmployee(){            
        this.props.navigate("/add-employee/-1");
    }
    render() {
        return (
            <div className="mt-5">
                <h1 className="text-center">Employee List</h1>
                <table className="table table-stripped table-bordered">
                    <thead>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee email ID</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            this.state.employees.map(
                                employee=><tr key={employee.id}>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                        <button onClick={()=>this.editEmployee(employee.id)} className="btn btn-info">Update</button>
                                        <buttton style={{marginLeft:'10px'}} onClick={()=>this.deleteEmployee(employee.id)} className="btn btn-danger">Delete</buttton>
                                    </td>
                                </tr>        
                                
                            )
                        }
                    </tbody>

                </table>
                <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                
            </div>
        )
    }
}

const ListNavigation=(props)=>{
    let navigate = useNavigate();
    return <ListEmployeeComponent {...props} navigate={navigate}/>
}

export default ListNavigation
