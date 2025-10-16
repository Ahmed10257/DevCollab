import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LocationData {
  type: 'branch' | 'building' | 'floor' | 'room';
  branchName?: string;
  buildingName?: string;
  floorName?: string;
  roomName?: string;
}

@Component({
  selector: 'app-location-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-modal.component.html',
  styleUrl: './location-modal.component.css',
})
export class LocationModalComponent {
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<LocationData>();

  // Selected location type
  locationType: 'branch' | 'building' | 'floor' | 'room' | '' = '';

  // Existing data for dropdowns
  branches: string[] = [
    'Main Branch',
    'North Branch',
    'South Branch',
    'East Branch',
  ];
  buildings: { [key: string]: string[] } = {
    'Main Branch': ['Building A', 'Building B', 'Building C'],
    'North Branch': ['Building 1', 'Building 2'],
    'South Branch': ['Building X', 'Building Y', 'Building Z'],
    'East Branch': ['Building Alpha', 'Building Beta'],
  };
  floors: { [key: string]: string[] } = {
    'Building A': ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'],
    'Building B': ['Floor 1', 'Floor 2', 'Floor 3'],
    'Building C': ['Floor 1', 'Floor 2'],
    'Building 1': ['Ground Floor', 'First Floor', 'Second Floor'],
    'Building 2': ['Ground Floor', 'First Floor'],
    'Building X': ['Floor 1', 'Floor 2', 'Floor 3'],
    'Building Y': ['Floor 1', 'Floor 2'],
    'Building Z': ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'],
    'Building Alpha': ['Floor 1', 'Floor 2', 'Floor 3'],
    'Building Beta': ['Floor 1', 'Floor 2'],
  };

  // Form data
  selectedBranch: string = '';
  selectedBuilding: string = '';
  selectedFloor: string = '';
  newBranchName: string = '';
  newBuildingName: string = '';
  newFloorName: string = '';
  newRoomName: string = '';

  // Available options based on selections
  availableBuildings: string[] = [];
  availableFloors: string[] = [];

  onLocationTypeChange() {
    // Reset form when location type changes
    this.selectedBranch = '';
    this.selectedBuilding = '';
    this.selectedFloor = '';
    this.newBranchName = '';
    this.newBuildingName = '';
    this.newFloorName = '';
    this.newRoomName = '';
    this.availableBuildings = [];
    this.availableFloors = [];
  }

  onBranchChange() {
    this.selectedBuilding = '';
    this.selectedFloor = '';
    this.availableBuildings = this.buildings[this.selectedBranch] || [];
    this.availableFloors = [];
  }

  onBuildingChange() {
    this.selectedFloor = '';
    this.availableFloors = this.floors[this.selectedBuilding] || [];
  }

  onSubmit() {
    if (!this.locationType) {
      return;
    }

    const locationData: LocationData = {
      type: this.locationType,
    };

    switch (this.locationType) {
      case 'branch':
        if (!this.newBranchName.trim()) return;
        locationData.branchName = this.newBranchName.trim();
        break;

      case 'building':
        if (!this.selectedBranch || !this.newBuildingName.trim()) return;
        locationData.branchName = this.selectedBranch;
        locationData.buildingName = this.newBuildingName.trim();
        break;

      case 'floor':
        if (
          !this.selectedBranch ||
          !this.selectedBuilding ||
          !this.newFloorName.trim()
        )
          return;
        locationData.branchName = this.selectedBranch;
        locationData.buildingName = this.selectedBuilding;
        locationData.floorName = this.newFloorName.trim();
        break;

      case 'room':
        if (
          !this.selectedBranch ||
          !this.selectedBuilding ||
          !this.selectedFloor ||
          !this.newRoomName.trim()
        )
          return;
        locationData.branchName = this.selectedBranch;
        locationData.buildingName = this.selectedBuilding;
        locationData.floorName = this.selectedFloor;
        locationData.roomName = this.newRoomName.trim();
        break;
    }

    this.save.emit(locationData);
    this.closeModal();
  }

  closeModal() {
    this.locationType = '';
    this.selectedBranch = '';
    this.selectedBuilding = '';
    this.selectedFloor = '';
    this.newBranchName = '';
    this.newBuildingName = '';
    this.newFloorName = '';
    this.newRoomName = '';
    this.availableBuildings = [];
    this.availableFloors = [];
    this.close.emit();
  }
}
