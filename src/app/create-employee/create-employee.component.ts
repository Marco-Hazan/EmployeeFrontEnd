import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  submitted = false;
  errorMessage = "";

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => { 
        console.log(data), error => console.log(error);
        this.employee = new Employee();
        this.gotoList();
      });
  }

  onSubmit(formImpiegato: NgForm) {
    if(formImpiegato.valid){
      this.submitted = true;
      this.save();    
    }else{
      this.errorMessage = "Dati sbagliati";
    }
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
