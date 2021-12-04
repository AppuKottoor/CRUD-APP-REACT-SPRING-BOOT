package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.model.Employee;
import com.example.backend.repository.EmployeeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;	
	
	@GetMapping("/employees")
	public List<Employee> getAll(){
		return employeeRepository.findAll();
	}
	
	@PostMapping("/employees")
	public Employee createEmp(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmpById(@PathVariable long id){
		Optional<Employee> opt = employeeRepository.findById(id);
		if(opt.isPresent()) {
			Employee employee=opt.get();
			return ResponseEntity.ok(employee);
		}else {
		  return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 	   
		}		
	}
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmpById(@PathVariable long id,@RequestBody Employee empDetails){
		Optional<Employee> emp=employeeRepository.findById(id);
		if(emp.isPresent()) {
			Employee employee=emp.get();
			employee.setFirstName(empDetails.getFirstName());
			employee.setLastName(empDetails.getLastName());
			employee.setEmailId(empDetails.getEmailId());
			Employee updatedEmp =employeeRepository.save(employee);
			return ResponseEntity.ok(updatedEmp);
		}else {
		  return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); 	   
		}
		
	}
	
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Employee> deleteEmp(@PathVariable long id) {
		Optional<Employee> emp = employeeRepository.findById(id);
		if(emp.isPresent()) {
		Employee e=emp.get();
		employeeRepository.delete(e);
		return ResponseEntity.ok(e);
		}else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
	}

}
