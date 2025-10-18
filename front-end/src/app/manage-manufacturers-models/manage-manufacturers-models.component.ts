import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ManufacturerService } from '../assets-management/services/manufacturer.service';
import { ModelService } from '../assets-management/services/model.service';
import { Manufacturer, CreateManufacturerDto, UpdateManufacturerDto } from '../assets-management/models/manufacturer.model';
import { Model, CreateModelDto, UpdateModelDto } from '../assets-management/models/model.model';

@Component({
  selector: 'app-manage-manufacturers-models',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './manage-manufacturers-models.component.html',
  styleUrl: './manage-manufacturers-models.component.css'
})
export class ManageManufacturersModelsComponent implements OnInit {
  activeTab: 'manufacturers' | 'models' = 'manufacturers';
  
  manufacturers: Manufacturer[] = [];
  models: Model[] = [];
  
  // For manufacturers
  editingManufacturer: UpdateManufacturerDto | null = null;
  editingManufacturerId: number | null = null;
  isEditingManufacturer = false;
  addingManufacturer = false;
  newManufacturer: CreateManufacturerDto = { name: '' };
  
  // For models
  editingModel: UpdateModelDto | null = null;
  editingModelId: number | null = null;
  isEditingModel = false;
  addingModel = false;
  newModel: CreateModelDto = { name: '', manufacturerId: 0 };
  selectedManufacturerId: number | null = null;

  constructor(
    private manufacturerService: ManufacturerService,
    private modelService: ModelService
  ) {}

  ngOnInit() {
    this.loadManufacturers();
  }

  loadManufacturers() {
    this.manufacturerService.getAll().subscribe({
      next: (data) => {
        this.manufacturers = data;
      },
      error: (error) => {
        console.error('Error loading manufacturers:', error);
      }
    });
  }

  loadModels(manufacturerId?: number) {
    this.modelService.getAll(manufacturerId).subscribe({
      next: (data) => {
        this.models = data;
      },
      error: (error) => {
        console.error('Error loading models:', error);
      }
    });
  }

  setActiveTab(tab: 'manufacturers' | 'models') {
    this.activeTab = tab;
    this.cancelEditManufacturer();
    this.cancelEditModel();
    if (tab === 'models' && !this.selectedManufacturerId && this.manufacturers.length > 0) {
      this.selectedManufacturerId = this.manufacturers[0].id;
      this.loadModels(this.selectedManufacturerId);
    }
  }

  onManufacturerFilterChange() {
    if (this.selectedManufacturerId) {
      this.loadModels(this.selectedManufacturerId);
    } else {
      this.loadModels();
    }
  }

  // Manufacturer CRUD
  startAddManufacturer() {
    this.addingManufacturer = true;
    this.newManufacturer = { name: '', description: '', website: '', supportEmail: '', supportPhone: '' };
  }

  saveNewManufacturer() {
    if (this.newManufacturer.name.trim()) {
      this.manufacturerService.create(this.newManufacturer).subscribe({
        next: () => {
          this.loadManufacturers();
          this.addingManufacturer = false;
          this.newManufacturer = { name: '' };
        },
        error: (error) => {
          console.error('Error creating manufacturer:', error);
        }
      });
    }
  }

  cancelAddManufacturer() {
    this.addingManufacturer = false;
    this.newManufacturer = { name: '' };
  }

  editManufacturer(manufacturer: Manufacturer) {
    this.editingManufacturerId = manufacturer.id;
    this.editingManufacturer = { 
      name: manufacturer.name,
      description: manufacturer.description,
      website: manufacturer.website,
      supportEmail: manufacturer.supportEmail,
      supportPhone: manufacturer.supportPhone
    };
    this.isEditingManufacturer = true;
  }

  saveEditManufacturer() {
    if (this.editingManufacturer && this.editingManufacturerId) {
      this.manufacturerService.update(this.editingManufacturerId, this.editingManufacturer).subscribe({
        next: () => {
          this.loadManufacturers();
          this.cancelEditManufacturer();
        },
        error: (error) => {
          console.error('Error updating manufacturer:', error);
        }
      });
    }
  }

  cancelEditManufacturer() {
    this.editingManufacturer = null;
    this.editingManufacturerId = null;
    this.isEditingManufacturer = false;
  }

  deleteManufacturer(id: number) {
    if (confirm('Are you sure you want to delete this manufacturer? All associated models will also be deleted.')) {
      this.manufacturerService.delete(id).subscribe({
        next: () => {
          this.loadManufacturers();
        },
        error: (error) => {
          console.error('Error deleting manufacturer:', error);
        }
      });
    }
  }

  // Model CRUD
  startAddModel() {
    if (!this.selectedManufacturerId) {
      alert('Please select a manufacturer first');
      return;
    }
    this.addingModel = true;
    this.newModel = { 
      name: '', 
      manufacturerId: this.selectedManufacturerId,
      modelNumber: '',
      description: '',
      specifications: ''
    };
  }

  saveNewModel() {
    if (this.newModel.name.trim() && this.newModel.manufacturerId) {
      this.modelService.create(this.newModel).subscribe({
        next: () => {
          this.loadModels(this.selectedManufacturerId || undefined);
          this.addingModel = false;
          this.newModel = { name: '', manufacturerId: 0 };
        },
        error: (error) => {
          console.error('Error creating model:', error);
        }
      });
    }
  }

  cancelAddModel() {
    this.addingModel = false;
    this.newModel = { name: '', manufacturerId: 0 };
  }

  editModel(model: Model) {
    this.editingModelId = model.id;
    this.editingModel = {
      name: model.name,
      manufacturerId: model.manufacturerId,
      modelNumber: model.modelNumber,
      description: model.description,
      specifications: model.specifications
    };
    this.isEditingModel = true;
  }

  saveEditModel() {
    if (this.editingModel && this.editingModelId) {
      this.modelService.update(this.editingModelId, this.editingModel).subscribe({
        next: () => {
          this.loadModels(this.selectedManufacturerId || undefined);
          this.cancelEditModel();
        },
        error: (error) => {
          console.error('Error updating model:', error);
        }
      });
    }
  }

  cancelEditModel() {
    this.editingModel = null;
    this.editingModelId = null;
    this.isEditingModel = false;
  }

  deleteModel(id: number) {
    if (confirm('Are you sure you want to delete this model?')) {
      this.modelService.delete(id).subscribe({
        next: () => {
          this.loadModels(this.selectedManufacturerId || undefined);
        },
        error: (error) => {
          console.error('Error deleting model:', error);
        }
      });
    }
  }

  getManufacturerName(manufacturerId: number): string {
    const manufacturer = this.manufacturers.find(m => m.id === manufacturerId);
    return manufacturer ? manufacturer.name : 'Unknown';
  }
}
