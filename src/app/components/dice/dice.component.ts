import { Component, ElementRef, AfterViewInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import * as THREE from 'three';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dice',
  standalone: true,
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss']
})
export class DiceComponent implements AfterViewInit {
  @ViewChild('diceContainer', { static: true }) diceContainer!: ElementRef;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  dice!: THREE.Mesh;
  isRolling: boolean = false;
  diceResult: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScene();
      this.createDice();
      this.animate();
    }
  }

  initScene() {
    const width = 100;
    const height = 100;
  
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.diceContainer.nativeElement.appendChild(this.renderer.domElement);
  
    this.camera.position.z = 3;
  }
  

  createDice() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const textures = [
      new THREE.TextureLoader().load('./dice/dice4.png'),
      new THREE.TextureLoader().load('./dice/dice3.png'),
      new THREE.TextureLoader().load('./dice/dice5.png'),
      new THREE.TextureLoader().load('./dice/dice2.png'),
      new THREE.TextureLoader().load('./dice/dice6.png'),
      new THREE.TextureLoader().load('./dice/dice1.png')
    ];

    const materials = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));
    this.dice = new THREE.Mesh(geometry, materials);
    this.scene.add(this.dice);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.isRolling) {
      this.dice.rotation.x += 0.05;
      this.dice.rotation.y += 0.05;
    }
    this.renderer.render(this.scene, this.camera);
  }

  rollDice(): Promise<number> {
    return new Promise((resolve) => {
      this.isRolling = true;
  
      this.dice.rotation.x = Math.random() * Math.PI * 2;
      this.dice.rotation.y = Math.random() * Math.PI * 2;
      this.dice.rotation.z = Math.random() * Math.PI * 2;
  
      const startTime = Date.now(); 
  
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const timeElapsed = currentTime - startTime;
  
        if (timeElapsed < 1000) {
          this.dice.rotation.x += 0.1;
          this.dice.rotation.y += 0.1;
          this.dice.rotation.z += 0.1;
          this.renderer.render(this.scene, this.camera);
          return;
        }
  
        const aligned = this.isAlignedEnough(0.95);
  
        if (aligned) {
          clearInterval(interval);
          this.isRolling = false;
  
          this.calculateDiceResult();
          resolve(this.diceResult!);
        } else {
          this.dice.rotation.x += 0.01;
          this.dice.rotation.y += 0.01;
          this.dice.rotation.z += 0.01;
  
          this.renderer.render(this.scene, this.camera);
        }
      }, 100);
    });
  }
  
  isAlignedEnough(threshold: number): boolean {
    const faceDirections: { [key: number]: THREE.Vector3 } = {
      1: new THREE.Vector3(0, 0, 1),
      2: new THREE.Vector3(0, 1, 0),
      3: new THREE.Vector3(1, 0, 0),
      4: new THREE.Vector3(-1, 0, 0),
      5: new THREE.Vector3(0, -1, 0),
      6: new THREE.Vector3(0, 0, -1)
    };
  
    const cameraDirection = new THREE.Vector3(0, 0, -1);
    let maxDotProduct = -Infinity;
  
    for (const face in faceDirections) {
      const faceIndex = parseInt(face, 10);
      const rotatedDirection = faceDirections[faceIndex].clone().applyQuaternion(this.dice.quaternion).normalize();
      const dotProduct = cameraDirection.dot(rotatedDirection);
  
      if (dotProduct > maxDotProduct) {
        maxDotProduct = dotProduct;
      }
    }
  
    return maxDotProduct >= threshold;
  }
  
  calculateDiceResult() {
    const faceDirections: { [key: number]: THREE.Vector3 } = {
      1: new THREE.Vector3(0, 0, 1),
      2: new THREE.Vector3(0, 1, 0),
      3: new THREE.Vector3(1, 0, 0),
      4: new THREE.Vector3(-1, 0, 0),
      5: new THREE.Vector3(0, -1, 0),
      6: new THREE.Vector3(0, 0, -1)
    };
  
    const cameraDirection = new THREE.Vector3(0, 0, -1);
    let maxDotProduct = -Infinity;
    let bestFace: number | null = null;
  
    for (const face in faceDirections) {
      const faceIndex = parseInt(face, 10);
      const rotatedDirection = faceDirections[faceIndex].clone().applyQuaternion(this.dice.quaternion).normalize();
      const dotProduct = cameraDirection.dot(rotatedDirection);
  
      if (dotProduct > maxDotProduct) {
        maxDotProduct = dotProduct;
        bestFace = faceIndex;
      }
    }
  
    if (bestFace !== null) {
      this.diceResult = bestFace;
    } else {
      this.diceResult = null;
    }
  }
  
}
