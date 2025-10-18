import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BranchService } from '../assets-management/services/branch.service';
import { BuildingService } from '../assets-management/services/building.service';
import { FloorService } from '../assets-management/services/floor.service';
import { RoomService } from '../assets-management/services/room.service';
import { Branch } from '../assets-management/models/branch.model';
import { Building } from '../assets-management/models/building.model';
import { Floor } from '../assets-management/models/floor.model';
import { Room } from '../assets-management/models/room.model';
import { LocationModalComponent, LocationData } from '../assets-management/location-modal/location-modal.component';

@Component({
  selector: 'app-manage-locations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LocationModalComponent],
  templateUrl: './manage-locations.component.html',
  styleUrl: './manage-locations.component.css'
})
export class ManageLocationsComponent implements OnInit {
  private branchService = inject(BranchService);
  private buildingService = inject(BuildingService);
  private floorService = inject(FloorService);
  private roomService = inject(RoomService);

  activeTab: 'branches' | 'buildings' | 'floors' | 'rooms' = 'branches';
  
  branches: Branch[] = [];
  buildings: Building[] = [];
  floors: Floor[] = [];
  rooms: Room[] = [];
  
  isLoading = false;
  editingItem: any = null;
  isEditing = false;
  showLocationModal = false;

  ngOnInit() {
    this.loadData();
  }

  openLocationModal() {
    this.showLocationModal = true;
  }

  onLocationModalClose() {
    this.showLocationModal = false;
  }

  onLocationSave(locationData: LocationData) {
    this.showLocationModal = false;
    // Reload the appropriate data based on what was added
    this.loadData();
  }

  loadData() {
    this.loadBranches();
    this.loadBuildings();
    this.loadFloors();
    this.loadRooms();
  }

  loadBranches() {
    this.branchService.getAll().subscribe({
      next: (data) => this.branches = data,
      error: (error) => console.error('Error loading branches:', error)
    });
  }

  loadBuildings() {
    this.buildingService.getAll().subscribe({
      next: (data) => this.buildings = data,
      error: (error) => console.error('Error loading buildings:', error)
    });
  }

  loadFloors() {
    this.floorService.getAll().subscribe({
      next: (data) => this.floors = data,
      error: (error) => console.error('Error loading floors:', error)
    });
  }

  loadRooms() {
    this.roomService.getAll().subscribe({
      next: (data) => this.rooms = data,
      error: (error) => console.error('Error loading rooms:', error)
    });
  }

  setActiveTab(tab: 'branches' | 'buildings' | 'floors' | 'rooms') {
    this.activeTab = tab;
    this.cancelEdit();
  }

  editItem(item: any) {
    this.editingItem = { ...item };
    this.isEditing = true;
  }

  cancelEdit() {
    this.editingItem = null;
    this.isEditing = false;
  }

  saveEdit() {
    if (!this.editingItem) return;

    const id = this.editingItem.id;
    const updateData = { name: this.editingItem.name };

    switch (this.activeTab) {
      case 'branches':
        this.branchService.update(id, updateData).subscribe({
          next: () => {
            this.loadBranches();
            this.cancelEdit();
          },
          error: (error) => console.error('Error updating branch:', error)
        });
        break;
      case 'buildings':
        this.buildingService.update(id, updateData).subscribe({
          next: () => {
            this.loadBuildings();
            this.cancelEdit();
          },
          error: (error) => console.error('Error updating building:', error)
        });
        break;
      case 'floors':
        this.floorService.update(id, updateData).subscribe({
          next: () => {
            this.loadFloors();
            this.cancelEdit();
          },
          error: (error) => console.error('Error updating floor:', error)
        });
        break;
      case 'rooms':
        this.roomService.update(id, updateData).subscribe({
          next: () => {
            this.loadRooms();
            this.cancelEdit();
          },
          error: (error) => console.error('Error updating room:', error)
        });
        break;
    }
  }

  getBranchName(branchId?: number): string {
    if (!branchId) return '-';
    return this.branches.find(b => b.id === branchId)?.name || '-';
  }

  getBuildingName(buildingId?: number): string {
    if (!buildingId) return '-';
    return this.buildings.find(b => b.id === buildingId)?.name || '-';
  }

  getFloorName(floorId?: number): string {
    if (!floorId) return '-';
    return this.floors.find(f => f.id === floorId)?.name || '-';
  }
}
