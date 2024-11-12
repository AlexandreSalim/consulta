import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersListResponse } from '../../types/user-list-response';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UsersListComponent {

  userSelectedIndex: number | undefined;

  @Input({ required: true }) usersList: UsersListResponse = [];
  @Input({ required: true }) isInEditMode: boolean = false;

  @Output('onUserSelected') onUserSelectedEmitt = new EventEmitter<number>();

  onUserSelected(userIndex: number) {
    if(this.isInEditMode) return;
    
    this.userSelectedIndex = userIndex;
    this.onUserSelectedEmitt.emit(userIndex);
    }
    
  
}
