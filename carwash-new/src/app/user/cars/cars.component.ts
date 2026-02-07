import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service'; // adjust path if needed
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-cars',
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  userCars: any[] = [];
  loading: boolean = true;

  years: number[] = [];

  constructor(private userService: UserService) {}

  editingCar: any = null;
  addingCar: boolean = false;
  newCar: any = {
    brand: '',
    model: '',
    carNumber: '',
    color:'',
    year:0,
    imageUrl:''
  };
  onEdit(car: any): void {
  this.editingCar = { ...car }; // clone to avoid direct mutation
}

cancelEdit(): void {
  this.editingCar = null;
}

submitEdit(): void {
  this.userService.getUserId().subscribe({
    next: userId => {
      this.userService.updateCar(userId, this.editingCar.id, {
        brand: this.editingCar.brand,
        model: this.editingCar.model,
        carNumber: this.editingCar.carNumber,
        color: this.editingCar.color,
        year: Number(this.editingCar.year),
        imageUrl: this.editingCar.imageUrl
      }).subscribe({
        next: updatedCar => {
          console.log('Car updated:', updatedCar);
          this.editingCar = null;
          this.refreshCars(); // reload list
        },
        error: err => {
          console.error('Error updating car:', err);
        }
      });
    },
    error: err => {
      console.error('Error fetching user ID:', err);
    }
  });
}

  ngOnInit(): void {
    this.generateYearOptions();
    this.userService.getUserId().subscribe({
      next: userId => {
        this.userService.getCarsByUserId(userId).subscribe({
          next: cars => {
            this.userCars = cars;
            this.loading = false;
          },
          error: err => {
            console.error('Error fetching cars:', err);
            this.loading = false;
          }
        });
      },
      error: err => {
        console.error('Error fetching user ID:', err);
        this.loading = false;
      }
    });
  }



  onDelete(car: any): void {
    if (!car?.id) {
      console.error('Car ID missing');
      return;
    }

    this.userService.getUserId().subscribe({
      next: userId => {
        this.userService.deleteCar(userId, car.id).subscribe({
          next: () => {
            console.log('Car deleted successfully');
            this.refreshCars();
          },
          error: err => {
            console.error('Error deleting car:', err);
          }
        });
      },
      error: err => {
        console.error('Error fetching user ID for delete:', err);
      }
    });
  }


  refreshCars(): void {
    this.loading = true;
    this.userService.getUserId().subscribe({
      next: userId => {
        this.userService.getCarsByUserId(userId).subscribe({
          next: cars => {
            this.userCars = cars;
            this.loading = false;
          },
          error: err => {
            console.error('Error refreshing cars:', err);
            this.loading = false;
          }
        });
      },
      error: err => {
        console.error('Error fetching user ID for refresh:', err);
        this.loading = false;
      }
    });
  }



  onAddCar(): void {
    this.addingCar = true;
  }

  cancelAdd(): void {
    this.addingCar = false;
    this.newCar = { brand: '', model: '', carNumber: '',color:'',year:0,imageUrl:''};
  }

  submitAdd(): void {
    this.newCar.year = Number(this.newCar.year);
    this.userService.getUserId().subscribe({
      next: userId => {
        this.userService.addCar(userId, this.newCar).subscribe({
          next: addedCar => {
            console.log('Car added:',this.newCar);
            console.log('Car added:',addedCar);
            this.cancelAdd();
            this.refreshCars();
          },
          error: err => {
            console.error('Error adding car:', err);
          }
        });
      },
      error: err => {
        console.error('Error fetching user ID:', err);
      }
    });
  }


generateYearOptions(): void {
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 1980; y--) {
    this.years.push(y);
  }
}


}
