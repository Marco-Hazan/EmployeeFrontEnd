import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: number = 0;
  update:boolean = false;

  constructor(private employeeService: EmployeeService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let param = this.route.snapshot.params['id'];
    if(param){
      this.id = Number(param);
      this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data)
        this.employee = data;
      }, error => console.log(error));
      this.update = true;
    }
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  save() {
    this.employeeService.createEmployee(this.employee)
      .subscribe(data => { 
        this.employee = new Employee();
        this.gotoList();
      },
      error =>{
        this.errorMessage = "Errore nell'invio dei dati";
        this.submitted = false;
      }
      );
  }

  onSubmit(formImpiegato: NgForm) {
    this.employee.firstName = this.employee.firstName.trim();
    this.employee.lastName = this.employee.lastName.trim();
    console.log(this.employee);
    if(formImpiegato.valid){
      this.submitted = true;
      if(this.update){
        this.submitted = true;
        this.updateEmployee(); 
      }else{
        this.save();
      }
    }else{
      this.errorMessage = "Dati sbagliati";
    }
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe(data =>  {
        console.log(data), error => console.log(error)
        this.employee = new Employee();
        this.gotoList();
      });
  } 

  gotoList() {
    this.router.navigate(['/employees']);
  }
}
