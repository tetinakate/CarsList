import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpService } from '../http.service';
import { Car } from '../interfaces';
// import { UserService, AlertService } from '@app/_services';
// import { MustMatch } from '@app/_helpers';

@Component({
  selector: 'form',
  templateUrl: 'form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() car: any;
  @Output() submitted = new EventEmitter<Car>();

    form: any = FormGroup;
    id: string = "";
    isAddMode: boolean = false;
    loading: boolean = false;
    // submitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private httpService: HttpService,
        // private userService: UserService,
        // private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
            confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
        }, {
            // validator: MustMatch('password', 'confirmPassword')
        });

        if (!this.isAddMode) {
            // this.userService.getById(this.id)
            //     .pipe(first())
            //     .subscribe(x => this.form.patchValue(x));
            this.httpService.getDataById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }
    
    ngOnChanges(changes: SimpleChanges) {
      if (changes['car']?.currentValue) {
        this.form?.patchValue(this.car);
      }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        // this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.httpService.createData(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // this.alertService.success('User added', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    // this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateUser() {
        this.httpService.updateData(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // this.alertService.success('User updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    // this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}