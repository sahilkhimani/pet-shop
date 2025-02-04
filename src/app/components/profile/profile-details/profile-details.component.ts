import { afterNextRender, Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../utility/services/local-storage.service';
import { StaticClass } from '../../../utility/helper/static-words';

@Component({
  selector: 'app-profile-details',
  imports: [],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent implements OnInit {
  private userId?: string;
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }
  ngOnInit(): void {
    this.userId = this.localStorageService.getItem(StaticClass.userId) as string;
    this.getUserDetail();
  }

  getUserDetail() {
    this.userService.getById(this.userId!).subscribe(
      {
        next: (res) => {
          console.log(res)
        },
        error: (err) => {
          console.log(err.err)
        }
      }
    )
  }
}
