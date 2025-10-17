import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchService } from '../services/branch.service';
import { BuildingService } from '../services/building.service';
import { FloorService } from '../services/floor.service';
import { RoomService } from '../services/room.service';
import { Branch } from '../models/branch.model';
import { Building } from '../models/building.model';
import { Floor } from '../models/floor.model';
import { Room } from '../models/room.model';

export interface LocationData {
  type: 'branch' | 'building' | 'floor' | 'room';
  branchId?: number;
  branchName?: string;
  buildingId?: number;
  buildingName?: string;
  floorId?: number;
  floorName?: string;
  roomId?: number;
  roomName?: string;
}

@Component({
  selector: 'app-location-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-modal.component.html',
  styleUrl: './location-modal.component.css',
})
export class LocationModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<LocationData>();

  // Inject services
  private branchService = inject(BranchService);
  private buildingService = inject(BuildingService);
  private floorService = inject(FloorService);
  private roomService = inject(RoomService);

  constructor() {
  }

  ngOnInit() {
    this.loadBranches();
    this.branchService.getAll().subscribe(
      (branches) => {
        this.branches = branches;
        console.log('Branches loaded:', this.branches);
      },
      (error) => {
        console.error('Error loading branches:', error);
      }
    );
  }

  // Selected location type
  locationType: 'branch' | 'building' | 'floor' | 'room' | '' = '';

  // Data from backend
  branches: Branch[] = [];
  buildings: Building[] = [];
  floors: Floor[] = [];

  // Form data
  selectedBranchId: number | null = null;
  selectedBuildingId: number | null = null;
  selectedFloorId: number | null = null;
  newBranchName: string = '';
  newBuildingName: string = '';
  newFloorName: string = '';
  newRoomName: string = '';

  // Loading state
  isLoading: boolean = false;

  loadBranches() {
    this.isLoading = true;
    this.branchService.getAll().subscribe({
      next: (branches) => {
        this.branches = branches;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading branches:', error);
        this.isLoading = false;
      }
    });
  }

  onLocationTypeChange() {
    // Reset form when location type changes
    this.selectedBranchId = null;
    this.selectedBuildingId = null;
    this.selectedFloorId = null;
    this.newBranchName = '';
    this.newBuildingName = '';
    this.newFloorName = '';
    this.newRoomName = '';
    this.buildings = [];
    this.floors = [];
  }

  onBranchChange() {
    this.selectedBuildingId = null;
    this.selectedFloorId = null;
    this.buildings = [];
    this.floors = [];

    if (this.selectedBranchId) {
      this.isLoading = true;
      this.buildingService.getByBranchId(this.selectedBranchId).subscribe({
        next: (buildings) => {
          this.buildings = buildings;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading buildings:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onBuildingChange() {
    this.selectedFloorId = null;
    this.floors = [];

    if (this.selectedBuildingId) {
      this.isLoading = true;
      this.floorService.getByBuildingId(this.selectedBuildingId).subscribe({
        next: (floors) => {
          this.floors = floors;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading floors:', error);
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit() {
    if (!this.locationType) {
      return;
    }

    this.isLoading = true;

    switch (this.locationType) {
      case 'branch':
        if (!this.newBranchName.trim()) return;
        this.branchService.create({ name: this.newBranchName.trim() }).subscribe({
          next: (branch: Branch) => {
            const locationData: LocationData = {
              type: 'branch',
              branchId: branch.id,
              branchName: branch.name
            };
            this.save.emit(locationData);
            this.closeModal();
          },
          error: (error: any) => {
            console.error('Error creating branch:', error);
            alert('Failed to create branch. Please try again.');
            this.isLoading = false;
          }
        });
        break;

      case 'building':
        if (!this.selectedBranchId || !this.newBuildingName.trim()) return;
        this.buildingService.create({ 
          name: this.newBuildingName.trim(),
          branchId: this.selectedBranchId
        }).subscribe({
          next: (building: Building) => {
            const selectedBranch = this.branches.find(b => b.id === this.selectedBranchId);
            const locationData: LocationData = {
              type: 'building',
              branchId: building.branchId,
              branchName: selectedBranch?.name,
              buildingId: building.id,
              buildingName: building.name
            };
            this.save.emit(locationData);
            this.closeModal();
          },
          error: (error: any) => {
            console.error('Error creating building:', error);
            alert('Failed to create building. Please try again.');
            this.isLoading = false;
          }
        });
        break;

      case 'floor':
        if (!this.selectedBranchId || !this.selectedBuildingId || !this.newFloorName.trim()) return;
        this.floorService.create({
          name: this.newFloorName.trim(),
          buildingId: this.selectedBuildingId
        }).subscribe({
          next: (floor: Floor) => {
            const selectedBranch = this.branches.find(b => b.id === this.selectedBranchId);
            const selectedBuilding = this.buildings.find(b => b.id === this.selectedBuildingId);
            const locationData: LocationData = {
              type: 'floor',
              branchId: this.selectedBranchId!,
              branchName: selectedBranch?.name,
              buildingId: floor.buildingId,
              buildingName: selectedBuilding?.name,
              floorId: floor.id,
              floorName: floor.name
            };
            this.save.emit(locationData);
            this.closeModal();
          },
          error: (error: any) => {
            console.error('Error creating floor:', error);
            alert('Failed to create floor. Please try again.');
            this.isLoading = false;
          }
        });
        break;

      case 'room':
        if (!this.selectedBranchId || !this.selectedBuildingId || !this.selectedFloorId || !this.newRoomName.trim()) return;
        this.roomService.create({
          name: this.newRoomName.trim(),
          floorId: this.selectedFloorId
        }).subscribe({
          next: (room: Room) => {
            const selectedBranch = this.branches.find(b => b.id === this.selectedBranchId);
            const selectedBuilding = this.buildings.find(b => b.id === this.selectedBuildingId);
            const selectedFloor = this.floors.find(f => f.id === this.selectedFloorId);
            const locationData: LocationData = {
              type: 'room',
              branchId: this.selectedBranchId!,
              branchName: selectedBranch?.name,
              buildingId: this.selectedBuildingId!,
              buildingName: selectedBuilding?.name,
              floorId: this.selectedFloorId!,
              floorName: selectedFloor?.name,
              roomId: room.id,
              roomName: room.name
            };
            this.save.emit(locationData);
            this.closeModal();
          },
          error: (error: any) => {
            console.error('Error creating room:', error);
            alert('Failed to create room. Please try again.');
            this.isLoading = false;
          }
        });
        break;
    }
  }

  closeModal() {
    this.locationType = '';
    this.selectedBranchId = null;
    this.selectedBuildingId = null;
    this.selectedFloorId = null;
    this.newBranchName = '';
    this.newBuildingName = '';
    this.newFloorName = '';
    this.newRoomName = '';
    this.buildings = [];
    this.floors = [];
    this.isLoading = false;
    this.close.emit();
  }
}
